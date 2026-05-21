from app.core.config import settings


def create_payment_intent(amount_cents: int, currency: str = 'usd') -> dict:
    if not settings.stripe_secret_key:
        return {'status': 'disabled', 'reason': 'stripe key not configured'}
    import stripe

    stripe.api_key = settings.stripe_secret_key
    intent = stripe.PaymentIntent.create(amount=amount_cents, currency=currency, automatic_payment_methods={'enabled': True})
    return {'status': 'created', 'payment_intent_id': intent.id, 'client_secret': intent.client_secret}
