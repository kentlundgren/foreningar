# Teknisk avläsning – bjerredskallbadhus.se

Avläst 2026-10-04, utifrån. Versionsnummer är de som sidans egen HTML anger.

## Domänkarta

| Domän | Roll | Webb | Namnservrar | E-post (MX) |
|---|---|---|---|---|
| `bjerredskallbadhus.se` | Den faktiska webbplatsen | WordPress, IP `217.160.0.208` | `shades01.rzone.de`, `docks10.rzone.de` | `smtp.rzone.de` |
| `www.bjerredskallbadhus.se` | Alias | CNAME till domänen ovan, 301 till apex | samma | samma |
| `kallbadhus.se` | Omdirigering | IP `152.115.36.105`, 301 till `https://bjerredskallbadhus.se/` | `ns1.intendit.se`, `ns2.intendit.se` | Google (`aspmx.l.google.com` m.fl.) |
| `bjerredssaltsjobad.se` | Omdirigering | IP `152.115.36.105`, 301 till `https://bjerredskallbadhus.se/` | `ns1.intendit.se`, `ns2.intendit.se` | Microsoft 365 (`bjerredssaltsjobad-se.mail.protection.outlook.com`) |

Även `www.` på de två omdirigeringsdomänerna ger 301 till samma mål.

### Anmärkningar
- Båda omdirigeringsdomänerna har SPF-posten `v=spf1 +a +mx +ip4:152.115.36.105 +include:spf.protection.outlook.com -all`. På `kallbadhus.se` är MX hos Google men SPF tillåter Microsoft. Det är en **inkonsekvens** att reda ut om e-post används där: SPF bör matcha den tjänst som faktiskt skickar.
- `bjerredssaltsjobad.se` har en TXT-post `MS=…`, vilket är Microsofts domänverifiering för Microsoft 365.
- Omdirigeringsdomänernas HTTPS-certifikat är utfärdat till `*.bjerredssaltsjobad.se` (Let's Encrypt). Anslutning till `kallbadhus.se` över HTTPS fungerar utan certifikatfel vid avläsningen, men kontrollera vid nästa avläsning att certifikatet täcker båda namnen.
- Omdirigeringen är en 301 (permanent). Webbläsare och sökmotorer cachar den.

## Webbplatsen

- **Motor:** WordPress 7.1.2 (enligt `<meta name="generator">`).
- **Tema:** Celina, med barntema `celina-child`; `celina-framework` som plugin. Temaalternativ via Redux 4.4.0.
- **Sidbyggare:** Elementor 4.3.3 och ElementsKit Lite.
- **Handel och bokning:** WooCommerce 11.1.2, ShopEngine 4.9.6, YITH WooCommerce Wishlist, Bookly 28.4 (med AI-assistentmodul i sitt JS-paket).
- **Formulär:** Contact Form 7, MetForm.
- **Övrigt:** MetaSlider (`ml-slider`), My Sticky Sidebar, Menu Icons.
- **JS i frontend (urval):** jQuery 3.7.1 (+ migrate 3.4.1), React 18.3.1 (WordPress-bundlad), lodash, moment, Font Awesome 4-shims.
- **Spårning/cookies:** inga spår av Google Analytics, Tag Manager, Facebook-pixel eller cookie-banner hittades i startsidans HTML. Kontrollera på riktigt innan integritetspolicyn antas stämma.
- **Externa länkar på startsidan:** Facebook och Instagram (`bjerredssaltsjobad`). Ingen direkt länk till Wondr hittades på startsidan.
- **Server:** `Apache`; svarshuvuden har `X-WS-RateLimit-*`, vilket är hostingleverantörens begränsning. Ingen PHP-version avslöjas i huvudena.
- **Sidor i sitemap:** se `wp-sitemap-posts-page-1.xml`. Dessutom finns inläggstyper för produkter, portfolio och egna mallar (`elementskit_template`, `yolo_footer`).

### Teknisk bedömning (försiktig)
- En byggsats med många tunga plugin (Elementor, WooCommerce, ShopEngine, Bookly, YITH) är **stor för en förenings informationssida**. Den ger mycket JS och CSS, fler uppdateringar att hålla ordning på och större attackyta.
- Om webbshop och bokning inte används: överväg att avaktivera och ta bort dem. Avgör det med den som administrerar sidan innan något tas bort.
- En enklare framtida lösning kan vara en statisk sida (till exempel GitHub Pages) eller ett lättare tema. Det är en möjlig utveckling, inget beslut.

## Så läser du av igen

Kommandona nedan fungerar i en vanlig terminal (PowerShell eller bash). Byt `<domän>`.

```
# DNS
nslookup -type=A <domän>
nslookup -type=MX <domän>
nslookup -type=NS <domän>
nslookup -type=TXT <domän>

# Omdirigeringar och svarshuvuden
curl -sIL https://<domän>/

# Certifikat
openssl s_client -servername <domän> -connect <domän>:443 </dev/null | openssl x509 -noout -issuer -subject -dates

# WordPress-versioner (generator-taggar och plugin-sökvägar i HTML)
curl -sL https://bjerredskallbadhus.se/ | grep -oiE '<meta name="generator"[^>]*>'
curl -sL https://bjerredskallbadhus.se/ | grep -oE 'wp-content/(themes|plugins)/[a-zA-Z0-9_-]+' | sort | uniq -c | sort -rn

# Sidlista
curl -s https://bjerredskallbadhus.se/wp-sitemap-posts-page-1.xml
```

Registeruppgifter (innehavare, registrar, förfallodatum) finns hos Internetstiftelsens domänsök på iis.se. De kunde inte läsas automatiskt vid avläsningen 2026-10-04.

## Äldre historik
Internet Archive (Wayback Machine) har arkiverat `bjerredskallbadhus.se` tidigast i listan över träffar med status 200: **2025-10-08**. Använd arkivet för att jämföra hur sidan förändrats.
