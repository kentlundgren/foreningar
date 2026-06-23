# Realtime Database – kodmallar och mönster

Platshållare att ersätta per projekt:

| Platshållare | Exempel |
|---|---|
| `{projectRoot}` | `mitt-projekt` |
| `{dataPath}` | `{projectRoot}/data` |
| `{sdkVersion}` | `11.0.0` |
| `{databaseURL}` | `https://PROJEKT-id-default-rtdb.europe-west1.firebasedatabase.app` |

Kanonisk implementation: `BjerredsSaltsjobad/inpasseringar/data.html` och `index.html`.

---

## 1. SDK-import (v11, ES-moduler)

```html
<script type="module">
  import { initializeApp, getApps }
    from 'https://www.gstatic.com/firebasejs/{sdkVersion}/firebase-app.js';

  import { getDatabase, ref, onValue, set, get }
    from 'https://www.gstatic.com/firebasejs/{sdkVersion}/firebase-database.js';

  import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged }
    from 'https://www.gstatic.com/firebasejs/{sdkVersion}/firebase-auth.js';
```

Skrivbehörighet kräver auth-import. Read-only-appar kan utelämna auth-modulen.

---

## 2. firebaseConfig

Hämta från Firebase Console → Project settings → Your apps → Web app.

**OBS:** `databaseURL` krävs för RTDB – den finns först efter att Realtime Database aktiverats (steg 3).

```javascript
const firebaseConfig = {
  apiKey:            "DIN_API_KEY",
  authDomain:        "PROJEKT-id.firebaseapp.com",
  projectId:         "PROJEKT-id",
  storageBucket:     "PROJEKT-id.firebasestorage.app",
  messagingSenderId: "SENDER_ID",
  appId:             "1:SENDER_ID:web:APP_ID",
  databaseURL:       "{databaseURL}"
};

const app  = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db   = getDatabase(app);
const auth = getAuth(app);
```

---

## 3. Datastruktur i Firebase

RTDB lagrar JSON-träd. Speglar ofta lokalt `BASE_DATA`:

```
{dataPath}/
  2026/
    Kategori-namn/
      0: 643    ← månadsindex 0 = jan
      1: 665
    Restaurangen/
      badbiljetter/   ← snedstreck i nyckel = nästlade noder
        3: 359
  senast-uppdaterad: "2026-06-23"
```

**Snedstreck i kategorinamn:** `"Restaurangen/badbiljetter"` lagras som `Restaurangen → badbiljetter`, inte som ett platt nyckelnamn. Sökväg vid skrivning:

```javascript
const sökväg = `{dataPath}/${year}/${category}/${monthIndex}`;
await set(ref(db, sökväg), value);
```

Firebase lagrar inte JavaScript `null` – använd strängen `'null'` och tolka tillbaka vid läsning.

---

## 4. Säkerhetsregler

Firebase Console → Realtime Database → Rules:

```json
{
  "rules": {
    "{projectRoot}": {
      ".read": "true",
      ".write": "auth != null"
    }
  }
}
```

Byt `{projectRoot}` till rot-noden för projektets data. Allt under noden ärver reglerna.

---

## 5. Läsning – onValue + fallback-timer

Mönster från `index.html` (read-only):

```javascript
let firebaseData = null;

const fallbackTimer = setTimeout(() => {
  visaFallback('Timeout – ingen respons inom 5 s');
}, 5000);

onValue(
  ref(db, '{dataPath}'),

  async (snapshot) => {
    clearTimeout(fallbackTimer);

    if (!snapshot.exists()) {
      visaFallback('Ingen data i Firebase');
      return;
    }

    firebaseData = tolkFirebaseSnapshot(snapshot);

    let senast = '';
    try {
      const tsSnap = await get(ref(db, '{projectRoot}/senast-uppdaterad'));
      senast = tsSnap.val() || '';
    } catch (e) { /* ignorera */ }

    applyFirebaseData(firebaseData, senast);
  },

  (error) => {
    clearTimeout(fallbackTimer);
    visaFallback(error.message);
  }
);
```

**Design:** Sidan renderar `BASE_DATA` direkt vid load. Firebase ersätter/mergar när svar kommer.

---

## 6. tolkFirebaseSnapshot() – generisk mall

Använder lokal `BASE_DATA` som mall (vilka nycklar som ska finnas):

```javascript
function tolkFirebaseSnapshot(snapshot) {
  if (!snapshot.exists()) return null;

  const råData = snapshot.val();
  const resultat = {};

  for (const [år, kategorier] of Object.entries(BASE_DATA)) {
    const yearStr = String(år);
    if (!råData[yearStr]) continue;

    resultat[yearStr] = {};

    for (const kategoriNamn of Object.keys(kategorier)) {
      const delar = kategoriNamn.split('/');
      let nod = råData[yearStr];
      let hittad = true;

      for (const del of delar) {
        if (nod && typeof nod === 'object' && del in nod) {
          nod = nod[del];
        } else {
          hittad = false;
          break;
        }
      }

      if (hittad && nod && typeof nod === 'object') {
        const månader = [];
        for (let m = 0; m < 12; m++) {
          const val = nod[m];
          if (val === undefined || val === null || val === 'null') {
            månader.push(null);
          } else {
            månader.push(Number(val));
          }
        }
        resultat[yearStr][kategoriNamn] = månader;
      }
    }

    if (Object.keys(resultat[yearStr]).length === 0) {
      delete resultat[yearStr];
    }
  }

  return Object.keys(resultat).length > 0 ? resultat : null;
}
```

---

## 7. Merge Firebase + BASE_DATA (per cell)

**Viktigt:** Merga månad för månad – ersätt inte hela arrayen. Annars försvinner BASE_DATA-värden när Firebase bara har delvis ifylld data.

```javascript
function loadData() {
  const data = JSON.parse(JSON.stringify(BASE_DATA));
  if (!firebaseData) return data;

  for (const [yearStr, kategorier] of Object.entries(firebaseData)) {
    const year = parseInt(yearStr, 10);
    if (!data[year]) data[year] = {};

    for (const [kategori, månader] of Object.entries(kategorier)) {
      if (!data[year][kategori]) {
        data[year][kategori] = månader;
      } else {
        for (let m = 0; m < 12; m++) {
          if (månader[m] !== null) {
            data[year][kategori][m] = månader[m];
          }
        }
      }
    }
  }
  return data;
}
```

---

## 8. Skrivning – set() med Auth

```javascript
let currentUser = null;

onAuthStateChanged(auth, (user) => {
  currentUser = user;
  uppdateraInloggningsstatus(user);
});

async function saveValue(year, category, monthIndex, value) {
  if (!currentUser) {
    visaInloggningsmodal({ year, category, monthIndex, value });
    return;
  }

  const sökväg = `{dataPath}/${year}/${category}/${monthIndex}`;
  await set(ref(db, sökväg), value);
  await set(
    ref(db, '{projectRoot}/senast-uppdaterad'),
    new Date().toLocaleDateString('sv-SE')
  );
}

async function clearValue(year, category, monthIndex) {
  const sökväg = `{dataPath}/${year}/${category}/${monthIndex}`;
  await set(ref(db, sökväg), 'null');
  await set(
    ref(db, '{projectRoot}/senast-uppdaterad'),
    new Date().toLocaleDateString('sv-SE')
  );
}
```

---

## 9. Engångsmigration (konsol)

Kör **en gång** på en sida som redan har Firebase SDK inläst. Logga in först (rules kräver auth för write).

```javascript
(async () => {
  const EPOST    = 'admin@example.com';
  const LÖSENORD = 'FYLL_IN_HÄR';  // aldrig committa

  const { getAuth, signInWithEmailAndPassword } =
    await import('https://www.gstatic.com/firebasejs/{sdkVersion}/firebase-auth.js');
  const auth = getAuth();
  await signInWithEmailAndPassword(auth, EPOST, LÖSENORD);

  const { getDatabase, ref, set } =
    await import('https://www.gstatic.com/firebasejs/{sdkVersion}/firebase-database.js');
  const db = getDatabase();

  for (const [år, kategorier] of Object.entries(BASE_DATA)) {
    for (const [kategori, månader] of Object.entries(kategorier)) {
      for (let m = 0; m < månader.length; m++) {
        const val = månader[m];
        if (val === null || val === undefined) continue;
        const sökväg = `{dataPath}/${år}/${kategori}/${m}`;
        await set(ref(db, sökväg), val);
        console.log('OK', sökväg, val);
      }
    }
  }

  await set(ref(db, '{projectRoot}/senast-uppdaterad'),
            new Date().toLocaleDateString('sv-SE'));
  console.log('Migration klar');
})();
```

---

## 10. REST API (felsökning, read-only)

Om `.read` är `true`:

```
GET {databaseURL}/{dataPath}.json
```

PowerShell:

```powershell
$url = "{databaseURL}/{dataPath}.json"
$fb = Invoke-RestMethod -Uri $url -TimeoutSec 20
```

Användbart för synk-kontroll utan att öppna webbläsare (se `bjerred-firebase-sync`-skillen).

---

## 11. Vanliga fallgropar

| Problem | Orsak | Lösning |
|---|---|---|
| Timeout på GitHub Pages | Authorized domain saknas | Lägg till domän i Firebase Auth |
| CSP blockerar Firebase | `connect-src` för snäv | Lägg till firebasedatabase.app + wss |
| Data försvinner vid reload | Hel array ersatt i merge | Per-cell-merge (avsnitt 7) |
| Kategori hittas inte | Snedstreck i nyckel | Traversera nästlade noder (avsnitt 6) |
| Skrivning nekad | Ej inloggad eller rules | `auth != null` + signIn |
| Dubbel Firebase-init | Flera script | `getApps().length`-check |