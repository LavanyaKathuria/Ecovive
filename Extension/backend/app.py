from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route('/test')
def test():
    return "✅ Backend connection successful!"

RECOMMENDED_PRODUCTS = {
    "bag": [
    {
        "title": "STRUTT Canvas Reusable Tote Bag – Organic Cotton, 15 kg Capacity",
        "score": 90,
        "url": "https://www.amazon.in/dp/B0C81MCL8X"
    },
    {
        "title": "COTTONTHEME Organic Cotton Tote Bag",
        "score": 88,
        "url": "https://www.amazon.in/dp/B0DJZ2JY8R"
    },
    {
        "title": "Ecodott Heavy‑Duty Canvas Tote",
        "score": 89,
        "url": "https://www.amazon.in/dp/B0CV5WGW6F"
    }
    ],
    "toothbrush": [
        {"title": "Rusabl Organic Bamboo Toothbrush (Pack of 4)", "score": 88, "url": "https://www.amazon.in/dp/B07W77TJZP"},
    ],
    "bottle": [
        {
            "title": "Milton Thermosteel Flip Lid Flask 1000 ml",
            "score": 85,
            "url": "https://www.amazon.in/dp/B07FNDHM3N"
        },
        {
            "title": "Milton Thermosteel Flip Lid Flask 500 ml",
            "score": 84,
            "url": "https://www.amazon.in/dp/B00MIYM0VS"
        }
    ],
    "container": [
        {
            "title": "Borosil Klip‑N‑Store Glass Container 240 ml",
            "score": 88,
            "url": "https://www.amazon.in/dp/B07HZ4QFPQ"
        },
        {
            "title": "SignoraWare Borosilicate Glass Rectangle Container",
            "score": 90,
            "url": "https://www.amazon.in/dp/B0753ZSGGM"
        },
        {
            "title": "Cutting EDGE Square Glass Container",
            "score": 85,
            "url": "https://www.amazon.in/dp/B098F75HHL"
        },
        {
            "title": "FineDine Glass Meal Prep Storage Set",
            "score": 87,
            "url": "https://www.amazon.in/dp/B0722CY615"
        }
    ],
    "garbage bag": [
        {
            "title": "Presto! Compostable Garbage Bags (Medium, 180‑Count)",
            "score": 83,
            "url": "https://www.amazon.in/dp/B0821PN8L4"
        },
        {
            "title": "SuperBio Compostable Garbage Bags (33 Gal, 40‑Count)",
            "score": 85,
            "url": "https://www.amazon.in/dp/B09MFBVG5N"
        },
        {
            "title": "ECO SOUL Compostable Garbage Bags (24×32 in, Pack of 10)",
            "score": 82,
            "url": "https://www.amazon.in/dp/B0CP3RQPY7"
        }
    ],
    "plate": [
        {
            "title": "Palm Naki Round Palm Leaf Plates – 40 Pack (10\" Compostable)",
            "score": 82,
            "url": "https://www.amazon.in/dp/B081PDMLN1"
        },
        {
            "title": "ECO SOUL Palm Leaf Square Plates – 50 Pack (6\" Compostable)",
            "score": 84,
            "url": "https://www.amazon.in/dp/B08D7H74SP"
        },
        {
            "title": "Sumeet Stainless Steel Dinner Plates – Set of 6",
            "score": 86,
            "url": "https://www.amazon.in/dp/B08XR15FSQ"
        }
    ],
    "notebook": [
        {
            "title": "Recycled Paper A5 Notebook – 160 Sheets",
            "score": 86,
            "url": "https://www.amazon.in/dp/B0DYJ2ZZNR"
        }
    ],
    "pen": [
        {
            "title": "GreenSouls Bamboo Refillable Pen Set (3‑Pack)",
            "score": 87,
            "url": "https://www.amazon.in/dp/B07TWKTQGW"
        }
    ],
    "grocery": [
        {
            "title": "24 Mantra Organic Unpolished Toor Dal – 1 kg",
            "score": 85,
            "url": "https://www.amazon.in/dp/B00L925NJQ"
        },
        {
            "title": "Organic Tattva Toor Dal – 1 kg",
            "score": 86,
            "url": "https://www.amazon.in/dp/B00M57ULF0"
        },
        {
            "title": "Nu Organic Brown Basmati Rice – 500 g",
            "score": 84,
            "url": "https://www.amazon.in/dp/B0D8WLG3Y8"
        },
        {
            "title": "Pure & Sure Brown Basmati Rice – 1 kg",
            "score": 83,
            "url": "https://www.amazon.in/dp/B017KJ5CTW"
        }
    ],
    "straw": [
        {
            "title": "Rusabl Stainless Steel Straws (4 pcs) with Cleaning Brush",
            "score": 82,
            "url": "https://www.amazon.in/dp/B07KQYD7C1"
        },
        {
            "title": "Earthism Reusable Stainless Steel Straws Set (4 pcs) + Pouch",
            "score": 85,
            "url": "https://www.amazon.in/dp/B08MB38PP8"
        }
    ],
    "tshirt": [
        {
            "title": "TOUCH Sustainable Men's Organic Cotton T‑Shirt",
            "score": 88,
            "url": "https://www.amazon.in/dp/B0DMJVZJFR"
        },
        {
            "title": "Woodwose Organic Cotton Men's T‑Shirt",
            "score": 86,
            "url": "https://www.amazon.in/dp/B06XBWBX63"
        }
    ],
    "pants": [
        {
            "title": "Hand‑Loom Pure Organic Cotton Pants",
            "score": 87,
            "url": "https://www.amazon.in/dp/B0CKXCY67S"
        },
        {
            "title": "Laas GOTS‑Certified Organic Cotton Pants",
            "score": 85,
            "url": "https://www.amazon.in/dp/B0D4W2L4F3"
        }
    ],
    "cutlery": [
        {
            "title": "Frenchware Stainless Steel Spoon & Fork Set (12‑pc)",
            "score": 88,
            "url": "https://www.amazon.in/dp/B0BFHVF69H"
        },
        {
            "title": "Orren Living Stainless Steel Spoon & Fork Set (12‑pc)",
            "score": 86,
            "url": "https://www.amazon.in/dp/B0DM9BDGQ6"
        }
    ]
}



CATEGORY_KEYWORDS = {
    "bag": ["bag", "tote", "carry bag"],
    "bottle": ["bottle", "flask", "thermos", "water bottle"],
    "toothbrush": ["toothbrush", "bamboo toothbrush"],
    "garbage bag": ["garbage bag", "trash bag", "bin liner"],
    "plate": ["plate", "disposable plate", "dinnerware"],
    "notebook": ["notebook", "diary", "journal"],
    # "pen": ["pen", "ballpen", "gel pen"],
    "container": ["container", "tiffin", "lunch box", "storage box", "jar", "canister"],
    "grocery": ["basmati", "toor dal", "lentil", "grain", "rice", "dal", "atta", "wheat", "organic food"],
    "straw": ["straw", "metal straw", "reusable straw"],
    "tshirt": ["t-shirt", "tee", "shirt"],
    "pants": ["pants", "trousers", "jeans"],
    "cutlery": ["cutlery", "spoon", "fork", "knife", "utensil"]
}

def detect_category(title, description):
    text = (title + " " + description).lower()
    for category, keywords in CATEGORY_KEYWORDS.items():
        for word in keywords:
            if word in text:
                return category
    return None

def analyze_text(text):
    desc = text.lower()
    score = 0
    flags = {
        'eco_material': False, 'ethical_cert': False, 'good_packaging': False,
        'eco_grocery': False, 'non_eco_material': False, 'bad_packaging': False, 'processed_food': False
    }

    pos = {
        'eco_material': ['organic', 'cotton', 'hemp', 'linen', 'jute', 'bamboo', 'recyclable', 'biodegradable', 'natural', 'eco-friendly', 'reusable'],
        'ethical_cert': ['certified', 'fsc', 'fair trade', 'cruelty-free', 'bpa-free'],
        'good_packaging': ['paper', 'cardboard', 'kraft'],
        'eco_grocery': ['lentil', 'dal', 'grain', 'rice', 'wheat', 'vegetable', 'fruit', 'dry fruit']
    }

    neg = {
        'non_eco_material': ['plastic', 'synthetic', 'polyester', 'nylon', 'pvc'],
        'bad_packaging': ['bubble wrap', 'tetrapak', 'foil'],
        'processed_food': ['instant', 'junk food', 'soft drink', 'chips']
    }

    for flag, keywords in pos.items():
        if any(k in desc for k in keywords):
            score += 5
            flags[flag] = True

    for flag, keywords in neg.items():
        if any(k in desc for k in keywords):
            score -= 5
            flags[flag] = True

    score = max(-50, min(50, score))

    parts = []
    if flags['eco_material']: parts.append("uses eco-friendly materials")
    if flags['ethical_cert']: parts.append("has ethical certifications")
    if flags['good_packaging']: parts.append("uses sustainable packaging")
    if flags['eco_grocery']: parts.append("includes organic grocery items")
    if flags['non_eco_material']: parts.append("contains synthetic materials")
    if flags['bad_packaging']: parts.append("may use non-sustainable packaging")
    if flags['processed_food']: parts.append("includes processed ingredients")

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

def analyze_image(url):
    url = url.lower()
    if any(w in url for w in ['leaf', 'bamboo', 'green']):
        return 15, "Image suggests eco-friendly packaging."
    elif any(w in url for w in ['plastic', 'blister', 'wrap']):
        return -10, "Image may indicate plastic packaging."
    return 0, None

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    title = data.get("title", "")
    desc = data.get("description", "")
    image = data.get("image", "")

    if not title and not desc:
        return jsonify({ "error": "Product title or description not found." }), 400

    text_score, text_sugg = analyze_text(title + " " + desc)
    img_score, img_sugg = analyze_image(image)
    eco_score = max(0, min(100, 50 + text_score + img_score))

    category = detect_category(title, desc)
    source = "flipkart" if "flipkart" in title.lower() else "amazon"

    recommend = None
    if eco_score < 60 and category and category in RECOMMENDED_PRODUCTS:
        candidates = [p for p in RECOMMENDED_PRODUCTS[category] if source in p["url"]]
        if not candidates:
            candidates = RECOMMENDED_PRODUCTS[category]
        recommend = max(candidates, key=lambda x: x["score"])

    suggestions = text_sugg
    if img_sugg:
        suggestions.append(img_sugg)

    return jsonify({
        "product": title or "Unknown",
        "ecoScore": eco_score,
        "suggestions": suggestions,
        "recommendation": recommend
    })

# Purchased product handling
purchased_products = {}

@app.route("/api/mark-purchased", methods=["POST", "DELETE"])
def mark_purchased():
    data = request.get_json()
    url = data.get("url")
    if not url:
        return jsonify({ "error": "Missing URL" }), 400

    if request.method == "POST":
        purchased_products[url] = data
        return jsonify({ "message": "Marked as purchased" }), 200
    else:
        purchased_products.pop(url, None)
        return jsonify({ "message": "Unmarked as purchased" }), 200

if __name__ == '__main__':
    app.run(port=5000, debug=True, use_reloader=False)  # Disable reloader