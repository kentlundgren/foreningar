# Revisionsverktyg för ideella organisationer

Ett interaktivt verktyg för lekmannarevisorer och föreningar som vill granska
sin ekonomi – från enkel AI-föranalys till fullständig manuell revision.

## Live-sidor

Verktyget finns på **två språk**. Man växlar språk med en knapp uppe till höger på sidan.

| Språk | URL |
|-------|-----|
| 🇸🇪 **Svenska** | **https://kentlundgren.github.io/foreningar/Revision/** |
| 🇬🇧 **English** | **https://kentlundgren.github.io/foreningar/Revision/index_eng.html** |

## Vad sidan gör

Sidan har ett tvåstegsflöde:

1. **Gratis AI-analys (självbetjäning)** – besökaren fyller i ett formulär med
   organisationsnamn, räkenskapsår, bokföringssystem, tillgängliga underlag och
   önskad AI-modell. Sidan genererar en färdig revisionsanalys-prompt som kopieras
   till valfri AI-modell (Claude, ChatGPT, Gemini, Grok eller Copilot) för analys.

2. **Professionell revision (betalt)** – besökaren beställer en manuell revision
   av Kent Lundgren via e-post (kent@kentlundgren.se) med priser på tre nivåer.

## Tre analysnivåer

| Nivå | Underlag | Steg som analyseras | Pris |
|------|----------|---------------------|------|
| Nivå 1 – Grundanalys | Resultat- + balansräkning (år X) | Steg 1, 3 | 100 kr |
| Nivå 2 – Utökad analys | + föregående års bokslut + verifikationslista + kontoutdrag | + Steg 2, 4, 6, 7 | 1 500 kr |
| Nivå 3 – Fullständig revision | + styrelseprotokoll + verksamhetsberättelse | Alla 10 steg | Pris på begäran |

Revisionsramverket bygger på:
https://kentlundgren.github.io/foreningar/KalmarNation/revision/generellt.html

## Filer

| Fil | Beskrivning |
|-----|-------------|
| `index.html` | 🇸🇪 Svenska sidan – tre sektioner, språkknapp uppe till höger |
| `index_eng.html` | 🇬🇧 Engelsk version – samma struktur, delar `script.js` och `styles.css` |
| `styles.css` | Responsiv design med gula inmatningsfält |
| `script.js` | Promptgenerator (sv + en), AI-modellväljare, kopieringsknapp |
| `CLAUDE.md` | Instruktionsfil för AI-assistenten (revisionsinstruktioner) |
| `revision-prompt.md` | Ren prompttext för direktanvändning utan webbsida |
| `README.md` | Denna fil |

## Fas 2 – planerade förbättringar

Följande är förberett i `script.js` (utkommenterad kod, klar att aktivera):

- **Formspree-integration** – filuppladdning direkt på sidan, levereras till
  kent@kentlundgren.se
- **Zapier/X DM-notifiering** – automatisk DM till @kentlundgren när en
  beställning inkommer

## Kontakt

Kent Lundgren · kent@kentlundgren.se · [@kentlundgren](https://x.com/kentlundgren)
