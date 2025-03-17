from flask import Flask, jsonify, request
import requests
import os
from dotenv import load_dotenv
from flask_cors import CORS


load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def home():
  headers = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}"
  }
  response= requests.get(f"{SUPABASE_URL}/rest/v1/items", headers=headers)

  if response.status_code != 200:
    return jsonify({"error": response.json()}), response.status_code
  
  return jsonify(response.json())

@app.route('/add-item', methods=['POST'])
def add_item():
  data = request.get_json()

  print("Received data:", data)

  response = requests.post(f"{SUPABASE_URL}/rest/v1/items/data", json=data)
  print("Response status:", response.status_code)
  print("Response text:", response.text)


  try:
    return jsonify(response.json())
  except requests.exceptions.JSONDecodeError:
    return jsonify({"error": "Invalid JSON response from Supabase"}), 500

if __name__ == "__main__":
  app.run(debug=True)