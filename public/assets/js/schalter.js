// Start screen ("Schalter", homepage only): the San Remo logo in white on red and an old toggle switch set to SPENTO.
// Switching it on (click, tap, Enter or Space) lets the page appear as usual: the lever snaps up to ACCESO with a click,
// the red screen fades and the hero's neon flickers on. It shows on every visit to the homepage.
// Markup: src/partials/schalter.html. The class "sr-off" on <html> is set by a small script in the <head> of src/index.html
// before the first render: it shows the screen, stops the page from scrolling and holds the hero's entry animation.
// If this module does not run, that script releases the page on load, so nobody is locked out.

// Lever geometry in the switch SVG (viewBox 0 0 160 296), seen from the front with a little perspective
const CX = 80, PY = 148;              // pivot in the bushing
const L = 70, D = 320;                // lever length, viewing distance
const W0 = 6.5, W1 = 4.2, R = 11.5;   // half width at the bushing and at the tip, radius of the knob
const OFF = 55, ON = 125;             // degrees out of the plate: below 90 the lever points down (SPENTO), above 90 up (ACCESO)

const ease = {
  in: (x) => x * x * x,
  out: (x) => 1 - (1 - x) * (1 - x),
  inOut: (x) => (x < 0.5 ? 2 * x * x : 1 - ((-2 * x + 2) ** 2) / 2),
};

function lever(deg) {
  const a = (deg * Math.PI) / 180;
  const y = L * Math.cos(a);          // along the plate (down is positive)
  const z = L * Math.sin(a);          // out of the plate, towards the viewer
  const s = D / (D - z);              // perspective: what comes closer grows
  const ey = PY + y * s;
  const w = W1 * s;
  const sx = CX + z * 0.32;           // shadow on the plate, light from the upper left in front
  const sy = PY + y + z * 0.5;
  const f = (n) => n.toFixed(2);
  return {
    stem: `${f(CX - W0)},${PY} ${f(CX + W0)},${PY} ${f(CX + w)},${f(ey)} ${f(CX - w)},${f(ey)}`,
    knob: [f(ey), f(R * s)],
    shadowStem: `${f(CX - W0)},${PY} ${f(CX + W0)},${PY} ${f(sx + W1)},${f(sy)} ${f(sx - W1)},${f(sy)}`,
    shadowKnob: [f(sx), f(sy)],
  };
}

// the mechanical "clack" of the switch, made on the spot (no audio file); silent where Web Audio is missing or blocked
function clack(delay) {
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const ac = new AC();
    const t = ac.currentTime + delay;
    const n = Math.round(ac.sampleRate * 0.04);
    const buf = ac.createBuffer(1, n, ac.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < n; i++) data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ac.sampleRate * 0.0035));
    const noise = ac.createBufferSource();
    noise.buffer = buf;
    const band = ac.createBiquadFilter();
    band.type = 'bandpass'; band.frequency.value = 2600; band.Q.value = 0.8;
    const ng = ac.createGain();
    ng.gain.value = 0.35;
    noise.connect(band); band.connect(ng); ng.connect(ac.destination);
    noise.start(t);
    const body = ac.createOscillator();
    body.type = 'triangle';
    body.frequency.setValueAtTime(220, t);
    body.frequency.exponentialRampToValueAtTime(70, t + 0.05);
    const bg = ac.createGain();
    bg.gain.setValueAtTime(0.18, t);
    bg.gain.exponentialRampToValueAtTime(0.0001, t + 0.07);
    body.connect(bg); bg.connect(ac.destination);
    body.start(t); body.stop(t + 0.08);
    setTimeout(() => { ac.close().catch(() => {}); }, 800);
  } catch (e) { /* no sound: the switch works without it */ }
}

export function initSwitch() {
  window.srSwitch = true;               // tells the script in the <head> that the screen is in good hands
  const root = document.documentElement;
  const splash = document.querySelector('[data-splash]');
  const release = () => { root.classList.remove('sr-off'); splash?.remove(); };
  if (!splash || !root.classList.contains('sr-off')) { release(); return; }

  let others = [];
  try {
    const btn = splash.querySelector('[data-switch]');
    const part = (name) => splash.querySelector(`[data-lever="${name}"]`);
    const stem = part('stem'), knob = part('knob'), shadowStem = part('shadow-stem'), shadowKnob = part('shadow-knob');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

    let angle = OFF;
    let raf = 0;
    let on = false;
    let hovering = false;

    const draw = (deg) => {
      angle = deg;
      const g = lever(deg);
      stem.setAttribute('points', g.stem);
      knob.setAttribute('cy', g.knob[0]); knob.setAttribute('r', g.knob[1]);
      shadowStem.setAttribute('points', g.shadowStem);
      shadowKnob.setAttribute('cx', g.shadowKnob[0]); shadowKnob.setAttribute('cy', g.shadowKnob[1]);
    };

    // frames: [[ms, degrees, easing], …], the first one is where the lever starts
    const play = (frames) => {
      cancelAnimationFrame(raf);
      const end = frames[frames.length - 1];
      if (reduce.matches) { draw(end[1]); return; }
      const t0 = performance.now();
      const step = (now) => {
        const t = now - t0;
        if (t >= end[0]) { draw(end[1]); return; }
        let i = 1;
        while (t > frames[i][0]) i++;
        const [ta, da] = frames[i - 1];
        const [tb, db, e = 'inOut'] = frames[i];
        draw(da + (db - da) * ease[e]((t - ta) / (tb - ta)));
        raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };

    // everything behind the screen is out of reach (keyboard, screen readers) until the switch is on;
    // the notice band at the top stays readable
    others = [...document.body.children].filter((el) => el !== splash && !el.matches('script, .sprite, [data-fiction]'));
    others.forEach((el) => { el.inert = true; });

    // a small hint now and then: the lever twitches towards ACCESO
    let hint = setTimeout(function nudge() {
      if (!on && !hovering) play([[0, angle], [110, OFF + 8, 'out'], [240, OFF - 1.5], [330, OFF]]);
      hint = setTimeout(nudge, 5000);
    }, 3000);

    // with a mouse the lever gives a little as the pointer touches it
    btn.addEventListener('pointerenter', (e) => {
      if (on || e.pointerType !== 'mouse') return;
      hovering = true;
      play([[0, angle], [120, OFF + 5, 'out']]);
    });
    btn.addEventListener('pointerleave', (e) => {
      if (on || e.pointerType !== 'mouse') return;
      hovering = false;
      play([[0, angle], [160, OFF]]);
    });

    const switchOn = () => {
      if (on) return;
      on = true;
      clearTimeout(hint);
      btn.setAttribute('aria-checked', 'true');
      const slow = !reduce.matches;
      const at = (ms, fn) => setTimeout(fn, slow ? ms : Math.min(ms, 250));
      // the lever resists, snaps over and settles
      play([[0, angle], [70, angle + 6, 'out'], [150, ON + 4, 'in'], [195, ON - 1.5, 'out'], [240, ON]]);
      clack(slow ? 0.14 : 0);
      at(140, () => splash.classList.add('is-on'));          // ACCESO lights up, the logo glows
      at(480, () => splash.classList.add('is-leaving'));     // the red screen fades out
      at(680, () => root.classList.remove('sr-off'));         // scrolling is back, the hero's neon flickers on
      at(1000, () => {
        others.forEach((el) => { el.inert = false; });
        splash.remove();                                    // focus falls back to the start of the page: Tab reaches "Zum Inhalt springen"
      });
    };

    btn.addEventListener('click', switchOn);
    // Enter or Space work even before the switch has focus
    document.addEventListener('keydown', (e) => {
      if (on || (e.key !== 'Enter' && e.key !== ' ') || e.target !== document.body) return;
      e.preventDefault();
      switchOn();
    });

    draw(OFF);
  } catch (err) {
    // never lock anyone out: without a working switch the page just shows
    others.forEach((el) => { el.inert = false; });
    release();
  }
}
