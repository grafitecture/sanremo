// Language switch DE / EN / IT.
// German is authored in the HTML and harvested at start-up; EN and IT live here.
// Elements: data-i18n="key" (innerHTML), data-i18n-attr="attr:key;attr2:key2".

export const LANGS = ['de', 'en', 'it'];
const STORE = 'sr-lang';

const DICT = {
  en: {
    'meta.title': 'San Remo – Ristorante a Mannheim dal 1977 | Italian restaurant in Jungbusch',
    'legal.imprintTitle': 'Legal notice | San Remo Mannheim', 'legal.privacyTitle': 'Privacy policy | San Remo Mannheim', 'legal.notFoundTitle': 'Page not found | San Remo Mannheim',
    'nf.title': 'This page does not exist', 'nf.text': 'Maybe the link is outdated. Our menu, table booking and all information about renting are on the homepage.', 'nf.home': 'To the homepage',
    'meta.desc': 'Italian restaurant in Mannheim’s Jungbusch quarter since 1977: pizza, pasta and Ligurian specialities, Thu, Fri and Sat from 6 pm. San Remo is available to rent – see the rooms and the concept.',
    'a11y.skip': 'Skip to content', 'a11y.home': 'San Remo, back to the homepage', 'a11y.mainnav': 'Main navigation',
    'a11y.lang': 'Choose language', 'a11y.openmenu': 'Open menu', 'a11y.closemenu': 'Close menu', 'a11y.quick': 'Quick links',
    'a11y.gallery': 'Photo gallery', 'a11y.prev': 'Previous photo', 'a11y.next': 'Next photo', 'a11y.close': 'Close', 'a11y.scroll': 'Continue to the welcome',
    'nav.menu': 'Menu', 'nav.ambiente': 'Ambience', 'nav.rent': 'For rent', 'nav.book': 'Book a table', 'nav.contact': 'Contact', 'nav.directions': 'Directions',
    'info.hours': 'Thu, Fri &amp; Sat from 6 pm', 'info.days': 'Thursday, Friday &amp; Saturday', 'info.from18': 'from 6 pm', 'info.closed': 'Closed Sunday to Wednesday',
    'footer.hours': 'Opening hours', 'footer.address': 'Address', 'footer.route': 'Plan your route', 'footer.contact': 'Contact',
    'footer.discover': 'Discover', 'footer.social': 'Social media', 'footer.follow': 'Follow', 'footer.imprint': 'Legal notice', 'footer.privacy': 'Privacy',
    'footer.fiction': 'This website is for demonstration purposes only and is fictional.',
    'footer.consent': 'Cookie settings',
    'consent.title': 'Cookies &amp; statistics',
    'consent.text': 'With your consent we use Google Analytics to understand how our website is used. This sets cookies and sends usage data to Google, including to the USA. You can change your choice at any time under “Cookie settings” at the bottom of the page.',
    'consent.more': 'More about privacy', 'consent.moreHref': '/datenschutz#google-analytics-en', 'consent.accept': 'Accept', 'consent.decline': 'Decline',
    'quick.call': 'Call', 'quick.book': 'Book', 'quick.menu': 'Menu',
    'hero.title': 'Pizza, pasta &amp; neon light',
    'cta.book': 'Book a table', 'cta.rent': 'Rent the restaurant', 'cta.band': 'Or for twelve?', 'cta.bandHand': 'Booking takes just a minute.',
    'intro.hand': 'A little piece of the Riviera in the heart of Jungbusch',
    'intro.p1': 'San Remo has been part of Beilstraße since 1977. The name comes from the town on the Riviera dei Fiori, and that is exactly how an evening with us should feel: easy-going, warm and a little like a holiday.',
    'intro.p2': 'From Thursday to Saturday we cook from 6 pm: pizza from the oven, fresh pasta and Ligurian classics such as focaccia, farinata and trofie al pesto. With wine from the coast, beer on tap and red neon light.',
    'facts.days': 'Thu – Sat', 'facts.since': 'Italian cooking',
    'carta.hand': 'From the Riviera dei Fiori to Mannheim',
    'carta.lead': 'Sanremo lies on Liguria’s Riviera of Flowers, home to many of our favourite recipes: alongside pizza and pasta classics you will find focaccia, farinata and the sardenaira, the pizza of Sanremo.',
    'carta.tabs': 'Menu categories', 'carta.allergenToggle': 'Show allergens and additives', 'carta.dlMenu': 'Menu', 'carta.dlAllergens': 'Allergen chart',
    'carta.note': 'All prices in euros, VAT included. Please ask us about allergies and intolerances, we are happy to help.',
    'amb.hand': 'Red light, white wood, laid tables',
    'amb.sala': 'White-painted wood panelling, tables laid in red and fresh flowers: the dining room is cosy, a little playful and made for long evenings with family and friends.',
    'amb.bancone': 'Beneath the neon sign, the bar is waiting. This is where the evening starts with an aperitivo, with beer on tap and wine from the Ligurian coast. If you only drop in for a glass, you are just as welcome.',
    'amb.finestra': 'The best seats are by the window: a view of Beilstraße, flowers on the table and the red glow behind you.',
    'aff.title': 'San Remo is available to rent',
    'aff.lead': 'A furnished restaurant with a history, right in the heart of Jungbusch. The dining room, bar and professional kitchen are ready to go, and the concept with name, brand and menu is in place. As owners of the building at Beilstraße 3, Eric and Martin Schweppe are looking for hosts who will bring San Remo to life.',
    'aff.ctaVisit': 'Request a viewing', 'aff.ctaFacts': 'See key facts', 'aff.houseTitle': 'The building',
    'aff.house': 'A white period building with a stucco façade, awnings over the windows and greenery above the entrance. The restaurant is on the ground floor, right on the street: easy to spot and unmistakable.',
    'aff.fAddress': 'Address', 'aff.fDistrict': 'Location', 'aff.vDistrict': 'Jungbusch, on the edge of the city centre', 'aff.fUse': 'Use', 'aff.vUse': 'Restaurant and bar',
    'aff.fRooms': 'Rooms', 'aff.vRooms': 'Dining room, bar, professional kitchen', 'aff.fArea': 'Floor area', 'aff.onRequest': 'on request', 'aff.fSeats': 'Seats',
    'aff.fRent': 'Rent', 'aff.fFrom': 'Available', 'aff.vFrom': 'by arrangement', 'aff.fOwner': 'Landlord',
    'aff.roomTitle': 'Dining room &amp; bar',
    'aff.room': 'Wood panelling, a counter with beer taps and a chilled display, red lighting and the neon sign: the dining room is furnished and already has a character of its own.',
    'aff.kitchenTitle': 'The professional kitchen',
    'aff.kitchenLead': 'Bright tiles, stainless steel throughout and equipped for restaurant service: from the cooking line with extraction hood to the charcoal grill oven.',
    'aff.k1': 'Cooking line with extraction hood', 'aff.k2': 'Charcoal grill oven', 'aff.k3': 'Refrigerated counter with marble top',
    'aff.k4': 'Pass with heat lamps', 'aff.k5': 'Dishwashing area with pre-rinse spray', 'aff.k6': 'Stainless steel range and work surfaces',
    'aff.conceptTitle': 'The finished concept', 'aff.conceptLead': 'You are not just renting rooms, but a restaurant that has already been thought through.',
    'aff.c1t': 'Name &amp; history', 'aff.c1': 'San Remo, Ristorante a Mannheim dal 1977: a name with roots that people remember.',
    'aff.c2t': 'Brand &amp; logo', 'aff.c2': 'Lettering, a colour world in Rosso San Remo and the neon sign as a signature.',
    'aff.c3t': 'Light &amp; space', 'aff.c3': 'A consistent red lighting concept that sets the scene every evening.',
    'aff.c4t': 'Menu', 'aff.c4': 'An Italian menu with a Ligurian accent and an allergen chart, as a basis for your own signature.',
    'aff.c5t': 'Opening hours', 'aff.c5': 'Lean by design: Thursday to Saturday from 6 pm.',
    'aff.c6t': 'Website &amp; booking', 'aff.c6': 'This site with menu, table booking, contact and directions in three languages.',
    'aff.areaTitle': 'The location',
    'aff.area': 'Jungbusch is Mannheim’s harbour and creative quarter between the city centre and the Rhine: home to the Popakademie, bars, studios and plenty of life in the evening.',
    'aff.a1': 'Popakademie and Musikpark: a few minutes on foot', 'aff.a2': 'Tram stop “Dalbergstraße”: about 5 minutes on foot',
    'aff.a3': 'Mannheim main station: direct with bus line 60', 'aff.a4': 'City centre and the Quadrate: within walking distance',
    'aff.ctaHand': 'Get to know San Remo', 'aff.ctaTitle': 'Arrange a viewing',
    'aff.ctaText': 'Eric and Martin Schweppe will gladly show you the building, the rooms and the concept on site.',
    'book.hand': 'Your table is waiting',
    'book.lead': 'Choose the number of guests, the day and the time. Your request reaches us by email and we confirm as soon as possible. You can also book by phone during opening hours on <a href="tel:+4962143744258">+49 621 43744258</a>.',
    'book.s1': 'How many guests?', 'book.s2': 'Which day?', 'book.s3': 'What time?', 'book.s4': 'Your details',
    'book.less': 'One guest fewer', 'book.more': 'One guest more',
    'book.groups': 'More than 10 guests? Write to us and we will happily plan with you.',
    'book.openDays': 'Open Thursday, Friday and Saturday from 6 pm', 'book.notes': 'Notes', 'book.notesPh': 'e.g. allergies, high chair or occasion',
    'book.submit': 'Send as email now',
    'form.name': 'Name', 'form.phone': 'Phone', 'form.email': 'Email', 'form.optional': 'optional',
    'form.privacy': 'Your details are not transmitted via this website: we prepare an email in your own email program, which you send yourself. More in our <a href="/datenschutz">privacy policy</a>.',
    'sent.title': 'Almost done', 'sent.booking': 'Your request is ready as an email to us. Send it from your email program and we will confirm your booking as soon as possible.',
    'sent.contact': 'Your message is ready as an email to us. Send it from your email program and we will get back to you shortly.',
    'sent.fallback': 'No email program opened? Copy the text and send it to ciao@sanremo.ma.',
    'sent.previewLabel': 'Email preview', 'sent.open': 'Open in email program',
    'sent.copy': 'Copy text', 'sent.reopen': 'Open email again', 'sent.again': 'New request', 'sent.againContact': 'New message',
    'contact.hand': 'Drop us a line', 'contact.phoneHint': 'You can reach us by phone during opening hours and by email at any time.',
    'contact.topic': 'What is it about?', 'contact.tGeneral': 'General question', 'contact.tEvent': 'Parties &amp; groups', 'contact.tRent': 'Renting &amp; viewing',
    'contact.tPress': 'Press', 'contact.message': 'Your message', 'contact.submit': 'Send message as email',
    'dir.hand': 'How to find us', 'dir.route': 'Plan your route', 'dir.apple': 'Open in Apple Maps',
    'dir.tramT': 'Tram', 'dir.tram': 'Line 2 to “Dalbergstraße”, then about 5 minutes on foot along Jungbuschstraße.',
    'dir.busT': 'Bus', 'dir.bus': 'Lines 60 and 61 to “Popakademie”. From the main station, line 60 towards Pfeifferswörth takes you straight there.',
    'dir.bikeT': 'Bike', 'dir.bike': 'Jungbusch is flat and central, just a few minutes by bike from the city centre.',
    'dir.carT': 'Car', 'dir.car': 'Parking in the quarter is limited. You will find multi-storey car parks in the nearby Quadrate of the city centre.',
    'dir.mapTitle': 'Show the map?', 'dir.mapText': 'The map is loaded from OpenStreetMap. This transfers your IP address to the OpenStreetMap Foundation.',
    'dir.mapLoad': 'Load map', 'dir.mapPrivacy': 'More about privacy', 'dir.mapPrivacyHref': '/datenschutz#openstreetmap-en',
    'dir.mapTextExt': 'The map opens on openstreetmap.org in a new tab.', 'dir.mapOpenExt': 'Open map',
    'social.hand': 'Neon light for your feed', 'social.note': 'The profiles are fictional and for demonstration only.',
    'alt.hero': 'San Remo’s dining room in red light with the bar and the glowing “San Remo” neon sign',
    'alt.neon': 'The “San Remo” neon sign above the bar', 'alt.menuAntipasti': 'Focaccia with olive oil and sea salt on a wooden board',
    'alt.menuInsalate': 'Window seat with a red table in daylight', 'alt.menuPizza': 'Freshly topped pizzas in the kitchen',
    'alt.menuPasta': 'Laid table with a wine glass and flowers', 'alt.menuDolci': 'Table with flowers in front of the neon sign', 'alt.menuBevande': 'Beer taps at the bar',
    'alt.sala': 'Laid tables in the dining room', 'alt.bancone': 'Bar with stools and a chilled display in red light', 'alt.finestra': 'Window table with flowers and a pendant lamp',
    'alt.galBar': 'The bar beneath the neon sign', 'alt.galRiflesso': 'The neon sign reflected in the window', 'alt.galFinestra': 'Painted window with flowers',
    'alt.galTavolo': 'Table by the window in front of a white brick wall', 'alt.galTavola': 'A long laid table', 'alt.galLampada': 'Glass pendant lamp in front of the neon sign',
    'alt.haus': 'White period façade of Beilstraße 3 with awnings on the ground floor', 'alt.gastraum': 'Dining room with bar, tables and neon sign in red light',
    'alt.k1': 'Cooking line with extraction hood and heat lamps', 'alt.k2': 'Charcoal grill oven in a tiled niche', 'alt.k3': 'Refrigerated counter with marble top beneath red wall lamps',
    'alt.k4': 'Pass with chrome heat lamps', 'alt.k5': 'Dishwashing area with pre-rinse spray', 'alt.k6': 'Stainless steel work surfaces and range beneath the extraction hood',
    'alt.lage': 'San Remo’s entrance with awnings and neon lettering in the window', 'alt.prenota': 'Window bar with red stools in warm light',
    'alt.eingang': 'Window with awning and house number 3', 'alt.ig1': 'Focaccia with cherry tomatoes', 'alt.ig2': 'Window with awning and red lamps',
    'alt.ig3': 'Beer taps at the bar', 'alt.ig4': 'Laid table with flowers', 'alt.ig5': 'Painted window in the dining room', 'alt.ig6': 'Red table in red light',
  },
  it: {
    'meta.title': 'San Remo – Ristorante a Mannheim dal 1977 | Ristorante italiano nel Jungbusch',
    'legal.imprintTitle': 'Note legali | San Remo Mannheim', 'legal.privacyTitle': 'Informativa sulla privacy | San Remo Mannheim', 'legal.notFoundTitle': 'Pagina non trovata | San Remo Mannheim',
    'nf.title': 'Questa pagina non esiste', 'nf.text': 'Forse il link non è più valido. Menù, prenotazione e tutte le informazioni sull’affitto sono nella home.', 'nf.home': 'Vai alla home',
    'meta.desc': 'Ristorante italiano nel quartiere Jungbusch di Mannheim dal 1977: pizza, pasta e specialità liguri, gio, ven e sab dalle 18. Il San Remo è in affitto: scopri locali e concept.',
    'a11y.skip': 'Vai al contenuto', 'a11y.home': 'San Remo, torna alla home', 'a11y.mainnav': 'Navigazione principale',
    'a11y.lang': 'Scegli la lingua', 'a11y.openmenu': 'Apri il menu', 'a11y.closemenu': 'Chiudi il menu', 'a11y.quick': 'Accesso rapido',
    'a11y.gallery': 'Galleria fotografica', 'a11y.prev': 'Foto precedente', 'a11y.next': 'Foto successiva', 'a11y.close': 'Chiudi', 'a11y.scroll': 'Continua al benvenuto',
    'nav.menu': 'Menù', 'nav.ambiente': 'Ambiente', 'nav.rent': 'Affittasi', 'nav.book': 'Prenota', 'nav.contact': 'Contatti', 'nav.directions': 'Come arrivare',
    'info.hours': 'Gio, ven e sab dalle 18', 'info.days': 'Giovedì, venerdì e sabato', 'info.from18': 'dalle 18', 'info.closed': 'Chiuso da domenica a mercoledì',
    'footer.hours': 'Orari', 'footer.address': 'Indirizzo', 'footer.route': 'Calcola il percorso', 'footer.contact': 'Contatti',
    'footer.discover': 'Scopri', 'footer.social': 'Social media', 'footer.follow': 'Seguici', 'footer.imprint': 'Note legali', 'footer.privacy': 'Privacy',
    'footer.fiction': 'Questo sito web ha scopo puramente dimostrativo ed è fittizio.',
    'footer.consent': 'Impostazioni cookie',
    'consent.title': 'Cookie e statistiche',
    'consent.text': 'Con il tuo consenso utilizziamo Google Analytics per capire come viene usato il nostro sito. Vengono impostati dei cookie e i dati di utilizzo vengono trasmessi a Google, anche negli Stati Uniti. Puoi modificare la tua scelta in qualsiasi momento alla voce “Impostazioni cookie” in fondo alla pagina.',
    'consent.more': 'Maggiori informazioni sulla privacy', 'consent.moreHref': '/datenschutz#google-analytics-it', 'consent.accept': 'Accetta', 'consent.decline': 'Rifiuta',
    'quick.call': 'Chiama', 'quick.book': 'Prenota', 'quick.menu': 'Menù',
    'hero.title': 'Pizza, pasta e luce al neon',
    'cta.book': 'Prenota un tavolo', 'cta.rent': 'Affitta il ristorante', 'cta.band': 'O per dodici?', 'cta.bandHand': 'Prenotare richiede solo un minuto.',
    'intro.hand': 'Un pezzetto di Riviera nel cuore del Jungbusch',
    'intro.p1': 'Dal 1977 il San Remo è di casa in Beilstraße. Il nome viene dalla città sulla Riviera dei Fiori, ed è proprio così che deve essere una serata da noi: semplice, calorosa e un po’ come in vacanza.',
    'intro.p2': 'Da giovedì a sabato cuciniamo dalle 18: pizza dal forno, pasta fresca e classici liguri come focaccia, farinata e trofie al pesto. Con vino della costa, birra alla spina e luce rossa al neon.',
    'facts.days': 'Gio – Sab', 'facts.since': 'cucina italiana',
    'carta.hand': 'Dalla Riviera dei Fiori a Mannheim',
    'carta.lead': 'Sanremo si trova sulla Riviera dei Fiori, in Liguria, e da lì vengono molte delle nostre ricette preferite: accanto ai classici di pizza e pasta trovate focaccia, farinata e la sardenaira, la pizza di Sanremo.',
    'carta.tabs': 'Categorie del menù', 'carta.allergenToggle': 'Mostra allergeni e additivi', 'carta.dlMenu': 'Menù', 'carta.dlAllergens': 'Tabella allergeni',
    'carta.note': 'Tutti i prezzi in euro, IVA inclusa. In caso di allergie o intolleranze, chiedete pure al nostro staff.',
    'amb.hand': 'Luce rossa, legno bianco, tavole imbandite',
    'amb.sala': 'Boiserie in legno laccato bianco, tavoli apparecchiati di rosso e fiori freschi: la sala è accogliente, un po’ giocosa e fatta per lunghe serate con famiglia e amici.',
    'amb.bancone': 'Sotto l’insegna al neon ti aspetta il bancone. Qui la serata inizia con un aperitivo, con birra alla spina e vino della costa ligure. Chi passa solo per un bicchiere è il benvenuto.',
    'amb.finestra': 'I posti più belli sono alla finestra: vista su Beilstraße, fiori sul tavolo e il bagliore rosso alle spalle.',
    'aff.title': 'Il San Remo è in affitto',
    'aff.lead': 'Un ristorante arredato e con una storia, nel cuore del Jungbusch. Sala, bancone e cucina professionale sono pronti, il concept con nome, marchio e menù è definito. Come proprietari dell’edificio in Beilstraße 3, Eric e Martin Schweppe cercano gestori che diano vita al San Remo.',
    'aff.ctaVisit': 'Richiedi una visita', 'aff.ctaFacts': 'Vedi i dati principali', 'aff.houseTitle': 'L’edificio',
    'aff.house': 'Un edificio d’epoca bianco con facciata a stucchi, tende sopra le finestre e verde sopra l’ingresso. Il ristorante si trova al piano terra, direttamente sulla strada: ben visibile e inconfondibile.',
    'aff.fAddress': 'Indirizzo', 'aff.fDistrict': 'Zona', 'aff.vDistrict': 'Jungbusch, ai margini del centro', 'aff.fUse': 'Destinazione', 'aff.vUse': 'Ristorante e bar',
    'aff.fRooms': 'Locali', 'aff.vRooms': 'Sala, bancone, cucina professionale', 'aff.fArea': 'Superficie', 'aff.onRequest': 'su richiesta', 'aff.fSeats': 'Coperti',
    'aff.fRent': 'Canone', 'aff.fFrom': 'Disponibile', 'aff.vFrom': 'da concordare', 'aff.fOwner': 'Locatore',
    'aff.roomTitle': 'Sala e bancone',
    'aff.room': 'Boiserie in legno, bancone con spillatrice e vetrina refrigerata, luci rosse e l’insegna al neon: la sala è arredata e ha già oggi un carattere tutto suo.',
    'aff.kitchenTitle': 'La cucina professionale',
    'aff.kitchenLead': 'Piastrelle chiare, acciaio inox ovunque e attrezzata per la ristorazione: dalla linea di cottura con cappa al forno griglia a carbone.',
    'aff.k1': 'Linea di cottura con cappa', 'aff.k2': 'Forno griglia a carbone', 'aff.k3': 'Banco refrigerato con piano in marmo',
    'aff.k4': 'Pass con lampade scaldavivande', 'aff.k5': 'Zona lavaggio con doccetta', 'aff.k6': 'Piano cottura e superfici in acciaio inox',
    'aff.conceptTitle': 'Il concept pronto', 'aff.conceptLead': 'Non affittate solo dei locali, ma un ristorante già pensato fino in fondo.',
    'aff.c1t': 'Nome e storia', 'aff.c1': 'San Remo, Ristorante a Mannheim dal 1977: un nome con radici che resta in mente.',
    'aff.c2t': 'Marchio e logo', 'aff.c2': 'Logotipo, palette in Rosso San Remo e l’insegna al neon come segno di riconoscimento.',
    'aff.c3t': 'Luce e spazio', 'aff.c3': 'Un concept di luce rossa coerente che mette in scena ogni serata.',
    'aff.c4t': 'Menù', 'aff.c4': 'Un menù italiano con accento ligure e tabella degli allergeni, come base per la vostra firma.',
    'aff.c5t': 'Orari', 'aff.c5': 'Pensati per essere snelli: da giovedì a sabato dalle 18.',
    'aff.c6t': 'Sito e prenotazioni', 'aff.c6': 'Questo sito con menù, prenotazione, contatti e indicazioni in tre lingue.',
    'aff.areaTitle': 'La zona',
    'aff.area': 'Il Jungbusch è il quartiere portuale e creativo di Mannheim, tra il centro e il Reno: con la Popakademie, bar, atelier e tanta vita la sera.',
    'aff.a1': 'Popakademie e Musikpark: pochi minuti a piedi', 'aff.a2': 'Fermata del tram “Dalbergstraße”: circa 5 minuti a piedi',
    'aff.a3': 'Stazione centrale di Mannheim: diretta con il bus 60', 'aff.a4': 'Centro e Quadrate: raggiungibili a piedi',
    'aff.ctaHand': 'Venite a conoscere il San Remo', 'aff.ctaTitle': 'Fissa una visita',
    'aff.ctaText': 'Eric e Martin Schweppe vi mostrano volentieri edificio, locali e concept sul posto.',
    'book.hand': 'Il tuo tavolo ti aspetta',
    'book.lead': 'Scegli persone, giorno e orario. La tua richiesta ci arriva via e-mail e confermiamo il prima possibile. Puoi prenotare anche per telefono durante gli orari di apertura al <a href="tel:+4962143744258">+49 621 43744258</a>.',
    'book.s1': 'Quante persone?', 'book.s2': 'Quale giorno?', 'book.s3': 'A che ora?', 'book.s4': 'I tuoi dati',
    'book.less': 'Una persona in meno', 'book.more': 'Una persona in più',
    'book.groups': 'Più di 10 persone? Scrivici, organizziamo volentieri insieme a te.',
    'book.openDays': 'Aperti giovedì, venerdì e sabato dalle 18', 'book.notes': 'Note', 'book.notesPh': 'es. allergie, seggiolone o occasione',
    'book.submit': 'Invia ora come e-mail',
    'form.name': 'Nome', 'form.phone': 'Telefono', 'form.email': 'E-mail', 'form.optional': 'facoltativo',
    'form.privacy': 'I tuoi dati non vengono trasmessi tramite questo sito: prepariamo un’e-mail nel tuo programma di posta, che invii tu stesso. Maggiori informazioni nell’<a href="/datenschutz">informativa sulla privacy</a>.',
    'sent.title': 'Quasi fatto', 'sent.booking': 'La tua richiesta è pronta come e-mail per noi. Inviala dal tuo programma di posta e confermeremo la prenotazione il prima possibile.',
    'sent.contact': 'Il tuo messaggio è pronto come e-mail per noi. Invialo dal tuo programma di posta e ti risponderemo a breve.',
    'sent.fallback': 'Non si è aperto nessun programma di posta? Copia il testo e invialo a ciao@sanremo.ma.',
    'sent.previewLabel': 'Anteprima dell’e-mail', 'sent.open': 'Apri nel programma di posta',
    'sent.copy': 'Copia il testo', 'sent.reopen': 'Riapri l’e-mail', 'sent.again': 'Nuova richiesta', 'sent.againContact': 'Nuovo messaggio',
    'contact.hand': 'Scrivici', 'contact.phoneHint': 'Per telefono ci trovi durante gli orari di apertura, via e-mail sempre.',
    'contact.topic': 'Di cosa si tratta?', 'contact.tGeneral': 'Domanda generale', 'contact.tEvent': 'Feste e gruppi', 'contact.tRent': 'Affitto e visita',
    'contact.tPress': 'Stampa', 'contact.message': 'Il tuo messaggio', 'contact.submit': 'Invia il messaggio come e-mail',
    'dir.hand': 'Come trovarci', 'dir.route': 'Calcola il percorso', 'dir.apple': 'Apri in Mappe di Apple',
    'dir.tramT': 'Tram', 'dir.tram': 'Linea 2 fino a “Dalbergstraße”, poi circa 5 minuti a piedi lungo la Jungbuschstraße.',
    'dir.busT': 'Autobus', 'dir.bus': 'Linee 60 e 61 fino a “Popakademie”. Dalla stazione centrale la linea 60 in direzione Pfeifferswörth porta direttamente lì.',
    'dir.bikeT': 'Bicicletta', 'dir.bike': 'Il Jungbusch è pianeggiante e centrale: in bici dal centro bastano pochi minuti.',
    'dir.carT': 'Auto', 'dir.car': 'I parcheggi nel quartiere sono pochi. Trovi autosilo nei vicini Quadrate del centro.',
    'dir.mapTitle': 'Mostrare la mappa?', 'dir.mapText': 'La mappa viene caricata da OpenStreetMap. In questo modo il tuo indirizzo IP viene trasmesso alla OpenStreetMap Foundation.',
    'dir.mapLoad': 'Carica la mappa', 'dir.mapPrivacy': 'Maggiori informazioni sulla privacy', 'dir.mapPrivacyHref': '/datenschutz#openstreetmap-it',
    'dir.mapTextExt': 'La mappa si apre su openstreetmap.org in una nuova scheda.', 'dir.mapOpenExt': 'Apri la mappa',
    'social.hand': 'Luce al neon per il tuo feed', 'social.note': 'I profili sono fittizi e solo dimostrativi.',
    'alt.hero': 'La sala del San Remo in luce rossa con il bancone e l’insegna al neon “San Remo”',
    'alt.neon': 'L’insegna al neon “San Remo” sopra il bancone', 'alt.menuAntipasti': 'Focaccia con olio d’oliva e sale marino su un tagliere',
    'alt.menuInsalate': 'Posto alla finestra con tavolo rosso alla luce del giorno', 'alt.menuPizza': 'Pizze appena farcite in cucina',
    'alt.menuPasta': 'Tavola apparecchiata con bicchiere di vino e fiori', 'alt.menuDolci': 'Tavolo con fiori davanti all’insegna al neon', 'alt.menuBevande': 'Spillatrice al bancone',
    'alt.sala': 'Tavoli apparecchiati nella sala', 'alt.bancone': 'Bancone con sgabelli e vetrina refrigerata in luce rossa', 'alt.finestra': 'Tavolo alla finestra con fiori e lampada a sospensione',
    'alt.galBar': 'Il bancone sotto l’insegna al neon', 'alt.galRiflesso': 'L’insegna al neon riflessa nella finestra', 'alt.galFinestra': 'Finestra dipinta con fiori',
    'alt.galTavolo': 'Tavolo alla finestra davanti a un muro di mattoni bianchi', 'alt.galTavola': 'Una lunga tavola apparecchiata', 'alt.galLampada': 'Lampada di vetro davanti all’insegna al neon',
    'alt.haus': 'Facciata d’epoca bianca di Beilstraße 3 con tende al piano terra', 'alt.gastraum': 'Sala con bancone, tavoli e insegna al neon in luce rossa',
    'alt.k1': 'Linea di cottura con cappa e lampade scaldavivande', 'alt.k2': 'Forno griglia a carbone in una nicchia piastrellata', 'alt.k3': 'Banco refrigerato con piano in marmo sotto applique rosse',
    'alt.k4': 'Pass con lampade scaldavivande cromate', 'alt.k5': 'Zona lavaggio con doccetta', 'alt.k6': 'Superfici e piano cottura in acciaio inox sotto la cappa',
    'alt.lage': 'Ingresso del San Remo con tende e scritta al neon nella vetrina', 'alt.prenota': 'Bancone alla finestra con sgabelli rossi in luce calda',
    'alt.eingang': 'Finestra con tenda e numero civico 3', 'alt.ig1': 'Focaccia con pomodorini', 'alt.ig2': 'Finestra con tenda e lampade rosse',
    'alt.ig3': 'Spine della birra al bancone', 'alt.ig4': 'Tavola apparecchiata con fiori', 'alt.ig5': 'Finestra dipinta nella sala', 'alt.ig6': 'Tavolo rosso in luce rossa',
  },
};

// Strings used only by scripts (not present in the HTML)
const STR = {
  de: {
    person: 'Person', persons: 'Personen', prevMonth: 'Vorheriger Monat', nextMonth: 'Nächster Monat', closed: 'geschlossen',
    pickDayFirst: 'Bitte wählen Sie zuerst einen Tag.', clock: 'Uhr',
    errDate: 'Bitte wählen Sie einen Tag.', errTime: 'Bitte wählen Sie eine Uhrzeit.', errName: 'Bitte geben Sie Ihren Namen ein.',
    errPhone: 'Bitte geben Sie eine Telefonnummer an, unter der wir Sie erreichen.', errEmail: 'Diese E-Mail-Adresse ist unvollständig.',
    errEmailReq: 'Bitte geben Sie Ihre E-Mail-Adresse an.', errMessage: 'Bitte schreiben Sie uns eine kurze Nachricht.',
    summary: 'Ihre Anfrage', copied: 'Text kopiert. Senden Sie ihn an ciao@sanremo.ma.', copyFail: 'Kopieren hat nicht geklappt. Bitte markieren Sie den Text selbst.',
    social: 'Dieses Profil ist fiktiv. Die Seite dient nur zur Darstellung.', mapOpen: 'Größere Karte öffnen', mapFrame: 'Karte: San Remo, Beilstraße 3, Mannheim',
    pdfLang: 'PDF, Deutsch', mailTo: 'An', mailSubject: 'Betreff',
    pdfUnavailable: 'Der Download ist in dieser Ansicht nicht verfügbar.', pdfBusy: 'Bitte einen Moment warten und dann erneut tippen.',
    bookSubject: 'Reservierungsanfrage: {date}, {time} Uhr, {n}',
    bookBody: 'Buongiorno San Remo,\n\nich möchte gern einen Tisch reservieren:\n\nTag: {date}\nUhrzeit: {time} Uhr\nPersonen: {count}\nName: {name}\nTelefon: {phone}{email}{notes}\n\nVielen Dank und bis bald!\n{name}\n\n– gesendet über sanremo.ma',
    emailLine: '\nE-Mail: {v}', notesLine: '\nAnmerkungen: {v}',
    contactSubject: '{topic}: Nachricht von {name}',
    contactBody: 'Buongiorno San Remo,\n\n{message}\n\n{name}\nE-Mail: {email}{phone}\n\n– gesendet über sanremo.ma',
    phoneLine: '\nTelefon: {v}',
    topics: { general: 'Allgemeine Frage', event: 'Feier & Gruppen', rent: 'Vermietung & Besichtigung', press: 'Presse' },
    tabs: { antipasti: 'Antipasti', insalate: 'Insalate', pizza: 'Pizza', pasta: 'Pasta', dolci: 'Dolci', bevande: 'Bevande' },
  },
  en: {
    person: 'guest', persons: 'guests', prevMonth: 'Previous month', nextMonth: 'Next month', closed: 'closed',
    pickDayFirst: 'Please choose a day first.', clock: '',
    errDate: 'Please choose a day.', errTime: 'Please choose a time.', errName: 'Please enter your name.',
    errPhone: 'Please enter a phone number where we can reach you.', errEmail: 'This email address looks incomplete.',
    errEmailReq: 'Please enter your email address.', errMessage: 'Please write us a short message.',
    summary: 'Your request', copied: 'Text copied. Please send it to ciao@sanremo.ma.', copyFail: 'Copying did not work. Please select the text yourself.',
    social: 'This profile is fictional. This website is for demonstration only.', mapOpen: 'Open larger map', mapFrame: 'Map: San Remo, Beilstraße 3, Mannheim',
    pdfLang: 'PDF, English', mailTo: 'To', mailSubject: 'Subject',
    pdfUnavailable: 'Downloads are not available in this view.', pdfBusy: 'Please wait a moment and then tap again.',
    bookSubject: 'Table request: {date}, {time}, {n}',
    bookBody: 'Buongiorno San Remo,\n\nI would like to book a table:\n\nDay: {date}\nTime: {time}\nGuests: {count}\nName: {name}\nPhone: {phone}{email}{notes}\n\nMany thanks and see you soon!\n{name}\n\n– sent via sanremo.ma',
    emailLine: '\nEmail: {v}', notesLine: '\nNotes: {v}',
    contactSubject: '{topic}: message from {name}',
    contactBody: 'Buongiorno San Remo,\n\n{message}\n\n{name}\nEmail: {email}{phone}\n\n– sent via sanremo.ma',
    phoneLine: '\nPhone: {v}',
    topics: { general: 'General question', event: 'Parties & groups', rent: 'Renting & viewing', press: 'Press' },
    tabs: { antipasti: 'Antipasti', insalate: 'Insalate', pizza: 'Pizza', pasta: 'Pasta', dolci: 'Dolci', bevande: 'Bevande' },
  },
  it: {
    person: 'persona', persons: 'persone', prevMonth: 'Mese precedente', nextMonth: 'Mese successivo', closed: 'chiuso',
    pickDayFirst: 'Scegli prima un giorno.', clock: '',
    errDate: 'Scegli un giorno.', errTime: 'Scegli un orario.', errName: 'Inserisci il tuo nome.',
    errPhone: 'Inserisci un numero di telefono a cui possiamo raggiungerti.', errEmail: 'Questo indirizzo e-mail sembra incompleto.',
    errEmailReq: 'Inserisci il tuo indirizzo e-mail.', errMessage: 'Scrivici un breve messaggio.',
    summary: 'La tua richiesta', copied: 'Testo copiato. Invialo a ciao@sanremo.ma.', copyFail: 'Copia non riuscita. Seleziona il testo manualmente.',
    social: 'Questo profilo è fittizio. Il sito è solo dimostrativo.', mapOpen: 'Apri la mappa grande', mapFrame: 'Mappa: San Remo, Beilstraße 3, Mannheim',
    pdfLang: 'PDF, italiano', mailTo: 'A', mailSubject: 'Oggetto',
    pdfUnavailable: 'Il download non è disponibile in questa visualizzazione.', pdfBusy: 'Attendi un momento e poi tocca di nuovo.',
    bookSubject: 'Richiesta di prenotazione: {date}, ore {time}, {n}',
    bookBody: 'Buongiorno San Remo,\n\nvorrei prenotare un tavolo:\n\nGiorno: {date}\nOra: {time}\nPersone: {count}\nNome: {name}\nTelefono: {phone}{email}{notes}\n\nGrazie mille e a presto!\n{name}\n\n– inviato da sanremo.ma',
    emailLine: '\nE-mail: {v}', notesLine: '\nNote: {v}',
    contactSubject: '{topic}: messaggio da {name}',
    contactBody: 'Buongiorno San Remo,\n\n{message}\n\n{name}\nE-mail: {email}{phone}\n\n– inviato da sanremo.ma',
    phoneLine: '\nTelefono: {v}',
    topics: { general: 'Domanda generale', event: 'Feste e gruppi', rent: 'Affitto e visita', press: 'Stampa' },
    tabs: { antipasti: 'Antipasti', insalate: 'Insalate', pizza: 'Pizza', pasta: 'Pasta', dolci: 'Dolci', bevande: 'Bevande' },
  },
};

const LOCALES = { de: 'de-DE', en: 'en-GB', it: 'it-IT' };
const DE = {};            // harvested German strings
let current = 'de';

export const getLang = () => current;
export const locale = () => LOCALES[current];
export const s = (key) => STR[current][key] ?? STR.de[key];
export const t = (key) => (current === 'de' ? DE[key] : DICT[current][key]) ?? DE[key] ?? key;
export const fill = (tpl, map) => tpl.replace(/\{(\w+)\}/g, (_, k) => (map[k] ?? ''));

function harvest() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const k = el.dataset.i18n;
    if (!(k in DE)) DE[k] = el.innerHTML;
  });
  document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    el.dataset.i18nAttr.split(';').forEach((pair) => {
      const [attr, k] = pair.split(':');
      if (k && !(k in DE)) DE[k] = el.getAttribute(attr) ?? '';
    });
  });
}

function apply(lang) {
  const dict = lang === 'de' ? DE : DICT[lang];
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const v = dict[el.dataset.i18n] ?? DE[el.dataset.i18n];
    if (v !== undefined && el.innerHTML !== v) el.innerHTML = v;
  });
  document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    el.dataset.i18nAttr.split(';').forEach((pair) => {
      const [attr, k] = pair.split(':');
      const v = dict[k] ?? DE[k];
      if (k && v !== undefined) el.setAttribute(attr, v);
    });
  });
  // legal pages carry whole blocks per language
  const blocks = document.querySelectorAll('[data-lang-block]');
  if (blocks.length) blocks.forEach((b) => { b.hidden = b.dataset.langBlock !== lang; });
  document.querySelectorAll('button[data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
  const d = document.documentElement;
  d.lang = lang; d.dataset.lang = lang;
  d.classList.remove('i18n-pending');
}

export function setLang(lang, { save = false } = {}) {
  if (!LANGS.includes(lang)) lang = 'de';
  current = lang;
  apply(lang);
  if (save) {
    try { localStorage.setItem(STORE, lang); } catch (e) { /* storage blocked: the language still switches for this visit */ }
    try {
      const url = new URL(location.href);
      if (url.searchParams.has('lang')) { url.searchParams.delete('lang'); history.replaceState(null, '', url); }
    } catch (e) { /* some embedded views do not allow URL changes */ }
  }
  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

export function initI18n() {
  harvest();
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-lang]');
    if (b && b.matches('button')) setLang(b.dataset.lang, { save: true });
  });
  setLang(document.documentElement.dataset.lang || 'de');
}
