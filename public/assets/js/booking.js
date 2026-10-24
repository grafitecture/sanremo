// Reservation tool + contact form. Both prepare an email (mailto:) to the restaurant,
// so no data passes through the website. Change the address in one place:
export const MAIL_TO = 'ciao@sanremo.ma';

import { s, fill, locale, getLang } from './i18n.js';
import { toast } from './ui.js';

const OPEN_DAYS = [4, 5, 6];               // Thu, Fri, Sat (Date.getDay)
const SLOTS = ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'];
const LEAD_MIN = 60;                       // same-day bookings at least 60 min ahead
const DAYS_AHEAD = 90;
const MAX_PERSONS = 10;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const pad = (n) => String(n).padStart(2, '0');
const dayStart = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const sameDay = (a, b) => a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const mailto = (subject, body) => `mailto:${MAIL_TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.replace(/\n/g, '\r\n'))}`;

function slotsFor(date, now = new Date()) {
  if (!date) return [];
  return SLOTS.map((hm) => {
    const [h, m] = hm.split(':').map(Number);
    const at = new Date(date.getFullYear(), date.getMonth(), date.getDate(), h, m);
    return { hm, ok: at.getTime() - now.getTime() >= LEAD_MIN * 60000 };
  });
}
const isOpenDay = (d, today, last) => OPEN_DAYS.includes(d.getDay()) && d >= today && d <= last && slotsFor(d).some((x) => x.ok);

function setError(form, name, msg) {
  const el = form.querySelector(`[data-error="${name}"]`);
  const input = form.querySelector(`[name="${name}"]`);
  if (el) { el.textContent = msg || ''; el.hidden = !msg; }
  if (input) input.setAttribute('aria-invalid', msg ? 'true' : 'false');
  return !msg;
}

async function copyText(text) {
  try { await navigator.clipboard.writeText(text); toast(s('copied')); }
  catch (e) {
    const ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
    ta.remove();
    toast(ok ? s('copied') : s('copyFail'));
  }
}

function wireSent(panel, form, getMail) {
  panel.querySelector('[data-sent-copy]').addEventListener('click', () => {
    const m = getMail();
    if (m) copyText(`${MAIL_TO}\n${m.subject}\n\n${m.body}`);
  });
  panel.querySelector('[data-sent-reset]').addEventListener('click', () => {
    panel.hidden = true; form.hidden = false;
    form.querySelector('input, textarea, button')?.focus();
  });
}

function showSent(panel, form, mail) {
  panel.querySelector('[data-sent-mailto]').href = mailto(mail.subject, mail.body);
  form.hidden = true; panel.hidden = false;
  panel.focus({ preventScroll: true });
  panel.scrollIntoView({ block: 'center', behavior: 'smooth' });
  window.location.href = mailto(mail.subject, mail.body);
}

/* ---------------- Reservation ---------------- */
export function initBooking() {
  const form = document.querySelector('[data-booking]');
  if (!form) return;
  const panel = document.querySelector('[data-sent="booking"]');
  const cal = form.querySelector('[data-cal]');
  const timesEl = form.querySelector('[data-times]');
  const personsEl = form.querySelector('[data-persons]');
  const unitEl = form.querySelector('[data-persons-unit]');
  const summary = form.querySelector('[data-summary]');

  const today = dayStart(new Date());
  const last = new Date(today); last.setDate(last.getDate() + DAYS_AHEAD);
  const state = { persons: 2, date: null, time: null, view: new Date(today.getFullYear(), today.getMonth(), 1), mail: null };

  const fmtDay = (d, opts) => new Intl.DateTimeFormat(locale(), opts).format(d);
  const longDate = (d) => fmtDay(d, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const timeLabel = (hm) => (s('clock') ? `${hm} ${s('clock')}` : hm);
  const personsLabel = (n) => `${n} ${n === 1 ? s('person') : s('persons')}`;

  function renderPersons() {
    personsEl.textContent = state.persons;
    unitEl.textContent = state.persons === 1 ? s('person') : s('persons');
    form.querySelector('[data-persons-step="-1"]').disabled = state.persons <= 1;
    form.querySelector('[data-persons-step="1"]').disabled = state.persons >= MAX_PERSONS;
  }

  function renderCal() {
    const v = state.view;
    const first = new Date(v.getFullYear(), v.getMonth(), 1);
    const offset = (first.getDay() + 6) % 7; // Monday first
    const daysInMonth = new Date(v.getFullYear(), v.getMonth() + 1, 0).getDate();
    const dows = Array.from({ length: 7 }, (_, i) => fmtDay(new Date(2024, 0, 1 + i), { weekday: 'short' }).replace('.', '')); // 1 Jan 2024 was a Monday
    const canPrev = new Date(v.getFullYear(), v.getMonth(), 0) >= today;
    const canNext = new Date(v.getFullYear(), v.getMonth() + 1, 1) <= last;
    let cells = '';
    for (let i = 0; i < offset; i++) cells += '<span aria-hidden="true"></span>';
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(v.getFullYear(), v.getMonth(), d);
      const open = isOpenDay(date, today, last);
      const sel = sameDay(date, state.date);
      const label = `${longDate(date)}${open ? '' : `, ${s('closed')}`}`;
      cells += `<button type="button" class="cal__day${open ? ' cal__day--open' : ''}${sameDay(date, today) ? ' cal__day--today' : ''}" data-day="${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(d)}" aria-label="${label}" aria-pressed="${sel}"${open ? '' : ' disabled'}>${d}</button>`;
    }
    cal.innerHTML = `<div class="cal__head">`
      + `<button type="button" class="cal__nav" data-cal-nav="-1" aria-label="${s('prevMonth')}"${canPrev ? '' : ' disabled'}><svg class="icon" aria-hidden="true"><use href="#i-left"/></svg></button>`
      + `<p class="cal__month" aria-live="polite">${fmtDay(first, { month: 'long', year: 'numeric' })}</p>`
      + `<button type="button" class="cal__nav" data-cal-nav="1" aria-label="${s('nextMonth')}"${canNext ? '' : ' disabled'}><svg class="icon" aria-hidden="true"><use href="#i-right"/></svg></button></div>`
      + `<div class="cal__grid">${dows.map((w) => `<span class="cal__dow" aria-hidden="true">${w}</span>`).join('')}${cells}</div>`;
  }

  function renderTimes() {
    if (!state.date) { timesEl.innerHTML = `<p class="times__empty">${s('pickDayFirst')}</p>`; return; }
    const slots = slotsFor(state.date);
    if (state.time && !slots.find((x) => x.hm === state.time && x.ok)) state.time = null;
    timesEl.innerHTML = slots.map((x) => `<button type="button" class="time" data-time="${x.hm}" aria-pressed="${x.hm === state.time}"${x.ok ? '' : ' disabled'}>${x.hm}</button>`).join('');
  }

  function renderSummary() {
    if (!state.date) { summary.innerHTML = ''; return; }
    const parts = [fmtDay(state.date, { weekday: 'long', day: 'numeric', month: 'long' })];
    if (state.time) parts.push(timeLabel(state.time));
    parts.push(personsLabel(state.persons));
    summary.innerHTML = `<span class="hand">${s('summary')}</span> ${parts.join(', ')}`;
  }

  const renderAll = () => { renderPersons(); renderCal(); renderTimes(); renderSummary(); };

  form.addEventListener('click', (e) => {
    const step = e.target.closest('[data-persons-step]');
    if (step) { state.persons = Math.min(MAX_PERSONS, Math.max(1, state.persons + Number(step.dataset.personsStep))); renderPersons(); renderSummary(); return; }
    const nav = e.target.closest('[data-cal-nav]');
    if (nav && !nav.disabled) { state.view = new Date(state.view.getFullYear(), state.view.getMonth() + Number(nav.dataset.calNav), 1); renderCal(); cal.querySelector(`[data-cal-nav="${nav.dataset.calNav}"]`)?.focus(); return; }
    const day = e.target.closest('[data-day]');
    if (day && !day.disabled) {
      const [y, m, d] = day.dataset.day.split('-').map(Number);
      state.date = new Date(y, m - 1, d);
      setError(form, 'date', '');
      renderCal(); renderTimes(); renderSummary();
      cal.querySelector(`[data-day="${day.dataset.day}"]`)?.focus();
      return;
    }
    const time = e.target.closest('[data-time]');
    if (time && !time.disabled) { state.time = time.dataset.time; setError(form, 'time', ''); renderTimes(); renderSummary(); timesEl.querySelector(`[data-time="${state.time}"]`)?.focus(); }
  });

  // arrow-key navigation inside the calendar grid
  cal.addEventListener('keydown', (e) => {
    const cur = e.target.closest('[data-day]');
    if (!cur) return;
    const delta = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[e.key];
    if (!delta) return;
    const days = [...cal.querySelectorAll('[data-day]')];
    let i = days.indexOf(cur) + delta;
    while (i >= 0 && i < days.length && days[i].disabled) i += Math.sign(delta);
    if (days[i]) { e.preventDefault(); days[i].focus(); }
  });

  form.addEventListener('input', (e) => { if (e.target.name) setError(form, e.target.name, ''); });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const f = new FormData(form);
    const name = String(f.get('name') || '').trim();
    const phone = String(f.get('phone') || '').trim();
    const email = String(f.get('email') || '').trim();
    const notes = String(f.get('notes') || '').trim();
    const checks = [
      setError(form, 'date', state.date ? '' : s('errDate')),
      setError(form, 'time', state.time ? '' : s('errTime')),
      setError(form, 'name', name.length >= 2 ? '' : s('errName')),
      setError(form, 'phone', phone.replace(/\D/g, '').length >= 6 ? '' : s('errPhone')),
      setError(form, 'email', !email || EMAIL_RE.test(email) ? '' : s('errEmail')),
    ];
    if (checks.includes(false)) {
      const firstErr = form.querySelector('.field__error:not([hidden])');
      const target = firstErr?.closest('.step')?.querySelector('input, button:not([disabled])') || firstErr;
      firstErr?.closest('.step')?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      target?.focus?.({ preventScroll: true });
      return;
    }
    const date = longDate(state.date);
    const subject = fill(s('bookSubject'), { date: fmtDay(state.date, { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' }), time: state.time, n: personsLabel(state.persons) });
    const body = fill(s('bookBody'), {
      date, time: state.time, count: state.persons, name, phone,
      email: email ? fill(s('emailLine'), { v: email }) : '',
      notes: notes ? fill(s('notesLine'), { v: notes }) : '',
    });
    state.mail = { subject, body };
    showSent(panel, form, state.mail);
  });

  wireSent(panel, form, () => state.mail);
  document.addEventListener('langchange', renderAll);
  renderAll();
}

/* ---------------- Contact ---------------- */
const RENT_PREFILL = {
  de: 'Ich interessiere mich für die Anmietung des San Remo und möchte gern einen Besichtigungstermin vereinbaren.',
  en: 'I am interested in renting San Remo and would like to arrange a viewing.',
  it: 'Sono interessato/a all’affitto del San Remo e vorrei fissare una visita.',
};

export function initContact() {
  const form = document.querySelector('[data-contact]');
  if (!form) return;
  const panel = document.querySelector('[data-sent="contact"]');
  let mail = null;

  // "Besichtigung anfragen" buttons preselect the rental topic
  document.querySelectorAll('[data-contact-topic]').forEach((a) => a.addEventListener('click', () => {
    const topic = a.dataset.contactTopic;
    const radio = form.querySelector(`input[name="topic"][value="${topic}"]`);
    if (radio) radio.checked = true;
    const msg = form.querySelector('[name="message"]');
    if (topic === 'rent' && msg && !msg.value.trim()) msg.value = RENT_PREFILL[getLang()] || RENT_PREFILL.de;
    panel.hidden = true; form.hidden = false;
  }));

  form.addEventListener('input', (e) => { if (e.target.name) setError(form, e.target.name, ''); });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const f = new FormData(form);
    const topic = String(f.get('topic') || 'general');
    const name = String(f.get('name') || '').trim();
    const email = String(f.get('email') || '').trim();
    const phone = String(f.get('phone') || '').trim();
    const message = String(f.get('message') || '').trim();
    const checks = [
      setError(form, 'name', name.length >= 2 ? '' : s('errName')),
      setError(form, 'email', !email ? s('errEmailReq') : EMAIL_RE.test(email) ? '' : s('errEmail')),
      setError(form, 'message', message.length >= 5 ? '' : s('errMessage')),
    ];
    if (checks.includes(false)) { form.querySelector('[aria-invalid="true"]')?.focus(); return; }
    const topics = s('topics');
    mail = {
      subject: fill(s('contactSubject'), { topic: topics[topic] || topics.general, name }),
      body: fill(s('contactBody'), { message, name, email, phone: phone ? fill(s('phoneLine'), { v: phone }) : '' }),
    };
    showSent(panel, form, mail);
  });
  wireSent(panel, form, () => mail);
}
