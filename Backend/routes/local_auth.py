from flask import Blueprint, request, jsonify, session
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User  # your User model

local_auth_bp = Blueprint('local_auth', __name__)

# ✅ Register with JSON
@local_auth_bp.route('/local_register', methods=['POST'])
def local_register():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username already exists"}), 409

    hashed_password = generate_password_hash(password)
    user = User(username=username, password_hash=hashed_password)
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "Registration successful! Please log in."}), 201


# ✅ Login with JSON
@local_auth_bp.route('/local_login', methods=['POST'])
def local_login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user = User.query.filter_by(username=username).first()
    if user and check_password_hash(user.password_hash, password):
        session['user_id'] = user.id
        session['username'] = user.username
        return jsonify({"message": "Login successful", "username": user.username}), 200
    else:
        return jsonify({"error": "Invalid username or password"}), 401


# ✅ Logout
@local_auth_bp.route('/local_logout', methods=['POST'])
def local_logout():
    session.clear()
    return jsonify({"message": "Logged out successfully"}), 200


# ✅ Protected example
@local_auth_bp.route('/protected', methods=['GET'])
def protected_route():
    if 'user_id' not in session:
        return jsonify({"error": "Authentication required"}), 401
    return jsonify({"message": f"Hello {session['username']}, you are logged in!"})
