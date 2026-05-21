import importlib.util
import os

import pytest

if importlib.util.find_spec("fastapi") is None or importlib.util.find_spec("sqlalchemy") is None:
    pytest.skip("fastapi/sqlalchemy not installed in this environment", allow_module_level=True)

from fastapi.testclient import TestClient

os.environ.setdefault("DATABASE_URL", "sqlite:///./test.db")
os.environ.setdefault("REDIS_URL", "redis://localhost:6379/15")

from app.main import app  # noqa: E402


client = TestClient(app)


def test_health() -> None:
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_oauth_token_validation_rejects_invalid() -> None:
    response = client.post('/auth/oauth/google', params={'token': 'not-a-jwt'})
    assert response.status_code == 400
