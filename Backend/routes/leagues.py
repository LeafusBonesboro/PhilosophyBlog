from flask import Blueprint, redirect, url_for, session, render_template, request
from tokens import load_token
from requests_oauthlib import OAuth2Session
import requests
import config

leagues_bp = Blueprint('leagues',__name__)


@leagues_bp.route('/leagues')
def get_leagues():
    # Load the token from file
    token = load_token()
    if not token:
        return redirect(url_for('auth.login'))

    yahoo = OAuth2Session(config.CLIENT_ID, token=token)
    
    # Add a query parameter to request JSON format
    response = yahoo.get('https://fantasysports.yahooapis.com/fantasy/v2/users;use_login=1/games?format=json')

    # Check if the request was successful
    if response.status_code != 200:
        return f"Error: Unable to fetch leagues. Status code: {response.status_code}. Response: {response.text}"

    # Print the raw response for debugging
    print(response.text)

    try:
        return response.json()  # Parse JSON response
    except requests.exceptions.JSONDecodeError:
        return f"Error: Unable to parse response as JSON. Response: {response.text}"
    

@leagues_bp.route ('/select_league')
def select_league():
    token = load_token()
    if not token:
        return redirect(url_for('auth.login'))

    yahoo = OAuth2Session(config.CLIENT_ID, token=token)

    # Fetch the user GUID
    user_response = yahoo.get('https://fantasysports.yahooapis.com/fantasy/v2/users;use_login=1?format=json')
    if user_response.status_code != 200:
        return f"Error fetching user data. Status code: {user_response.status_code}"

    user_data = user_response.json()
    guid = user_data['fantasy_content']['users']['0']['user'][0]['guid']

    # Now fetch the leagues for the user in the specific game (Football 2024)
    response = yahoo.get(f'https://fantasysports.yahooapis.com/fantasy/v2/users;use_login=1/games;game_keys=449/leagues?format=json')
    if response.status_code != 200:
        return f"Error: Unable to fetch leagues. Status code: {response.status_code}. Response: {response.text}"

    data = response.json()
    leagues = data['fantasy_content']['users']['0']['user'][1]['games']['0']['game'][1]['leagues']

    football_leagues = []

    for key, league_data in leagues.items():
        if key == 'count':
            continue  # Skip the count key

        if isinstance(league_data, dict) and 'league' in league_data:
            league = league_data['league'][0]
            football_leagues.append({
                'name': league['name'],  # Fetch the specific league name
                'url': league['url'],
                'league_key': league['league_key'],
                'season': league['season']
            })

    if not football_leagues:
        return "No 2024 Football leagues found."

    return render_template('select_league.html', leagues=football_leagues)


@leagues_bp.route('/choose_league', methods=['POST'])
def choose_league():
    # Get the selected league_key from the form
    selected_league = request.form['league']
    print(f"Debug: Selected league_key: {selected_league}")  # Log the selected league_key for debugging

    # Load the token from file
    token = load_token()
    if not token:
        return redirect(url_for('auth.login'))

    yahoo = OAuth2Session(config.CLIENT_ID, token=token)
    
    # Fetch the league details using the league_key
    response = yahoo.get(f'https://fantasysports.yahooapis.com/fantasy/v2/league/{selected_league}?format=json')

    if response.status_code != 200:
        return f"Error: Unable to fetch league details. Status code: {response.status_code}"

    # Parse the league details from the response
    league_details = response.json()
    print(f"Debug: League details response: {league_details}")  # Log the response for debugging

    # Extract league information like the name and URL
    league_name = league_details['fantasy_content']['league'][0]['name']
    league_url = league_details['fantasy_content']['league'][0]['url']

    # Render the league details on the page
    return render_template('choose_league.html', league_name=league_name, league_url=league_url)



@leagues_bp.route('/available_players/<league_key>')
def get_available_players(league_key):
    token = load_token()
    if not token:
        return redirect(url_for('auth.login'))

    yahoo = OAuth2Session(config.CLIENT_ID, token=token)
    response = yahoo.get(f'https://fantasysports.yahooapis.com/fantasy/v2/league/{league_key}/players?format=json')

    if response.status_code != 200:
        return {"error": f"Failed to fetch players. {response.text}"}, response.status_code

    data = response.json()

    players = []

    # Parse out players
    raw_players = data['fantasy_content']['league'][1]['players']
    for key, p_data in raw_players.items():
        if key == "count":
            continue
        player = p_data['player'][0]  # array of player info chunks

        # Extract name + position safely
        name = None
        pos = None
        for chunk in player:
            if isinstance(chunk, dict):
                if 'name' in chunk:
                    name = chunk['name']['full']
                if 'display_position' in chunk:
                    pos = chunk['display_position']

        players.append({
            "name": name,
            "position": pos
        })

    return {"players": players}
