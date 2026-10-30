// Content of the rental exposé (German), taken from the ImmoScout24 exposé 172181274 of 30.10.2026
// and set in the style of the website. Spelling corrected, groups of people gendered in pairs
// ("Gastgeberinnen und Gastgeber", as on the website). Facts and figures are unchanged.
// Generate the PDF with: node tools/expose.mjs

export const META = {
  title: 'San Remo – Neonlicht im Jungbusch',
  subject: 'Exposé: Gastronomieräume zur Miete, Beilstraße 3, 68159 Mannheim',
  file: 'San-Remo-Expose-Beilstrasse-3.pdf',
};

export const COVER = {
  sign: 'Affittasi',
  title: 'Neonlicht im Jungbusch',
  kicker: 'Exposé · Gastronomieräume zur Miete',
  address: 'Beilstraße 3 · 68159 Mannheim',
  facts: [
    ['48&nbsp;m²', 'Gastraumfläche'],
    ['108&nbsp;m²', 'Gesamtfläche'],
    ['01.01.2027', 'verfügbar ab'],
    ['Auf Anfrage', 'Miete pro Monat'],
  ],
};

// "Auf einen Blick": the key data of the listing
export const DATA = [
  ['Objektart', 'Restaurant'],
  ['Vermarktungsart', 'Miete'],
  ['Adresse', 'Beilstraße 3, 68159 Mannheim'],
  ['Gastraumfläche', '48,00&nbsp;m²'],
  ['Nebenfläche', '60,00&nbsp;m²'],
  ['Gesamtfläche', '108,00&nbsp;m²'],
  ['Plätze im Gastraum', '36'],
  ['Gastterrasse', 'Ja'],
  ['Keller', 'Ja'],
  ['Miete pro Monat', 'Preis auf Anfrage'],
  ['Nebenkosten', '500,00&nbsp;EUR pro Monat'],
  ['Verfügbar ab', '01.01.2027'],
  ['Baujahr', '1890'],
  ['Letzte Modernisierung/Sanierung', '2019'],
  ['Objektzustand', 'Neuwertig'],
  ['Qualität der Ausstattung', 'Gehoben'],
  ['Heizungsart', 'Fernwärme'],
  ['Wesentlicher Energieträger', 'Fernwärme'],
  ['Anbieter', 'Direkt vom Eigentümer'],
  ['Scout-ID', '172181274'],
];

export const REACH = [
  ['5&nbsp;Min.', 'Fußweg zu öffentlichen Verkehrsmitteln'],
  ['10&nbsp;Min.', 'Fahrzeit zum nächsten Hauptbahnhof'],
  ['10&nbsp;Min.', 'Fahrzeit zur nächsten Autobahn'],
  ['100&nbsp;Min.', 'Fahrzeit zum nächsten Flughafen'],
];

export const DESCRIPTION = {
  title: 'San Remo – ein Stück Mannheim soll wieder leuchten',
  lead: 'Pizza, Pasta, Vino und rotes Neonlicht. Stimmen, die durcheinandergehen. Ein Tisch, an den noch jemand dazukommt. Und Gastgeberinnen und Gastgeber, die aus einem Restaurant einen Lieblingsort machen.',
  quote: 'Dieser Schriftzug soll erneut leuchten.',
  // page 1 of the description
  part1: [
    'Dafür suchen wir ab dem 01.01.2027 neue Betreiberinnen und Betreiber: für die Beilstraße&nbsp;3, die frühere „Zweite Liebe“, mitten in der Fußgängerzone des Mannheimer Jungbuschs. Eine Gastro-Chance mit Charakter, professioneller Ausstattung und einer besonderen Idee für ihre Zukunft.',
    'Am Anfang dieser Idee steht ein historischer Leuchtschriftzug: SAN REMO. Das frühere Restaurant hatte seine Adresse in S&nbsp;6,&nbsp;26 am Friedrichsring – in jenem Teil Mannheims, zu dessen italienischer Gastronomietradition Namen wie Milano und das renommierte Da Gianni gehören.',
    'Die dazu entwickelte, bewusst frei erzählte SAN-REMO-Legende führt ins Jahr 1977: Ein Koch aus dem Da Gianni möchte seinen eigenen Weg gehen. Seine Küche, seine Gäste, sein kleines Stück Italien. Aus diesem Bild ist unsere Vorstellung für den Jungbusch gewachsen: ein persönlich geführtes Ristorante, in dem gutes Essen und ungezwungene Geselligkeit zusammengehören.',
    'Das historische Schild selbst ist dabei ganz real. Über viele Jahre haben wir als Eigentümer seinen Weg verfolgt, bis wir es schließlich erwerben und seine Restaurierung organisieren konnten. Wir möchten damit ein Stück Mannheimer Gastronomiegeschichte bewahren und ihm wieder einen Platz im Leben der Stadt geben. Dieser Schriftzug soll erneut leuchten – über neuen Begegnungen, langen Abenden und Tischen, an denen Erinnerungen entstehen. Vielleicht für die nächsten Jahrzehnte.',
    'Die Räume dafür sind bereits da. Der Altbau von 1899 verbindet Holzdielen, individuelle Bankeinbauten und hinterleuchtete historische Fenster mit einer freigelegten Deckenstruktur. Dimmbare LED-Beleuchtung und ausgewählte Leuchten schaffen Atmosphäre. Die Bar mit Flaschen- und Gläseraufbau, gekühlten Bereichen und Vitrine gehört selbstverständlich zum Gastraum. Rund 35 Gäste finden, je nach Bestuhlung, an Tischen und an der Theke Platz. Auch eine lange gemeinsame Tafel ist möglich.',
  ],
  // page 2 of the description
  part2: [
    'Hinter den Kulissen ist vieles vorbereitet: Die 2019 umfassend erneuerten Küchenbereiche bieten eine professionell eingebaute Gastronomieküche, eine eigene Spülküche und einen zusätzlichen Vorbereitungsraum. Edelstahl-Arbeitsflächen, Induktionsherd, gewerbliche Kühl- und Spültechnik sowie Abzugshauben und Abluftanlage bilden die Grundlage für den Betrieb. Eine separate Remise im Innenhof, weitere Kellerräume und ein Bierkeller mit Fassrutsche ergänzen die Lagerflächen. Ein Personalbereich mit eigenem Zugang, Dusche und WC sowie separate Gäste-WCs sind vorhanden.',
    'Damit ist der Einstieg weitgehend „Plug &amp; Play“: Die umfangreiche Infrastruktur steht; ein stimmiges Dekorations- und Brandingkonzept kann dem Ort die persönliche Handschrift seiner neuen Gastgeberinnen und Gastgeber geben.',
    'Die Fußgängerzone bietet zudem die Perspektive auf italienisches Leben unter freiem Himmel. Etwa 30 bis 40 Außenplätze sind angedacht. Die Eigentümergestattung zur Beantragung wird erteilt; Umfang und Nutzung bleiben der behördlichen Genehmigung vorbehalten. Markise, Fallarmmarkisen und Außenbeleuchtung sind bereits vorhanden.',
    'Unter www.sanremo.ma ist „SAN REMO – Piccolo Ristorante“ bereits als vollständig ausgearbeitete, ausdrücklich fiktive Konzeptwebsite erlebbar. Sie kann im Rahmen der Vermietung mitangeboten, auf den künftigen Betrieb abgestimmt und weiter betreut werden. Auch die Einbindung der zugehörigen Social-Media-Kanäle ist vorgesehen.',
    'Wir wünschen uns Menschen, die diesen Ort mit ihrer Küche und ihrer Gastfreundschaft wieder lebendig machen. Gerne italienisch, herzlich und mit einer eigenen Handschrift. Einen kleinen Italiener um die Ecke, zu dem man Freundinnen und Freunde mitbringt, bei dem man noch auf einen Espresso bleibt und an den man auch Jahre später gerne zurückdenkt.',
  ],
};

// "Ausstattung": the items of the listing, grouped by area (wording unchanged apart from spelling)
export const EQUIPMENT = [
  ['Gastraum &amp; Bar', [
    'Individuell ausgebauter Gastraum mit rund 35 Sitzplätzen an Tischen und an der Theke, abhängig von der Bestuhlung',
    'Flexible Tischanordnung für den täglichen Restaurantbetrieb, gemeinsame Tafeln und kleinere Gesellschaften',
    'Holzdielenboden und charaktervolle Bank- und Holzeinbauten',
    'Hinterleuchtete historische Fenster als Gestaltungselemente',
    'Freigelegte historische Deckenstruktur',
    'Ausgewählte Decken- und Wandleuchten sowie dimmbare LED-Beleuchtung',
    'Integrierte Musikanlage im Gastraum',
    'Ausgebauter Bar- und Thekenbereich mit Aufbau für Flaschen und Gläser',
    'Thekenunterkühlung, Kühlvitrine und Rückbuffet mit Stauraum',
    'Doppelspülbecken und Arbeitsflächen im Thekenbereich',
  ]],
  ['Küche', [
    '2019 umfassend erneuerte und technisch erweiterte Küchenbereiche',
    'Professionell eingebaute Gastronomieküche',
    'Separate Spülküche und zusätzlicher Vorbereitungsraum',
    'Berner-Induktionsherd',
    'Gewerbliche Kühl- und Tiefkühlgeräte, unter anderem von Hoshizaki',
    'Gewerbliche Spültechnik von Meiko, unter anderem M-iClean&nbsp;US, M-iClean&nbsp;UM und UPster&nbsp;U500',
    'Wasseraufbereitung und Wasserenthärtung',
    'Edelstahl-Arbeitsflächen, Spültische, Unter- und Hängeschränke sowie Wandborde',
    'Kühlunterschränke und Kühltheke mit Saladette',
    'Wärmelampen im Küchen- und Ausgabebereich',
    'Zwei Küchenabzugshauben sowie vorhandene Abluftanlage mit Edelstahlkamin',
  ]],
  ['Sanitär &amp; Personal', [
    'Separate Damen- und Herren-WCs mit vorgelagertem Garderobenbereich',
    'Personalbereich mit eigenem Zugang, Waschgelegenheit, Dusche und WC',
  ]],
  ['Lager &amp; Haustechnik', [
    'Separate Remise im Innenhof für Vorräte, Getränke, Leergut und weitere Lagerzwecke',
    'Zusätzliche Kellerräume einschließlich Bierkeller',
    'Fassrutsche von der Straße zum Keller',
    'Gemeinschaftliche Müllunterbringung im Innenhof',
    'Fernwärmeversorgung',
  ]],
  ['Außenbereich', [
    'Vorhandene Markise, Fallarmmarkisen und Außenbeleuchtung',
    'Lage im Fußgängerbereich der Beilstraße',
    'Außenbestuhlung mit voraussichtlich etwa 30 bis 40 Plätzen vorgesehen; Eigentümergestattung zur Beantragung wird erteilt, Umsetzung vorbehaltlich behördlicher Genehmigung',
  ]],
  ['Website &amp; Social Media', [
    'Ergänzend vorbereiteter Internetauftritt „SAN REMO – Piccolo Ristorante“ mit Möglichkeiten zur individuellen Anpassung, weiteren Betreuung und Einbindung der zugehörigen Social-Media-Kanäle',
  ]],
];
export const TAKEOVER = 'Vor dem Hintergrund der Anmietung ist vorgesehen, dass vom Eigentümer alle Einbauten in der Küche wie Kühl-, Spül- und Kochtechnik im Rahmen einer fairen Ablösesumme übergeben werden.';

export const LOCATION = [
  ['Mannheim – urban, weltoffen und genussfreudig', [
    'Mannheim ist eines der wirtschaftlichen und kulturellen Zentren der Metropolregion Rhein-Neckar. Als Universitätsstadt, bedeutender Unternehmensstandort und UNESCO City of Music verbindet die Stadt ein internationales Publikum mit einer lebendigen Kultur-, Musik- und Gastronomieszene. Die Innenstadt mit ihren Quadraten, Einkaufsmöglichkeiten und kulturellen Angeboten zieht Menschen aus der gesamten Region an. Der Hauptbahnhof mit seinen überregionalen Verbindungen und das städtische Nahverkehrsnetz sorgen für eine gute Erreichbarkeit.',
  ]],
  ['Jungbusch – Szeneviertel zwischen Hafen und City', [
    'Unmittelbar am Rand der Innenstadt liegt der Jungbusch: ein gewachsenes, vielfältiges Quartier und einer der bekanntesten Ausgehstandorte Mannheims. Historische Häuser, Hafenatmosphäre, Bars, Restaurants, kleine Geschäfte und kulturelle Einrichtungen geben dem Viertel seinen eigenständigen Charakter.',
    'Mit der Popakademie Baden-Württemberg, dem Musikpark und dem Kreativwirtschaftszentrum C-HUB ist der Jungbusch zugleich ein Standort für Musik, Gestaltung und junge Unternehmen. Hier treffen Bewohnerinnen und Bewohner, Studierende, Kreative und Berufstätige auf Besucherinnen und Besucher, die zum Essen und Ausgehen ins Viertel kommen.',
    'Für eine persönlich geführte Gastronomie eröffnet diese Mischung unterschiedliche Möglichkeiten: ein Treffpunkt für die Nachbarschaft, ein Essen mit Freundinnen und Freunden, ein Aperitivo nach Feierabend oder der Auftakt zu einem Abend im Jungbusch. Ein klares kulinarisches Profil und herzliche Gastfreundschaft können hier die Grundlage für einen eigenen Stammgästekreis bilden.',
  ]],
  ['Beilstraße 3 – mitten im Viertel', [
    'Die angebotene Gastronomie liegt im Fußgängerbereich der Beilstraße und damit unmittelbar im lebendigen Umfeld des Szeneviertels. Die Lage verbindet die Nähe zu weiteren gastronomischen Angeboten mit dem Alltag eines bewohnten Stadtquartiers. Die Mannheimer Quadrate und der öffentliche Nahverkehr sind fußläufig erreichbar.',
    'Die vorgesehene Außenbestuhlung bietet – vorbehaltlich der Genehmigung – die Möglichkeit, das Restaurant zum Straßenraum zu öffnen und Teil dieses nachbarschaftlichen Lebens zu werden. Ein passender Standort für ein kleines Ristorante, eine lebendige Weinbar oder ein gastronomisches Konzept mit eigener Handschrift.',
  ]],
];

// "Sonstiges" and the contact person
export const CONTACT = {
  title: 'Besichtigung &amp; Kontakt',
  text: [
    'Dieses Angebot erfolgt direkt vom Eigentümer.',
    'Wir freuen uns auf Ihre Kontaktaufnahme und darauf, Sie und Ihre Ideen für diesen besonderen Ort kennenzulernen. Gerne stellen wir Ihnen die Räumlichkeiten persönlich vor und nehmen uns Zeit für Ihre Fragen zum Objekt und zu Ihrem gastronomischen Konzept.',
    'Besichtigungen sind jederzeit nach vorheriger Terminvereinbarung möglich – selbstverständlich auch am Wochenende. Sprechen Sie uns gerne auf Ihren Wunschtermin an.',
    'Grundrisse, eine detaillierte Inventarübersicht und weitere Informationen stellen wir Ihnen auf Wunsch zur Verfügung.',
  ],
  person: 'Eric Schweppe',
  role: 'Architekt · TINYTECTURE GmbH',
  phone: '0172 / 6236005', phoneHref: 'tel:+491726236005',
  mail: 'eric.schweppe@tinytecture.de', mailHref: 'mailto:eric.schweppe@tinytecture.de?subject=Gastronomier%C3%A4ume%20Beilstra%C3%9Fe%203',
  web: 'www.tinytecture.de', webHref: 'https://www.tinytecture.de',
  outro: 'Ich freue mich über Ihr Interesse und stehe Ihnen gerne telefonisch oder per E-Mail zur Verfügung.',
};

// Photo gallery: files in tools/expose/photos (numbered as in the ImmoScout24 exposé, graded like the website
// photos where red light dominates). Captions as in the exposé, spelling corrected; set in handwriting.
export const GALLERY = [
  ['Gastraum &amp; Bar', 'la sala e il bancone', [
    [3, 'Bar'], [1, 'Hi there'], [5, 'Neon light'], [4, 'Red table'], [6, 'Lines'], [7, 'Wine glass'], [8, 'At the bar'],
    [9, 'Chairs'], [10, 'Table dance'], [11, 'Bartender'], [12, 'Corner'], [13, '3'], [14, '1977'],
    [20, 'Look in'], [21, 'Ceiling glimmer'], [22, 'Latex ceiling'], [15, 'Great bar'], [16, 'Kitchen party'],
    [17, 'Alla spina'], [18, 'Sit down'], [19, 'Redredred'], [23, 'The hanging wine'], [24, 'Deco idea'],
  ]],
  ['Interieur &amp; Deko-Ideen', 'dettagli', [
    [25, 'Flower power'], [26, 'Chalkboard'], [27, 'Hanging around'], [28, 'Interior lookbook'],
    [29, 'Oops, a ship is coming'], [30, 'Long table'], [31, 'Puff paff'], [32, 'Sit down'], [33, 'Table deco'],
    [37, 'Dark but lit'], [38, 'One yellow lamp'],
  ]],
  ['Küche', 'la cucina', [
    [39, 'Cooking'], [40, 'Prepare'], [41, 'Cleaning'], [42, 'Pass with warmth'], [43, 'Induction'],
    [44, 'Freeze and cool'], [45, 'Jieldé lamps'], [46, 'Warmth'], [47, '600°'],
  ]],
  ['Außenansicht', 'Beilstraße 3', [
    [2, 'San Remo'], [34, 'Best place in Jungbusch'], [35, 'Lights everywhere'], [36, 'Still the best place'], [48, 'Blurry picture'],
  ]],
];
