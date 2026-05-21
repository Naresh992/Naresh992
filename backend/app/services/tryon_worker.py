from datetime import datetime, timezone
import os
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.entities import TryOnSession


MAX_RENDER_ATTEMPTS = 3


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

        session.render_attempts = (session.render_attempts or 0) + 1
        session.status = "processing"
        db.commit()

        render_backend = os.getenv('RENDER_BACKEND_URL')
        if not render_backend:
            session.error_message = "render backend not configured"
            session.status = "dead_letter" if session.render_attempts >= MAX_RENDER_ATTEMPTS else "failed"
            db.commit()
            return {"status": session.status, "error": session.error_message, "attempts": session.render_attempts}

        session.render_url = _build_render_url(tryon_session_id)
        session.error_message = None
        session.status = "completed"
        db.commit()
        return {"status": "completed", "render_url": session.render_url, "attempts": session.render_attempts}
    finally:
        db.close()
