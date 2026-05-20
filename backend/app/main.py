from datetime import datetime, timezone
from enum import Enum
from uuid import uuid4

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field, HttpUrl

from app.services.body_scan import BodyScanMeasurementService
from app.services.tryon_pipeline import TryOnJobStore, TryOnPipelineService

app = FastAPI(title="Raritone API", version="0.4.0")

job_store = TryOnJobStore()
pipeline_service = TryOnPipelineService(job_store)
body_scan_service = BodyScanMeasurementService()
avatar_store: dict[str, "AvatarProfile"] = {}
wardrobe_store: dict[str, list["OutfitRecord"]] = {}


class Measurements(BaseModel):
    height_cm: float = Field(gt=0)
    chest_cm: float = Field(gt=0)
    waist_cm: float = Field(gt=0)
    hips_cm: float = Field(gt=0)
    shoulder_cm: float = Field(gt=0, default=42.0)
    leg_cm: float = Field(gt=0, default=92.0)


class BodyScanRequest(BaseModel):
    user_id: str = "demo-user"
    image_url: HttpUrl | None = None
    image_base64: str | None = None
    image_width_px: int = Field(default=1080, gt=0)
    image_height_px: int = Field(default=1920, gt=0)
    reference_height_cm: float = Field(default=172.0, gt=0)
    camera_pose_landmarks: list[dict[str, float | str]] = Field(default_factory=list)


class Gender(str, Enum):
    male = "male"
    female = "female"


class AvatarProfile(BaseModel):
    userId: str
    gender: Gender
    height: float
    chest: float
    waist: float
    hips: float
    shoulder: float
    leg: float
    skinTone: str
    hairPreset: str
    facePreset: str
    avatarModel: str


class AvatarRequest(BaseModel):
    user_id: str = "demo-user"
    gender: Gender = Gender.female
    skin_tone: str = "#C58C67"
    hair_preset: str = "waves"
    face_preset: str = "oval"
    measurements: Measurements


class ItemCategory(str, Enum):
    tshirts = "t-shirts"
    hoodies = "hoodies"
    jackets = "jackets"
    jeans = "jeans"
    dresses = "dresses"
    shoes = "shoes"
    streetwear = "streetwear"
    clothes = "clothes"
    jewellery = "jewellery"
    accessories = "accessories"


class RenderMode(str, Enum):
    two_d = "2d"
    three_d = "3d"
    immersive = "immersive"


class TryOnItem(BaseModel):
    sku: str = Field(min_length=2)
    category: ItemCategory
    asset_url: HttpUrl
    layer: int = Field(default=1, ge=1, le=8)


class TryOnRequest(BaseModel):
    user_id: str = "demo-user"
    avatar_model_url: HttpUrl
    mode: RenderMode = RenderMode.three_d
    items: list[TryOnItem] = Field(min_length=1, max_length=10)


class OutfitRecord(BaseModel):
    id: str
    userId: str
    products: list[TryOnItem]
    previewUrl: str
    savedAt: str


class SaveOutfitRequest(BaseModel):
    user_id: str = "demo-user"
    products: list[TryOnItem] = Field(min_length=1)
    preview_url: str = "https://cdn.raritone.dev/outfits/preview.glb"


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/scan-body")
def scan_body(payload: BodyScanRequest) -> dict:
    if payload.image_base64:
        estimate = body_scan_service.estimate_from_image_base64(
            payload.image_base64,
            reference_height_cm=payload.reference_height_cm,
        )
    else:
        estimate = body_scan_service.estimate_from_landmarks(
            payload.camera_pose_landmarks,
            image_width_px=payload.image_width_px,
            image_height_px=payload.image_height_px,
            reference_height_cm=payload.reference_height_cm,
        )

    measurements = Measurements(**estimate.measurements)
    return {
        "user_id": payload.user_id,
        "measurements": measurements.model_dump(),
        "source": estimate.source,
        "confidence": estimate.confidence,
        "landmarks_detected": estimate.landmarks_detected,
        "pipeline": "opencv-mediapipe-measurement-extraction",
    }


@app.post("/generate-avatar")
def generate_avatar(payload: AvatarRequest | Measurements) -> dict:
    if isinstance(payload, Measurements):
        measurements = payload
        user_id = "demo-user"
        gender = Gender.female
        skin_tone = "#C58C67"
        hair_preset = "waves"
        face_preset = "oval"
    else:
        measurements = payload.measurements
        user_id = payload.user_id
        gender = payload.gender
        skin_tone = payload.skin_tone
        hair_preset = payload.hair_preset
        face_preset = payload.face_preset

    profile = AvatarProfile(
        userId=user_id,
        gender=gender,
        height=measurements.height_cm,
        chest=measurements.chest_cm,
        waist=measurements.waist_cm,
        hips=measurements.hips_cm,
        shoulder=measurements.shoulder_cm,
        leg=measurements.leg_cm,
        skinTone=skin_tone,
        hairPreset=hair_preset,
        facePreset=face_preset,
        avatarModel="https://cdn.raritone.dev/models/avatars/raritone-rigged-avatar.glb",
    )
    avatar_store[user_id] = profile
    return {"avatar_model_url": profile.avatarModel, "avatar": profile.model_dump()}


@app.post("/tryon/jobs")
def create_tryon_job(payload: TryOnRequest) -> dict:
    fitted_items = [_fit_item(item, payload.user_id) for item in payload.items]
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


@app.post("/try-on")
def try_on(payload: TryOnRequest) -> dict:
    fitted_items = [_fit_item(item, payload.user_id) for item in payload.items]
    return {
        "user_id": payload.user_id,
        "avatar_model_url": str(payload.avatar_model_url),
        "mode": payload.mode,
        "fitted_items": fitted_items,
        "preview_model_url": "https://cdn.raritone.dev/renders/live-tryon-preview.glb",
        "fit_score": 0.98,
    }


@app.post("/save-outfit")
def save_outfit(payload: SaveOutfitRequest) -> dict:
    record = OutfitRecord(
        id=f"outfit-{uuid4().hex[:12]}",
        userId=payload.user_id,
        products=payload.products,
        previewUrl=payload.preview_url,
        savedAt=datetime.now(timezone.utc).isoformat(),
    )
    wardrobe_store.setdefault(payload.user_id, []).insert(0, record)
    return record.model_dump()


@app.get("/wardrobe")
def get_wardrobe(user_id: str = "demo-user") -> dict:
    return {"user_id": user_id, "outfits": [item.model_dump() for item in wardrobe_store.get(user_id, [])]}


def _fit_item(item: TryOnItem, user_id: str) -> dict:
    avatar = avatar_store.get(user_id)
    base_height = avatar.height if avatar else 172.0
    scale = round(base_height / 172.0, 3)
    attachment = "foot.L/R" if item.category == ItemCategory.shoes else "hips" if item.category in {ItemCategory.jeans} else "spine.003"
    return {
        "sku": item.sku,
        "category": item.category,
        "asset_url": str(item.asset_url),
        "layer": item.layer,
        "attachment_bone": attachment,
        "fitted_scale": scale,
        "collision_strategy": "bone-attachment-and-mesh-offset",
    }
