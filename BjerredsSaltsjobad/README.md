# Bjerreds Saltsjöbad

Webbapplikationer för Bjerreds Saltsjöbad – en badanläggning i Skåne.

**Live-sida (inpasseringar):** https://kentlundgren.github.io/foreningar/BjerredsSaltsjobad/inpasseringar/

**GitHub-repo (denna mapp):** https://github.com/kentlundgren/foreningar/tree/main/BjerredsSaltsjobad

---

## Projektbeskrivning

Samling av webbverktyg för Bjerreds Saltsjöbad. För närvarande finns ett verktyg för att visualisera och administrera inpasseringsstatistik.

---

## Filer och mappar

| Fil / Mapp | Beskrivning |
|---|---|
| `inpasseringar/index.html` | Webbapp för inpasseringsstatistik – visar och jämför antal besökare per månad, år och kategori med diagram (Chart.js). Data lagras i localStorage. |

---

## Inpasseringar – funktioner

- Månadsvis jämförelse av inpasseringar för åren 2024, 2025 och 2026
- Uppdelning per kategori: Restaurangen/badbiljetter, SMS/Swish-biljetter, Medlemmar – armband, Medlemmar – Wonder
- Interaktiva stapeldiagram byggda med Chart.js 4.4
- Redigeringsläge: ändra enstaka månadsdata direkt i webbläsaren (sparas i localStorage)
- Lägg till nya år och kategorier dynamiskt
- Markering för ombyggnadsperiod (påverkar jämförelsen)

---

## Teknisk information

- **Teknik:** Ren HTML/CSS/JavaScript (ingen byggprocess krävs)
- **Bibliotek:** Chart.js 4.4 (laddas från Cloudflare CDN)
- **Datalagring:** localStorage i webbläsaren
- **Publicering:** GitHub Pages

---

## Senast uppdaterad: 2026-05-14