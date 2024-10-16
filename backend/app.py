import datetime
from flask import Flask, request, jsonify
import psycopg2
from google.cloud import storage
from flask_cors import CORS
from google.cloud import pubsub_v1
import os
import threading

app = Flask(__name__)
project_id = "flaskgkeuploader"
subscription_id = "my-sub"

CORS(app)

# Fetch environment variables
db_user = os.getenv('DB_USER', 'admin1')
db_pass = os.getenv('DB_PASS', 'Test1234*')
db_name = os.getenv('DB_NAME', 'flask_app_db')
db_host = os.getenv('DB_HOST', '34.31.3.147')  # Localhost if using Cloud SQL Proxy

os.environ["GCLOUD_PROJECT"] = "flaskgkeuploader"

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = os.getenv('CREDENTIALS', "./application_default_credentials.json")
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

# Insert messages into PostgreSQL
def insert_messages(message):
    conn = connect_db()
    cursor = conn.cursor()
    time = datetime.datetime.now()
    cursor.execute("INSERT INTO messages (data, timestamp) VALUES (%s, %s)", (message, time))
    conn.commit()
    cursor.close()
    conn.close()

def create_table_messages():
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute("CREATE TABLE IF NOT EXISTS messages (id SERIAL PRIMARY KEY, data VARCHAR(100), timestamp TIMESTAMP)")
    conn.commit()
    cursor.close()
    conn.close()

create_table_messages()
# Create a subscriber client
subscriber = pubsub_v1.SubscriberClient()
subscription_path = subscriber.subscription_path(project_id, subscription_id)

def callback(message: pubsub_v1.subscriber.message.Message) -> None:
    data = message.data.decode("utf-8")
    print(f"Received message: {data}")
    insert_messages(data)
    message.ack()  # Acknowledge the message only after processing

# Start the subscriber to listen for messages
def start_subscriber():
    with subscriber:
        streaming_pull_future = subscriber.subscribe(subscription_path, callback=callback)
        print(f"Listening for messages on {subscription_path}..\n")
        try:
            # Keep listening indefinitely
            streaming_pull_future.result()
        except Exception as e:
            print(f"Subscriber error: {e}")

# Start the subscriber in a separate thread to keep listening for messages
subscriber_thread = threading.Thread(target=start_subscriber)
subscriber_thread.start()
    
# Endpoint to insert data into PostgreSQL
@app.route('/insert', methods=['POST'])
def insert_data():
    data = request.json
    name = data.get('name')
    email = data.get('email')

    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute("CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name VARCHAR(100), email VARCHAR(100))")
    conn.commit()

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

# Endpoint to delete user from PostgreSQL
@app.route('/delete/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM users WHERE id = %s", (user_id,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "User deleted successfully"}), 200

# Endpoint to upload file to GCP bucket
@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    if not file:
        return jsonify({"message": "No file provided!"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"message": "No selected file"}), 400

    message = upload_to_gcp(file)
    return jsonify({"message": message})

# Endpoint to fetch messages from PostgreSQL
@app.route('/get-messages', methods=['GET'])
def get_messages():
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM messages")
    messages = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(messages)

if __name__ == '__main__':
    # Run the Flask app
    app.run(host='0.0.0.0', port=5000, debug=True)
