# CLAUDE.md – Generella regler för alla projekt (Kent Lundgren)

Dessa regler gäller i **alla projekt** under denna mapp och dess undermappar.
Projektspecifika CLAUDE.md-filer kan lägga till eller precisera regler, men dessa generella regler gäller alltid.

---

## Ändringslogg

| Datum | Vad uppdaterades |
|---|---|
| 2026-04-20 | Fil skapad med generella regler: klickbara länkar, Harvardformat, fråga vid oklarheter, kodkommentarer, versionshantering. |
| 2026-04-20 | Regel tillagd: klargör alltid vilken CLAUDE.md-fil som uppdateras. |
| 2026-04-20 | Regel tillagd: skapa alltid README.md med live-länk när nytt projekt/index.html skapas. |
| 2026-04-20 | Regel tillagd: GitHub-länken i sidfoten ska alltid peka på projektets specifika mapp i repot. |
| 2026-04-20 | Regel uppdaterad: GitHub-knappen ska använda rgba() på bakgrunden, inte opacity på hela elementet (fungerar annars inte mot mörk sidfot). |

---

## Två CLAUDE.md-filer – klargör alltid vilken som uppdateras

> **INSTRUKTION TILL CLAUDE:** Du är medveten om att det finns två nivåer av CLAUDE.md-filer: en generell fil i `ClaudeCowork`-mappen och en projektspecifik fil i varje projektmapp. När du föreslår en uppdatering av CLAUDE.md, eller när Kent vill uppdatera en, ska det alltid klargöras vilken av filerna som lämpligen uppdateras – och varför.

---

## Klickbara fillänkar i chatten

> **INSTRUKTION TILL CLAUDE:** När du refererar till en fil i ett chattsvar ska du alltid inkludera en klickbar länk till filen. Använd formatet `[filnamn](computer://sökväg/till/fil)`. Länkar fungerar i chatten men inte i markdown-visaren – lägg därför aldrig in computer://-länkar i .md-filer.

---

## Versionshantering – tydliggör senaste version

> **INSTRUKTION TILL CLAUDE:** När ett projekt innehåller flera versioner av ett dokument (t.ex. när en grupp eller Kent själv arbetar med olika utkast) ska du alltid:
> - Hålla reda på vilken version som är den **senaste och mest aktuella**.
> - I början av varje ny session påminna om vilken version som är senast, och fråga om det tillkommit en nyare.
> - I projektets CLAUDE.md markera senaste versionen med **SENASTE** i statustabellen, och äldre versioner med **Ersatt**.
> - När en ny version skapas: uppdatera CLAUDE.md direkt med filnamn, datum och kort beskrivning av vad som är nytt.

---

## Källhänvisningar i Harvardformat

> **INSTRUKTION TILL CLAUDE:** Ange alltid källor i Harvardformat. Exempel:
> `Naturvårdsverket (2023) *Titel*. Tillgänglig: https://... [åååå-mm-dd]`
> Kontrollera att länkarna fungerar och leder till rätt källa innan de anges.

---

## Fråga vid oklarheter

> **INSTRUKTION TILL CLAUDE:** Om något i en uppgift är oklart – fråga Kent innan arbetet påbörjas. Ställ aldrig mer än en fråga åt gången. Det är bättre att fråga en gång för mycket än att producera fel sak.

---

## README.md med live-länk – alltid när nytt projekt skapas

> **INSTRUKTION TILL CLAUDE:** När ett nytt projekt skapas – d.v.s. när en ny
> `index.html` (eller motsvarande startsida) skapas i en ny projektmapp – ska
> en `README.md` alltid skapas i samma mapp. README-filen ska alltid innehålla:
>
> 1. **En tydlig länk till live-sidan på GitHub Pages** – så att det alltid
>    är lätt att hitta den publicerade sidan direkt från repot.
>    Länkformat: `**https://kentlundgren.github.io/[sökväg]/**`
> 2. En kort beskrivning av vad projektet gör.
> 3. En tabell över projektets filer med kortfattade beskrivningar.
>
> Syftet är att det alltid ska vara lätt att navigera från GitHub-repot till
> live-sidan och tillbaka – utan att behöva leta i kod eller inställningar.
>
> Om GitHub Pages-URL:n inte är känd vid projektstarten: fråga Kent, eller
> skriv in en platshållare och påminn om att den ska fyllas i.

---

## GitHub-länk – alltid projektspecifik, fixerad nere till vänster

> **INSTRUKTION TILL CLAUDE:** Alla webbsidor ska ha en diskret GitHub-länk
> som är **fixerad i nedre vänstra hörnet** på sidan – inte inuti `<footer>`.
>
> **Placering och HTML** (placeras precis före `</body>`, efter `<script>`-taggar):
> ```html
> <a class="github-link"
>    href="https://github.com/kentlundgren/[repo]/tree/main/[projektmapp]"
>    target="_blank" rel="noopener"
>    aria-label="Visa källkod på GitHub">
>   { } GitHub
> </a>
> ```
>
> **CSS** (läggs till i projektets `styles.css`):
> ```css
> .github-link {
>   position: fixed; bottom: 1rem; left: 1rem;
>   display: inline-flex; align-items: center; gap: 0.3rem;
>   font-size: 0.75rem; font-weight: 600;
>   color: var(--color-primary);
>   background: rgba(255, 255, 255, 0.82);  /* rgba, INTE opacity på hela elementet */
>   border: 1px solid var(--color-border); border-radius: 6px;
>   padding: 0.3rem 0.65rem; text-decoration: none;
>   transition: background 0.15s, box-shadow 0.15s; z-index: 50;
> }
> .github-link:hover { background: #ffffff; box-shadow: 0 2px 8px rgba(0,0,0,0.15); text-decoration: none; }
> ```
> *(Anpassa CSS-variabelnamnen till projektets egna variabler om de heter annorlunda.)*
>
> **⚠ Använd INTE `opacity` på hela elementet.** `opacity` gör hela knappen
> halvtransparent – bakgrund, text och kant – och mot en mörk sidfot lyser
> bakgrundsfärgen igenom så att knappen ser ut som vanlig länktext. Använd
> istället `rgba()` på `background` så är bakgrunden alltid täckande och
> knappen ser likadan ut oavsett underliggande färg.
>
> **URL-format:** `https://github.com/kentlundgren/[repo]/tree/main/[projektmapp]`
>
> **Exempel:**
> - Revision → `https://github.com/kentlundgren/foreningar/tree/main/Revision`
> - KalmarNation → `https://github.com/kentlundgren/foreningar/tree/main/KalmarNation`
>
> **Länktext:** alltid `{ } GitHub`
>
> **Varför:** En besökare ska hamna direkt i projektmappen – inte på profilsidan.
> Knappen syns alltid oavsett scrollläge. Konventionen är densamma på alla sidor
> så att man känner igen sig oavsett vilket projekt man besöker.

---

## Kodkommentarer

> **INSTRUKTION TILL CLAUDE:** När du skriver kod (HTML, JavaScript, CSS, Python eller annat) ska du alltid kommentera koden i detalj – förklara vad varje avsnitt gör och varför. Kommentarerna ska vara tillräckligt utförliga för att Kent ska kunna förstå och underhålla koden utan att behöva fråga.
