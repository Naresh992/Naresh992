from app.services.payments import reconcile_stripe_event


class DummyQuery:
    def __init__(self, store, key):
        self.store = store
        self.key = key

    def filter(self, *_args, **_kwargs):
        return self

    def first(self):
        return self.store.get(self.key)

    def order_by(self, *_args, **_kwargs):
        return self


class DummyDB:
    def __init__(self):
        self.events = {}
        self.orders = {}
        self.commits = 0

    def query(self, model):
        name = model.__name__
        return DummyQuery(self.events if name == 'PaymentEvent' else self.orders, 'lookup')

    def add(self, obj):
        name = obj.__class__.__name__
        if name == 'PaymentEvent':
            self.events['lookup'] = obj
        elif name == 'Order':
            self.orders['lookup'] = obj

    def commit(self):
        self.commits += 1


def test_reconcile_dedup_and_process() -> None:
    db = DummyDB()
    event = {
        'id': 'evt_1',
        'type': 'payment_intent.succeeded',
        'data': {'object': {'metadata': {'user_id': '2'}}},
    }
    first = reconcile_stripe_event(db, event)
    second = reconcile_stripe_event(db, event)
    assert first['status'] == 'processed'
    assert second['status'] == 'duplicate'
