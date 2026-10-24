// La Carta: tabs, dish lists, legend, allergen lists and language-specific PDF links.
import { MENU, ALLERGENS, ADDITIVES, MENU_TEXT, formatPrice, volLabel } from './menu-data.js';
import { getLang, s } from './i18n.js';

const PDF = { de: 'DE', en: 'EN', it: 'IT' };
const HOUSE_TIP = { de: 'Empfehlung des Hauses', en: 'House recommendation', it: 'Consiglio della casa' };
const CODES_LABEL = { de: 'Kennzeichnung: A–N Allergene, 1–12 Zusatzstoffe', en: 'Labels: A–N allergens, 1–12 additives', it: 'Legenda: A–N allergeni, 1–12 additivi' };

let active = 'antipasti';
let root, tabsEl, panelsEl, mediaEl, legendEl, allergensEl;

const esc = (v) => String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const tx = (obj) => (obj ? obj[getLang()] ?? obj.de : '');

function codes(item, lang) {
  const a = item.a || [];
  const z = item.z || [];
  if (!a.length && !z.length) return '';
  const aNames = a.map((c) => ALLERGENS.find((x) => x.code === c)?.short[lang]).filter(Boolean);
  const zNames = z.map((n) => ADDITIVES.find((x) => x.n === n)?.[lang]).filter(Boolean);
  const label = [aNames.length ? `${tx(MENU_TEXT.allergens)}: ${aNames.join(', ')}` : '', zNames.length ? `${tx(MENU_TEXT.additives)}: ${zNames.join(', ')}` : ''].filter(Boolean).join('. ');
  const vis = [a.join(', '), z.length ? `(${z.join(', ')})` : ''].filter(Boolean).join(' ');
  return ` <span class="dish__codes" title="${esc(label)}"><span aria-hidden="true">${esc(vis)}</span><span class="sr-only">${esc(label)}</span></span>`;
}

function price(item, lang) {
  if (item.prices) {
    return `<span class="dish__prices">${item.prices.map(([v, p]) => `<span class="dish__price"><small>${esc(volLabel(v, lang))}</small>${formatPrice(p, lang)}</span>`).join('')}</span>`;
  }
  const vol = item.vol ? `<small>${esc(volLabel(item.vol, lang))}</small>` : '';
  return `<span class="dish__price">${vol}${formatPrice(item.price, lang)}</span>`;
}

function badges(item) {
  const out = [];
  if (item.note) out.push(`<span class="dish__note">${esc(tx(item.note))}</span>`);
  if (item.diet === 'veg') out.push(`<span class="diet" title="${esc(tx(MENU_TEXT.veg))}"><span aria-hidden="true">V</span><span class="sr-only">${esc(tx(MENU_TEXT.veg))}</span></span>`);
  if (item.diet === 'vegan') out.push(`<span class="diet" title="${esc(tx(MENU_TEXT.vegan))}"><span aria-hidden="true">VG</span><span class="sr-only">${esc(tx(MENU_TEXT.vegan))}</span></span>`);
  if (item.hot) out.push(`<span class="diet diet--hot" title="${esc(tx(MENU_TEXT.hot))}"><svg class="icon" aria-hidden="true"><use href="#i-chili"/></svg><span class="sr-only">${esc(tx(MENU_TEXT.hot))}</span></span>`);
  if (item.tags?.includes('liguria')) out.push(`<span class="liguria" lang="it" title="${esc(tx(MENU_TEXT.liguria))}">Liguria</span>`);
  return out.length ? `<div class="dish__meta">${out.join('')}</div>` : '';
}

function dish(item, lang) {
  const tip = item.tags?.includes('consiglio') ? `<p class="dish__tip hand" lang="it">${esc(tx(MENU_TEXT.consiglio))}</p>` : '';
  return `<li class="dish">${tip}<div class="dish__top"><p class="dish__name" lang="it">${esc(item.name)}</p><span class="dish__leader" aria-hidden="true"></span>${price(item, lang)}</div>`
    + `<p class="dish__desc">${esc(tx(item.desc))}${codes(item, lang)}</p>${badges(item)}</li>`;
}

function renderTabs() {
  tabsEl.innerHTML = MENU.map((sec) => {
    const sel = sec.id === active;
    return `<button class="tab" type="button" role="tab" id="tab-${sec.id}" aria-controls="panel-${sec.id}" aria-selected="${sel}" tabindex="${sel ? 0 : -1}" data-tab="${sec.id}">`
      + `<svg class="icon" aria-hidden="true"><use href="#t-${sec.id}"/></svg><span class="tab__label" lang="it">${esc(sec.title.it)}</span></button>`;
  }).join('');
}

function renderPanels() {
  const lang = getLang();
  panelsEl.innerHTML = MENU.map((sec) => {
    const groups = sec.groups.map((g) => {
      const head = g.title ? `<div class="menu-group__head"><h4 class="menu-group__title" lang="it">${esc(tx(g.title))}</h4>${g.note ? `<p class="menu-group__note hand">${esc(tx(g.note))}</p>` : ''}</div>` : '';
      return `<div class="menu-group">${head}<ul class="menu-list">${g.items.map((it) => dish(it, lang)).join('')}</ul></div>`;
    }).join('');
    return `<section class="menu-sec" role="tabpanel" id="panel-${sec.id}" aria-labelledby="tab-${sec.id}" tabindex="0"${sec.id === active ? '' : ' hidden'}>`
      + `<header class="menu-sec__head"><h3 class="menu-sec__title" lang="it">${esc(sec.title.it)}</h3><p class="menu-sec__sub hand">${esc(tx(sec.sub))}</p></header>${groups}</section>`;
  }).join('');
}

function renderLegend() {
  const lang = getLang();
  legendEl.innerHTML = [
    `<span class="legend__item"><span class="diet" aria-hidden="true">V</span>${esc(tx(MENU_TEXT.veg))}</span>`,
    `<span class="legend__item"><span class="diet" aria-hidden="true">VG</span>${esc(tx(MENU_TEXT.vegan))}</span>`,
    `<span class="legend__item"><span class="diet diet--hot" aria-hidden="true"><svg class="icon"><use href="#i-chili"/></svg></span>${esc(tx(MENU_TEXT.hot))}</span>`,
    `<span class="legend__item"><span class="liguria" aria-hidden="true">Liguria</span>${esc(tx(MENU_TEXT.liguria))}</span>`,
    `<span class="legend__item"><span class="legend__hand" lang="it">${esc(tx(MENU_TEXT.consiglio))}</span>${esc(HOUSE_TIP[lang])}</span>`,
    `<span class="legend__item">${esc(CODES_LABEL[lang])}</span>`,
  ].join('');
  allergensEl.innerHTML = `<div><h3>${esc(tx(MENU_TEXT.allergens))}</h3><ul class="allergens__list">${ALLERGENS.map((a) => `<li><b>${a.code}</b><span>${esc(a[lang])}</span></li>`).join('')}</ul></div>`
    + `<div><h3>${esc(tx(MENU_TEXT.additives))}</h3><ul class="allergens__list">${ADDITIVES.map((z) => `<li><b>${z.n}</b><span>${esc(z[lang])}</span></li>`).join('')}</ul></div>`
    + `<p class="allergens__disclaimer">${esc(tx(MENU_TEXT.disclaimer))} ${esc(tx(MENU_TEXT.stand))}</p>`;
}

function updatePdfLinks() {
  const lang = getLang();
  document.querySelectorAll('[data-pdf]').forEach((a) => {
    const file = `/downloads/San-Remo-${a.dataset.pdf}-${PDF[lang]}.pdf`;
    a.href = file;
    a.setAttribute('download', file.split('/').pop());
    const meta = a.querySelector('[data-pdf-meta]');
    if (meta) meta.textContent = s('pdfLang');
  });
}

function showMedia() {
  mediaEl.querySelectorAll('[data-tab]').forEach((p) => { p.hidden = p.dataset.tab !== active; });
}

function select(id, { focus = false, scroll = false } = {}) {
  active = id;
  tabsEl.querySelectorAll('[role="tab"]').forEach((t) => {
    const sel = t.dataset.tab === id;
    t.setAttribute('aria-selected', String(sel));
    t.tabIndex = sel ? 0 : -1;
    if (sel && focus) t.focus();
    if (sel) t.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
  });
  panelsEl.querySelectorAll('[role="tabpanel"]').forEach((p) => { p.hidden = p.id !== `panel-${id}`; });
  showMedia();
  if (scroll) {
    const body = root.querySelector('.carta__body');
    const offset = (document.querySelector('[data-header]')?.offsetHeight || 0) + tabsEl.offsetHeight;
    const top = body.getBoundingClientRect().top + window.scrollY - offset;
    if (window.scrollY > top + 4) window.scrollTo({ top, behavior: 'smooth' });
  }
}

function render() {
  renderTabs();
  renderPanels();
  renderLegend();
  updatePdfLinks();
  showMedia();
}

export function initMenu() {
  root = document.querySelector('#karte');
  if (!root || !root.querySelector('[data-menu-tabs]')) return;
  tabsEl = root.querySelector('[data-menu-tabs]');
  panelsEl = root.querySelector('[data-menu-panels]');
  mediaEl = root.querySelector('[data-menu-media]');
  legendEl = root.querySelector('[data-menu-legend]');
  allergensEl = root.querySelector('[data-menu-allergens]');

  tabsEl.addEventListener('click', (e) => {
    const t = e.target.closest('[role="tab"]');
    if (t) select(t.dataset.tab, { scroll: true });
  });
  tabsEl.addEventListener('keydown', (e) => {
    const ids = MENU.map((m) => m.id);
    let i = ids.indexOf(active);
    if (e.key === 'ArrowRight') i = (i + 1) % ids.length;
    else if (e.key === 'ArrowLeft') i = (i - 1 + ids.length) % ids.length;
    else if (e.key === 'Home') i = 0;
    else if (e.key === 'End') i = ids.length - 1;
    else return;
    e.preventDefault();
    select(ids[i], { focus: true });
  });
  document.addEventListener('langchange', render);
  render();
}
