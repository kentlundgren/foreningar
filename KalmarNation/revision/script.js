/**
 * Kalmar Nation revision – översiktssida
 * Uppdatering: sidan laddar statiskt innehåll; script används för enkel footer-info.
 * ES2023: inget krav här; vid framtida utökning kan t.ex. Array.prototype.toSorted användas om det passar.
 */
(function () {
  "use strict";

  var el = document.getElementById("footer-year");
  if (el) {
    el.textContent = String(new Date().getFullYear());
  }
})();
