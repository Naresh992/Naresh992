from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_health() -> None:
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_scan_body() -> None:
    response = client.post("/scan-body", json={"image_url": "https://example.com/person.jpg"})
    assert response.status_code == 200
    data = response.json()
    assert data["source"] == "mock"
    assert data["measurements"]["height_cm"] > 0


def test_generate_avatar() -> None:
    payload = {
        "height_cm": 172,
        "chest_cm": 96,
        "waist_cm": 82,
        "hips_cm": 99,
    }
    response = client.post("/generate-avatar", json=payload)
    assert response.status_code == 200
    assert "avatar_model_url" in response.json()
