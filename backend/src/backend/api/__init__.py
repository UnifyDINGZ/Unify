from fastapi import FastAPI
from os import environ

router = FastAPI()


@router.get("/ping", tags=["Misc"])
async def ping() -> dict:
    """
    Pings the backend. Internally used
    as a healthcheck.
    """
    return {
        "response": f"Pong! Head to the docs at {router.docs_url or "<<Unknown>>"} to see the backend's functionality",
        "environment": dict(environ),
    }
