from enum import Enum

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field, HttpUrl

from app.services.tryon_pipeline import TryOnJobStore, TryOnPipelineService

app = FastAPI(title="Raritone API", version="0.3.0")

job_store = TryOnJobStore()
pipeline_service = TryOnPipelineService(job_store)


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
    measurements = Measurements(height_cm=172.0, chest_cm=96.0, waist_cm=82.0, hips_cm=99.0)
    return {"measurements": measurements.model_dump(), "source": "mock"}


@app.post("/generate-avatar")
def generate_avatar(measurements: Measurements) -> dict[str, str]:
    _ = measurements
    return {"avatar_model_url": "https://cdn.raritone.dev/avatars/mock-avatar.glb"}


@app.post("/tryon/jobs")
def create_tryon_job(payload: TryOnRequest) -> dict:
    fitted_items = [{"sku": item.sku, "category": item.category, "asset_url": str(item.asset_url)} for item in payload.items]
    job = pipeline_service.submit(render_mode=payload.mode.value)
    return {
        "job_id": job.job_id,
        "status": job.status,
        "progress": job.progress,
        "render_mode": payload.mode,
        "items": fitted_items,
    }


@app.get("/tryon/jobs/{job_id}")
def get_tryon_job(job_id: str) -> dict:
    job = job_store.get(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return {
        "job_id": job.job_id,
        "status": job.status,
        "progress": job.progress,
        "preview_url": job.result_preview_url,
        "error": job.error,
    }
