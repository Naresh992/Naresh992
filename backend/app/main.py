from fastapi import FastAPI
from pydantic import BaseModel, Field

app = FastAPI(title="Raritone API", version="0.1.0")


class Measurements(BaseModel):
    height_cm: float = Field(gt=0)
    chest_cm: float = Field(gt=0)
    waist_cm: float = Field(gt=0)
    hips_cm: float = Field(gt=0)


class BodyScanRequest(BaseModel):
    image_url: str | None = None


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/scan-body")
def scan_body(payload: BodyScanRequest) -> dict:
    # Placeholder until MediaPipe/OpenCV pipeline is integrated.
    # Returns deterministic synthetic measurements for API development.
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
    # Placeholder model URI for future GLTF generation pipeline.
    _ = measurements
    return {"avatar_model_url": "s3://raritone-dev/avatars/mock-avatar.glb"}


@app.post("/tryon")
def try_on(avatar_model_url: str, garment_model_url: str) -> dict[str, str]:
    # Placeholder rendered preview response.
    _ = avatar_model_url, garment_model_url
    return {"preview_url": "s3://raritone-dev/previews/mock-preview.png"}
