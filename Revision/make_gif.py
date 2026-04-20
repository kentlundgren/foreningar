"""
make_gif.py – Skapar animerad GIF från de fyra splash-bildrutorna
Kör med: python make_gif.py
Output:  kl-analys-splash.gif  (i samma mapp)
"""

from PIL import Image
import os

ASSETS = r"C:\Users\kentl\.cursor\projects\c-Users-kentl-OneDrive-AI-Claude-ClaudeCowork\assets"
OUTPUT = r"C:\Users\kentl\OneDrive\AI\Claude\ClaudeCowork\Revision\kl-analys-splash.gif"

# De fyra bildrutorna i rätt ordning
FRAMES = [
    os.path.join(ASSETS, "gif-frame-1.png"),
    os.path.join(ASSETS, "gif-frame-2.png"),
    os.path.join(ASSETS, "gif-frame-3.png"),
    os.path.join(ASSETS, "gif-frame-4.png"),
]

# Hur länge varje bildruta visas (millisekunder)
# Sista bildrutan får extra tid (knapp-bilden)
DURATIONS = [2800, 2800, 2800, 4000]

# Målstorlek för GIF:en – 720px bred ger bra balans kvalitet/filstorlek
TARGET_SIZE = (720, 405)

def load_and_resize(path, size):
    img = Image.open(path).convert("RGBA")
    img = img.resize(size, Image.LANCZOS)
    # Konvertera till P-läge (paletted) för GIF, med dithering för bästa kvalitet
    return img.convert("RGB").convert(
        "P",
        palette=Image.ADAPTIVE,
        colors=256
    )

frames = [load_and_resize(f, TARGET_SIZE) for f in FRAMES]

# Spara animerad GIF
frames[0].save(
    OUTPUT,
    format="GIF",
    append_images=frames[1:],
    save_all=True,
    duration=DURATIONS,
    loop=0,          # 0 = loopar för evigt
    optimize=True,
)

size_kb = os.path.getsize(OUTPUT) // 1024
print(f"GIF sparad: {OUTPUT}")
print(f"Storlek: {size_kb} KB")
print(f"Bildrutor: {len(frames)}  |  Storlek: {TARGET_SIZE[0]}x{TARGET_SIZE[1]} px")
