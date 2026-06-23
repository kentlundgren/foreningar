> [!NOTE]
> **Global och forbattrad version finns.**
> Den 2026-06-24 skapades ett komplett, globalt firebase-backend-paket med Storage, invoice-example och starkare regler.
> Global sokvag: `C:\Users\kentl\.cursor\skills\firebase-backend\`
> Paketet innehaller: SKILL.md, reference-rtdb.md, reference-firestore.md, reference-storage.md (NY), invoice-analysis-example.md (NY).
> Anvand den globala versionen for nya projekt. Denna lokala fil ar aldre och saknar Storage-referensen.
# Firestore – kodmallar och mönster

*Skapad: 2026-06-23 · Senast uppdaterad: 2026-06-23*

Platshållare:

| Platshållare | Exempel |
|---|---|
| `{collection}` | `regler` |
| `{sdkVersion}` | `11.0.0` |
| `{projectId}` | `mitt-projekt-id` |

**Extern referensimplementation:** [Bjerred-skylt](https://github.com/kentlundgren/Bjerred-skylt) (Firestore, compat SDK v10.7 i produktion).
**Teori och jämförelse RTDB vs Firestore:** `BjerredsSaltsjobad/inpasseringar/databas.html`.

---

## 1. När Firestore är rätt val

Välj Firestore när:

- Varje post är ett **dokument** med flera fält (textSv, textEn, votes, …)
- Data har **relationer** (regel → röster → användarförslag)
- Du behöver lyssna på **enskilda dokument** (effektivare än hela trädet)
- Du behöver **queries** (filtrera, sortera, paginera)

Välj **inte** Firestore när datan redan är ett enkelt JSON-träd/tabell – då är RTDB enklare (se [reference-rtdb.md](reference-rtdb.md)).

**Exempel (Bjerred-skylt):** varje basturegel = ett dokument med fält och subcollections för förslag.

---

## 2. Datamodell – Firestore vs RTDB

| RTDB | Firestore |
|---|---|
| `{dataPath}/2026/Kategori/3 = 90` | `collection("data").doc("2026-kategori").set({ m3: 90 })` |
| Ett stort JSON-träd | Samlingar → dokument → fält |
| `onValue` på hel nod | `onSnapshot` på doc eller query |

Firestore-struktur (exempel regler):

```
regler (collection)
  regel-01 (document)
    textSv: "..."
    textEn: "..."
    votes: { up: 12, down: 3 }
    suggestions (subcollection)
      sugg-abc (document)
        text: "..."
        author: "..."
```

---

## 3. SDK-val

| Variant | När | Import |
|---|---|---|
| **v11 ES-moduler** (rekommenderat för ny kod) | Nya projekt, `<script type="module">` | `firebase-firestore.js` från gstatic |
| **compat v10.x** (legacy) | Befintlig Bjerred-skylt | `<script>`-taggar, `firebase.firestore()` |

Ny implementation ska använda v11 ES-moduler om möjligt.

---

## 4. SDK-import och init (v11)

```html
<script type="module">
  import { initializeApp, getApps }
    from 'https://www.gstatic.com/firebasejs/{sdkVersion}/firebase-app.js';

  import { getFirestore, doc, setDoc, updateDoc, onSnapshot, collection, getDocs }
    from 'https://www.gstatic.com/firebasejs/{sdkVersion}/firebase-firestore.js';

  import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged }
    from 'https://www.gstatic.com/firebasejs/{sdkVersion}/firebase-auth.js';

  const firebaseConfig = {
    apiKey:            "DIN_API_KEY",
    authDomain:        "{projectId}.firebaseapp.com",
    projectId:         "{projectId}",
    storageBucket:     "{projectId}.firebasestorage.app",
    messagingSenderId: "SENDER_ID",
    appId:             "1:SENDER_ID:web:APP_ID"
    // databaseURL behövs INTE för Firestore
  };

  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  const db  = getFirestore(app);
  const auth = getAuth(app);
```

---

## 5. Säkerhetsregler

Firebase Console → Firestore Database → Rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /{collection}/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // Striktare per collection (rekommenderat i produktion):
    // match /regler/{regelId} {
    //   allow read: if true;
    //   allow write: if request.auth != null;
    // }
  }
}
```

Anpassa `match`-block per samling. Testa rules i Console → Rules playground innan publish.

---

## 6. Läsning – onSnapshot

Motsvarar RTDB:s `onValue` men på dokument- eller query-nivå:

```javascript
let currentUser = null;
let unsubscribe = null;

onAuthStateChanged(auth, (user) => {
  currentUser = user;
});

function lyssnaPaRegel(regelId, onData, onError) {
  if (unsubscribe) unsubscribe();

  const docRef = doc(db, '{collection}', regelId);

  unsubscribe = onSnapshot(
    docRef,
    (snapshot) => {
      if (snapshot.exists()) {
        onData(snapshot.data());
      } else {
        onData(null);
      }
    },
    (error) => {
      if (onError) onError(error);
    }
  );
}

// Lyssna på hela collection (enklare, mindre effektivt):
function lyssnaPaAlla(onList) {
  const colRef = collection(db, '{collection}');
  return onSnapshot(colRef, (snapshot) => {
    const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    onList(items);
  });
}
```

**Fallback-mönster:** visa lokal `LOCAL_DATA` direkt; uppdatera UI när första snapshot kommer; timeout om offline.

---

## 7. Skrivning – setDoc / updateDoc

```javascript
async function sparaRegel(regelId, data) {
  if (!currentUser) {
    visaInloggningsmodal(() => sparaRegel(regelId, data));
    return;
  }

  const docRef = doc(db, '{collection}', regelId);
  await setDoc(docRef, data, { merge: true });
}

async function uppdateraRost(regelId, fält, delta) {
  if (!currentUser) return;

  const docRef = doc(db, '{collection}', regelId);
  // merge: true – skriv bara ändrade fält
  await updateDoc(docRef, {
    [`votes.${fält}`]: increment(delta)  // kräver import av increment från firestore
  });
}
```

För `increment`: `import { increment } from '.../firebase-firestore.js'`.

---

## 8. Engångsmigration

```javascript
(async () => {
  const { getAuth, signInWithEmailAndPassword } =
    await import('https://www.gstatic.com/firebasejs/{sdkVersion}/firebase-auth.js');
  await signInWithEmailAndPassword(getAuth(), 'admin@example.com', 'LÖSENORD');

  const { getFirestore, doc, setDoc } =
    await import('https://www.gstatic.com/firebasejs/{sdkVersion}/firebase-firestore.js');
  const db = getFirestore();

  for (const post of LOCAL_DATA) {
    await setDoc(doc(db, '{collection}', post.id), post);
    console.log('OK', post.id);
  }
  console.log('Migration klar');
})();
```

Alternativ: Firebase Console → Firestore → Import (JSON/CSV) för stora dataset.

---

## 9. CSP för Firestore (GitHub Pages)

Lägg till i `connect-src`:

```
https://firestore.googleapis.com
https://*.googleapis.com
https://identitytoolkit.googleapis.com
https://securetoken.googleapis.com
```

RTDB-domäner (`firebasedatabase.app`) behövs inte om projektet bara använder Firestore.

---

## 10. Legacy: compat SDK (v10.x)

Bjerred-skylt använder äldre mönster:

```html
<script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-auth-compat.js"></script>
<script>
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
</script>
```

**Vid ny kod:** migrera till v11 ES-moduler. Compat fungerar men är tyngre och äldre API.

---

## 11. RTDB och Firestore i samma projekt

Firebase-projekt kan ha **båda** parallellt (t.ex. projekt "skylt"):
- Firestore → Bjerred-skylt (regler)
- RTDB → inpasseringsstatistik (separata rot-noder)

De stör inte varandra. Välj rätt SDK-modul per databastyp.

---

## 12. Vanliga fallgropar

| Problem | Lösning |
|---|---|
| Permission denied | Rules + Auth domain + inloggning |
| Snapshot tom trots data | Fel collection/doc-id |
| Hel lista laddas om ofta | Lyssna på enskilda docs istället för hel collection |
| Compat vs modular blandat | Använd en variant per sida |
| Query kräver index | Följ länk i konsolfel → skapa composite index |