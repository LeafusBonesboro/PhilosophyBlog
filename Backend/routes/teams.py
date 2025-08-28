import os
import csv
from flask import Blueprint, jsonify, session, redirect, url_for, request
from requests_oauthlib import OAuth2Session
from tokens import load_token
import config
from decorators import require_oauth_token 
import re, urllib.parse


BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # this = Backend/routes/
DATA_DIR = os.path.join(BASE_DIR, "..", "data")

RANKINGS_CSV_PATH = os.path.join(DATA_DIR, "rankings.csv")
PLAYER_IMAGES_CSV_PATH = os.path.join(DATA_DIR, "player_images.csv")



teams_bp = Blueprint('teams', __name__)

@teams_bp.route('/my_team', methods=['GET'])
@require_oauth_token
def get_my_team_and_players(yahoo):
  


    # Fetch the current user's team
    response = yahoo.get('https://fantasysports.yahooapis.com/fantasy/v2/users;use_login=1/games;game_keys=449/teams?format=json')

    if response.status_code != 200:
        return jsonify({"error": "Unable to fetch user's team", "status_code": response.status_code})

    data = response.json()

    # Access the user's teams
    teams = data['fantasy_content']['users']['0']['user'][1]['games']['0']['game'][1]['teams']

    # Store the team and its players
    teams_with_players = []

    for team_key, team_data in teams.items():
        if team_key == 'count':
            continue  # Skip the count key

        # Properly access the team details
        team = team_data['team'][0]
        team_name = team[2]['name']
        team_key = team[0]['team_key']

        # Fetch players for the current user's team
        players_response = yahoo.get(f'https://fantasysports.yahooapis.com/fantasy/v2/team/{team_key}/roster?format=json')
        if players_response.status_code != 200:
            return jsonify({"error": f"Unable to fetch players for team {team_name}", "status_code": players_response.status_code})

        players_data = players_response.json()
        players = players_data['fantasy_content']['team'][1]['roster']['0']['players']

  # Extract player names and positions
        player_list = []
        for player_key, player_info in players.items():
            if player_key == 'count':
                continue  # Skip the count key

            # Get player name
            player_name = player_info['player'][0][2]['name']['full']

            # Get player position
            try:
                # Check if primary position exists
                player_position = player_info['player'][0][4].get('primary_position', "Unknown")
            except (IndexError, KeyError):
                try:
                    # Fallback to eligible positions
                    eligible_positions = player_info['player'][0][9].get('eligible_positions', [])
                    player_position = eligible_positions[0] if eligible_positions else "Unknown"
                except (IndexError, KeyError):
                    player_position = "Unknown"

            # Append player name and position to the list
            player_list.append({
                "name": player_name,
                "position": player_position
            })

        # Append the team and its players to the list
        teams_with_players.append({
            "team_name": team_name,
            "players": player_list
        })

    # Return the current user's team and players as JSON
    return jsonify(teams_with_players)

@teams_bp.route('/all_teams', methods=['GET'])
def get_all_teams_and_players():
    token = load_token()
    if not token:
        return redirect(url_for('auth.login'))

    yahoo = OAuth2Session(config.CLIENT_ID, token=token)

    # Fetch all teams in the league
    league_key = '449.l.227774'  # Replace with your league key
    response = yahoo.get(f'https://fantasysports.yahooapis.com/fantasy/v2/league/{league_key}/teams?format=json')

    if response.status_code != 200:
        return jsonify({"error": "Unable to fetch league teams", "status_code": response.status_code})

    data = response.json()

    # Access the teams data from the league
    teams = data['fantasy_content']['league'][1]['teams']

    # Store all teams and their players
    all_teams_with_players = []

    # Loop through each team and fetch its players
    for team_key, team_data in teams.items():
        if team_key == 'count':
            continue  # Skip the count key

        # Properly access the team details from the list
        team = team_data['team'][0]
        team_name = team[2]['name']
        team_key = team[0]['team_key']

        # Fetch the players for this team
        players_response = yahoo.get(f'https://fantasysports.yahooapis.com/fantasy/v2/team/{team_key}/roster?format=json')
        if players_response.status_code != 200:
            return jsonify({"error": f"Unable to fetch players for team {team_name}", "status_code": players_response.status_code})

        players_data = players_response.json()
        players = players_data['fantasy_content']['team'][1]['roster']['0']['players']

        # Extract player names and positions
        player_list = []
        for player_key, player_info in players.items():
            if player_key == 'count':
                continue  # Skip the count key
            
            # Get player name
            player_name = player_info['player'][0][2]['name']['full']
            
            # Fetch player position from 'primary_position' or fallback to 'eligible_positions'
            primary_position = player_info['player'][0][12].get('primary_position', "Unknown")
            
            # Fallback to eligible positions if primary_position is not available
            if primary_position == "Unknown":
                eligible_positions = player_info['player'][0][17].get('eligible_positions', [])
                if eligible_positions:
                    primary_position = eligible_positions[0]['position']  # Use the first eligible position

            # Append player name and position to the list
            player_list.append({
                "name": player_name,
                "position": primary_position
            })

        # Append the team and its players to the list
        all_teams_with_players.append({
            "team_name": team_name,
            "players": player_list
        })

    # Return all teams with their players as JSON
    return jsonify(all_teams_with_players)


@teams_bp.route('/player_info', methods=['GET'])
def get_player_info():
    # Load OAuth token
    token = load_token()
    if not token:
        return redirect(url_for('auth.login'))

    yahoo = OAuth2Session(config.CLIENT_ID, token=token)

    # Fetch all teams in the league (similar to /all_teams route)
    league_key = '449.l.227774'
    response = yahoo.get(f'https://fantasysports.yahooapis.com/fantasy/v2/league/{league_key}/teams?format=json')

    if response.status_code != 200:
        return jsonify({"error": "Unable to fetch league teams", "status_code": response.status_code})

    data = response.json()

    # Access the teams data from the league
    teams = data['fantasy_content']['league'][1]['teams']

    # Iterate like in /all_teams
    for team_key, team_data in teams.items():
        if team_key == 'count':
            continue  # Skip the count key

        # Properly access the team details like in /all_teams
        team = team_data['team'][0]
        team_name = team[2]['name']
        team_key = team[0]['team_key']

        # Fetch the players for this team
        players_response = yahoo.get(f'https://fantasysports.yahooapis.com/fantasy/v2/team/{team_key}/roster?format=json')

        if players_response.status_code != 200:
            return jsonify({"error": f"Unable to fetch players for team {team_key}", "status_code": players_response.status_code})

        players_data = players_response.json()
        players = players_data['fantasy_content']['team'][1]['roster']['0']['players']

        # Extract player names and positions
        player_list = []
        for player_key, player_info in players.items():
            if player_key == 'count':
                continue  # Skip the count key

            player_name = player_info['player'][0][2]['name']['full']
            
            # Fetch the position from 'primary_position' field
            primary_position = player_info['player'][0][16].get('primary_position', "Unknown")
            
            # Fallback to eligible positions if primary_position is not available
            if primary_position == "Unknown":
                eligible_positions = player_info['player'][0][17].get('eligible_positions', [])
                if eligible_positions:
                    primary_position = eligible_positions[0]['position']  # Use the first eligible position

            # Append player name and position to the list
            player_list.append({
                "name": player_name,
                "position": primary_position
            })

        # Return the team and its players as JSON
        return jsonify({
            "team_name": team_name,
            "players": player_list
        })



def format_player_name(name: str) -> str:
    """
    Convert ranking player names into the same format as in the CSV URLs.
    Example: "Omarion Hampton" -> "omarion-hampton"
             "Ashton Jeanty"   -> "ashton-jeanty" (fallback also checks underscore)
             "Trey McBride"    -> "trey-mcbride"
    """
    if not name:
        return ""
    return name.lower().replace(" ", "-").strip()


@teams_bp.route('/rankings', methods=['GET'])
def get_rankings():
    players = []
    images = {}

    # Load image CSV
    try:
        with open(PLAYER_IMAGES_CSV_PATH, newline='', encoding='utf-8') as imgfile:
            reader = csv.DictReader(imgfile)
            for row in reader:
                url = row.get("player_image", "")
                if not url:
                    continue

                filename = url.split("/")[-1].replace(".webp", "")
                player_name = filename.split("-", 1)[-1]  # "8130-Trey-McBride" → "Trey-McBride"

                # Store both hyphen and space versions as keys
                images[player_name] = url
                images[player_name.replace("-", " ")] = url

    except FileNotFoundError:
        print("⚠️ player_images.csv not found")

    # Load rankings CSV
    try:
        with open(RANKINGS_CSV_PATH, newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                player_name = row.get("Player", "").strip()

                # Now lookup works for both
                image_url = images.get(player_name, None)

                players.append({
                    "name": player_name,
                    "position": row.get("Pos"),
                    "team": row.get("Team"),
                    "adp": row.get("ADP"),
                    "rank": row.get("Rank"),
                    "imageUrl": image_url
                })
    except FileNotFoundError:
        return jsonify({"error": "Rankings CSV not found"}), 404

    # Sort players by ADP
    players.sort(
        key=lambda x: float(x['adp']) if x['adp'] not in (None, '', 'NA') else float('inf')
    )

    return jsonify(players)
