import { initI18n } from './i18n.js';
import { initUI } from './ui.js';
import { initMenu } from './menu.js';
import { initBooking, initContact } from './booking.js';
import { initConsent } from './consent.js';

initUI();
initMenu();
initBooking();
initContact();
initI18n(); // harvests the German texts, applies the chosen language and notifies the modules
initConsent(); // cookie notice; Google Analytics loads only after "Akzeptieren"

const ready = () => document.documentElement.classList.add('is-ready');
if (document.readyState === 'complete') ready(); else window.addEventListener('load', ready, { once: true });
