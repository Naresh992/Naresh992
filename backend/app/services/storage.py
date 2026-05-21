import boto3
from botocore.client import Config
from app.core.config import settings


def generate_signed_upload_url(key: str, content_type: str) -> dict:
    s3 = boto3.client('s3', region_name=settings.aws_region, config=Config(signature_version='s3v4'))
    url = s3.generate_presigned_url(
        ClientMethod='put_object',
        Params={'Bucket': settings.s3_bucket, 'Key': key, 'ContentType': content_type},
        ExpiresIn=600,
    )
    return {'upload_url': url, 'key': key}
