# Bjerreds Saltsjöbad – Medlemmar

*Senast uppdaterad: 2026-09-07*

## Direktlänkar

| Sida | Länk |
|------|------|
| Live-sidan (statistik) | https://kentlundgren.github.io/foreningar/BjerredsSaltsjobad/medlemmar/ |
| Git & GitHub-guide | https://kentlundgren.github.io/foreningar/BjerredsSaltsjobad/medlemmar/GitHub.html |
| GitHub-repo (källkod) | https://github.com/kentlundgren/foreningar/tree/main/BjerredsSaltsjobad/medlemmar |

---

Ett webbaserat system för att hantera och visualisera medlemsstatistik för Bjerreds Saltsjöbad.
Byggt med vanilla JavaScript, HTML och CSS – ingen byggprocess krävs.

## Beskrivning

Systemet innehåller:

- **Medlemsöversikt** – visualisering av aktiva medlemmar per månad
- **Statistik och grafer** – interaktivt diagram med filter för år och period
- **Responsiv design** – fungerar på desktop, tablet och mobil

> **OBS – Personuppgifter:** Rådata och namnlistor från Wondr lagras
> enbart lokalt och ingår inte i detta repo (se `.gitignore`).

## Aktuell statistik (aug 2026)

| Typ | Antal |
|-----|-------|
| Familjemedlemskap | 445 * |
| Enskilda medlemskap | 861 * |
| **Totalt** | **1 326** |
| Netto nya efter bastuöppning (juli 2025) | 769 |

Totalen kommer från [Wondr Subscribers/Count2](https://bjerredssaltsjobad.wondr.se/w_report/reports/report/Subscribers/Count2)
([skärmdump mars–aug 2026](bilder/medlemmar_202603_202608.jpg) – öppen för alla, Wondr-rapporten kräver inloggning).
\* Uppdelningen familj/enskilt för juni–aug 2026 är **uppskattad** – Count2 ger ingen
split, så augusti är hämtad från [Wondr Subscription/Active](https://bjerredssaltsjobad.wondr.se/w_report/reports/report/Subscription/Active)
(exkl. gratismedlemmar och "registrering av familjemedlemmar") och juni–juli är
interpolerade. Dessa linjer visas streckade i diagrammet. *(Båda rapporterna kräver inloggning.)*

## Projektstruktur

```
medlemmar/
│
├── index.html                          # Huvudsida – statistik och visualisering
├── GitHub.html                         # Guide för Git och GitHub
├── dataformat.html                     # Information om dataformat
├── privatadata.html                    # Hantering av privat data
├── brev_till_Wondr_260105.html         # Brev till Wondr (5 jan 2026, HTML)
├── brev_till_Wondr_260105.txt          # Brev till Wondr (5 jan 2026, text)
├── nyamedlemmar.js                     # JavaScript för trippelklick-funktion
├── kopiera_datafiler.ps1               # PowerShell-script för lokal filkopiering
│
├── aktiva_medlemmar_251223.jpg         # Graf: aktiva medlemmar dec 2025
├── ackumulerad_utveckling_2025_tom_251223.jpg  # Graf: ackumulerad utveckling
├── collaborators.jpg                   # Bild: medarbetare
├── git_autentisering.jpg               # Bild: Git-autentisering
│
├── .gitignore                          # Exkluderar datafiler med personuppgifter
└── README.md                           # Denna fil

# Följande filer lagras ENBART LOKALT (ingår ej i repot):
#   medlemsdata.json, medlemsdata_rå.csv, medlemsdata_komplett.md,
#   medlemsdata_sammanfattning.md, Subscription-Active-20251223.xlsx,
#   data/md_251226.json, data/md_komplett_251226.md, data/md_summary_251226.md
```

## Komma igång

Projektet bor som en undermapp i repot `foreningar`:

```bash
git clone https://github.com/kentlundgren/foreningar.git
cd foreningar/BjerredsSaltsjobad/medlemmar
```

Öppna sedan `index.html` direkt i webbläsaren – ingen lokal server krävs.

> **Datafiler med namn:** Dessa ingår inte i repot och måste kopieras
> separat till din lokala klon om du vill använda trippelklick-funktionen
> för att visa enskilda medlemmar per månad.

## Versionshistorik

- **v3.2** (2026-09-07)
  - Månadsdata för jun–aug 2026 tillagd
  - Totallinjen (jun 1335, jul 1336, aug 1326): källa Wondr Subscribers/Count2
  - Uppdelningen familj/enskilt jun–aug är osäker (ingen split i Count2) –
    aug från Wondr Subscription/Active, jun–jul interpolerat – och ritas streckad
  - Stapeldiagrammet: jun–aug som en enda stapel "Total nettoförändring"
  - Statistikkort, fotnot och rubrik uppdaterade till aug 2026

- **v3.1** (2026-05-28)
  - Datafiler med personuppgifter borttagna från GitHub
  - Lagras nu enbart lokalt, exkluderade via `.gitignore`
  - README uppdaterad: beskrivning och projektstruktur justerade

- **v3.0** (2026-05-28)
  - Mappen flyttad till `foreningar/BjerredsSaltsjobad/medlemmar`
  - README uppdaterad med korrekta URL:er och fullständig filförteckning
  - Månadsdata för jan–maj 2026 tillagd
  - Nytt tidsfilter "År 2026" (satt som standard)
  - Y-axeln hanterar nu negativa nettoförändringar
  - Statistikkort uppdaterade med maj 2026-värden

- **v2.1** (2025-12-23)
  - Exkluderat "Registrering av familjemedlemmar" från statistiken
  - Uppdaterad fotnot med förklaring av exkluderade kategorier

- **v2.0** (2025-12-23)
  - Total-linje i ackumulerat diagram
  - Ökad diagramhöjd för bättre läsbarhet
  - Förbättrad responsiv design

- **v1.0** (2025-01-05)
  - Initial release med grundläggande medlemshantering,
    statistik, visualisering och export

## Länkar

- [Live-sida](https://kentlundgren.github.io/foreningar/BjerredsSaltsjobad/medlemmar/)
- [GitHub-repo](https://github.com/kentlundgren/foreningar/tree/main/BjerredsSaltsjobad/medlemmar)
- [Rapportera problem](https://github.com/kentlundgren/foreningar/issues)
- [Wondr-rapport (kräver inloggning)](https://bjerredssaltsjobad.wondr.se/w_report/reports/report/Subscribers/Count2)

---

**Kent Lundgren · Lund, Sverige · [@kentlundgren](https://github.com/kentlundgren)**