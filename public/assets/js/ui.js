// Page chrome: header state, mobile menu, scroll spy, lightbox, consent-gated map, toast, demo social links.
import { s, t } from './i18n.js';

const MAP = { lat: 49.4949, lon: 8.4598, dLat: 0.0026, dLon: 0.0052 };
const OSM_URL = `https://www.openstreetmap.org/?mlat=${MAP.lat}&mlon=${MAP.lon}#map=17/${MAP.lat}/${MAP.lon}`;

/* true when the page runs as a Claude artifact: no embedded maps, no plain file downloads there */
export const inClaude = () => typeof window.claude?.use === 'function';

/* toast */
let toastTimer;
export function toast(msg, ms = 4200) {
  const el = document.querySelector('[data-toast]');
  if (!el) return;
  el.textContent = msg;
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.hidden = true; }, ms);
}

/* notice band ("Störer") at the top: its height lives in --fiction-h, so band and hero fill the first screen together.
   header.html sets it before the first render; this keeps it current (font swap, language, viewport width) */
function initFiction() {
  const band = document.querySelector('[data-fiction]');
  if (!band) return;
  const set = () => document.documentElement.style.setProperty('--fiction-h', `${band.getBoundingClientRect().height}px`);
  if ('ResizeObserver' in window) new ResizeObserver(set).observe(band);
  else window.addEventListener('resize', set);
  set();
}

/* header: transparent over the hero, solid once the hero has passed beneath it */
function initHeader() {
  const header = document.querySelector('[data-header]');
  const hero = document.querySelector('.hero');
  if (!header || !hero) return;
  const update = () => header.classList.toggle('is-solid', hero.getBoundingClientRect().bottom < header.getBoundingClientRect().bottom + 2);
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { update(); ticking = false; });
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
}

/* mobile menu overlay */
function initOverlay() {
  const burger = document.querySelector('[data-burger]');
  const overlay = document.querySelector('[data-overlay]');
  if (!burger || !overlay) return;
  const others = () => [...document.body.children].filter((el) => el !== overlay && el.tagName !== 'SCRIPT' && !el.classList.contains('sprite'));
  const open = () => {
    overlay.hidden = false;
    burger.setAttribute('aria-expanded', 'true');
    document.documentElement.style.overflow = 'hidden';
    others().forEach((el) => { el.inert = true; });
    overlay.querySelector('[data-overlay-close]').focus();
  };
  const close = (restore = true) => {
    overlay.hidden = true;
    burger.setAttribute('aria-expanded', 'false');
    document.documentElement.style.overflow = '';
    others().forEach((el) => { el.inert = false; });
    if (restore) burger.focus();
  };
  burger.addEventListener('click', open);
  overlay.querySelector('[data-overlay-close]').addEventListener('click', () => close());
  overlay.addEventListener('click', (e) => { if (e.target.closest('a')) close(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !overlay.hidden) close(); });
  window.matchMedia('(min-width: 64em)').addEventListener('change', (m) => { if (m.matches && !overlay.hidden) close(false); });
}

/* highlight the nav item of the section in view */
function initScrollSpy() {
  const links = [...document.querySelectorAll('.nav__link[data-nav]')];
  if (!links.length || !('IntersectionObserver' in window)) return;
  const sections = links.map((l) => document.getElementById(l.dataset.nav)).filter(Boolean);
  let current = null;
  const mark = (id) => {
    if (id === current) return;
    current = id;
    links.forEach((l) => (l.dataset.nav === id ? l.setAttribute('aria-current', 'true') : l.removeAttribute('aria-current')));
  };
  // a section that leaves the middle band clears its highlight, so hero, bands and footer show none
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) mark(en.target.id);
      else if (en.target.id === current) mark(null);
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((sec) => io.observe(sec));
}

/* lightbox for gallery and kitchen photos */
function initLightbox() {
  const dlg = document.querySelector('[data-lightbox]');
  if (!dlg || typeof dlg.showModal !== 'function') return;
  const img = dlg.querySelector('[data-lightbox-img]');
  const cap = dlg.querySelector('[data-lightbox-cap]');
  let list = [];
  let idx = 0;
  let avif = false;
  const probe = new Image();
  probe.onload = () => { avif = probe.width > 0; };
  probe.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';

  const show = (i) => {
    idx = (i + list.length) % list.length;
    const btn = list[idx];
    const stem = btn.dataset.full;
    img.src = `/assets/img/${stem}.${avif ? 'avif' : 'jpg'}`;
    img.alt = btn.querySelector('img')?.alt || '';
    const key = btn.dataset.capKey;
    cap.textContent = key ? t(key) : btn.dataset.cap || '';
    cap.lang = key ? document.documentElement.lang : 'it';
    cap.classList.toggle('hand', !key);
  };
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-lightbox-open]');
    if (!btn) return;
    const group = btn.closest('ul') || document;
    list = [...group.querySelectorAll('[data-lightbox-open]')];
    show(list.indexOf(btn));
    dlg.showModal();
  });
  dlg.querySelector('[data-lightbox-prev]').addEventListener('click', () => show(idx - 1));
  dlg.querySelector('[data-lightbox-next]').addEventListener('click', () => show(idx + 1));
  dlg.querySelector('[data-lightbox-close]').addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });
}

/* OpenStreetMap only after an explicit click (no third-party request before consent) */
function initMap() {
  const map = document.querySelector('[data-map]');
  const btn = map?.querySelector('[data-map-load]');
  if (!btn) return;
  if (inClaude()) {
    // Artifacts cannot embed other sites, so the gate links out to OpenStreetMap instead.
    // Runs before i18n harvests the German defaults, so the new keys switch language as usual.
    const text = map.querySelector('.map__text');
    if (text) { text.dataset.i18n = 'dir.mapTextExt'; text.textContent = 'Die Karte öffnet sich auf openstreetmap.org in einem neuen Tab.'; }
    const link = document.createElement('a');
    link.className = btn.className;
    link.href = OSM_URL; link.target = '_blank'; link.rel = 'noopener';
    link.dataset.i18n = 'dir.mapOpenExt'; link.textContent = 'Karte öffnen';
    btn.replaceWith(link);
    return;
  }
  btn.addEventListener('click', () => {
    const bbox = [MAP.lon - MAP.dLon, MAP.lat - MAP.dLat, MAP.lon + MAP.dLon, MAP.lat + MAP.dLat].map((v) => v.toFixed(5)).join('%2C');
    const frame = document.createElement('iframe');
    frame.className = 'map__frame';
    frame.title = s('mapFrame');
    frame.loading = 'lazy';
    frame.referrerPolicy = 'no-referrer';
    frame.src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik`;
    const marker = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    marker.setAttribute('class', 'map__marker');
    marker.setAttribute('aria-hidden', 'true');
    marker.innerHTML = '<use href="#i-pin"/>';
    const open = document.createElement('a');
    open.className = 'btn btn--white map__open';
    open.href = OSM_URL;
    open.target = '_blank'; open.rel = 'noopener';
    open.textContent = s('mapOpen');
    map.append(frame, marker, open);
    map.classList.add('is-loaded');
    document.addEventListener('langchange', () => { frame.title = s('mapFrame'); open.textContent = s('mapOpen'); });
    open.focus({ preventScroll: true });
  });
}

/* fictional social profiles */
function initSocial() {
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-demo-social]')) { e.preventDefault(); toast(s('social')); }
  });
}

/* the mobile bottom bar steps aside while typing */
function initBottomBar() {
  const bar = document.querySelector('[data-bottombar]');
  if (!bar) return;
  const typing = (el) => el && el.matches('input:not([type="radio"]):not([type="checkbox"]), textarea, select');
  document.addEventListener('focusin', (e) => { if (typing(e.target)) bar.classList.add('is-hidden'); });
  document.addEventListener('focusout', (e) => { if (typing(e.target)) bar.classList.remove('is-hidden'); });
}

export function initUI() {
  initFiction();
  initHeader();
  initOverlay();
  initScrollSpy();
  initLightbox();
  initMap();
  initSocial();
  initBottomBar();
}
