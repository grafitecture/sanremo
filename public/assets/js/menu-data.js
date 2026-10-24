// San Remo – La Carta. Single source of truth for the website, the menu PDF and the allergen card PDF.
// Allergen codes follow the 14 EU main allergens (LMIV, Annex II), lettered A–N.
// Additive numbers follow the common German labelling list (ZZulV / LMIV).
// a = allergens, z = additives, diet: 'vegan' | 'veg' | null, hot = spicy, alc = contains alcohol,
// tags: 'consiglio' (our recommendation), 'liguria' (Ligurian speciality).

export const LANGS = ['de', 'en', 'it'];

export const ALLERGENS = [
  { code: 'A', de: 'Glutenhaltiges Getreide', en: 'Cereals containing gluten', it: 'Cereali contenenti glutine', short: { de: 'Gluten', en: 'Gluten', it: 'Glutine' } },
  { code: 'B', de: 'Krebstiere', en: 'Crustaceans', it: 'Crostacei', short: { de: 'Krebstiere', en: 'Crustaceans', it: 'Crostacei' } },
  { code: 'C', de: 'Eier', en: 'Eggs', it: 'Uova', short: { de: 'Eier', en: 'Eggs', it: 'Uova' } },
  { code: 'D', de: 'Fisch', en: 'Fish', it: 'Pesce', short: { de: 'Fisch', en: 'Fish', it: 'Pesce' } },
  { code: 'E', de: 'Erdnüsse', en: 'Peanuts', it: 'Arachidi', short: { de: 'Erdnüsse', en: 'Peanuts', it: 'Arachidi' } },
  { code: 'F', de: 'Soja', en: 'Soya', it: 'Soia', short: { de: 'Soja', en: 'Soya', it: 'Soia' } },
  { code: 'G', de: 'Milch und Milcherzeugnisse (inkl. Laktose)', en: 'Milk and dairy (incl. lactose)', it: 'Latte e derivati (incl. lattosio)', short: { de: 'Milch', en: 'Milk', it: 'Latte' } },
  { code: 'H', de: 'Schalenfrüchte (Nüsse)', en: 'Tree nuts', it: 'Frutta a guscio', short: { de: 'Nüsse', en: 'Nuts', it: 'Frutta a guscio' } },
  { code: 'I', de: 'Sellerie', en: 'Celery', it: 'Sedano', short: { de: 'Sellerie', en: 'Celery', it: 'Sedano' } },
  { code: 'J', de: 'Senf', en: 'Mustard', it: 'Senape', short: { de: 'Senf', en: 'Mustard', it: 'Senape' } },
  { code: 'K', de: 'Sesamsamen', en: 'Sesame', it: 'Sesamo', short: { de: 'Sesam', en: 'Sesame', it: 'Sesamo' } },
  { code: 'L', de: 'Schwefeldioxid und Sulfite', en: 'Sulphur dioxide and sulphites', it: 'Anidride solforosa e solfiti', short: { de: 'Sulfite', en: 'Sulphites', it: 'Solfiti' } },
  { code: 'M', de: 'Lupinen', en: 'Lupin', it: 'Lupini', short: { de: 'Lupinen', en: 'Lupin', it: 'Lupini' } },
  { code: 'N', de: 'Weichtiere', en: 'Molluscs', it: 'Molluschi', short: { de: 'Weichtiere', en: 'Molluscs', it: 'Molluschi' } },
];

export const ADDITIVES = [
  { n: 1, de: 'mit Farbstoff', en: 'with colouring', it: 'con coloranti' },
  { n: 2, de: 'mit Konservierungsstoff', en: 'with preservative', it: 'con conservanti' },
  { n: 3, de: 'mit Antioxidationsmittel', en: 'with antioxidant', it: 'con antiossidanti' },
  { n: 4, de: 'mit Geschmacksverstärker', en: 'with flavour enhancer', it: 'con esaltatori di sapidità' },
  { n: 5, de: 'geschwefelt', en: 'sulphurised', it: 'solforato' },
  { n: 6, de: 'geschwärzt', en: 'blackened', it: 'annerito' },
  { n: 7, de: 'gewachst', en: 'waxed', it: 'cerato' },
  { n: 8, de: 'mit Phosphat', en: 'with phosphate', it: 'con fosfati' },
  { n: 9, de: 'mit Süßungsmittel', en: 'with sweetener', it: 'con edulcoranti' },
  { n: 10, de: 'enthält eine Phenylalaninquelle', en: 'contains a source of phenylalanine', it: 'contiene una fonte di fenilalanina' },
  { n: 11, de: 'koffeinhaltig', en: 'contains caffeine', it: 'contiene caffeina' },
  { n: 12, de: 'chininhaltig', en: 'contains quinine', it: 'contiene chinino' },
];

const d = (de, en, it) => ({ de, en, it });

export const MENU = [
  {
    id: 'antipasti', image: 'menu-antipasti',
    title: d('Antipasti', 'Antipasti', 'Antipasti'),
    sub: d('Zum Teilen und Anfangen', 'To share and to start', 'Da condividere, per iniziare'),
    groups: [{ items: [
      { name: 'Focaccia della Casa', price: 6.5, a: ['A'], diet: 'vegan', tags: ['liguria'],
        desc: d('Hausgebackene ligurische Focaccia mit Kirschtomaten, Rosmarin, Meersalz und Olivenöl', 'House-baked Ligurian focaccia with cherry tomatoes, rosemary, sea salt and olive oil', 'Focaccia ligure fatta in casa con pomodorini, rosmarino, sale marino e olio d’oliva') },
      { name: 'Bruschetta al Pomodoro', price: 7.5, a: ['A'], diet: 'vegan',
        desc: d('Geröstetes Landbrot mit Tomaten, Knoblauch, Basilikum und Olivenöl', 'Toasted country bread with tomatoes, garlic, basil and olive oil', 'Pane casereccio tostato con pomodoro, aglio, basilico e olio d’oliva') },
      { name: 'Farinata di Ceci', price: 7.9, a: [], diet: 'vegan', tags: ['liguria'],
        desc: d('Dünner Kichererbsenfladen aus dem Ofen mit Rosmarin und schwarzem Pfeffer, von Natur aus glutenfrei', 'Thin oven-baked chickpea flatbread with rosemary and black pepper, naturally gluten-free', 'Sottile torta di ceci al forno con rosmarino e pepe nero, naturalmente senza glutine') },
      { name: 'Crema di Pomodoro', price: 7.5, a: ['G', 'I'], diet: 'veg',
        desc: d('Tomatencremesuppe mit Basilikum und einem Schuss Sahne', 'Cream of tomato soup with basil and a dash of cream', 'Vellutata di pomodoro con basilico e un filo di panna') },
      { name: 'Burrata con Pomodorini', price: 13.9, a: ['A', 'G'], diet: 'veg',
        desc: d('Cremige Burrata mit Kirschtomaten, Basilikum, Olivenöl und Focaccia', 'Creamy burrata with cherry tomatoes, basil, olive oil and focaccia', 'Burrata cremosa con pomodorini, basilico, olio d’oliva e focaccia') },
      { name: 'Vitello Tonnato', price: 14.9, a: ['C', 'D', 'J'],
        desc: d('Zart gegartes Kalbfleisch mit Thunfisch-Kapern-Sauce und Rucola', 'Tender slow-cooked veal with tuna and caper sauce and rocket', 'Vitello cotto a bassa temperatura con salsa tonnata, capperi e rucola') },
      { name: 'Carpaccio di Manzo', price: 15.5, a: ['G'],
        desc: d('Hauchdünnes Rinderfilet mit Rucola, Parmigiano, Zitrone und Olivenöl', 'Wafer-thin beef fillet with rocket, Parmigiano, lemon and olive oil', 'Filetto di manzo sottilissimo con rucola, Parmigiano, limone e olio d’oliva') },
      { name: 'Antipasto San Remo', note: d('für zwei Personen', 'for two', 'per due persone'), price: 24, a: ['A', 'G'], z: [2, 3], tags: ['consiglio'],
        desc: d('Prosciutto crudo, Salame, Pecorino, gegrilltes Gemüse, Taggiasca-Oliven, Burrata und Focaccia', 'Prosciutto crudo, salami, pecorino, grilled vegetables, Taggiasca olives, burrata and focaccia', 'Prosciutto crudo, salame, pecorino, verdure grigliate, olive taggiasche, burrata e focaccia') },
    ] }],
  },
  {
    id: 'insalate', image: 'menu-insalate',
    title: d('Insalate', 'Insalate', 'Insalate'),
    sub: d('Frisch und knackig', 'Crisp and fresh', 'Fresche e croccanti'),
    groups: [{ items: [
      { name: 'Insalata Mista', price: 8.9, a: ['J'], diet: 'vegan',
        desc: d('Blattsalate, Kirschtomaten, Gurke, Karotte und Hausdressing', 'Leaf salad, cherry tomatoes, cucumber, carrot and house dressing', 'Insalata a foglia, pomodorini, cetriolo, carota e condimento della casa') },
      { name: 'Rucola e Parmigiano', price: 11.9, a: ['G', 'L'], diet: 'veg',
        desc: d('Rucola, Kirschtomaten, gehobelter Parmigiano und Aceto Balsamico', 'Rocket, cherry tomatoes, shaved Parmigiano and balsamic vinegar', 'Rucola, pomodorini, scaglie di Parmigiano e aceto balsamico') },
      { name: 'Condiglione Ligure', price: 14.5, a: ['C', 'D'], tags: ['liguria'],
        desc: d('Ligurischer Sommersalat mit Tomaten, Paprika, Gurke, Thunfisch, Ei, Sardellen, Taggiasca-Oliven und Basilikum', 'Ligurian summer salad with tomatoes, peppers, cucumber, tuna, egg, anchovies, Taggiasca olives and basil', 'Insalata estiva ligure con pomodori, peperoni, cetriolo, tonno, uovo, acciughe, olive taggiasche e basilico') },
      { name: 'Insalata di Capra', price: 14.5, a: ['G', 'H', 'J'], diet: 'veg',
        desc: d('Blattsalate mit gratiniertem Ziegenkäse, Honig, Walnüssen und Birne', 'Leaf salad with grilled goat’s cheese, honey, walnuts and pear', 'Insalata a foglia con caprino gratinato, miele, noci e pera') },
      { name: 'Insalata con Pollo', price: 15.5, a: ['G', 'J'],
        desc: d('Blattsalate, gebratene Hähnchenbrust, Kirschtomaten, Parmigiano und Zitronendressing', 'Leaf salad, pan-fried chicken breast, cherry tomatoes, Parmigiano and lemon dressing', 'Insalata a foglia, petto di pollo alla piastra, pomodorini, Parmigiano e citronette') },
    ] }],
  },
  {
    id: 'pizza', image: 'menu-pizza',
    title: d('Pizza', 'Pizza', 'Pizza'),
    sub: d('Aus dem Ofen, Ø 32 cm', 'From the oven, Ø 32 cm', 'Dal forno, Ø 32 cm'),
    groups: [
      { title: d('Verde', 'Verde', 'Verde'), note: d('vegetarisch', 'vegetarian', 'vegetariane'), items: [
        { name: 'Margherita', price: 9.5, a: ['A', 'G'], diet: 'veg',
          desc: d('Tomatensauce, Fior di Latte, Basilikum', 'Tomato sauce, fior di latte, basil', 'Pomodoro, fior di latte, basilico') },
        { name: 'Marinara', price: 8.5, a: ['A'], diet: 'vegan',
          desc: d('Tomatensauce, Knoblauch, Oregano und Olivenöl, ohne Käse', 'Tomato sauce, garlic, oregano and olive oil, no cheese', 'Pomodoro, aglio, origano e olio d’oliva, senza formaggio') },
        { name: 'Funghi', price: 11.5, a: ['A', 'G'], diet: 'veg',
          desc: d('Tomatensauce, Fior di Latte, frische Champignons, Petersilie', 'Tomato sauce, fior di latte, fresh mushrooms, parsley', 'Pomodoro, fior di latte, champignon freschi, prezzemolo') },
        { name: 'Parmigiana', price: 12.9, a: ['A', 'G'], diet: 'veg',
          desc: d('Tomatensauce, Fior di Latte, gebackene Aubergine, Parmigiano, Basilikum', 'Tomato sauce, fior di latte, baked aubergine, Parmigiano, basil', 'Pomodoro, fior di latte, melanzane al forno, Parmigiano, basilico') },
        { name: 'Vegetariana', price: 12.9, a: ['A', 'G'], diet: 'veg',
          desc: d('Tomatensauce, Fior di Latte, gegrilltes Gemüse, Rucola', 'Tomato sauce, fior di latte, grilled vegetables, rocket', 'Pomodoro, fior di latte, verdure grigliate, rucola') },
        { name: 'Quattro Formaggi', price: 13.5, a: ['A', 'G'], diet: 'veg',
          desc: d('Fior di Latte, Gorgonzola, Pecorino und Parmigiano, ohne Tomate', 'Fior di latte, gorgonzola, pecorino and Parmigiano, no tomato', 'Fior di latte, gorgonzola, pecorino e Parmigiano, bianca') },
        { name: 'Pizza San Remo', price: 15.9, a: ['A', 'G'], diet: 'veg', tags: ['consiglio'],
          desc: d('Tomatensauce, Burrata, Kirschtomaten, Pesto Genovese, Basilikum', 'Tomato sauce, burrata, cherry tomatoes, pesto genovese, basil', 'Pomodoro, burrata, pomodorini, pesto genovese, basilico') },
      ] },
      { title: d('Carne', 'Carne', 'Carne'), items: [
        { name: 'Salame', price: 11.9, a: ['A', 'G'], z: [2, 3],
          desc: d('Tomatensauce, Fior di Latte, italienische Salami', 'Tomato sauce, fior di latte, Italian salami', 'Pomodoro, fior di latte, salame') },
        { name: 'Diavola', price: 12.9, a: ['A', 'G'], z: [2, 3], hot: true,
          desc: d('Tomatensauce, Fior di Latte, scharfe Salami, Peperoncino', 'Tomato sauce, fior di latte, spicy salami, chilli', 'Pomodoro, fior di latte, salame piccante, peperoncino') },
        { name: 'Prosciutto e Funghi', price: 12.9, a: ['A', 'G'], z: [2, 3, 8],
          desc: d('Tomatensauce, Fior di Latte, Kochschinken, Champignons', 'Tomato sauce, fior di latte, cooked ham, mushrooms', 'Pomodoro, fior di latte, prosciutto cotto, funghi') },
        { name: 'Capricciosa', price: 13.9, a: ['A', 'G'], z: [2, 3, 8],
          desc: d('Tomatensauce, Fior di Latte, Kochschinken, Champignons, Artischocken, Taggiasca-Oliven', 'Tomato sauce, fior di latte, cooked ham, mushrooms, artichokes, Taggiasca olives', 'Pomodoro, fior di latte, prosciutto cotto, funghi, carciofi, olive taggiasche') },
        { name: 'Calzone', price: 13.9, a: ['A', 'G'], z: [2, 3, 8],
          desc: d('Gefüllt mit Tomatensauce, Fior di Latte, Ricotta, Kochschinken und Salami', 'Folded and filled with tomato sauce, fior di latte, ricotta, cooked ham and salami', 'Ripieno di pomodoro, fior di latte, ricotta, prosciutto cotto e salame') },
        { name: 'Crudo e Rucola', price: 14.9, a: ['A', 'G'],
          desc: d('Tomatensauce, Fior di Latte, Prosciutto crudo, Rucola, Parmigiano', 'Tomato sauce, fior di latte, prosciutto crudo, rocket, Parmigiano', 'Pomodoro, fior di latte, prosciutto crudo, rucola, Parmigiano') },
        { name: '’Nduja e Burrata', price: 15.5, a: ['A', 'G'], z: [2, 3], hot: true,
          desc: d('Tomatensauce, Fior di Latte, scharfe kalabrische ’Nduja, Burrata, Basilikum', 'Tomato sauce, fior di latte, spicy Calabrian ’nduja, burrata, basil', 'Pomodoro, fior di latte, ’nduja calabrese piccante, burrata, basilico') },
      ] },
      { title: d('Mare', 'Mare', 'Mare'), items: [
        { name: 'Sardenaira', price: 12.5, a: ['A', 'D'], tags: ['liguria'],
          desc: d('Die Pizza aus Sanremo: Tomaten, Sardellen, Taggiasca-Oliven, Kapern, Knoblauch und Oregano, ohne Käse', 'The pizza of Sanremo: tomatoes, anchovies, Taggiasca olives, capers, garlic and oregano, no cheese', 'La pizza di Sanremo: pomodoro, acciughe, olive taggiasche, capperi, aglio e origano, senza formaggio') },
        { name: 'Tonno e Cipolla', price: 12.9, a: ['A', 'D', 'G'],
          desc: d('Tomatensauce, Fior di Latte, Thunfisch, rote Zwiebeln', 'Tomato sauce, fior di latte, tuna, red onions', 'Pomodoro, fior di latte, tonno, cipolla rossa') },
        { name: 'Gamberi e Zucchine', price: 15.9, a: ['A', 'B', 'G'],
          desc: d('Fior di Latte, Garnelen, Zucchini, Zitronenzeste und Knoblauch, ohne Tomate', 'Fior di latte, prawns, courgette, lemon zest and garlic, no tomato', 'Fior di latte, gamberi, zucchine, scorza di limone e aglio, bianca') },
        { name: 'Frutti di Mare', price: 15.9, a: ['A', 'B', 'N'],
          desc: d('Tomatensauce, Meeresfrüchte, Knoblauch und Petersilie, ohne Käse', 'Tomato sauce, seafood, garlic and parsley, no cheese', 'Pomodoro, frutti di mare, aglio e prezzemolo, senza formaggio') },
      ] },
    ],
  },
  {
    id: 'pasta', image: 'menu-pasta',
    title: d('Pasta & Risotto', 'Pasta & Risotto', 'Pasta & Risotto'),
    sub: d('Frisch gekocht, al dente', 'Freshly cooked, al dente', 'Cucinata al momento, al dente'),
    groups: [{ items: [
      { name: 'Trofie al Pesto Genovese', price: 13.9, a: ['A', 'G'], diet: 'veg', tags: ['consiglio', 'liguria'],
        desc: d('Ligurische Trofie mit Pesto aus Basilikum, Pinienkernen, Parmigiano und Pecorino, dazu Kartoffeln und grüne Bohnen', 'Ligurian trofie with a pesto of basil, pine nuts, Parmigiano and pecorino, with potatoes and green beans', 'Trofie liguri al pesto di basilico, pinoli, Parmigiano e pecorino, con patate e fagiolini') },
      { name: 'Spaghetti al Pomodoro', price: 10.9, a: ['A'], diet: 'vegan',
        desc: d('Tomatensugo, Basilikum, Olivenöl', 'Tomato sugo, basil, olive oil', 'Sugo di pomodoro, basilico, olio d’oliva') },
      { name: 'Spaghetti Aglio, Olio e Peperoncino', price: 10.9, a: ['A'], diet: 'vegan', hot: true,
        desc: d('Knoblauch, Olivenöl, Peperoncino, Petersilie', 'Garlic, olive oil, chilli, parsley', 'Aglio, olio d’oliva, peperoncino, prezzemolo') },
      { name: 'Penne all’Arrabbiata', price: 11.5, a: ['A'], diet: 'vegan', hot: true,
        desc: d('Scharfer Tomatensugo mit Knoblauch, Peperoncino und Petersilie', 'Spicy tomato sugo with garlic, chilli and parsley', 'Sugo di pomodoro piccante con aglio, peperoncino e prezzemolo') },
      { name: 'Gnocchi alla Sorrentina', price: 13.9, a: ['A', 'C', 'G'], diet: 'veg',
        desc: d('Kartoffelgnocchi in Tomatensugo, mit Fior di Latte und Basilikum überbacken', 'Potato gnocchi in tomato sugo, baked with fior di latte and basil', 'Gnocchi di patate al pomodoro, gratinati con fior di latte e basilico') },
      { name: 'Spaghetti alla Carbonara', price: 14.5, a: ['A', 'C', 'G'], z: [2, 3],
        desc: d('Guanciale, Eigelb, Pecorino Romano und schwarzer Pfeffer, ganz ohne Sahne', 'Guanciale, egg yolk, Pecorino Romano and black pepper, no cream', 'Guanciale, tuorlo d’uovo, pecorino romano e pepe nero, senza panna') },
      { name: 'Tagliatelle al Ragù', price: 14.9, a: ['A', 'C', 'G', 'I', 'L'], alc: true,
        desc: d('Frische Eiernudeln mit langsam geschmortem Rinderragù und Parmigiano', 'Fresh egg tagliatelle with slow-cooked beef ragù and Parmigiano', 'Tagliatelle all’uovo con ragù di manzo cotto lentamente e Parmigiano') },
      { name: 'Lasagne al Forno', price: 14.9, a: ['A', 'C', 'G', 'I', 'L'], alc: true,
        desc: d('Hausgemachte Lasagne mit Rinderragù, Béchamel und Parmigiano', 'Home-made lasagne with beef ragù, béchamel and Parmigiano', 'Lasagne fatte in casa con ragù di manzo, besciamella e Parmigiano') },
      { name: 'Pansoti alla Salsa di Noci', price: 15.5, a: ['A', 'C', 'G', 'H'], diet: 'veg', tags: ['liguria'],
        desc: d('Ligurische Teigtaschen mit Ricotta und Wildkräutern in Walnusssauce', 'Ligurian ravioli filled with ricotta and wild herbs in walnut sauce', 'Pansoti liguri ripieni di ricotta ed erbe selvatiche con salsa di noci') },
      { name: 'Linguine alle Vongole', price: 18.5, a: ['A', 'L', 'N'], alc: true,
        desc: d('Venusmuscheln, Knoblauch, Weißwein, Petersilie und ein Hauch Peperoncino', 'Clams, garlic, white wine, parsley and a hint of chilli', 'Vongole, aglio, vino bianco, prezzemolo e un pizzico di peperoncino') },
      { name: 'Spaghetti ai Frutti di Mare', price: 19.5, a: ['A', 'B', 'L', 'N'], alc: true,
        desc: d('Garnelen, Miesmuscheln, Calamari, Kirschtomaten, Knoblauch und Weißwein', 'Prawns, mussels, squid, cherry tomatoes, garlic and white wine', 'Gamberi, cozze, calamari, pomodorini, aglio e vino bianco') },
      { name: 'Risotto ai Funghi Porcini', price: 17.5, a: ['G', 'I', 'L'], diet: 'veg', alc: true,
        desc: d('Carnaroli-Reis mit Steinpilzen, Weißwein, Parmigiano und Petersilie', 'Carnaroli rice with porcini mushrooms, white wine, Parmigiano and parsley', 'Riso Carnaroli con funghi porcini, vino bianco, Parmigiano e prezzemolo') },
    ] }],
  },
  {
    id: 'dolci', image: 'menu-dolci',
    title: d('Dolci', 'Dolci', 'Dolci'),
    sub: d('Zum süßen Schluss', 'A sweet finale', 'Per finire in dolcezza'),
    groups: [{ items: [
      { name: 'Tiramisù della Casa', price: 7.5, a: ['A', 'C', 'G', 'L'], z: [11], diet: 'veg', alc: true, tags: ['consiglio'],
        desc: d('Löffelbiskuit, Mascarpone, Espresso, ein Hauch Marsala und Kakao', 'Ladyfingers, mascarpone, espresso, a touch of Marsala and cocoa', 'Savoiardi, mascarpone, caffè espresso, un tocco di Marsala e cacao') },
      { name: 'Panna Cotta ai Frutti di Bosco', price: 6.9, a: ['G'], diet: 'veg',
        desc: d('Vanille-Panna-Cotta mit Waldbeeren', 'Vanilla panna cotta with forest berries', 'Panna cotta alla vaniglia con frutti di bosco') },
      { name: 'Torta Caprese', price: 7.5, a: ['C', 'G', 'H'], diet: 'veg',
        desc: d('Saftiger Schokoladen-Mandelkuchen ohne Mehl, mit Vanilleeis', 'Moist flourless chocolate and almond cake with vanilla ice cream', 'Torta morbida al cioccolato e mandorle senza farina, con gelato alla vaniglia') },
      { name: 'Affogato al Caffè', price: 5.9, a: ['C', 'G'], z: [11], diet: 'veg',
        desc: d('Vanilleeis, übergossen mit heißem Espresso', 'Vanilla ice cream drowned in hot espresso', 'Gelato alla vaniglia affogato nel caffè espresso') },
      { name: 'Sorbetto al Limone', price: 5.5, a: [], diet: 'vegan',
        desc: d('Erfrischendes Zitronensorbet', 'Refreshing lemon sorbet', 'Sorbetto rinfrescante al limone') },
      { name: 'Canestrelli e Caffè', price: 4.9, a: ['A', 'C', 'G'], z: [11], diet: 'veg', tags: ['liguria'],
        desc: d('Ligurisches Mürbegebäck mit Puderzucker, dazu ein Espresso', 'Ligurian shortbread with icing sugar, served with an espresso', 'Canestrelli liguri con zucchero a velo, serviti con un espresso') },
    ] }],
  },
  {
    id: 'bevande', image: 'menu-bevande',
    title: d('Bevande', 'Bevande', 'Bevande'),
    sub: d('Aperitivo, Vino und Caffè', 'Aperitivo, wine and coffee', 'Aperitivo, vino e caffè'),
    groups: [
      { title: d('Aperitivi', 'Aperitivi', 'Aperitivi'), items: [
        { name: 'Spritz Aperitivo', vol: '0,2 l', price: 7.9, a: ['L'], z: [1], alc: true,
          desc: d('Bitterorangen-Aperitif, Prosecco, Soda und Orange', 'Bitter orange aperitif, prosecco, soda and orange', 'Aperitivo all’arancia amara, prosecco, soda e arancia') },
        { name: 'Limoncello Spritz', vol: '0,2 l', price: 8.5, a: ['L'], alc: true,
          desc: d('Limoncello, Prosecco, Soda und frische Minze', 'Limoncello, prosecco, soda and fresh mint', 'Limoncello, prosecco, soda e menta fresca') },
        { name: 'Negroni', vol: '6 cl', price: 9.5, a: ['L'], z: [1], alc: true,
          desc: d('Gin, Bitter und roter Wermut', 'Gin, bitter and red vermouth', 'Gin, bitter e vermouth rosso') },
      ] },
      { title: d('Vino', 'Vino', 'Vino'), items: [
        { name: 'Vermentino', note: d('Riviera Ligure di Ponente DOC', 'Riviera Ligure di Ponente DOC', 'Riviera Ligure di Ponente DOC'), prices: [['0,2 l', 7.9], ['0,75 l', 28]], a: ['L'], alc: true, tags: ['liguria'],
          desc: d('Weiß, frisch und mineralisch, von der Riviera rund um Sanremo', 'White, fresh and mineral, from the Riviera around Sanremo', 'Bianco, fresco e minerale, dalla Riviera intorno a Sanremo') },
        { name: 'Rossese di Dolceacqua', note: d('DOC', 'DOC', 'DOC'), prices: [['0,2 l', 8.5], ['0,75 l', 32]], a: ['L'], alc: true, tags: ['liguria'],
          desc: d('Rot, leicht und fruchtig, aus dem Hinterland von Sanremo', 'Red, light and fruity, from the hills behind Sanremo', 'Rosso, leggero e fruttato, dall’entroterra di Sanremo') },
        { name: 'Prosecco', note: d('DOC, brut', 'DOC, brut', 'DOC, brut'), prices: [['0,1 l', 5.9], ['0,75 l', 29]], a: ['L'], alc: true,
          desc: d('Trocken und fein perlend', 'Dry with fine bubbles', 'Secco, dal perlage fine') },
      ] },
      { title: d('Birra & Analcolici', 'Birra & Analcolici', 'Birra & Analcolici'), items: [
        { name: 'Birra alla Spina', prices: [['0,3 l', 4.2], ['0,5 l', 5.9]], a: ['A'], alc: true,
          desc: d('Italienisches Lagerbier vom Fass', 'Italian lager on tap', 'Birra lager italiana alla spina') },
        { name: 'Limonata della Casa', vol: '0,4 l', price: 4.9, a: [],
          desc: d('Hausgemachte Zitronenlimonade mit Minze', 'Home-made lemonade with mint', 'Limonata fatta in casa con menta') },
        { name: 'Acqua Minerale', vol: '0,75 l', price: 6.5, a: [],
          desc: d('Still oder sprudelnd', 'Still or sparkling', 'Naturale o frizzante') },
      ] },
      { title: d('Caffè & Digestivi', 'Caffè & Digestivi', 'Caffè & Digestivi'), items: [
        { name: 'Espresso', price: 2.6, a: [], z: [11],
          desc: d('Kurz und kräftig', 'Short and strong', 'Corto e intenso') },
        { name: 'Cappuccino', price: 3.8, a: ['G'], z: [11],
          desc: d('Espresso mit aufgeschäumter Milch', 'Espresso with steamed milk foam', 'Espresso con latte montato') },
        { name: 'Limoncello', vol: '2 cl', price: 4.5, a: [], alc: true,
          desc: d('Zitronenlikör, eiskalt serviert', 'Lemon liqueur, served ice-cold', 'Liquore al limone, servito ghiacciato') },
        { name: 'Grappa', vol: '2 cl', price: 5.5, a: [], alc: true,
          desc: d('Italienischer Tresterbrand', 'Italian pomace brandy', 'Acquavite di vinaccia') },
      ] },
    ],
  },
];

export const MENU_TEXT = {
  consiglio: d('Il nostro consiglio', 'Il nostro consiglio', 'Il nostro consiglio'),
  liguria: d('Ligurische Spezialität', 'Ligurian speciality', 'Specialità ligure'),
  veg: d('vegetarisch', 'vegetarian', 'vegetariano'),
  vegan: d('vegan', 'vegan', 'vegano'),
  hot: d('scharf', 'spicy', 'piccante'),
  alc: d('enthält Alkohol', 'contains alcohol', 'contiene alcol'),
  allergens: d('Allergene', 'Allergens', 'Allergeni'),
  additives: d('Zusatzstoffe', 'Additives', 'Additivi'),
  prices: d('Alle Preise in Euro inklusive Mehrwertsteuer.', 'All prices in euros, VAT included.', 'Tutti i prezzi in euro, IVA inclusa.'),
  ask: d('Bei Allergien und Unverträglichkeiten beraten wir Sie gern.', 'Please let us know about allergies or intolerances, we are happy to advise.', 'In caso di allergie o intolleranze, chiedete pure al nostro staff.'),
  disclaimer: d(
    'Unsere Gerichte entstehen in einer Küche, in der alle genannten Allergene verarbeitet werden. Trotz größter Sorgfalt können Spuren durch Kreuzkontakt nicht ausgeschlossen werden. Rezepturen und Zutaten können sich ändern.',
    'Our dishes are prepared in a kitchen where all listed allergens are handled. Despite great care, traces from cross-contact cannot be ruled out. Recipes and ingredients may change.',
    'I nostri piatti sono preparati in una cucina in cui vengono lavorati tutti gli allergeni indicati. Nonostante la massima cura, non si possono escludere tracce dovute a contaminazione crociata. Ricette e ingredienti possono variare.'),
  stand: d('Stand: Oktober 2026', 'As of October 2026', 'Aggiornato a ottobre 2026'),
};

export function formatPrice(value, lang) {
  const n = Number(value).toFixed(2);
  return lang === 'en' ? `€${n}` : `${n.replace('.', ',')} €`;
}

export function volLabel(v, lang) {
  return lang === 'en' ? v.replace(',', '.') : v;
}

// flat list helper for the allergen card
export function allItems() {
  const out = [];
  for (const sec of MENU) for (const g of sec.groups) for (const it of g.items) out.push({ section: sec, group: g, item: it });
  return out;
}
