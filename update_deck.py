import re

with open('deckData.js', 'r') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    if "require('./assets/cards" in line:
        match = re.search(r"id: '([^']+)'", line)
        if match:
            id_val = match.group(1)
            octave = ""
            if "_low" in id_val:
                octave = " (Low)"
            elif "_mid" in id_val:
                octave = " (Mid)"
            elif "_high" in id_val:
                octave = " (High)"
            
            def replacer(m):
                name_val = m.group(1)
                if "(Alt)" not in name_val and octave:
                    return f"name: '{name_val}{octave}'"
                return m.group(0)
            
            line = re.sub(r"name: '([^']+)'", replacer, line)
    new_lines.append(line)

with open('deckData.js', 'w') as f:
    f.writelines(new_lines)

print("Updated deckData.js")
