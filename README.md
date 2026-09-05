# foreningar

Samlingsrepo för Kent Lundgrens föreningsrelaterade webbprojekt – varje undermapp
är ett eget, fristående projekt (egen `CLAUDE.md`, egen `index.html`, egen
GitHub Pages-yta där så är aktuellt).

---

## 🗂️ Lokalt repo

Repo-rot lokalt:

`C:\Users\kentl\OneDrive\AI\Claude\ClaudeCowork`

På GitHub:

`https://github.com/kentlundgren/foreningar`

⚠️ **Observera namnbytet:** lokalt heter mappen `ClaudeCowork`, på GitHub heter
repot `foreningar`. Det är **samma repo** – bara olika namn på de två sidorna
av kopplingen. (`git remote -v` i mappen bekräftar detta.) Inget nästlat
git-repo här – `ClaudeCowork` är den enda `.git`-roten, alla undermappar nedan
delar samma historik och pushas tillsammans.

---

## Projekt i detta repo

| Mapp | Lokal sökväg | GitHub | Live-sida | Beskrivning |
|------|-------------|--------|-----------|-------------|
| [BjerredsSaltsjobad](BjerredsSaltsjobad/) | `...\ClaudeCowork\BjerredsSaltsjobad` | [tree/main/BjerredsSaltsjobad](https://github.com/kentlundgren/foreningar/tree/main/BjerredsSaltsjobad) | [Live](https://kentlundgren.github.io/foreningar/BjerredsSaltsjobad/) | Entréskylt, inpasseringsstatistik och medlemsstatistik för Bjerreds Saltsjöbad (kallbadhus/bastu, Bjärred) |
| [Revision](Revision/) | `...\ClaudeCowork\Revision` | [tree/main/Revision](https://github.com/kentlundgren/foreningar/tree/main/Revision) | [Live](https://kentlundgren.github.io/foreningar/Revision/) | Revisionsverktyg för ideella organisationer – AI-föranalys + betald revision |
| [AI_test](AI_test/) | `...\ClaudeCowork\AI_test` | [tree/main/AI_test](https://github.com/kentlundgren/foreningar/tree/main/AI_test) | [Live](https://kentlundgren.github.io/foreningar/AI_test/) | AI Rundabordssamtal (AIpodd) – simulerat samtal mellan Claude, ChatGPT, Gemini och Grok |
| [KalmarNation](KalmarNation/) | `...\ClaudeCowork\KalmarNation` | [tree/main/KalmarNation](https://github.com/kentlundgren/foreningar/tree/main/KalmarNation) | [revision-delen](https://kentlundgren.github.io/foreningar/KalmarNation/revision/) | Innehåller `KNV/` och `revision/` – ingen egen toppsida ännu, se undermapparnas egna README |
| [SK](SK/) | `...\ClaudeCowork\SK` | [tree/main/SK](https://github.com/kentlundgren/foreningar/tree/main/SK) | – | Innehåller `Bokslut/` (egen [README](SK/Bokslut/README.md)) och `Kassor/` |
| [LNF](LNF/) | `...\ClaudeCowork\LNF` | [tree/main/LNF](https://github.com/kentlundgren/foreningar/tree/main/LNF) | – | Innehåller `Maxima/` – ingen beskrivning/README på toppnivå ännu |
| [tools](tools/) | `...\ClaudeCowork\tools` | [tree/main/tools](https://github.com/kentlundgren/foreningar/tree/main/tools) | – | Delade skript/verktyg |

*Mappar utan egen live-sida eller README markerade ovan – bra kandidater att
komplettera nästa gång de mappen redigeras.*

---

## Konvention: "🗂️ Lokalt repo" i varje README

> **För Claude:** Varje gång en ny projektmapp eller README skapas i detta
> repo (eller i något av Kents andra Git/GitHub-kopplade repon), inkludera
> ett stycke enligt mallen nedan – direkt efter titeln, före övrigt innehåll.
> Syftet är att Kent alltid ska kunna se, direkt i README:n, exakt var filerna
> ligger lokalt, utan att behöva leta i filsystemet.

**Mall (repo-rot):**
```markdown
## 🗂️ Lokalt repo

Repo-rot lokalt:

`<lokal sökväg till repo-roten>`

På GitHub:

`https://github.com/kentlundgren/<repo>`
```

**Mall (undermapp/delprojekt i ett repo):**
```markdown
## 🗂️ Lokalt repo

Repo-rot lokalt:

`<lokal sökväg till repo-roten>`

Den här mappen lokalt:

`<lokal sökväg till denna undermapp>`

På GitHub: <https://github.com/kentlundgren/<repo>/tree/main/<undermapp>>
```

Lägg **bara** till en ⚠️-varning om mappen faktiskt ligger i ett nästlat
git-repo (dvs. har sin egen `.git` inuti en mapp som också är ett repo) – det
är undantaget, inte normalläget. I det vanliga fallet (en mapp/undermapp i
**ett** repo, som här) räcker sökvägarna ovan.

---

## Git-hantering

**Kent commitar och pushar alltid själv**, via Cursor – Claude Code/Cowork
gör aldrig detta utan uttrycklig begäran (se `CLAUDE.md` i denna mapp och i
`AI\Claude`-roten).

```powershell
cd "C:\Users\kentl\OneDrive\AI\Claude\ClaudeCowork"
git add .
git commit -m "Lägg till root-README för foreningar-repot"
git push
```
