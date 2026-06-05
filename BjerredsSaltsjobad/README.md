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
│   ├── index.html           ← Skylt-sida med foto av gamla skylten + knappar till digitala
│   ├── skylt.html           ← Entréskylt på svenska (A4/A5-utskrift)
│   ├── skylt_eng.html       ← Entréskylt på engelska (A4/A5-utskrift)
│   └── gammal_skylt.jpg     ← Foto på den gamla fysiska skylten vid grinden
├── inpasseringar/           ← Inpasseringsstatistik och datahantering
│   ├── index.html           ← Webbapp med diagram och månadsvis statistik (Chart.js)
│   ├── data.html            ← Redigerbar datatabell kopplad till Firebase Realtime Database
│   ├── engangsintraden.html ← Linjediagram: engångsinträden 2026 (anonymiserade)
│   ├── databas.html         ← Arbetsdokument: Firebase-checklista, config, migrationsskript
│   └── data.md              ← Läsbar referenstabell med all inpasseringsdata (backup)
└── medlemmar/               ← Medlemsstatistik och visualisering
    ├── index.html           ← Interaktivt diagram: nyregistreringar och ackumulerad tillväxt
    ├── GitHub.html          ← Guide för Git och GitHub
    ├── dataformat.html      ← Information om dataformat
    └── privatadata.html     ← Hantering av privat data
```

---

## inpassering/ – Entrésyltar

Digitala versioner av skylten vid grinden som visar hur besökare betalar för att komma in. Finns på svenska (`skylt.html`) och engelska (`skylt_eng.html`). Skyltarna är optimerade för mobil och kan skrivas ut på A4 eller A5.

Betalmetoder som visas:
- **Wondr-appen** – 100 kr (rekommenderas, öppnar dörren direkt)
- **SMS** – 120 kr (skicka `ccasvo` till `72456`)
- **Swish / Kort** – 120 kr (via cckod.se, terminal-ID `ASVO`)

Wondr-priset är medvetet lägre för att uppmuntra registrering i föreningens system.

---

## inpasseringar/ – Statistik och datahantering

Webbapp för att visualisera och administrera inpasseringsstatistik.

### index.html – Statistikdiagram

- Månadsvis jämförelse av inpasseringar för åren 2024, 2025 och 2026
- Uppdelning per kategori: Restaurangen/badbiljetter, SMS/Swish-biljetter, Medlemmar – armband, Medlemmar – Wondr
- Interaktiva diagram byggda med Chart.js 4.4
- Visuell markering för ombyggnadsperiod (feb–jul 2025) och ofullständig data

### data.html – Redigerbar tabell (Firebase-kopplad)

Det här är hela poängen med Firebase-backenden: **flera personer på olika enheter och platser kan uppdatera data direkt i webbläsaren** – utan att behöva installera någon app eller ha tillgång till källkoden.

- Excel-liknande tabellvy med inline-redigering per cell
- Data läses från **Firebase Realtime Database** via `onValue()` – uppdateras live för alla öppna flikar
- Skrivning kräver inloggning (Firebase Authentication, e-post/lösenord)
- `BASE_DATA` (hårdkodad) används som fallback om Firebase inte kan nås
- Grön statusdot i headern visar att Firebase-anslutning är aktiv

### engangsintraden.html – Engångsinträden 2026

- Linjediagram över engångsinträden per månad (jan–maj 2026)
- Besökarnamn anonymiserade med koder (B001, B002 …)
- Visar återkommande besökare via valbar tabell
- Data t.o.m. 27 maj 2026 (248 besök totalt)

### Viktig datakontext

- **2024**: Komplett helårsdata (tre kategorier)
- **2025**: Bastun stängd för ombyggnad mitten februari – mitten juli → 0-värden i mars–juni är korrekta
- **2025**: Nytt system **Wondr** lanserades juli 2025 → ny kategori från jul 2025
- **2026**: Armband fasades ut 1 februari 2026
- **2026 maj**: Alla kategorier ifyllda (uppdaterat 2026-06-05)

---

## medlemmar/ – Medlemsstatistik

Webbapp för att visualisera tillväxten av aktiva medlemmar registrerade i Wondr.

**Live-sida:** https://kentlundgren.github.io/foreningar/BjerredsSaltsjobad/medlemmar/

- Interaktivt diagram: nyregistreringar per månad och ackumulerad tillväxt
- Filter för år (2025 / 2026 / hela perioden)
- Uppdelning per typ: familjemedlemskap och enskilt medlemskap
- Trippelklick på stapel visar förnamn + initial för den månaden (nov 2025 hårdkodat; övriga månader kräver lokal datafil)

> **OBS – Personuppgifter:** Rådata och namnlistor från Wondr lagras
> enbart lokalt och ingår inte i detta repo (se `.gitignore` i `medlemmar/`).

### Aktuell statistik (maj 2026)

| Typ | Antal |
|-----|-------|
| Familjemedlemskap | 446 |
| Enskilda medlemskap | 884 |
| **Totalt** | **1 330** |
| Netto nya efter bastuöppning (juli 2025) | 773 |

Källa: [Wondr Subscribers/Count2](https://bjerredssaltsjobad.wondr.se/w_report/reports/report/Subscribers/Count2) *(kräver inloggning)*

---

## Firebase-backend

Inpasseringsdata lagras i **Firebase Realtime Database** (projekt: `skylt-e0c45`, region: europe-west1). Konfigurationen finns i `inpasseringar/data.html` och `inpasseringar/databas.html`.

**Firebase Console:** https://console.firebase.google.com/project/skylt-e0c45

**Implementationsstatus (klart 2026-05-15):** Alla 8 steg genomförda ✅

**Aktiva användare:**
| Användare | Roll |
|---|---|
| `lundgren.kent@gmail.com` | Administratör |
| `bjorn.syren1@gmail.com` | Björn Syren – inpasseringsansvarig |

**Authorized domains (Firebase Authentication):**
- `localhost` – lokal testning
- `kentlundgren.github.io` – GitHub Pages (tillagd 2026-05-15)

---

## Teknisk information

- **Teknik:** Ren HTML/CSS/JavaScript (ingen byggprocess krävs)
- **Bibliotek:** Chart.js 4.4 (Cloudflare CDN), Firebase JS SDK v11.0.0 (Google CDN)
- **Datalagring:** Firebase Realtime Database (primär) + `BASE_DATA` hårdkodad fallback
- **Publicering:** GitHub Pages
- **Parallell utvecklingsmiljö:** Claude Cowork (AI-assisterat innehållsarbete) + Cursor (kodredigering, Git)

---

## AI-verktyg och projektminne

Det här projektet använder Claude (via Cursor) för AI-assisterad kodning och dataanalys.

| Fil | Syfte |
|---|---|
| [CLAUDE.md](CLAUDE.md) | AI-agentens projektminne – regler, status, ändringslogg. Läses automatiskt av Claude varje session. |
| [RULES-OVERVIEW.md](RULES-OVERVIEW.md) | Register över alla aktiva regler och skills för projektet. |
| [.cursor/skills/bjerred-firebase-sync/SKILL.md](.cursor/skills/bjerred-firebase-sync/SKILL.md) | Skill för månadssynk: hämtar data från Firebase, jämför mot BASE_DATA i data.html/index.html och uppdaterar data.md. Kör varje månad. |

**Använda skillet:** Säg till Claude: *"Kör månadssynken för Bjerreds inpasseringsdata"* – inget annat behövs.
---

## Senast uppdaterad: 2026-06-05