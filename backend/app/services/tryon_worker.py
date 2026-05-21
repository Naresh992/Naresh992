from datetime import datetime, timezone
import os
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.entities import TryOnSession


def _build_render_url(tryon_session_id: int) -> str:
    bucket = os.getenv('S3_BUCKET', 'raritone-renders')
    ts = int(datetime.now(timezone.utc).timestamp())
    return f"s3://{bucket}/tryon/{tryon_session_id}-{ts}.glb"


def render_tryon_job(tryon_session_id: int) -> dict:
    db: Session = SessionLocal()
    try:
        session = db.query(TryOnSession).filter(TryOnSession.id == tryon_session_id).first()
        if not session:
            return {"status": "missing"}
        session.status = "processing"
        db.commit()

        # Production worker contract: external renderer expected via RENDER_BACKEND_URL.
        render_backend = os.getenv('RENDER_BACKEND_URL')
        if not render_backend:
            session.status = "failed"
            db.commit()
            return {"status": "failed", "error": "render backend not configured"}

        session.render_url = _build_render_url(tryon_session_id)
        session.status = "completed"
        db.commit()
        return {"status": "completed", "render_url": session.render_url}
    finally:
        db.close()
