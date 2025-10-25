from flask import Flask
from routes.main_routes import main_bp

def create_app():
    app = Flask(__name__)
    # app.config.from_object(Config)

    app.register_blueprint(main_bp)

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000)
