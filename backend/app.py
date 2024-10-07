from flask import Flask, request, jsonify
import psycopg2
from google.cloud import storage
import os

app = Flask(__name__)

# Fetch environment variables
db_user = os.getenv('DB_USER', 'admin1')
db_pass = os.getenv('DB_PASS', 'Mathias01*')
db_name = os.getenv('DB_NAME', 'flask_app_db')
db_host = os.getenv('DB_HOST', '35.226.53.78')  # Localhost if using Cloud SQL Proxy

os.environ["GCLOUD_PROJECT"] = "flaskgkeuploader"
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = "./application_default_credentials.json"
# Set the Google Cloud Storage bucket name
BUCKET_NAME = 'flaskgke-bucket'

# Database connection setup (change according to your GCP PostgreSQL details)
def connect_db():
    conn = psycopg2.connect(
        user=db_user,
        password=db_pass,
        host=db_host,
        database=db_name,
        port=5432  # Default PostgreSQL port
    )
    return conn

# GCP Bucket setup (change according to your bucket)
def upload_to_gcp(file):
    client = storage.Client()
    bucket = client.get_bucket(BUCKET_NAME)
    blob = bucket.blob(file.filename)
    blob.upload_from_file(file)
    return f'File {file.filename} uploaded to GCP Bucket'

# Endpoint to insert data into PostgreSQL
@app.route('/insert', methods=['POST'])
def insert_data():
    data = request.json
    name = data.get('name')
    email = data.get('email')

    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO users (name, email) VALUES (%s, %s)", (name, email))
    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"message": "Data inserted successfully"}), 201

# Endpoint to fetch data from PostgreSQL
@app.route('/get', methods=['GET'])
def get_data():
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users")
    users = cursor.fetchall()
    cursor.close()
    conn.close()

    return jsonify(users)

# Endpoint to upload file to GCP bucket
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"message": "No file part in the request"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"message": "No selected file"}), 400

    message = upload_to_gcp(file)
    return jsonify({"message": message})

