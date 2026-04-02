# Kalmar Nation – revision (Lund)

Projekt för **revidering av Kalmar Nations bokslut för 2025** (lekmannarevision / ekonomisk granskning av mindre ideell förening).

## Syfte

- Granska att räkenskaperna ger en rimlig bild av ekonomisk ställning och resultat.
- Dokumentera granskningen (anteckningar, kommentarer, underlag).
- Följa samma grunder som beskrivs i **`CLAUDE.md`** (revisionsinstruktion för mindre organisationer i Sverige, version 2.0).

## Viktiga filer i mappen

| Fil / mapp | Innehåll |
|------------|----------|
| **`CLAUDE.md`** | Huvudinstruktion till AI-assistenter: roll, risker, stickprov, bank, eget kapital m.m. **Läs denna först** vid arbete med AI. |
| `CLAUDE.md_old` | Äldre version av instruktionen. |
| `2025/`, `2026/`, `1990/` | Underlag: rapporter, PDF, bilder kopplade till granskningen. |
| `Revisionsanteckningar_*.docx` / `.pdf` | Revisionsanteckningar. |
| `Inledande_kommentar_KalmarNation_2025*.docx` | Inledande kommentarer. |
| `CLAUDE.docx` / `CLAUDE.pdf` | Formaterad kopia av instruktionen (vid behov). |
| `blogg_claude_cowork_revision.html` | Text om samarbete med AI kring revision. |
| `index.html` | Lokal översiktssida (öppna i webbläsare). |

## Arbete med AI

- **Cursor:** kod, text, struktur, Git – ofta mot denna mapp på SSD.
- **Claude Cowork:** samma typ av uppdrag (t.ex. formatering av `CLAUDE.md`, blogg, revisionspunkter), ofta mot en projektmapp under OneDrive (t.ex. `...\ClaudeCowork\KalmarNation\revision`).

Båda verktygen ska utgå från **`CLAUDE.md`**: fråga hellre en gång för mycket än gissa; ange önskat format (Word/PDF/Markdown) innan nya dokument skapas.

## GitHub

Projektet kan ingå i repot **[foreningar](https://github.com/kentlundgren/foreningar)** under sökvägen `KalmarNation/revision/`. Efter `git pull` / `git push`: kontrollera att du arbetar i rätt klon och att inga osparade ändringar skrivs över.

---

## Cursor och Claude Cowork – samma filer, två verktyg

Det går bra att använda båda, men tänk på följande:

1. **En “sanning” åt gången**  
   Om samma fil finns på två ställen (SSD och OneDrive) eller öppnas i två program: den version som sparas **sist** vinner. Risk för att ändringar från det ena spåret försvinner.

2. **Synkronisering (OneDrive)**  
   OneDrive kan låsa filer under uppladdning eller skapa versionskonflikter (`Filnamn – Konflikt`). Stäng filer när du är klar; vänta tills synken är klar innan du byter dator eller verktyg.

3. **Öppna inte samma fil samtidigt för redigering**  
   I Word: undvik att ha dokumentet öppet i två instanser. I editorer: spara och stäng innan du byter verktyg, eller använd Git så du ser diff.

4. **Git som spårbarhet**  
   Committa viktiga milstolpar (`git add`, `git commit`, `git push`). Då kan du återställa eller jämföra om något skrivits över.

5. **Namn och kopior**  
   Använd tydliga versionsnamn (`_v2`, datum i filnamn) eller grenar om du experimenterar, så du inte råkar spara över den enda “goda” kopian.

6. **Personuppgifter och ekonomi**  
   PDF och dokument kan innehålla känsliga uppgifter. Publicera inte i öppna repo utan att du medvetet valt det.

---

## Om något är oklart

Vid tvekan: **vilken mapp är “huvudkopian”** (SSD vs OneDrive), **ska något versionshanteras i Git**, och **får filer med ekonomiunderlag delas publikt**. Ställ dessa frågor innan större omdisponeringar.

*README uppdaterad i samband med dokumentation av arbetsflöde Cursor + Claude Cowork.*
