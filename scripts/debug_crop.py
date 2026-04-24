from PIL import Image, ImageDraw
import os

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
                    {"id": "E_low", "name": "E", "x1": 0.17, "x2": 0.33},
                    {"id": "F_low", "name": "F", "x1": 0.33, "x2": 0.46},
                    {"id": "Gb_low", "name": "F#/Gb", "x1": 0.46, "x2": 0.67},
                    {"id": "G_low", "name": "G", "x1": 0.67, "x2": 0.81},
                    {"id": "Ab_low", "name": "G#/Ab", "x1": 0.81, "x2": 0.98},
                ]
            },
            {
                "y1": 0.68, "split_y": 0.82, "y2": 0.90,
                "notes": [
                    {"id": "A_low", "name": "A", "x1": 0.05, "x2": 0.20},
                    {"id": "Bb_mid", "name": "A#/Bb", "x1": 0.20, "x2": 0.53},
                    {"id": "B_mid", "name": "B", "x1": 0.53, "x2": 0.74},
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
                    {"id": "E_mid", "name": "E", "x1": 0.43, "x2": 0.56},
                    {"id": "F_mid", "name": "F", "x1": 0.56, "x2": 0.70},
                    {"id": "Gb_mid", "name": "F#/Gb", "x1": 0.70, "x2": 0.92},
                ]
            },
            {
                "y1": 0.38, "split_y": 0.54, "y2": 0.61,
                "notes": [
                    {"id": "G_mid", "name": "G", "x1": 0.05, "x2": 0.19},
                    {"id": "Ab_mid", "name": "G#/Ab", "x1": 0.19, "x2": 0.33},
                    {"id": "A_mid2", "name": "A", "x1": 0.33, "x2": 0.46},
                    {"id": "Bb_high", "name": "A#/Bb", "x1": 0.46, "x2": 0.74},
                    {"id": "B_high", "name": "B", "x1": 0.74, "x2": 0.95},
                ]
            },
            {
                "y1": 0.66, "split_y": 0.82, "y2": 0.89,
                "notes": [
                    {"id": "C_high2", "name": "C", "x1": 0.04, "x2": 0.18},
                    {"id": "Db_high", "name": "C#/Db", "x1": 0.18, "x2": 0.32},
                    {"id": "D_high", "name": "D", "x1": 0.32, "x2": 0.44},
                    {"id": "Eb_high", "name": "D#/Eb", "x1": 0.44, "x2": 0.58},
                    {"id": "E_high", "name": "E", "x1": 0.58, "x2": 0.76},
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
                    {"id": "Gb_high", "name": "F#/Gb", "x1": 0.27, "x2": 0.52},
                ]
            },
            {
                "y1": 0.38, "split_y": 0.54, "y2": 0.61,
                "notes": [
                    {"id": "G_alt", "name": "G", "x1": 0.06, "x2": 0.22},
                    {"id": "Ab_alt", "name": "G#/Ab", "x1": 0.22, "x2": 0.43},
                    {"id": "A_alt", "name": "A", "x1": 0.43, "x2": 0.56},
                    {"id": "Bb_alt", "name": "A#/Bb", "x1": 0.56, "x2": 0.78},
                    {"id": "B_alt", "name": "B", "x1": 0.78, "x2": 0.95},
                ]
            },
            {
                "y1": 0.66, "split_y": 0.82, "y2": 0.89,
                "notes": [
                    {"id": "C_alt", "name": "C", "x1": 0.05, "x2": 0.24},
                    {"id": "Db_alt", "name": "C#/Db", "x1": 0.24, "x2": 0.42},
                    {"id": "D_alt", "name": "D", "x1": 0.42, "x2": 0.55},
                    {"id": "Eb_alt", "name": "D#/Eb", "x1": 0.55, "x2": 0.69},
                    {"id": "E_alt", "name": "E", "x1": 0.69, "x2": 0.82},
                    {"id": "F_alt", "name": "F", "x1": 0.82, "x2": 0.96},
                ]
            }
        ]
    }
]

for page in pages_data:
    img = Image.open(page["file"]).convert("RGB")
    draw = ImageDraw.Draw(img)
    w, h = img.size
    for row in page["rows"]:
        y1, split_y, y2 = int(row["y1"]*h), int(row["split_y"]*h), int(row["y2"]*h)
        for note in row["notes"]:
            x1, x2 = int(note["x1"]*w), int(note["x2"]*w)
            draw.rectangle([x1, y1, x2, y2], outline="red", width=3)
            draw.line([x1, split_y, x2, split_y], fill="blue", width=2)
    img.save(page["file"].replace(".png", "_debug.png"))
