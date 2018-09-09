import os
import io
import boto3
import json

S3_CLIENT = boto3.session.Session().client('s3')

# The name of the bucket on S3
BUCKET_NAME = os.environ.get('AWS_BUCKET')


def get_file(key):
    try:
        json_obj = S3_CLIENT.get_object(Bucket=BUCKET_NAME, Key=key)
        return json_obj['Body'].read()
    except S3_CLIENT.exceptions.NoSuchKey:
        return None


def get_json(key):
    try:
        json_obj = S3_CLIENT.get_object(Bucket=BUCKET_NAME, Key=key)
        return json.loads(json_obj['Body'].read().decode())
    except S3_CLIENT.exceptions.NoSuchKey:
        return None


def put_file(key, upload_file):
    file_like = io.BytesIO(upload_file)
    S3_CLIENT.upload_fileobj(file_like, BUCKET_NAME, key)
