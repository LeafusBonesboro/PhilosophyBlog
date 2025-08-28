from functools import wraps
from flask import redirect, url_for, jsonify
from requests_oauthlib import OAuth2Session
from tokens import load_token
import config

def require_oauth_token(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = load_token()
        if not token:
            return redirect(url_for('auth.login'))

        # Create an OAuth2Session with the token
        yahoo = OAuth2Session(config.CLIENT_ID, token=token)
        return f(yahoo, *args, **kwargs)

    return decorated_function
