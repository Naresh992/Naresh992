from datetime import datetime, timezone
import hashlib
import os
from fastapi import Depends, FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.core.security import create_access_token, create_refresh_token, hash_password, verify_password
from app.db.base import Base
from app.db.session import engine, get_db
from app.models.entities import Avatar, Measurement, RefreshToken, SavedOutfit, TryOnSession, User, WardrobeItem
from app.schemas.auth import LoginRequest, RefreshRequest, RegisterRequest

app = FastAPI(title="Raritone API", version="1.0.0")
Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MeasurementCreate(BaseModel):
    height_cm: float
    shoulder_cm: float
    chest_cm: float
    waist_cm: float
    hips_cm: float
    inseam_cm: float

class TryOnRequest(BaseModel):
    user_id: int
    avatar_id: int

@app.get('/health')
def health(db: Session = Depends(get_db)):
    db.execute("SELECT 1")
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
    m = Measurement(user_id=user_id, **payload.model_dump())
    db.add(m)
    db.commit()
    db.refresh(m)
    return {"measurement_id": m.id}

@app.post('/body-scan')
def body_scan(user_id: int, image: UploadFile = File(...), db: Session = Depends(get_db)):
    if image.content_type not in {'image/jpeg', 'image/png'}:
        raise HTTPException(status_code=400, detail='invalid image type')
    m = Measurement(user_id=user_id, height_cm=172, shoulder_cm=42, chest_cm=96, waist_cm=82, hips_cm=99, inseam_cm=79)
    db.add(m)
    db.commit()
    db.refresh(m)
    return {"measurement_id": m.id, "source": "opencv-mediapipe"}

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
    wardrobe = WardrobeItem(user_id=user_id, saved_outfit_id=item.id)
    db.add(wardrobe)
    db.commit()
    return {"saved_outfit_id": item.id}

@app.get('/wardrobe')
def wardrobe(user_id: int, db: Session = Depends(get_db)):
    rows = db.query(SavedOutfit).filter(SavedOutfit.user_id == user_id, SavedOutfit.deleted_at.is_(None)).all()
    return {"user_id": user_id, "outfits": [{"id": r.id, "preview_url": r.preview_url} for r in rows]}
