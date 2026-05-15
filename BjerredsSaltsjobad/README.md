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
└── inpasseringar/           ← Inpasseringsstatistik
    ├── index.html           ← Webbapp med diagram och månadsvis statistik (Chart.js)
    ├── data.html            ← Redigerbar datatabell kopplad till Firebase Realtime Database
    └── databas.html         ← Arbetsdokument: Firebase-checklista, config, migrationsskript
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

Det här är hela poängen med Firebase-backenden: **flera personer på olika enheter och platser kan uppdatera data direkt i webbläsaren** – utan att behöva installera någon app eller ha tillgång till källkoden. En inpasseringsansvarig kan lägga in månadens siffror från sin mobil, en annan från sin dator, och alla ser ändringarna direkt.

- Excel-liknande tabellvy med inline-redigering per cell
- Data läses från **Firebase Realtime Database** via `onValue()` – uppdateras live för alla öppna flikar
- Skrivning kräver inloggning (Firebase Authentication, e-post/lösenord)
- Inloggningsmodal öppnas automatiskt när en icke-inloggad användare klickar på en cell
- Länken "Glömt lösenordet?" i inloggningsrutan skickar ett återställningsmail – nya användare kan sätta sitt eget lösenord utan hjälp av administratören
- `BASE_DATA` (hårdkodad) används som fallback om Firebase inte kan nås
- Grön statusdot i headern visar att Firebase-anslutning är aktiv

**Bjuda in nya användare:**
Administratören klickar på knappen **✉ Bjud in** längst ned till vänster på sidan, fyller i namn och e-postadress, och får ett färdigt välkomstbrev att kopiera och skicka. Nya användare registreras i Firebase Console (Authentication → Users → Add user).

### Viktig datakontext

- **2024**: Komplett helårsdata (tre kategorier)
- **2025**: Bastun stängd för ombyggnad mitten februari – mitten juli → 0-värden i mars–juni är korrekta
- **2025**: Nytt system **Wondr** lanserades juli 2025 → ny kategori från jul 2025
- **2026**: Armband fasades ut 1 februari 2026
- **2026 april**: Restaurangen och Armband saknas (null) – väntar på indata

---

## Firebase-backend

Inpasseringsdata lagras i **Firebase Realtime Database** (projekt: `skylt-e0c45`, region: europe-west1).

```javascript
const firebaseConfig = {
  apiKey:            "AIzaSyBbAX6EFxbW1VIcSYQ3Zqbr3v733sGMYD8",
  authDomain:        "skylt-e0c45.firebaseapp.com",
  databaseURL:       "https://skylt-e0c45-default-rtdb.europe-west1.firebasedatabase.app"
};
```

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

## Senast uppdaterad: 2026-05-15
