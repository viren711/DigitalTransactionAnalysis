import os
import re
import sys
import pandas as pd

from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Table, MetaData as SA_MetaData
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base
from sqlalchemy import inspect

from app import create_app
from db import db


CSV_DIR = "data"
DB_TABLE_NAME_PREFIX = ""
VALID_TABLE_NAME_RE = re.compile(r'[^a-z0-9_]')

def map_dtype_to_sqla(dtype, sample_series=None):
    """Return a SQLAlchemy Column type for a pandas dtype (heuristic)."""
    if pd.api.types.is_integer_dtype(dtype):
        return Integer
    if pd.api.types.is_float_dtype(dtype):
        return Float
    if pd.api.types.is_bool_dtype(dtype):
        return Boolean
    if pd.api.types.is_datetime64_any_dtype(dtype):
        return DateTime
    return String(2048)

def sanitize_table_name(name: str) -> str:
    name = os.path.splitext(name)[0].lower()
    name = re.sub(r'\s+', '_', name)
    name = VALID_TABLE_NAME_RE.sub('_', name)
    if re.match(r'^\d', name):
        name = f"t_{name}"
    return DB_TABLE_NAME_PREFIX + name

def create_table_from_df(metadata: SA_MetaData, table_name: str, df: pd.DataFrame):
    """
    Create a SQLAlchemy Table object (in metadata) from dataframe schema.
    Caller must call metadata.create_all(bind=engine, tables=[table])
    """
    cols = []
    df_columns = list(df.columns)
    id_col = None
    for c in df_columns:
        if c.strip().lower() == 'id':
            id_col = c
            break

    if id_col is None:
        cols.append(Column('id', Integer, primary_key=True, autoincrement=True))

    for col_name in df_columns:
        col_sql_name = re.sub(r'\s+', '_', col_name.strip())
        col_sql_name = re.sub(r'[^\w]', '_', col_sql_name)
        dtype = df[col_name].dtype
        col_type = map_dtype_to_sqla(dtype, df[col_name])
        if id_col is not None and col_name == id_col:
            cols.append(Column(col_sql_name, col_type, primary_key=True))
        else:
            cols.append(Column(col_sql_name, col_type))

    table = Table(table_name, metadata, *cols)
    return table

def import_all_csvs_once(csv_dir: str = CSV_DIR):
    app = create_app()
    with app.app_context():
        engine = db.engine
        metadata = db.metadata  
        inspector = inspect(engine)

        try:
            files = [f for f in os.listdir(csv_dir) if f.lower().endswith('.csv')]
        except Exception as e:
            print(f"[ERROR] Could not list CSV_DIR '{csv_dir}': {e}", file=sys.stderr)
            return

        if not files:
            print(f"No CSV files found in {csv_dir}")
            return

        for fname in files:
            fullpath = os.path.join(csv_dir, fname)
            table_name = sanitize_table_name(fname)
            print(f"[DEBUG] Will attempt import: file='{fullpath}' -> table='{table_name}'")

            
            inspector = inspect(engine)
            if inspector.has_table(table_name):
                print(f"[SKIP] Table '{table_name}' already exists — skipping file {fname}")
                continue

            print(f"[IMPORT] Processing {fname} -> table '{table_name}'")

            
            try:
                df = pd.read_csv(fullpath)
            except Exception as e:
                print(f"  [ERROR] Failed to read CSV {fullpath}: {e}", file=sys.stderr)
                continue

            if df.shape[0] == 0:
                print(f"  [WARN] CSV '{fname}' has 0 data rows; skipping insert.")
            
            orig_cols = list(df.columns)
            colname_map = {}
            for c in orig_cols:
                sc = re.sub(r'\s+', '_', c.strip())
                sc = re.sub(r'[^\w]', '_', sc)
                colname_map[c] = sc
            df.rename(columns=colname_map, inplace=True)

            
            table = create_table_from_df(metadata, table_name, df)

            try:
                metadata.create_all(bind=engine, tables=[table])
                print(f"  [OK] Created table '{table_name}' (or already existed)")
            except Exception as e:
                print(f"  [ERROR] Failed to create table '{table_name}': {e}", file=sys.stderr)
                continue

            
            try:
                reflect_meta = SA_MetaData()
                reflect_meta.reflect(bind=engine, only=[table_name])
            except Exception as e:
                print(f"  [ERROR] Reflection into metadata failed for '{table_name}': {e}", file=sys.stderr)
                try:
                    print("  [DEBUG] DB tables:", inspect(engine).get_table_names())
                except Exception:
                    pass
                continue

            Base = automap_base(metadata=reflect_meta)
            try:
                Base.prepare() 
            except Exception as e:
                print(f"  [ERROR] Automap.prepare() failed for '{table_name}': {e}", file=sys.stderr)
                continue

            
            MappedClass = None
            if hasattr(Base.classes, table_name):
                MappedClass = getattr(Base.classes, table_name)
            else:
                for clsname in dir(Base.classes):
                    if clsname.startswith('_'):
                        continue
                    try:
                        clsobj = getattr(Base.classes, clsname)
                        if hasattr(clsobj, '__table__') and clsobj.__table__.name == table_name:
                            MappedClass = clsobj
                            break
                    except Exception:
                        continue

            if MappedClass is None:
                print(f"  [ERROR] Could not automap a class for table '{table_name}'. Available automapped classes: {list(dir(Base.classes))}", file=sys.stderr)
                continue

            
            records = df.replace({pd.NA: None}).where(pd.notnull(df), None).to_dict(orient='records')


            if len(records) == 0:
                print(f"  [INFO] No records to insert for '{table_name}' (CSV had 0 data rows).")
                continue

            try:
                with Session(engine) as session:
                    session.bulk_insert_mappings(MappedClass, records)
                    session.commit()
                print(f"  [OK] Inserted {len(records)} rows into '{table_name}'")
            except Exception as e:
                print(f"  [ERROR] Failed to insert rows into '{table_name}': {e}", file=sys.stderr)
                try:
                    print("  [DEBUG] sample record keys:", list(records[0].keys()))
                    print("  [DEBUG] table columns:", [c.name for c in reflect_meta.tables[table_name].columns])
                except Exception:
                    pass
                continue

        print("All done.")

if __name__ == '__main__':
    import_all_csvs_once()
