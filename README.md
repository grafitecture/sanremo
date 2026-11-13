# San Remo – Ristorante a Mannheim dal 1977

Website **sanremo.ma** – Restaurantkonzept und Vermietung der Räume Beilstraße 3, 68159 Mannheim-Jungbusch.
Herausgeberin (Impressum, Datenschutz): **Grafitecture GmbH**, Mannheim. „San Remo Mannheim – Ristorante a Mannheim dal 1977“
ist eine Marke der Grafitecture GmbH. Statische Seite ohne Framework, ausgeliefert über **Vercel**.

> Diese Webseite ist rein fiktiv und dient nur zur Anschauung. Herausgegeben von der Grafitecture GmbH.

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
  expose/                ← Texte (content.mjs) und Fotos des Exposés (seit 11.11.2026 nicht mehr auf der Website)
kit/grafitecture-credit/ ← Grafitecture-Feld (Kit v1.2, unverändert aus grafitecture/lannee_webseite, README dort)
```

## Farben: Rot #DB042C, Weiß, Dunkelgrün #042720 – eine Ausnahme

Die Website nutzt nur Rot, Weiß und Dunkelgrün (#042720 statt Schwarz, Token in `main.css`).
**Einzige Ausnahme ist das Grafitecture-Feld** ganz unten in Impressum und Datenschutz: Fläche Lime #dafd55,
Schrift und Logo #435960, Linie weiß, höchstens 403 px breit. Farben und Größe gehören der Agentur und werden
**nicht** an San Remo angepasst. Das Feld kommt unverändert aus dem Kit `kit/grafitecture-credit/`;
Änderungen nur im Kit (grafitecture/lannee_webseite) machen, dann den Ordner hierher kopieren und `node tools/build.mjs` laufen lassen.

## Befehle

```bash
node tools/build.mjs     # src/*.html -> public/*.html (Partials, Bilder, Cache-Busting, Grafitecture-Feld + dessen CSS in main.css)
node tools/pdf.mjs       # PDFs neu erzeugen (nach Änderungen an menu-data.js)
node tools/expose.mjs    # Exposé-PDF erzeugen, nur noch nach dist-expose/ (nicht auf der Website, nicht im Repo)
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
| „Das Haus“: Einleitung und Eckdaten „Auf einen Blick“ (Fläche, Plätze, Laufzeit …) | `src/index.html` (Artikel `#eckdaten` und Block `glance`) und `aff.*` in `i18n.js` |
| Ansprechpartner Vermietung (Eric Schweppe: Telefon, E-Mail) | `src/index.html` (Block `#ansprechpartner` am Ende der Vermietung) und `aff.contact*` in `i18n.js` (EN/IT, inkl. Betreff der E-Mail) |
| Störer „Diese Webseite ist rein fiktiv und dient nur zur Anschauung. Herausgegeben von der Grafitecture GmbH.“ (rotes Band ganz oben und ganz unten auf jeder Seite; ab 720 px einzeilig, darunter zwei, unter 364 px drei Zeilen) | `src/partials/header.html` (oben) und `src/partials/footer.html` (unten), EN/IT unter `fiction.note` in `i18n.js`, Gestaltung `.fiction` in `main.css` |
| Startbildschirm „Schalter“ (nur Startseite, bei jedem Aufruf): Logo weiß auf Rot, alter Kippschalter auf SPENTO; Klick, Tippen, Enter oder Leertaste schaltet auf ACCESO, dann blendet der rote Bildschirm aus und das Neon im Hero flackert an. Ohne JavaScript erscheint er nicht; lädt `schalter.js` nicht, gibt sich die Seite beim Laden selbst frei | Markup `src/partials/schalter.html` (eingebunden in `src/index.html` direkt nach dem Sprite), Klasse `sr-off` per Skript im `<head>` von `src/index.html`, Ablauf und Klick-Geräusch in `public/assets/js/schalter.js` (Zeiten in `switchOn`), Gestaltung `.splash` / `.switch` in `main.css`, EN/IT `switch.label` in `i18n.js`. Abschalten: Include und Skript aus `src/index.html` entfernen, `node tools/build.mjs` |
| Exposé | Seit 11.11.2026 nicht mehr auf der Website (Abschnitt, Styles, Texte und PDF entfernt). Der Generator bleibt: `tools/expose/content.mjs`, Fotos in `tools/expose/photos/`, `node tools/expose.mjs` → `dist-expose/` |
| Grafitecture-Feld (Lime-Fläche mit Logo, „Marken mit KI.“, Link auf https://www.grafitecture.de/ in neuem Fenster), letztes Element in Impressum und Datenschutz, je Sprachblock | Platzhalter `<!--#gt-credit de-->` (bzw. `en`, `it`) in `src/impressum.html` und `src/datenschutz.html`; `tools/build.mjs` setzt `grafitectureCredit(sprache)` aus `kit/grafitecture-credit/grafitecture-credit.mjs` ein und kopiert `grafitecture-credit.css` unverändert als letzten Block in `main.css` (zwischen den Markern, dort nichts von Hand ändern). Italienisch kennt das Kit nicht, dort erscheint das Feld auf Englisch. Neue Kit-Version: Ordner `kit/grafitecture-credit/` ersetzen, `node tools/build.mjs` |
| Impressum und Datenschutz (Grafitecture GmbH, Stand 11.11.2026) | `src/impressum.html`, `src/datenschutz.html` (DE/EN/IT in einer Datei), danach `node tools/build.mjs` |
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

Hero: füllt zusammen mit dem Störer darüber immer 100 % der Höhe (`100svh` minus `--fiction-h`, die Höhe des Störers misst ein kleines Skript in `header.html`, `ui.js` hält sie aktuell), Art Direction: 9:16 (Phone hochkant), 3:4 (Tablet hochkant), 4:3 (quer).
Der Header ist `sticky`: Er steht unter dem Störer und dockt beim Scrollen oben an.

## Deployment (GitHub → Vercel)

1. Repository in Vercel importieren (Framework: *Other*, kein Build-Command – `vercel.json` setzt `public` als Ausgabeordner).
2. Domain `sanremo.ma` in Vercel unter *Settings → Domains* hinzufügen und die angezeigten DNS-Einträge beim Domain-Anbieter setzen.
3. Jeder Push auf `main` geht automatisch live.

## Datenschutz-Hinweise zur Technik

- Reservierung und Kontakt: kein Server, es wird eine E-Mail (mailto) im Programm der Besucher vorbereitet.
- Karte (OpenStreetMap) lädt erst nach Klick. Schriften lokal.
- Google Analytics 4 (`G-HHZ2G13CDF`) nur mit Einwilligung: Vor „Akzeptieren“ wird nichts von Google geladen und kein Cookie gesetzt. Google Signale und Werbepersonalisierung sind aus. „Ablehnen“ (auch später über „Cookie-Einstellungen“ im Footer) stoppt die Messung und löscht die `_ga`-Cookies. Im Claude-Artefakt gibt es weder Hinweis noch Tracking.
- Sprachwahl (`sr-lang`) und Cookie-Entscheidung (`sr-consent`, mit Datum, nach 12 Monaten neue Abfrage) liegen nur im `localStorage` des Browsers.
