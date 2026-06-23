from fastapi import FastAPI, Depends
from starlette.middleware.cors import CORSMiddleware

from supertokens_python import get_all_cors_headers
from supertokens_python.recipe.session import SessionContainer
from supertokens_python.recipe.session.framework.fastapi import verify_session
from supertokens_python.framework.fastapi import get_middleware

from os import environ

router = FastAPI()

router.add_middleware(get_middleware())
router.add_middleware(
    CORSMiddleware,
    allow_origins=["pterano.com"],
    allow_credentials=True,
    allow_methods=["GET", "PUT", "POST", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["Content-Type"]
    + get_all_cors_headers(),  # SuperTokens adds its own headers
)


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


@router.get("/restricted", tags=["Experimental features"])
async def protected(
    session: SessionContainer = Depends(verify_session()),
) -> dict[str, str]:
    """
    An example of a resource protected by SuperTokens
    """
    return {"status": "authenticated", "session_id": session.get_user_id()}
