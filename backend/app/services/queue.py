from redis import Redis
from rq import Queue
from app.core.config import settings

redis_conn = Redis.from_url(settings.redis_url)
tryon_queue = Queue('tryon', connection=redis_conn)
