from flask import Flask, Blueprint


# This will register all routes
def register_routes(app: Flask):
    from .root import root
    from .chat import chat

    # Register blueprints with app
    # NOTE: ordering is very important here.

    # Register all API routes under this blueprint
    api = Blueprint("api", __name__)

    app.register_blueprint(root)
    app.register_blueprint(chat)
    app.register_blueprint(api)
