import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'de' | 'en' | 'fr' | 'es' | 'tr' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('de');

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

const translations = {
  de: {
    nav: {
      home: 'Home',
      about: 'Über uns',
      menu: 'Menü',
      gallery: 'Galerie',
      contact: 'Kontakt',
    },
    home: {
      hero: {
        title: 'Willkommen bei',
        subtitle: 'Ihr exklusives Café & Bistro in Flughafennähe.',
        subtitle2: 'Wo Komfort auf Moderne trifft.',
        menuBtn: 'Menü entdecken',
        reserveBtn: 'Reservierung',
      },
      features: {
        title: 'Warum AeroLounge?',
        subtitle: 'Perfekt für Geschäftsreisende, internationale Gäste und alle, die Qualität schätzen',
        location: {
          title: 'Perfekte Lage',
          description: 'Nur 5 Minuten vom Flughafen entfernt',
        },
        hours: {
          title: 'Lange Öffnungszeiten',
          description: 'Täglich von früh bis spät für Sie da',
        },
        quality: {
          title: 'Premium Qualität',
          description: 'Ausgewählte Zutaten und frische Zubereitung',
        },
      },
      menu: {
        title: 'Unser Angebot',
        subtitle: 'Von früh bis spät – genießen Sie kulinarische Highlights',
        breakfast: {
          title: 'Frühstück',
          description: 'Starten Sie perfekt in den Tag mit unseren frischen Frühstückskreationen',
        },
        lunch: {
          title: 'Mittagessen',
          description: 'Köstliche Gerichte für Ihre Mittagspause',
        },
        drinks: {
          title: 'Getränke',
          description: 'Von Spezialitätenkaffee bis zu erfrischenden Cocktails',
        },
      },
      gallery: {
        title: 'Impressionen',
        subtitle: 'Tauchen Sie ein in die Atmosphäre der AeroLounge',
        viewAll: 'Alle Bilder ansehen',
      },
      cta: {
        title: 'Bereit für ein besonderes Erlebnis?',
        subtitle: 'Reservieren Sie jetzt Ihren Tisch und genießen Sie erstklassigen Service in einzigartigem Ambiente',
        button: 'Jetzt reservieren',
      },
    },
    about: {
      hero: {
        title: 'Über AeroLounge',
        subtitle: 'Wo Komfort auf Moderne trifft',
      },
      story: {
        title: 'Unsere Geschichte',
        p1: 'AeroLounge wurde mit einer klaren Vision gegründet: Ein Ort zu schaffen, der die Hektik des Reisens mit einem Moment der Ruhe und des Genusses verbindet.',
        p2: 'In unserem modernen Café & Bistro vereinen wir erstklassige Kaffeespezialitäten mit einer vielfältigen kulinarischen Auswahl. Egal ob Sie auf dem Weg zum Flughafen sind, eine Geschäftsbesprechung haben oder einfach nur entspannen möchten – bei uns finden Sie die perfekte Atmosphäre.',
        p3: 'Unser erfahrenes Team sorgt täglich dafür, dass jeder Besuch zu einem besonderen Erlebnis wird. Von der sorgfältigen Auswahl unserer Lieferanten bis zur liebevollen Zubereitung jedes einzelnen Gerichts – Qualität ist unser Versprechen.',
      },
      values: {
        title: 'Unsere Werte',
        subtitle: 'Was uns ausmacht und antreibt',
        passion: {
          title: 'Leidenschaft',
          description: 'Wir lieben, was wir tun – von der Kaffeezubereitung bis zum Service',
        },
        quality: {
          title: 'Qualität',
          description: 'Nur die besten Zutaten und frische Zubereitung jeden Tag',
        },
        hospitality: {
          title: 'Gastfreundschaft',
          description: 'Ihr Wohlbefinden steht bei uns an erster Stelle',
        },
        innovation: {
          title: 'Innovation',
          description: 'Modern, zeitgemäß und immer am Puls der Zeit',
        },
      },
      location: {
        title: 'Die perfekte Lage',
        subtitle: 'Strategisch ideal positioniert für Ihre Bedürfnisse',
        airport: {
          title: 'Flughafennähe',
          description: 'Nur 5 Minuten vom Flughafen Frankfurt entfernt – perfekt für Reisende vor oder nach dem Flug',
          stat: '5 Min',
        },
        hotels: {
          title: 'Hotel-Viertel',
          description: 'Umgeben von erstklassigen Hotels – ideal für Geschäftsreisende und internationale Gäste',
          stat: '20+',
          statLabel: 'Hotels',
        },
        address: 'Flughafenstraße 123, 60549 Frankfurt am Main',
        addressDesc: 'Zentral gelegen zwischen Flughafen und City – leicht erreichbar, perfekt positioniert',
      },
      mission: {
        title: 'Unsere Mission',
        text: 'Wir möchten jedem Gast – ob Geschäftsreisender, Tourist oder Einheimischer – einen Ort bieten, an dem er sich willkommen fühlt und Qualität in jedem Detail erlebt. Bei uns steht der Mensch im Mittelpunkt, und das spiegelt sich in unserem Service, unserer Küche und unserer Atmosphäre wider.',
      },
    },
    menu: {
      hero: {
        title: 'Unser Menü',
        subtitle: 'Kulinarische Exzellenz von früh bis spät',
      },
      categories: {
        breakfast: 'Frühstück',
        lunch: 'Mittagessen',
        drinks: 'Getränke',
      },
      items: {
        breakfast: [
          { name: 'AeroLounge Frühstück', description: 'Croissant, frisches Obst, Joghurt, Kaffee', price: '12.90' },
          { name: 'Eggs Benedict', description: 'Pochierte Eier, Hollandaise, Spinat, English Muffin', price: '14.50' },
          { name: 'Avocado Toast', description: 'Sauerteigbrot, Avocado, pochiertes Ei, Microgreens', price: '11.90' },
          { name: 'Pancake Stack', description: 'Ahornsirup, Beeren, Schlagsahne', price: '10.50' },
          { name: 'Bircher Müsli', description: 'Hausgemacht, saisonale Früchte, Nüsse', price: '8.90' },
          { name: 'French Toast', description: 'Brioche, Vanille, karamellisierte Banane', price: '11.50' },
        ],
        lunch: [
          { name: 'Gegrilltes Lachsfilet', description: 'Quinoa, geröstetes Gemüse, Zitronenbutter', price: '22.90' },
          { name: 'Truffle Burger', description: 'Rindfleisch, Trüffelmayo, Rucola, Pommes', price: '18.50' },
          { name: 'Caesar Salad', description: 'Römersalat, Hähnchenbrust, Parmesan, hausgemachtes Dressing', price: '15.90' },
          { name: 'Pasta Carbonara', description: 'Hausgemachte Tagliatelle, Guanciale, Pecorino', price: '16.50' },
          { name: 'Thai Curry Bowl', description: 'Gemüse, Kokosmilch, Jasminreis, Koriander', price: '14.90' },
          { name: 'Wagyu Steak', description: '200g, Kartoffelgratin, saisonales Gemüse', price: '34.90' },
        ],
        drinks: [
          { name: 'Espresso Signature', description: 'Single Origin aus Äthiopien', price: '3.50' },
          { name: 'Cappuccino', description: 'Doppelter Espresso, aufgeschäumte Milch', price: '4.50' },
          { name: 'Cold Brew', description: '24h kalt extrahiert, Vanillenote', price: '5.20' },
          { name: 'Aviation Cocktail', description: 'Gin, Maraschino, Crème de Violette, Zitrone', price: '12.50' },
          { name: 'Hugo Spritz', description: 'Prosecco, Holunderblütensirup, Minze', price: '9.50' },
          { name: 'Hausgemachte Limonade', description: 'Saisonal wechselnde Sorten', price: '5.50' },
        ],
      },
      houseSpecial: 'Empfehlung des Hauses',
      specials: {
        title: 'Spezielle Angebote',
        subtitle: 'Genießen Sie unsere täglichen Specials',
        businessLunch: {
          title: 'Business Lunch',
          description: 'Hauptgericht + Getränk für nur €16.90',
          time: 'Mo-Fr 12:00-15:00',
        },
        happyHour: {
          title: 'Happy Hour',
          description: 'Alle Cocktails -30%',
          time: 'Täglich 17:00-19:00',
        },
        breakfast: {
          title: 'Breakfast Special',
          description: 'Kaffee & Croissant für €5.90',
          time: 'Mo-Fr 06:00-09:00',
        },
      },
    },
    gallery: {
      hero: {
        title: 'Galerie',
        subtitle: 'Entdecken Sie die Welt der AeroLounge',
      },
      categories: {
        all: 'Alle',
        interior: 'Interior',
        food: 'Food',
        drinks: 'Drinks',
        behindScenes: 'Behind the Scenes',
      },
      images: {
        modernAtmosphere: 'Moderne Atmosphäre',
        elegantInterior: 'Elegante Einrichtung',
        coffeeSpecialties: 'Kaffee Spezialitäten',
        latteArt: 'Latte Art',
        breakfast: 'Frühstück',
        lunchSpecialties: 'Lunch Spezialitäten',
        gourmetDesserts: 'Gourmet Desserts',
        cocktails: 'Cocktails',
        freshPastries: 'Frische Backwaren',
        baristaWork: 'Barista bei der Arbeit',
        tableSetting: 'Tischgedeck',
        wineSelection: 'Weinauswahl',
      },
    },
    contact: {
      hero: {
        title: 'Kontakt & Reservierung',
        subtitle: 'Wir freuen uns auf Ihren Besuch',
      },
      info: {
        address: 'Adresse',
        addressText: 'Flughafenstraße 123\n60549 Frankfurt am Main',
        phone: 'Telefon',
        phoneText: '+49 69 123 456 78',
        email: 'E-Mail',
        emailText: 'info@aerolounge.de',
        hours: 'Öffnungszeiten',
        hoursText: 'Mo-Fr: 06:00 - 22:00\nSa-So: 07:00 - 23:00',
      },
      form: {
        title: 'Tisch reservieren',
        subtitle: 'Füllen Sie das Formular aus und wir bestätigen Ihre Reservierung umgehend',
        name: 'Name',
        email: 'E-Mail',
        phone: 'Telefon',
        date: 'Datum',
        time: 'Uhrzeit',
        guests: 'Personen',
        message: 'Besondere Wünsche',
        messagePlaceholder: 'Allergien, besondere Anlässe, etc.',
        submit: 'Reservierung anfragen',
        required: '*',
        person: 'Person',
        persons: 'Personen',
        successMessage: 'Reservierungsanfrage gesendet! Wir melden uns in Kürze bei Ihnen.',
      },
      map: {
        title: 'So finden Sie uns',
        subtitle: 'Perfekt gelegen zwischen Flughafen und City',
        directions: 'Anfahrt',
        byCar: 'Mit dem Auto:',
        byCarText: 'Autobahn A5, Ausfahrt Flughafen, Richtung Terminal 1, nach 500m links',
        byPublic: 'Öffentliche Verkehrsmittel:',
        byPublicText: 'S-Bahn S8/S9 bis "Flughafen Regionalbahnhof", 5 Min. Fußweg',
        parking: 'Parken:',
        parkingText: 'Kostenlose Parkplätze direkt vor dem Café',
      },
      schedule: {
        title: 'Öffnungszeiten',
        monday: 'Montag',
        tuesday: 'Dienstag',
        wednesday: 'Mittwoch',
        thursday: 'Donnerstag',
        friday: 'Freitag',
        saturday: 'Samstag',
        sunday: 'Sonntag',
        note: 'An Feiertagen können abweichende Öffnungszeiten gelten',
      },
    },
    footer: {
      tagline: 'Ihr perfekter Zwischenstopp in der Nähe des Flughafens. Genießen Sie erstklassigen Kaffee und frische Küche in modernem Ambiente.',
      quickLinks: 'Schnellzugriff',
      contact: 'Kontakt',
      followUs: 'Folgen Sie uns',
      copyright: '© {year} AeroLounge Café & Bistro. Alle Rechte vorbehalten.',
      privacy: 'Datenschutz',
      imprint: 'Impressum',
      terms: 'AGB',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      menu: 'Menu',
      gallery: 'Gallery',
      contact: 'Contact',
    },
    home: {
      hero: {
        title: 'Welcome to',
        subtitle: 'Your exclusive Café & Bistro near the airport.',
        subtitle2: 'Where comfort meets modernity.',
        menuBtn: 'Discover Menu',
        reserveBtn: 'Reservation',
      },
      features: {
        title: 'Why AeroLounge?',
        subtitle: 'Perfect for business travelers, international guests, and anyone who appreciates quality',
        location: {
          title: 'Perfect Location',
          description: 'Only 5 minutes from the airport',
        },
        hours: {
          title: 'Extended Hours',
          description: 'Open daily from early morning to late evening',
        },
        quality: {
          title: 'Premium Quality',
          description: 'Selected ingredients and fresh preparation',
        },
      },
      menu: {
        title: 'Our Offering',
        subtitle: 'From early morning to late evening – enjoy culinary highlights',
        breakfast: {
          title: 'Breakfast',
          description: 'Start your day perfectly with our fresh breakfast creations',
        },
        lunch: {
          title: 'Lunch',
          description: 'Delicious dishes for your lunch break',
        },
        drinks: {
          title: 'Drinks',
          description: 'From specialty coffee to refreshing cocktails',
        },
      },
      gallery: {
        title: 'Impressions',
        subtitle: 'Immerse yourself in the atmosphere of AeroLounge',
        viewAll: 'View All Images',
      },
      cta: {
        title: 'Ready for a special experience?',
        subtitle: 'Reserve your table now and enjoy first-class service in a unique ambiance',
        button: 'Reserve Now',
      },
    },
    about: {
      hero: {
        title: 'About AeroLounge',
        subtitle: 'Where comfort meets modernity',
      },
      story: {
        title: 'Our Story',
        p1: 'AeroLounge was founded with a clear vision: to create a place that combines the hustle of travel with a moment of peace and enjoyment.',
        p2: 'In our modern Café & Bistro, we combine first-class coffee specialties with a diverse culinary selection. Whether you\'re on your way to the airport, have a business meeting, or just want to relax – you\'ll find the perfect atmosphere with us.',
        p3: 'Our experienced team ensures that every visit becomes a special experience. From the careful selection of our suppliers to the loving preparation of every dish – quality is our promise.',
      },
      values: {
        title: 'Our Values',
        subtitle: 'What defines and drives us',
        passion: {
          title: 'Passion',
          description: 'We love what we do – from coffee preparation to service',
        },
        quality: {
          title: 'Quality',
          description: 'Only the best ingredients and fresh preparation every day',
        },
        hospitality: {
          title: 'Hospitality',
          description: 'Your well-being is our top priority',
        },
        innovation: {
          title: 'Innovation',
          description: 'Modern, contemporary, and always on the pulse',
        },
      },
      location: {
        title: 'The Perfect Location',
        subtitle: 'Strategically positioned for your needs',
        airport: {
          title: 'Airport Proximity',
          description: 'Only 5 minutes from Frankfurt Airport – perfect for travelers before or after their flight',
          stat: '5 Min',
        },
        hotels: {
          title: 'Hotel District',
          description: 'Surrounded by first-class hotels – ideal for business travelers and international guests',
          stat: '20+',
          statLabel: 'Hotels',
        },
        address: 'Flughafenstraße 123, 60549 Frankfurt am Main',
        addressDesc: 'Centrally located between airport and city – easily accessible, perfectly positioned',
      },
      mission: {
        title: 'Our Mission',
        text: 'We want to offer every guest – whether business traveler, tourist, or local – a place where they feel welcome and experience quality in every detail. People are at the center of everything we do, and this is reflected in our service, our cuisine, and our atmosphere.',
      },
    },
    menu: {
      hero: {
        title: 'Our Menu',
        subtitle: 'Culinary excellence from early to late',
      },
      categories: {
        breakfast: 'Breakfast',
        lunch: 'Lunch',
        drinks: 'Drinks',
      },
      items: {
        breakfast: [
          { name: 'AeroLounge Breakfast', description: 'Croissant, fresh fruit, yogurt, coffee', price: '12.90' },
          { name: 'Eggs Benedict', description: 'Poached eggs, hollandaise, spinach, English muffin', price: '14.50' },
          { name: 'Avocado Toast', description: 'Sourdough bread, avocado, poached egg, microgreens', price: '11.90' },
          { name: 'Pancake Stack', description: 'Maple syrup, berries, whipped cream', price: '10.50' },
          { name: 'Bircher Muesli', description: 'Homemade, seasonal fruits, nuts', price: '8.90' },
          { name: 'French Toast', description: 'Brioche, vanilla, caramelized banana', price: '11.50' },
        ],
        lunch: [
          { name: 'Grilled Salmon Fillet', description: 'Quinoa, roasted vegetables, lemon butter', price: '22.90' },
          { name: 'Truffle Burger', description: 'Beef, truffle mayo, arugula, fries', price: '18.50' },
          { name: 'Caesar Salad', description: 'Romaine lettuce, chicken breast, parmesan, homemade dressing', price: '15.90' },
          { name: 'Pasta Carbonara', description: 'Homemade tagliatelle, guanciale, pecorino', price: '16.50' },
          { name: 'Thai Curry Bowl', description: 'Vegetables, coconut milk, jasmine rice, cilantro', price: '14.90' },
          { name: 'Wagyu Steak', description: '200g, potato gratin, seasonal vegetables', price: '34.90' },
        ],
        drinks: [
          { name: 'Signature Espresso', description: 'Single origin from Ethiopia', price: '3.50' },
          { name: 'Cappuccino', description: 'Double espresso, frothed milk', price: '4.50' },
          { name: 'Cold Brew', description: '24h cold extraction, vanilla notes', price: '5.20' },
          { name: 'Aviation Cocktail', description: 'Gin, maraschino, crème de violette, lemon', price: '12.50' },
          { name: 'Hugo Spritz', description: 'Prosecco, elderflower syrup, mint', price: '9.50' },
          { name: 'Homemade Lemonade', description: 'Seasonally changing varieties', price: '5.50' },
        ],
      },
      houseSpecial: 'House Special',
      specials: {
        title: 'Special Offers',
        subtitle: 'Enjoy our daily specials',
        businessLunch: {
          title: 'Business Lunch',
          description: 'Main course + drink for only €16.90',
          time: 'Mon-Fri 12:00-15:00',
        },
        happyHour: {
          title: 'Happy Hour',
          description: 'All cocktails -30%',
          time: 'Daily 17:00-19:00',
        },
        breakfast: {
          title: 'Breakfast Special',
          description: 'Coffee & croissant for €5.90',
          time: 'Mon-Fri 06:00-09:00',
        },
      },
    },
    gallery: {
      hero: {
        title: 'Gallery',
        subtitle: 'Discover the world of AeroLounge',
      },
      categories: {
        all: 'All',
        interior: 'Interior',
        food: 'Food',
        drinks: 'Drinks',
        behindScenes: 'Behind the Scenes',
      },
      images: {
        modernAtmosphere: 'Modern Atmosphere',
        elegantInterior: 'Elegant Interior',
        coffeeSpecialties: 'Coffee Specialties',
        latteArt: 'Latte Art',
        breakfast: 'Breakfast',
        lunchSpecialties: 'Lunch Specialties',
        gourmetDesserts: 'Gourmet Desserts',
        cocktails: 'Cocktails',
        freshPastries: 'Fresh Pastries',
        baristaWork: 'Barista at Work',
        tableSetting: 'Table Setting',
        wineSelection: 'Wine Selection',
      },
    },
    contact: {
      hero: {
        title: 'Contact & Reservations',
        subtitle: 'We look forward to your visit',
      },
      info: {
        address: 'Address',
        addressText: 'Flughafenstraße 123\n60549 Frankfurt am Main',
        phone: 'Phone',
        phoneText: '+49 69 123 456 78',
        email: 'Email',
        emailText: 'info@aerolounge.de',
        hours: 'Opening Hours',
        hoursText: 'Mon-Fri: 06:00 - 22:00\nSat-Sun: 07:00 - 23:00',
      },
      form: {
        title: 'Reserve a Table',
        subtitle: 'Fill out the form and we will confirm your reservation promptly',
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        date: 'Date',
        time: 'Time',
        guests: 'Guests',
        message: 'Special Requests',
        messagePlaceholder: 'Allergies, special occasions, etc.',
        submit: 'Request Reservation',
        required: '*',
        person: 'Person',
        persons: 'Persons',
        successMessage: 'Reservation request sent! We will contact you shortly.',
      },
      map: {
        title: 'Find Us',
        subtitle: 'Perfectly located between airport and city',
        directions: 'Directions',
        byCar: 'By Car:',
        byCarText: 'Highway A5, airport exit, direction Terminal 1, turn left after 500m',
        byPublic: 'Public Transport:',
        byPublicText: 'S-Bahn S8/S9 to "Flughafen Regionalbahnhof", 5 min walk',
        parking: 'Parking:',
        parkingText: 'Free parking directly in front of the café',
      },
      schedule: {
        title: 'Opening Hours',
        monday: 'Monday',
        tuesday: 'Tuesday',
        wednesday: 'Wednesday',
        thursday: 'Thursday',
        friday: 'Friday',
        saturday: 'Saturday',
        sunday: 'Sunday',
        note: 'Different opening hours may apply on public holidays',
      },
    },
    footer: {
      tagline: 'Your perfect stopover near the airport. Enjoy first-class coffee and fresh cuisine in a modern ambiance.',
      quickLinks: 'Quick Links',
      contact: 'Contact',
      followUs: 'Follow Us',
      copyright: '© {year} AeroLounge Café & Bistro. All rights reserved.',
      privacy: 'Privacy',
      imprint: 'Imprint',
      terms: 'Terms',
    },
  },
  fr: {
    nav: {
      home: 'Accueil',
      about: 'À propos',
      menu: 'Menu',
      gallery: 'Galerie',
      contact: 'Contact',
    },
    home: {
      hero: {
        title: 'Bienvenue à',
        subtitle: 'Votre Café & Bistro exclusif près de l\'aéroport.',
        subtitle2: 'Où le confort rencontre la modernité.',
        menuBtn: 'Découvrir le menu',
        reserveBtn: 'Réservation',
      },
      features: {
        title: 'Pourquoi AeroLounge?',
        subtitle: 'Parfait pour les voyageurs d\'affaires, les invités internationaux et tous ceux qui apprécient la qualité',
        location: {
          title: 'Emplacement Parfait',
          description: 'À seulement 5 minutes de l\'aéroport',
        },
        hours: {
          title: 'Horaires Étendus',
          description: 'Ouvert tous les jours du matin au soir',
        },
        quality: {
          title: 'Qualité Premium',
          description: 'Ingrédients sélectionnés et préparation fraîche',
        },
      },
      menu: {
        title: 'Notre Offre',
        subtitle: 'Du matin au soir – savourez nos plats exceptionnels',
        breakfast: {
          title: 'Petit-déjeuner',
          description: 'Commencez parfaitement la journée avec nos créations fraîches',
        },
        lunch: {
          title: 'Déjeuner',
          description: 'Des plats délicieux pour votre pause déjeuner',
        },
        drinks: {
          title: 'Boissons',
          description: 'Du café de spécialité aux cocktails rafraîchissants',
        },
      },
      gallery: {
        title: 'Impressions',
        subtitle: 'Plongez dans l\'atmosphère d\'AeroLounge',
        viewAll: 'Voir toutes les images',
      },
      cta: {
        title: 'Prêt pour une expérience spéciale?',
        subtitle: 'Réservez votre table maintenant et profitez d\'un service de première classe dans une ambiance unique',
        button: 'Réserver maintenant',
      },
    },
    about: {
      hero: {
        title: 'À propos d\'AeroLounge',
        subtitle: 'Où le confort rencontre la modernité',
      },
      story: {
        title: 'Notre Histoire',
        p1: 'AeroLounge a été fondé avec une vision claire : créer un lieu qui combine l\'agitation du voyage avec un moment de paix et de plaisir.',
        p2: 'Dans notre Café & Bistro moderne, nous combinons des spécialités de café de première classe avec une sélection culinaire diversifiée. Que vous soyez en route vers l\'aéroport, que vous ayez une réunion d\'affaires ou que vous vouliez simplement vous détendre – vous trouverez l\'atmosphère parfaite chez nous.',
        p3: 'Notre équipe expérimentée veille à ce que chaque visite devienne une expérience spéciale. De la sélection minutieuse de nos fournisseurs à la préparation soignée de chaque plat – la qualité est notre promesse.',
      },
      values: {
        title: 'Nos Valeurs',
        subtitle: 'Ce qui nous définit et nous motive',
        passion: {
          title: 'Passion',
          description: 'Nous aimons ce que nous faisons – de la préparation du café au service',
        },
        quality: {
          title: 'Qualité',
          description: 'Seulement les meilleurs ingrédients et une préparation fraîche chaque jour',
        },
        hospitality: {
          title: 'Hospitalité',
          description: 'Votre bien-être est notre priorité absolue',
        },
        innovation: {
          title: 'Innovation',
          description: 'Moderne, contemporain et toujours à la pointe',
        },
      },
      location: {
        title: 'L\'Emplacement Parfait',
        subtitle: 'Stratégiquement positionné pour vos besoins',
        airport: {
          title: 'Proximité de l\'Aéroport',
          description: 'À seulement 5 minutes de l\'aéroport de Francfort – parfait pour les voyageurs avant ou après leur vol',
          stat: '5 Min',
        },
        hotels: {
          title: 'Quartier Hôtelier',
          description: 'Entouré d\'hôtels de première classe – idéal pour les voyageurs d\'affaires et les invités internationaux',
          stat: '20+',
          statLabel: 'Hôtels',
        },
        address: 'Flughafenstraße 123, 60549 Francfort-sur-le-Main',
        addressDesc: 'Situé au centre entre l\'aéroport et la ville – facilement accessible, parfaitement positionné',
      },
      mission: {
        title: 'Notre Mission',
        text: 'Nous voulons offrir à chaque client – qu\'il soit voyageur d\'affaires, touriste ou local – un endroit où il se sent le bienvenu et où il découvre la qualité dans chaque détail. Les gens sont au centre de tout ce que nous faisons, et cela se reflète dans notre service, notre cuisine et notre atmosphère.',
      },
    },
    menu: {
      hero: {
        title: 'Notre Menu',
        subtitle: 'Excellence culinaire du matin au soir',
      },
      categories: {
        breakfast: 'Petit-déjeuner',
        lunch: 'Déjeuner',
        drinks: 'Boissons',
      },
      items: {
        breakfast: [
          { name: 'Petit-déjeuner AeroLounge', description: 'Croissant, fruits frais, yaourt, café', price: '12.90' },
          { name: 'Œufs Bénédicte', description: 'Œufs pochés, hollandaise, épinards, muffin anglais', price: '14.50' },
          { name: 'Toast à l\'Avocat', description: 'Pain au levain, avocat, œuf poché, micropousses', price: '11.90' },
          { name: 'Pile de Crêpes', description: 'Sirop d\'érable, baies, crème fouettée', price: '10.50' },
          { name: 'Müesli Bircher', description: 'Fait maison, fruits de saison, noix', price: '8.90' },
          { name: 'Pain Perdu', description: 'Brioche, vanille, banane caramélisée', price: '11.50' },
        ],
        lunch: [
          { name: 'Filet de Saumon Grillé', description: 'Quinoa, légumes rôtis, beurre citronné', price: '22.90' },
          { name: 'Burger Truffe', description: 'Bœuf, mayo truffée, roquette, frites', price: '18.50' },
          { name: 'Salade César', description: 'Laitue romaine, poulet, parmesan, vinaigrette maison', price: '15.90' },
          { name: 'Pâtes Carbonara', description: 'Tagliatelles maison, guanciale, pecorino', price: '16.50' },
          { name: 'Bol Curry Thaï', description: 'Légumes, lait de coco, riz jasmin, coriandre', price: '14.90' },
          { name: 'Steak Wagyu', description: '200g, gratin de pommes de terre, légumes de saison', price: '34.90' },
        ],
        drinks: [
          { name: 'Espresso Signature', description: 'Origine unique d\'Éthiopie', price: '3.50' },
          { name: 'Cappuccino', description: 'Double espresso, lait moussé', price: '4.50' },
          { name: 'Cold Brew', description: 'Extraction froide 24h, notes de vanille', price: '5.20' },
          { name: 'Cocktail Aviation', description: 'Gin, marasquin, crème de violette, citron', price: '12.50' },
          { name: 'Spritz Hugo', description: 'Prosecco, sirop de fleur de sureau, menthe', price: '9.50' },
          { name: 'Limonade Maison', description: 'Variétés changeantes selon la saison', price: '5.50' },
        ],
      },
      houseSpecial: 'Recommandation de la Maison',
      specials: {
        title: 'Offres Spéciales',
        subtitle: 'Profitez de nos spécialités quotidiennes',
        businessLunch: {
          title: 'Déjeuner d\'Affaires',
          description: 'Plat principal + boisson pour seulement 16,90 €',
          time: 'Lun-Ven 12:00-15:00',
        },
        happyHour: {
          title: 'Happy Hour',
          description: 'Tous les cocktails -30%',
          time: 'Tous les jours 17:00-19:00',
        },
        breakfast: {
          title: 'Spécial Petit-déjeuner',
          description: 'Café & croissant pour 5,90 €',
          time: 'Lun-Ven 06:00-09:00',
        },
      },
    },
    gallery: {
      hero: {
        title: 'Galerie',
        subtitle: 'Découvrez le monde d\'AeroLounge',
      },
      categories: {
        all: 'Tout',
        interior: 'Intérieur',
        food: 'Nourriture',
        drinks: 'Boissons',
        behindScenes: 'Dans les Coulisses',
      },
      images: {
        modernAtmosphere: 'Atmosphère Moderne',
        elegantInterior: 'Intérieur Élégant',
        coffeeSpecialties: 'Spécialités Café',
        latteArt: 'Latte Art',
        breakfast: 'Petit-déjeuner',
        lunchSpecialties: 'Spécialités Déjeuner',
        gourmetDesserts: 'Desserts Gourmets',
        cocktails: 'Cocktails',
        freshPastries: 'Pâtisseries Fraîches',
        baristaWork: 'Barista au Travail',
        tableSetting: 'Mise en Place',
        wineSelection: 'Sélection de Vins',
      },
    },
    contact: {
      hero: {
        title: 'Contact & Réservations',
        subtitle: 'Nous attendons votre visite avec impatience',
      },
      info: {
        address: 'Adresse',
        addressText: 'Flughafenstraße 123\n60549 Francfort-sur-le-Main',
        phone: 'Téléphone',
        phoneText: '+49 69 123 456 78',
        email: 'Email',
        emailText: 'info@aerolounge.de',
        hours: 'Heures d\'Ouverture',
        hoursText: 'Lun-Ven: 06:00 - 22:00\nSam-Dim: 07:00 - 23:00',
      },
      form: {
        title: 'Réserver une Table',
        subtitle: 'Remplissez le formulaire et nous confirmerons votre réservation rapidement',
        name: 'Nom',
        email: 'Email',
        phone: 'Téléphone',
        date: 'Date',
        time: 'Heure',
        guests: 'Personnes',
        message: 'Demandes Spéciales',
        messagePlaceholder: 'Allergies, occasions spéciales, etc.',
        submit: 'Demander une Réservation',
        required: '*',
        person: 'Personne',
        persons: 'Personnes',
        successMessage: 'Demande de réservation envoyée ! Nous vous contacterons sous peu.',
      },
      map: {
        title: 'Nous Trouver',
        subtitle: 'Parfaitement situé entre l\'aéroport et la ville',
        directions: 'Itinéraire',
        byCar: 'En Voiture:',
        byCarText: 'Autoroute A5, sortie aéroport, direction Terminal 1, tourner à gauche après 500m',
        byPublic: 'Transports en Commun:',
        byPublicText: 'S-Bahn S8/S9 jusqu\'à "Flughafen Regionalbahnhof", 5 min à pied',
        parking: 'Stationnement:',
        parkingText: 'Parking gratuit directement devant le café',
      },
      schedule: {
        title: 'Heures d\'Ouverture',
        monday: 'Lundi',
        tuesday: 'Mardi',
        wednesday: 'Mercredi',
        thursday: 'Jeudi',
        friday: 'Vendredi',
        saturday: 'Samedi',
        sunday: 'Dimanche',
        note: 'Des horaires d\'ouverture différents peuvent s\'appliquer les jours fériés',
      },
    },
    footer: {
      tagline: 'Votre escale parfaite près de l\'aéroport. Savourez un café de première classe et une cuisine fraîche dans une ambiance moderne.',
      quickLinks: 'Liens Rapides',
      contact: 'Contact',
      followUs: 'Suivez-nous',
      copyright: '© {year} AeroLounge Café & Bistro. Tous droits réservés.',
      privacy: 'Confidentialité',
      imprint: 'Mentions Légales',
      terms: 'CGV',
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      about: 'Sobre Nosotros',
      menu: 'Menú',
      gallery: 'Galería',
      contact: 'Contacto',
    },
    home: {
      hero: {
        title: 'Bienvenido a',
        subtitle: 'Tu Café & Bistro exclusivo cerca del aeropuerto.',
        subtitle2: 'Donde la comodidad se encuentra con la modernidad.',
        menuBtn: 'Descubrir menú',
        reserveBtn: 'Reserva',
      },
      features: {
        title: '¿Por qué AeroLounge?',
        subtitle: 'Perfecto para viajeros de negocios, huéspedes internacionales y todos los que aprecian la calidad',
        location: {
          title: 'Ubicación Perfecta',
          description: 'A solo 5 minutos del aeropuerto',
        },
        hours: {
          title: 'Horario Extendido',
          description: 'Abierto diariamente desde temprano hasta tarde',
        },
        quality: {
          title: 'Calidad Premium',
          description: 'Ingredientes seleccionados y preparación fresca',
        },
      },
      menu: {
        title: 'Nuestra Oferta',
        subtitle: 'De la mañana a la noche – disfruta de los mejores platos',
        breakfast: {
          title: 'Desayuno',
          description: 'Comienza tu día perfectamente con nuestras creaciones frescas',
        },
        lunch: {
          title: 'Almuerzo',
          description: 'Deliciosos platos para tu pausa del mediodía',
        },
        drinks: {
          title: 'Bebidas',
          description: 'Desde café de especialidad hasta cócteles refrescantes',
        },
      },
      gallery: {
        title: 'Impresiones',
        subtitle: 'Sumérgete en la atmósfera de AeroLounge',
        viewAll: 'Ver todas las imágenes',
      },
      cta: {
        title: '¿Listo para una experiencia especial?',
        subtitle: 'Reserve su mesa ahora y disfrute de un servicio de primera clase en un ambiente único',
        button: 'Reservar ahora',
      },
    },
    about: {
      hero: {
        title: 'Sobre AeroLounge',
        subtitle: 'Donde la comodidad se encuentra con la modernidad',
      },
      story: {
        title: 'Nuestra Historia',
        p1: 'AeroLounge se fundó con una visión clara: crear un lugar que combine el ajetreo de los viajes con un momento de paz y disfrute.',
        p2: 'En nuestro moderno Café & Bistro, combinamos especialidades de café de primera clase con una variada selección culinaria. Ya sea que estés en camino al aeropuerto, tengas una reunión de negocios o simplemente quieras relajarte, encontrarás el ambiente perfecto con nosotros.',
        p3: 'Nuestro experimentado equipo se asegura de que cada visita se convierta en una experiencia especial. Desde la cuidadosa selección de nuestros proveedores hasta la amorosa preparación de cada plato, la calidad es nuestra promesa.',
      },
      values: {
        title: 'Nuestros Valores',
        subtitle: 'Lo que nos define y nos impulsa',
        passion: {
          title: 'Pasión',
          description: 'Amamos lo que hacemos, desde la preparación del café hasta el servicio',
        },
        quality: {
          title: 'Calidad',
          description: 'Solo los mejores ingredientes y preparación fresca todos los días',
        },
        hospitality: {
          title: 'Hospitalidad',
          description: 'Tu bienestar es nuestra máxima prioridad',
        },
        innovation: {
          title: 'Innovación',
          description: 'Moderno, contemporáneo y siempre a la vanguardia',
        },
      },
      location: {
        title: 'La Ubicación Perfecta',
        subtitle: 'Estratégicamente posicionado para tus necesidades',
        airport: {
          title: 'Cerca del Aeropuerto',
          description: 'A solo 5 minutos del Aeropuerto de Frankfurt: perfecto para viajeros antes o después de su vuelo',
          stat: '5 Min',
        },
        hotels: {
          title: 'Distrito Hotelero',
          description: 'Rodeado de hoteles de primera clase: ideal para viajeros de negocios y huéspedes internacionales',
          stat: '20+',
          statLabel: 'Hoteles',
        },
        address: 'Flughafenstraße 123, 60549 Frankfurt am Main',
        addressDesc: 'Ubicado en el centro entre el aeropuerto y la ciudad: fácilmente accesible, perfectamente posicionado',
      },
      mission: {
        title: 'Nuestra Misión',
        text: 'Queremos ofrecer a cada huésped, ya sea viajero de negocios, turista o local, un lugar donde se sienta bienvenido y experimente la calidad en cada detalle. Las personas están en el centro de todo lo que hacemos, y esto se refleja en nuestro servicio, nuestra cocina y nuestra atmósfera.',
      },
    },
    menu: {
      hero: {
        title: 'Nuestro Menú',
        subtitle: 'Excelencia culinaria de la mañana a la noche',
      },
      categories: {
        breakfast: 'Desayuno',
        lunch: 'Almuerzo',
        drinks: 'Bebidas',
      },
      items: {
        breakfast: [
          { name: 'Desayuno AeroLounge', description: 'Croissant, fruta fresca, yogur, café', price: '12.90' },
          { name: 'Huevos Benedict', description: 'Huevos escalfados, holandesa, espinacas, muffin inglés', price: '14.50' },
          { name: 'Tostada de Aguacate', description: 'Pan de masa madre, aguacate, huevo escalfado, microvegetales', price: '11.90' },
          { name: 'Pila de Panqueques', description: 'Jarabe de arce, bayas, crema batida', price: '10.50' },
          { name: 'Müsli Bircher', description: 'Casero, frutas de temporada, nueces', price: '8.90' },
          { name: 'Tostada Francesa', description: 'Brioche, vainilla, plátano caramelizado', price: '11.50' },
        ],
        lunch: [
          { name: 'Filete de Salmón a la Parrilla', description: 'Quinoa, verduras asadas, mantequilla de limón', price: '22.90' },
          { name: 'Hamburguesa de Trufa', description: 'Carne, mayonesa de trufa, rúcula, papas fritas', price: '18.50' },
          { name: 'Ensalada César', description: 'Lechuga romana, pechuga de pollo, parmesano, aderezo casero', price: '15.90' },
          { name: 'Pasta Carbonara', description: 'Tagliatelle casero, guanciale, pecorino', price: '16.50' },
          { name: 'Bowl de Curry Tailandés', description: 'Verduras, leche de coco, arroz jazmín, cilantro', price: '14.90' },
          { name: 'Filete Wagyu', description: '200g, gratín de papa, verduras de temporada', price: '34.90' },
        ],
        drinks: [
          { name: 'Espresso Signature', description: 'Origen único de Etiopía', price: '3.50' },
          { name: 'Cappuccino', description: 'Espresso doble, leche espumada', price: '4.50' },
          { name: 'Cold Brew', description: 'Extracción fría 24h, notas de vainilla', price: '5.20' },
          { name: 'Cóctel Aviation', description: 'Gin, marrasquino, crema de violeta, limón', price: '12.50' },
          { name: 'Hugo Spritz', description: 'Prosecco, jarabe de flor de saúco, menta', price: '9.50' },
          { name: 'Limonada Casera', description: 'Variedades cambiantes según la temporada', price: '5.50' },
        ],
      },
      houseSpecial: 'Recomendación de la Casa',
      specials: {
        title: 'Ofertas Especiales',
        subtitle: 'Disfruta de nuestras especialidades diarias',
        businessLunch: {
          title: 'Almuerzo de Negocios',
          description: 'Plato principal + bebida por solo €16.90',
          time: 'Lun-Vie 12:00-15:00',
        },
        happyHour: {
          title: 'Happy Hour',
          description: 'Todos los cócteles -30%',
          time: 'Diario 17:00-19:00',
        },
        breakfast: {
          title: 'Especial de Desayuno',
          description: 'Café y croissant por €5.90',
          time: 'Lun-Vie 06:00-09:00',
        },
      },
    },
    gallery: {
      hero: {
        title: 'Galería',
        subtitle: 'Descubre el mundo de AeroLounge',
      },
      categories: {
        all: 'Todos',
        interior: 'Interior',
        food: 'Comida',
        drinks: 'Bebidas',
        behindScenes: 'Entre Bastidores',
      },
      images: {
        modernAtmosphere: 'Atmósfera Moderna',
        elegantInterior: 'Interior Elegante',
        coffeeSpecialties: 'Especialidades de Café',
        latteArt: 'Latte Art',
        breakfast: 'Desayuno',
        lunchSpecialties: 'Especialidades de Almuerzo',
        gourmetDesserts: 'Postres Gourmet',
        cocktails: 'Cócteles',
        freshPastries: 'Pasteles Frescos',
        baristaWork: 'Barista en el Trabajo',
        tableSetting: 'Montaje de Mesa',
        wineSelection: 'Selección de Vinos',
      },
    },
    contact: {
      hero: {
        title: 'Contacto y Reservas',
        subtitle: 'Esperamos tu visita',
      },
      info: {
        address: 'Dirección',
        addressText: 'Flughafenstraße 123\n60549 Frankfurt am Main',
        phone: 'Teléfono',
        phoneText: '+49 69 123 456 78',
        email: 'Email',
        emailText: 'info@aerolounge.de',
        hours: 'Horario',
        hoursText: 'Lun-Vie: 06:00 - 22:00\nSáb-Dom: 07:00 - 23:00',
      },
      form: {
        title: 'Reservar una Mesa',
        subtitle: 'Completa el formulario y confirmaremos tu reserva de inmediato',
        name: 'Nombre',
        email: 'Email',
        phone: 'Teléfono',
        date: 'Fecha',
        time: 'Hora',
        guests: 'Personas',
        message: 'Solicitudes Especiales',
        messagePlaceholder: 'Alergias, ocasiones especiales, etc.',
        submit: 'Solicitar Reserva',
        required: '*',
        person: 'Persona',
        persons: 'Personas',
        successMessage: '¡Solicitud de reserva enviada! Te contactaremos pronto.',
      },
      map: {
        title: 'Encuéntranos',
        subtitle: 'Perfectamente ubicado entre el aeropuerto y la ciudad',
        directions: 'Direcciones',
        byCar: 'En Coche:',
        byCarText: 'Autopista A5, salida aeropuerto, dirección Terminal 1, girar a la izquierda después de 500m',
        byPublic: 'Transporte Público:',
        byPublicText: 'S-Bahn S8/S9 hasta "Flughafen Regionalbahnhof", 5 min a pie',
        parking: 'Estacionamiento:',
        parkingText: 'Estacionamiento gratuito directamente frente al café',
      },
      schedule: {
        title: 'Horario de Apertura',
        monday: 'Lunes',
        tuesday: 'Martes',
        wednesday: 'Miércoles',
        thursday: 'Jueves',
        friday: 'Viernes',
        saturday: 'Sábado',
        sunday: 'Domingo',
        note: 'Pueden aplicarse horarios diferentes en días festivos',
      },
    },
    footer: {
      tagline: 'Tu parada perfecta cerca del aeropuerto. Disfruta de un café de primera clase y cocina fresca en un ambiente moderno.',
      quickLinks: 'Enlaces Rápidos',
      contact: 'Contacto',
      followUs: 'Síguenos',
      copyright: '© {year} AeroLounge Café & Bistro. Todos los derechos reservados.',
      privacy: 'Privacidad',
      imprint: 'Aviso Legal',
      terms: 'Términos',
    },
  },
  tr: {
    nav: {
      home: 'Ana Sayfa',
      about: 'Hakkımızda',
      menu: 'Menü',
      gallery: 'Galeri',
      contact: 'İletişim',
    },
    home: {
      hero: {
        title: 'Hoş Geldiniz',
        subtitle: 'Havaalanına yakın özel Kafe & Bistronuz.',
        subtitle2: 'Konforun modernlikle buluştuğu yer.',
        menuBtn: 'Menüyü Keşfedin',
        reserveBtn: 'Rezervasyon',
      },
      features: {
        title: 'Neden AeroLounge?',
        subtitle: 'İş gezginleri, uluslararası misafirler ve kaliteyi takdir eden herkes için mükemmel',
        location: {
          title: 'Mükemmel Konum',
          description: 'Havaalanına sadece 5 dakika',
        },
        hours: {
          title: 'Uzun Çalışma Saatleri',
          description: 'Her gün sabahtan akşama kadar açık',
        },
        quality: {
          title: 'Premium Kalite',
          description: 'Seçilmiş malzemeler ve taze hazırlık',
        },
      },
      menu: {
        title: 'Teklifimiz',
        subtitle: 'Sabahtan akşama – mutfak önemli noktaları tadın',
        breakfast: {
          title: 'Kahvaltı',
          description: 'Taze kahvaltı kreasyonlarımızla güne mükemmel başlayın',
        },
        lunch: {
          title: 'Öğle Yemeği',
          description: 'Öğle yemeği molanız için lezzetli yemekler',
        },
        drinks: {
          title: 'İçecekler',
          description: 'Özel kahvelerden ferahlatıcı kokteyllere',
        },
      },
      gallery: {
        title: 'İzlenimler',
        subtitle: 'AeroLounge atmosferine dalın',
        viewAll: 'Tüm Resimleri Görüntüle',
      },
      cta: {
        title: 'Özel bir deneyime hazır mısınız?',
        subtitle: 'Şimdi masanızı rezerve edin ve benzersiz bir ortamda birinci sınıf hizmetin tadını çıkarın',
        button: 'Şimdi Rezerve Et',
      },
    },
    about: {
      hero: {
        title: 'AeroLounge Hakkında',
        subtitle: 'Konforun modernlikle buluştuğu yer',
      },
      story: {
        title: 'Hikayemiz',
        p1: 'AeroLounge net bir vizyonla kuruldu: Seyahatin koşuşturmasını bir huzur ve keyif anıyla birleştiren bir yer yaratmak.',
        p2: 'Modern Kafe & Bistromuzda, birinci sınıf kahve spesiyalitelerini çeşitli mutfak seçimleriyle birleştiriyoruz. Havaalanına gidiyor, iş toplantısı yapıyor veya sadece rahatlamak istiyorsanız, bizde mükemmel atmosferi bulacaksınız.',
        p3: 'Deneyimli ekibimiz, her ziyaretin özel bir deneyim olmasını sağlar. Tedarikçilerimizin dikkatli seçiminden her yemeğin özenle hazırlanmasına kadar – kalite bizim vaadimizdir.',
      },
      values: {
        title: 'Değerlerimiz',
        subtitle: 'Bizi tanımlayan ve harekete geçiren şey',
        passion: {
          title: 'Tutku',
          description: 'Yaptığımız işi seviyoruz – kahve hazırlıktan servise kadar',
        },
        quality: {
          title: 'Kalite',
          description: 'Sadece en iyi malzemeler ve her gün taze hazırlık',
        },
        hospitality: {
          title: 'Misafirperverlik',
          description: 'Refahınız bizim en önemli önceliğimiz',
        },
        innovation: {
          title: 'İnovasyon',
          description: 'Modern, çağdaş ve her zaman nabızda',
        },
      },
      location: {
        title: 'Mükemmel Konum',
        subtitle: 'İhtiyaçlarınız için stratejik olarak konumlandırılmış',
        airport: {
          title: 'Havaalanına Yakınlık',
          description: 'Frankfurt Havaalanı\'na sadece 5 dakika – uçuştan önce veya sonra gezginler için mükemmel',
          stat: '5 Dk',
        },
        hotels: {
          title: 'Otel Bölgesi',
          description: 'Birinci sınıf otellerle çevrili – iş gezginleri ve uluslararası misafirler için ideal',
          stat: '20+',
          statLabel: 'Otel',
        },
        address: 'Flughafenstraße 123, 60549 Frankfurt am Main',
        addressDesc: 'Havaalanı ve şehir arasında merkezi konumda – kolayca erişilebilir, mükemmel konumlandırılmış',
      },
      mission: {
        title: 'Misyonumuz',
        text: 'Her misafire – iş gezgini, turist veya yerel olsun – kendini hoş hissettiği ve her detayda kalite yaşadığı bir yer sunmak istiyoruz. İnsanlar yaptığımız her şeyin merkezindedir ve bu hizmetimize, mutfağımıza ve atmosferimize yansır.',
      },
    },
    menu: {
      hero: {
        title: 'Menümüz',
        subtitle: 'Sabahtan akşama mutfak mükemmelliği',
      },
      categories: {
        breakfast: 'Kahvaltı',
        lunch: 'Öğle Yemeği',
        drinks: 'İçecekler',
      },
      items: {
        breakfast: [
          { name: 'AeroLounge Kahvaltısı', description: 'Kruvasan, taze meyve, yoğurt, kahve', price: '12.90' },
          { name: 'Eggs Benedict', description: 'Poşe yumurta, hollandaise, ıspanak, İngiliz çöreği', price: '14.50' },
          { name: 'Avokado Tostu', description: 'Ekşi maya ekmeği, avokado, poşe yumurta, mikro yeşillikler', price: '11.90' },
          { name: 'Pankek Yığını', description: 'Akçaağaç şurubu, yaban mersini, krem şanti', price: '10.50' },
          { name: 'Bircher Müsli', description: 'Ev yapımı, mevsim meyveleri, fındık', price: '8.90' },
          { name: 'Fransız Tostu', description: 'Brioche, vanilya, karamelize muz', price: '11.50' },
        ],
        lunch: [
          { name: 'Izgara Somon Fileto', description: 'Kinoa, kavrulmuş sebzeler, limon tereyağı', price: '22.90' },
          { name: 'Trüf Burger', description: 'Sığır eti, trüf mayonez, roka, patates kızartması', price: '18.50' },
          { name: 'Sezar Salatası', description: 'Marul, tavuk göğsü, parmesan, ev yapımı sos', price: '15.90' },
          { name: 'Makarna Carbonara', description: 'Ev yapımı tagliatelle, guanciale, pecorino', price: '16.50' },
          { name: 'Tay Köri Kasesi', description: 'Sebzeler, hindistan cevizi sütü, yasemin pirinci, kişniş', price: '14.90' },
          { name: 'Wagyu Biftek', description: '200g, patates graten, mevsim sebzeleri', price: '34.90' },
        ],
        drinks: [
          { name: 'İmza Espresso', description: 'Etiyopya\'dan tek kaynak', price: '3.50' },
          { name: 'Cappuccino', description: 'Çift espresso, köpüklü süt', price: '4.50' },
          { name: 'Soğuk Demleme', description: '24 saat soğuk çıkarma, vanilya notaları', price: '5.20' },
          { name: 'Havacılık Kokteyli', description: 'Cin, maraschino, menekşe kremi, limon', price: '12.50' },
          { name: 'Hugo Spritz', description: 'Prosecco, mürver çiçeği şurubu, nane', price: '9.50' },
          { name: 'Ev Yapımı Limonata', description: 'Mevsime göre değişen çeşitler', price: '5.50' },
        ],
      },
      houseSpecial: 'Ev Önerisi',
      specials: {
        title: 'Özel Teklifler',
        subtitle: 'Günlük spesiyallerimizin tadını çıkarın',
        businessLunch: {
          title: 'İş Yemeği',
          description: 'Ana yemek + içecek sadece €16.90',
          time: 'Pzt-Cum 12:00-15:00',
        },
        happyHour: {
          title: 'Mutlu Saat',
          description: 'Tüm kokteyllerde %30 indirim',
          time: 'Her gün 17:00-19:00',
        },
        breakfast: {
          title: 'Kahvaltı Özel',
          description: 'Kahve ve kruvasan €5.90',
          time: 'Pzt-Cum 06:00-09:00',
        },
      },
    },
    gallery: {
      hero: {
        title: 'Galeri',
        subtitle: 'AeroLounge dünyasını keşfedin',
      },
      categories: {
        all: 'Hepsi',
        interior: 'İç Mekan',
        food: 'Yemek',
        drinks: 'İçecekler',
        behindScenes: 'Perde Arkası',
      },
      images: {
        modernAtmosphere: 'Modern Atmosfer',
        elegantInterior: 'Şık İç Mekan',
        coffeeSpecialties: 'Kahve Özel',
        latteArt: 'Latte Sanatı',
        breakfast: 'Kahvaltı',
        lunchSpecialties: 'Öğle Yemeği Özel',
        gourmetDesserts: 'Gurme Tatlılar',
        cocktails: 'Kokteyl',
        freshPastries: 'Taze Hamur İşleri',
        baristaWork: 'Barista İş Başında',
        tableSetting: 'Masa Düzeni',
        wineSelection: 'Şarap Seçimi',
      },
    },
    contact: {
      hero: {
        title: 'İletişim & Rezervasyon',
        subtitle: 'Ziyaretinizi dört gözle bekliyoruz',
      },
      info: {
        address: 'Adres',
        addressText: 'Flughafenstraße 123\n60549 Frankfurt am Main',
        phone: 'Telefon',
        phoneText: '+49 69 123 456 78',
        email: 'E-posta',
        emailText: 'info@aerolounge.de',
        hours: 'Çalışma Saatleri',
        hoursText: 'Pzt-Cum: 06:00 - 22:00\nCts-Paz: 07:00 - 23:00',
      },
      form: {
        title: 'Masa Rezervasyonu',
        subtitle: 'Formu doldurun, rezervasyonunuzu hemen onaylayalım',
        name: 'İsim',
        email: 'E-posta',
        phone: 'Telefon',
        date: 'Tarih',
        time: 'Saat',
        guests: 'Kişi Sayısı',
        message: 'Özel İstekler',
        messagePlaceholder: 'Alerjiler, özel günler, vb.',
        submit: 'Rezervasyon Talebi',
        required: '*',
        person: 'Kişi',
        persons: 'Kişi',
        successMessage: 'Rezervasyon talebi gönderildi! Kısa süre içinde size ulaşacağız.',
      },
      map: {
        title: 'Bizi Bulun',
        subtitle: 'Havaalanı ve şehir arasında mükemmel konumda',
        directions: 'Yol Tarifi',
        byCar: 'Arabayla:',
        byCarText: 'A5 otoyolu, havaalanı çıkışı, Terminal 1 yönü, 500m sonra sola',
        byPublic: 'Toplu Taşıma:',
        byPublicText: 'S-Bahn S8/S9 ile "Flughafen Regionalbahnhof"a, 5 dk yürüyüş',
        parking: 'Park:',
        parkingText: 'Kafe önünde ücretsiz otopark',
      },
      schedule: {
        title: 'Çalışma Saatleri',
        monday: 'Pazartesi',
        tuesday: 'Salı',
        wednesday: 'Çarşamba',
        thursday: 'Perşembe',
        friday: 'Cuma',
        saturday: 'Cumartesi',
        sunday: 'Pazar',
        note: 'Resmi tatillerde farklı çalışma saatleri uygulanabilir',
      },
    },
    footer: {
      tagline: 'Havaalanına yakın mükemmel durağınız. Modern bir atmosferde birinci sınıf kahve ve taze mutfağın tadını çıkarın.',
      quickLinks: 'Hızlı Bağlantılar',
      contact: 'İletişim',
      followUs: 'Bizi Takip Edin',
      copyright: '© {year} AeroLounge Café & Bistro. Tüm hakları saklıdır.',
      privacy: 'Gizlilik',
      imprint: 'Künye',
      terms: 'Şartlar',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      menu: 'القائمة',
      gallery: 'المعرض',
      contact: 'اتصل بنا',
    },
    home: {
      hero: {
        title: 'مرحباً بكم في',
        subtitle: 'المقهى والبيسترو الحصري بالقرب من المطار.',
        subtitle2: 'حيث تلتقي الراحة بالحداثة.',
        menuBtn: 'اكتشف القائمة',
        reserveBtn: 'احجز الآن',
      },
      features: {
        title: 'لماذا AeroLounge؟',
        subtitle: 'مثالي لرجال الأعمال والضيوف الدوليين وكل من يقدر الجودة',
        location: {
          title: 'موقع مثالي',
          description: 'على بعد 5 دقائق فقط من المطار',
        },
        hours: {
          title: 'ساعات عمل ممتدة',
          description: 'مفتوح يومياً من الصباح الباكر حتى المساء',
        },
        quality: {
          title: 'جودة ممتازة',
          description: 'مكونات مختارة وتحضير طازج',
        },
      },
      menu: {
        title: 'عروضنا',
        subtitle: 'من الصباح الباكر إلى وقت متأخر - استمتع بأبرز الأطباق',
        breakfast: {
          title: 'الإفطار',
          description: 'ابدأ يومك بشكل مثالي مع إبداعات الإفطار الطازجة',
        },
        lunch: {
          title: 'الغداء',
          description: 'أطباق لذيذة لاستراحة الغداء',
        },
        drinks: {
          title: 'المشروبات',
          description: 'من القهوة الخاصة إلى الكوكتيلات المنعشة',
        },
      },
      gallery: {
        title: 'انطباعات',
        subtitle: 'انغمس في أجواء AeroLounge',
        viewAll: 'عرض جميع الصور',
      },
      cta: {
        title: 'جاهز لتجربة خاصة؟',
        subtitle: 'احجز طاولتك الآن واستمتع بخدمة من الدرجة الأولى في أجواء فريدة',
        button: 'احجز الآن',
      },
    },
    about: {
      hero: {
        title: 'عن AeroLounge',
        subtitle: 'حيث تلتقي الراحة بالحداثة',
      },
      story: {
        title: 'قصتنا',
        p1: 'تأسست AeroLounge برؤية واضحة: إنشاء مكان يجمع بين صخب السفر ولحظة من السلام والاستمتاع.',
        p2: 'في مقهانا وبيسترو الحديث، نجمع بين تخصصات القهوة من الدرجة الأولى ومجموعة متنوعة من الطهي. سواء كنت في طريقك إلى المطار، أو لديك اجتماع عمل، أو تريد فقط الاسترخاء - ستجد الأجواء المثالية معنا.',
        p3: 'يضمن فريقنا ذو الخبرة أن تصبح كل زيارة تجربة خاصة. من الاختيار الدقيق لموردينا إلى الإعداد المحب لكل طبق - الجودة هي وعدنا.',
      },
      values: {
        title: 'قيمنا',
        subtitle: 'ما يحددنا ويدفعنا',
        passion: {
          title: 'الشغف',
          description: 'نحب ما نفعله - من تحضير القهوة إلى الخدمة',
        },
        quality: {
          title: 'الجودة',
          description: 'فقط أفضل المكونات والتحضير الطازج كل يوم',
        },
        hospitality: {
          title: 'الضيافة',
          description: 'رفاهيتك هي أولويتنا القصوى',
        },
        innovation: {
          title: 'الابتكار',
          description: 'حديث، معاصر، ودائماً على اطلاع',
        },
      },
      location: {
        title: 'الموقع المثالي',
        subtitle: 'موضع استراتيجي لتلبية احتياجاتك',
        airport: {
          title: 'قرب المطار',
          description: 'على بعد 5 دقائق فقط من مطار فرانكفورت - مثالي للمسافرين قبل أو بعد رحلتهم',
          stat: '5 دقائق',
        },
        hotels: {
          title: 'منطقة الفنادق',
          description: 'محاط بفنادق من الدرجة الأولى - مثالي لرجال الأعمال والضيوف الدوليين',
          stat: '+20',
          statLabel: 'فندق',
        },
        address: 'Flughafenstraße 123, 60549 فرانكفورت، ألمانيا',
        addressDesc: 'موقع مركزي بين المطار والمدينة - سهل الوصول، موضع مثالي',
      },
      mission: {
        title: 'مهمتنا',
        text: 'نريد أن نقدم لكل ضيف - سواء كان مسافر أعمال أو سائح أو محلي - مكاناً يشعر فيه بالترحيب ويختبر الجودة في كل التفاصيل. الناس في مركز كل ما نفعله، وينعكس ذلك في خدمتنا ومطبخنا وأجوائنا.',
      },
    },
    menu: {
      hero: {
        title: 'قائمتنا',
        subtitle: 'التميز في الطهي من الصباح إلى المساء',
      },
      categories: {
        breakfast: 'الإفطار',
        lunch: 'الغداء',
        drinks: 'المشروبات',
      },
      items: {
        breakfast: [
          { name: 'إفطار AeroLounge', description: 'كرواسون، فواكه طازجة، زبادي، قهوة', price: '12.90' },
          { name: 'بيض بنديكت', description: 'بيض مسلوق، هولنديز، سبانخ، كعك إنجليزي', price: '14.50' },
          { name: 'توست أفوكادو', description: 'خبز العجين المخمر، أفوكادو، بيض مسلوق، خضار صغيرة', price: '11.90' },
          { name: 'كومة فطائر', description: 'شراب القيقب، توت، كريمة مخفوقة', price: '10.50' },
          { name: 'موسلي بيرشر', description: 'منزلي الصنع، فواكه موسمية، مكسرات', price: '8.90' },
          { name: 'توست فرنسي', description: 'بريوش، فانيليا، موز مكرمل', price: '11.50' },
        ],
        lunch: [
          { name: 'فيليه سلمون مشوي', description: 'كينوا، خضار محمصة، زبدة الليمون', price: '22.90' },
          { name: 'برجر بالكمأة', description: 'لحم بقري، مايونيز الكمأة، جرجير، بطاطا مقلية', price: '18.50' },
          { name: 'سلطة قيصر', description: 'خس روماني، صدر دجاج، بارميزان، صلصة منزلية', price: '15.90' },
          { name: 'باستا كاربونارا', description: 'تالياتيلي منزلي الصنع، غوانشيالي، بيكورينو', price: '16.50' },
          { name: 'وعاء كاري تايلندي', description: 'خضار، حليب جوز الهند، أرز ياسمين، كزبرة', price: '14.90' },
          { name: 'ستيك واغيو', description: '200 جم، غراتان بطاطس، خضار موسمية', price: '34.90' },
        ],
        drinks: [
          { name: 'إسبريسو مميز', description: 'من إثيوبيا', price: '3.50' },
          { name: 'كابتشينو', description: 'إسبريسو مزدوج، حليب مزبد', price: '4.50' },
          { name: 'قهوة باردة', description: 'استخلاص بارد لمدة 24 ساعة، نكهات الفانيليا', price: '5.20' },
          { name: 'كوكتيل الطيران', description: 'جن، ماراشينو، كريم فيوليت، ليمون', price: '12.50' },
          { name: 'هوغو سبريتز', description: 'بروسيكو، شراب زهرة البلسان، نعناع', price: '9.50' },
          { name: 'ليمونادة منزلية', description: 'أصناف متغيرة موسمياً', price: '5.50' },
        ],
      },
      houseSpecial: 'توصية المطعم',
      specials: {
        title: 'عروض خاصة',
        subtitle: 'استمتع بعروضنا اليومية الخاصة',
        businessLunch: {
          title: 'غداء عمل',
          description: 'طبق رئيسي + مشروب مقابل 16.90 يورو فقط',
          time: 'الإثنين-الجمعة 12:00-15:00',
        },
        happyHour: {
          title: 'الساعة السعيدة',
          description: 'جميع الكوكتيلات خصم 30%',
          time: 'يومياً 17:00-19:00',
        },
        breakfast: {
          title: 'عرض الإفطار',
          description: 'قهوة وكرواسون مقابل 5.90 يورو',
          time: 'الإثنين-الجمعة 06:00-09:00',
        },
      },
    },
    gallery: {
      hero: {
        title: 'المعرض',
        subtitle: 'اكتشف عالم AeroLounge',
      },
      categories: {
        all: 'الكل',
        interior: 'التصميم الداخلي',
        food: 'الطعام',
        drinks: 'المشروبات',
        behindScenes: 'خلف الكواليس',
      },
      images: {
        modernAtmosphere: 'أجواء حديثة',
        elegantInterior: 'تصميم داخلي أنيق',
        coffeeSpecialties: 'تخصصات القهوة',
        latteArt: 'فن اللاتيه',
        breakfast: 'الإفطار',
        lunchSpecialties: 'تخصصات الغداء',
        gourmetDesserts: 'حلويات فاخرة',
        cocktails: 'كوكتيلات',
        freshPastries: 'معجنات طازجة',
        baristaWork: 'الباريستا في العمل',
        tableSetting: 'ترتيب الطاولة',
        wineSelection: 'اختيار النبيذ',
      },
    },
    contact: {
      hero: {
        title: 'اتصل بنا والحجوزات',
        subtitle: 'نتطلع إلى زيارتك',
      },
      info: {
        address: 'العنوان',
        addressText: 'Flughafenstraße 123\n60549 فرانكفورت، ألمانيا',
        phone: 'الهاتف',
        phoneText: '+49 69 123 456 78',
        email: 'البريد الإلكتروني',
        emailText: 'info@aerolounge.de',
        hours: 'ساعات العمل',
        hoursText: 'الإثنين-الجمعة: 06:00 - 22:00\nالسبت-الأحد: 07:00 - 23:00',
      },
      form: {
        title: 'احجز طاولة',
        subtitle: 'املأ النموذج وسنؤكد حجزك على الفور',
        name: 'الاسم',
        email: 'البريد الإلكتروني',
        phone: 'الهاتف',
        date: 'التاريخ',
        time: 'الوقت',
        guests: 'عدد الأشخاص',
        message: 'طلبات خاصة',
        messagePlaceholder: 'الحساسية، المناسبات الخاصة، إلخ.',
        submit: 'طلب حجز',
        required: '*',
        person: 'شخص',
        persons: 'أشخاص',
        successMessage: 'تم إرسال طلب الحجز! سنتصل بك قريباً.',
      },
      map: {
        title: 'ابحث عنا',
        subtitle: 'موقع مثالي بين المطار والمدينة',
        directions: 'الاتجاهات',
        byCar: 'بالسيارة:',
        byCarText: 'الطريق السريع A5، مخرج المطار، اتجاه Terminal 1، انعطف يساراً بعد 500 متر',
        byPublic: 'المواصلات العامة:',
        byPublicText: 'S-Bahn S8/S9 إلى "Flughafen Regionalbahnhof"، 5 دقائق مشياً',
        parking: 'موقف السيارات:',
        parkingText: 'مواقف مجانية مباشرة أمام المقهى',
      },
      schedule: {
        title: 'ساعات العمل',
        monday: 'الإثنين',
        tuesday: 'الثلاثاء',
        wednesday: 'الأربعاء',
        thursday: 'الخميس',
        friday: 'الجمعة',
        saturday: 'السبت',
        sunday: 'الأحد',
        note: 'قد تختلف ساعات العمل في العطلات الرسمية',
      },
    },
    footer: {
      tagline: 'محطتك المثالية بالقرب من المطار. استمتع بالقهوة من الدرجة الأولى والمطبخ الطازج في أجواء حديثة.',
      quickLinks: 'روابط سريعة',
      contact: 'اتصل بنا',
      followUs: 'تابعنا',
      copyright: '© {year} AeroLounge Café & Bistro. جميع الحقوق محفوظة.',
      privacy: 'الخصوصية',
      imprint: 'معلومات قانونية',
      terms: 'الشروط',
    },
  },
};
