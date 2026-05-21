from datetime import datetime, timezone
import base64
import hashlib
import os
from fastapi import Depends, FastAPI, HTTPException, UploadFile, File, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.rate_limit import InMemoryRateLimiter
from app.core.security import create_access_token, create_refresh_token, hash_password, verify_password
from app.db.base import Base
from app.db.session import engine, get_db
from app.models.entities import Measurement, RefreshToken, SavedOutfit, TryOnSession, User, WardrobeItem
from app.schemas.auth import LoginRequest, RefreshRequest, RegisterRequest
from app.services.body_scan import BodyScanMeasurementService
from app.services.payments import create_payment_intent
from app.services.storage import generate_signed_upload_url

app = FastAPI(title="Raritone API", version="1.1.0")
Base.metadata.create_all(bind=engine)
body_scan_service = BodyScanMeasurementService()
rate_limiter = InMemoryRateLimiter(max_requests=settings.rate_limit_per_minute)

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware('http')
async def security_and_rate_limit(request: Request, call_next):
    client = request.client.host if request.client else 'unknown'
    if not rate_limiter.allow(client):
        return JSONResponse(status_code=429, content={'detail': 'rate limit exceeded'})
    response = await call_next(request)
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'DENY'
    response.headers['Referrer-Policy'] = 'same-origin'
    return response

class MeasurementCreate(BaseModel):
    height_cm: float = Field(gt=0)
    shoulder_cm: float = Field(gt=0)
    chest_cm: float = Field(gt=0)
    waist_cm: float = Field(gt=0)
    hips_cm: float = Field(gt=0)
    inseam_cm: float = Field(gt=0)

class TryOnRequest(BaseModel):
    user_id: int
    avatar_id: int

@app.get('/health')
def health(db: Session = Depends(get_db)):
    db.execute(text("SELECT 1"))
    return {"status": "ok", "ts": datetime.now(timezone.utc).isoformat()}

@app.post('/auth/register')
def register(payload: RegisterRequest, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == payload.email).first():
        raise HTTPException(status_code=409, detail='email already exists')
    user = User(email=payload.email, password_hash=hash_password(payload.password), role='user')
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"user_id": user.id, "email": user.email}

@app.post('/auth/login')
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=401, detail='invalid credentials')
    access = create_access_token(str(user.id), user.role)
    refresh, refresh_hash = create_refresh_token(str(user.id))
    db.add(RefreshToken(user_id=user.id, token_hash=refresh_hash, revoked=False))
    db.commit()
    return {"access_token": access, "refresh_token": refresh, "token_type": "bearer"}

@app.post('/auth/refresh')
def refresh_token(payload: RefreshRequest, db: Session = Depends(get_db)):
    refresh_hash = hashlib.sha256(payload.refresh_token.encode()).hexdigest()
    token = db.query(RefreshToken).filter(RefreshToken.token_hash == refresh_hash, RefreshToken.revoked.is_(False)).first()
    if not token:
        raise HTTPException(status_code=401, detail='invalid refresh token')
    token.revoked = True
    user = db.query(User).filter(User.id == token.user_id).first()
    access = create_access_token(str(user.id), user.role)
    refresh, new_hash = create_refresh_token(str(user.id))
    db.add(RefreshToken(user_id=user.id, token_hash=new_hash, revoked=False))
    db.commit()
    return {"access_token": access, "refresh_token": refresh}

@app.post('/measurements')
def create_measurement(user_id: int, payload: MeasurementCreate, db: Session = Depends(get_db)):
    m = Measurement(user_id=user_id, height_cm=payload.height_cm, shoulder_cm=payload.shoulder_cm, chest_cm=payload.chest_cm, waist_cm=payload.waist_cm, hips_cm=payload.hips_cm, inseam_cm=payload.inseam_cm)
    db.add(m)
    db.commit()
    db.refresh(m)
    return {"measurement_id": m.id}

@app.post('/body-scan')
async def body_scan(user_id: int, image: UploadFile = File(...), db: Session = Depends(get_db)):
    if image.content_type not in {'image/jpeg', 'image/png'}:
        raise HTTPException(status_code=400, detail='invalid image type')
    raw = await image.read()
    encoded = base64.b64encode(raw).decode()
    estimate = body_scan_service.estimate_from_image_base64(encoded)
    m = Measurement(
        user_id=user_id,
        height_cm=estimate.measurements['height_cm'],
        shoulder_cm=estimate.measurements['shoulder_cm'],
        chest_cm=estimate.measurements['chest_cm'],
        waist_cm=estimate.measurements['waist_cm'],
        hips_cm=estimate.measurements['hips_cm'],
        inseam_cm=estimate.measurements['leg_cm'],
    )
    db.add(m)
    db.commit()
    db.refresh(m)
    return {"measurement_id": m.id, "source": estimate.source, "confidence": estimate.confidence}

@app.post('/try-on')
def create_tryon(payload: TryOnRequest, db: Session = Depends(get_db)):
    session = TryOnSession(user_id=payload.user_id, avatar_id=payload.avatar_id, status='queued')
    db.add(session)
    db.commit()
    db.refresh(session)
    return {"tryon_session_id": session.id, "status": session.status}

@app.post('/save-outfit')
def save_outfit(user_id: int, tryon_session_id: int, preview_url: str, db: Session = Depends(get_db)):
    item = SavedOutfit(user_id=user_id, tryon_session_id=tryon_session_id, preview_url=preview_url)
    db.add(item)
    db.commit()
    db.refresh(item)
    db.add(WardrobeItem(user_id=user_id, saved_outfit_id=item.id))
    db.commit()
    return {"saved_outfit_id": item.id}

@app.get('/wardrobe')
def wardrobe(user_id: int, db: Session = Depends(get_db)):
    rows = db.query(SavedOutfit).filter(SavedOutfit.user_id == user_id, SavedOutfit.deleted_at.is_(None)).all()
    return {"user_id": user_id, "outfits": [{"id": r.id, "preview_url": r.preview_url} for r in rows]}

@app.post('/assets/signed-upload-url')
def signed_upload_url(key: str, content_type: str):
    return generate_signed_upload_url(key=key, content_type=content_type)

@app.post('/payments/intent')
def payments_intent(amount_cents: int, currency: str = 'usd'):
    return create_payment_intent(amount_cents=amount_cents, currency=currency)
