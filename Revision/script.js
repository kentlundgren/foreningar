/**
 * script.js – Revisionsverktyg för ideella organisationer
 * Version 1.0 · 2026-04-20
 *
 * Innehåll:
 *   1. Nivåindikator – uppdateras dynamiskt när underlag kryssas i/ur
 *   2. Formulärhantering – validering och promptgenerering
 *   3. Promptbyggare – bygger den fullständiga AI-prompten från formulärdata
 *   4. Kopieringsknapp – kopierar prompten till urklipp
 *   5. [FAS 2] Formspree-integration (utkommenterad, klar att aktivera)
 *   6. [FAS 2] Zapier/X DM-notifiering (utkommenterad, klar att aktivera)
 */

'use strict';

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
 */
function updateLevelIndicator() {
  const indicator = document.getElementById('level-indicator');
  const levelText = document.getElementById('level-text');
  const level     = calculateLevel();

  // Tar bort alla nivåfärger och sätter rätt
  indicator.style.background = '';

  if (level === 0) {
    levelText.textContent    = 'Välj minst resultat- och balansräkning för innevarande år';
    indicator.style.background = '#7f8c8d';
  } else if (level === 1) {
    levelText.textContent    = 'Nivå 1 – Grundanalys möjlig (Steg 1 + 3)';
    indicator.style.background = '#1e8449';
  } else if (level === 2) {
    levelText.textContent    = 'Nivå 2 – Utökad analys möjlig (Steg 1–4, 6, 7)';
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

  // Enkel validering – alla obligatoriska fält måste vara ifyllda
  if (!orgName) {
    alert('Ange organisationens namn.');
    document.getElementById('org-name').focus();
    return;
  }
  if (!year || !/^\d{4}$/.test(year)) {
    alert('Ange ett giltigt räkenskapsår (fyra siffror, t.ex. 2025).');
    document.getElementById('year').focus();
    return;
  }
  if (!financialData) {
    alert('Klistra in dina ekonomiska underlag i textfältet.');
    document.getElementById('financial-data').focus();
    return;
  }

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
 * @returns {string} Den färdiga prompttexten
 */
function buildPrompt() {
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
  prompt += 'STEG 3 – Resultat = förändring av eget kapital (utförs alltid)\n';
  prompt += 'Kontrollera att årets resultat stämmer exakt med förändringen av\n';
  prompt += 'eget kapital i balansräkningen. Avvikelse = varningstecken.\n\n';

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
  prompt += financialData;

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
