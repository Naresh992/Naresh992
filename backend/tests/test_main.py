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


def test_try_on_with_multiple_categories_2d() -> None:
    payload = {
        "avatar_model_url": "https://cdn.raritone.dev/avatars/mock-avatar.glb",
        "mode": "2d",
        "items": [
            {
                "sku": "TSHIRT-01",
                "category": "clothes",
                "asset_url": "https://cdn.raritone.dev/assets/tshirt.png",
            },
            {
                "sku": "SNEAKER-02",
                "category": "shoes",
                "asset_url": "https://cdn.raritone.dev/assets/sneaker.glb",
            },
            {
                "sku": "RING-03",
                "category": "jewellery",
                "asset_url": "https://cdn.raritone.dev/assets/ring.glb",
            },
            {
                "sku": "BAG-04",
                "category": "accessories",
                "asset_url": "https://cdn.raritone.dev/assets/bag.glb",
            },
        ],
    }
    response = client.post("/tryon", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["render_mode"] == "2d"
    assert data["preview_url"].endswith(".png")
    assert len(data["fitted_items"]) == 4


def test_try_on_3d_mode() -> None:
    payload = {
        "avatar_model_url": "https://cdn.raritone.dev/avatars/mock-avatar.glb",
        "mode": "3d",
        "items": [
            {
                "sku": "JACKET-05",
                "category": "clothes",
                "asset_url": "https://cdn.raritone.dev/assets/jacket.glb",
            }
        ],
    }
    response = client.post("/tryon", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["render_mode"] == "3d"
    assert data["preview_url"].endswith(".glb")
