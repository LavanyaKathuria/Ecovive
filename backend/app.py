from flask import Flask, request, jsonify
from flask_cors import CORS
import re

app = Flask(__name__)
CORS(app)

RECOMMENDED_PRODUCTS = [
    {"title": "Reusable Organic Cotton Tote Bag", "score": 90, "url": "https://www.amazon.in/dp/B08BFDG9KM"},
    {"title": "Stainless Steel Water Bottle", "score": 85, "url": "https://www.amazon.in/dp/B07MZ7NLT1"},
    {"title": "Bamboo Toothbrush (Pack of 4)", "score": 88, "url": "https://www.amazon.in/dp/B082XK6MKH"},
    {"title": "Compostable Garbage Bags", "score": 83, "url": "https://www.amazon.in/dp/B07TBD1C84"},
    {"title": "Eco-Friendly Biodegradable Plates", "score": 82, "url": "https://www.amazon.in/dp/B07MCWDZFV"},
    {"title": "Plantable Seed Paper Notebooks", "score": 86, "url": "https://www.amazon.in/dp/B08FJH7CQN"},
    {"title": "Steel Straws Reusable Set", "score": 84, "url": "https://www.amazon.in/dp/B07Y8WPT29"},
    {"title": "Organic Cotton Reusable Face Pads", "score": 87, "url": "https://www.amazon.in/dp/B08J2FZB19"},
    {"title": "Eco-Friendly Lunch Box", "score": 81, "url": "https://www.amazon.in/dp/B085HJLHKS"},
    {"title": "Recycled Paper Pencils", "score": 80, "url": "https://www.amazon.in/dp/B07QSYXV26"},
    {"title": "Coconut Coir Scrub Pads (Kitchen)", "score": 83, "url": "https://www.amazon.in/dp/B082PR8Z6C"},
    {"title": "Biodegradable Toothpicks", "score": 78, "url": "https://www.amazon.in/dp/B07X2MFZP2"},
    {"title": "Eco-Friendly Cleaning Cloths (Bamboo)", "score": 85, "url": "https://www.amazon.in/dp/B08CXLV4RX"},
    {"title": "Natural Loofah Bath Scrubber", "score": 79, "url": "https://www.amazon.in/dp/B07Z48N53K"},
    {"title": "Recycled Notebook with Seed Pen", "score": 86, "url": "https://www.amazon.in/dp/B08FJFTKPN"}
]

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
    

    recommend = None
    if eco_score < 60:
        recommend = max(RECOMMENDED_PRODUCTS, key=lambda x: x["score"])

    response = {
        "product": title or "Unknown",
        "ecoScore": eco_score,
        "suggestions": text_suggestions + [image_reason],
        "recommendation": recommend
    }


    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)

