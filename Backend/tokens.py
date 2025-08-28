import json

def save_token(token, filename='token.json'):
    with open(filename, 'w') as f:
        json.dump(token, f)

def load_token(filename='token.json'):
    try:
        with open(filename, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return None
