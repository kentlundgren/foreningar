# CLAUDE.md – Bjerreds Saltsjöbad

Denna fil beskriver projektet och dess arbetssätt för Claude (Cowork) och Cursor.

## Projektbeskrivning

Webbsida med entréskylt och inpasseringsstatistik för **Bjerreds Saltsjöbad** (kallbadhus och bastu i Bjärred utanför Lund).  
Webbplats: https://bjerredskallbadhus.se  
GitHub Pages: https://kentlundgren.github.io/foreningar/BjerredsSaltsjobad/

## Mappstruktur

```
BjerredsSaltsjobad/
├── CLAUDE.md              ← denna fil
├── README.md
├── index.html             ← nav-sida / landningssida (rot)
├── inpassering/           ← digitala entrésyltar
│   ├── index.html         ← skylt-sida (gamla skylten + knappar till digitala)
│   ├── skylt.html         ← digital entréskylt, svenska (A4/A5-utskrift)
│   ├── skylt_eng.html     ← digital entréskylt, engelska (A4/A5-utskrift)
│   └── gammal_skylt.jpg   ← foto på den gamla fysiska skylten
└── inpasseringar/         ← inpasseringsstatistik (orörd)
    ├── index.html         ← statistik med diagram (Chart.js)
    └── data.html          ← redigerbar datatabell
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

## Prisstrategi 2026 – Wondr-appen

Föreningen har medvetet satt ett **lägre pris för Wondr-appen (100 kr)** jämfört med övriga metoder (120 kr). Strategin är att få badare att registrera sig i Wondr-systemet, eftersom det ger föreningen bättre kontroll och lägre transaktionskostnader på sikt.

**Flöde för engångsbadare via Wondr:**
1. Registrera sig på https://bjerredssaltsjobad.wondr.se/register
2. Välj **"Engångsinträde"** (se även "Enskilt medlemskap" och "Familjemedlemskap" för återkommande badare)
3. Betala 100 kr – dörren öppnas direkt via appen

**Viktigt för framtida prisjusteringar:** Om priset ändras ska det uppdateras konsekvent i `inpassering/skylt.html` OCH `inpassering/skylt_eng.html`. Wondr-priset ska alltid vara lägre än övriga metoder för att behålla incitamentet.

## Entréskylt – inpassering/skylt.html + skylt_eng.html

> **⚠️ Regel:** Varje gång `skylt.html` (svenska) uppdateras ska `skylt_eng.html` (engelska) alltid uppdateras med motsvarande ändringar på engelska. De två filerna ska alltid hållas i synk.

- Tre betalmetoder visas: **Wondr-appen** (100 kr), **SMS** (120 kr), **Swish/Kort** (120 kr)
- **Coincode-appen är borttagen** – fungerar ej enligt Björn (föreningens inpasseringsansvarig), borttagen 2026-05-14
- Språkknapp uppe till höger i headern växlar mellan svenska och engelska
- Utskriftsrad ovanför skylten med knappar för **A4** och **A5** – format sätts dynamiskt via JS (`printSign(format)`) och döljs vid utskrift
- `inpassering/index.html` visar den gamla fysiska skylten (foto) + knappar till de digitala versionerna

## Navigation mellan sidor

Konsekvent navigationssystem (lagt till 2026-05-14):

| Sida | Navigation |
|---|---|
| `index.html` (rot) | Hub-sida, inga knappar behövs |
| `inpassering/index.html` | Breadcrumb: `🏠 Bjerreds Saltsjöbad › Entréskylt` (länk till `../`) |
| `inpassering/skylt.html` | `← Entréskylt`-länk till vänster i utskriftsraden (döljs vid utskrift) |
| `inpassering/skylt_eng.html` | `← Entry signs`-länk till vänster i utskriftsraden |
| `inpasseringar/index.html` | `🏠 Startsidan`-knapp i headern (bredvid befintlig "Visa data") |
| `inpasseringar/data.html` | `🏠 Startsidan` + `← Statistik` i headern |

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
Öppna `inpasseringar/index.html` → klicka **"+ Lägg till / uppdatera data"** → fyll i formuläret. Sparas i `localStorage`.

### Permanent (för Git-commit):
Öppna `inpasseringar/index.html` i Cursor och redigera `BASE_DATA`-objektet i `<script>`-blocket.  
Strukturen är: `BASE_DATA[år][kategori][månadsindex]` där 0 = januari, 11 = december.  
`null` = data saknas, `0` = bekräftat noll (t.ex. stängd period).
