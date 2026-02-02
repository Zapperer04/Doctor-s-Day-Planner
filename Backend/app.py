from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os

# Initialize Flask app
app = Flask(__name__, static_folder="../Frontend", static_url_path="")
CORS(app)

# ✅ Serve Frontend Pages
@app.route('/')
def serve_homepage():
    return send_from_directory(app.static_folder, "index.html")

@app.route('/<path:filename>')
def serve_static(filename):
    """Serve other static files like login.html, CSS, JS, etc."""
    return send_from_directory(app.static_folder, filename)

# ✅ API route: Login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    # Demo login validation
    if username == "doctor@example.com" and password == "12345":
        return jsonify({"status": "success", "message": "Login successful!"})
    else:
        return jsonify({"status": "error", "message": "Invalid credentials"}), 401


if __name__ == '__main__':
    # Run backend server
    app.run(debug=True)
