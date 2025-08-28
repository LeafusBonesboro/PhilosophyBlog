from flask import render_template, Flask
import os
import secrets
from routes.auth import auth_bp
from routes.leagues import leagues_bp
from routes.teams import teams_bp
from config import app, db

from routes.local_auth import local_auth_bp


os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

generated_secret_key = secrets.token_hex(24)  # Generates a random 24-byte hexadecimal string



# Use a persistent secret key (preferably from environment variable)
#app.secret_key = os.getenv('FLASK_SECRET_KEY', 'a_fixed_secret_key_here')
# Use a persistent secret key (preferably from environment variable)
app.secret_key = os.getenv('FLASK_SECRET_KEY', 'a_fixed_secret_key_here')

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix='/auth')  # Add the /auth pre
app.register_blueprint(leagues_bp)
app.register_blueprint(teams_bp, url_prefix='/teams')  # Add a prefix for API routes
app.register_blueprint(local_auth_bp, url_prefix='/local_auth')

@app.route('/')
def home():
    return render_template('base.html')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create tables if they don't exist

    app.run(debug=True)
# .\ngrok http 5000
