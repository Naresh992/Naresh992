from __future__ import annotations

import inspect
import re
import sys
from enum import Enum
from types import UnionType
from typing import Any, Callable, get_args, get_origin


class FieldInfo:
    def __init__(self, default: Any = ..., *, default_factory: Callable[[], Any] | None = None, **_: Any) -> None:
        self.default = default
        self.default_factory = default_factory


def Field(default: Any = ..., **kwargs: Any) -> FieldInfo:
    return FieldInfo(default, **kwargs)


HttpUrl = str


class BaseModel:
    def __init__(self, **data: Any) -> None:
        annotations = self._annotations()
        for name, annotation in annotations.items():
            class_value = getattr(type(self), name, ...)
            if name in data:
                value = data[name]
            elif isinstance(class_value, FieldInfo):
                if class_value.default_factory is not None:
                    value = class_value.default_factory()
                elif class_value.default is not ...:
                    value = class_value.default
                else:
                    raise ValueError(f"Missing required field: {name}")
            elif class_value is not ...:
                value = class_value
            else:
                raise ValueError(f"Missing required field: {name}")
            setattr(self, name, self._coerce(value, annotation))

    @classmethod
    def _annotations(cls) -> dict[str, Any]:
        annotations: dict[str, Any] = {}
        for base in reversed(cls.__mro__):
            annotations.update(getattr(base, "__annotations__", {}))
        return annotations

    @classmethod
    def _coerce(cls, value: Any, annotation: Any) -> Any:
        origin = get_origin(annotation)
        args = get_args(annotation)
        if origin in (list, tuple) and args:
            return [cls._coerce(item, args[0]) for item in value]
        if origin in (dict,) or annotation is dict:
            return value
        if isinstance(annotation, type) and issubclass(annotation, BaseModel) and isinstance(value, dict):
            return annotation(**value)
        if isinstance(annotation, type) and issubclass(annotation, Enum) and not isinstance(value, annotation):
            return annotation(value)
        return value

    def model_dump(self) -> dict[str, Any]:
        return {name: self._dump_value(getattr(self, name)) for name in self._annotations()}

    def dict(self) -> dict[str, Any]:
        return self.model_dump()

    @classmethod
    def _dump_value(cls, value: Any) -> Any:
        if isinstance(value, BaseModel):
            return value.model_dump()
        if isinstance(value, Enum):
            return value.value
        if isinstance(value, list):
            return [cls._dump_value(item) for item in value]
        if isinstance(value, dict):
            return {key: cls._dump_value(item) for key, item in value.items()}
        return value


class HTTPException(Exception):
    def __init__(self, status_code: int, detail: str) -> None:
        super().__init__(detail)
        self.status_code = status_code
        self.detail = detail


class FastAPI:
    def __init__(self, **_: Any) -> None:
        self.routes: list[tuple[str, str, Callable[..., Any]]] = []

    def get(self, path: str) -> Callable[[Callable[..., Any]], Callable[..., Any]]:
        return self._route("GET", path)

    def post(self, path: str) -> Callable[[Callable[..., Any]], Callable[..., Any]]:
        return self._route("POST", path)

    def _route(self, method: str, path: str) -> Callable[[Callable[..., Any]], Callable[..., Any]]:
        def decorator(func: Callable[..., Any]) -> Callable[..., Any]:
            self.routes.append((method, path, func))
            return func

        return decorator


class Response:
    def __init__(self, status_code: int, payload: Any) -> None:
        self.status_code = status_code
        self._payload = payload

    def json(self) -> Any:
        return BaseModel._dump_value(self._payload)


class TestClient:
    __test__ = False

    def __init__(self, app: FastAPI) -> None:
        self.app = app

    def get(self, path: str) -> Response:
        return self._request("GET", path, None)

    def post(self, path: str, json: dict[str, Any] | None = None) -> Response:
        return self._request("POST", path, json or {})

    def _request(self, method: str, path: str, payload: dict[str, Any] | None) -> Response:
        match = self._match_route(method, path)
        if match is None:
            return Response(404, {"detail": "Not Found"})
        func, path_params = match
        try:
            result = self._call(func, path_params, payload)
            return Response(200, result)
        except HTTPException as exc:
            return Response(exc.status_code, {"detail": exc.detail})
        except Exception as exc:  # pragma: no cover - mirrors TestClient surfacing app errors
            raise exc

    def _match_route(self, method: str, path: str) -> tuple[Callable[..., Any], dict[str, str]] | None:
        for route_method, route_path, func in self.app.routes:
            if route_method != method:
                continue
            pattern = "^" + re.sub(r"\{([^}]+)\}", r"(?P<\1>[^/]+)", route_path) + "$"
            matched = re.match(pattern, path)
            if matched:
                return func, matched.groupdict()
        return None

    def _call(self, func: Callable[..., Any], path_params: dict[str, str], payload: dict[str, Any] | None) -> Any:
        signature = inspect.signature(func)
        kwargs: dict[str, Any] = {}
        for name, parameter in signature.parameters.items():
            if name in path_params:
                kwargs[name] = path_params[name]
                continue
            if payload is not None:
                kwargs[name] = self._build_argument(parameter.annotation, payload)
        return func(**kwargs)

    def _build_argument(self, annotation: Any, payload: dict[str, Any]) -> Any:
        candidates = get_args(annotation) if isinstance(annotation, UnionType) else (annotation,)
        for candidate in candidates:
            if isinstance(candidate, type) and issubclass(candidate, BaseModel):
                try:
                    return candidate(**payload)
                except Exception:
                    continue
        candidate = candidates[0]
        if isinstance(candidate, type) and issubclass(candidate, BaseModel):
            return candidate(**payload)
        return payload


def install_fastapi_testclient_module() -> None:
    module = type(sys)("fastapi.testclient")
    module.TestClient = TestClient
    sys.modules.setdefault("fastapi.testclient", module)
