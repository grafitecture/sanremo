// Google Analytics 4 only with consent (opt-in: § 25 Abs. 1 TDDDG, Art. 6 Abs. 1 lit. a DSGVO).
// Until "Akzeptieren" is clicked nothing is loaded from Google and no cookie is set.
// The choice is kept in localStorage ("sr-consent") and asked again after twelve months.
// "Cookie-Einstellungen" in the footer (and the button on /datenschutz) reopens the notice;
// "Ablehnen" withdraws consent, stops measuring and deletes the Google Analytics cookies.
import { inClaude } from './ui.js';

export const GA_ID = 'G-HHZ2G13CDF';
const STORE = 'sr-consent';
const VERSION = 1;                            // raise to ask everyone again, e.g. after adding a service
const MAX_AGE = 365 * 24 * 60 * 60 * 1000;    // twelve months

let loaded = false;

function stored() {
  try {
    const c = JSON.parse(localStorage.getItem(STORE) || 'null');
    if (c && c.v === VERSION && typeof c.analytics === 'boolean' && Date.now() - Date.parse(c.ts) < MAX_AGE) return c;
  } catch (e) { /* storage blocked or unreadable: ask again */ }
  return null;
}

function remember(analytics) {
  try { localStorage.setItem(STORE, JSON.stringify({ v: VERSION, analytics, ts: new Date().toISOString() })); } catch (e) { /* storage blocked: the choice holds for this page view */ }
}

// gtag.js expects the arguments object itself, not an array
function gtag() { window.dataLayer.push(arguments); } // eslint-disable-line prefer-rest-params

function enable() {
  window[`ga-disable-${GA_ID}`] = false;
  if (loaded) { gtag('consent', 'update', { analytics_storage: 'granted' }); return; }
  loaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = gtag;
  gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  gtag('js', new Date());
  gtag('config', GA_ID, { allow_google_signals: false, allow_ad_personalization_signals: false });
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.append(s);
}

// _ga and _ga_<ID without "G-">, set by Google on the widest possible domain (e.g. .sanremo.ma)
function deleteCookies() {
  const names = document.cookie.split(';').map((c) => c.split('=')[0].trim()).filter((n) => /^_g(a|a_.+|id|at.*)$/.test(n));
  if (!names.length) return;
  const parts = location.hostname.split('.');
  const domains = [''];
  for (let i = 0; i < parts.length - 1; i++) domains.push(`; domain=.${parts.slice(i).join('.')}`);
  names.forEach((n) => domains.forEach((d) => { document.cookie = `${n}=; Max-Age=0; path=/${d}`; }));
}

function disable() {
  window[`ga-disable-${GA_ID}`] = true;       // Google's opt-out flag: no further hits on this page
  if (loaded) gtag('consent', 'update', { analytics_storage: 'denied' });
  deleteCookies();
}

export function initConsent() {
  const box = document.querySelector('[data-consent]');
  const openers = document.querySelectorAll('[data-consent-open]');
  // a Claude artifact is only a preview: no notice, no tracking
  if (inClaude()) { openers.forEach((el) => { el.hidden = true; }); return; }
  if (!box) return;

  // while the notice is open the footer grows by its height, so imprint, privacy and language links stay reachable
  const root = document.documentElement;
  const reserve = () => {
    if (box.hidden) { root.style.removeProperty('--consent-space'); return; }
    const space = box.offsetHeight + (parseFloat(getComputedStyle(box).bottom) || 0);   // not the rect: the entry animation moves it
    root.style.setProperty('--consent-space', `${Math.ceil(space)}px`);
  };
  if ('ResizeObserver' in window) new ResizeObserver(reserve).observe(box);
  window.addEventListener('resize', reserve);

  let back = null;
  const show = (focus) => {
    box.hidden = false;
    reserve();
    if (focus) box.querySelector('[data-consent-choice]').focus();
  };
  const hide = () => {
    box.hidden = true;
    reserve();
    if (back && document.contains(back)) back.focus({ preventScroll: true });
    back = null;
  };

  box.addEventListener('click', (e) => {
    const b = e.target.closest('[data-consent-choice]');
    if (!b) return;
    const yes = b.dataset.consentChoice === 'granted';
    remember(yes);
    if (yes) enable(); else disable();
    hide();
  });
  // Escape closes a reopened notice without changing the earlier choice
  box.addEventListener('keydown', (e) => { if (e.key === 'Escape' && stored()) hide(); });
  document.addEventListener('click', (e) => {
    const o = e.target.closest('[data-consent-open]');
    if (!o) return;
    e.preventDefault();
    back = o;
    show(true);
  });

  const choice = stored();
  if (choice?.analytics) enable();
  else if (!choice) show(false);
}
