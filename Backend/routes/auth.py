from flask import Blueprint, redirect, request, session, url_for
from requests_oauthlib import OAuth2Session
from tokens import save_token
import config
import os
from oauthlib.oauth2 import TokenExpiredError
from tokens import save_token, load_token

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login')
def login():
    os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

    yahoo = OAuth2Session(config.CLIENT_ID, redirect_uri=config.REDIRECT_URI)
    authorization_url, state = yahoo.authorization_url(config.AUTHORIZATION_BASE_URL)

    session['oauth_state'] = state
    print(f"State stored in session during login: {session['oauth_state']}")

    return redirect(authorization_url)


@auth_bp.route('/callback')
def callback():
    # Log the full callback URL for debugging purposes
    print(f"Full callback URL: {request.url}")

    if 'oauth_state' not in session:
        print("State not found in session")
        return redirect(url_for('auth.login'))

    print(f"State in session during callback: {session['oauth_state']}")
    print(f"State in response during callback: {request.args.get('state')}")

    if session['oauth_state'] != request.args.get('state'):
        print("State mismatch error!")
        return "Error: State mismatch. Possible CSRF attack."

    # Proceed with token fetching
    yahoo = OAuth2Session(config.CLIENT_ID, state=session['oauth_state'], redirect_uri=config.REDIRECT_URI)
    token = yahoo.fetch_token(config.TOKEN_URL, client_secret=config.CLIENT_SECRET, authorization_response=request.url)

    session['oauth_token'] = token
    save_token(token)

    return redirect("https://leafusbonesboro.github.io/FantasyFootballOptimizer/")



@auth_bp.route('/refresh_token')
def refresh_token():
    # Load the token from file
    token = load_token()
    if not token:
        return redirect(url_for('auth.login'))  # No token, redirect to login

    yahoo = OAuth2Session(config.CLIENT_ID, token=token)

    try:
        # Try making an API request; this will fail if the access token is expired
        response = yahoo.get('https://fantasysports.yahooapis.com/fantasy/v2/users;use_login=1/games?format=json')

        # If the access token is valid (response status != 401), no need to refresh
        if response.status_code == 200:
            return "Token is still valid. No refresh needed."
        else:
            raise TokenExpiredError  # Manually trigger token refresh

    except TokenExpiredError:
        # If the access token is expired, refresh it using the refresh token
        try:
            new_token = yahoo.refresh_token(config.TOKEN_URL, refresh_token=token['refresh_token'])
            session['oauth_token'] = new_token  # Save the new token in the session
            save_token(new_token)  # Save the new token in a file for future use
            return "Token refreshed!"
        except Exception as e:
            return f"Error refreshing token: {e}"



