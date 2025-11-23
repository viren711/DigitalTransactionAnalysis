from app import create_app
from db import db
from sqlalchemy import text

TABLE_NAME = "ecosystem_statistics_upi_merchant_category_classification_2025_oct"

app = create_app()
with app.app_context():
    engine = db.engine
    with engine.connect() as conn:
        conn.execute(text(f"DROP TABLE IF EXISTS {TABLE_NAME}"))
        print(f"Table '{TABLE_NAME}' deleted (if it existed).")
