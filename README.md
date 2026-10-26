# San Remo – Ristorante a Mannheim dal 1977

Website **sanremo.ma** – Restaurantkonzept und Vermietung der Räume Beilstraße 3, 68159 Mannheim-Jungbusch
(Schweppe & Schweppe KG). Statische Seite ohne Framework, ausgeliefert über **Vercel**.

> Diese Webseite dient zur reinen Darstellung und ist fiktiv.

## Aufbau

```
public/                  ← wird 1:1 von Vercel ausgeliefert (siehe vercel.json)
  index.html             ← gebaut aus src/index.html
  impressum.html, datenschutz.html, 404.html
  assets/css/main.css    ← Design-Tokens, Typo-Skala (clamp), Breakpoints
  assets/js/
    i18n.js              ← Sprachumschalter, EN/IT-Texte (DE steht im HTML)
    menu-data.js         ← Speisekarte + Allergene/Zusatzstoffe (eine Quelle für Seite und PDFs)
    menu.js, booking.js, ui.js, main.js
    consent.js           ← Cookie-Hinweis, lädt Google Analytics 4 erst nach „Akzeptieren“
  assets/img/            ← responsive Bilder (AVIF + JPEG, Desktop- und Mobil-Zuschnitte)
  assets/fonts/          ← League Gothic SemiCondensed, Roboto, Playwrite IT Trad (lokal, OFL)
  downloads/             ← Speisekarte und Allergenkarte als PDF (DE/EN/IT)
src/                     ← HTML-Quellen + Partials (Header, Footer, Icons)
tools/                   ← Build-Skripte
```

## Befehle

```bash
node tools/build.mjs     # src/*.html -> public/*.html (Partials, Bilder, Cache-Busting)
node tools/pdf.mjs       # PDFs neu erzeugen (nach Änderungen an menu-data.js)
node tools/images.mjs <rot-ordner> <solide-ordner>   # Bilder neu rechnen (ONLY=hero,neon für einzelne)
python3 tools/fonts.py   # Schriften neu subsetten (WOFF2)
python3 tools/grade.py <BILDER_ROT> <ziel>            # Rottöne exakt auf #DB042C anpassen
node tools/artifact.mjs  # Kopie für ein Claude-Artefakt in dist-artifact/ (relative Pfade, Schriften eingebettet, nur JPEG)
```

`tools/*.mjs` benötigen `sharp` bzw. `playwright` (z. B. `npm i -D sharp playwright`).

## Häufige Änderungen

| Was | Wo |
| --- | --- |
| Deutsche Texte | `src/index.html` (danach `node tools/build.mjs`) |
| Englische / italienische Texte | `public/assets/js/i18n.js` (gleicher Schlüssel wie `data-i18n` im HTML) |
| Gerichte, Preise, Allergene | `public/assets/js/menu-data.js`, danach `node tools/pdf.mjs` |
| E-Mail-Empfänger für Reservierung und Kontakt | `public/assets/js/booking.js` → `MAIL_TO` |
| Eckdaten Vermietung (Fläche, Plätze, Miete) | `src/index.html` (Block `keyfacts`) und `aff.*` in `i18n.js` |
| Suchmaschinen freischalten | `<meta name="robots" content="noindex, follow">` in `src/*.html` entfernen |
| Google-Analytics-ID | `public/assets/js/consent.js` → `GA_ID` (derzeit `G-HHZ2G13CDF`); Cookie-Hinweis in `src/partials/consent.html`, EN/IT unter `consent.*` in `i18n.js` |
| Alle erneut um Einwilligung bitten (z. B. neuer Dienst) | `VERSION` in `public/assets/js/consent.js` erhöhen und Datenschutzerklärung anpassen |

## Breakpoints

| ab | Gerät | Änderung |
| --- | --- | --- |
| 30em / 480 px | große Phones | Hero-Infozeile einzeilig |
| 48em / 768 px | Tablet hochkant | Bild/Text-Flächen nebeneinander, Galerie als Mosaik |
| 64em / 1024 px | Tablet quer, Laptop | Desktop-Navigation, Schnellzugriff rechts, Speisekarte mit Sticky-Bild |
| 90em / 1440 px | Desktop | Typo-Skala erreicht Vorgabewerte, wächst danach bis 2560 px weiter |
| 120em / 1920 px | große Screens | Social-Feed in einer Reihe |

Hero: immer 100 % Höhe (`100svh`), Art Direction: 9:16 (Phone hochkant), 3:4 (Tablet hochkant), 4:3 (quer).

## Deployment (GitHub → Vercel)

1. Repository in Vercel importieren (Framework: *Other*, kein Build-Command – `vercel.json` setzt `public` als Ausgabeordner).
2. Domain `sanremo.ma` in Vercel unter *Settings → Domains* hinzufügen und die angezeigten DNS-Einträge beim Domain-Anbieter setzen.
3. Jeder Push auf `main` geht automatisch live.

## Datenschutz-Hinweise zur Technik

- Reservierung und Kontakt: kein Server, es wird eine E-Mail (mailto) im Programm der Besucher vorbereitet.
- Karte (OpenStreetMap) lädt erst nach Klick. Schriften lokal.
- Google Analytics 4 (`G-HHZ2G13CDF`) nur mit Einwilligung: Vor „Akzeptieren“ wird nichts von Google geladen und kein Cookie gesetzt. Google Signale und Werbepersonalisierung sind aus. „Ablehnen“ (auch später über „Cookie-Einstellungen“ im Footer) stoppt die Messung und löscht die `_ga`-Cookies. Im Claude-Artefakt gibt es weder Hinweis noch Tracking.
- Sprachwahl (`sr-lang`) und Cookie-Entscheidung (`sr-consent`, mit Datum, nach 12 Monaten neue Abfrage) liegen nur im `localStorage` des Browsers.
