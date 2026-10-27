// Builds a copy of the site that runs as a claude.ai artifact (default: dist-artifact/).
//  - index.html becomes the artifact page itself: no doctype/html/head/body of its own, <title> first
//  - every URL relative (the artifact serves its files next to the page); legal pages as impressum.html / datenschutz.html
//  - fonts inlined as data URIs, JPEG only (no AVIF), so one publish stays under the 255-file limit
//  - forms without the mailto: fallback action
// Run after `node tools/build.mjs`:  node tools/artifact.mjs [outDir]
// It also writes files.json: the list of supporting files to pass to the Artifact publish call.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(here, '..');
const PUB = path.join(ROOT, 'public');
const OUT = path.resolve(process.argv[2] || path.join(ROOT, 'dist-artifact'));
const TITLE = 'San Remo Mannheim';

fs.rmSync(OUT, { recursive: true, force: true });
const outFile = (rel) => { const f = path.join(OUT, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); return f; };
const read = (rel) => fs.readFileSync(path.join(PUB, rel), 'utf8');

/* ---------- HTML ---------- */
function relUrls(html, page) {
  const home = page === 'index' ? '' : 'index.html';
  return html
    .replace(/\?v=[0-9a-f]{10}/g, '')
    .replace(/(["'\s,(])\/(assets|downloads)\//g, '$1$2/')
    .replace(/href="\/#/g, `href="${home}#`)
    .replace(/href="(?:https:\/\/www\.sanremo\.ma)?\/"/g, page === 'index' ? 'href="#top"' : 'href="index.html"')
    .replace(/href="\/(impressum|datenschutz)(#[^"]*)?"/g, (_, p, h) => `href="${p}.html${h || ''}"`);
}
const stripHeadExtras = (html) => html
  .replace(/\s*<link rel="(preload|icon|apple-touch-icon|manifest|canonical|alternate)"[^>]*>/g, '')
  .replace(/\s*<meta (property="og:|name="twitter:)[^>]*>/g, '');
const jpegOnly = (html) => html.replace(/<source type="image\/avif"[^>]*>/g, '');
const noMailtoAction = (html) => html.replace(/ action="mailto:[^"]*" method="post" enctype="text\/plain"/g, '');

function transform(html, page) {
  html = noMailtoAction(jpegOnly(stripHeadExtras(relUrls(html, page))));
  const left = html.match(/(?:src|href)="\/(?!\/)[^"]*"|(?:srcset)="[^"]*\s\/assets\//g);
  if (left) throw new Error(`${page}: absolute URLs left: ${left.slice(0, 3).join(' ')}`);
  return html;
}

// the artifact page: content only, the platform wraps it in its own document skeleton
const index = transform(read('index.html'), 'index');
const head = index.match(/<head>([\s\S]*?)<\/head>/)[1];
const langScript = head.match(/<script>[\s\S]*?<\/script>/)[0];
const bodyTag = index.match(/<body([^>]*)>/);
const bodyAttrs = Object.fromEntries([...bodyTag[1].matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const bodyInner = index.slice(index.indexOf(bodyTag[0]) + bodyTag[0].length, index.lastIndexOf('</body>'));
const fragment = [
  `<title>${TITLE}</title>`,
  '<link rel="stylesheet" href="assets/css/main.css">',
  langScript,
  `<script>document.body.id = ${JSON.stringify(bodyAttrs.id || '')}; document.body.className = ${JSON.stringify(bodyAttrs.class || '')};</script>`,
  bodyInner.trim(),
  '',
].join('\n');
fs.writeFileSync(outFile('index.html'), fragment);

// further pages are served as they are, so they keep their own document
for (const page of ['impressum', 'datenschutz']) fs.writeFileSync(outFile(`${page}.html`), transform(read(`${page}.html`), page));

/* ---------- CSS: fonts as data URIs ---------- */
const css = read('assets/css/main.css').replace(/url\("\.\.\/fonts\/([\w.-]+\.woff2)"\)/g, (_, f) =>
  `url("data:font/woff2;base64,${fs.readFileSync(path.join(PUB, 'assets/fonts', f)).toString('base64')}")`);
if (/url\("\.\.\//.test(css)) throw new Error('css: relative url left');
fs.writeFileSync(outFile('assets/css/main.css'), css);

/* ---------- JS: relative URLs, JPEG lightbox ---------- */
for (const f of fs.readdirSync(path.join(PUB, 'assets/js'))) {
  let js = read(`assets/js/${f}`)
    .replace("${avif ? 'avif' : 'jpg'}", 'jpg')
    .replace(/([`'"])\/(assets|downloads)\//g, '$1$2/')
    .replace(/([`'"])\/(datenschutz|impressum)/g, '$1$2.html');
  if (/[`'"]\/(assets|downloads|datenschutz|impressum)/.test(js)) throw new Error(`${f}: absolute URL left`);
  fs.writeFileSync(outFile(`assets/js/${f}`), js);
}

/* ---------- referenced files ---------- */
const pages = ['index.html', 'impressum.html', 'datenschutz.html'].map((p) => fs.readFileSync(path.join(OUT, p), 'utf8')).join('\n');
const assets = new Set();
for (const m of pages.matchAll(/assets\/img\/[\w-]+\.jpg/g)) assets.add(m[0]);
for (const m of pages.matchAll(/data-full="([\w-]+)"/g)) assets.add(`assets/img/${m[1]}.jpg`);
for (const f of fs.readdirSync(path.join(PUB, 'downloads'))) if (f.endsWith('.pdf')) assets.add(`downloads/${f}`);
for (const rel of assets) {
  if (!fs.existsSync(path.join(PUB, rel))) throw new Error(`missing ${rel}`);
  fs.copyFileSync(path.join(PUB, rel), outFile(rel));
}

const files = [
  'impressum.html', 'datenschutz.html', 'assets/css/main.css',
  ...fs.readdirSync(path.join(PUB, 'assets/js')).map((f) => `assets/js/${f}`),
  ...[...assets].sort(),
];
fs.writeFileSync(path.join(OUT, 'files.json'), JSON.stringify(files, null, 0));
const bytes = files.reduce((n, f) => n + fs.statSync(path.join(OUT, f)).size, fs.statSync(path.join(OUT, 'index.html')).size);
console.log(`artifact: ${OUT}  page ${(fs.statSync(path.join(OUT, 'index.html')).size / 1024).toFixed(1)} KB, ${files.length} supporting files, ${(bytes / 1e6).toFixed(1)} MB total`);
