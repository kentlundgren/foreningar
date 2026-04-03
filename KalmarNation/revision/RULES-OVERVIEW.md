# Regelöversikt – KalmarNation/revision

Alla Cursor-regler som gäller detta projekt, både globala och lokala. Globala regler finns i `ClaudeCowork/.cursor/rules/` och gäller alla projekt automatiskt. Lokala regler finns i `KalmarNation/revision/.cursor/rules/` och gäller bara detta projekt.

---

## Globala regler (`ClaudeCowork/.cursor/rules/`)

| Fil | Beskrivning |
| --- | --- |
| `encoding-utf8.mdc` | Alla filer sparas i UTF-8. Filer med svenska tecken (å, ä, ö) skapas via PowerShell med `[char]`-metoden – aldrig via Write-verktyget. |
| `version-dating.mdc` | Versionsnummer ska alltid ha exakt datum i formatet ÅÅÅÅ-MM-DD, aldrig bara månad. |
| `git-workflow.mdc` | Commit och push görs alltid av användaren. AI föreslår men agerar inte utan godkännande. |
| `rules-overview.mdc` | RULES-OVERVIEW.md ska alltid finnas lokalt i varje projekt och hållas aktuell när regler läggs till eller ändras. |

---

## Lokala regler (`KalmarNation/revision/.cursor/rules/`)

| Fil | Beskrivning |
| --- | --- |
| `sv-eng-sync.mdc` | Varje ändring i en svensk HTML-fil speglas omedelbart i motsvarande engelsk fil. |
| `github-pages-live-link.mdc` | Alla index.html-filer ska ha diskret länk till GitHub-repot. README.md ska ha länk till live-sidan. |
| `git-workflow.mdc` | Lokal kopia av global regel. |
| `claude-md-updates.mdc` | CLAUDE.md uppdateras när nya revisionsprinciper identifieras. AI föreslår alltid först. |
| `encoding-utf8.mdc` | Lokal kopia av global regel – UTF-8, svenska tecken via PowerShell. |

---

## Senast uppdaterad: 2026-04-03
