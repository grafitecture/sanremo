// Generates the rental exposé PDF in the style of the website from tools/expose/content.mjs
// Usage: node tools/expose.mjs   ->  public/downloads/San-Remo-Expose-Beilstrasse-3.pdf
// Every page is a fixed A4 sheet; the script stops if any content overflows its page.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { META, COVER, DATA, REACH, DESCRIPTION, EQUIPMENT, TAKEOVER, LOCATION, CONTACT, GALLERY } from './expose/content.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const here = path.dirname(fileURLToPath(import.meta.url));
const PUB = path.join(here, '..', 'public');
const PHOTOS = path.join(here, 'expose', 'photos');
const OUT = path.join(PUB, 'downloads', META.file);

const b64 = (f) => fs.readFileSync(f).toString('base64');
const FONTS = `
@font-face{font-family:"LG";src:url(data:font/woff2;base64,${b64(path.join(PUB, 'assets/fonts/league-gothic-semicondensed.woff2'))}) format("woff2");}
@font-face{font-family:"RB";src:url(data:font/woff2;base64,${b64(path.join(PUB, 'assets/fonts/roboto-regular.woff2'))}) format("woff2");}
@font-face{font-family:"PW";font-weight:300;src:url(data:font/woff2;base64,${b64(path.join(PUB, 'assets/fonts/playwrite-it-trad-light.woff2'))}) format("woff2");}`;
const LOGO_D = fs.readFileSync(path.join(PUB, 'assets/logo/logo-red.svg'), 'utf8').match(/ d="([^"]+)"/)[1];
const logo = (fill, cls) => `<svg class="${cls}" viewBox="0 0 2082 486" aria-label="San Remo"><path fill="${fill}" fill-rule="evenodd" d="${LOGO_D}"/></svg>`;
const ICON = {
  phone: '<path d="M6.6 3.6l2.7.4 1.3 3.7-1.9 1.5a12.6 12.6 0 0 0 6.1 6.1l1.5-1.9 3.7 1.3.4 2.7a2.3 2.3 0 0 1-2.2 2.2A16.9 16.9 0 0 1 4.4 5.8a2.3 2.3 0 0 1 2.2-2.2z"/>',
  mail: '<rect x="3" y="5.5" width="18" height="13" rx="1.5"/><path d="M3.8 6.8L12 13l8.2-6.2"/>',
  pin: '<path d="M12 21s-6.5-6.1-6.5-11a6.5 6.5 0 0 1 13 0c0 4.9-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/>',
  web: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.4 2.4 3.6 5.2 3.6 8.5s-1.2 6.1-3.6 8.5c-2.4-2.4-3.6-5.2-3.6-8.5s1.2-6.1 3.6-8.5z"/>',
};
const icon = (n) => `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ICON[n]}</svg>`;
const site = (f) => `data:image/jpeg;base64,${b64(path.join(PUB, 'assets/img', f))}`;

/* ------------------------------ photos ------------------------------ */
// width/height straight from the JPEG header (no image library needed)
function jpegSize(file) {
  const b = fs.readFileSync(file);
  let i = 2;
  while (i < b.length) {
    const marker = b[i + 1]; const len = b.readUInt16BE(i + 2);
    if (marker >= 0xC0 && marker <= 0xCF && ![0xC4, 0xC8, 0xCC].includes(marker)) return { w: b.readUInt16BE(i + 7), h: b.readUInt16BE(i + 5) };
    i += 2 + len;
  }
  throw new Error(`no size in ${file}`);
}
const photo = (n) => {
  const file = path.join(PHOTOS, `${String(n).padStart(2, '0')}.jpg`);
  const { w, h } = jpegSize(file);
  return { n, src: `data:image/jpeg;base64,${b64(file)}`, ratio: w / h };
};

/* ------------------------------ gallery layout (mm) ------------------------------ */
// Justified rows: every row fills the full width, so its height follows from the photos' aspect ratios.
// For each page the script tries every way to split the next photos into rows (1–4 per row, in the given order)
// and keeps the split that fills the page best with rows close to the ideal height.
const W = 180;            // content width (A4 minus 2 × 15 mm)
const AVAIL = 253;        // height of the main area of an inner page (+ the gap under the last row)
const GAP = 4;            // between photos in a row
const CAP = 6;            // caption line under a row
const ROW_GAP = 3.5;      // between rows
const GROUP_HEAD = 23;    // group title + hand line
const KICKER = 7;         // "Bildergalerie" above the first group
const IDEAL = 62, MIN_H = 42, MAX_H = 105;
const STRETCH = 1.15;     // rows may grow up to 15 % taller to fill a page (the photos are then cropped at the sides)

const rowHeight = (r) => (W - GAP * (r.length - 1)) / r.reduce((s, p) => s + p.ratio, 0);
const block = (h) => h + CAP + ROW_GAP;

function galleryPages() {
  // one stream of group heads and photos
  const stream = [];
  GALLERY.forEach(([title, hand, list], gi) => {
    stream.push({ type: 'head', title, hand, h: GROUP_HEAD + (gi === 0 ? KICKER : 0), first: gi === 0 });
    for (const [n, cap] of list) stream.push({ type: 'photo', ...photo(n), cap });
  });
  // all splits of a run of photos into rows
  function* splits(run, k = 0) {
    if (k === run.length) { yield []; return; }
    for (let n = 1; n <= 4 && k + n <= run.length; n++) {
      const r = run.slice(k, k + n); const h = rowHeight(r);
      if (h < MIN_H || h > MAX_H) continue;
      for (const rest of splits(run, k + n)) yield [{ items: r, h }, ...rest];
    }
  }
  // best layout of stream[i..j): heads are their own blocks, photo runs between them are split into rows
  function best(i, j) {
    const parts = []; let run = [];
    for (let k = i; k < j; k++) {
      if (stream[k].type === 'head') { if (run.length) parts.push(run); run = []; parts.push(stream[k]); } else run.push(stream[k]);
    }
    if (run.length) parts.push(run);
    if (parts[parts.length - 1].type === 'head') return null;          // no group title at the foot of a page
    let blocks = [[]]; let heights = [0];
    for (const part of parts) {
      if (part.type === 'head') { blocks = blocks.map((b) => [...b, part]); heights = heights.map((h) => h + part.h); continue; }
      const opts = [...splits(part)];
      if (!opts.length) return null;
      const nb = []; const nh = [];
      blocks.forEach((b, x) => opts.forEach((o) => { const h = heights[x] + o.reduce((s, r) => s + block(r.h), 0); if (h <= AVAIL) { nb.push([...b, ...o.map((r) => ({ type: 'row', ...r }))]); nh.push(h); } }));
      blocks = nb; heights = nh;
      if (!blocks.length) return null;
    }
    let top = null;
    blocks.forEach((b, x) => {
      const rows = b.filter((r) => r.type === 'row');
      const dev = rows.reduce((s, r) => s + Math.abs(r.h - IDEAL) / IDEAL, 0) / rows.length;
      const photoH = rows.reduce((s, r) => s + r.h, 0);
      const stretch = Math.min(STRETCH, 1 + (AVAIL - heights[x]) / photoH);
      const used = heights[x] + photoH * (stretch - 1);
      const score = (used / AVAIL) * 4 - dev * 1.5 - (stretch - 1) * 2;
      if (!top || score > top.score) top = { blocks: b, used, score, dev, stretch };
    });
    return top;
  }
  // the photos left over from a group must still split into rows
  const restFits = (j) => {
    const run = [];
    for (let k = j; k < stream.length && stream[k].type === 'photo'; k++) run.push(stream[k]);
    return !run.length || !splits(run).next().done;
  };
  // page breaks for the whole gallery at once: every page as full as possible, rows close to the ideal height
  const memo = new Map();
  const solve = (i) => {
    if (i === stream.length) return { cost: 0, pages: [] };
    if (memo.has(i)) return memo.get(i);
    let sol = null;
    for (let j = i + 1; j <= Math.min(stream.length, i + 14); j++) {
      const b = best(i, j);
      if (!b || !restFits(j)) continue;
      const rest = solve(j);
      if (!rest) continue;
      const cost = (1 - b.used / AVAIL) ** 2 * 30 + b.dev * 3 + (b.stretch - 1) * 4 + 0.5 + rest.cost;
      if (!sol || cost < sol.cost) sol = { cost, pages: [{ blocks: b.blocks, stretch: b.stretch }, ...rest.pages] };
    }
    memo.set(i, sol);
    return sol;
  };
  const sol = solve(0);
  if (process.env.DEBUG) sol.pages.forEach((pg, k) => console.log(k, pg.stretch.toFixed(2), pg.blocks.map((b) => b.type === 'head' ? '['+b.title+']' : '('+b.items.map((p) => p.n).join(',')+':'+b.h.toFixed(0)+')').join(' ')));
  if (!sol) throw new Error('gallery: no layout found');
  const pages = sol.pages;
  return pages;
}

/* ------------------------------ pages ------------------------------ */
const head = (title, hand, cls = '') => `<header class="head ${cls}"><h2>${title}</h2>${hand ? `<p class="hand">${hand}</p>` : ''}</header>`;
const runningHead = () => `<div class="rh">${logo('#DB042C', 'rh__logo')}<span>Exposé · Beilstraße 3, 68159 Mannheim</span></div><div class="dots"></div>`;
const foot = (no) => `<div class="dots"></div><div class="ft"><span>San Remo – Neonlicht im Jungbusch</span><span class="ft__no">${String(no).padStart(2, '0')}</span></div>`;
const inner = (no, body, cls = '') => `<section class="page page--inner ${cls}">${runningHead()}<div class="main">${body}</div>${foot(no)}</section>`;

function cover() {
  return `<section class="page cover">
    <div class="cover__img" style="background-image:url(${site('neon-mid-2048.jpg')})"></div>
    <div class="cover__body">
      ${logo('#fff', 'cover__logo')}
      <p class="cover__sign hand" lang="it">${COVER.sign}</p>
      <h1 class="cover__title">${COVER.title}</h1>
      <p class="cover__kicker">${COVER.kicker}<br>${COVER.address}</p>
      <ul class="cover__facts">${COVER.facts.map(([big, small]) => `<li><b>${big}</b><span>${small}</span></li>`).join('')}</ul>
    </div>
  </section>`;
}

function glancePage(no) {
  return inner(no, `
    ${head('Auf einen Blick', 'Das erwartet Sie')}
    <div class="glance">
      <figure class="glance__fig"><div class="img" style="background-image:url(${site('haus-p34-960.jpg')})"></div><figcaption class="hand">Beilstraße 3, Mannheim-Jungbusch</figcaption></figure>
      <dl class="glance__list">${DATA.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
    </div>
    <h3 class="sub">Erreichbarkeit</h3>
    <ul class="facts">${REACH.map(([big, small]) => `<li><b>${big}</b><span>${small}</span></li>`).join('')}</ul>
    <div class="strip">
      <p class="strip__label">Ihr Ansprechpartner</p>
      <p class="strip__name">${CONTACT.person}</p>
      <p class="strip__lines"><a href="${CONTACT.phoneHref}">${icon('phone')}${CONTACT.phone}</a><a href="${CONTACT.mailHref}">${icon('mail')}${CONTACT.mail}</a></p>
    </div>`);
}

function descriptionPages(no) {
  const p1 = inner(no, `
    <header class="head head--story"><p class="hand">Objektbeschreibung</p><h2>${DESCRIPTION.title}</h2></header>
    <p class="lead">${DESCRIPTION.lead}</p>
    <div class="dots dots--short"></div>
    <div class="cols cols--story">${DESCRIPTION.part1.map((p) => `<p>${p}</p>`).join('')}</div>
    <p class="quote hand">„${DESCRIPTION.quote}“</p>`);
  const p2 = inner(no + 1, `
    <div class="band" style="background-image:url(${site('gastraum-wide-1600.jpg')})"></div>
    <div class="cols cols--story">${DESCRIPTION.part2.map((p) => `<p>${p}</p>`).join('')}</div>`);
  return [p1, p2];
}

function equipmentPage(no) {
  return inner(no, `
    ${head('Ausstattung', 'pronto per partire')}
    <div class="equip">${EQUIPMENT.map(([t, items]) => `<div class="grp"><h3>${t}</h3><ul class="checklist">${items.map((i) => `<li>${i}</li>`).join('')}</ul></div>`).join('')}</div>
    <aside class="note"><h3>Inventar &amp; Ablöse</h3><p>${TAKEOVER}</p></aside>`);
}

function locationPage(no) {
  return inner(no, `
    ${head('Lage', 'Jungbusch, Mannheim')}
    <div class="cols cols--loc">${LOCATION.map(([t, ps]) => `<h3>${t}</h3>${ps.map((p) => `<p>${p}</p>`).join('')}`).join('')}</div>
    <div class="trio">
      <div class="img" style="background-image:url(${site('lage-p34-720.jpg')});background-position:50% 60%"></div>
      <div class="img" style="background-image:url(${photo(35).src})"></div>
      <div class="img" style="background-image:url(${site('eingang-p45-720.jpg')})"></div>
    </div>`);
}

function galleryPage(no, { blocks, stretch }) {
  // stretched rows keep the full width; each photo is cropped at the sides (background-size: cover)
  const body = blocks.map((b) => (b.type === 'head'
    ? `${b.first ? '<p class="gal-kicker hand">Bildergalerie</p>' : ''}${head(b.title, b.hand, 'head--gallery')}`
    : `<div class="row" style="height:${(b.h * stretch + CAP).toFixed(2)}mm">${b.items.map((p) => `<figure style="width:${(b.h * p.ratio).toFixed(2)}mm"><div class="img" style="height:${(b.h * stretch).toFixed(2)}mm;background-image:url(${p.src})"></div><figcaption class="hand">${p.cap}</figcaption></figure>`).join('')}</div>`)).join('');
  return inner(no, body, 'page--gallery');
}

function contactPage(no) {
  return `<section class="page contact">
    <div class="contact__img" style="background-image:url(${photo(5).src})"></div>
    <div class="contact__body">
      <p class="contact__sign hand" lang="it">A presto!</p>
      <h2>${CONTACT.title}</h2>
      ${CONTACT.text.map((p) => `<p>${p}</p>`).join('')}
      <address class="card">
        <p class="card__label">Ihr Ansprechpartner</p>
        <p class="card__name">${CONTACT.person}</p>
        <p class="card__role">${CONTACT.role}</p>
        <a class="card__line" href="${CONTACT.phoneHref}">${icon('phone')}<span>${CONTACT.phone}</span></a>
        <a class="card__line" href="${CONTACT.mailHref}">${icon('mail')}<span>${CONTACT.mail}</span></a>
        <a class="card__line" href="${CONTACT.webHref}">${icon('web')}<span>${CONTACT.web}</span></a>
        <p class="card__line">${icon('pin')}<span>Objekt: Beilstraße 3, 68159 Mannheim</span></p>
      </address>
      <p class="contact__outro">${CONTACT.outro}</p>
    </div>
    <div class="contact__foot">${logo('#DB042C', 'contact__logo')}<a href="https://www.sanremo.ma/">www.sanremo.ma</a><span class="ft__no">${String(no).padStart(2, '0')}</span></div>
  </section>`;
}

/* ------------------------------ document ------------------------------ */
const pages = [cover()];
let no = 2;
pages.push(glancePage(no++));
pages.push(...descriptionPages(no)); no += 2;
pages.push(equipmentPage(no++));
pages.push(locationPage(no++));
galleryPages().forEach((blocks) => pages.push(galleryPage(no++, blocks)));
pages.push(contactPage(no++));

const html = `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>${META.title}</title><style>${FONTS}
@page { size: A4; margin: 0; }
* { box-sizing: border-box; }
html, body { margin: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { font-family: RB, sans-serif; font-size: 9pt; line-height: 1.55; color: #042720; hyphens: auto; }
a { color: inherit; text-decoration: none; }
p { margin: 0 0 2.4mm; }
h1, h2, h3 { margin: 0; font-family: LG; font-weight: 400; text-transform: uppercase; line-height: .95; text-wrap: balance; }
.hand { font-family: PW; font-weight: 300; text-transform: none; letter-spacing: 0; }
.img { background-size: cover; background-position: 50% 50%; background-repeat: no-repeat; }
.dots { height: 2px; flex: none; background-image: radial-gradient(circle, rgba(4,39,32,.55) .9px, transparent 1.2px); background-size: 6px 2px; background-repeat: repeat-x; }
.ico { width: 4.2mm; height: 4.2mm; flex: none; }

.page { position: relative; width: 210mm; height: 297mm; overflow: hidden; break-after: page; }
.page:last-child { break-after: auto; }
.page--inner { display: flex; flex-direction: column; padding: 12mm 15mm 10mm; }
.rh { display: flex; justify-content: space-between; align-items: flex-end; height: 10mm; flex: none; padding-bottom: 3mm; }
.rh__logo { width: 30mm; height: auto; display: block; }
.rh span, .ft { font-family: LG; font-size: 9.5pt; letter-spacing: .1em; text-transform: uppercase; }
.main { flex: 1; min-height: 0; padding-top: 6mm; overflow: hidden; }
.ft { display: flex; justify-content: space-between; align-items: flex-end; height: 7mm; flex: none; color: rgba(4,39,32,.7); }
.ft__no { color: #DB042C; }

.head { text-align: center; margin-bottom: 7mm; }
.head h2 { color: #DB042C; font-size: 34pt; letter-spacing: .07em; }
.head .hand { margin: 2mm 0 0; font-size: 12.5pt; line-height: 1.5; }
.sub { font-size: 15pt; letter-spacing: .07em; color: #DB042C; text-align: center; margin: 8mm 0 4mm; }

/* cover: like the menu cover, photo fades into the brand red */
.cover { background: #DB042C; color: #fff; }
.cover__img { position: absolute; left: 0; right: 0; top: 0; height: 51%; background-size: cover; background-position: 68% 0; }   /* the whole neon sign stays in view */
.cover__img::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(4,39,32,.25) 0%, rgba(4,39,32,0) 40%, rgba(219,4,44,.85) 90%, #DB042C 100%); }
.cover__body { position: absolute; left: 15mm; right: 15mm; bottom: 15mm; text-align: center; }
.cover__logo { display: block; width: 118mm; height: auto; margin: 0 auto; }
.cover__sign { font-size: 30pt; line-height: 1.2; margin: 5mm 0 4mm; transform: rotate(-4deg); }
.cover__title { font-size: 52pt; letter-spacing: .07em; margin: 0 0 5mm; }
.cover__kicker { font-family: LG; font-size: 14pt; letter-spacing: .1em; text-transform: uppercase; line-height: 1.4; margin: 0 0 9mm; }
.cover__facts { list-style: none; margin: 0; padding: 5mm 0 0; display: grid; grid-template-columns: repeat(4, 1fr); border-top: 2px dotted rgba(255,255,255,.6); }
.cover__facts li { display: grid; gap: 1mm; padding: 0 2mm; }
.cover__facts li + li { border-left: 2px dotted rgba(255,255,255,.6); }
.cover__facts b { font-family: LG; font-weight: 400; font-size: 21pt; line-height: 1; letter-spacing: .04em; }
.cover__facts span { font-size: 8pt; opacity: .9; }

/* Auf einen Blick */
.glance { display: grid; grid-template-columns: 60mm 1fr; gap: 8mm; align-items: start; }
.glance__fig { margin: 0; }
.glance__fig .img { height: 80mm; }
.glance__fig figcaption { margin-top: 2mm; font-size: 8pt; }
.glance__list { margin: 0; display: grid; grid-template-columns: 1fr 1fr; column-gap: 7mm; border-top: 1.5pt solid #042720; }
.glance__list div { padding: 1.8mm 0 1.9mm; border-bottom: .5pt solid rgba(4,39,32,.16); }
.glance__list dt { font-family: LG; font-size: 9.5pt; line-height: 1.2; letter-spacing: .07em; text-transform: uppercase; color: #DB042C; }
.glance__list dd { margin: .4mm 0 0; line-height: 1.3; }
.facts { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(4, 1fr); text-align: center; }
.facts li { display: grid; gap: 1.2mm; padding: 0 3mm; }
.facts li + li { border-left: 2px dotted rgba(4,39,32,.34); }
.facts b { font-family: LG; font-weight: 400; font-size: 24pt; line-height: 1; letter-spacing: .04em; }
.facts span { font-size: 8pt; line-height: 1.35; color: rgba(4,39,32,.72); }
.strip { margin-top: 9mm; padding: 6mm 8mm; background: #042720; color: #fff; display: grid; grid-template-columns: auto 1fr; column-gap: 8mm; align-items: center; }
.strip p { margin: 0; }
.strip__label { grid-column: 1 / -1; font-family: LG; font-size: 9.5pt; letter-spacing: .08em; text-transform: uppercase; color: #DB042C; }
.strip__name { font-family: LG; font-size: 22pt; line-height: 1; letter-spacing: .05em; text-transform: uppercase; margin-top: 1mm !important; }
.strip__lines { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 2mm 7mm; font-family: LG; font-size: 13pt; letter-spacing: .03em; }
.strip__lines a { display: inline-flex; align-items: center; gap: 2mm; }
.strip .ico { color: #DB042C; }

/* Objektbeschreibung */
.head--story { margin-bottom: 6mm; }
.head--story .hand { font-size: 12.5pt; margin: 0 0 2mm; }
.head--story h2 { font-size: 32pt; letter-spacing: .06em; }
.lead { max-width: 150mm; margin: 0 auto 6mm; text-align: center; font-size: 12.5pt; line-height: 1.5; }
.dots--short { width: 40mm; margin: 0 auto 7mm; }
.cols { column-count: 2; column-gap: 9mm; text-align: left; hyphenate-limit-chars: 6 3 3; }
.cols--story { font-size: 9.8pt; line-height: 1.6; }
.cols p { orphans: 3; widows: 3; }
.quote { margin: 9mm 0 0; text-align: center; color: #DB042C; font-size: 17pt; }
.band { height: 100mm; margin-bottom: 8mm; background-size: cover; background-position: 50% 45%; }

/* Ausstattung */
.equip { column-count: 2; column-gap: 9mm; font-size: 8.7pt; }
.grp { break-inside: avoid; margin-bottom: 4.5mm; }
.grp h3 { font-size: 14pt; letter-spacing: .06em; padding-bottom: 1.4mm; margin-bottom: 1.8mm; border-bottom: 1.5pt solid #042720; }
.checklist { list-style: none; margin: 0; padding: 0; }
.checklist li { display: flex; gap: 2.4mm; padding: .7mm 0; line-height: 1.4; }
.checklist li::before { content: ""; flex: none; width: 1.6mm; height: 1.6mm; margin-top: 1.25mm; border-radius: 50%; background: #DB042C; }
.note { margin-top: 2mm; padding: 4.5mm 6mm; border-left: 4px solid #DB042C; background: rgba(4,39,32,.05); }
.note h3 { font-size: 13pt; letter-spacing: .06em; color: #DB042C; margin-bottom: 1.5mm; }
.note p { margin: 0; }

/* Lage */
.cols--loc h3 { font-size: 13.5pt; letter-spacing: .05em; color: #DB042C; margin: 0 0 2mm; break-after: avoid; }
.cols--loc p + h3 { margin-top: 4mm; }
.trio { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4mm; margin-top: 6mm; }
.trio .img { height: 62mm; }

/* Bildergalerie: justified rows, captions in handwriting */
.gal-kicker { text-align: center; margin: 0 0 1mm; font-size: 11pt; line-height: 1.5; color: #DB042C; }
.head--gallery { margin: 0 0 6mm; }
.head--gallery h2 { font-size: 26pt; }
.head--gallery .hand { font-size: 11pt; margin-top: 1.5mm; line-height: 1.5; }
.row { display: flex; justify-content: space-between; gap: ${GAP}mm; margin-bottom: ${ROW_GAP}mm; }
.row figure { margin: 0; flex: none; }
.row figcaption { height: ${CAP}mm; padding-top: 1.4mm; font-size: 7.5pt; line-height: 1.3; white-space: nowrap; overflow: hidden; }

/* back page: contact */
.contact { background: #042720; color: #fff; }
.contact__img { position: absolute; left: 0; right: 0; top: 0; height: 36%; background-size: cover; background-position: 50% 40%; }
.contact__img::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(4,39,32,.1) 0%, rgba(4,39,32,0) 35%, rgba(4,39,32,.85) 88%, #042720 100%); }
.contact__body { position: absolute; left: 25mm; right: 25mm; top: 84mm; text-align: center; }
.contact__sign { color: #DB042C; font-size: 24pt; margin: 0 0 1mm; transform: rotate(-4deg); }
.contact h2 { font-size: 34pt; letter-spacing: .06em; margin: 0 0 6mm; }
.contact__body > p { color: rgba(255,255,255,.82); margin: 0 auto 2.2mm; max-width: 140mm; }
.card { display: grid; gap: 2.6mm; width: 112mm; margin: 7mm auto 6mm; padding: 7mm 8mm; background: #fff; color: #042720; font-style: normal; text-align: left; }
.card p { margin: 0; }
.card__label { font-family: LG; font-size: 10pt; letter-spacing: .08em; text-transform: uppercase; color: #DB042C; }
.card__name { font-family: LG; font-size: 27pt; line-height: .95; letter-spacing: .05em; text-transform: uppercase; }
.card__role { font-size: 8.5pt; color: rgba(4,39,32,.72); padding-bottom: 3mm; border-bottom: 2px dotted rgba(4,39,32,.34); margin-bottom: .6mm !important; }
.card__line { display: flex; align-items: center; gap: 3mm; font-family: LG; font-size: 14pt; letter-spacing: .03em; line-height: 1.1; }
.card__line .ico { color: #DB042C; width: 5mm; height: 5mm; }
.contact__outro { font-family: PW; font-weight: 300; font-size: 10.5pt; line-height: 1.6; color: #fff !important; }
.contact__foot { position: absolute; left: 15mm; right: 15mm; bottom: 11mm; display: flex; justify-content: space-between; align-items: flex-end; padding-top: 4mm; border-top: 2px dotted rgba(255,255,255,.4); font-family: LG; font-size: 11pt; letter-spacing: .1em; text-transform: uppercase; }
.contact__logo { width: 42mm; height: auto; display: block; }
</style></head><body>${pages.join('\n')}</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
// stop on overflow: every page and its main area must keep their content inside
const overflow = await page.evaluate(() => [...document.querySelectorAll('.page, .main, .cols, .equip, .contact__body')].map((el, i) => {
  const r = el.getBoundingClientRect(); const pg = el.closest('.page').getBoundingClientRect();
  const kids = [...el.children].map((c) => c.getBoundingClientRect().bottom);
  const bottom = Math.max(r.top, ...kids);
  const over = el.classList.contains('cols') || el.classList.contains('equip') ? el.scrollWidth - el.clientWidth : bottom - Math.min(r.bottom, pg.bottom);
  return over > 1 ? `${el.className} on page ${[...document.querySelectorAll('.page')].indexOf(el.closest('.page')) + 1}: ${over.toFixed(1)}px` : null;
}).filter(Boolean));
if (process.env.DUMP) fs.writeFileSync(process.env.DUMP, html);
if (overflow.length) { console.error('Overflow:\n' + overflow.join('\n')); if (!process.env.FORCE) { await browser.close(); process.exit(1); } }
fs.mkdirSync(path.dirname(OUT), { recursive: true });
await page.pdf({ path: OUT, printBackground: true, preferCSSPageSize: true });
await browser.close();
console.log(`${path.basename(OUT)}  ${pages.length} pages  ${(fs.statSync(OUT).size / 1e6).toFixed(1).replace('.', ',')} MB (für den Button)`);
