from flask import Flask, url_for
from api.routes import register_routes

# Modules
import api.openai


# Create Flask app in application factory format
def create_app() -> Flask:
    # Create and configure the app
    app = Flask(__name__)

    # Register all exceptions for routes
    from utils.exceptions import handle_exception

    app.register_error_handler(Exception, handle_exception)

    # # Register all routes with Flask app
    register_routes(app)

    return app
