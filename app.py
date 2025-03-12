from flask import Flask, jsonify
import psycopg2
import os

app = Flask(__name__)

# Database connection
DATABASE_URL = os.getenv("https://byfmhdwlnatdmivajvqq.supabase.co", "postgresql://postgres:w.96aRFcy6Gs6RQ@db.byfmhdwlnatdmivajvqq.supabase.co:5432/postgres")

def get_db_connection():
  conn = psycopg2.connect(DATABASE_URL)
  return conn

@app.route("/")
def home():
  conn = get_db_connection()
  cursor = conn.cursor()
  cursor.execute("SELECT 'Hello from the database!'")
  result = cursor.fetchone()
  conn.close()
  return jsonify({"message": result[0]})

if __name__ == "__main__":
  app.run(debug=True)