from flask import Flask
from routes.main_routes import main_bp
from db import db, init_db
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


    db.init_app(app)

    CORS(app, supports_credentials=True)
    app.register_blueprint(main_bp)

    with app.app_context():
        init_db()

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
