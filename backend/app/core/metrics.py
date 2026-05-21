from prometheus_client import Counter, Histogram, generate_latest, CONTENT_TYPE_LATEST

REQUEST_COUNT = Counter(
    'raritone_http_requests_total',
    'Total HTTP requests handled by Raritone API',
    ['method', 'path', 'status'],
)

REQUEST_LATENCY = Histogram(
    'raritone_http_request_latency_seconds',
    'HTTP request latency in seconds',
    ['method', 'path'],
)


def render_metrics() -> tuple[bytes, str]:
    return generate_latest(), CONTENT_TYPE_LATEST
