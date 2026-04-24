# CLAUDE.md – Generell revisionsinstruktion för ideella organisationer i Sverige

*Version 1.2 · 2026-04-24*

Denna fil gäller för projektet **Revisionsverktyg för ideella organisationer**
och styr hur AI-assistenten ska agera i revisionsrelaterade samtal.

Generella regler för alla projekt finns i den överliggande
`ClaudeCowork/CLAUDE.md` och gäller även här.

Live-sida: https://kentlundgren.github.io/foreningar/Revision/

---

## Grundprinciper

- Förklara alltid facktermer på ett sätt som är begripligt utan ekonomisk utbildning.
- Fråga alltid vilket bokföringssystem organisationen använder – menynamn och
  exportfunktioner varierar mellan Fortnox, Visma, Bokio och Excel.
- Fråga alltid om ekonomiansvarig har bytts det senaste året. Om ja: begär
  underlag för minst **två år bakåt** (risk för informationsförlust vid personbyte).
- Beröm det som fungerar väl. Var tydlig men konstruktiv när brister identifieras.
- Ange alltid källhänvisningar i Harvardformat.

---

## 1. Lekmannarevisor eller auktoriserad revisor?

Frågan om vilken typ av revisor som krävs avgörs av organisationens storlek
och juridiska form.

| Typ | Vem använder det | Rättslig grund |
|-----|-----------------|----------------|
| **Auktoriserad/godkänd revisor** | Aktiebolag över vissa gränser, större ekonomiska föreningar | Revisionslagen (1999:1079), ABL 9 kap. |
| **Lekmannarevisor** | Ideella föreningar, studentnationer, mindre bostadsrättsföreningar | Föreningens stadgar – ingen lagstadgad revisionsplikt för de flesta ideella föreningar |

En **lekmannarevisor** är vald av föreningens medlemmar och behöver inte ha
formell revisorskompetens. Men uppdraget är ändå seriöst: lekmannarevisorn har
ett **juridiskt och moraliskt ansvar** att granska räkenskaperna noggrant och
oberoende. En stor organisation har auktoriserade revisorer, ett revisionsteam
och följer ISA (International Standards on Auditing). En liten organisation
har ofta en enskild lekmannarevisor – vilket ställer högre krav på pedagogik
och tydlighet i kommunikationen.

> **Praktisk tumregel:** Om organisationen inte är ett aktiebolag eller en
> ekonomisk förening av betydande storlek räcker det i de flesta fall med en
> lekmannarevisor. Kontrollera alltid mot organisationens egna stadgar.

---

## 2. Vilken typ av bokslut ska föreningen göra? (K1 / K2 / K3)

BFN:s regelverk delar upp bokföringsskyldiga ideella föreningar i tre nivåer
beroende på nettoomsättning (Bokföringsnämnden, u.å.):

| Nivå | Krav | Gäller när |
|------|------|------------|
| **K1 – Förenklat bokslut** (BFNAR 2010:1) | Resultaträkning + balansräkning | Nettoomsättning normalt **≤ 3 mkr** |
| **K2 – Årsbokslut** (BFNAR 2017:3) | Resultaträkning + balansräkning + upplysningar | Nettoomsättning **> 3 mkr**, ej "större förening" |
| **K3 / Årsredovisning** (ÅRL) | Resultat + balans + noter + förvaltningsberättelse | "Större förening": ≥ 2 av – fler än 50 anställda, balansomslutning > 40 mkr, nettoomsättning > 80 mkr – under vart och ett av de senaste två räkenskapsåren |

**Källa:** Bokföringsnämnden (u.å.) *Ideella föreningar m.fl. –
Bokföringsskyldighet och hur den löpande bokföringen ska avslutas*.
Tillgänglig: bfn.se (PDF).

> **Viktigt för revisorn:** Fråga alltid vilken nivå som gäller för den
> granskade föreningen. En förening nära 3 mkr-gränsen kan ha skiftat nivå
> jämfört med föregående år – det påverkar vilka dokument som krävs.

---

## 3. Tre analysnivåer i detta verktyg

Hur djup analys som är möjlig beror på tillgängliga underlag:

| Nivå | Underlag | Granskningssteg | Pris (professionell revision) |
|------|----------|-----------------|-------------------------------|
| **Nivå 1 – Grundanalys** | Resultat- + balansräkning (år X) | Steg 1 (riskbedömning), Steg 3 (resultat = EK-förändring) | 100 kr |
| **Nivå 2 – Utökad analys** | + föregående års bokslut + verifikationslista + kontoutdrag (31 dec) | + Steg 2, 4, 6, 7 | 1 500 kr |
| **Nivå 3 – Fullständig revision** | + styrelseprotokoll + verksamhetsberättelse | Alla 10 steg inkl. förvaltningsgranskning och revisionsberättelse | Pris på begäran |

Informera alltid användaren tydligt om vilken nivå som är möjlig med de
tillgängliga underlagen – och vad ytterligare underlag skulle tillföra.

---

## 4. De 10 granskningsstegen

Referens: https://kentlundgren.github.io/foreningar/KalmarNation/revision/generellt.html

| Steg | Namn | Kräver |
|------|------|--------|
| 1 | Riskbedömning inför granskning | Grunduppgifter om organisationen |
| 2 | Bankavstämning | Kontoutdrag per 31 december |
| 3 | Resultat = Δ eget kapital (+ Δ obeskattade reserver) | Resultat- och balansräkning (år X) |
| 4 | Kontinuitetskontroll (UB = IB nästa år) | Balansräkning föregående år |
| 5 | Stickprov på verifikationer | Verifikationslista + enskilda underlag |
| 6 | Jämförelseanalys (år för år) + budgetgranskning | Resultaträkning föregående år |
| 7 | Fordringar – gamla obetalda kundfakturor | Verifikationslista (K- och I-serien) |
| 8 | Bedrägerikontroll | Verifikationslista (hela året) |
| 9 | Förvaltningsgranskning – styrelsens arbete | Styrelseprotokoll + verksamhetsberättelse |
| 10 | Revisionsberättelse | Alla ovanstående + revisorns signatur |

---

## 4b. Steg 3 i detalj – teckenkonvention och obeskattade reserver

### Varför teckenkonventionen är avgörande

I alla svenska bokföringssystem (Fortnox, Visma, Bokio m.fl.) gäller att
**skulder och eget kapital är kreditkonton och redovisas med negativt tecken**
i de maskinexporterade rapporterna. Det innebär:

- Tillgångar (debitkonton) → **positiva tal**
- Skulder och eget kapital (kreditkonton) → **negativa tal**

**Viktig konsekvens som AI-modeller ofta missförstår:**
I vanligt tal säger vi alltid att *"vid positivt resultat ökar eget kapital"*
– och det stämmer. Men i balansräkningens siffror syns detta som att
eget kapital **ökar i negativt riktning**, dvs. beloppet blir ett större negativt tal.

| Händelse | Normalt tal (ekonomiskt) | I balansräkningens siffror |
|----------|--------------------------|---------------------------|
| Vinst på 10 000 kr | EK ökar med 10 000 | EK går t.ex. från −50 000 → −60 000 |
| Förlust på 10 000 kr | EK minskar med 10 000 | EK går t.ex. från −50 000 → −40 000 |

Δ EK (UB − IB) vid vinst = −60 000 − (−50 000) = **−10 000** (negativt Δ = EK ökade)  
Δ EK (UB − IB) vid förlust = −40 000 − (−50 000) = **+10 000** (positivt Δ = EK minskade)

### De två formelversionerna

**Fall A – Normal presentation (EK visas som positivt tal):**
> Årets resultat = Δ Eget kapital + Δ Obeskattade reserver

**Fall B – Kreditkonvention (EK visas som negativt tal, vanligast i systemexporter):**
> Årets resultat = −(Δ Eget kapital + Δ Obeskattade reserver)

Minnesregel för kreditkonvention: positivt Δ EK = EK *minskade*; negativt Δ EK = EK *ökade*.

### Varför tillkommer obeskattade reserver?

Vissa föreningar (vanligt i bostadsrättsföreningar och samfälligheter) har
*obeskattade reserver* – t.ex. en investeringsfond eller periodiseringsfond.
Dessa visas som en egen sektion i balansräkningen och är också kreditkonton
(negativt tecken i kreditkonvention). När föreningen redovisar ett underskott
kan en del täckas via fonden (i stället för att enbart belasta eget kapital),
och tvärtom – ett överskott kan avsättas till fonden.

### Kontrollformel steg för steg

1. Hämta årets resultat ur resultaträkningen – raden "Resultat efter skatter"
   (eller motsvarande). Ignorera eventuell avslutande rad "Redovisat resultat"
   som bara nollställer resultatet i systemet.
2. Identifiera teckenkonventionen: är eget kapital angivet som positivt eller
   negativt tal i balansräkningen?
3. Beräkna Δ EK = UB − IB och (om tillämpligt) Δ Obeskattade reserver = UB − IB.
4. Välj rätt formel:
   - **Om EK är positivt (Fall A):** Δ EK + Δ Obs.res ska vara lika med årets resultat.
   - **Om EK är negativt (Fall B):** −(Δ EK + Δ Obs.res) ska vara lika med årets resultat.
5. Om sambandet stämmer → ✅ Ingen avvikelse.
   Om det inte stämmer → ⚠ Varningstecken – utred vidare.

### Praktiskt exempel – Långkatekesen 2025 (kreditkonvention, Fall B)

Balansräkningens export från Fortnox visar EK med negativt tecken.

| Post | Belopp | Förklaring |
|------|--------|------------|
| Årets resultat (resultaträkning) | −14 954 kr | Förlust |
| Δ EK (kto 2988, UB − IB) | +597 kr | EK minskade i absoluta termer (positivt Δ i kreditkonvention) |
| Δ Investeringsfond (kto 2840, UB − IB) | +14 357 kr | Fonden minskade (täckte del av förlusten) |
| Kontroll Fall B: −(+597 + 14 357) = −14 954 ✅ | Stämmer | |

Källa: Verifierat i granskning av Långkatekesen, april 2026.

---

## 5. Väsentlighet och intern kontroll i små föreningar

**Väsentlighet:** I en stor organisation sätts en formell väsentlighetsnivå
(t.ex. 0,5–1 % av omsättningen). I en liten förening är alla belopp
potentiellt väsentliga – ett fel på 5 000 kr i en förening med 500 000 kr i
omsättning (1 %) bör alltid uppmärksammas.

**Intern kontroll:** Stora organisationer har attestrutiner och separerade
arbetsuppgifter. I en liten förening sköter ofta samma person bokföring,
attestering och utbetalning – en **koncentrationsrisk** som revisorn ska
vara medveten om och anpassa stickprovet efter.

---

## 6. Riskfaktorer att alltid kontrollera

- Har ekonomiansvarig bytts? *(Risk för informationsförlust vid överlämning.)*
- Har ekonomin förändrats kraftigt jämfört med föregående år? *(Kräver förklaring.)*
- Hanterar en enda person hela ekonomiflödet? *(Koncentrationsrisk.)*
- Finns gamla fordringar (äldre än 6 månader) som troligen aldrig betalas?
- Stämmer ingående balanser mot föregående års utgående balanser?

Om ekonomiansvarig byts varje år (vanligt i studentorganisationer): begär
alltid underlag för **minst två år bakåt**.

---

## 7. Versionsnumrering

**Versionsnumret ska alltid räknas upp och datumet uppdateras när en fil
ändras.** Regeln gäller för alla filer i projektet som har ett versionshuvud:
`styles.css`, `script.js`, `index.html`, `index_eng.html`, `splash.css`,
`splash.js` och denna `CLAUDE.md`.

Format: `Version X.Y · ÅÅÅÅ-MM-DD` – öka Y vid mindre tillägg eller
korrigeringar, öka X vid större omstruktureringar.

Om flera filer uppdateras i samma session räcker det att räkna upp med ett
steg per fil – men **alla berörda filer ska uppdateras innan sessionen avslutas**.

---

## 8. Synkronisering av index-filer

**index.html och index_eng.html ska alltid uppdateras tillsammans.** Varje gång en
ändring görs i den svenska `index.html` ska en motsvarande ändring – korrekt
översatt och anpassad till engelska – göras i `index_eng.html`. Detsamma gäller
omvänt. Ingen av filerna ska vara mer uppdaterad än den andra.

Regeln gäller för alla typer av ändringar: nytt innehåll, korrigeringar,
uppdaterade kommentarer, versionsnummer och revisionsanteckningar.

---

## 9. Kontakt

**Kent Lundgren** erbjuder professionell lekmannarevision för ideella
organisationer. Kontakt: kent@kentlundgren.se · [@kentlundgren](https://x.com/kentlundgren)
