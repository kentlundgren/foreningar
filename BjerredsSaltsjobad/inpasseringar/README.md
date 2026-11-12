# Inpasseringar – Bjerreds Saltsjöbad

- **Live:** [https://kentlundgren.github.io/foreningar/BjerredsSaltsjobad/inpasseringar/](https://kentlundgren.github.io/foreningar/BjerredsSaltsjobad/inpasseringar/)

Statistik över hur många som går in i kallbadhuset och bastun i Bjärred, med sidor för att se, redigera och tolka siffrorna. En inpassering är en gång genom grinden: armbandet öppnade den 2024, nu öppnar Wondr-appen (föreningens system för medlemmar och betalning) eller en biljett den. Samma person räknas varje gång hen kommer.

Siffrorna lagras i **Firebase Realtime Database** (Googles molndatabas) och läses av sidorna när de öppnas. Alla sidor är statiska HTML-filer utan byggsteg och publiceras på GitHub Pages.

## Sidorna

| Sida | Vad den gör |
|---|---|
| [index.html](https://kentlundgren.github.io/foreningar/BjerredsSaltsjobad/inpasseringar/index.html) | Statistiken: summerat för 2024 och 2025 samt **LÅT** (löpande årstal, de 12 senaste hela månaderna), månadsdiagram för tre år och uppdelning per kategori. Ombyggnaden 2025 och ofullständiga månader är markerade. |
| [data.html](https://kentlundgren.github.io/foreningar/BjerredsSaltsjobad/inpasseringar/data.html) | Redigerbar tabell. Alla kan läsa, men för att ändra ett värde måste man logga in (Firebase Authentication). Här läggs nya månader in. |
| [trangsel.html](https://kentlundgren.github.io/foreningar/BjerredsSaltsjobad/inpasseringar/trangsel.html) | Hur fullt det är i bastun före och efter ombyggnaden: bastubilder, fyra tal, reglage för antaganden, månadsdiagram och en tabell som visar beräkningen. |
| [engangsintraden.html](https://kentlundgren.github.io/foreningar/BjerredsSaltsjobad/inpasseringar/engangsintraden.html) | Engångsinträden 2026 (betalda via Wondr utan medlemskap). Besökarna visas med koder i stället för namn. |
| [databas.html](https://kentlundgren.github.io/foreningar/BjerredsSaltsjobad/inpasseringar/databas.html) | Arbetsdokument om hur statistiken kopplades till Firebase: steg, konfiguration och migrationsskript. |

## Övriga filer

| Fil | Vad den är |
|---|---|
| [data.md](https://github.com/kentlundgren/foreningar/blob/main/BjerredsSaltsjobad/inpasseringar/data.md) | Läsbar referenstabell med alla siffror, som backup. Hålls lika med sidorna. |
| [og_trangsel.py](https://github.com/kentlundgren/foreningar/blob/main/BjerredsSaltsjobad/inpasseringar/og_trangsel.py) | Python-skript (Pillow) som ritar delningsbilden för trängselsidan. |
| [og-inpasseringar.jpg](https://kentlundgren.github.io/foreningar/BjerredsSaltsjobad/inpasseringar/og-inpasseringar.jpg), [og-engangsintraden.jpg](https://kentlundgren.github.io/foreningar/BjerredsSaltsjobad/inpasseringar/og-engangsintraden.jpg), [og-trangsel.jpg](https://kentlundgren.github.io/foreningar/BjerredsSaltsjobad/inpasseringar/og-trangsel.jpg) | Delningsbilder (1200 × 630 px) som visas när en länk delas. De är ritade av skript och uppdateras inte av sig själva. |
| [Firebase/](https://github.com/kentlundgren/foreningar/tree/main/BjerredsSaltsjobad/inpasseringar/Firebase) | Skärmdumpar från uppsättningen av Firebase-projektet. |
| [index copy.html](https://kentlundgren.github.io/foreningar/BjerredsSaltsjobad/inpasseringar/index%20copy.html), [data copy.html](https://kentlundgren.github.io/foreningar/BjerredsSaltsjobad/inpasseringar/data%20copy.html) | Arbetskopior som inte används och inte uppdateras. |

## Så hänger siffrorna ihop

- **Datakälla:** Firebase, noden `bjerred-inpasseringar`. Läsning kräver ingen inloggning, skrivning gör det.
- **Reservkopia:** `index.html` och `data.html` har samma siffror inbyggda som `BASE_DATA` och visar dem om Firebase inte nås. Den inbyggda kopian måste vara identisk i de två filerna. `trangsel.html` och `engangsintraden.html` har ingen egen kopia av hela datan.
- **Kategorier:** Restaurangen/badbiljetter, SMS/Swish-biljetter, Medlemmar – armband och Medlemmar – Wondr. Engångsbadare räknas separat och ingår inte i totalerna.
- **Nollor och luckor:** 0 betyder bekräftat stängt, till exempel mars–juni 2025 då bastun byggdes om. Tomt (null) betyder att siffran inte är rapporterad än, och månaden märks då som preliminär.

## Att tolka siffrorna

- Inpasseringar är besök, inte unika personer. De visar hur mycket som fyller bastun.
- Ombyggnaden: stängt mitten av februari till mitten av juli 2025. Kapaciteten ökade från 36 till 54 platser (+50 %).
- Före och efter kan jämföras på två sätt som ger olika procenttal: samma kalendermånad (aug–jan, +11,0 %) eller LÅT mot helåret 2024 (+12,8 % i antal). Säg alltid vilken som avses.
- Analysen av el, kapacitet och beläggning före och efter ombyggnaden finns i [Bjerred-el](https://kentlundgren.github.io/Bjerred-el/fore_och_efter_ombyggnad.html). Den läser samma Firebase-data.

## Personuppgifter

Sidorna visar bara summerade antal. Besökare på engångssidan har koder (B001 och uppåt). Kopplingen mellan kod och namn finns bara lokalt och ligger inte i repot.

## Uppdatera varje månad

1. Logga in på [data.html](https://kentlundgren.github.io/foreningar/BjerredsSaltsjobad/inpasseringar/data.html) och lägg in den nya månadens siffror.
2. Kör månadssynken ([skillen bjerred-firebase-sync](https://github.com/kentlundgren/foreningar/blob/main/BjerredsSaltsjobad/.cursor/skills/bjerred-firebase-sync/SKILL.md)): den jämför Firebase mot `BASE_DATA` och uppdaterar `index.html`, `data.html` och `data.md`.
3. Delningsbilderna ritas om vid behov, till exempel när LÅT flyttat sig märkbart (se `og_trangsel.py`).

## Repo

- GitHub: https://github.com/kentlundgren/foreningar/tree/main/BjerredsSaltsjobad/inpasseringar
- Lokal sökväg: `C:\Users\kentl\OneDrive\AI\Claude\foreningar\BjerredsSaltsjobad\inpasseringar`
