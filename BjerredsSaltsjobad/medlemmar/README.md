# 🏛️ Bjerred Medlemmar

## 🔗 Direktlänkar

| Sida | Länk |
|------|------|
| 📊 **Live-sidan (statistik)** | [kentlundgren.github.io/Bjerred-medlemmar](https://kentlundgren.github.io/Bjerred-medlemmar/) |
| 📚 **Git & GitHub-guide** | [GitHub.html (live)](https://kentlundgren.github.io/Bjerred-medlemmar/GitHub.html) |
| 💻 **GitHub-repo (källkod)** | [github.com/kentlundgren/Bjerred-medlemmar](https://github.com/kentlundgren/Bjerred-medlemmar/tree/main) |

---

Ett webbaserat medlemshanteringssystem för Bjerred, utvecklat med vanilla JavaScript, HTML och CSS.

## 📋 Beskrivning

Detta projekt är ett komplett system för att hantera och visualisera medlemsdata. Det inkluderar:

- **Medlemsöversikt** - Visa alla aktiva medlemmar
- **Statistik och grafer** - Visualisering av medlemsutveckling över tid
- **Datahantering** - Import och export av medlemsdata i olika format (JSON, CSV, Markdown)
- **Responsiv design** - Fungerar på desktop, tablet och mobil

## 🚀 Funktioner

### Huvudfunktioner
- ✅ Visa aktiva medlemmar med detaljerad information
- ✅ Sök och filtrera medlemmar
- ✅ Statistik över medlemsutveckling
- ✅ Grafer för visuell representation
- ✅ Export av data till olika format
- ✅ Responsiv design för alla enheter

### Dataformat som stöds
- JSON (medlemsdata.json)
- CSV (medlemsdata_rå.csv)
- Markdown (md_komplett_251226.md, md_summary_251226.md)

## 📁 Projektstruktur

```
medlemmar/
│
├── index.html              # Huvudfil med all funktionalitet
├── medlemmar.html          # Alternativ vy för medlemmar
├── dataformat.html         # Information om dataformat
├── privatadata.html        # Hantering av privat data
│
├── data/                   # Datamapp
│   ├── md_251226.json     # Medlemsdata i JSON-format
│   ├── md_komplett_251226.md
│   └── md_summary_251226.md
│
├── medlemsdata.json        # Huvuddatafil
├── medlemsdata_rå.csv      # Rådata i CSV-format
├── nyamedlemmar.js         # JavaScript för nya medlemmar
│
├── .gitignore              # Git ignore-fil
├── README.md               # Denna fil
└── GitHub.html             # Guide för Git och GitHub
```

## 🛠️ Installation och användning

### Förutsättningar
- En modern webbläsare (Chrome, Firefox, Safari, Edge)
- Ingen server krävs - projektet körs lokalt i webbläsaren

### Steg för att komma igång

1. **Klona repositoryt:**
   ```bash
   git clone https://github.com/kentlundgren/bjerred-medlemmar.git
   ```

2. **Navigera till projektmappen:**
   ```bash
   cd bjerred-medlemmar
   ```

3. **Öppna i webbläsare:**
   - Dubbelklicka på `index.html`, eller
   - Högerklicka och välj "Öppna med" → din webbläsare

### Alternativ: Använd en lokal server

För bästa resultat (särskilt om du arbetar med externa datafiler):

```bash
# Med Python 3
python -m http.server 8000

# Med Node.js (om du har http-server installerat)
npx http-server

# Med PHP
php -S localhost:8000
```

Öppna sedan `http://localhost:8000` i din webbläsare.

## 📊 Datahantering

### Uppdatera medlemsdata

Medlemsdata lagras i flera format:

1. **JSON-format** (`medlemsdata.json`):
   ```json
   {
     "medlemsnummer": "001",
     "namn": "Namn Efternamn",
     "datum": "2024-01-15",
     "status": "aktiv"
   }
   ```

2. **CSV-format** (`medlemsdata_rå.csv`):
   ```csv
   medlemsnummer,namn,datum,status
   001,Namn Efternamn,2024-01-15,aktiv
   ```

### Importera ny data

1. Uppdatera relevant datafil (JSON eller CSV)
2. Ladda om sidan i webbläsaren
3. Data uppdateras automatiskt

## 🎨 Anpassning

### Ändra färger och stil

Alla stilar finns inline i HTML-filerna. Sök efter `<style>`-taggen för att anpassa:

- Färger
- Typsnitt
- Layout
- Responsiva brytpunkter

### Lägga till nya funktioner

Projektets JavaScript-kod är väl kommenterad. Sök efter kommentarer som:
```javascript
// UPPDATERING: Här skedde en ändring...
```

## 📈 Statistik och grafer

Projektet använder följande för visualisering:
- Bilder för grafer (genererade externt)
- Dynamiska tabeller
- Responsiva layouter

Graferna finns som bildfiler:
- `aktiva_medlemmar_251223.jpg`
- `ackumulerad_utveckling_2025_tom_251223.jpg`

## 🤝 Bidra till projektet

Vill du bidra? Fantastiskt! Här är hur:

1. Forka projektet
2. Skapa en ny branch (`git checkout -b feature/ny-funktion`)
3. Gör dina ändringar
4. Committa (`git commit -m 'Lagt till ny funktion'`)
5. Pusha till din branch (`git push origin feature/ny-funktion`)
6. Öppna en Pull Request

## 📊 Aktuell statistik (maj 2026)

| Typ | Antal |
|-----|-------|
| Familjemedlemskap | 446 |
| Enskilda medlemskap | 884 |
| **Totalt** | **1 330** |
| Netto nya efter bastuöppning (juli 2025) | 773 |

Källa för 2026-data: [Wondr Subscribers/Count2](https://bjerredssaltsjobad.wondr.se/w_report/reports/report/Subscribers/Count2) *(kräver inloggning)*

## 📝 Versionshistorik

- **v3.0** (28 maj 2026)
  - Lagt till månadsdata för jan–maj 2026
  - Nytt tidsfilter "År 2026" (satt som standard)
  - Y-axeln hanterar nu negativa nettoförändringar
  - Statistikkort uppdaterade med maj 2026-värden
  - Länk till Wondr-rapporten tillagd i fotnoten
  - Lokal mapp återkopplad till GitHub-repo (git init + merge + push)

- **v2.1** (23 december 2025)
  - Exkluderat "Registrering av familjemedlemmar" från statistiken
  - Uppdaterad fotnot med förklaring av exkluderade kategorier

- **v2.0** (23 december 2025)
  - Lagt till total-linje i ackumulerat diagram
  - Ökat diagramhöjden för bättre läsbarhet
  - Förbättrad responsiv design

- **v1.0** (5 januari 2025)
  - Initial release
  - Grundläggande medlemshantering
  - Statistik och visualisering
  - Export till olika format

## 🐛 Kända problem

Inga kända problem för tillfället. Rapportera gärna om du hittar något!

## 📄 Licens

Detta projekt är öppen källkod och tillgängligt under MIT-licensen.

## 👤 Författare

**Kent Lundgren**
- GitHub: [@kentlundgren](https://github.com/kentlundgren)
- Email: lundgren.kent@gmail.com
- Plats: Lund, Sverige

## 🙏 Tack till

- Bjerred-gemenskapen
- Alla som bidragit med feedback

## 📚 Dokumentation

För mer detaljerad information om Git och GitHub-användning, se:
- [GitHub.html](GitHub.html) - Komplett guide för Git och GitHub

## 🔗 Länkar

- [Projektets hemsida](https://kentlundgren.se)
- [GitHub Repository](https://github.com/kentlundgren/Bjerred-medlemmar)
- [Rapportera problem](https://github.com/kentlundgren/Bjerred-medlemmar/issues)

---

**Skapad med ❤️ i Lund, Sverige**
