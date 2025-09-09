import os
import secrets
from config import app, db
from routes.local_auth import local_auth_bp
from flask_cors import CORS

# Enable CORS so React (on a different port) can talk to Flask
CORS(app, supports_credentials=True)

# Register Blueprints
app.register_blueprint(local_auth_bp, url_prefix="/local_auth")

# Secret key: use env var if available, otherwise generate one (not great for production sessions)
app.secret_key = os.getenv("FLASK_SECRET_KEY", secrets.token_hex(24))

# API-only root route
@app.route("/")
def home():
    return {"status": "ok", "message": "API running!"}

# Entrypoint
if __name__ == "__main__":
    with app.app_context():
        db.create_all()  # Create tables if they don't exist

    port = int(os.environ.get("PORT", 5000))  # Render assigns $PORT in prod
    app.run(host="0.0.0.0", port=port)
