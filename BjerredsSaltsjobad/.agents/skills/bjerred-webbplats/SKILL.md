---
name: bjerred-webbplats
description: Kunskapsunderlag om Bjerreds Saltsjöbads webbplats och domäner (bjerredskallbadhus.se, kallbadhus.se, bjerredssaltsjobad.se). Använd vid frågor om hur webbplatsen är byggd, domäner, DNS, e-post, hosting, leverantörsbyte, uppsägning av domäner eller teknisk utveckling av sidan.
---

# Bjerreds Saltsjöbad – webbplats och domäner

Senast avläst: **2026-10-04**. Allt nedan är avläst utifrån (DNS, HTTP-svar, sidans HTML). Ingen inloggning har använts och ingenting har ändrats. Det som inte kunnat fastställas står som **OKÄNT**. Kontrollera mot källan innan något beslutas.

> **Om utformningen:** Skillen är medvetet gjord så allmängiltig och verktygsneutral som vi kunde göra den den här dagen (2026-10-04). Den är vanlig Markdown med bara `name` och `description` i frontmatter, utan verktygsspecifika kommandon, så att olika AI-verktyg (Claude Code, Cursor, Grok Build med flera) kan läsa samma fil. Innehållet ligger här (`.agents/skills/`) och en tunn pekare finns i `.claude/skills/`. Se `references/utformning.md`.

## Kortversion

- Den riktiga webbplatsen är **`https://bjerredskallbadhus.se/`**. Det är en **WordPress-sajt** (tema Celina, byggd med Elementor, WooCommerce och Bookly). Den ligger på en annan leverantör än fakturan i frågan.
- **`kallbadhus.se`** och **`bjerredssaltsjobad.se`** (inklusive `www.`) svarar med **301-omdirigering** till `https://bjerredskallbadhus.se/`. De är alltså inga egna webbplatser.
- Båda omdirigeringsdomänerna använder namnservrar hos **Intendit** (`ns1/ns2.intendit.se`).
- **Viktigt:** båda har även **e-post kopplad**. `bjerredssaltsjobad.se` pekar MX mot Microsoft 365 (Exchange Online) och `kallbadhus.se` pekar MX mot Google. Att säga upp eller låta domänerna löpa ut kan alltså stänga av e-postadresser, inte bara omdirigeringen.
- Wondr (betalning/inpassering) ligger på en egen subdomän hos Wondr: `bjerredssaltsjobad.wondr.se`. Den är inte beroende av de två domänerna i DNS-hänseende, men kontrollera om utskick eller tryckt material använder dem.

## Rekommendation om domänerna (preliminär)

1. **Säg inte upp något än.** Kartlägg först vilka e-postadresser och vilka system som använder domänerna (se checklistan).
2. **Behåll båda som skyddsdomäner** om e-post eller tryckt material använder dem. De kostar lite per år jämfört med risken att någon annan tar över ett namn som är kopplat till föreningen.
3. **Vid leverantörsbyte: flytta domänerna (transfer)**, säg inte upp dem. Se till att domäninnehavaren är föreningen och inte en enskild person.
4. **Dokumentera allt som ändras** i `references/observationslogg.md` med datum.

### Checklista före uppsägning eller byte
- [ ] Vem är registrerad innehavare för varje domän? (OKÄNT, se nedan)
- [ ] Vilka e-postadresser finns på `@bjerredssaltsjobad.se` och `@kallbadhus.se`? Vem äger Microsoft 365- respektive Google-kontot?
- [ ] Vad levererar Intendit utöver domäner (webbhotell, e-post, DNS)? Vilket avtal ska sägas upp och när?
- [ ] Finns länkar till domänerna i tryckt material, skyltar, QR-koder, sociala medier, Wondr-texter eller bokningsmejl?
- [ ] Vem hanterar DNS idag, och vem får ändra den?
- [ ] Var och hos vem är `bjerredskallbadhus.se` registrerad, och när förnyas den?
- [ ] Finns ett överlämnings-/åtkomstdokument (inloggningar i föreningens lösenordshanterare, inte i repot)?

## Hur webbplatsen är byggd (kort)

Detaljer i [references/teknik.md](references/teknik.md).

- **CMS:** WordPress. **Tema:** Celina med barntema (`celina-child`). **Sidbyggare:** Elementor och ElementsKit.
- **Webshop/bokning:** WooCommerce, ShopEngine, YITH Wishlist och Bookly (bokningsplugin). Webbshop/bokning är aktiverat i koden, men avgör separat om det används på riktigt.
- **Formulär:** Contact Form 7 och MetForm. **Övrigt:** MetaSlider, My Sticky Sidebar, Menu Icons.
- **Server:** Apache bakom en hostingleverantör vars namnservrar är `rzone.de` (Strato-miljön). IP: `217.160.0.208` (IPv4) och `2001:8d8:100f:f000::200` (IPv6).
- **Certifikat:** Sectigo (DV), giltigt 2026-07-18 till 2027-02-01. Omdirigeringsdomänerna har Let's Encrypt (wildcard), giltigt 2026-08-31 till 2026-11-29, vilket tyder på automatisk förnyelse.
- **Sidor:** cirka 30 sidor, till exempel Badet, Bli medlem, Historik, Styrelsen, Dokument, Nyheter, Lunch, Brunch, Vinlista, Evenemang, Konferens, Arrendera, English, Kontakt, Integritetspolicy, Vett o etikett, FAQ, Badvärdar, Aufguss, Årets badare.
- **Standardfiler:** `robots.txt` och `wp-sitemap.xml` finns. REST-API (`/wp-json/`) är öppet, vilket är normalt för WordPress.

## Det som är OKÄNT (kräver att någon med åtkomst kollar)

- Registrar och registrerad innehavare för alla tre domäner (registeruppslagningen kunde inte nås från analysmiljön). Kolla via Internetstiftelsens domänsök på iis.se.
- Vem som administrerar WordPress, vem som har hosting-avtalet för `bjerredskallbadhus.se` och vad det kostar.
- Om WooCommerce/Bookly används, och hur uppdateringar och säkerhetskopior sköts.
- Vilket avtal som just faktureras av Intendit utöver de två domänerna.

## Så underhåller du den här skillen

- Lägg en ny daterad rad i `references/observationslogg.md` varje gång något avläses eller ändras.
- Upprepa avläsningen med kommandona i `references/teknik.md` (avsnittet "Så läser du av igen") och jämför mot loggen. Ändrade leverantörer, IP-adresser, plugin-versioner eller MX-poster är det som visar utvecklingen.
- Inga personnamn, kundnummer, fakturabelopp eller lösenord får skrivas in här. Repot är publikt.
