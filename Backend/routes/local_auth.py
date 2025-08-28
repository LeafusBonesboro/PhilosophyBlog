from flask import Blueprint, request, jsonify, session, render_template
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User  # Assuming User model is defined in models.py


local_auth_bp = Blueprint('local_auth', __name__)

# Route for user registration
@local_auth_bp.route('/local_register', methods=['POST'])
def local_register():
    # Use form data if available (for form submission compatibility)
    username = request.form.get('username')
    password = request.form.get('password')

    # Check if both username and password are provided
    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    # Check if the username already exists
    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username already exists"}), 409

    # Create a new user and save them in the database
    hashed_password = generate_password_hash(password)
    user = User(username=username, password_hash=hashed_password)
    db.session.add(user)
    db.session.commit()

    # Redirect to login page after successful registration
    return render_template('local_login.html', message="Registration successful! Please log in.")


# Route for user login
@local_auth_bp.route('/local_login', methods=['POST'])
def local_login():
    # Use form data instead of JSON to support form submissions
    username = request.form.get('username')
    password = request.form.get('password')

    # Check if the username exists and the password is correct
    user = User.query.filter_by(username=username).first()
    if user and check_password_hash(user.password_hash, password):
        # Set session variables to indicate user is logged in
        session['user_id'] = user.id
        session['username'] = user.username
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"error": "Invalid username or password"}), 401



# Route for logging out the user
@local_auth_bp.route('/local_logout', methods=['POST'])
def local_logout():
    session.clear()  # Clear all session data to log out the user
    return jsonify({"message": "Logged out successfully"}), 200


# Protected route example
@local_auth_bp.route('/protected', methods=['GET'])
def protected_route():
    # Check if the user is logged in by verifying 'user_id' in the session
    if 'user_id' not in session:
        return jsonify({"error": "Authentication required"}), 401

    # If logged in, render the protected page with the logout button
    return render_template('protected.html')


@local_auth_bp.route('/local_login_page', methods=['GET'])
def local_login_page():
    return render_template('local_login.html')

@local_auth_bp.route('/local_register_page', methods=['GET'])
def local_register_page():
    return render_template('local_register.html')




