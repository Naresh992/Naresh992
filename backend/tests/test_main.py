import time

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


def test_generate_avatar() -> None:
    payload = {"height_cm": 172, "chest_cm": 96, "waist_cm": 82, "hips_cm": 99}
    response = client.post("/generate-avatar", json=payload)
    assert response.status_code == 200


def test_create_and_poll_tryon_job() -> None:
    payload = {
        "avatar_model_url": "https://cdn.raritone.dev/avatars/mock-avatar.glb",
        "mode": "3d",
        "items": [
            {"sku": "JACKET-05", "category": "clothes", "asset_url": "https://cdn.raritone.dev/assets/jacket.glb"},
            {"sku": "RING-03", "category": "jewellery", "asset_url": "https://cdn.raritone.dev/assets/ring.glb"},
        ],
    }
    created = client.post("/tryon/jobs", json=payload)
    assert created.status_code == 200
    job_id = created.json()["job_id"]

    final = None
    for _ in range(10):
        polled = client.get(f"/tryon/jobs/{job_id}")
        assert polled.status_code == 200
        final = polled.json()
        if final["status"] == "completed":
            break
        time.sleep(0.05)

    assert final is not None
    assert final["status"] == "completed"
    assert final["preview_url"].endswith(".glb")
