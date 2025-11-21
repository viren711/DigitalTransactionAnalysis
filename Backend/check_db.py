# check_db.py (fixed)
from app import create_app
from db import db
from sqlalchemy import text

app = create_app()

with app.app_context():
    engine = db.engine

    # ---- Get table list ----
    with engine.connect() as conn:
        result = conn.execute(text(
            "SELECT name FROM sqlite_master WHERE type='table'"
        ))
        tables = [row[0] for row in result.fetchall()]
        print("Tables:", tables)

    # ---- Check row count for sample11 ----
    if "sample11" in tables:
        with engine.connect() as conn:
            result = conn.execute(text("SELECT COUNT(*) FROM sample11"))
            count = result.scalar()
            print("sample11 row count:", count)
    else:
        print("Table 'sample11' does not exist")

    # ---- Show 5 sample rows ----
    if "sample11" in tables:
        with engine.connect() as conn:
            result = conn.execute(text("SELECT * FROM sample11 LIMIT 5"))
            rows = result.fetchall()
            print("\nSample rows:")
            for r in rows:
                # r is a SQLAlchemy Row; use r._mapping to convert to dict safely
                try:
                    row_dict = dict(r._mapping)
                except Exception:
                    # fallback: convert by index (column names available via result.keys())
                    row_dict = {k: v for k, v in zip(result.keys(), r)}
                print(row_dict)
