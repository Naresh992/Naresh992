import importlib.util

import pytest

if importlib.util.find_spec("fastapi") is None or importlib.util.find_spec("sqlalchemy") is None:
    pytest.skip("fastapi/sqlalchemy not installed in this environment", allow_module_level=True)

from app.main import _require_admin_user, _write_audit_log


class _DummyUser:
    def __init__(self, user_id: int, role: str):
        self.id = user_id
        self.role = role


class _DummyQuery:
    def __init__(self, user):
        self._user = user

    def filter(self, *_args, **_kwargs):
        return self

    def first(self):
        return self._user


class _DummyDB:
    def __init__(self, user):
        self._user = user
        self.added = []
        self.commits = 0

    def query(self, _model):
        return _DummyQuery(self._user)

    def add(self, obj):
        self.added.append(obj)

    def commit(self):
        self.commits += 1


def test_require_admin_user_rejects_non_admin(monkeypatch):
    db = _DummyDB(_DummyUser(1, "user"))
    monkeypatch.setattr("app.main._require_user_id", lambda _auth: 1)
    with pytest.raises(Exception):
        _require_admin_user("Bearer token", db)


def test_write_audit_log_persists_record():
    db = _DummyDB(_DummyUser(1, "admin"))
    _write_audit_log(db, 1, "admin.test.action", {"k": "v"})
    assert db.commits == 1
    assert len(db.added) == 1
