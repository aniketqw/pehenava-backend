# app.py
import os, re
import pandas as pd
from urllib.parse import quote_plus
from flask import Flask, request, jsonify, send_from_directory

BASE_DIR = "./"
CSV_PATH = "./catalog.csv"

app = Flask(__name__, static_folder=None)

# Load CSV and normalize column name to 'amazon_url'
df = pd.read_csv(CSV_PATH).fillna("")
cols = [c.strip().lower() for c in df.columns]
if "amazon_url" in cols:
    pass
elif "url" in cols:
    df = df.rename(columns={"url": "amazon_url"})
else:
    raise ValueError("catalog.csv must have either 'amazon_url' or 'url' column")

def norm(s: str) -> str:
    s = (s or "").lower()
    s = s.replace("colour", "color")  # UK→US
    s = s.replace("-", " ")
    s = re.sub(r"\s+", " ", s).strip()
    return s

@app.get("/api/search")
def search():
    q_raw = (request.args.get("q") or "").strip()
    if not q_raw:
        return jsonify({"error": "No query provided"}), 400
    q = norm(q_raw)

    # partial match on category
    for _, row in df.iterrows():
        cat = str(row["category"])
        if q in norm(cat) or any(tok in norm(cat) for tok in q.split()):
            url = row["amazon_url"] or f"https://www.amazon.in/s?k={quote_plus(q_raw)}"
            return jsonify({"category": cat, "amazon_url": url})

    # fallback: build Amazon search URL
    return jsonify({
        "category": q_raw,
        "amazon_url": f"https://www.amazon.in/s?k={quote_plus(q_raw)}"
    })

@app.get("/")
def index():
    return send_from_directory(BASE_DIR, "index.html")

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
