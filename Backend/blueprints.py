# blueprints.py

from routes.local_auth import local_auth_bp

def register_blueprints(app):
    
    app.register_blueprint(local_auth_bp, url_prefix='/local_auth')
