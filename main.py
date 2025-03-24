from dotenv import load_dotenv
import os
# from supabase import create_client
load_dotenv()

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")

# supabase = create_client(url, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5Zm1oZHdsbmF0ZG1pdmFqdnFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg3MDE3NzEsImV4cCI6MjA1NDI3Nzc3MX0.ok9GxAzBL3vTDqv6K7uX4-zd0OjQ2tR1bcTGGM5fV94")

data = supabase.table('items').insert({"name": "face7", 'location': 'face7'}).execute()
data = supabase.table('items').insert({"name": "face6", 'location': 'face6'}).execute()
data = supabase.table('items').update({"name": "face8"}).eq("name", "face7").execute()
data= supabase.table("items").delete().eq("name", "face6").execute()

data = supabase.table("items").select("*").execute()
print(data)