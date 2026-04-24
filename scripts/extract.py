import fitz
import os
import sys

pdf_path = "resources/Finger-Chart-Alto.pdf"
out_dir = "assets/fingerings_raw"
os.makedirs(out_dir, exist_ok=True)

try:
    doc = fitz.open(pdf_path)
    for i in range(len(doc)):
        page = doc.load_page(i)
        pix = page.get_pixmap(dpi=150)
        pix.save(f"{out_dir}/page_{i}.png")
    print(f"Successfully extracted {len(doc)} pages.")
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
