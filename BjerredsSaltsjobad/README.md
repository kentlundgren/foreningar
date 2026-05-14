# Bjerreds Saltsjöbad

Webbapplikationer för Bjerreds Saltsjöbad – en badanläggning i Skåne.

**Live-sida (startsida):** https://kentlundgren.github.io/foreningar/BjerredsSaltsjobad/

**GitHub-repo (denna mapp):** https://github.com/kentlundgren/foreningar/tree/main/BjerredsSaltsjobad

---

## Mappstruktur

```
BjerredsSaltsjobad/
├── index.html               ← Landningssida – startpunkt för hela projektet
├── inpassering/             ← Digitala entrésyltar (hur man betalar & kommer in)
│   ├── skylt.html           ← Entréskylt på svenska
│   ├── skylt_eng.html       ← Entréskylt på engelska
│   └── gammal_skylt.jpg     ← Foto på den gamla fysiska skylten vid grinden
└── inpasseringar/           ← Inpasseringsstatistik
    ├── index.html           ← Webbapp med diagram och månadsvis statistik
    └── data.html            ← Redigerbar datatabell (Excel-liknande vy)
```

---

## inpassering/ – Entrésyltar

Digitala versioner av skylten vid grinden som visar hur besökare betalar för att komma in. Finns på svenska (`skylt.html`) och engelska (`skylt_eng.html`). Skyltarna är optimerade för mobil och kan även skrivas ut på A4.

Betalmetoder som visas:
- **Wondr-appen** – 100 kr (rekommenderas)
- **SMS** – 120 kr (skicka `ccasvo` till `72456`)
- **Swish / Kort** – 120 kr (via cckod.se, terminal-ID `ASVO`)
- **Coincode-appen** – 120 kr

---

## inpasseringar/ – Statistik

Webbapp för att visualisera och administrera inpasseringsstatistik.

### Funktioner

- Månadsvis jämförelse av inpasseringar för åren 2024, 2025 och 2026
- Uppdelning per kategori: Restaurangen/badbiljetter, SMS/Swish-biljetter, Medlemmar – armband, Medlemmar – Wondr
- Interaktiva diagram byggda med Chart.js 4.4
- Visuell markering för ombyggnadsperiod (feb–jul 2025) och ofullständig data
- Redigeringsläge: ändra enstaka månadsdata direkt i webbläsaren (sparas i localStorage)
- `data.html` – Excel-liknande datatabell med inline-redigering

### Viktig datakontext

- **2024**: Komplett helårsdata
- **2025**: Bastun stängd för ombyggnad mitten februari – mitten juli → 0-värden i mars–juni är korrekta
- **2025**: Nytt system **Wondr** lanserades juli 2025 → ny kategori från jul 2025
- **2026**: Armband fasades ut 1 februari 2026
- Uppdatera data permanent i `inpasseringar/index.html` → `BASE_DATA`-objektet i `<script>`-blocket

---

## Teknisk information

- **Teknik:** Ren HTML/CSS/JavaScript (ingen byggprocess krävs)
- **Bibliotek:** Chart.js 4.4 (laddas från Cloudflare CDN)
- **Datalagring:** localStorage i webbläsaren
- **Publicering:** GitHub Pages

---

## Senast uppdaterad: 2026-05-14
