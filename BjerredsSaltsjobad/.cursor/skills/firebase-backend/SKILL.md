---
name: firebase-backend
description: >
  Set up Firebase backend for static web apps (GitHub Pages, HTML+CDN).
  Covers Realtime Database and Firestore, Auth, security rules, read/write
  patterns, migration, and CSP. Use when Kent asks to connect an app to
  Firebase, create a database backend, or integrate read/write with login.
created: 2026-06-23
updated: 2026-06-23
---

# Firebase backend – setup för statiska webbappar

Generell procedur för att koppla HTML/JavaScript-appar till Firebase.
Extraherad från Bjerreds Saltsjöbad (inpasseringar) och generaliserad för nya projekt.

**Detaljerade kodmallar:**
- Realtime Database → [reference-rtdb.md](reference-rtdb.md)
- Firestore → [reference-firestore.md](reference-firestore.md)

**Kompletterande skill (Bjerred-specifik):** `bjerred-firebase-sync` – månadssynk BASE_DATA mot Firebase, inte setup.

---

## När skillen ska användas

- Ny webbapp ska få persistent data (backend/databas)
- Befintlig app med hårdkodad data ska flyttas till Firebase
- Läsning i realtid + valfri inloggning för skrivning
- Publicering på GitHub Pages (statisk HTML, CDN, ingen build)
- Kent frågar om Firebase-koppling, databas-backend eller Auth

---

## Första frågan: Realtime Database eller Firestore?

| Egenskap | Realtime Database (RTDB) | Firestore |
|---|---|---|
| Lagring | Ett JSON-träd (nod/nod/värde) | Samlingar → dokument → fält |
| Passar för | Tabelldata, enkla strukturer, realtidssynk | Dokument med relationer, queries, subcollections |
| SDK (rekommenderat) | v11 ES-moduler + `databaseURL` | v11 ES-moduler (`getFirestore`) |
| Läslyssnare | `onValue(ref(db, path), …)` | `onSnapshot(doc(…), …)` |
| Skrivning | `set(ref(db, path), value)` | `setDoc` / `updateDoc` |

**Beslut:**

1. Ser datan ut som ett JavaScript-objekt / tabell (`data[år][kategori][index]`) → **RTDB**
2. Är varje post ett dokument med flera fält, ev. subcollections → **Firestore**
3. Osäker + enkel struktur → börja med **RTDB**

**Referensexempel i detta repo (RTDB):**
- [inpasseringar/databas.html](../../inpasseringar/databas.html) – 8-stegs-checklista, teori
- [inpasseringar/data.html](../../inpasseringar/data.html) – read/write + Auth
- [inpasseringar/index.html](../../inpasseringar/index.html) – read-only + fallback

**Firestore-referens (externt):** [Bjerred-skylt](https://github.com/kentlundgren/Bjerred-skylt) – regler, röster, förslag

---

## 8-stegs-checklista (generell)

Följ i ordning. Markera klart i Firebase Console innan frontend-kod skrivs.

| # | Uppgift | RTDB | Firestore |
|---|---|---|---|
| 1 | Skapa eller välj Firebase-projekt | Console → Add project | Samma |
| 2 | Hämta `firebaseConfig` (Project settings → Web app) | Inkl. `databaseURL` efter steg 3 | `databaseURL` behövs inte |
| 3 | Aktivera databas + välj region (t.ex. europe-west1) | Realtime Database | Firestore Database |
| 4 | Publicera säkerhetsregler | `.read` / `.write` per rot-nod | `match /collection/{id}` |
| 5 | Aktivera Authentication (E-post/lösenord) + skapa admin-användare | Samma | Samma |
| 6 | Engångsmigration av befintlig data | Konsol-skript med `set()` | Batch `setDoc` eller import |
| 7 | Frontend: `<script type="module">` + SDK | Se reference-rtdb.md | Se reference-firestore.md |
| 8 | Test: localhost + GitHub Pages + Authorized domains | Authentication → Settings → Authorized domains | Samma |

**Steg 4 – standardmönster (Kent):** alla kan läsa, bara inloggade skriver (`auth != null`).

**Steg 8 – Authorized domains (lägg till båda):**
- `localhost`
- Publiceringsdomän (t.ex. `kentlundgren.github.io`)

---

## Gemensamma mönster (alla Firebase-projekt)

### Statisk HTML + CDN

- Ingen npm/build – importera SDK från `https://www.gstatic.com/firebasejs/VERSION/…`
- Använd `<script type="module">` för Firebase JS SDK v11+
- Separera HTML, CSS, JS enligt Kents konvention när ny app skapas

### Initiera utan dubbel-start

```javascript
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
```

### Dubbel datalagring (rekommenderat mönster)

1. **LOCAL_DATA / BASE_DATA** – hårdkodad fallback i HTML (fungerar offline)
2. **Firebase** – live-källa när nätverk finns
3. Vid sidladdning: visa LOCAL_DATA direkt
4. När Firebase svarar: merge eller ersätt + uppdatera statusindikator (grön/orange prick)
5. Timeout (t.ex. 5 s) → visa orange "Lokal backup"-badge

### Auth-flöde för skrivning

1. `onAuthStateChanged` – håll reda på `currentUser`
2. Läsning utan inloggning (om rules tillåter)
3. Vid cell/redigering utan auth → visa inloggningsmodal, spara "väntande" operation
4. Efter login → slutför väntande skrivning

### Content Security Policy (GitHub Pages)

Lägg CSP i `<head>` som tillåter Firebase WebSocket + Auth:

```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self';
               script-src 'self' 'unsafe-inline' https://www.gstatic.com;
               connect-src 'self'
                           https://*.firebasedatabase.app
                           wss://*.firebasedatabase.app
                           https://*.googleapis.com
                           https://identitytoolkit.googleapis.com
                           https://securetoken.googleapis.com
                           https://firestore.googleapis.com;
               style-src 'self' 'unsafe-inline';">
```

Anpassa `connect-src` – RTDB behöver `firebasedatabase.app`, Firestore behöver `firestore.googleapis.com`.

### Secrets och config

- `firebaseConfig` (apiKey m.m.) är **inte** hemlig i klientappar – men fyll i per projekt från Console
- **Lösenord** ska aldrig committas – migration körs i konsol med manuellt ifyllt lösenord
- Använd platshållare i mallar: `{projectId}`, `{databaseURL}`, `{projectRoot}`

### UTF-8

Filer med svenska tecken (å, ä, ö) skapas via PowerShell `UTF8Encoding(false)`, inte Write-verktyget.

---

## Arbetsflöde för Claude

1. Klargör datamodell → välj RTDB eller Firestore (tabell ovan)
2. Gå igenom 8-stegs-checklistan med Kent
3. Implementera frontend enligt rätt reference-fil
4. Skapa/ev. uppdatera `databas.html`-liknande arbetsdokument i projektet (valfritt men rekommenderat)
5. Testa read på localhost, write efter login, live-synk mellan två webbläsare
6. Påminn Kent om Authorized domains innan GitHub Pages-test

---

## Växla upp till global skill

När skillen är testad och godkänd lokalt:

```powershell
Copy-Item -Recurse `
  "C:\Users\kentl\OneDrive\AI\Claude\ClaudeCowork\BjerredsSaltsjobad\.cursor\skills\firebase-backend" `
  "$env:USERPROFILE\.cursor\skills\firebase-backend"
```

Efter kopiering:
- Kontrollera att inga projekt-specifika API-nycklar finns kvar i mallarna
- Uppdatera personlig skills-lista i RULES-OVERVIEW (rot ClaudeCowork eller per projekt)
- Skillen blir tillgänglig i alla Cursor-projekt

---

## Referens i Bjerreds Saltsjöbad

| Fil | Roll |
|---|---|
| `inpasseringar/databas.html` | Levande loggbok, 8 steg, RTDB vs Firestore, migrationsskript |
| `inpasseringar/data.html` | Produktion: tabell, Auth, `onValue`, `set`, merge |
| `inpasseringar/index.html` | Read-only diagram, fallback-timer |
| `.cursor/skills/bjerred-firebase-sync/` | Månadssynk – inte setup |