import json
import os
from PIL import Image

# Setup directories
img_dir = "assets/fingerings_raw"
out_dir = "assets/cards"
os.makedirs(out_dir, exist_ok=True)

img = Image.open(f"{img_dir}/page_0.png")
w, h = img.size

# We will extract 4 notes from Row 1 as our MVP dataset
# Row 1 height:
r1_y1, r1_y2 = int(h * 0.22), int(h * 0.44)
split_y = int(h * 0.38) # Split between fingering and notation

# Columns roughly
cols = [
    {"name": "Bb", "x1": 0.32, "x2": 0.45},
    {"name": "B", "x1": 0.45, "x2": 0.58},
    {"name": "C", "x1": 0.58, "x2": 0.70},
    {"name": "Db", "x1": 0.70, "x2": 0.82},
]

cards_data = []

for idx, col in enumerate(cols):
    c_x1, c_x2 = int(w * col["x1"]), int(w * col["x2"])
    
    # Save the fingering side
    fingering = img.crop((c_x1, r1_y1, c_x2, split_y))
    fingering_path = f"{out_dir}/{col['name']}_fingering.png"
    fingering.save(fingering_path)
    
    # Save the notation side
    notation = img.crop((c_x1, split_y, c_x2, r1_y2))
    notation_path = f"{out_dir}/{col['name']}_notation.png"
    notation.save(notation_path)
    
    cards_data.append({
        "id": col["name"],
        "name": col["name"],
        "fingering_img": f"../assets/cards/{col['name']}_fingering.png",
        "notation_img": f"../assets/cards/{col['name']}_notation.png"
    })

# Save JSON metadata
with open("assets/data.json", "w") as f:
    json.dump({"cards": cards_data}, f, indent=2)

print("MVP extraction complete!")
