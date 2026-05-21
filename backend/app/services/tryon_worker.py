from datetime import datetime, timezone
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.entities import TryOnSession


def render_tryon_job(tryon_session_id: int) -> dict:
    db: Session = SessionLocal()
    try:
        session = db.query(TryOnSession).filter(TryOnSession.id == tryon_session_id).first()
        if not session:
            return {"status": "missing"}
        session.status = "processing"
        db.commit()
        # production pipeline hook (Blender/ML renderer) can be invoked here
        session.render_url = f"s3://raritone-renders/tryon/{tryon_session_id}-{int(datetime.now(timezone.utc).timestamp())}.glb"
        session.status = "completed"
        db.commit()
        return {"status": "completed", "render_url": session.render_url}
    finally:
        db.close()
