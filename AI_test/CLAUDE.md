# CLAUDE.md – AI_test / AI Rundabordssamtal

Projektspecifik CLAUDE.md för mappen `AI_test`.
Generella regler i `ClaudeCowork/CLAUDE.md` gäller alltid utöver dessa.

---

## Ändringslogg

| Datum | Vad uppdaterades |
|---|---|
| 2026-04-21 | Fil skapad. Projektbeskrivning, ursprung och teknisk info dokumenterat. |

---

## Projektbeskrivning

**AI Rundabordssamtal** är en interaktiv webbapplikation som simulerar ett rundabordssamtal
mellan fyra stora AI-modeller: **Claude**, **ChatGPT**, **Gemini** och **Grok**.

Användaren ställer en fråga/ämne, väljer modeller och antal repliker. Applikationen anropar
respektive modells API i tur och ordning. Varje modell svarar och lämnar sedan över ordet
till en annan modell – precis som i ett poddavsnitt.

Applikationen är anpassad för podden **AIpodd** (Kent Lundgren & Google NotebookLM):
https://open.spotify.com/show/5haU3OgZTLS2d18XySVdq0

---

## Ursprung

### Konceptet – Generativet avsnitt #98
Idén kom från podden **Generativet**, avsnitt #98:
["Vi är den slutgiltiga likgiltigheten"](https://open.spotify.com/episode/0XDqzpWxEs26jHRIZaDAkZ?si=g3l5z1FUT-a5N27U09AZCA)

> Ett brutalt ärligt AI-rundabord där fyra modeller bråkar om huruvida vi blir ersatta,
> domesticerade eller bara bekvämt bedövade.

### Prompten – Anders Bjarby
Den ursprungliga systemprompten som styr varje modells beteende är skapad av **Anders Bjarby**
specifikt för Generativet-avsnittet. Prompten återges ordagrant i applikationens teknik-modal
(knapp nere till höger: "{ } Ursprunglig prompt").

Promptens nyckelregler: brutalt ärliga svar, inga platityder, 150–250 ord per replik,
alltid avsluta med att lämna över till en annan modell.

---

## Filer

| Fil | Status | Beskrivning |
|---|---|---|
| `index.html` | **SENASTE** | Huvudfil – all HTML, CSS och JS i en fil. |
| `ai-rundabord.html` | Äldre version | Tidigare version av applikationen. |
| `README.md` | Aktuell | Projektöversikt med live-länk och ursprung. |
| `CLAUDE.md` | Aktuell | Den här filen – regler och projektkontext för Claude. |

---

## Teknisk information

- **Struktur:** Allt i en enda `index.html` (inline CSS + inline JS). Ingen separat styles.css.
- **Fonter:** Google Fonts – DM Serif Display + DM Mono.
- **Tema:** Mörkt (dark mode), CSS-variabler i `:root`.
- **API-anrop:** Fetch mot respektive modells REST-API. API-nycklar anges av användaren i gränssnittet.
- **GitHub Pages:** https://kentlundgren.github.io/foreningar/AI_test/
- **GitHub-källkod:** https://github.com/kentlundgren/foreningar/tree/main/AI_test

---

## Regler specifika för detta projekt

> **Poddnamn:** Standardvärdet för poddnamn-fältet är **AIpodd**. Ändra inte till Generativet
> eller annat utan att Kent explicit ber om det.

> **Promttexten:** Anders Bjarbys originaltext (i `<pre>`-blocket i modalen) ska **aldrig**
> redigeras utan Kents uttryckliga instruktion – den är ett historiskt dokument.

> **GitHub-knapp:** Fixerad nere till vänster. Pekar på
> `https://github.com/kentlundgren/foreningar/tree/main/AI_test`.

> **Teknik-modal:** Knappen "{ } Ursprunglig prompt" är fixerad nere till höger.
> Stängs med ×, klick utanför, eller Escape.
