import hashlib
import os
from datetime import datetime, timedelta, timezone
import jwt
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = os.getenv("JWT_SECRET", "dev-secret")
ALGO = "HS256"


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(password: str, password_hash: str) -> bool:
    return pwd_context.verify(password, password_hash)


def create_access_token(sub: str, role: str, minutes: int = 30) -> str:
    exp = datetime.now(timezone.utc) + timedelta(minutes=minutes)
    return jwt.encode({"sub": sub, "role": role, "exp": exp}, SECRET_KEY, algorithm=ALGO)


def create_refresh_token(sub: str, days: int = 7) -> tuple[str, str]:
    exp = datetime.now(timezone.utc) + timedelta(days=days)
    token = jwt.encode({"sub": sub, "type": "refresh", "exp": exp}, SECRET_KEY, algorithm=ALGO)
    return token, hashlib.sha256(token.encode()).hexdigest()


def decode_access_token(token: str) -> dict:
    return jwt.decode(token, SECRET_KEY, algorithms=[ALGO])
