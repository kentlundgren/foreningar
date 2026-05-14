# CLAUDE.md – Bjerreds Saltsjöbad

Denna fil beskriver projektet och dess arbetssätt för Claude (Cowork) och Cursor.

## Projektbeskrivning

Webbsida som visualiserar inpasseringsstatistik för **Bjerreds Saltsjöbad** (kallbadhus och bastu i Bjärred utanför Lund).  
Webbplats: https://bjerredskallbadhus.se

## Mappar

```
BjerredsSaltsjobad/
├── CLAUDE.md              ← denna fil
├── README.md
└── inpasseringar/
    └── index.html         ← huvudfil, publiceras via GitHub Pages
```

## Parallell utvecklingsmiljö

Projektet används i **två verktyg simultaneously**:

| Verktyg | Roll |
|---|---|
| **Claude Cowork** | AI-assisterad filgenerering, datavisualisering, innehållsarbete |
| **Cursor** | Kodredigering, finjustering, versionshantering |

Cursor är kopplat till **Git och GitHub**. Filer som skapas i Cowork committtas sedan via Cursor och publiceras på **GitHub Pages**.

## Regler för filer som skapas i Cowork

- Alla filer ska vara **självständiga** (inga server-side beroenden, inga relativa importer som kräver en byggprocess).
- Använd **CDN-länkar** (Cloudflare cdnjs) för externa bibliotek, inte npm-paket.
- **GitHub Pages-kompatibelt**: inga absoluta sökvägar, inga backend-anrop.
- Undvik temporära scratch-filer i projektmappen – de hamnar i Git-historiken.
- Kommentarer och variabelnamn skrivs på **svenska** (eller engelska om teknisk term saknas på svenska).

## Teknikstack – inpasseringar/index.html

- **Chart.js 4.4** (cdnjs) – linjediagram och stapeldiagram
- Eget inline Canvas-plugin för ombyggnadsmarkeringen (feb–jul 2025)
- **localStorage** för att spara dataändringar mellan sessioner utan backend
- Responsiv CSS med CSS-variabler

## Data – viktig kontext

- **2024**: Komplett helårsdata (tre kategorier: Restaurangen, SMS-biljetter, Armband)
- **2025**: Bastun stängd för ombyggnad **mitten februari – mitten juli 2025** → 0-värden i mars–juni är korrekta, inte saknade
- **2025**: Nytt inpasseringssystem **Wondr** lanserades juli 2025 → ny kategori "Medlemmar – Wonder" från jul 2025
- **2026**: Armbanden fasades ut **1 februari 2026** → Armband-kategorin har låga värden jan–mar
- **2026 april**: Restaurangen och Armband saknas (null) – väntar på indata

## Uppdatera data

### Snabbast (tillfälligt, via webbläsaren):
Öppna `index.html` → klicka **"+ Lägg till / uppdatera data"** → fyll i formuläret. Sparas i `localStorage`.

### Permanent (för Git-commit):
Öppna `inpasseringar/index.html` i Cursor och redigera `BASE_DATA`-objektet i `<script>`-blocket.  
Strukturen är: `BASE_DATA[år][kategori][månadsindex]` där 0 = januari, 11 = december.  
`null` = data saknas, `0` = bekräftat noll (t.ex. stängd period).
