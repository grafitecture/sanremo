// Static build: src/*.html -> public/*.html
//  - <!--#include name.html-->  inserts src/partials/name.html
//  - {{asset:/path}}            appends a content hash for cache busting
//  - <sr-pic id=".." sizes=".." alt=".." alt-key=".." class=".." eager></sr-pic>
//                               expands to an art-directed <picture> (AVIF + JPEG) from tools/img-manifest.json,
//                               image URLs carry a content hash too, so a replaced image shows up despite browser caching
//  - <!--#gt-credit de-->       inserts the Grafitecture credit, grafitectureCredit('de' | 'en' | 'it'), from kit/grafitecture-credit/
//                               (README there; languages the kit doesn't know, such as Italian, fall back to English)
//  - main.css                   its last block is the kit's grafitecture-credit.css, copied over unchanged on every build
//                               (between the two marker comments), so a new kit version only needs the folder copied and a build
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { grafitectureCredit } from '../kit/grafitecture-credit/grafitecture-credit.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(here, '..');
const SRC = path.join(ROOT, 'src');
const PUB = path.join(ROOT, 'public');
const manifest = JSON.parse(fs.readFileSync(path.join(here, 'img-manifest.json'), 'utf8'));

// Grafitecture credit: keep the kit's CSS unchanged as the last block of main.css
const CSS_FILE = path.join(PUB, 'assets/css/main.css');
const KIT_CSS = path.join(ROOT, 'kit/grafitecture-credit/grafitecture-credit.css');
const GT_START = '/* >>> kit/grafitecture-credit/grafitecture-credit.css (unchanged, copied over by tools/build.mjs; change the kit, not this block) */';
const GT_END = '/* <<< kit/grafitecture-credit/grafitecture-credit.css */';
function syncCreditCss() {
  const css = fs.readFileSync(CSS_FILE, 'utf8');
  const a = css.indexOf(GT_START);
  const b = css.indexOf(GT_END);
  if (a < 0 || b < a) throw new Error('main.css: marker comments of the Grafitecture block missing');
  const next = `${css.slice(0, a + GT_START.length)}\n${fs.readFileSync(KIT_CSS, 'utf8').trimEnd()}\n${css.slice(b)}`;
  if (next !== css) fs.writeFileSync(CSS_FILE, next);
  console.log(`main.css: Grafitecture block ${next !== css ? 'updated from the kit' : 'matches the kit'}`);
}

function credits(html) {
  return html.replace(/<!--#gt-credit\s+([a-z]{2})\s*-->/g, (_, lang) => grafitectureCredit(lang));
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function includes(html, depth = 0) {
  if (depth > 5) throw new Error('include depth');
  return html.replace(/<!--#include\s+([\w.-]+)\s*-->/g, (_, name) => includes(fs.readFileSync(path.join(SRC, 'partials', name), 'utf8'), depth + 1));
}

// /path?v=<first 10 hex chars of the file's sha1>
const versioned = (p) => `${p}?v=${crypto.createHash('sha1').update(fs.readFileSync(path.join(PUB, p))).digest('hex').slice(0, 10)}`;

function assets(html) {
  return html.replace(/\{\{asset:([^}]+)\}\}/g, (_, p) => versioned(p));
}

function parseAttrs(s) {
  const out = {};
  const re = /([\w-]+)(?:="([^"]*)")?/g;
  let m;
  while ((m = re.exec(s))) out[m[1]] = m[2] === undefined ? true : m[2];
  return out;
}

const url = (id, v, w, ext) => versioned(`/assets/img/${id}-${v}-${w}.${ext}`);
const srcset = (id, v, files, ext) => files.map((f) => `${url(id, v, f.w, ext)} ${f.w}w`).join(', ');

function picture(a) {
  const item = manifest[a.id];
  if (!item) throw new Error(`no image "${a.id}" in manifest`);
  const sizes = a.sizes || '100vw';
  const def = item.variants[item.def];
  const big = def.files[def.files.length - 1];
  const mid = def.files[Math.min(1, def.files.length - 1)];
  const lines = [];
  const extra = Object.entries(a).filter(([k]) => k.startsWith('data-')).map(([k, v]) => ` ${k}="${esc(v)}"`).join('');
  lines.push(`<picture class="pic${a.class ? ' ' + a.class : ''}"${extra}${a.hidden === true ? ' hidden' : ''} style="--pic-bg:${def.color}">`);
  for (const [media, vname] of item.art) {
    const v = item.variants[vname];
    const f = v.files[v.files.length - 1];
    if (!v.jpgOnly) lines.push(`<source type="image/avif" media="${media}" srcset="${srcset(a.id, vname, v.files, 'avif')}" sizes="${sizes}" width="${f.w}" height="${f.h}">`);
    lines.push(`<source type="image/jpeg" media="${media}" srcset="${srcset(a.id, vname, v.files, 'jpg')}" sizes="${sizes}" width="${f.w}" height="${f.h}">`);
  }
  if (!def.jpgOnly) lines.push(`<source type="image/avif" srcset="${srcset(a.id, item.def, def.files, 'avif')}" sizes="${sizes}">`);
  const eager = a.eager === true;
  const alt = a.alt ? esc(a.alt) : '';
  const i18n = a['alt-key'] ? ` data-i18n-attr="alt:${a['alt-key']}"` : '';
  lines.push(`<img src="${url(a.id, item.def, mid.w, 'jpg')}" srcset="${srcset(a.id, item.def, def.files, 'jpg')}" sizes="${sizes}" width="${big.w}" height="${big.h}" alt="${alt}"${i18n} ${eager ? 'fetchpriority="high" loading="eager"' : 'loading="lazy"'} decoding="async">`);
  lines.push('</picture>');
  return lines.join('');
}

function pics(html) {
  return html.replace(/<sr-pic\s+([^>]*)><\/sr-pic>/g, (_, attrs) => picture(parseAttrs(attrs)));
}

syncCreditCss();

const pages = fs.readdirSync(SRC).filter((f) => f.endsWith('.html'));
for (const p of pages) {
  let html = fs.readFileSync(path.join(SRC, p), 'utf8');
  html = includes(html);
  html = credits(html);
  html = pics(html);
  html = assets(html);
  fs.writeFileSync(path.join(PUB, p), html);
  console.log(`built ${p} (${(html.length / 1024).toFixed(1)} KB)`);
}
