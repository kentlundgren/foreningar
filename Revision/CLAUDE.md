# CLAUDE.md – Generell revisionsinstruktion för ideella organisationer i Sverige

*Version 1.0 · 2026-04-20*

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

## 4b. Steg 3 i detalj – obeskattade reserver

Den grundläggande regeln är:

> **Årets resultat = Förändring av eget kapital + Förändring av obeskattade reserver**

**Varför tillkommer obeskattade reserver?**
Vissa föreningar (vanligt i bostadsrättsföreningar och samfälligheter) har
*obeskattade reserver* – t.ex. en investeringsfond eller periodiseringsfond.
Dessa visas som en egen sektion i balansräkningen. När föreningen redovisar
ett underskott kan en del av underskottet täckas via fonden (i stället för att
enbart belasta eget kapital), och tvärtom – ett överskott kan avsättas till fonden.

**Kontrollformel steg för steg:**
1. Hämta årets resultat ur resultaträkningen – raden "Resultat efter skatter"
   (eller motsvarande). Ignorera eventuell avslutande rad "Redovisat resultat"
   som bara nollställer resultatet i systemet.
2. Hämta förändringen av eget kapital ur balansräkningens förändringkolumn.
3. Kontrollera om balansräkningen har en sektion "Obeskattade reserver".
   - **Om ja:** Δ eget kapital + Δ obeskattade reserver = årets resultat
   - **Om nej:** Δ eget kapital = årets resultat (den enklare formeln)
4. Om sambandet stämmer → ✅ Ingen avvikelse.
   Om sambandet inte stämmer → ⚠ Varningstecken – utred vidare.

**Praktiskt exempel – Långkatekesen 2025:**

| Post | Belopp |
|------|--------|
| Årets resultat (resultaträkning) | −14 954 kr |
| Δ Eget kapital (kto 2988, balansräkning) | +597 kr |
| Δ Investeringsfond (kto 2840, obeskattade reserver) | +14 357 kr |
| Kontroll: 597 + 14 357 = 14 954 ✅ | Stämmer |

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

## 7. Kontakt

**Kent Lundgren** erbjuder professionell lekmannarevision för ideella
organisationer. Kontakt: kent@kentlundgren.se · [@kentlundgren](https://x.com/kentlundgren)
