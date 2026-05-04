from enum import Enum

from fastapi import FastAPI
from pydantic import BaseModel, Field, HttpUrl

app = FastAPI(title="Raritone API", version="0.2.0")


class Measurements(BaseModel):
    height_cm: float = Field(gt=0)
    chest_cm: float = Field(gt=0)
    waist_cm: float = Field(gt=0)
    hips_cm: float = Field(gt=0)


class BodyScanRequest(BaseModel):
    image_url: HttpUrl | None = None


class ItemCategory(str, Enum):
    clothes = "clothes"
    shoes = "shoes"
    jewellery = "jewellery"
    accessories = "accessories"


class RenderMode(str, Enum):
    two_d = "2d"
    three_d = "3d"


class TryOnItem(BaseModel):
    sku: str = Field(min_length=2)
    category: ItemCategory
    asset_url: HttpUrl


class TryOnRequest(BaseModel):
    avatar_model_url: HttpUrl
    mode: RenderMode = RenderMode.two_d
    items: list[TryOnItem] = Field(min_length=1, max_length=10)


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/scan-body")
def scan_body(payload: BodyScanRequest) -> dict:
    _ = payload
    measurements = Measurements(
        height_cm=172.0,
        chest_cm=96.0,
        waist_cm=82.0,
        hips_cm=99.0,
    )
    return {"measurements": measurements.model_dump(), "source": "mock"}


@app.post("/generate-avatar")
def generate_avatar(measurements: Measurements) -> dict[str, str]:
    _ = measurements
    return {"avatar_model_url": "https://cdn.raritone.dev/avatars/mock-avatar.glb"}


@app.post("/tryon")
def try_on(payload: TryOnRequest) -> dict:
    fitted_items = []
    for item in payload.items:
        fit_score = {
            ItemCategory.clothes: 0.92,
            ItemCategory.shoes: 0.89,
            ItemCategory.jewellery: 0.95,
            ItemCategory.accessories: 0.9,
        }[item.category]
        fitted_items.append(
            {
                "sku": item.sku,
                "category": item.category,
                "fit_score": fit_score,
                "overlay_asset_url": str(item.asset_url),
            }
        )

    if payload.mode == RenderMode.three_d:
        preview_url = "https://cdn.raritone.dev/previews/mock-preview-3d.glb"
    else:
        preview_url = "https://cdn.raritone.dev/previews/mock-preview-2d.png"

    return {
        "preview_url": preview_url,
        "render_mode": payload.mode,
        "fitted_items": fitted_items,
        "notes": "Prototype try-on response. Real cloth simulation/physics is pending integration.",
    }
