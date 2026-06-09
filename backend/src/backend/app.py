from uvicorn import run
from os import getenv


def main():
    # from importlib.metadata import metadata
    # from pprint import pprint as print

    # package_meta = metadata(__name__.split(".")[0])
    # print(package_meta.json)

    is_dev = getenv("UBD_DEV", "") == "true"

    run(
        "backend.api:router",
        host="0.0.0.0",
        port=8080,
        proxy_headers=True,
        reload=is_dev,
    )
