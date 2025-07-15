from flask import Flask, request, jsonify
app = Flask(__name__)

@app.route('/analyze', methods=['POST'])
def analyze():
    print("Request received!")  # This will show in your terminal
    return jsonify({"status": "success", "data": request.json})

if __name__ == '__main__':
    app.run(debug=True, port=5000, use_reloader=False)