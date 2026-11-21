# -*- coding: utf-8 -*-
"""
og_data.py – ritar delningsbilden og-data.jpg (1200 x 630 px) för data.html.

Motiv: kallbadhuset på pålar med en kortläsare (inpassering) och ett utdrag ur
tabellen på sidan. Siffrorna är de avslutade månaderna januari–mars 2026, så
bilden blir inte inaktuell när nya månader kommer in.

Körs med:   python og_data.py
Kräver:     Pillow (pip install pillow) och Segoe UI (finns i Windows).
Skriver:    og-data.jpg i samma mapp som skriptet.
"""
import os
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
FONT_DIR = "C:/Windows/Fonts/"

def font(namn, storlek):
    """Hämtar Segoe UI; faller tillbaka på Pillows standardtypsnitt om det saknas."""
    try:
        return ImageFont.truetype(FONT_DIR + namn, storlek)
    except OSError:
        return ImageFont.load_default()

def tusental(n):
    """1114 -> '1 114' (mellanslag som tusentalsavgränsare, svensk stil)."""
    return f"{n:,}".replace(",", " ")

# ---- Data: avslutade månader (hämtade ur BASE_DATA i data.html) ----
MANADER = ["Jan", "Feb", "Mar"]
RADER = [
    ("Restaurangen/badbiljetter", [643, 665, 600]),
    ("SMS/Swish-biljetter",       [1114, 751, 1006]),
    ("Medlemmar – armband",       [492, 119, 95]),
    ("Medlemmar – Wondr",         [2627, 2445, 3663]),
]
TOTALT = [sum(r[1][i] for r in RADER) for i in range(3)]   # 4 876, 3 980, 5 364

img = Image.new("RGB", (W, H))
d = ImageDraw.Draw(img)

# Bakgrund: samma lodräta blå toning som övriga delningsbilder
topp, botten = (24, 70, 98), (13, 38, 58)
for y in range(H):
    t = y / H
    d.line([(0, y), (W, y)], fill=tuple(int(topp[i] + (botten[i] - topp[i]) * t) for i in range(3)))

d.text((62, 40), "Inpasseringsdata", font=font("segoeuib.ttf", 72), fill="white")
d.text((64, 128), "Bjerreds Saltsjöbad · kallbadhus och bastu i Bjärred", font=font("segoeui.ttf", 28), fill=(160, 210, 235))

KORT = (245, 240, 232)

# ================= Vänster kort: badhuset + kortläsare =================
LX0, LY0, LX1, LY1 = 60, 186, 450, 540
d.rounded_rectangle((LX0, LY0, LX1, LY1), radius=22, fill=KORT)
# Scenen ritas inne i kortet med marginal
SX0, SY0, SX1, SY1 = LX0 + 16, LY0 + 16, LX1 - 16, LY1 - 16
d.rounded_rectangle((SX0, SY0, SX1, SY1), radius=14, fill=(206, 226, 238))          # himmel
havsyta = SY0 + 205
d.rectangle((SX0, havsyta, SX1, SY1), fill=(60, 124, 156))                           # hav
d.rounded_rectangle((SX0, SY1 - 30, SX1, SY1), radius=14, fill=(60, 124, 156))       # runda nedre hörn
# Vågor
for vy in (havsyta + 28, havsyta + 62, havsyta + 96):
    for vx in range(SX0 + 20, SX1 - 30, 56):
        d.arc((vx, vy, vx + 40, vy + 16), 200, 340, fill=(190, 222, 236), width=3)
# Pålar
for px in range(SX0 + 58, SX1 - 50, 38):
    d.rectangle((px, havsyta - 30, px + 9, SY1 - 14), fill=(110, 70, 36))
# Brygga/däck
d.rectangle((SX0 + 40, havsyta - 38, SX1 - 40, havsyta - 28), fill=(140, 98, 58))
# Huset
hx0, hx1, hy0, hy1 = SX0 + 78, SX1 - 78, havsyta - 118, havsyta - 38
d.rectangle((hx0, hy0, hx1, hy1), fill=(214, 134, 20))
d.polygon([(hx0 - 18, hy0), ((hx0 + hx1) // 2, hy0 - 52), (hx1 + 18, hy0)], fill=(140, 66, 20))
d.rectangle((hx1 - 52, hy0 - 52, hx1 - 36, hy0 - 6), fill=(110, 56, 24))               # skorsten
for i, r in enumerate((8, 10, 12)):                                                    # rök (hålls inom scenen)
    d.ellipse((hx1 - 50 + i * 12, hy0 - 62 - i * 12, hx1 - 50 + i * 12 + 2 * r, hy0 - 62 - i * 12 + 2 * r), fill=(240, 244, 247))
d.rectangle((hx0 + 16, hy0 + 20, hx0 + 52, hy0 + 48), fill=(222, 238, 246))            # fönster
d.rectangle((hx1 - 52, hy0 + 20, hx1 - 16, hy0 + 48), fill=(222, 238, 246))
d.rectangle(((hx0 + hx1) // 2 - 14, hy0 + 26, (hx0 + hx1) // 2 + 14, hy1), fill=(98, 58, 28))  # dörr

# Kortläsare (inpassering) med bock, ritad framför scenen nere till höger
rx0, ry0, rx1, ry1 = SX1 - 112, SY1 - 150, SX1 - 22, SY1 - 14
d.rounded_rectangle((rx0, ry0, rx1, ry1), radius=14, fill=(64, 94, 62), outline=(240, 244, 247), width=3)
d.rounded_rectangle((rx0 + 12, ry0 + 12, rx1 - 12, ry0 + 62), radius=8, fill=(32, 54, 34))
d.line([(rx0 + 28, ry0 + 38), (rx0 + 42, ry0 + 52), (rx1 - 26, ry0 + 22)], fill=(130, 232, 140), width=7, joint="curve")
for k, rad in enumerate((10, 18, 26)):                                                  # signalvågor
    d.arc(((rx0 + rx1) // 2 - rad, ry0 + 76 - rad, (rx0 + rx1) // 2 + rad, ry0 + 76 + rad), 215, 325, fill=(190, 240, 196), width=3)
d.rounded_rectangle(((rx0 + rx1) // 2 - 16, ry1 - 28, (rx0 + rx1) // 2 + 16, ry1 - 14), radius=7, fill=(240, 244, 247))

# ================= Höger kort: tabellutdrag =================
TX0, TY0, TX1, TY1 = 480, 186, 1140, 540
d.rounded_rectangle((TX0, TY0, TX1, TY1), radius=22, fill=KORT)
d.text((TX0 + 26, TY0 + 18), "Inpasseringar per månad, 2026", font=font("segoeuib.ttf", 26), fill=(44, 62, 80))

kol_x = [TX0 + 26, TX0 + 392, TX0 + 506, TX0 + 620]     # etikettkolumn + tre månader (högerjusterade mot nästa)
rubrik_y = TY0 + 66
d.rounded_rectangle((TX0 + 16, rubrik_y - 8, TX1 - 16, rubrik_y + 34), radius=8, fill=(26, 82, 118))
d.text((kol_x[0] + 6, rubrik_y + 13), "Kategori", font=font("segoeuib.ttf", 20), fill="white", anchor="lm")
for i, m in enumerate(MANADER):
    d.text((kol_x[i + 1] + 0, rubrik_y + 13), m, font=font("segoeuib.ttf", 20), fill="white", anchor="rm")

rad_h = 48
y = rubrik_y + 44
for n, (namn, vals) in enumerate(RADER):
    if n % 2 == 1:
        d.rectangle((TX0 + 16, y, TX1 - 16, y + rad_h), fill=(236, 230, 219))
    d.text((kol_x[0] + 6, y + rad_h / 2), namn, font=font("segoeui.ttf", 22), fill=(44, 62, 80), anchor="lm")
    for i, v in enumerate(vals):
        d.text((kol_x[i + 1], y + rad_h / 2), tusental(v), font=font("segoeui.ttf", 22), fill=(44, 62, 80), anchor="rm")
    y += rad_h
d.line([(TX0 + 16, y + 3), (TX1 - 16, y + 3)], fill=(26, 82, 118), width=3)
d.text((kol_x[0] + 6, y + rad_h / 2 + 4), "TOTALT", font=font("segoeuib.ttf", 22), fill=(26, 82, 118), anchor="lm")
for i, v in enumerate(TOTALT):
    d.text((kol_x[i + 1], y + rad_h / 2 + 4), tusental(v), font=font("segoeuib.ttf", 24), fill=(26, 82, 118), anchor="rm")

# Fotrad: adress och källa
d.text((62, 574), "kentlundgren.github.io/foreningar/BjerredsSaltsjobad/inpasseringar/data",
       font=font("segoeui.ttf", 22), fill=(120, 180, 210))
d.text((W - 62, 576), "bjerredskallbadhus.se", font=font("segoeui.ttf", 22), fill=(120, 180, 210), anchor="ra")

ut = os.path.join(os.path.dirname(os.path.abspath(__file__)), "og-data.jpg")
img.save(ut, quality=90)
print("Skrev", ut)
