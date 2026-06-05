# RULES-OVERVIEW.md – Bjerreds Saltsjöbad

Register över alla regler och skills som gäller för detta projekt.
Uppdateras när regler eller skills tillkommer eller ändras.

---

## Globala regler (gäller ALLA projekt automatiskt)

Dessa regler finns i `ClaudeCowork/.cursor/rules/` och läses av Claude i varje projekt.

| Fil | Vad den gör |
|---|---|
| `version-dating.mdc` | Datum i versionsnoteringar ska alltid vara exakt ÅÅÅÅ-MM-DD |
| `github-pages-live-link.mdc` | Live-sida ska länka till repo; README ska länka till live-sida |
| `session-handover.mdc` | Claude varnar när sessionen bör bytas och föreslår startprompt |
| `git-workflow.mdc` | Claude committar/pushar aldrig utan explicit instruktion från Kent |
| `rules-overview.mdc` | Varje projekt ska ha en RULES-OVERVIEW.md (denna fil) |
| `encoding-utf8.mdc` | Alla filer sparas i UTF-8; filer med svenska tecken skapas via PowerShell |

---

## Lokala regler (gäller bara detta projekt)

Finns i `BjerredsSaltsjobad/.cursor/rules/` (om sådana skapas) eller beskrivna i CLAUDE.md.

*Inga separata .mdc-filer än – projektregler finns i CLAUDE.md.*

---

## Skills (procedurer för Claude)

Skills är återanvändbara instruktionsfiler som Claude läser när en specifik uppgift utförs.
De aktiveras automatiskt (om frågan matchar beskrivningen) eller explicit ("kör X-skillet").

### Personliga skills – gäller alla projekt

Plats: `C:\Users\kentl\.cursor\skills\`

| Mapp | Vad den gör | Aktiveras när du säger... |
|---|---|---|
| `bjerred-firebase-sync/` | Jämför BASE_DATA mot Firebase Realtime Database och rapporterar avvikelser. Uppdaterar data.html och index.html om något saknas. | "Kör månadssynken" / "Kontrollera Firebase-synken" |

### Projektskills – kopierade till detta projekt

Plats: `BjerredsSaltsjobad/.cursor/skills/`

| Mapp | Samma som personlig skill ovan |
|---|---|
| `bjerred-firebase-sync/` | Identisk kopia – syns i Cursor filträdet |

---

## Vad är skillnaden mellan CLAUDE.md, regler och skills?

| Verktyg | Läses | Passar för |
|---|---|---|
| **CLAUDE.md** | Automatiskt varje session | Projektminne, status, ändringslogg, principer |
| **Regel (.mdc)** | Automatiskt varje session | Korta, alltid-gällande beteenderegler för Claude |
| **Skill (SKILL.md)** | På begäran (explicit eller via beskrivningsmatchning) | Specifika procedurer med steg, skript, checklistor |

**Tumregel:** Om du vill att Claude *alltid* ska tänka på något → regel eller CLAUDE.md.
Om du vill att Claude ska *göra* något specifikt på begäran → skill.

---

## Senast uppdaterad: 2026-06-05