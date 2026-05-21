import os

class Settings:
    jwt_secret = os.getenv('JWT_SECRET', 'dev-secret')
    stripe_secret_key = os.getenv('STRIPE_SECRET_KEY', '')
    s3_bucket = os.getenv('S3_BUCKET', '')
    aws_region = os.getenv('AWS_REGION', 'us-east-1')
    redis_url = os.getenv('REDIS_URL', 'redis://localhost:6379/0')
    rate_limit_per_minute = int(os.getenv('RATE_LIMIT_PER_MINUTE', '120'))
    log_level = os.getenv('LOG_LEVEL', 'INFO')

settings = Settings()
