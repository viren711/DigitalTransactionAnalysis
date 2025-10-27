from flask import Blueprint, render_template

main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def home():
    return render_template('home.html', title="Home", message="Welcome To Our Digital Transaction Analysis Application")

@main_bp.route('/get_trends')
def get_trends():
    return render_template('trends.html', title="Trends", message="Welcome to Trends Page")

@main_bp.route('/get_summary')
def get_summary():
    return render_template('summary.html', title="Summary", message="Welcome to Summary Page")
