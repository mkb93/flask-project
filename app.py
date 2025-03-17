from flask import Flask, jsonify, request
import requests
import psycopg2
import os
from dotenv import load_dotenv
from flask_cors import CORS


load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
app = Flask(__name__)
CORS(app)

print(SUPABASE_URL, SUPABASE_KEY)
# Database connection
# DATABASE_URL = os.getenv("https://byfmhdwlnatdmivajvqq.supabase.co", "postgresql://postgres:w.96aRFcy6Gs6RQ@db.byfmhdwlnatdmivajvqq.supabase.co:5432/postgres")

# def get_db_connection():
#   conn = psycopg2.connect(DATABASE_URL)
#   return conn

# test
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

  # headers = {
  #   "apikey": SUPABASE_KEY,
  #   "Authorization": f"Bearer {SUPABASE_KEY}",
  #    "Content-Type": "application/json"
  #   }

  # payload = {
  #   "name": data.get("name"),
  #   "location": data.get("location")
  #   }

  response = requests.post(f"{SUPABASE_URL}/rest/v1/items/data", json=data)
  print("Response status:", response.status_code)
  print("Response text:", response.text)


  try:
    return jsonify(response.json())
  except requests.exceptions.JSONDecodeError:
    return jsonify({"error": "Invalid JSON response from Supabase"}), 500
# @app.route("/")
# def home():
#   conn = get_db_connection()
#   cursor = conn.cursor()
#   cursor.execute("SELECT name FROM items")
#   items = cursor.fetchall()

#   items_list = [ 
#     {"item": item[0]}
#     for item in items
#   ]
#   cursor.close()
#   conn.close()

#   return jsonify(items_list)

if __name__ == "__main__":
  app.run(debug=True)