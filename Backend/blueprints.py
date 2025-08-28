# blueprints.py
from routes.auth import auth_bp
from routes.leagues import leagues_bp
from routes.teams import teams_bp
from routes.local_auth import local_auth_bp

def register_blueprints(app):
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(leagues_bp)
    app.register_blueprint(teams_bp, url_prefix='/teams')
    app.register_blueprint(local_auth_bp, url_prefix='/local_auth')
