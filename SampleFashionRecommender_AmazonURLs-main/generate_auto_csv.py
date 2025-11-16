import csv
from urllib.parse import quote_plus
from pathlib import Path

INPUT_FILE = "keywords.txt"
OUTPUT_FILE = "catalog.csv"

def read_keywords():
    p = Path(INPUT_FILE)
    if not p.exists():
        raise FileNotFoundError("keywords.txt not found!")
    lines = p.read_text(encoding="utf-8").splitlines()
    return [line.strip() for line in lines if line.strip()]

def main():
    keywords = read_keywords()
    rows = []

    for kw in keywords:
        search_kw = quote_plus(kw)
        url = f"https://www.amazon.in/s?k={search_kw}"
        rows.append({
            "category": kw,
            "url": url
        })

    with open(OUTPUT_FILE, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["category", "url"])
        writer.writeheader()
        writer.writerows(rows)


if __name__ == "__main__":
    main()
