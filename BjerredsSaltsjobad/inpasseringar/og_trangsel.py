# -*- coding: utf-8 -*-
"""
og_trangsel.py – ritar delningsbilden og-trangsel.jpg (1200 x 630 px) för trangsel.html.

Motiv: två bastur med bänkplatser. Den gamla (18 platser per bastu) är fullsatt,
den nya (27 platser) har samma 18 badare, så nio platser är lediga.
Bilden innehåller bara fakta: platser (+50 %) och inpasseringar (+13 %, okt 2025–sep 2026
mot 2024). Ändras LÅT-perioden eller procenttalet, uppdatera konstanterna nedan och kör om.

Körs med:   python og_trangsel.py
Kräver:     Pillow (pip install pillow) och Segoe UI (finns i Windows).
Skriver:    og-trangsel.jpg i samma mapp som skriptet.
"""
import os
from PIL import Image, ImageDraw, ImageFont

# ---- Siffror som visas på bilden (uppdatera vid behov) ----
PLATSER_PROCENT = "+50 %"      # 36 -> 54 platser
BESOK_PROCENT   = "+13 %"      # inpasseringar per dag, LÅT mot 2024 (se trangsel.html)
PERIOD_NOT      = "*Okt 2025–sep 2026 mot 2024, per dag"

W, H = 1200, 630
FONT_DIR = "C:/Windows/Fonts/"
def font(namn, storlek):
    try:
        return ImageFont.truetype(FONT_DIR + namn, storlek)
    except OSError:
        return ImageFont.load_default()

img = Image.new("RGB", (W, H))
d = ImageDraw.Draw(img)

# Bakgrund: samma lodräta blå toning som övriga delningsbilder
topp, botten = (24, 70, 98), (13, 38, 58)
for y in range(H):
    t = y / H
    d.line([(0, y), (W, y)], fill=tuple(int(topp[i] + (botten[i] - topp[i]) * t) for i in range(3)))

d.text((62, 40), "Trängsel i bastun", font=font("segoeuib.ttf", 72), fill="white")
d.text((64, 128), "Före och efter ombyggnaden: samma skara, mer plats", font=font("segoeui.ttf", 28), fill=(160, 210, 235))

KORT = (245, 240, 232)
BANK = (168, 112, 47)
TOM = (201, 165, 108)

def person(cx, y, farg):
    """En badare: huvud + kropp, y = överkant."""
    d.ellipse((cx - 9, y, cx + 9, y + 18), fill=farg)
    d.rounded_rectangle((cx - 12, y + 22, cx + 12, y + 46), radius=9, fill=farg)

def tom_plats(cx, y):
    d.ellipse((cx - 9, y, cx + 9, y + 18), outline=TOM, width=2)
    d.rounded_rectangle((cx - 12, y + 22, cx + 12, y + 46), radius=9, outline=TOM, width=2)

def bastu(x0, rubrik, platser, fyllda, farg):
    x1 = x0 + 520
    d.rounded_rectangle((x0, 186, x1, 462), radius=20, fill=KORT)
    d.text((x0 + 24, 198), rubrik, font=font("segoeuib.ttf", 26), fill=(44, 62, 80))
    rader = (platser + 8) // 9
    for r in range(rader):
        y = 246 + r * 70
        d.rounded_rectangle((x0 + 16, y + 48, x1 - 16, y + 58), radius=4, fill=BANK)
        for c in range(9):
            i = r * 9 + c
            if i >= platser:
                break
            cx = x0 + 44 + c * ((520 - 88) / 8)
            (person(cx, y, farg) if i < fyllda else tom_plats(cx, y))

bastu(60, "2024 · 18 platser per bastu", 18, 18, (46, 134, 193))
bastu(620, "Nu · 27 platser per bastu", 27, 18, (30, 132, 73))

# Chips med fakta
def chip(x0, bredd, text, farg):
    d.rounded_rectangle((x0, 480, x0 + bredd, 540), radius=30, fill=farg)
    # Anpassa textstorleken så att texten alltid ryms i rutan
    storlek = 30
    while storlek > 16 and d.textlength(text, font=font("segoeuib.ttf", storlek)) > bredd - 40:
        storlek -= 1
    d.text((x0 + bredd / 2, 510), text, font=font("segoeuib.ttf", storlek), fill="white", anchor="mm")

chip(60, 340, f"Plats {PLATSER_PROCENT}", (39, 174, 96))
chip(430, 340, f"Besök {BESOK_PROCENT}*", (46, 134, 193))
chip(800, 340, "Samma skara: 100 % → 67 %", (230, 126, 34))

d.text((62, 584), "kentlundgren.github.io/foreningar/BjerredsSaltsjobad/inpasseringar/trangsel",
       font=font("segoeui.ttf", 22), fill=(120, 180, 210))
d.text((W - 62, 586), PERIOD_NOT, font=font("segoeui.ttf", 18), fill=(120, 180, 210), anchor="ra")

ut = os.path.join(os.path.dirname(os.path.abspath(__file__)), "og-trangsel.jpg")
img.save(ut, quality=90)
print("Skrev", ut)
