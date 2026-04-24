from PIL import Image

img = Image.open("assets/fingerings_raw/page_0.png")
w, h = img.size

# Let's crop Row 2, Col 2 (E)
# Row 2 y-range: ~500 to 900? Let's check proportions
# Header is about 1/5th
r2_y1, r2_y2 = int(h * 0.44), int(h * 0.65)
c2_x1, c2_x2 = int(w * 0.2), int(w * 0.35)

e_note = img.crop((c2_x1, r2_y1, c2_x2, r2_y2))
e_note.save("assets/fingerings_raw/test_E.png")

# also crop the top vs bottom
e_fingering = img.crop((c2_x1, r2_y1, c2_x2, int(h * 0.58)))
e_fingering.save("assets/fingerings_raw/test_E_fingering.png")

e_notation = img.crop((c2_x1, int(h * 0.58), c2_x2, r2_y2))
e_notation.save("assets/fingerings_raw/test_E_notation.png")
