# Inpasseringsdata – Bjerreds Saltsjöbad

Denna fil är en **läsbar referens och backup** för all inpasseringsdata.
Uppdateras varje månad när ny data läggs in – parallellt med BASE_DATA i `data.html` och `index.html`.

**Källa:** Firebase Realtime Database (projekt `skylt-e0c45`)
**Synkstatus kontrolleras med:** `.cursor/skills/bjerred-firebase-sync/SKILL.md`

Senast uppdaterad: **2026-06-05**
Dataperiod: **Januari 2024 – Maj 2026**

---

## Inpasseringar 2026

| Kategori | Jan | Feb | Mar | Apr | Maj | Jun | Jul | Aug | Sep | Okt | Nov | Dec | TOT 2026 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Restaurangen/badbiljetter | 643 | 665 | 600 | 359 | 417 | – | – | – | – | – | – | – | **2 684** |
| SMS/Swish-biljetter | 1 114 | 751 | 1 006 | 913 | 777 | – | – | – | – | – | – | – | **4 561** |
| *Engångsbadare – Wondr \** | *17* | *13* | *38* | *31* | *173* | – | – | – | – | – | – | – | *272 \** |
| Medlemmar – armband | 492 | 119 | 95 | 90 | 55 | – | – | – | – | – | – | – | **851** |
| Medlemmar – Wondr | 2 627 | 2 445 | 3 663 | 3 293 | 3 417 | – | – | – | – | – | – | – | **15 445** |
| **TOTALT** | **4 876** | **3 980** | **5 364** | **4 655** | **4 666** | – | – | – | – | – | – | – | **23 541** |

\* *Engångsbadare – Wondr räknas inte med i TOTALT (ingår troligen redan i Medlemmar – Wondr).*

---

## Inpasseringar 2025

| Kategori | Jan | Feb | Mar | Apr | Maj | Jun | Jul | Aug | Sep | Okt | Nov | Dec | TOT 2025 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Restaurangen/badbiljetter | 737 | 764 | 0 | 0 | 0 | 0 | 344 | 891 | 991 | 667 | 794 | 621 | **5 809** |
| SMS/Swish-biljetter | 801 | 619 | 0 | 0 | 0 | 0 | 4 | 140 | 285 | 726 | 1 052 | 1 373 | **5 000** |
| Medlemmar – armband | 3 231 | 2 555 | 0 | 0 | 0 | 0 | 1 524 | 2 134 | 2 339 | 1 552 | 1 400 | 1 000 | **15 735** |
| Medlemmar – Wondr | 0 | 0 | 0 | 0 | 0 | 0 | 120 | 1 359 | 1 729 | 1 993 | 2 443 | 2 513 | **10 157** |
| **TOTALT** | **4 769** | **3 938** | **0** | **0** | **0** | **0** | **1 992** | **4 524** | **5 344** | **4 938** | **5 689** | **5 507** | **36 701** |

*0-värden mars–juli 2025 = bastun stängd för ombyggnad (mitten feb – mitten jul 2025).*
*Wondr lanserades juli 2025.*

---

## Inpasseringar 2024

| Kategori | Jan | Feb | Mar | Apr | Maj | Jun | Jul | Aug | Sep | Okt | Nov | Dec | TOT 2024 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Restaurangen | 754 | 696 | 772 | 656 | 841 | 654 | 696 | 678 | 725 | 607 | 795 | 620 | **8 494** |
| SMS-biljetter | 557 | 458 | 484 | 331 | 265 | 184 | 143 | 197 | 240 | 484 | 593 | 827 | **4 763** |
| Medlemmar – armband | 2 949 | 2 788 | 3 096 | 2 251 | 3 388 | 3 130 | 3 581 | 3 362 | 4 210 | 3 146 | 3 299 | 3 255 | **38 455** |
| **TOTALT** | **4 260** | **3 942** | **4 352** | **3 238** | **4 494** | **3 968** | **4 420** | **4 237** | **5 175** | **4 237** | **4 687** | **4 702** | **51 712** |

---

## Noteringar

- **2025 mars–juli:** 0-värden är korrekta – bastun stängd för ombyggnad.
- **2025 juli:** Wondr lanserades och ny kategori "Medlemmar – Wondr" tillkom.
- **2026 feb:** Armbanden fasades ut 1 februari 2026.
- **Engångsbadare – Wondr:** Wondr-systemet registrerar engångsbadare som korttidsmedlemmar. De ingår troligen redan i "Medlemmar – Wondr" – visas separat enbart för bokföring.
- **Datakategorier 2024** heter annorlunda än 2025–2026 (systembyten under perioden).

---

## Hur man lägger till ny månadsdata (månadsrutin)

1. **Firebase:** Logga in på `inpasseringar/data.html` och klicka i cellerna för den nya månaden.
2. **BASE_DATA:** Be Claude köra månadssynken: *"Kör månadssynken för Bjerreds inpasseringsdata"*
   - Skillet jämför Firebase mot BASE_DATA i `data.html` och `index.html`
   - Uppdaterar automatiskt BASE_DATA om avvikelser hittas
   - Uppdaterar denna fil (`data.md`) med de nya värdena
3. **Kontrollräkna TOTALT:** Summan av alla kategorier (exkl. Engångsbadare) ska matcha TOTALT-raden.

**Wondr-källor för att hämta rådata:**
| Rapport | URL |
|---|---|
| Inpasseringsstatistik per månad | [CheckIn/Statistics2](https://bjerredssaltsjobad.wondr.se/w_report/reports/report/CheckIn/Statistics2?data%5Bgrouping%5D=month) |
| Ekonomirapport – engångsbelopp | [Payment/BookkeptOrderRows](https://bjerredssaltsjobad.wondr.se/w_report/reports/report/Payment/BookkeptOrderRows) |