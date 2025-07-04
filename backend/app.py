from flask import Flask, request, jsonify
from flask_cors import CORS
import re

app = Flask(__name__)
CORS(app)

def analyze_text(description):
    desc = description.lower()
    score = 0
    suggestions = []

    if any(word in desc for word in ['organic', 'eco-friendly', 'natural']):
        score += 30
        suggestions.append("Mentions eco-friendly materials.")
    if 'plastic' in desc:
        score -= 20
        suggestions.append("Mentions plastic.")
    if 'biodegradable' in desc:
        score += 20
        suggestions.append("Mentions biodegradable material.")
    if 'chemical' in desc or 'pesticide' in desc:
        score -= 15
        suggestions.append("Contains chemical-related keywords.")
    if 'certified' in desc:
        score += 10
        suggestions.append("Mentions certifications.")

    return score, suggestions

def analyze_image(img_url):
    # Dummy logic to simulate visual cues
    if any(x in img_url.lower() for x in ['leaf', 'green', 'fruit']):
        return 15, "Image seems nature-related."
    elif 'plastic' in img_url.lower():
        return -10, "Image might show plastic."
    return 0, "No visual eco cues detected."

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    title = data.get("title", "")
    description = data.get("description", "")
    image = data.get("image", "")

    text_score, text_suggestions = analyze_text(description + " " + title)
    image_score, image_reason = analyze_image(image)

    eco_score = max(0, min(100, 50 + text_score + image_score))

    response = {
        "product": title or "Unknown",
        "ecoScore": eco_score,
        "suggestions": text_suggestions + [image_reason]
    }

    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)
