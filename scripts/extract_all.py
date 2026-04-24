import json
import os
from PIL import Image

os.makedirs("assets/cards", exist_ok=True)
pages_data = [
    {
        "file": "assets/fingerings_raw/page_0.png",
        "rows": [
            {
                "y1": 0.22, "split_y": 0.37, "y2": 0.44,
                "notes": [
                    {"id": "Bb_low", "name": "Bb", "x1": 0.30, "x2": 0.44},
                    {"id": "B_low", "name": "B", "x1": 0.44, "x2": 0.58},
                    {"id": "C_low", "name": "C", "x1": 0.58, "x2": 0.72},
                    {"id": "Db_low", "name": "C#/Db", "x1": 0.72, "x2": 0.82},
                    {"id": "D_low", "name": "D", "x1": 0.84, "x2": 0.99},
                ]
            },
            {
                "y1": 0.45, "split_y": 0.60, "y2": 0.66,
                "notes": [
                    {"id": "Eb_low", "name": "D#/Eb", "x1": 0.04, "x2": 0.17},
                    {"id": "E_low", "name": "E", "x1": 0.17, "x2": 0.31},
                    {"id": "F_low", "name": "F", "x1": 0.31, "x2": 0.44},
                    {"id": "Gb_low", "name": "F#/Gb", "x1": 0.44, "x2": 0.69},
                    {"id": "G_low", "name": "G", "x1": 0.69, "x2": 0.82},
                    {"id": "Ab_low", "name": "G#/Ab", "x1": 0.82, "x2": 0.98},
                ]
            },
            {
                "y1": 0.68, "split_y": 0.82, "y2": 0.90,
                "notes": [
                    {"id": "A_low", "name": "A", "x1": 0.05, "x2": 0.18},
                    {"id": "Bb_mid", "name": "A#/Bb", "x1": 0.18, "x2": 0.59},
                    {"id": "B_mid", "name": "B", "x1": 0.59, "x2": 0.74},
                    {"id": "C_mid", "name": "C", "x1": 0.74, "x2": 0.95},
                ]
            }
        ]
    },
    {
        "file": "assets/fingerings_raw/page_1.png",
        "rows": [
            {
                "y1": 0.12, "split_y": 0.26, "y2": 0.34,
                "notes": [
                    {"id": "Db_mid", "name": "C#/Db", "x1": 0.04, "x2": 0.18},
                    {"id": "D_mid", "name": "D", "x1": 0.18, "x2": 0.31},
                    {"id": "Eb_mid", "name": "D#/Eb", "x1": 0.31, "x2": 0.43},
                    {"id": "E_mid", "name": "E", "x1": 0.43, "x2": 0.53},
                    {"id": "F_mid", "name": "F", "x1": 0.53, "x2": 0.65},
                    {"id": "Gb_mid", "name": "F#/Gb", "x1": 0.65, "x2": 0.95},
                ]
            },
            {
                "y1": 0.38, "split_y": 0.54, "y2": 0.61,
                "notes": [
                    {"id": "G_mid", "name": "G", "x1": 0.05, "x2": 0.19},
                    {"id": "Ab_mid", "name": "G#/Ab", "x1": 0.19, "x2": 0.33},
                    {"id": "A_mid2", "name": "A", "x1": 0.33, "x2": 0.45},
                    {"id": "Bb_high", "name": "A#/Bb", "x1": 0.45, "x2": 0.76},
                    {"id": "B_high", "name": "B", "x1": 0.76, "x2": 0.95},
                ]
            },
            {
                "y1": 0.66, "split_y": 0.82, "y2": 0.89,
                "notes": [
                    {"id": "C_high2", "name": "C", "x1": 0.04, "x2": 0.18},
                    {"id": "Db_high", "name": "C#/Db", "x1": 0.18, "x2": 0.32},
                    {"id": "D_high", "name": "D", "x1": 0.32, "x2": 0.42},
                    {"id": "Eb_high", "name": "D#/Eb", "x1": 0.42, "x2": 0.66},
                    {"id": "E_high", "name": "E", "x1": 0.66, "x2": 0.85},
                ]
            }
        ]
    },
    {
        "file": "assets/fingerings_raw/page_2.png",
        "rows": [
            {
                "y1": 0.12, "split_y": 0.26, "y2": 0.34,
                "notes": [
                    {"id": "F_high", "name": "F", "x1": 0.04, "x2": 0.27},
                    {"id": "Gb_high", "name": "F#/Gb", "x1": 0.27, "x2": 0.56},
                ]
            },
            {
                "y1": 0.38, "split_y": 0.54, "y2": 0.61,
                "notes": [
                    {"id": "G_alt", "name": "G (Alt)", "x1": 0.06, "x2": 0.22},
                    {"id": "Ab_alt", "name": "G#/Ab (Alt)", "x1": 0.22, "x2": 0.42},
                    {"id": "A_alt", "name": "A (Alt)", "x1": 0.42, "x2": 0.53},
                    {"id": "Bb_alt", "name": "A#/Bb (Alt)", "x1": 0.53, "x2": 0.78},
                    {"id": "B_alt", "name": "B (Alt)", "x1": 0.78, "x2": 0.95},
                ]
            },
            {
                "y1": 0.66, "split_y": 0.82, "y2": 0.89,
                "notes": [
                    {"id": "C_alt", "name": "C (Alt)", "x1": 0.05, "x2": 0.22},
                    {"id": "Db_alt", "name": "C#/Db (Alt)", "x1": 0.22, "x2": 0.48},
                    {"id": "D_alt", "name": "D (Alt)", "x1": 0.48, "x2": 0.59},
                    {"id": "Eb_alt", "name": "D#/Eb (Alt)", "x1": 0.59, "x2": 0.72},
                    {"id": "E_alt", "name": "E (Alt)", "x1": 0.72, "x2": 0.84},
                    {"id": "F_alt", "name": "F (Alt)", "x1": 0.84, "x2": 0.98},
                ]
            }
        ]
    }
]

js_out = "// Auto-generated flashcards data list\nexport const deckData = [\n"

deckCount = 0
for pagedata in pages_data:
    img_path = pagedata["file"]
    if not os.path.exists(img_path): continue
    img = Image.open(img_path)
    w, h = img.size
    
    for row in pagedata["rows"]:
        y1, split_y, y2 = int(row["y1"] * h), int(row["split_y"] * h), int(row["y2"] * h)
        for note in row["notes"]:
            x1, x2 = int(note["x1"] * w), int(note["x2"] * w)
            
            f_crop = img.crop((x1, y1, x2, split_y))
            n_crop = img.crop((x1, split_y, x2, y2))
            
            fid = note["id"]
            name = note["name"]
            
            f_path = f"assets/cards/{fid}_fingering.png"
            n_path = f"assets/cards/{fid}_notation.png"
            
            f_crop.save(f_path)
            n_crop.save(n_path)
            
            js_out += f"  {{ id: '{fid}', name: '{name}', front: require('./{f_path}'), back: require('./{n_path}') }},\n"
            deckCount += 1

js_out += "];\n"

with open("deckData.js", "w") as f:
    f.write(js_out)

print(f"Extracted {deckCount} flashcards successfully.")
