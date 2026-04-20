# Revisionsverktyg för ideella organisationer

Ett interaktivt verktyg för lekmannarevisorer och föreningar som vill granska
sin ekonomi – från enkel AI-föranalys till fullständig manuell revision.

## Live-sida

**https://kentlundgren.github.io/foreningar/Revision/**

## Vad sidan gör

Sidan har ett tvåstegsflöde:

1. **Gratis AI-analys (självbetjäning)** – besökaren fyller i ett formulär med
   organisationsnamn, räkenskapsår, bokföringssystem och tillgängliga underlag.
   Sidan genererar en färdig revisionsanalys-prompt som kopieras till
   [claude.ai](https://claude.ai) för analys.

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
| `index.html` | Webbsidans struktur – tre sektioner |
| `styles.css` | Responsiv design med gula inmatningsfält |
| `script.js` | Promptgenerator, kopieringsknapp, förberedd Zapier/Formspree-kod |
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
