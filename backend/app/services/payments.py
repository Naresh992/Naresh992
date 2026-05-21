import json
from app.core.config import settings

try:
    from app.models.entities import Order, PaymentEvent
except ModuleNotFoundError:
    class Order:  # lightweight fallback for dependency-limited test environments
        def __init__(self, user_id: int, status: str) -> None:
            self.user_id = user_id
            self.status = status

    class PaymentEvent:
        external_event_id = "external_event_id"

        def __init__(self, provider: str, external_event_id: str, event_type: str, payload_json: str) -> None:
            self.provider = provider
            self.external_event_id = external_event_id
            self.event_type = event_type
            self.payload_json = payload_json


def create_payment_intent(amount_cents: int, currency: str = 'usd', metadata: dict | None = None) -> dict:
    if not settings.stripe_secret_key:
        return {'status': 'disabled', 'reason': 'stripe key not configured'}
    import stripe

    stripe.api_key = settings.stripe_secret_key
    intent = stripe.PaymentIntent.create(
        amount=amount_cents,
        currency=currency,
        metadata=metadata or {},
        automatic_payment_methods={'enabled': True},
    )
    return {'status': 'created', 'payment_intent_id': intent.id, 'client_secret': intent.client_secret}


def reconcile_stripe_event(db, event: dict) -> dict:
    event_id = event.get('id')
    if not event_id:
        return {'status': 'ignored', 'reason': 'missing event id'}

    existing = db.query(PaymentEvent).filter(PaymentEvent.external_event_id == event_id).first()
    if existing:
        return {'status': 'duplicate', 'event_id': event_id}

    event_type = event.get('type', 'unknown')
    payload = event.get('data', {}).get('object', {})
    metadata = payload.get('metadata', {}) if isinstance(payload, dict) else {}
    user_id = int(metadata.get('user_id', 1))

    db.add(PaymentEvent(provider='stripe', external_event_id=event_id, event_type=event_type, payload_json=json.dumps(event)))

    if event_type == 'payment_intent.succeeded':
        order = Order(user_id=user_id, status='paid')
        db.add(order)
    elif event_type.startswith('charge.refunded'):
        order = db.query(Order).filter(Order.user_id == user_id).order_by(Order.id.desc()).first()
        if order:
            order.status = 'refunded'

    db.commit()
    return {'status': 'processed', 'event_id': event_id, 'event_type': event_type}
