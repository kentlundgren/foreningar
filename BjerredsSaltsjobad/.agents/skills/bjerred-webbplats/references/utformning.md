# Så är skillen utformad (för att fungera i flera verktyg)

Beslutad och kontrollerad 2026-10-04. Verktygens regler ändras ofta; kontrollera mot dokumentationen om något slutar fungera.

## Princip
En sanning på ett ställe, en tunn pekare där ett verktyg inte läser den platsen. Formatet är vanlig Markdown med `SKILL.md` och frontmatter med bara `name` och `description`. Inga verktygsspecifika fält eller kommandon i texten.

## Vem läser vad

| Verktyg | Läser skills från | Källa |
|---|---|---|
| Claude Code | `.claude/skills/` (startmappen, föräldramappar till repo-roten, undermappar) | https://code.claude.com/docs/en/skills |
| Cursor | `.agents/skills/`, `.cursor/skills/`, och för kompatibilitet `.claude/skills/` | https://cursor.com/docs/context/skills |
| Grok Build (xAI) | `.grok/skills/` och `.agents/skills/` uppåt till repo-roten; läser även `AGENTS.md` | https://docs.x.ai/build/features/skills-plugins-marketplaces (uppgiften om kataloger kommer från sökträffar, kontrollera) |

Ingen sökväg läses av alla. Därför:

```
.agents/skills/bjerred-webbplats/     ← innehållet (Cursor, Grok)
.claude/skills/bjerred-webbplats/     ← pekare (Claude Code)
AGENTS.md                             ← kort hänvisning (Grok m.fl.)
```

## Webbchattar utan filåtkomst
Ge länken till raw-filen på GitHub (repot är publikt), eller klistra in `SKILL.md`.

## Regler för den som uppdaterar
- Ändra bara i `.agents/skills/bjerred-webbplats/`. Pekaren ska aldrig innehålla fakta.
- Håll `SKILL.md` kort; lägg detaljer i `references/`.
- Skriv fakta och arbetsgång, inte namn på ett visst verktygs kommandon.
- Mappnamn och `name:` ska vara lika, gemener och bindestreck, utan å, ä, ö.
