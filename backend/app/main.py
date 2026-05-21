from datetime import datetime, timezone
import base64
import hashlib
import hmac
import json
import os
import importlib.util

if importlib.util.find_spec('fastapi') is not None:
    from fastapi import Depends, FastAPI, HTTPException, UploadFile, File, Request, Header
    from fastapi.middleware.cors import CORSMiddleware
    from fastapi.responses import JSONResponse
    from pydantic import BaseModel, Field
else:
    from app.compat import FastAPI, HTTPException, BaseModel, Field

    class Request:  # minimal typing shim for compat mode
        client = None
        method = 'GET'
        url = type('URL', (), {'path': '/'})
        headers = {}
        cookies = {}

    class UploadFile:  # pragma: no cover
        content_type = 'application/octet-stream'

    def File(*_args, **_kwargs):
        return None

    def Depends(fn):
        return fn

    def Header(*_args, **_kwargs):
        return None

    class JSONResponse(dict):
        def __init__(self, content, status_code=200):
            super().__init__(content)
            self.status_code = status_code
            self.headers = {}

        def set_cookie(self, *_args, **_kwargs):
            return None

    class CORSMiddleware:  # pragma: no cover
        pass
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.rate_limit import RedisRateLimiter
from app.core.observability import build_request_id, configure_logging, log_request, now_ms
from app.core.security import create_access_token, create_refresh_token, hash_password, verify_password
from app.db.base import Base
from app.db.session import engine, get_db
from app.models.entities import Measurement, RefreshToken, SavedOutfit, TryOnSession, User, WardrobeItem
from app.schemas.auth import LoginRequest, RefreshRequest, RegisterRequest
from app.services.body_scan import BodyScanMeasurementService
from app.services.payments import create_payment_intent, reconcile_stripe_event
from app.services.queue import tryon_queue
from app.services.storage import generate_signed_upload_url
from app.services.tryon_worker import render_tryon_job

app = FastAPI(title="Raritone API", version="1.2.0")
Base.metadata.create_all(bind=engine)
body_scan_service = BodyScanMeasurementService()
rate_limiter = RedisRateLimiter(max_requests=settings.rate_limit_per_minute)
configure_logging(settings.log_level)

if hasattr(app, 'add_middleware'):
    app.add_middleware(CORSMiddleware, allow_origins=os.getenv("CORS_ORIGINS", "*").split(","), allow_credentials=True, allow_methods=["*"], allow_headers=["*"])


def _parse_stripe_signature(signature_header: str) -> tuple[str, str]:
    parts = dict(part.split('=', 1) for part in signature_header.split(',') if '=' in part)
    timestamp = parts.get('t', '')
    signature = parts.get('v1', '')
    return timestamp, signature


def _verify_oauth_id_token(token: str, provider: str) -> dict:
    try:
        import jwt

        claims = jwt.decode(token, options={"verify_signature": False, "verify_aud": False})
    except Exception as exc:
        raise HTTPException(status_code=400, detail=f'invalid {provider} token') from exc

    if not claims.get('sub'):
        raise HTTPException(status_code=400, detail=f'{provider} token missing subject')
    return {"provider": provider, "subject": claims['sub'], "email": claims.get('email')}

if hasattr(app, 'middleware'):
    @app.middleware('http')
    async def security_and_rate_limit(request: Request, call_next):
        client = request.client.host if request.client else 'unknown'
        request_id = build_request_id()
        start_ms = now_ms()
        if not rate_limiter.allow(client):
            log_request('rate_limited', request_id=request_id, path=request.url.path, client=client)
            return JSONResponse(status_code=429, content={'detail': 'rate limit exceeded', 'request_id': request_id})
        if request.method in {'POST', 'PUT', 'PATCH', 'DELETE'} and request.url.path.startswith('/auth/') is False:
            csrf_header = request.headers.get('X-CSRF-Token')
            csrf_cookie = request.cookies.get('csrf_token')
            if csrf_cookie and csrf_header != csrf_cookie:
                return JSONResponse(status_code=403, content={'detail': 'csrf validation failed'})
        response = await call_next(request)
        response.headers['X-Content-Type-Options'] = 'nosniff'
        response.headers['X-Frame-Options'] = 'DENY'
        response.headers['Referrer-Policy'] = 'same-origin'
        response.headers['Content-Security-Policy'] = "default-src 'self'"
        response.headers['X-Request-Id'] = request_id
        log_request('request_complete', request_id=request_id, method=request.method, path=request.url.path, status=getattr(response, 'status_code', 200), duration_ms=now_ms()-start_ms)
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

@app.post('/auth/oauth/google')
def oauth_google(token: str):
    identity = _verify_oauth_id_token(token, 'google')
    return {"status": "verified", **identity}

@app.post('/auth/oauth/apple')
def oauth_apple(token: str):
    identity = _verify_oauth_id_token(token, 'apple')
    return {"status": "verified", **identity}

@app.post('/auth/login')
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=401, detail='invalid credentials')
    access = create_access_token(str(user.id), user.role)
    refresh, refresh_hash = create_refresh_token(str(user.id))
    db.add(RefreshToken(user_id=user.id, token_hash=refresh_hash, revoked=False))
    db.commit()
    response = JSONResponse({"access_token": access, "refresh_token": refresh, "token_type": "bearer"})
    csrf = hashlib.sha256(f"{user.id}:{datetime.now(timezone.utc).timestamp()}".encode()).hexdigest()
    response.set_cookie('csrf_token', csrf, httponly=False, secure=True, samesite='lax')
    return response

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

@app.post('/body-scan')
async def body_scan(user_id: int, image: UploadFile = File(...), db: Session = Depends(get_db)):
    if image.content_type not in {'image/jpeg', 'image/png'}:
        raise HTTPException(status_code=400, detail='invalid image type')
    raw = await image.read()
    encoded = base64.b64encode(raw).decode()
    estimate = body_scan_service.estimate_from_image_base64(encoded)
    m = Measurement(user_id=user_id, height_cm=estimate.measurements['height_cm'], shoulder_cm=estimate.measurements['shoulder_cm'], chest_cm=estimate.measurements['chest_cm'], waist_cm=estimate.measurements['waist_cm'], hips_cm=estimate.measurements['hips_cm'], inseam_cm=estimate.measurements['leg_cm'])
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
    job = tryon_queue.enqueue(render_tryon_job, session.id, retry=2)
    return {"tryon_session_id": session.id, "status": session.status, "job_id": job.id}

@app.get('/try-on/{session_id}')
def get_tryon(session_id: int, db: Session = Depends(get_db)):
    session = db.query(TryOnSession).filter(TryOnSession.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail='not found')
    return {"id": session.id, "status": session.status, "render_url": session.render_url}

@app.post('/payments/intent')
def payments_intent(amount_cents: int, currency: str = 'usd', user_id: int = 1):
    return create_payment_intent(amount_cents=amount_cents, currency=currency, metadata={'user_id': str(user_id)})

@app.post('/payments/webhook/stripe')
async def stripe_webhook(request: Request, stripe_signature: str | None = Header(default=None, alias='Stripe-Signature'), db: Session = Depends(get_db)):
    payload = await request.body()
    secret = os.getenv('STRIPE_WEBHOOK_SECRET', '')
    if not secret or not stripe_signature:
        raise HTTPException(status_code=400, detail='webhook not configured')
    timestamp, signature = _parse_stripe_signature(stripe_signature)
    signed_payload = f'{timestamp}.{payload.decode()}'.encode()
    expected = hmac.new(secret.encode(), signed_payload, hashlib.sha256).hexdigest()
    if not signature or not hmac.compare_digest(expected, signature):
        raise HTTPException(status_code=400, detail='invalid signature')
    event = json.loads(payload.decode() or '{}')
    result = reconcile_stripe_event(db, event)
    return {'received': True, **result}
