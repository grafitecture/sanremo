// Responsive image pipeline: crops (art direction) + AVIF/JPEG in several widths.
// Usage: node tools/images.mjs <dir-with-graded-red-images> <dir-with-regular-images>
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const sharp = require('sharp'); // resolved via NODE_PATH / global install
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(here, '..', 'public', 'assets', 'img');
const [ROT = '/home/claude/work/rot_db042c', SOLIDE = '/mnt/user-data/uploads/CLAUDE_SAN_REMO/BILDER/BILDER_SOLIDE'] = process.argv.slice(2);

const find = (dir, base) => {
  const f = fs.readdirSync(dir).find((n) => path.parse(n).name.toUpperCase() === base.toUpperCase());
  if (!f) throw new Error(`missing ${base} in ${dir}`);
  return path.join(dir, f);
};
const R = (b) => find(ROT, b);
const S = (b) => find(SOLIDE, b);

const W_FULL = [640, 960, 1280, 1600, 2048];
const W_HALF = [480, 720, 960, 1280, 1536];
const W_TILE = [480, 800, 1200, 1600];
const W_SQ = [400, 640, 800];

// aspect: 'orig' or [w, h]; fx/fy: focal point 0..1
export const MANIFEST = {
  hero: { src: R('HERO_BILD'), variants: {
    land: { aspect: 'orig', widths: [960, 1440, 2048] },
    p34: { aspect: [3, 4], fx: 0.49, widths: [768, 1152] },
    p916: { aspect: [9, 16], fx: 0.49, widths: [480, 640, 864] },
  }, art: [['(orientation: portrait) and (max-aspect-ratio: 2/3)', 'p916'], ['(orientation: portrait)', 'p34']], def: 'land' },

  neon: { src: R('IMG_9890'), variants: {
    wide: { aspect: [21, 9], fy: 0, widths: [1280, 1600, 2048] },
    mid: { aspect: [16, 9], fy: 0, widths: [768, 1024, 1440, 2048] },
    mob: { aspect: [4, 3], widths: [480, 768, 1024] },
  }, art: [['(max-width: 47.99em)', 'mob'], ['(max-width: 89.99em)', 'mid']], def: 'wide' },

  // menu tab images (portrait 4:5)
  'menu-antipasti': { src: S('IMG_0380'), variants: { p45: { aspect: [4, 5], fy: 0.6, widths: W_HALF } }, def: 'p45' },
  'menu-insalate': { src: S('IMG_8933'), variants: { p45: { aspect: [4, 5], fy: 0.55, widths: W_HALF } }, def: 'p45' },
  'menu-pizza': { src: S('IMG_2854'), variants: { p45: { aspect: [4, 5], fy: 0.62, widths: W_HALF } }, def: 'p45' },
  'menu-pasta': { src: S('IMG_0876'), variants: { p45: { aspect: [4, 5], fy: 0.5, widths: W_HALF } }, def: 'p45' },
  'menu-dolci': { src: S('IMG_9150'), variants: { p45: { aspect: [4, 5], fy: 0.4, widths: W_HALF } }, def: 'p45' },
  'menu-bevande': { src: R('IMG_9877'), variants: { p45: { aspect: [4, 5], fx: 0.5, widths: [480, 720, 960, 1229] } }, def: 'p45' },

  // ambiente splits (4:5)
  sala: { src: S('IMG_1597'), variants: { p45: { aspect: [4, 5], fy: 0.55, widths: W_HALF } }, def: 'p45' },
  bancone: { src: R('IMG_9876'), variants: { p45: { aspect: [4, 5], fx: 0.42, widths: [480, 720, 960, 1229] } }, def: 'p45' },
  finestra: { src: S('IMG_9152'), variants: { p45: { aspect: [4, 5], fy: 0.55, widths: W_HALF } }, def: 'p45' },

  // ambiente gallery
  'gal-bar': { src: R('IMG_9864'), variants: { l32: { aspect: [3, 2], fy: 0.35, widths: W_FULL } }, def: 'l32' },
  'gal-riflesso': { src: S('IMG_9155'), variants: { p34: { aspect: [3, 4], widths: W_HALF } }, def: 'p34' },
  'gal-finestra-dipinta': { src: S('IMG_8512'), variants: { p34: { aspect: [3, 4], widths: W_HALF } }, def: 'p34' },
  'gal-tavolo': { src: R('IMG_9883'), variants: { l32: { aspect: [3, 2], fy: 0.55, widths: W_FULL } }, def: 'l32' },
  'gal-tavola': { src: S('IMG_0875'), variants: { p34: { aspect: [3, 4], widths: W_HALF } }, def: 'p34' },
  'gal-lampada': { src: R('IMG_9891'), variants: { l32: { aspect: [3, 2], fy: 0.45, widths: W_FULL } }, def: 'l32' },

  // affittasi
  'haus': { src: S('IMG_8938'), variants: { p34: { aspect: [3, 4], widths: W_HALF } }, def: 'p34' },
  'gastraum': { src: R('IMG_9875'), variants: {
    wide: { aspect: [21, 9], fy: 0.42, widths: [1280, 1600, 2048, 2304] },
    mob: { aspect: [4, 5], fx: 0.56, widths: [480, 720, 960, 1229] },
  }, art: [['(max-width: 47.99em)', 'mob']], def: 'wide' },
  'k-linie': { src: S('IMG_9882'), variants: { l43: { aspect: 'orig', widths: W_TILE } }, def: 'l43' },
  'k-grill': { src: S('IMG_9870'), variants: { l43: { aspect: 'orig', widths: W_TILE } }, def: 'l43' },
  'k-station': { src: S('IMG_9898'), variants: { l43: { aspect: 'orig', widths: W_TILE } }, def: 'l43' },
  'k-pass': { src: S('IMG_9871'), variants: { l43: { aspect: 'orig', widths: W_TILE } }, def: 'l43' },
  'k-spuele': { src: S('IMG_9894'), variants: { l43: { aspect: 'orig', widths: W_TILE } }, def: 'l43' },
  'k-herd': { src: S('IMG_9887'), variants: { l43: { aspect: 'orig', widths: W_TILE } }, def: 'l43' },
  'lage': { src: S('IMG_9201'), variants: { p34: { aspect: [3, 4], widths: W_HALF } }, def: 'p34' },

  // prenota / anfahrt
  prenota: { src: S('IMG_0383'), variants: { p45: { aspect: [4, 5], fy: 0.6, widths: W_HALF } }, def: 'p45' },
  eingang: { src: S('IMG_8934'), variants: { p45: { aspect: [4, 5], fy: 0.45, widths: W_HALF } }, def: 'p45' },

  // social feed squares
  'ig-1': { src: S('IMG_0365'), variants: { sq: { aspect: [1, 1], fy: 0.55, widths: W_SQ } }, def: 'sq' },
  'ig-2': { src: S('IMG_8936'), variants: { sq: { aspect: [1, 1], fy: 0.45, widths: W_SQ } }, def: 'sq' },
  'ig-3': { src: R('IMG_9877'), variants: { sq: { aspect: [1, 1], fx: 0.52, widths: W_SQ } }, def: 'sq' },
  'ig-4': { src: S('IMG_0877'), variants: { sq: { aspect: [1, 1], fy: 0.5, widths: W_SQ } }, def: 'sq' },
  'ig-5': { src: S('IMG_8511'), variants: { sq: { aspect: [1, 1], fy: 0.45, widths: W_SQ } }, def: 'sq' },
  'ig-6': { src: R('IMG_9863'), variants: { sq: { aspect: [1, 1], fx: 0.5, widths: W_SQ } }, def: 'sq' },

  // social share preview (1200x630)
  og: { src: R('HERO_BILD'), variants: { og: { aspect: [1200, 630], fy: 0.25, widths: [1200], jpgOnly: true } }, def: 'og' },
};

function cropBox(W, H, aspect, fx = 0.5, fy = 0.5) {
  if (aspect === 'orig') return { left: 0, top: 0, width: W, height: H };
  const [aw, ah] = aspect;
  let w = W, h = Math.round((W * ah) / aw);
  if (h > H) { h = H; w = Math.round((H * aw) / ah); }
  const left = Math.round(Math.min(Math.max(fx * W - w / 2, 0), W - w));
  const top = Math.round(Math.min(Math.max(fy * H - h / 2, 0), H - h));
  return { left, top, width: w, height: h };
}

async function run() {
  fs.mkdirSync(OUT, { recursive: true });
  const mf = path.join(here, 'img-manifest.json');
  const only = (process.env.ONLY || '').split(',').filter(Boolean);
  const meta = only.length && fs.existsSync(mf) ? JSON.parse(fs.readFileSync(mf, 'utf8')) : {};
  for (const [id, item] of Object.entries(MANIFEST)) {
    if (only.length && !only.includes(id)) continue;
    const base = sharp(item.src).rotate(); // honour EXIF orientation
    const { width: W, height: H } = await base.metadata().then((m) => (m.orientation >= 5 ? { width: m.height, height: m.width } : m));
    meta[id] = { art: item.art || [], def: item.def, variants: {} };
    for (const [vname, v] of Object.entries(item.variants)) {
      const box = cropBox(W, H, v.aspect, v.fx, v.fy);
      const widths = v.widths.filter((w) => w <= box.width);
      if (!widths.length || widths[widths.length - 1] < Math.min(...v.widths)) widths.push(box.width);
      const cropped = sharp(item.src).rotate().extract(box);
      const stats = await cropped.clone().resize(32).stats();
      const [r, g, b] = stats.channels.map((c) => Math.round(c.mean));
      const color = '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
      const files = [];
      for (const w of widths) {
        const h = Math.round((box.height * w) / box.width);
        const stem = `${id}-${vname}-${w}`;
        const pipe = cropped.clone().resize(w, h, { kernel: 'lanczos3' }); // default output: converted to sRGB, all EXIF/GPS stripped
        await pipe.clone().jpeg({ quality: 78, mozjpeg: true, progressive: true }).toFile(path.join(OUT, stem + '.jpg'));
        if (!v.jpgOnly) await pipe.clone().avif({ quality: 52, effort: 4 }).toFile(path.join(OUT, stem + '.avif'));
        files.push({ w, h });
      }
      meta[id].variants[vname] = { ratio: box.width / box.height, w: box.width, h: box.height, color, files, jpgOnly: !!v.jpgOnly };
      process.stdout.write(`${id}/${vname} ${box.width}x${box.height} -> ${widths.join(',')}  ${color}\n`);
    }
  }
  fs.writeFileSync(mf, JSON.stringify(meta, null, 1));
}
run().catch((e) => { console.error(e); process.exit(1); });
