import { initI18n } from './i18n.js';
import { initUI } from './ui.js';
import { initMenu } from './menu.js';
import { initBooking, initContact } from './booking.js';

initUI();
initMenu();
initBooking();
initContact();
initI18n(); // harvests the German texts, applies the chosen language and notifies the modules

const ready = () => document.documentElement.classList.add('is-ready');
if (document.readyState === 'complete') ready(); else window.addEventListener('load', ready, { once: true });
