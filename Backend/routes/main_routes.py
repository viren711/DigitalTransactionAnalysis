from flask import Blueprint, render_template,request, jsonify,current_app
from db import db
from sqlalchemy import text, inspect
from flask_cors import CORS

main_bp = Blueprint('main', __name__)
CORS(main_bp,supports_credentials=True)


@main_bp.route('/')
def home():
    return "Backend server has started", 200


def fetch_rows_from_table(table_name: str, limit: int = 100, offset: int = 0):
    engine = db.engine
    inspector = inspect(engine)
    if table_name not in inspector.get_table_names():
        raise LookupError(f"Table '{table_name}' does not exist")

    sql = text(f"SELECT * FROM {table_name} LIMIT :limit OFFSET :offset")
    with engine.connect() as conn:
        result = conn.execute(sql, {"limit": limit, "offset": offset})
        rows = result.fetchall()
        return [dict(r._mapping) for r in rows]

# --- Route 1: Ecosystem statistics ---
@main_bp.route('/api/ecosystem', methods=['GET'])
def api_ecosystem():
    """
    GET /api/ecosystem?limit=100&offset=0
    Returns rows from table:
      ecosystem_statistics_upi_merchant_category_classification_2025_oct
    """
    table = "ecosystem_statistics_upi_merchant_category_classification_2025_oct"
    try:
        limit = int(request.args.get("limit", 100))
        offset = int(request.args.get("offset", 0))
    except ValueError:
        return jsonify({"status": "error", "message": "limit and offset must be integers"}), 400

    try:
        rows = fetch_rows_from_table(table, limit=limit, offset=offset)
    except LookupError as e:
        return jsonify({"status": "error", "message": str(e)}), 404
    except Exception as e:
        current_app.logger.exception("Failed to query ecosystem table")
        return jsonify({"status": "error", "message": "server error"}), 500

    return jsonify({"status": "ok", "table": table, "count": len(rows), "rows": rows})

# --- Route 2: Digital payments ---
@main_bp.route('/api/digital_payments', methods=['GET'])
def api_digital_payments():
    """
    GET /api/digital_payments?limit=100&offset=0
    Returns rows from table: digital_payments
    """
    table = "digital_payments"
    try:
        limit = int(request.args.get("limit", 100))
        offset = int(request.args.get("offset", 0))
    except ValueError:
        return jsonify({"status": "error", "message": "limit and offset must be integers"}), 400

    try:
        rows = fetch_rows_from_table(table, limit=limit, offset=offset)
    except LookupError as e:
        return jsonify({"status": "error", "message": str(e)}), 404
    except Exception as e:
        current_app.logger.exception("Failed to query digital_payments table")
        return jsonify({"status": "error", "message": "server error"}), 500

    return jsonify({"status": "ok", "table": table, "count": len(rows), "rows": rows})

# --- Route 3: Sample11 ---
@main_bp.route('/api/sample11', methods=['GET'])
def api_sample11():
    """
    GET /api/sample11?limit=100&offset=0
    Returns rows from table: sample11
    """
    table = "sample11"
    try:
        limit = int(request.args.get("limit", 100))
        offset = int(request.args.get("offset", 0))
    except ValueError:
        return jsonify({"status": "error", "message": "limit and offset must be integers"}), 400

    try:
        rows = fetch_rows_from_table(table, limit=limit, offset=offset)
    except LookupError as e:
        return jsonify({"status": "error", "message": str(e)}), 404
    except Exception as e:
        current_app.logger.exception("Failed to query sample11 table")
        return jsonify({"status": "error", "message": "server error"}), 500

    return jsonify({"status": "ok", "table": table, "count": len(rows), "rows": rows})

# --- Route 4: Bankwise Top 10 ---
@main_bp.route('/api/bankwise_top10_upi', methods=['GET'])
def api_bankwise_top10_upi():
    """
    GET /api/bankwise_top10_upi?limit=100&offset=0
    Returns rows from table: bankwise_top10_upi
    """
    table = "bankwise_top10_upi"
    try:
        limit = int(request.args.get("limit", 100))
        offset = int(request.args.get("offset", 0))
    except ValueError:
        return jsonify({"status": "error", "message": "limit and offset must be integers"}), 400

    try:
        rows = fetch_rows_from_table(table, limit=limit, offset=offset)
    except LookupError as e:
        return jsonify({"status": "error", "message": str(e)}), 404
    except Exception as e:
        current_app.logger.exception("Failed to query bankwise_top10_upi table")
        return jsonify({"status": "error", "message": "server error"}), 500

    return jsonify({"status": "ok", "table": table, "count": len(rows), "rows": rows})

# --- Route 5: Digital_Payments_Predictions_25
@main_bp.route('/api/digital_payments_with_25_preds', methods=['GET'])
def api_digital_payments_with_25_preds():
    """
    GET /api/digital_payments_with_25_preds?limit=100&offset=0
    Returns rows from table: digital_payments_with_25_preds
    """
    table = "digital_payments_with_25_preds"
    try:
        limit = int(request.args.get("limit", 100))
        offset = int(request.args.get("offset", 0))
    except ValueError:
        return jsonify({"status": "error", "message": "limit and offset must be integers"}), 400

    try:
        rows = fetch_rows_from_table(table, limit=limit, offset=offset)
    except LookupError as e:
        return jsonify({"status": "error", "message": str(e)}), 404
    except Exception as e:
        current_app.logger.exception("Failed to query digital_payments_with_25_preds table")
        return jsonify({"status": "error", "message": "server error"}), 500

    return jsonify({"status": "ok", "table": table, "count": len(rows), "rows": rows})

# --- Route 6: Digital_Payments_Predictions_26/27
@main_bp.route('/api/digital_payments_predictions_26_27', methods=['GET'])
def api_digital_payments_predictions_26_27():
    """
    GET /api/digital_payments_predictions_26_27?limit=100&offset=0
    Returns rows from table: digital_payments_predictions_26_27
    """
    table = "digital_payments_predictions_26_27"
    try:
        limit = int(request.args.get("limit", 100))
        offset = int(request.args.get("offset", 0))
    except ValueError:
        return jsonify({"status": "error", "message": "limit and offset must be integers"}), 400

    try:
        rows = fetch_rows_from_table(table, limit=limit, offset=offset)
    except LookupError as e:
        return jsonify({"status": "error", "message": str(e)}), 404
    except Exception as e:
        current_app.logger.exception("Failed to query digital_payments_predictions_26_27 table")
        return jsonify({"status": "error", "message": "server error"}), 500

    return jsonify({"status": "ok", "table": table, "count": len(rows), "rows": rows})



