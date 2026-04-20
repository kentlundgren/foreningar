/**
 * script.js – Revisionsverktyg för ideella organisationer
 * Version 1.2 · 2026-04-20
 *
 * Innehåll:
 *   0. Språkdetektering – LANG läses från <html lang="...">
 *   1. Nivåindikator – uppdateras dynamiskt när underlag kryssas i/ur
 *   2. Formulärhantering – validering och promptgenerering
 *   3. Promptbyggare – bygger den fullständiga AI-prompten från formulärdata
 *      (genererar svenska prompt vid lang="sv", engelsk prompt vid lang="en")
 *   4. Kopieringsknapp – kopierar prompten till urklipp
 *   5. [FAS 2] Formspree-integration (utkommenterad, klar att aktivera)
 *   6. [FAS 2] Zapier/X DM-notifiering (utkommenterad, klar att aktivera)
 */

'use strict';

/* =========================================================================
   0. SPRÅKDETEKTERING
   Läser HTML-elementets lang-attribut. Används för att välja rätt text i
   nivåindikatorn, valideringsmeddelanden och den genererade prompten.
   lang="sv" → svenska (index.html)
   lang="en" → engelska (index_eng.html)
   ========================================================================= */
const LANG = document.documentElement.lang || 'sv';

/* =========================================================================
   1. NIVÅINDIKATOR
   Läser av vilka underlag som är ibockade och visar vilken analysnivå
   som är möjlig. Uppdateras i realtid när användaren kryssar i/ur.
   ========================================================================= */

/**
 * Beräknar vilken analysnivå som är möjlig utifrån ibockade underlag.
 * @returns {number} 1, 2 eller 3
 */
function calculateLevel() {
  const hasResultCurrent  = document.getElementById('doc-result-current').checked;
  const hasBalanceCurrent = document.getElementById('doc-balance-current').checked;
  const hasResultPrev     = document.getElementById('doc-result-prev').checked;
  const hasBalancePrev    = document.getElementById('doc-balance-prev').checked;
  const hasVerification   = document.getElementById('doc-verification').checked;
  const hasBank           = document.getElementById('doc-bank').checked;

  // Nivå 2 kräver föregående års bokslut + verifikationslista + kontoutdrag
  const hasNiva2 = hasResultPrev && hasBalancePrev && hasVerification && hasBank;

  if (!hasResultCurrent || !hasBalanceCurrent) return 0; // Grundunderlag saknas
  if (hasNiva2) return 2;
  return 1;
}

/**
 * Uppdaterar nivåindikatorns text och färg baserat på aktuell nivå.
 * Texten väljs baserat på LANG (sv/en).
 */
function updateLevelIndicator() {
  const indicator = document.getElementById('level-indicator');
  const levelText = document.getElementById('level-text');
  const level     = calculateLevel();

  indicator.style.background = '';

  // Textsträngarna för svenska och engelska
  const texts = {
    sv: {
      0: 'Välj minst resultat- och balansräkning för innevarande år',
      1: 'Nivå 1 – Grundanalys möjlig (Steg 1 + 3)',
      2: 'Nivå 2 – Utökad analys möjlig (Steg 1–4, 6, 7)'
    },
    en: {
      0: 'Select at least the income statement and balance sheet for the current year',
      1: 'Level 1 – Basic analysis possible (Steps 1 + 3)',
      2: 'Level 2 – Extended analysis possible (Steps 1–4, 6, 7)'
    }
  };

  const t = texts[LANG] || texts['sv'];

  if (level === 0) {
    levelText.textContent      = t[0];
    indicator.style.background = '#7f8c8d';
  } else if (level === 1) {
    levelText.textContent      = t[1];
    indicator.style.background = '#1e8449';
  } else if (level === 2) {
    levelText.textContent      = t[2];
    indicator.style.background = '#d68910';
  }
}

// Lyssnar på alla kryssrutor och uppdaterar indikatorn vid varje ändring
document.querySelectorAll('input[name="docs"]').forEach(function (checkbox) {
  checkbox.addEventListener('change', updateLevelIndicator);
});

// Kör en gång vid sidladdning för att visa startvärdet
updateLevelIndicator();


/* =========================================================================
   2. FORMULÄRHANTERING – validering och händelsehanterare
   ========================================================================= */

document.getElementById('prompt-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Hindrar sidan från att laddas om

  // Hämtar och trimmar obligatoriska fält
  const orgName      = document.getElementById('org-name').value.trim();
  const year         = document.getElementById('year').value.trim();
  const financialData = document.getElementById('financial-data').value.trim();

  // Valideringsmeddelanden på rätt språk
  const msg = LANG === 'en' ? {
    orgName:       'Please enter the organisation name.',
    year:          'Please enter a valid financial year (four digits, e.g. 2025).',
    financialData: 'Please paste your financial documents in the text field.'
  } : {
    orgName:       'Ange organisationens namn.',
    year:          'Ange ett giltigt räkenskapsår (fyra siffror, t.ex. 2025).',
    financialData: 'Klistra in dina ekonomiska underlag i textfältet.'
  };

  // Enkel validering – alla obligatoriska fält måste vara ifyllda
  if (!orgName) {
    alert(msg.orgName);
    document.getElementById('org-name').focus();
    return;
  }
  if (!year || !/^\d{4}$/.test(year)) {
    alert(msg.year);
    document.getElementById('year').focus();
    return;
  }
  // financialData är valfritt – användaren kan bifoga PDF direkt i Claude

  // Bygger prompten och visar resultatrutan
  const prompt = buildPrompt();
  showResult(prompt);
});


/* =========================================================================
   3. PROMPTBYGGAREN
   Bygger den fullständiga AI-prompten med formulärdata inbakat.
   Anpassar innehållet baserat på vilka underlag som är tillgängliga.
   ========================================================================= */

/**
 * Läser formulärets värden och bygger en komplett prompt.
 * Väljer svenska eller engelska beroende på LANG-konstanten.
 * @returns {string} Den färdiga prompttexten
 */
function buildPrompt() {
  // Delegera till rätt språkversion
  if (LANG === 'en') return buildPromptEng();
  return buildPromptSv();
}

/**
 * Bygger den svenska prompten.
 * @returns {string}
 */
function buildPromptSv() {
  // Läser formulärdata
  const orgName           = document.getElementById('org-name').value.trim();
  const year              = document.getElementById('year').value.trim();
  const accountingSystem  = document.getElementById('accounting-system').value;
  const treasurerChanged  = document.getElementById('treasurer-changed').value;
  const budgetAvailable   = document.getElementById('budget').value;
  const financialData     = document.getElementById('financial-data').value.trim();

  // Läser av tillgängliga underlag
  const hasResultCurrent  = document.getElementById('doc-result-current').checked;
  const hasBalanceCurrent = document.getElementById('doc-balance-current').checked;
  const hasResultPrev     = document.getElementById('doc-result-prev').checked;
  const hasBalancePrev    = document.getElementById('doc-balance-prev').checked;
  const hasVerification   = document.getElementById('doc-verification').checked;
  const hasBank           = document.getElementById('doc-bank').checked;

  const level = calculateLevel();

  // Bygger lista över tillgängliga underlag för prompten
  const docList = [];
  if (hasResultCurrent)  docList.push('Resultaträkning år ' + year);
  if (hasBalanceCurrent) docList.push('Balansräkning år ' + year);
  if (hasResultPrev)     docList.push('Resultaträkning år ' + (parseInt(year) - 1));
  if (hasBalancePrev)    docList.push('Balansräkning år ' + (parseInt(year) - 1));
  if (hasVerification)   docList.push('Verifikationslista år ' + year);
  if (hasBank)           docList.push('Kontoutdrag per 31 december ' + year);

  // -----------------------------------------------------------------------
  // Bygger prompten del för del
  // -----------------------------------------------------------------------
  let prompt = '';

  // -- Rollsättning och kontext --
  prompt += 'Du agerar som revisor och ekonomisk granskare av en liten ideell\n';
  prompt += 'organisation i Sverige. Du är kunnig men pedagogisk – du förklarar\n';
  prompt += 'alltid termer på ett sätt som är begripligt utan ekonomisk utbildning.\n\n';

  prompt += 'Ramverket du följer:\n';
  prompt += 'https://kentlundgren.github.io/foreningar/KalmarNation/revision/generellt.html\n\n';

  // -- Organisationsuppgifter --
  prompt += '━━━ ORGANISATIONSUPPGIFTER ━━━\n';
  prompt += 'Organisation:      ' + orgName + '\n';
  prompt += 'Räkenskapsår:      ' + year + '\n';
  prompt += 'Bokföringssystem:  ' + accountingSystem + '\n';

  // Varning om ekonomiansvarig bytts
  if (treasurerChanged === 'ja') {
    prompt += '\n⚠ OBSERVERA: Ekonomiansvarig/kassör har bytts det senaste året.\n';
    prompt += '  Risk: information och sammanhang kan ha gått förlorat vid överlämningen.\n';
    prompt += '  Begär underlag för MINST TVÅ ÅR BAKÅT för att säkerställa kontinuitet.\n';
  }

  // Budget
  if (budgetAvailable === 'ja') {
    prompt += '\nBudget för räkenskapsåret finns – jämför utfall mot budget i Steg 6.\n';
  } else if (budgetAvailable === 'nej') {
    prompt += '\nIngen fastställd budget finns för räkenskapsåret.\n';
  }

  // -- Tillgängliga underlag och analysnivå --
  prompt += '\n━━━ TILLGÄNGLIGA UNDERLAG (Analysnivå ' + level + ') ━━━\n';
  docList.forEach(function (doc) {
    prompt += '  ✓ ' + doc + '\n';
  });

  if (level === 1) {
    prompt += '\nNivå 1 – Grundanalys: utför Steg 1 (riskbedömning) och Steg 3\n';
    prompt += '(resultat = EK-förändring). Informera tydligt om vad som inte kan\n';
    prompt += 'analyseras och vad ytterligare underlag skulle tillföra.\n';
  } else if (level === 2) {
    prompt += '\nNivå 2 – Utökad analys: utför Steg 1, 2, 3, 4, 6 och 7.\n';
    prompt += 'Informera om vad som kvarstår för en fullständig Nivå 3-revision.\n';
  }

  // -- Granskningsinstruktioner --
  prompt += '\n━━━ GRANSKNINGSINSTRUKTIONER ━━━\n\n';

  // Steg 1 och 3 utförs alltid (ingår i nivå 1)
  // Uppdatering 2026-04-20: utökad förklaring av teckenkonvention i kreditkonvention
  prompt += 'STEG 3 – Resultat = förändring av eget kapital (utförs alltid)\n';
  prompt += '\n';
  prompt += '⚠ VIKTIG – TECKENKONVENTION I BALANSRÄKNINGEN:\n';
  prompt += 'I alla svenska bokföringssystem (Fortnox, Visma, Bokio m.fl.) är\n';
  prompt += 'skulder och eget kapital kreditkonton och visas med NEGATIVT tecken\n';
  prompt += 'i exporterade rapporter. Det innebär att när eget kapital ÖKAR (t.ex.\n';
  prompt += 'vid vinst) så blir beloppet i balansräkningen ett STÖRRE negativt tal.\n';
  prompt += 'Exempel: EK ökar från 50 000 kr → visas som −50 000 → −60 000 kr.\n';
  prompt += '\n';
  prompt += 'Identifiera teckenkonventionen FÖRST:\n';
  prompt += '  – Är eget kapital angivet som ett NEGATIVT tal i balansräkningen?\n';
  prompt += '    → KREDITKONVENTION (vanligast i systemexporter)\n';
  prompt += '  – Är eget kapital angivet som ett POSITIVT tal?\n';
  prompt += '    → NORMAL PRESENTATION\n';
  prompt += '\n';
  prompt += 'Välj rätt formel baserat på konventionen:\n';
  prompt += '\n';
  prompt += '  FALL A – Normal presentation (EK är positivt):\n';
  prompt += '    Årets resultat = Δ EK + Δ Obeskattade reserver\n';
  prompt += '    (Positiv vinst → positivt Δ EK)\n';
  prompt += '\n';
  prompt += '  FALL B – Kreditkonvention (EK är negativt, VANLIGAST):\n';
  prompt += '    Årets resultat = −(Δ EK + Δ Obeskattade reserver)\n';
  prompt += '    (Positiv vinst → negativt Δ EK, dvs. EK-talet minskar/blir mer negativt)\n';
  prompt += '    Minnesregel: positivt Δ EK = EK minskade; negativt Δ EK = EK ökade.\n';
  prompt += '\n';
  prompt += 'Gör så här steg för steg:\n';
  prompt += '  1. Hämta årets resultat ur resultaträkningen (sista raden före\n';
  prompt += '     eventuell "Redovisat resultat"-rad). Positiv = vinst, negativ = förlust.\n';
  prompt += '  2. Kontrollera om EK-beloppet i balansräkningen är positivt eller negativt.\n';
  prompt += '  3. Beräkna Δ EK = UB − IB (utgående saldo minus ingående saldo).\n';
  prompt += '  4. Kontrollera om det finns en sektion "Obeskattade reserver"\n';
  prompt += '     (t.ex. Investeringsfond, Periodiseringsfond).\n';
  prompt += '     – Om JA: beräkna också Δ Obeskattade reserver = UB − IB.\n';
  prompt += '     – Om NEJ: Δ Obeskattade reserver = 0.\n';
  prompt += '  5. Tillämpa Fall A eller Fall B ovan.\n';
  prompt += '  6. Om sambandet stämmer: ✅ Inget varningstecken.\n';
  prompt += '     Om det INTE stämmer: ⚠ Varningstecken – påpeka tydligt och\n';
  prompt += '     förklara vad avvikelsen kan bero på.\n';
  prompt += '\n';
  prompt += 'Verifieringsexempel (kreditkonvention, Fall B):\n';
  prompt += '  Årets resultat = −14 954 kr (förlust)\n';
  prompt += '  Δ EK (UB − IB) = +597 kr   ← EK minskade (positivt Δ i kreditkonvention)\n';
  prompt += '  Δ Investeringsfond (UB − IB) = +14 357 kr ← fonden minskade\n';
  prompt += '  Kontroll: −(+597 + 14 357) = −14 954 ✅\n';
  prompt += '\n';
  prompt += 'OBS: Vissa bokföringssystem avslutar resultaträkningen med en rad\n';
  prompt += '"Redovisat resultat" som nollställer resultatet. Använd resultatet\n';
  prompt += 'FÖRE denna rad (t.ex. "Resultat efter skatter").\n\n';

  prompt += 'STEG 1 – Riskbedömning (utförs alltid)\n';
  prompt += 'Identifiera 2–3 faktorer som bör granskas extra i en fortsatt revision.\n';
  prompt += 'Bedöm riskbilden: låg / måttlig / hög – och motivera.\n\n';

  // Nivå 2-steg läggs bara till om underlag finns
  if (hasBank) {
    prompt += 'STEG 2 – Bankavstämning (kontoutdrag finns)\n';
    prompt += 'Jämför bankens saldo per 31 december ' + year + ' med bokföringens banksaldo.\n';
    prompt += 'De ska stämma exakt. Notera avvikelse om den finns.\n\n';
  } else {
    prompt += 'STEG 2 – Bankavstämning (KAN INTE UTFÖRAS – kontoutdrag saknas)\n';
    prompt += 'Informera användaren om vad bankavstämning är och varför det är viktigt.\n\n';
  }

  if (hasBalancePrev) {
    prompt += 'STEG 4 – Kontinuitetskontroll (föregående års balansräkning finns)\n';
    prompt += 'Kontrollera att IB ' + year + ' = UB ' + (parseInt(year) - 1) + ' för alla konton.\n';
    prompt += 'Avvikelse innebär att siffror kan ha ändrats utan spårbarhet.\n\n';
  } else {
    prompt += 'STEG 4 – Kontinuitetskontroll (KAN INTE UTFÖRAS – föregående balansräkning saknas)\n';
    prompt += 'Förklara vad kontinuitetskontroll innebär och varför det behövs.\n\n';
  }

  if (hasResultPrev) {
    prompt += 'STEG 6 – Jämförelseanalys (föregående års resultaträkning finns)\n';
    prompt += 'Jämför intäkter och kostnader ' + year + ' mot ' + (parseInt(year) - 1) + '.\n';
    prompt += 'Vilka poster förändrades mest? Finns oförklarade avvikelser?\n';
    if (budgetAvailable === 'ja') {
      prompt += 'Budget finns – jämför även utfall mot budget.\n';
    }
    prompt += '\n';
  } else {
    prompt += 'STEG 6 – Jämförelseanalys (BEGRÄNSAD – föregående resultaträkning saknas)\n';
    prompt += 'Kommentera enbart innevarande år. Påpeka att jämförelse mot föregående\n';
    prompt += 'år inte kan göras utan föregående års resultaträkning.\n\n';
  }

  if (hasVerification) {
    prompt += 'STEG 7 – Fordringar och skulder (verifikationslista finns)\n';
    prompt += 'Granska kundfordringar (kto 1510) i detalj:\n';
    prompt += '  - Matcha K-fakturor mot I-betalningar via fakturanummer\n';
    prompt += '  - Identifiera fakturor äldre än 6 månader\n';
    prompt += '  - Kontrollera: UB 1510 = (IB − äldre betalningar) + obetalda årets fakturor\n\n';
  } else {
    prompt += 'STEG 7 – Fordringar och skulder (BEGRÄNSAD – verifikationslista saknas)\n';
    prompt += 'Kommentera bara storleken på kundfordringar och skulder i balansräkningen.\n';
    prompt += 'Påpeka att djupanalys kräver verifikationslista.\n\n';
  }

  // -- Vad som kvarstår för fullständig revision --
  prompt += '━━━ SAKNAS FÖR FULLSTÄNDIG REVISION (NIVÅ 3) ━━━\n';
  prompt += 'Avsluta alltid med att informera om vad som krävs för en fullständig revision:\n';
  prompt += '  - Steg 5: Verifikationslista + enskilda kvitton (stickprov)\n';
  prompt += '  - Steg 8: Verifikationslista (bedrägerikontroll)\n';
  prompt += '  - Steg 9: Styrelseprotokoll + verksamhetsberättelse (förvaltningsgranskning)\n';
  prompt += '  - Steg 10: Revisionsberättelse (formellt slutdokument)\n\n';

  // -- Sammanfattning --
  prompt += '━━━ SAMMANFATTNING ━━━\n';
  prompt += 'Avsluta med en kort sammanfattning (max 10 meningar) för en person\n';
  prompt += 'utan ekonomisk bakgrund:\n';
  prompt += '  1. Vilken analysnivå genomfördes och varför?\n';
  prompt += '  2. Är ekonomin i grunden sund?\n';
  prompt += '  3. Viktigaste fynd (positiva och negativa)\n';
  prompt += '  4. De tre viktigaste nästa stegen\n\n';

  // -- Ekonomiska underlag --
  prompt += '━━━ EKONOMISKA UNDERLAG ━━━\n';
  if (financialData) {
    prompt += financialData;
  } else {
    prompt += '(Inga underlag inklistrade – användaren bifogar PDF-filerna\n';
    prompt += ' direkt i detta Claude-samtal. Granska de bifogade filerna.)\n';
  }

  return prompt;
}


/**
 * Builds the English version of the audit analysis prompt.
 * Called automatically by buildPrompt() when LANG === 'en'.
 * @returns {string}
 */
function buildPromptEng() {
  // Read form data
  const orgName           = document.getElementById('org-name').value.trim();
  const year              = document.getElementById('year').value.trim();
  const accountingSystem  = document.getElementById('accounting-system').value;
  const treasurerChanged  = document.getElementById('treasurer-changed').value;
  const budgetAvailable   = document.getElementById('budget').value;
  const financialData     = document.getElementById('financial-data').value.trim();

  // Available documents
  const hasResultCurrent  = document.getElementById('doc-result-current').checked;
  const hasBalanceCurrent = document.getElementById('doc-balance-current').checked;
  const hasResultPrev     = document.getElementById('doc-result-prev').checked;
  const hasBalancePrev    = document.getElementById('doc-balance-prev').checked;
  const hasVerification   = document.getElementById('doc-verification').checked;
  const hasBank           = document.getElementById('doc-bank').checked;

  const level = calculateLevel();

  // Build document list for the prompt
  const docList = [];
  if (hasResultCurrent)  docList.push('Income statement year ' + year);
  if (hasBalanceCurrent) docList.push('Balance sheet year ' + year);
  if (hasResultPrev)     docList.push('Income statement year ' + (parseInt(year) - 1));
  if (hasBalancePrev)    docList.push('Balance sheet year ' + (parseInt(year) - 1));
  if (hasVerification)   docList.push('Voucher list year ' + year);
  if (hasBank)           docList.push('Bank statement as of 31 December ' + year);

  let prompt = '';

  // -- Role and context --
  prompt += 'You are acting as an auditor and financial reviewer of a small non-profit\n';
  prompt += 'organisation in Sweden. You are knowledgeable but pedagogical – you always\n';
  prompt += 'explain terms in a way that is understandable without an accounting background.\n\n';

  prompt += 'The framework you follow:\n';
  prompt += 'https://kentlundgren.github.io/foreningar/KalmarNation/revision/generellt_eng.html\n\n';

  // -- Organisation details --
  prompt += '━━━ ORGANISATION DETAILS ━━━\n';
  prompt += 'Organisation:       ' + orgName + '\n';
  prompt += 'Financial year:     ' + year + '\n';
  prompt += 'Accounting system:  ' + accountingSystem + '\n';

  // Warning if treasurer has changed
  if (treasurerChanged === 'ja') {
    prompt += '\n⚠ NOTE: The treasurer / financial officer has been replaced in the past year.\n';
    prompt += '  Risk: knowledge and context may have been lost during the handover.\n';
    prompt += '  Request documents for AT LEAST TWO YEARS BACK to ensure continuity.\n';
  }

  // Budget
  if (budgetAvailable === 'ja') {
    prompt += '\nA budget for the financial year exists – compare actual figures against budget in Step 6.\n';
  } else if (budgetAvailable === 'nej') {
    prompt += '\nNo approved budget exists for the financial year.\n';
  }

  // -- Available documents and review level --
  prompt += '\n━━━ AVAILABLE DOCUMENTS (Review Level ' + level + ') ━━━\n';
  docList.forEach(function (doc) {
    prompt += '  ✓ ' + doc + '\n';
  });

  if (level === 1) {
    prompt += '\nLevel 1 – Basic analysis: perform Step 1 (risk assessment) and Step 3\n';
    prompt += '(result = change in equity). Clearly state what cannot be analysed\n';
    prompt += 'and what additional documents would enable.\n';
  } else if (level === 2) {
    prompt += '\nLevel 2 – Extended analysis: perform Steps 1, 2, 3, 4, 6 and 7.\n';
    prompt += 'State what remains for a complete Level 3 audit.\n';
  }

  // -- Review instructions --
  prompt += '\n━━━ REVIEW INSTRUCTIONS ━━━\n\n';

  // Update 2026-04-20: extended explanation of the credit-sign convention
  // Steps 3 and 1 are always performed
  prompt += 'STEP 3 – Result = change in equity (always performed)\n';
  prompt += '\n';
  prompt += '⚠ IMPORTANT – SIGN CONVENTION IN THE BALANCE SHEET:\n';
  prompt += 'In all Swedish accounting systems (Fortnox, Visma, Bokio, etc.),\n';
  prompt += 'liabilities and equity are credit accounts and are shown with a\n';
  prompt += 'NEGATIVE sign in exported reports. This means that when equity\n';
  prompt += 'INCREASES (e.g. after a profit), the figure in the balance sheet\n';
  prompt += 'becomes a LARGER negative number.\n';
  prompt += 'Example: equity grows from 50,000 → shown as −50,000 → −60,000.\n';
  prompt += '\n';
  prompt += 'First identify the sign convention:\n';
  prompt += '  – Is equity shown as a NEGATIVE number in the balance sheet?\n';
  prompt += '    → CREDIT CONVENTION (most common in system exports)\n';
  prompt += '  – Is equity shown as a POSITIVE number?\n';
  prompt += '    → NORMAL PRESENTATION\n';
  prompt += '\n';
  prompt += 'Apply the correct formula:\n';
  prompt += '\n';
  prompt += '  CASE A – Normal presentation (equity is positive):\n';
  prompt += '    Year\'s result = Δ Equity + Δ Untaxed reserves\n';
  prompt += '    (Profit → positive Δ equity)\n';
  prompt += '\n';
  prompt += '  CASE B – Credit convention (equity is negative, MOST COMMON):\n';
  prompt += '    Year\'s result = −(Δ Equity + Δ Untaxed reserves)\n';
  prompt += '    (Profit → negative Δ equity, i.e. the figure decreases / becomes more negative)\n';
  prompt += '    Memory rule: positive Δ equity = equity decreased; negative Δ equity = equity increased.\n';
  prompt += '\n';
  prompt += 'Step-by-step procedure:\n';
  prompt += '  1. Take the year\'s result from the income statement (last line before\n';
  prompt += '     any "Reported result" closing entry). Positive = profit, negative = loss.\n';
  prompt += '  2. Check whether the equity figure in the balance sheet is positive or negative.\n';
  prompt += '  3. Calculate Δ equity = closing balance − opening balance.\n';
  prompt += '  4. Check whether the balance sheet has an "Untaxed reserves" section\n';
  prompt += '     (e.g. Investment fund, Appropriations reserve / periodiseringsfond).\n';
  prompt += '     – If YES: also calculate Δ untaxed reserves = closing − opening.\n';
  prompt += '     – If NO:  Δ untaxed reserves = 0.\n';
  prompt += '  5. Apply Case A or Case B above.\n';
  prompt += '  6. If the relationship holds: ✅ No warning sign.\n';
  prompt += '     If it does NOT hold: ⚠ Warning sign – state this clearly and\n';
  prompt += '     explain what the discrepancy could indicate.\n';
  prompt += '\n';
  prompt += 'Verification example (credit convention, Case B):\n';
  prompt += '  Year\'s result = −14,954 (loss)\n';
  prompt += '  Δ equity (closing − opening) = +597  ← equity decreased (positive Δ in credit convention)\n';
  prompt += '  Δ investment fund (closing − opening) = +14,357  ← fund decreased\n';
  prompt += '  Check: −(+597 + 14,357) = −14,954 ✅\n';
  prompt += '\n';
  prompt += 'NOTE: Some accounting systems close the income statement with a\n';
  prompt += '"Reported result" line that resets the result to zero. Use the result\n';
  prompt += 'BEFORE that line (e.g. "Result after taxes").\n\n';

  prompt += 'STEP 1 – Risk assessment (always performed)\n';
  prompt += 'Identify 2–3 factors that warrant extra scrutiny in a continued audit.\n';
  prompt += 'Assess the overall risk level: low / moderate / high – and justify.\n\n';

  // Level 2 steps – only if documents are available
  if (hasBank) {
    prompt += 'STEP 2 – Bank reconciliation (bank statement available)\n';
    prompt += 'Compare the bank balance as of 31 December ' + year + ' with the\n';
    prompt += 'balance shown in the accounts. They must match exactly.\n\n';
  } else {
    prompt += 'STEP 2 – Bank reconciliation (CANNOT BE PERFORMED – bank statement missing)\n';
    prompt += 'Explain what bank reconciliation is and why it matters.\n\n';
  }

  if (hasBalancePrev) {
    prompt += 'STEP 4 – Continuity check (previous year\'s balance sheet available)\n';
    prompt += 'Verify that the opening balance (OB) of ' + year + ' equals the closing\n';
    prompt += 'balance (CB) of ' + (parseInt(year) - 1) + ' for all accounts.\n';
    prompt += 'Any discrepancy means figures may have been changed without a trace.\n\n';
  } else {
    prompt += 'STEP 4 – Continuity check (CANNOT BE PERFORMED – previous balance sheet missing)\n';
    prompt += 'Explain what the continuity check means and why it is needed.\n\n';
  }

  if (hasResultPrev) {
    prompt += 'STEP 6 – Comparative analysis (previous year\'s income statement available)\n';
    prompt += 'Compare revenue and costs in ' + year + ' against ' + (parseInt(year) - 1) + '.\n';
    prompt += 'Which items changed most? Are there unexplained variances?\n';
    if (budgetAvailable === 'ja') {
      prompt += 'A budget exists – also compare actual figures against budget.\n';
    }
    prompt += '\n';
  } else {
    prompt += 'STEP 6 – Comparative analysis (LIMITED – previous income statement missing)\n';
    prompt += 'Comment on the current year only. Note that year-on-year comparison\n';
    prompt += 'is not possible without the previous year\'s income statement.\n\n';
  }

  if (hasVerification) {
    prompt += 'STEP 7 – Receivables and liabilities (voucher list available)\n';
    prompt += 'Review accounts receivable in detail:\n';
    prompt += '  - Match customer invoices against payment entries via invoice number\n';
    prompt += '  - Identify invoices older than 6 months\n';
    prompt += '  - Verify: CB acc. receivable = (OB − payments of prior invoices) + unpaid current invoices\n\n';
  } else {
    prompt += 'STEP 7 – Receivables and liabilities (LIMITED – voucher list missing)\n';
    prompt += 'Comment only on the size of receivables and liabilities in the balance sheet.\n';
    prompt += 'Note that a detailed analysis requires the voucher list.\n\n';
  }

  // -- What remains for a full audit --
  prompt += '━━━ MISSING FOR A COMPLETE AUDIT (LEVEL 3) ━━━\n';
  prompt += 'Always conclude by stating what is needed for a complete audit:\n';
  prompt += '  - Step 5: Voucher list + individual receipts/invoices (sample checks)\n';
  prompt += '  - Step 8: Voucher list (fraud check)\n';
  prompt += '  - Step 9: Board minutes + activity report (management review)\n';
  prompt += '  - Step 10: Formal audit report (signed by auditor)\n\n';

  // -- Summary --
  prompt += '━━━ SUMMARY ━━━\n';
  prompt += 'Conclude with a brief summary (max 10 sentences) aimed at a person\n';
  prompt += 'without an accounting background:\n';
  prompt += '  1. Which review level was performed and why?\n';
  prompt += '  2. Is the financial position fundamentally sound?\n';
  prompt += '  3. Most important findings (positive and negative)\n';
  prompt += '  4. The three most important next steps\n\n';

  // -- Financial documents --
  prompt += '━━━ FINANCIAL DOCUMENTS ━━━\n';
  if (financialData) {
    prompt += financialData;
  } else {
    prompt += '(No documents pasted – the user will attach PDF files directly\n';
    prompt += ' in this Claude conversation. Please review the attached files.)\n';
  }

  return prompt;
}


/* =========================================================================
   4. VISA RESULTAT OCH KOPIERINGSKNAPP
   ========================================================================= */

/**
 * Visar resultatrutan med den genererade prompten.
 * @param {string} prompt - Den färdiga prompttexten
 */
function showResult(prompt) {
  const resultSection = document.getElementById('result-section');
  const promptOutput  = document.getElementById('prompt-output');

  // Lägger prompten i textarea och visar rutan
  promptOutput.value = prompt;
  resultSection.classList.remove('hidden');

  // Scrollar ned till resultatet så användaren ser det
  resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Kopieringsknapp – kopierar prompten till urklipp
document.getElementById('copy-btn').addEventListener('click', function () {
  const promptOutput  = document.getElementById('prompt-output');
  const copyConfirm   = document.getElementById('copy-confirm');

  // Väljer texten och kopierar (navigator.clipboard kräver https)
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(promptOutput.value).then(function () {
      showCopyConfirm(copyConfirm);
    });
  } else {
    // Fallback för äldre webbläsare eller http-miljö
    promptOutput.select();
    document.execCommand('copy');
    showCopyConfirm(copyConfirm);
  }
});

/**
 * Visar "Kopierad!"-bekräftelse och döljer den efter 2,5 sekunder.
 * @param {HTMLElement} el - Elementet som ska visas
 */
function showCopyConfirm(el) {
  el.classList.remove('hidden');
  setTimeout(function () {
    el.classList.add('hidden');
  }, 2500);
}


/* =========================================================================
   5. [FAS 2] FORMSPREE-INTEGRATION – filuppladdning direkt på sidan
   =========================================================================
   När du är redo att aktivera Formspree:
     1. Skapa ett konto på https://formspree.io (gratisnivå räcker)
     2. Skapa ett nytt formulär och kopiera det genererade form-ID:t
     3. Ersätt 'FORMSPREE_ID' nedan med ditt ID (t.ex. 'xpwzabcd')
     4. Kommentera bort 'return;' på raden under och aktivera koden

   När Formspree är aktiverat:
     - Lägg till <input type="file" name="attachment" multiple> i HTML-formuläret
     - Ändra form action till 'https://formspree.io/f/FORMSPREE_ID'
     - Formspree skickar automatiskt e-post till kent@kentlundgren.se
       med uppladdade filer bifogade
   ========================================================================= */

// const FORMSPREE_ENDPOINT = 'https://formspree.io/f/FORMSPREE_ID';
//
// function submitToFormspree(formData) {
//   return; // Ta bort denna rad för att aktivera
//
//   fetch(FORMSPREE_ENDPOINT, {
//     method: 'POST',
//     body: formData,
//     headers: { 'Accept': 'application/json' }
//   })
//   .then(function(response) {
//     if (response.ok) {
//       alert('Din beställning har skickats! Kent återkommer inom kort.');
//     } else {
//       alert('Något gick fel. Skicka mejl direkt till kent@kentlundgren.se');
//     }
//   })
//   .catch(function() {
//     alert('Nätverksfel. Skicka mejl direkt till kent@kentlundgren.se');
//   });
// }


/* =========================================================================
   6. [FAS 2] ZAPIER/MAKE – X DM-NOTIFIERING TILL @kentlundgren
   =========================================================================
   När du är redo att aktivera Zapier-notifiering:
     1. Skapa ett konto på https://zapier.com (gratisnivå räcker för liten volym)
     2. Skapa ett nytt Zap:
          Trigger:  "Webhooks by Zapier" → "Catch Hook"
          Action:   "Twitter/X" → "Send Direct Message" till @kentlundgren
     3. Kopiera webhook-URL:n från Zapier
     4. Ersätt 'ZAPIER_WEBHOOK_URL' nedan med din URL
     5. Kommentera bort 'return;' på raden under och aktivera koden

   OBS: Zapiers gratisnivå är begränsad till 100 tasks/månad.
        Vid hög volym – uppgradera eller byt till Make (make.com).
   ========================================================================= */

// const ZAPIER_WEBHOOK = 'https://hooks.zapier.com/hooks/catch/ZAPIER_WEBHOOK_URL';
//
// function notifyViaZapier(orgName, year, level) {
//   return; // Ta bort denna rad för att aktivera
//
//   const message = 'Ny revisionsförfrågan: ' + orgName + ' (' + year + '), Nivå ' + level;
//
//   fetch(ZAPIER_WEBHOOK, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ message: message, org: orgName, year: year, level: level })
//   })
//   .catch(function(err) {
//     // Tyst fel – notifiering är inte kritisk för användarupplevelsen
//     console.warn('Zapier-notifiering misslyckades:', err);
//   });
// }
