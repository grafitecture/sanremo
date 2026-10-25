// Generates the menu and allergen chart PDFs (DE/EN/IT) from public/assets/js/menu-data.js
// Usage: node tools/pdf.mjs   ->  public/downloads/San-Remo-{Speisekarte|Allergenkarte}-{DE|EN|IT}.pdf
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const here = path.dirname(fileURLToPath(import.meta.url));
const PUB = path.join(here, '..', 'public');
const OUT = path.join(PUB, 'downloads');
const { MENU, ALLERGENS, ADDITIVES, MENU_TEXT, formatPrice, volLabel } = await import(pathToFileURL(path.join(PUB, 'assets/js/menu-data.js')).href);

const b64 = (f) => fs.readFileSync(path.join(PUB, f)).toString('base64');
const FONTS = `
@font-face{font-family:"LG";src:url(data:font/woff2;base64,${b64('assets/fonts/league-gothic-semicondensed.woff2')}) format("woff2");}
@font-face{font-family:"RB";src:url(data:font/woff2;base64,${b64('assets/fonts/roboto-regular.woff2')}) format("woff2");}
@font-face{font-family:"PW";font-weight:300;src:url(data:font/woff2;base64,${b64('assets/fonts/playwrite-it-trad-light.woff2')}) format("woff2");}`;
const LOGO_D = fs.readFileSync(path.join(PUB, 'assets/logo/logo-red.svg'), 'utf8').match(/ d="([^"]+)"/)[1];
const logo = (fill, cls) => `<svg class="${cls}" viewBox="0 0 2082 486"><path fill="${fill}" fill-rule="evenodd" d="${LOGO_D}"/></svg>`;
const CHILI = '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="#DB042C" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7.2 20c6 0 11-5 11-11 0-1.4-.9-2.4-2.3-2.4-1.3 0-2 .9-2.5 2.4-1 3.4-4.1 6.5-7.6 8-1.6.7-1.2 3 1.4 3z"/><path d="M15.9 6.6c0-1.7.8-3 2.4-3.6"/></svg>';
const HERO = `data:image/jpeg;base64,${b64('assets/img/hero-land-1440.jpg')}`;
const esc = (v) => String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const T = {
  de: {
    code: 'DE', carta: 'La Carta', addr: 'Beilstraße 3, 68159 Mannheim-Jungbusch', hours: 'Donnerstag, Freitag & Samstag ab 18 Uhr',
    reserve: 'Reservierung per E-Mail oder telefonisch während unserer Öffnungszeiten',
    legend: 'Zeichenerklärung', codes: 'Buchstaben: Allergene, Zahlen in Klammern: Zusatzstoffe (siehe Allergenkarte)',
    fiction: 'Konzeptkarte zur Darstellung des Restaurantkonzepts San Remo. Diese Webseite und Karte dienen zur reinen Darstellung und sind fiktiv.',
    acTitle: 'Allergene & Zusatzstoffe', acIntro: 'Kennzeichnung der 14 Hauptallergene nach Lebensmittelinformations-Verordnung (LMIV) und der kennzeichnungspflichtigen Zusatzstoffe.',
    dish: 'Gericht', mark: 'enthalten', add: 'Zusatz­stoffe', alc: 'Alkohol', veg: 'Vegetarisch', vegan: 'Vegan', tip: 'Empfehlung des Hauses',
  },
  en: {
    code: 'EN', carta: 'La Carta', addr: 'Beilstraße 3, 68159 Mannheim-Jungbusch', hours: 'Thursday, Friday & Saturday from 6 pm',
    reserve: 'Book by email or by phone during our opening hours',
    legend: 'Key', codes: 'Letters: allergens, numbers in brackets: additives (see allergen chart)',
    fiction: 'Concept menu presenting the San Remo restaurant concept. This website and menu are for demonstration purposes only and are fictional.',
    acTitle: 'Allergens & additives', acIntro: 'Labelling of the 14 main allergens under the EU Food Information Regulation (FIC) and of additives that must be declared.',
    dish: 'Dish', mark: 'contains', add: 'Additives', alc: 'Alcohol', veg: 'Vegetarian', vegan: 'Vegan', tip: 'House recommendation',
  },
  it: {
    code: 'IT', carta: 'La Carta', addr: 'Beilstraße 3, 68159 Mannheim-Jungbusch', hours: 'Giovedì, venerdì e sabato dalle 18',
    reserve: 'Prenotazioni via e-mail o per telefono durante gli orari di apertura',
    legend: 'Legenda', codes: 'Lettere: allergeni, numeri tra parentesi: additivi (vedi tabella allergeni)',
    fiction: 'Menù concept che presenta il ristorante San Remo. Questo sito web e il menù hanno scopo puramente dimostrativo e sono fittizi.',
    acTitle: 'Allergeni & additivi', acIntro: 'Indicazione dei 14 allergeni principali secondo il Regolamento UE sulle informazioni alimentari e degli additivi da dichiarare.',
    dish: 'Piatto', mark: 'contiene', add: 'Additivi', alc: 'Alcol', veg: 'Vegetariano', vegan: 'Vegano', tip: 'Consiglio della casa',
  },
};
const tx = (o, l) => (o ? o[l] ?? o.de : '');

/* ------------------------------ menu ------------------------------ */
function menuHtml(lang) {
  const t = T[lang];
  const priceHtml = (it) => it.prices
    ? it.prices.map(([v, p]) => `<span class="pr"><small>${esc(volLabel(v, lang))}</small>${formatPrice(p, lang)}</span>`).join('')
    : `<span class="pr">${it.vol ? `<small>${esc(volLabel(it.vol, lang))}</small>` : ''}${formatPrice(it.price, lang)}</span>`;
  const codes = (it) => {
    const a = (it.a || []).join(', '); const z = (it.z || []).length ? `(${it.z.join(', ')})` : '';
    return a || z ? ` <span class="codes">${[a, z].filter(Boolean).join(' ')}</span>` : '';
  };
  const badges = (it) => [
    it.note ? `<span class="note">${esc(tx(it.note, lang))}</span>` : '',
    it.diet === 'veg' ? '<span class="b">V</span>' : '', it.diet === 'vegan' ? '<span class="b">VG</span>' : '',
    it.hot ? `<span class="b b--hot">${CHILI}</span>` : '', it.tags?.includes('liguria') ? '<span class="lig">Liguria</span>' : '',
  ].join('');
  const dish = (it) => `<div class="dish">${it.tags?.includes('consiglio') ? `<p class="tip">${esc(tx(MENU_TEXT.consiglio, lang))}</p>` : ''}`
    + `<div class="top"><span class="nm">${esc(it.name)}</span><span class="ld"></span>${priceHtml(it)}</div>`
    + `<p class="ds">${esc(tx(it.desc, lang))}${codes(it)}${badges(it) ? ` <span class="bd">${badges(it)}</span>` : ''}</p></div>`;
  const secHtml = (sec) => `<section class="sec">
      <header class="sec__h"><h2>${esc(sec.title.it)}</h2><p class="hand">${esc(tx(sec.sub, lang))}</p></header>
      ${sec.groups.map((g) => `<div class="grp">${g.title ? `<h3>${esc(tx(g.title, lang))}${g.note ? ` <span class="hand">${esc(tx(g.note, lang))}</span>` : ''}</h3>` : ''}<div class="cols">${g.items.map(dish).join('')}</div></div>`).join('')}
    </section>`;
  const byId = Object.fromEntries(MENU.map((m) => [m.id, m]));
  const photo = (file, pos = '50% 50%', cls = '') => `<div class="photo ${cls}" style="background-image:url(data:image/jpeg;base64,${b64('assets/img/' + file)});background-position:${pos}"></div>`;
  // explicit pages keep related sections together and avoid half-empty sheets
  const PAGES = [
    [secHtml(byId.antipasti), secHtml(byId.insalate), photo('menu-antipasti-p45-960.jpg', '50% 62%', 'photo--short')],
    [secHtml(byId.pizza)],
    [secHtml(byId.pasta), photo('menu-pasta-p45-960.jpg', '50% 55%')],
    [secHtml(byId.dolci), photo('menu-dolci-p45-960.jpg', '50% 40%')],
    [secHtml(byId.bevande)],
  ];
  const sections = PAGES.map((pg) => `<div class="pg">${pg.join('')}</div>`).join('');
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><style>${FONTS}
  @page { size: A4; margin: 15mm 15mm 14mm; }
  @page :first { margin: 0; }
  * { box-sizing: border-box; }
  html, body { margin: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font-family: RB, sans-serif; font-size: 8.2pt; line-height: 1.4; color: #042720; }
  .hand { font-family: PW, cursive; font-weight: 300; }
  .cover { position: relative; width: 210mm; height: 297mm; overflow: hidden; background: #DB042C; color: #fff; break-after: page; }
  .cover__img { position: absolute; left: 0; right: 0; top: 0; height: 64%; background: url(${HERO}) 50% 40% / cover; }
  .cover__img::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(4,39,32,.15) 0%, rgba(4,39,32,0) 45%, rgba(219,4,44,.85) 92%, #DB042C 100%); }
  .cover__body { position: absolute; left: 0; right: 0; bottom: 18mm; text-align: center; }
  .cover__logo { width: 140mm; height: auto; margin: 0 auto 4mm; display: block; }
  .cover__hand { font-size: 15pt; margin: 0 0 7mm; }
  .cover__title { font-family: LG; font-size: 54pt; letter-spacing: .08em; text-transform: uppercase; line-height: 1; margin: 0 0 9mm; }
  .cover__info { font-family: LG; font-size: 12pt; letter-spacing: .08em; text-transform: uppercase; line-height: 1.5; margin: 0; }
  .cover__small { font-size: 8.5pt; margin: 3mm 0 0; opacity: .9; }
  .pg { break-before: page; }
  .sec + .sec { margin-top: 9mm; }
  .photo { margin-top: 8mm; height: 78mm; background-size: cover; break-inside: avoid; }
  .photo--short { height: 52mm; margin-top: 7mm; }
  .sec__h { text-align: center; margin: 0 0 6mm; break-after: avoid; }
  .sec__h h2 { font-family: LG; font-weight: 400; color: #DB042C; font-size: 34pt; letter-spacing: .08em; text-transform: uppercase; margin: 0; line-height: 1; }
  .sec__h .hand { font-size: 12pt; margin: 2mm 0 0; }
  .sec__h::after { content: ""; display: block; height: 2px; margin: 5mm auto 0; width: 100%;
    background-image: radial-gradient(circle, rgba(4,39,32,.55) .9px, transparent 1.2px); background-size: 6px 2px; background-repeat: repeat-x; }
  .grp + .grp { margin-top: 5mm; }
  .grp h3 { font-family: LG; font-weight: 400; font-size: 17pt; letter-spacing: .06em; text-transform: uppercase; margin: 0 0 3mm; padding-bottom: 1.5mm; border-bottom: 1.5pt solid #042720; break-after: avoid; }
  .grp h3 .hand { font-size: 10pt; letter-spacing: 0; text-transform: none; margin-left: 2mm; }
  .cols { column-count: 2; column-gap: 11mm; }
  .dish { break-inside: avoid; padding: 1.7mm 0 1.9mm; border-bottom: .5pt solid rgba(4,39,32,.16); }
  .tip { font-family: PW; font-weight: 300; color: #DB042C; font-size: 9pt; margin: 0 0 .5mm; }
  .top { display: flex; align-items: flex-end; gap: 2mm; }
  .nm { font-family: LG; font-size: 12.5pt; letter-spacing: .04em; text-transform: uppercase; color: #DB042C; line-height: 1.05; }
  .ld { flex: 1; border-bottom: 1.2pt dotted rgba(4,39,32,.4); margin-bottom: 1.4mm; min-width: 4mm; }
  .pr { font-family: LG; font-size: 12.5pt; letter-spacing: .03em; line-height: 1.05; white-space: nowrap; }
  .pr + .pr { margin-left: 3mm; }
  .pr small { font-family: RB; font-size: 7pt; letter-spacing: 0; color: rgba(4,39,32,.6); margin-right: 1mm; }
  .ds { margin: 1mm 0 0; color: rgba(4,39,32,.72); }
  .codes { font-size: 7pt; letter-spacing: .05em; color: rgba(4,39,32,.6); white-space: nowrap; }
  .bd { display: inline-flex; flex-wrap: wrap; gap: 1mm; margin-left: 1mm; vertical-align: middle; }
  .b { display: inline-flex; align-items: center; justify-content: center; min-width: 4.4mm; height: 4.4mm; padding: .3mm 1.2mm 0; border: .8pt solid #042720; border-radius: 3mm; font-family: LG; font-size: 8.5pt; line-height: 1; }
  .b--hot { border-color: #DB042C; padding: 0 .8mm; }
  .ico { width: 3.6mm; height: 3.6mm; }
  .lig { display: inline-flex; align-items: center; height: 4.4mm; padding: .4mm 2mm 0; border-radius: 3mm; background: #DB042C; color: #fff; font-family: LG; font-size: 8.5pt; letter-spacing: .08em; text-transform: uppercase; }
  .note { font-size: 7pt; color: rgba(4,39,32,.6); align-self: center; }
  .back { break-before: page; }
  .back h2 { font-family: LG; font-weight: 400; color: #DB042C; font-size: 22pt; letter-spacing: .07em; text-transform: uppercase; margin: 0 0 4mm; }
  .key { display: flex; flex-wrap: wrap; gap: 3mm 8mm; margin: 0 0 8mm; align-items: center; }
  .key span { display: inline-flex; align-items: center; gap: 2mm; }
  .key .tipk { font-family: PW; font-weight: 300; color: #DB042C; font-size: 10pt; }
  .lists { display: grid; grid-template-columns: 1fr 1fr; gap: 10mm; margin-bottom: 8mm; }
  .lists h3 { font-family: LG; font-weight: 400; font-size: 14pt; letter-spacing: .06em; text-transform: uppercase; margin: 0 0 2mm; }
  .lists ul { list-style: none; padding: 0; margin: 0; }
  .lists li { display: grid; grid-template-columns: 6mm 1fr; padding: .7mm 0; border-bottom: .5pt solid rgba(4,39,32,.12); }
  .lists b { font-family: LG; font-weight: 400; font-size: 10.5pt; }
  .fine { color: rgba(4,39,32,.72); margin: 0 0 3mm; }
  .contact { margin-top: 10mm; padding-top: 6mm; border-top: 1.5pt solid #042720; display: flex; justify-content: space-between; align-items: flex-end; gap: 10mm; }
  .contact .logo { width: 60mm; height: auto; }
  .contact p { margin: 0; text-align: right; }
  .fiction { margin-top: 6mm; font-size: 7pt; color: rgba(4,39,32,.6); text-align: center; }
  </style></head><body>
  <div class="cover">
    <div class="cover__img"></div>
    <div class="cover__body">
      ${logo('#fff', 'cover__logo')}
      <p class="cover__hand hand">Ristorante a Mannheim dal 1977</p>
      <h1 class="cover__title">${t.carta}</h1>
      <p class="cover__info">${esc(t.addr)}<br>${esc(t.hours)}</p>
      <p class="cover__small">ciao@sanremo.ma &nbsp;|&nbsp; 0621 43744258 &nbsp;|&nbsp; sanremo.ma</p>
    </div>
  </div>
  ${sections}
  <section class="back">
    <h2>${esc(t.legend)}</h2>
    <div class="key">
      <span><span class="b">V</span>${esc(tx(MENU_TEXT.veg, lang))}</span>
      <span><span class="b">VG</span>${esc(tx(MENU_TEXT.vegan, lang))}</span>
      <span><span class="b b--hot">${CHILI}</span>${esc(tx(MENU_TEXT.hot, lang))}</span>
      <span><span class="lig">Liguria</span>${esc(tx(MENU_TEXT.liguria, lang))}</span>
      <span><span class="tipk">${esc(tx(MENU_TEXT.consiglio, lang))}</span>${esc(t.tip)}</span>
    </div>
    <p class="fine">${esc(t.codes)}</p>
    <div class="lists">
      <div><h3>${esc(tx(MENU_TEXT.allergens, lang))}</h3><ul>${ALLERGENS.map((a) => `<li><b>${a.code}</b><span>${esc(a[lang])}</span></li>`).join('')}</ul></div>
      <div><h3>${esc(tx(MENU_TEXT.additives, lang))}</h3><ul>${ADDITIVES.map((z) => `<li><b>${z.n}</b><span>${esc(z[lang])}</span></li>`).join('')}</ul></div>
    </div>
    <p class="fine">${esc(tx(MENU_TEXT.disclaimer, lang))} ${esc(tx(MENU_TEXT.ask, lang))}</p>
    <p class="fine">${esc(tx(MENU_TEXT.prices, lang))} ${esc(tx(MENU_TEXT.stand, lang))}</p>
    <div class="contact">${logo('#DB042C', 'logo')}<p><b>San Remo</b><br>${esc(t.addr)}<br>${esc(t.hours)}<br>${esc(t.reserve)}<br>ciao@sanremo.ma &nbsp;|&nbsp; 0621 43744258</p></div>
    <p class="fiction">${esc(t.fiction)}</p>
  </section>
  </body></html>`;
}

/* --------------------------- allergen chart --------------------------- */
function allergenHtml(lang) {
  const t = T[lang];
  const head = `<tr><th class="c-dish">${esc(t.dish)}</th>`
    + ALLERGENS.map((a) => `<th class="c-a"><span class="vh"><b>${a.code}</b> ${esc(a.short[lang])}</span></th>`).join('')
    + `<th class="c-a c-x"><span class="vh">${esc(t.alc)}</span></th><th class="c-a c-x"><span class="vh">${esc(t.veg)}</span></th><th class="c-a c-x"><span class="vh">${esc(t.vegan)}</span></th><th class="c-z">${t.add}</th></tr>`;
  const dot = (on) => (on ? '<i class="dot"></i>' : '');
  const rows = MENU.map((sec) => {
    const items = sec.groups.flatMap((g) => g.items.map((it) => ({ it, g })));
    return `<tr class="sec"><th colspan="${ALLERGENS.length + 5}">${esc(sec.title.it)}</th></tr>`
      + items.map(({ it }) => `<tr><td class="c-dish"><span class="nm">${esc(it.name)}</span>${it.note ? ` <small>${esc(tx(it.note, lang))}</small>` : ''}</td>`
        + ALLERGENS.map((a) => `<td>${dot((it.a || []).includes(a.code))}</td>`).join('')
        + `<td>${dot(it.alc)}</td><td>${dot(it.diet === 'veg' || it.diet === 'vegan')}</td><td>${dot(it.diet === 'vegan')}</td>`
        + `<td class="c-z">${(it.z || []).join(', ')}</td></tr>`).join('');
  }).join('');
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><style>${FONTS}
  @page { size: A4 landscape; margin: 11mm 12mm 11mm; }
  * { box-sizing: border-box; }
  html, body { margin: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font-family: RB, sans-serif; font-size: 7.6pt; line-height: 1.3; color: #042720; }
  .hd { display: flex; align-items: flex-end; justify-content: space-between; gap: 10mm; margin-bottom: 5mm; }
  .hd .logo { width: 46mm; height: auto; }
  .hd h1 { font-family: LG; font-weight: 400; font-size: 26pt; letter-spacing: .07em; text-transform: uppercase; color: #DB042C; margin: 0; line-height: 1; }
  .hd p { margin: 1.5mm 0 0; color: rgba(4,39,32,.7); max-width: 150mm; }
  .hd .hand { font-family: PW; font-weight: 300; font-size: 10pt; color: #042720; margin: 0 0 1mm; }
  table { width: 100%; border-collapse: collapse; table-layout: fixed; }
  thead { display: table-header-group; }
  th, td { border-bottom: .5pt solid rgba(4,39,32,.16); padding: .75mm 0; text-align: center; vertical-align: middle; }
  thead th { border-bottom: 1.5pt solid #042720; vertical-align: bottom; font-weight: 400; }
  .c-dish { width: 58mm; text-align: left; padding-right: 2mm; }
  thead .c-dish { font-family: LG; font-size: 11pt; letter-spacing: .06em; text-transform: uppercase; }
  .c-a { width: 8.6mm; height: 27mm; }
  .c-x { background: rgba(4,39,32,.035); }
  .c-z { width: 20mm; font-size: 7.4pt; }
  thead .c-z { font-family: LG; font-size: 9.5pt; letter-spacing: .05em; text-transform: uppercase; }
  .vh { display: inline-block; writing-mode: vertical-rl; transform: rotate(180deg); white-space: nowrap; font-size: 7.4pt; text-align: left; }
  .vh b { font-family: LG; font-weight: 400; font-size: 10pt; color: #DB042C; }
  tr.sec th { text-align: left; background: #DB042C; color: #fff; font-family: LG; font-weight: 400; font-size: 11pt; letter-spacing: .08em; text-transform: uppercase; padding: 1.2mm 2mm .8mm; border: 0; }
  tbody tr { break-inside: avoid; }
  tbody td:nth-child(n+16):nth-child(-n+18) { background: rgba(4,39,32,.035); }
  .nm { font-family: LG; font-size: 10pt; letter-spacing: .03em; text-transform: uppercase; }
  td small { color: rgba(4,39,32,.6); font-size: 6.6pt; }
  .dot { display: inline-block; width: 2.4mm; height: 2.4mm; border-radius: 50%; background: #DB042C; vertical-align: middle; }
  .ft { margin-top: 6mm; display: grid; grid-template-columns: 1.1fr 1fr 1.2fr; gap: 8mm; break-inside: avoid; }
  .ft h2 { font-family: LG; font-weight: 400; font-size: 12pt; letter-spacing: .06em; text-transform: uppercase; margin: 0 0 1.5mm; }
  .ft ul { list-style: none; padding: 0; margin: 0; columns: 2; column-gap: 5mm; }
  .ft li { padding: .4mm 0; }
  .ft li b { font-family: LG; font-weight: 400; font-size: 9pt; color: #DB042C; display: inline-block; width: 4.5mm; }
  .ft p { margin: 0 0 2mm; color: rgba(4,39,32,.75); }
  .fiction { margin-top: 3mm; font-size: 6.8pt; color: rgba(4,39,32,.6); }
  </style></head><body>
  <div class="hd">
    <div><p class="hand">Ristorante a Mannheim dal 1977</p><h1>${esc(t.acTitle)}</h1><p>${esc(t.acIntro)} <i class="dot" style="vertical-align:-.3mm"></i> = ${esc(t.mark)}</p></div>
    ${logo('#DB042C', 'logo')}
  </div>
  <table><thead>${head}</thead><tbody>${rows}</tbody></table>
  <div class="ft">
    <div><h2>${esc(tx(MENU_TEXT.allergens, lang))}</h2><ul>${ALLERGENS.map((a) => `<li><b>${a.code}</b>${esc(a[lang])}</li>`).join('')}</ul></div>
    <div><h2>${esc(tx(MENU_TEXT.additives, lang))}</h2><ul>${ADDITIVES.map((z) => `<li><b>${z.n}</b>${esc(z[lang])}</li>`).join('')}</ul></div>
    <div><h2>San Remo</h2><p>${esc(tx(MENU_TEXT.disclaimer, lang))} ${esc(tx(MENU_TEXT.ask, lang))}</p><p>${esc(tx(MENU_TEXT.stand, lang))}</p><p class="fiction">${esc(t.fiction)}</p></div>
  </div>
  </body></html>`;
}

const browser = await chromium.launch();
const page = await browser.newPage();
fs.mkdirSync(OUT, { recursive: true });
for (const lang of ['de', 'en', 'it']) {
  for (const [name, html, landscape] of [['Speisekarte', menuHtml(lang), false], ['Allergenkarte', allergenHtml(lang), true]]) {
    await page.setContent(html, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    const file = path.join(OUT, `San-Remo-${name}-${T[lang].code}.pdf`);
    await page.pdf({ path: file, printBackground: true, preferCSSPageSize: true, landscape });
    console.log(`${path.basename(file)}  ${(fs.statSync(file).size / 1024).toFixed(0)} KB`);
  }
}
await browser.close();
