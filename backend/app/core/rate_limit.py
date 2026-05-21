import hashlib
from redis import Redis
from app.core.config import settings


class RedisRateLimiter:
    def __init__(self, max_requests: int, window_seconds: int = 60) -> None:
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.redis = Redis.from_url(settings.redis_url, decode_responses=True)

    def allow(self, key: str) -> bool:
        slot = hashlib.sha256(key.encode()).hexdigest()
        redis_key = f"rate:{slot}"
        current = self.redis.incr(redis_key)
        if current == 1:
            self.redis.expire(redis_key, self.window_seconds)
        return current <= self.max_requests
