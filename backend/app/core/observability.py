import logging
import sys
import time
from uuid import uuid4


logger = logging.getLogger("raritone.api")


def configure_logging(level: str = "INFO") -> None:
    if logger.handlers:
        return
    handler = logging.StreamHandler(sys.stdout)
    formatter = logging.Formatter("%(message)s")
    handler.setFormatter(formatter)
    logger.addHandler(handler)
    logger.setLevel(level.upper())


def log_request(event: str, **fields) -> None:
    payload = {"event": event, **fields}
    logger.info(str(payload))


def build_request_id() -> str:
    return uuid4().hex


def now_ms() -> int:
    return int(time.time() * 1000)
