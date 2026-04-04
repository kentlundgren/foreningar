# Regelöversikt – KalmarNation/revision

Regler och instruktioner för detta projekt finns på **tre nivåer**. Se även blogginlägget
[Tre nivåer av "så här gör vi"](https://controllerutangranser.wordpress.com/2026/04/03/tre-nivaer-av-sa-har-gor-vi-nar-ai-far-husregler-projektregler-och-en-hel-revisionsmanual/)
för en förklaring av varför tre nivåer.

| Nivå | Plats | Svarar på frågan |
| --- | --- | --- |
| **1. Globala regler** | `ClaudeCowork/.cursor/rules/` | Hur jobbar vi i verktyget – oavsett projekt? |
| **2. Lokala projektregler** | `KalmarNation/revision/.cursor/rules/` | Vad gäller specifikt för just detta projekt? |
| **3. Revisionsinstruktion** | `CLAUDE.md` (i projektmappen) | Hur genomförs och förklaras revisionen i sak? |

---

## Nivå 1 – Globala regler (`ClaudeCowork/.cursor/rules/`)

Gäller alla projekt automatiskt när **ClaudeCowork** är workspace-rot.

| Fil | Beskrivning |
| --- | --- |
| `encoding-utf8.mdc` | Alla filer sparas i UTF-8. Filer med svenska tecken (å, ä, ö) skapas via PowerShell – aldrig via Write- eller StrReplace-verktyget. |
| `version-dating.mdc` | Versionsnummer ska alltid ha exakt datum i formatet ÅÅÅÅ-MM-DD, aldrig bara månad. |
| `git-workflow.mdc` | Commit och push görs alltid av användaren. AI föreslår men agerar inte utan godkännande. |
| `rules-overview.mdc` | RULES-OVERVIEW.md ska alltid finnas lokalt i varje projekt och hållas aktuell när regler läggs till eller ändras. |
| `session-handover.mdc` | Påminn AI att varna när sessionen bör bytas och föreslå startprompt för ny session. |
| `github-pages-live-link.mdc` | GitHub Pages-sajter: `index.html` ska länka till repot; README ska länka till live. Lokala filer anger URL:er per projekt. |

---

## Nivå 2 – Lokala projektregler (`KalmarNation/revision/.cursor/rules/`)

Gäller bara detta projekt. Ingen kopia av globala regler – enbart det som är Kalmar Nation-specifikt.

| Fil | Beskrivning |
| --- | --- |
| `sv-eng-sync.mdc` | Varje ändring i en svensk HTML-fil speglas omedelbart i motsvarande engelsk fil. |
| `github-pages-live-link.mdc` | KalmarNation/revision: konkreta Pages- och repo-URL:er samt HTML-/README-exempel (bygger på global regel). |
| `claude-md-updates.mdc` | CLAUDE.md: nya principer föreslås alltid först; versionsnummer och datum (ÅÅÅÅ-MM-DD) ska synkas överst och längst ner i filen. |

---

## Nivå 3 – Revisionsinstruktion (`CLAUDE.md`)

[`CLAUDE.md`](CLAUDE.md) är inte en Cursor-regel utan en **metodinstruktion**: vad som ska
granskas, hur begrepp förklaras, vilka risker som är typiska för små föreningar och hur
revisionsberättelsen ska utformas. Det är det skriftliga ramverk AI-assistenten lutar sig
mot under hela revisionsarbetet.

Nivå 3 svarar inte på "hur klickar vi i Cursor" utan på "hur genomförs revisionen rätt" –
och kan på sikt användas som mall för revision av liknande organisationer.

---

## Viktigt om workspace

Om du i stället öppnar **endast** mappen `KalmarNation/revision` som egen workspace-rot
(utan förälderknappen ClaudeCowork) laddas inte de globala reglerna automatiskt.
Rekommendation: öppna hela **ClaudeCowork** som workspace så gäller samma globala regler överallt.

---

## Senast uppdaterad: 2026-04-03