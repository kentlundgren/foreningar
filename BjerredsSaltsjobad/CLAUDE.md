# CLAUDE.md – Bjerreds Saltsjöbad

*Version 2026-06-05*

Denna fil är projektets **minne** – den beskriver arkitektur, beslut och aktuell status
för att Claude och Kent ska kunna fortsätta arbetet i en ny session utan att tappa tråden.

---

## Regel: Uppdatera CLAUDE.md efter varje större session

> **INSTRUKTION TILL CLAUDE:** När en session innehållit skapande av nya filer,
> strukturella förändringar, principbeslut (t.ex. anonymisering, .gitignore-regler)
> eller uppdatering av befintliga sidor – uppdatera denna fil innan sessionen avslutas.
> Fråga Kent om det är oklart vad som är "stort nog" att dokumentera.
>
> Syftet är att en ny session ska kunna börja med att läsa denna fil och direkt förstå:
> - Vilka sidor som finns och vad de gör
> - Vilka designbeslut som tagits och varför
> - Vad som är känslig data och hur den hanteras
> - Vad som gjordes senast och vad som kan vara nästa steg

---

## Ändringslogg

| Datum | Vad gjordes |
|---|---|
| 2026-05-28 | Lagt till `engangsintraden.html` med anonymiserade engångsinträden (B001–B185) |
| 2026-05-28 | Lagt till `PRIVAT-namnmapping.json` lokalt (ej i repo) + .gitignore-regler |
| 2026-05-28 | `inpasseringar/index.html`: nav-länk till engangsintraden.html tillagd |
| 2026-05-28 | `BjerredsSaltsjobad/index.html`: nav-kort för Medlemmar tillagt |
| 2026-05-28 | `BjerredsSaltsjobad/README.md`: mappstruktur utökad med alla undermappar |
| 2026-05-28 | `medlemmar/` flyttad till BjerredsSaltsjobad/; README uppdaterad (v3.1) |
| 2026-05-28 | `medlemmar/index.html`: tillbakalänk till startsidan tillagd i headern |
| 2026-05-28 | `medlemmar/index.html`: GitHub-länk tillagd (nedre vänstra hörnet) |
| 2026-05-28 | `medlemmar/index.html`: initialer borttagna ur november-datan (bara förnamn kvar) |
| 2026-05-28 | `.gitignore`: datafiler med personuppgifter i `medlemmar/` blockerade |
| 2026-05-28 | Datafiler med riktiga namn: 8 filer avregistrerade med `git rm --cached` |
| 2026-06-03 | Förklaring av dubbel datalagring (BASE_DATA + Firebase) tillagd |
| 2026-06-03 | Regel tillagd: aldrig diffus/osynlig text – ljusa kodblockar kräver explicit mörk color |
| 2026-06-05 | Länk till Wondr-statistik (inpasseringar/data.html) tillagd bredvid "Membermar – Wonder" |
| 2026-06-05 | Länk till Wondr ekonomirapport tillagd bredvid "Engångsbadare – Wondr" |
| 2026-06-05 | Regel tillagd: systemet heter Wondr (inte Wonder) – se avsnittet Systemnomenklatur |
| 2026-05-15 | Firebase Realtime Database i produktion – alla 8 steg klara |

---

## Projektbeskrivning

Webbsida med entréskylt och statistik för **Bjerreds Saltsjöbad** (kallbadhus och bastu i Bjärred utanför Lund).
Webbplats: https://bjerredskallbadhus.se
GitHub Pages: https://kentlundgren.github.io/foreningar/BjerredsSaltsjobad/

---

## Mappstruktur

```
BjerredsSaltsjobad/
├── CLAUDE.md                  ← denna fil (projektminne)
├── README.md                  ← beskrivning och direktlänkar för GitHub
├── index.html                 ← nav-sida / landningssida (rot) – 3 kort: Entréskylt, Inpassering, Medlemmar
├── inpassering/               ← digitala entrésyltar
│   ├── index.html             ← skylt-sida (gamla skylten + knappar till digitala)
│   ├── skylt.html             ← digital entréskylt, svenska (A4/A5-utskrift)
│   ├── skylt_eng.html         ← digital entréskylt, engelska (A4/A5-utskrift)
│   └── gammal_skylt.jpg       ← foto på den gamla fysiska skylten
├── inpasseringar/             ← inpasseringsstatistik och datahantering
│   ├── index.html             ← statistik med diagram (Chart.js) + Firebase-kopplad
│   ├── data.html              ← redigerbar datatabell (Firebase, inloggning krävs för skrivning)
│   ├── engangsintraden.html   ← linjediagram: engångsinträden 2026 (anonymiserade)
│   ├── databas.html           ← Firebase-arbetsdokument
│   └── PRIVAT-namnmapping.json  ← LOKAL FIL ENBART – ingår INTE i repot (se .gitignore)
└── medlemmar/                 ← medlemsstatistik och visualisering
    ├── index.html             ← interaktivt diagram: nyregistreringar + ackumulerad tillväxt
    ├── GitHub.html            ← guide för Git och GitHub
    ├── dataformat.html        ← information om dataformat
    ├── privatadata.html       ← hantering av privat data (sida om GDPR-principer)
    ├── nyamedlemmar.js        ← trippelklick-funktion (läser data/md_komplett_251226.md lokalt)
    ├── kopiera_datafiler.ps1  ← PowerShell-script för lokal filkopiering
    ├── data/                  ← LOKAL MAPP ENBART – ingår INTE i repot (se .gitignore)
    │   ├── md_komplett_251226.md  ← fullständig namnlista (1252 poster) – lokal
    │   ├── md_251226.json         ← samma data, JSON-format – lokal
    │   └── md_summary_251226.md   ← sammanfattning – lokal
    ├── .gitignore             ← blockerar datafiler med personuppgifter
    └── README.md              ← beskrivning och direktlänkar (v3.1, 2026-05-28)

# OBS: Följande filer SAKNAS i repot (lokal enbart, blockerade av .gitignore):
#   inpasseringar/PRIVAT-namnmapping.json
#   medlemmar/medlemsdata.json, medlemsdata_rå.csv, medlemsdata_komplett.md,
#   medlemsdata_sammanfattning.md, Subscription-Active-20251223.xlsx
#   medlemmar/data/ (hela mappen)
```

---

## Navigation mellan sidor

| Sida | Navigation |
|---|---|
| `index.html` (rot) | Hub-sida med 3 nav-kort: Entréskylt, Inpasseringsstatistik, Medlemsstatistik |
| `inpassering/index.html` | Breadcrumb: `🏠 Bjerreds Saltsjöbad › Entréskylt` (länk till `../`) |
| `inpassering/skylt.html` | `← Entréskylt`-länk i utskriftsraden (döljs vid utskrift) |
| `inpassering/skylt_eng.html` | `← Entry signs`-länk i utskriftsraden |
| `inpasseringar/index.html` | `🏠 Startsidan`-knapp + `📊 Visa data`-knapp + `👤 Engångsinträden`-knapp |
| `inpasseringar/data.html` | `🏠 Startsidan` + `← Statistik` i headern |
| `inpasseringar/engangsintraden.html` | Länk tillbaka till `index.html` i inpasseringar/ |
| `medlemmar/index.html` | `← Bjerreds Saltsjöbad`-länk i headerbanderollet + `{ } GitHub`-knapp (nedre vänster) |

Alla sidor har en diskret `{ } GitHub`-länk fixerad i nedre vänstra hörnet (CLAUDE.md-konvention).

---

## inpasseringar/engangsintraden.html – Engångsinträden 2026

Skapad 2026-05-27. Visar engångsinträden (Wondr-köp utan medlemskap) per månad.

**Anonymisering:** Besökarnamn ersatta med koder B001–B185.
- Koden är konsekvent: samma person får alltid samma kod oavsett session
- Mappningsfilen `PRIVAT-namnmapping.json` ligger ENBART lokalt i `inpasseringar/`
- Nästa lediga kod: **B186** (uppdatera i PRIVAT-namnmapping.json vid ny datainläsning)

**Data:** t.o.m. 27 maj 2026 · 248 besök totalt · 185 unika besökare

**Funktioner:**
- Linjediagram (Chart.js) med en linje per månad
- Tre statistikkort: totalt antal besök, unika besökare, månaden med flest besök
- Valbar tabell för återkommande besökare (döljs/visas med knapp)
- Infobox: förklarar anonymisering och datakälla

**Teknisk notering:** Rå-datan är hårdkodad i JavaScript-arrayen `ENGANGS_RAWDATA` med koderna (inte namn). `.gitignore` i ClaudeCowork-roten blockerar `PRIVAT-*.json` och `PRIVAT-*.txt`.

---

## medlemmar/ – Medlemsstatistik

Verktyg för att visualisera tillväxten av aktiva Wondr-medlemmar.
Live: https://kentlundgren.github.io/foreningar/BjerredsSaltsjobad/medlemmar/

**Aktuell statistik (maj 2026):**

| Typ | Antal |
|-----|-------|
| Familjemedlemskap | 446 |
| Enskilda medlemskap | 884 |
| **Totalt** | **1 330** |
| Netto nya efter bastuöppning (juli 2025) | 773 |

**Diagram:** Månadsvis statistik 2025–2026. Standardfilter: "År 2026". Y-axeln hanterar negativa nettoförändringar (familjemedlemskap minskar 2026).

**Trippelklick-funktion:** Klick × 3 på en stapel öppnar modal med förnamn + bokningsantal.
- **November 2025:** Hårdkodat direkt i `index.html` – ENBART förnamn (initialer borttagna 2026-05-28)
- **Övriga månader:** Laddas dynamiskt från `data/md_komplett_251226.md` (lokal fil – ej i repot)

---

## Personuppgifter och anonymisering

> **Viktigt:** Dessa regler gäller för hela projektet.

### .gitignore-regler (ClaudeCowork-roten)
```
PRIVAT-*.json       # Privata mappningsfiler (engångsinträden)
PRIVAT-*.txt        # Privata textfiler
BjerredsSaltsjobad/medlemmar/medlemsdata*           # Namnlistor från Wondr
BjerredsSaltsjobad/medlemmar/Subscription-Active-*.xlsx  # Excel-export
BjerredsSaltsjobad/medlemmar/data/                  # Hela data-mappen
```

### Vad som publicerats och vad som är lokalt

| Var? | Typ av data | Anonymisering |
|---|---|---|
| `inpasseringar/engangsintraden.html` (GitHub) | Engångsinträden 2026 | Koder B001–B185 (ingen koppling till namn i repot) |
| `inpasseringar/PRIVAT-namnmapping.json` (LOKALT) | Kod → riktigt namn | Lokal fil, aldrig i repot |
| `medlemmar/index.html` (GitHub) | November 2025 – namnlista | Enbart förnamn (initialer borttagna 2026-05-28) |
| `medlemmar/data/` (LOKALT) | Fullständig namnlista (1 252 poster) | Lokal mapp, aldrig i repot |

### Nästa steg vid ny datainläsning (engångsinträden)
1. Öppna `PRIVAT-namnmapping.json` och notera `nasta_lediga_kod` (nu B186)
2. Tilldela nya besökare koder från B186 uppåt
3. Uppdatera `PRIVAT-namnmapping.json` med de nya mappningarna och ny `nasta_lediga_kod`
4. Uppdatera `ENGANGS_RAWDATA` i `engangsintraden.html` med nya poster (bara koder, inga namn)

---

## Parallell utvecklingsmiljö

| Verktyg | Roll |
|---|---|
| **Claude Cowork** | AI-assisterad filgenerering, datavisualisering, innehållsarbete |
| **Cursor** | Kodredigering, finjustering, versionshantering (Git + GitHub) |

Cursor är kopplat till **Git och GitHub**. Filer skapas/redigeras i Cowork och committtas sedan via Cursor och publiceras på **GitHub Pages**.

---

## Regler för filer som skapas

- Alla filer ska vara **självständiga** (inga server-side beroenden, ingen byggprocess)
- Använd **CDN-länkar** (Cloudflare cdnjs eller jsDelivr) för externa bibliotek
- **GitHub Pages-kompatibelt**: inga absoluta sökvägar, inga backend-anrop
- Undvik temporära scratch-filer i projektmappen – de hamnar i Git-historiken
- Kommentarer och variabelnamn skrivs på **svenska** (engelska vid teknisk term)
- **UTF-8 alltid:** Filer med svenska tecken skapas via PowerShell (Write-verktyget förstör å/ä/ö)
- **Personuppgifter:** Inga riktiga namn i filer som går till GitHub – se avsnittet om anonymisering
- **Textkontrast – aldrig diffus text:** När ett pre- eller kodblock med ljus bakgrund skapas (t.ex. #f9f2f4, #f0fdf4) *måste* color sättas explicit till mörkt (t.ex. color:#24292e). Den globala pre-stilen är avsedd för mörk bakgrund och skapar annars osynlig text. Kontrollera alltid att kodtext syns tydligt mot vald bakgrundsfärg.
- **Kopifiler ignoreras:** Filer med `copy` eller `kopia` i filnamnet (t.ex. `index copy.html`, `data_kopia.html`) är arbetskopior och ska aldrig analyseras, sökas i eller uppdateras vid sessionsarbete. Arbeta alltid med originalfilen.

---

## Prisstrategi 2026 – Wondr-appen

Föreningen har medvetet satt ett **lägre pris för Wondr-appen (100 kr)** jämfört med övriga metoder (120 kr). Strategin är att få badare att registrera sig i Wondr-systemet.

**Flöde för engångsbadare via Wondr:**
1. Registrera sig på https://bjerredssaltsjobad.wondr.se/register
2. Välj **"Engångsinträde"**
3. Betala 100 kr – dörren öppnas direkt via appen

**Viktigt:** Om priset ändras ska det uppdateras i `inpassering/skylt.html` OCH `inpassering/skylt_eng.html`. Wondr-priset ska alltid vara lägre.

---

## Entréskylt – inpassering/skylt.html + skylt_eng.html

> **Regel:** När `skylt.html` uppdateras ska `skylt_eng.html` alltid uppdateras parallellt.

- Tre betalmetoder: **Wondr-appen** (100 kr), **SMS** (120 kr), **Swish/Kort** (120 kr)
- **Coincode-appen borttagen** (fungerar ej, borttagen 2026-05-14)
- Språkknapp uppe till höger växlar svenska/engelska
- Utskriftsrad med knappar för **A4** och **A5** – döljs vid utskrift

---

## Teknikstack – inpasseringar/index.html

- **Chart.js 4.4** (cdnjs) – linjediagram och stapeldiagram
- Eget inline Canvas-plugin för ombyggnadsmarkeringen (feb–jul 2025)
- **Firebase Realtime Database** – live-data via `onValue()`, BASE_DATA som fallback
- Data-källeindikator i headern: grön prick "Live från Firebase" eller orange "Lokal backup"

## Diagramfärger – inpasseringar/index.html

| Kategori | Färg | Motivering |
|---|---|---|
| Restaurangen / Restaurangen/badbiljetter | Grön `#2ecc71` | Neutral |
| SMS-biljetter / SMS/Swish-biljetter | Röd `#e74c3c` | Neutral |
| Medlemmar – armband | Blå `#3498db` | Matchar de fysiska **blå** armbanden |
| Medlemmar – Wonder/Wondr | Orange `#f39c12` | Neutral |

> **Regel:** Nya kategorier läggs till i `KATEGORI_FÄRGER` med motiverad färg.

---


---

## Systemnomenklatur – Wondr (inte Wonder)

> **INSTRUKTION TILL CLAUDE:** Systemet för betalning och inpasseringsrapportering heter
> **Wondr** – stavat med litet r, utan e sist. URL: https://bjerredssaltsjobad.wondr.se/
>
> Databasenyckeln 'Membermar – Wonder' i BASE_DATA och Firebase är **historisk och felstavad**.
> Byt den inte utan att samtidigt migrera Firebase-datan – annars tappas live-data.
>
> Wondr-rapporter som används:
> | Rapport | URL |
> |---|---|
> | Inpasseringsstatistik per månad (Membermar – Wondr) | /w_report/reports/report/CheckIn/Statistics2?data%5Bgrouping%5D=month |
> | Ekonomirapport – betalda engångsbelopp (Engångsbadare – Wondr) | /w_report/reports/report/Payment/BookkeptOrderRows |

---

## Data – viktig kontext

- **2024**: Komplett helårsdata (tre kategorier: Restaurangen, SMS-biljetter, Armband)
- **2025**: Bastun stängd **mitten feb – mitten jul 2025** → 0-värden i mars–juni är korrekta
- **2025**: **Wondr** lanserades juli 2025 → ny kategori "Medlemmar – Wonder" från jul 2025
- **2026**: Armbanden fasades ut **1 februari 2026**
- **2026 april**: Alla kategorier ifyllda (2026-05-15): Restaurangen 359, SMS/Swish 913, Armband 90, Wonder 3 293

---

## Uppdatera inpasseringsdata

### Primärt (via Firebase – direkt i webbläsaren, ingen kod):
Öppna `inpasseringar/data.html` → logga in → klicka cell → skriv nytt värde → Enter.

> **OBS:** `BASE_DATA` finns i **både** `inpasseringar/index.html` och `inpasseringar/data.html`. Uppdatera alltid båda om du redigerar direkt i koden.

---

## Firebase-backend – status och konfiguration

**Status (2026-05-15): Alla 8 steg klara – i produktion ✅**

| # | Steg | Status |
|---|---|---|
| 1 | Firebase-projekt valt: "skylt" (skylt-e0c45) | ✅ |
| 2 | firebaseConfig hämtad och dokumenterad | ✅ |
| 3 | Realtime Database aktiverad (region: europe-west1) | ✅ |
| 4 | Säkerhetsregler: read=true, write=auth!=null | ✅ |
| 5 | Authentication aktiverad, användare skapade | ✅ |
| 6 | BASE_DATA migrerad (11 kategorier, 0 fel) | ✅ |
| 7 | data.html omskriven att läsa/skriva mot Firebase | ✅ |
| 8 | Testat på GitHub Pages – live-synk bekräftad | ✅ |

**Firebase Console:** https://console.firebase.google.com/project/skylt-e0c45

**Authorized domains (Firebase Authentication):**
- `localhost` – lokal testning
- `kentlundgren.github.io` – tillagd 2026-05-15

**Datastruktur i Firebase:**
```
bjerred-inpasseringar/
  data/
    2024/ { Restaurangen, SMS-biljetter, Medlemmar – armband }
    2025/ { Restaurangen/badbiljetter, SMS/Swish-biljett, Medlemmar – armband, Medlemmar – Wonder }
    2026/ { Restaurangen/badbiljetter, SMS/Swish-biljetter, Medlemmar – armband, Medlemmar – Wonder }
  senast-uppdaterad: "2026-05-15"
```

**OBS – snedstreck i kategorinamn:** `"Restaurangen/badbiljetter"` lagras som nästlade noder i Firebase. Läsfunktionen `tolkFirebaseSnapshot()` i data.html hanterar detta korrekt.

---

## Bjuda in nya användare till data.html

1. Firebase Console → Authentication → Users → **Add user** (e-post + tillfälligt lösenord)
2. Öppna `inpasseringar/data.html` → klicka **✉ Bjud in** (nedre vänster) → fyll i uppgifter → kopiera text → skicka via mail

### Aktiva användare (2026-05-15)

| Användare | Roll |
|---|---|
| `lundgren.kent@gmail.com` | Administratör |
| `bjorn.syren1@gmail.com` | Björn Syren – inpasseringsansvarig |