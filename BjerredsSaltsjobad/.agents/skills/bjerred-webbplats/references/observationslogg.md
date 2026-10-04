# Observationslogg – webbplats och domäner

En rad per avläsning eller ändring, nyast överst. Skriv datum, vad som sågs och källa. Inga personnamn, kundnummer eller belopp.

| Datum | Observation | Källa |
|---|---|---|
| 2026-10-04 | Styrelsen läser `info@kallbadhus.se` och `felanmalan@kallbadhus.se` i Gmails webbgränssnitt. Tillsammans med MX mot Google tyder det på Google Workspace för `kallbadhus.se`. Vem som äger och betalar kontot: OKÄNT (finns inte på Intendits faktura). Intendit är namnserver (styr DNS-posterna) för domänen. | Uppgift från föreningen; DNS |
| 2026-10-04 | `kallbadhus.se` visar sig vara i aktiv användning som e-postdomän: sidfoten på `bjerredskallbadhus.se` anger `info@kallbadhus.se` (föreningen) och `felanmalan@kallbadhus.se` (felanmälan). Omdirigeringsdomänen är alltså kritisk. | Webbplatsens HTML och skärmdump av sidfoten |
| 2026-10-04 | Wondr (Inställningar → Kommunikation → E-post): *Global sender address* = `info@kallbadhus.se`, *Validated domains* = `kallbadhus.se`. Alla Wondr-utskick går alltså från den domänen. Vilka DNS-poster som validerar den: OKÄNT. Inga vanliga DKIM-väljare eller `_dmarc` hittades vid sökning (ej bevis). | Skärmdump av Wondrs inställningar; DNS-sökning |
| 2026-10-04 | Första avläsningen. `bjerredskallbadhus.se` = WordPress 7.1.2, tema Celina, Elementor 4.3.3, WooCommerce 11.1.2, Bookly 28.4. IP `217.160.0.208`, NS `rzone.de`, MX `smtp.rzone.de`. Certifikat Sectigo t.o.m. 2027-02-01. | DNS, HTTP, sidans HTML |
| 2026-10-04 | `kallbadhus.se` och `bjerredssaltsjobad.se` (+ `www.`): 301 till `https://bjerredskallbadhus.se/`. IP `152.115.36.105`, NS `ns1/ns2.intendit.se`. MX: Google respektive Microsoft 365. Let's Encrypt wildcard t.o.m. 2026-11-29. | DNS, HTTP, TLS |
| 2026-10-04 | Föreningen har fått faktura för de två omdirigeringsdomänerna; enligt uppgift betalda t.o.m. september 2027. Innehavare och registrar: OKÄNT. | Uppgift från föreningen |
| 2026-10-04 | Registeruppslagning (RDAP) gick inte att nå från analysmiljön. | Försök misslyckades |
