import os

class Settings:
    environment = os.getenv('ENVIRONMENT', 'development')
    jwt_secret = os.getenv('JWT_SECRET', 'dev-secret')
    stripe_secret_key = os.getenv('STRIPE_SECRET_KEY', '')
    stripe_webhook_secret = os.getenv('STRIPE_WEBHOOK_SECRET', '')
    s3_bucket = os.getenv('S3_BUCKET', '')
    aws_region = os.getenv('AWS_REGION', 'us-east-1')
    redis_url = os.getenv('REDIS_URL', 'redis://localhost:6379/0')
    rate_limit_per_minute = int(os.getenv('RATE_LIMIT_PER_MINUTE', '120'))
    log_level = os.getenv('LOG_LEVEL', 'INFO')
    require_fastapi_runtime = os.getenv('REQUIRE_FASTAPI_RUNTIME', 'false').lower() == 'true'
    google_jwks_url = os.getenv('GOOGLE_JWKS_URL', 'https://www.googleapis.com/oauth2/v3/certs')
    apple_jwks_url = os.getenv('APPLE_JWKS_URL', 'https://appleid.apple.com/auth/keys')

settings = Settings()
