from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

RECOMMENDED_PRODUCTS = {
    "bag": [
        {"title": "STRUTT 100% Organic Cotton Tote Bag", "score": 90, "url": "https://www.amazon.in/dp/B0C81MCL8X"},
        {"title": "Ecodott Organic Cotton Zipper Tote", "score": 88, "url": "https://www.amazon.in/dp/B0CV5WGW6F"}
    ],
    "toothbrush": [
        {"title": "Rusabl Organic Bamboo Toothbrush (Pack of 4)", "score": 88, "url": "https://www.amazon.in/dp/B07W77TJZP"},
        {"title": "Terra Brush Bamboo Toothbrush Set", "score": 86, "url": "https://www.flipkart.com/p/itmff15db25dbce5"}
    ],
    "bottle": [
        {"title": "Milton Thermosteel Flip Lid Flask", "score": 85, "url": "https://www.amazon.in/dp/B00MMLJTUO"},
        {"title": "Cello Puro Steel-X Water Bottle", "score": 84, "url": "https://www.amazon.in/dp/B08D6T7CSN"}
    ],
    "container": [
        {
            "title": "Signoraware Eco-Friendly Lunch Box Set",
            "score": 86,
            "url": "https://www.amazon.in/dp/B0842ZTZ1T"
        },
        {
            "title": "Home Puff Borosilicate Glass Storage Containers",
            "score": 88,
            "url": "https://www.amazon.in/dp/B08D6L8XJG"
        }
    ],
    "garbage bag": [
        {"title": "Ezee Compostable Garbage Bags", "score": 83, "url": "https://www.amazon.in/dp/B07G9P8NZW"}
    ],
    "plate": [
        {"title": "Ksamah Palm Leaf Plates", "score": 82, "url": "https://www.amazon.in/dp/B08KZMN7RT"}
    ],
    "notebook": [
        {"title": "Indianshelf Recycled Paper Notebook", "score": 86, "url": "https://www.amazon.in/dp/B08GBK2J6F"}
    ],
    "grocery": [
        {"title": "24 Mantra Organic Basmati Rice", "score": 85, "url": "https://www.amazon.in/dp/B07H3NKG3W"}
    ],
    "lunchbox": [
        {"title": "Signoraware Stainless Steel Lunch Box", "score": 84, "url": "https://www.amazon.in/dp/B01M0F7P6M"}
    ],
    "straw": [
        {"title": "Rustic Town Stainless Steel Straw Set", "score": 82, "url": "https://www.amazon.in/dp/B07G7YYDGS"}
    ],
    "loofah": [
        {"title": "Earthy Sapo Natural Loofah", "score": 85, "url": "https://www.amazon.in/dp/B01LYY1T3P"}
    ],
    "scrub pad": [
        {"title": "Nimyle Coconut Coir Scrub Pad", "score": 83, "url": "https://www.amazon.in/dp/B08D3WYGTF"}
    ],
    "cloth": [
        {"title": "Rustic Art Reusable Cleaning Cloth", "score": 80, "url": "https://www.amazon.in/dp/B09C8YRWH8"}
    ]
}


def detect_category(title, description):
    text = (title + " " + description).lower()
    category_keywords = {
        "bag": ["bag", "tote", "carry bag"],
        "bottle": ["bottle", "flask", "thermos", "water bottle"],
        "toothbrush": ["toothbrush", "bamboo toothbrush"],
        "garbage bag": ["garbage bag", "trash bag", "bin liner"],
        "plate": ["plate", "disposable plate", "dinnerware"],
        "notebook": ["notebook", "diary", "journal"],
        "container": ["container", "tiffin", "lunch box", "storage box", "jar", "canister"],
        "grocery": [
            "basmati", "toor dal", "lentil", "grain", "rice", "dal", "atta", "wheat flour", "edible", "ingredient",
            "vegetable", "fruit", "nut", "snack"
        ]
    }

    for category, keywords in category_keywords.items():
        for word in keywords:
            if word in text:
                return category
    return None



def analyze_text(text):
    desc = text.lower()
    score = 0
    suggestion_flags = {
        'eco_material': False, 'ethical_cert': False, 'good_packaging': False,
        'eco_grocery': False, 'non_eco_material': False, 'bad_packaging': False, 'processed_food': False
    }

    positive_keywords = {
        'eco_material': ['organic', 'natural', 'cotton', 'linen', 'hemp', 'jute', 'bamboo', 'biodegradable', 'recyclable', 'eco-friendly', 'sustainable', 'plastic-free', 'reusable'],
        'ethical_cert': ['certified', 'fsc', 'fair trade', 'cruelty-free', 'bpa-free'],
        'good_packaging': ['paper', 'cardboard', 'kraft', 'eco packaging'],
        'eco_grocery': ['fruit', 'vegetable', 'dal', 'lentil', 'grain', 'flour', 'rice', 'almond', 'cashew']
    }

    negative_keywords = {
        'non_eco_material': ['plastic', 'synthetic', 'polyester', 'nylon', 'pvc'],
        'bad_packaging': ['bubble wrap', 'foil', 'tetrapak', 'laminated'],
        'processed_food': ['junk food', 'instant', 'chips', 'soft drink']
    }

    for flag, keywords in positive_keywords.items():
        if any(k in desc for k in keywords):
            score += 5
            suggestion_flags[flag] = True

    for flag, keywords in negative_keywords.items():
        if any(k in desc for k in keywords):
            score -= 5
            suggestion_flags[flag] = True

    score = max(-50, min(50, score))
    parts = []

    if suggestion_flags['eco_material']: parts.append("uses eco-friendly materials")
    if suggestion_flags['ethical_cert']: parts.append("has ethical certifications")
    if suggestion_flags['good_packaging']: parts.append("uses sustainable packaging")
    if suggestion_flags['eco_grocery']: parts.append("includes organic or natural grocery items")
    if suggestion_flags['non_eco_material']: parts.append("contains some synthetic materials")
    if suggestion_flags['bad_packaging']: parts.append("may use unsustainable packaging")
    if suggestion_flags['processed_food']: parts.append("includes processed or unhealthy ingredients")

    if not parts:
        suggestion = "No strong eco indicators found."
    else:
        good = [p for p in parts if "uses" in p or "has" in p or "includes organic" in p]
        bad = [p for p in parts if "contains" in p or "may" in p or "includes processed" in p]
        suggestion = "This product " + ", ".join(good)
        if bad:
            suggestion += ", but " + ", ".join(bad)
        suggestion += "."

    return score, [suggestion]


def analyze_image(img_url):
    url = img_url.lower()
    if any(word in url for word in ['leaf', 'green', 'bamboo', 'cotton', 'eco']):
        return 15, "Image suggests eco-friendly design."
    elif any(word in url for word in ['plastic', 'blister', 'pack']):
        return -10, "Image may indicate plastic-based packaging."
    return 0, None


@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    title = data.get("title", "")
    description = data.get("description", "")
    image = data.get("image", "")

    text_score, text_suggestions = analyze_text(f"{title} {description}")
    image_score, image_suggestion = analyze_image(image)

    eco_score = max(0, min(100, 50 + text_score + image_score))
    suggestions = text_suggestions
    if image_suggestion:
        suggestions.append(image_suggestion)

    category = detect_category(title, description)

    # Detect source
    source = ""
    if "flipkart.com" in image or "flipkart.com" in description or "flipkart" in title.lower():
        source = "flipkart"
    elif "amazon.in" in image or "amazon.in" in description or "amazon" in title.lower():
        source = "amazon"

    # Recommend product from same platform
    recommend = None
    if eco_score < 60 and category and category in RECOMMENDED_PRODUCTS:
        platform_links = {
            "flipkart": lambda url: "flipkart.com" in url,
            "amazon": lambda url: "amazon.in" in url
        }

        candidates = [
            product for product in RECOMMENDED_PRODUCTS[category]
            if platform_links.get(source, lambda _: True)(product["url"])
        ]

        if candidates:
            recommend = max(candidates, key=lambda x: x["score"])

    return jsonify({
        "product": title or "Unknown",
        "ecoScore": eco_score,
        "suggestions": suggestions,
        "recommendation": recommend
    })


if __name__ == "__main__":
    app.run(debug=True)
