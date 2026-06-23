from supertokens_python import init, InputAppInfo, SupertokensConfig
from supertokens_python.recipe import emailpassword, session, dashboard
from os import environ


def init_auth():
    init(
        app_info=InputAppInfo(
            app_name="Pterano",
            api_domain="api.pterano.com",
            website_domain="pterano.com",
            api_base_path="/auth",
            website_base_path="/auth",
        ),
        supertokens_config=SupertokensConfig(
            # We use try.supertokens for demo purposes.
            # At the end of the tutorial we will show you how to create
            # your own SuperTokens core instance and then update your config.
            connection_uri="http://auth:3567/",
            api_key=environ["API_KEYS"],
        ),
        framework="fastapi",
        recipe_list=[
            session.init(),
            emailpassword.init(),
            dashboard.init(api_key=environ["DASHBOARD_API_KEYS"]),
        ],  # initializes session features
        mode="asgi",  # use wsgi if you are running using gunicorn
    )
