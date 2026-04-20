/* =========================================================================
   splash.js – Logik för introduktionsskärm ("säljande flash")
   Version 1.0 · 2026-04-20
   Fristående fil – påverkar INTE script.js eller befintlig funktionalitet.

   Flöde:
     1. Sidan laddas → splash-overlay syns direkt
     2. Budskapen visas ett i taget med fade-in/fade-out
     3. På sista budskapet visas en CTA-knapp ("Kom igång")
     4. Klick på knappen (eller "Hoppa över") → overlay tonas ut
   ========================================================================= */

'use strict';

/* -------------------------------------------------------------------------
   Budskapen som ska visas i ordning
   Varje objekt: { heading, sub }
   heading = stor rubriktext (kan innehålla <em> för accent)
   sub     = förklarande mening under rubriken
   ------------------------------------------------------------------------- */
const SPLASH_SLIDES = [
  {
    heading: 'Testa att granska din förening',
    sub:     'Revisionsverktyget guider dig steg för steg – utan krav på ekonomiutbildning.'
  },
  {
    heading: '<em>Gratis</em> AI-analys av era räkenskaper',
    sub:     'Ladda upp eller klistra in siffror – AI:n identifierar avvikelser och risker på sekunder.'
  },
  {
    heading: 'Grundanalys på under 10 minuter',
    sub:     'Räcker det? Välj grundnivån och få svar direkt – eller fördjupa dig när du är redo.'
  },
  {
    heading: 'Eller: en mer grundlig analys?',
    sub:     'Revisionsverktyget erbjuder tre nivåer – anpassa djupet efter föreningens behov.'
  }
];

/* -------------------------------------------------------------------------
   Inställningar – justera tiderna här om du vill
   ------------------------------------------------------------------------- */
const TIMING = {
  visibleMs:    2800,   /* Hur länge varje budskap syns (ms) */
  transitionMs:  600,   /* Fade-tid (ms) – ska matcha CSS transition */
  autoAdvance:  true    /* false = bara manuell navigering via prickar */
};

/* -------------------------------------------------------------------------
   Interna variabler
   ------------------------------------------------------------------------- */
let currentSlide = 0;
let timer        = null;
let overlay      = null;

/* =========================================================================
   init() – körs när DOM är klar
   ========================================================================= */
function initSplash() {

  overlay = document.getElementById('splash-overlay');
  if (!overlay) return; /* Säkerhetskoll – gör inget om overlay saknas */

  /* --- Bygg upp slides och prickar dynamiskt ----------------------------- */
  const messageArea = overlay.querySelector('.splash-message-area');
  const dotsWrapper  = overlay.querySelector('.splash-dots');
  const ctaBtn       = overlay.querySelector('.splash-cta');
  const skipBtn      = overlay.querySelector('.splash-skip');

  /* Skapa en .splash-slide för varje budskap */
  SPLASH_SLIDES.forEach((slide, idx) => {
    const el = document.createElement('div');
    el.className = 'splash-slide';
    el.setAttribute('aria-hidden', idx !== 0 ? 'true' : 'false');
    el.innerHTML = `<h2>${slide.heading}</h2><p>${slide.sub}</p>`;
    /* Uppdatering 2026-04-20: ctaBtn ligger nu utanför messageArea –
       slides läggs direkt till med appendChild istället */
    messageArea.appendChild(el);

    /* Skapa en klickbar prick för varje slide */
    const dot = document.createElement('button');
    dot.className = 'splash-dot';
    dot.setAttribute('aria-label', `Visa budskap ${idx + 1}`);
    dot.addEventListener('click', () => goToSlide(idx));
    dotsWrapper.appendChild(dot);
  });

  /* --- Visa första slide ------------------------------------------------- */
  goToSlide(0);

  /* --- Starta auto-advance om aktiverat ---------------------------------- */
  if (TIMING.autoAdvance) startTimer();

  /* --- Knapphanterare ---------------------------------------------------- */
  if (ctaBtn)  ctaBtn.addEventListener('click',  closeSplash);
  if (skipBtn) skipBtn.addEventListener('click',  closeSplash);

  /* Tillgänglighet: Escape-tangenten stänger splash */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeSplash();
  });
}

/* =========================================================================
   goToSlide(idx) – byt till ett specifikt budskap
   ========================================================================= */
function goToSlide(idx) {
  const slides = overlay.querySelectorAll('.splash-slide');
  const dots   = overlay.querySelectorAll('.splash-dot');
  const ctaBtn = overlay.querySelector('.splash-cta');

  /* Ta bort .active från nuvarande slide och prick */
  slides[currentSlide]?.classList.remove('active');
  slides[currentSlide]?.setAttribute('aria-hidden', 'true');
  dots[currentSlide]?.classList.remove('active');

  currentSlide = idx;

  /* Aktivera ny slide och prick */
  slides[currentSlide]?.classList.add('active');
  slides[currentSlide]?.setAttribute('aria-hidden', 'false');
  dots[currentSlide]?.classList.add('active');

  /* Visa CTA-knappen bara på sista slide */
  const isLast = currentSlide === SPLASH_SLIDES.length - 1;
  if (ctaBtn) {
    ctaBtn.classList.toggle('visible', isLast);
  }
}

/* =========================================================================
   startTimer() – startar auto-advance av slides
   ========================================================================= */
function startTimer() {
  clearTimeout(timer); /* Rensa eventuell pågående timer */
  timer = setTimeout(() => {
    const nextIdx = currentSlide + 1;
    if (nextIdx < SPLASH_SLIDES.length) {
      goToSlide(nextIdx);
      startTimer(); /* Rekursiv: starta nästa timer direkt */
    }
    /* Om vi är på sista slide stannar vi – användaren klickar CTA */
  }, TIMING.visibleMs);
}

/* =========================================================================
   closeSplash() – tona ut overlay:n och ta bort den från DOM
   ========================================================================= */
function closeSplash() {
  clearTimeout(timer);

  /* Lägg till CSS-klassen som triggar opacity:0 + visibility:hidden */
  overlay.classList.add('hidden');

  /* Ta bort elementet från DOM efter att övergångstiden gått ut */
  setTimeout(() => {
    overlay.remove();
  }, 850); /* Något längre än CSS transition (0.8s) */
}

/* =========================================================================
   Starta när DOM är klar
   ========================================================================= */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSplash);
} else {
  /* DOMContentLoaded har redan hänt (t ex om scriptet laddas defer/async) */
  initSplash();
}
