from api import create_app

# This will be called by nginx/wsgi to start the server
# Simply runs the app if valid
application = create_app()

# Run the app if this module is called directly
if __name__ == "__main__":
    application.run()
