from app import create_app
from db import db
from sqlalchemy import text

app = create_app()

with app.app_context():
    engine = db.engine

    with engine.connect() as conn:
        result = conn.execute(text(
            "SELECT name FROM sqlite_master WHERE type='table'"
        ))
        tables = [row[0] for row in result.fetchall()]
        print("Tables:", tables)

    
    if "sample11" in tables:
        with engine.connect() as conn:
            result = conn.execute(text("SELECT COUNT(*) FROM sample11"))
            count = result.scalar()
            print("sample11 row count:", count)
    else:
        print("Table 'sample11' does not exist")

    
    if "sample11" in tables:
        with engine.connect() as conn:
            result = conn.execute(text("SELECT * FROM sample11 LIMIT 5"))
            rows = result.fetchall()
            print("\nSample rows:")
            for r in rows:
                try:
                    row_dict = dict(r._mapping)
                except Exception:
                    row_dict = {k: v for k, v in zip(result.keys(), r)}
                print(row_dict)
