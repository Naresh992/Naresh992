from datetime import datetime
from sqlalchemy import Boolean, DateTime, Float, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class TimestampSoftDeleteMixin:
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), index=True)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    deleted_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), index=True)


class User(Base, TimestampSoftDeleteMixin):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    password_hash: Mapped[str] = mapped_column(String(255))
    role: Mapped[str] = mapped_column(String(32), default="user", index=True)
    is_verified: Mapped[bool] = mapped_column(Boolean, default=False)
    profile = relationship("UserProfile", back_populates="user", uselist=False)

class UserProfile(Base, TimestampSoftDeleteMixin):
    __tablename__ = "user_profiles"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), unique=True, index=True)
    full_name: Mapped[str | None] = mapped_column(String(120))
    user = relationship("User", back_populates="profile")

class Measurement(Base, TimestampSoftDeleteMixin):
    __tablename__ = "measurements"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    height_cm: Mapped[float] = mapped_column(Float)
    shoulder_cm: Mapped[float] = mapped_column(Float)
    chest_cm: Mapped[float] = mapped_column(Float)
    waist_cm: Mapped[float] = mapped_column(Float)
    hips_cm: Mapped[float] = mapped_column(Float)
    inseam_cm: Mapped[float] = mapped_column(Float)

class Avatar(Base, TimestampSoftDeleteMixin):
    __tablename__ = "avatars"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    measurement_id: Mapped[int | None] = mapped_column(ForeignKey("measurements.id"), index=True)
    model_url: Mapped[str] = mapped_column(Text)

class Category(Base, TimestampSoftDeleteMixin):
    __tablename__ = "categories"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    slug: Mapped[str] = mapped_column(String(64), unique=True, index=True)
    name: Mapped[str] = mapped_column(String(120), index=True)

class Product(Base, TimestampSoftDeleteMixin):
    __tablename__ = "products"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    sku: Mapped[str] = mapped_column(String(64), unique=True, index=True)
    name: Mapped[str] = mapped_column(String(255))
    category_id: Mapped[int] = mapped_column(ForeignKey("categories.id"), index=True)
    price_cents: Mapped[int] = mapped_column(Integer)
    image_url: Mapped[str] = mapped_column(Text)

class Garment(Base, TimestampSoftDeleteMixin):
    __tablename__ = "garments"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id"), index=True)
    glb_url: Mapped[str] = mapped_column(Text)
    layer_order: Mapped[int] = mapped_column(Integer, default=1)

class TryOnSession(Base, TimestampSoftDeleteMixin):
    __tablename__ = "tryon_sessions"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    avatar_id: Mapped[int] = mapped_column(ForeignKey("avatars.id"), index=True)
    status: Mapped[str] = mapped_column(String(32), default="queued", index=True)
    render_url: Mapped[str | None] = mapped_column(Text)
    render_attempts: Mapped[int] = mapped_column(Integer, default=0)
    error_message: Mapped[str | None] = mapped_column(Text)

class SavedOutfit(Base, TimestampSoftDeleteMixin):
    __tablename__ = "saved_outfits"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    tryon_session_id: Mapped[int | None] = mapped_column(ForeignKey("tryon_sessions.id"), index=True)
    preview_url: Mapped[str] = mapped_column(Text)

class WardrobeItem(Base, TimestampSoftDeleteMixin):
    __tablename__ = "wardrobe_items"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    saved_outfit_id: Mapped[int] = mapped_column(ForeignKey("saved_outfits.id"), index=True)

class Order(Base, TimestampSoftDeleteMixin):
    __tablename__ = "orders"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    status: Mapped[str] = mapped_column(String(32), default="pending", index=True)

class OrderItem(Base, TimestampSoftDeleteMixin):
    __tablename__ = "order_items"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    order_id: Mapped[int] = mapped_column(ForeignKey("orders.id"), index=True)
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id"), index=True)
    quantity: Mapped[int] = mapped_column(Integer, default=1)

class RefreshToken(Base, TimestampSoftDeleteMixin):
    __tablename__ = "refresh_tokens"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    token_hash: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    revoked: Mapped[bool] = mapped_column(Boolean, default=False, index=True)

class AuditLog(Base, TimestampSoftDeleteMixin):
    __tablename__ = "audit_logs"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int | None] = mapped_column(ForeignKey("users.id"), index=True)
    action: Mapped[str] = mapped_column(String(255), index=True)
    metadata_json: Mapped[str | None] = mapped_column(Text)


class PaymentEvent(Base, TimestampSoftDeleteMixin):
    __tablename__ = "payment_events"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    provider: Mapped[str] = mapped_column(String(32), index=True)
    external_event_id: Mapped[str] = mapped_column(String(128), unique=True, index=True)
    event_type: Mapped[str] = mapped_column(String(128), index=True)
    payload_json: Mapped[str] = mapped_column(Text)
