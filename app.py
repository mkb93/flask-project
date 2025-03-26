from flask import Flask, jsonify, request
import requests
import psycopg2
# from supabase import create_client
import os
from dotenv import load_dotenv
from flask_cors import CORS
import json

load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
app = Flask(__name__)
CORS(app)

print(SUPABASE_URL, SUPABASE_KEY)
# supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# test
@app.route('/', methods=['GET'])
def home():
  headers = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}"
  }
  # data = supabase.table("items").select("*").execute()
  # print(data)
  

  response= requests.get(f"{SUPABASE_URL}/rest/v1/items", headers=headers)

  if response.status_code != 200:
    return jsonify({"error": response.json()}), response.status_code
  
  return jsonify(response.json())

@app.route('/add-item/', methods=['POST'])
def add_item():
  data = request.json
  headers = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
     "Content-Type": "application/json"
    }

  payload = {
    "name": data.get("name"),
    "location": data.get("location")
    }

  response = requests.post(f"{SUPABASE_URL}/rest/v1/items", json=payload, headers=headers)
  print("Received data:", response)

  print("Supabase Response Code:", response.status_code)
  print("Supabase Response Body:", response.text)
  if response.status_code == 201:
    return jsonify({"message": "data added succesfully"}), 201
  try:
    return jsonify(response.json()), response.status_code
  except requests.exceptions.JSONDecodeError:
    return jsonify({"error": "Invalid response from supabase"}),500

  return jsonify(response.json())

@app.route('/delete-item/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
  headers = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json"
  }

  response = requests.delete(f"{SUPABASE_URL}/rest/v1/items?id=eq.{item_id}", headers=headers)

  if response.status_code == 204:  # 204 means no content, meaning successful deletion
        return jsonify({"message": "Item deleted successfully"}), 204
  try:
    return jsonify(response.json()), response.status_code
  except requests.exceptions.JSONDecodeError:
    return jsonify({"error": "Invalid response from Supabase"}), 500
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