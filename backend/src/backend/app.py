from uvicorn import run
from os import getenv
from backend.config import config_from_env
from backend.auth import init_auth


def main():
    # from importlib.metadata import metadata

    # package_meta = metadata(__name__.split(".")[0])
    # print(package_meta.json)

    # print(config_from_env())
    init_auth()

    is_dev = getenv("UBD_DEV", "") == "true"
    run(
        "backend.api:router",
        host="0.0.0.0",
        port=8080,
        proxy_headers=True,
        reload=is_dev,
    )
