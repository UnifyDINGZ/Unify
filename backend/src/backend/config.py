from dataclasses import dataclass
from os import getenv


@dataclass(frozen=True)
class MinIOConfiguration:
    user: str | None
    password: str | None
    s3_domain: str | None


@dataclass(frozen=True)
class Configuration:
    db_url: str | None
    minio: MinIOConfiguration


def config_from_env() -> Configuration:
    """
    Reads the environment variables and creates
    a Configuration instance from them

    This function requires the following environment
    variables:
    - DATABASE_URL: URL to the Postgres database
    - MINIO_ROOT_PASSWORD: S3 storage user password
    - MINIO_ROOT_USER: S3 storage username
    - UBD_S3_DOMAIN: Root domain of the S3 storage

    Returns
    -------
    Configuration
        Current server configuration when this
        function is called
    """

    return Configuration(
        db_url=getenv("DATABASE_URL"),
        minio=MinIOConfiguration(
            user=getenv("MINIO_ROOT_USER"),
            password=getenv("MINIO_ROOT_PASSWORD"),
            s3_domain=getenv("UBD_S3_DOMAIN"),
        ),
    )
