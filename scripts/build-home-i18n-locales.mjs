/**
 * Builds i18n/es-home.json, fr-home.json, de-home.json from English titles in en-home-source.json.
 * Run: node scripts/build-home-i18n-locales.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const en = JSON.parse(fs.readFileSync(path.join(root, 'i18n/en-home-source.json'), 'utf8'));

/** @param {Record<string, { title: string, excerpt?: string }>} map */
function writeHome(locale, map) {
  const homeCards = {};
  for (const href of Object.keys(en.homeCards)) {
    const t = map[href];
    if (t) homeCards[href] = t;
  }
  fs.writeFileSync(
    path.join(root, 'i18n', locale + '-home.json'),
    JSON.stringify({ homeCards }, null, 0),
    'utf8'
  );
  console.log('Wrote', locale + '-home.json', Object.keys(homeCards).length);
}

const ES = {
  'blogs/topic-xcaret.html': { title: 'Hotel Xcaret — centro temático (2026)' },
  'blogs/blog-xcaret-1.html': {
    title: 'Hotel Xcaret México: ¿merece la pena el todo incluido All-Fun?',
    excerpt: 'Guía práctica para parejas y familias: cuándo ahorras y cuándo no.'
  },
  'blogs/blog-xcaret-2.html': { title: 'Hotel Xcaret Arte frente a México: cuál reservar' },
  'blogs/blog-xcaret-3.html': { title: '5 errores de reserva que evitar en Hotel Xcaret' },
  'blogs/blog-booking-1.html': { title: 'Cómo comparar hoteles y reservar estancias' },
  'blogs/blog-flightcentre-2.html': {
    title: 'Guía de paquetes vacacionales',
    excerpt: 'Guía de compra honesta: decide con información y ahorra.'
  },
  'blogs/blog-orbitz-3.html': {
    title: 'Orbitz Rewards frente a la competencia',
    excerpt: 'Guía de compra honesta: decide con información y ahorra.'
  },
  'blogs/blog-flightcentre-1.html': {
    title: 'Agencia de viajes frente a reservar tú mismo',
    excerpt: 'Guía de compra honesta: decide con información y ahorra.'
  },
  'blogs/blog-orbitz-2.html': {
    title: 'Reservas combinadas explicadas',
    excerpt: 'Guía de compra honesta: decide con información y ahorra.'
  },
  'blogs/blog-alamo-3.html': {
    title: 'Programa Alamo Insiders',
    excerpt: 'Guía de compra honesta: decide con información y ahorra.'
  },
  'blogs/blog-orbitz-1.html': {
    title: 'Guía de recompensas Orbucks',
    excerpt: 'Guía de compra honesta: decide con información y ahorra.'
  },
  'blogs/blog-priceline-3.html': {
    title: 'Priceline VIP Rewards',
    excerpt: 'Guía de compra honesta: decide con información y ahorra.'
  },
  'blogs/blog-alamo-2.html': {
    title: 'Alquiler en aeropuerto frente a fuera del aeropuerto',
    excerpt: 'Guía de compra honesta: decide con información y ahorra.'
  },
  'blogs/blog-alamo-1.html': {
    title: 'Alquiler de coche con kilometraje ilimitado',
    excerpt: 'Guía de compra honesta: decide con información y ahorra.'
  },
  'blogs/blog-priceline-2.html': {
    title: 'Express Deals explicados',
    excerpt: 'Guía de compra honesta: decide con información y ahorra.'
  },
  'blogs/blog-acer-1.html': {
    title: 'Guía de portátiles gaming: especificaciones que importan',
    excerpt: 'Qué mirar al comprar un portátil gaming. Evita pagar de más.'
  },
  'blogs/blog-samsung-1.html': {
    title: 'Los mejores smartphones de 2025',
    excerpt: 'Guía honesta: compara prestaciones, batería y relación calidad-precio.'
  },
  'blogs/blog-newegg-1.html': {
    title: 'Montar un PC: guía completa de piezas para principiantes',
    excerpt: 'Elige piezas paso a paso. Evita gastar de más y problemas de compatibilidad.'
  },
  'blogs/blog-woot-1.html': {
    title: 'Guía de sitios de ofertas del día',
    excerpt: 'Guía de compra honesta: decide con información y ahorra.'
  },
  'blogs/blog-govee-2.html': {
    title: 'Iluminación inteligente en casa',
    excerpt: 'Guía de compra honesta: decide con información y ahorra.'
  },
  'blogs/blog-govee-1.html': {
    title: 'Las 10 mejores tiras LED de 2025',
    excerpt: 'Guía de compra honesta: decide con información y ahorra.'
  },
  'blogs/blog-newegg-2.html': {
    title: 'Los 10 mejores componentes de PC',
    excerpt: 'Guía de compra honesta: decide con información y ahorra.'
  },
  'blogs/blog-bestbuy-1.html': {
    title: 'Guía de compra de tecnología',
    excerpt: 'Guía de compra honesta: decide con información y ahorra.'
  },
  'blogs/blog-samsung-2.html': {
    title: 'Las 10 mejores funciones de Samsung Galaxy',
    excerpt: 'Guía de compra honesta: decide con información y ahorra.'
  },
  'blogs/blog-amazon-1.html': {
    title: '¿Amazon Prime sigue valiendo la pena en 2025?',
    excerpt: 'Guía de compra honesta: decide con información y ahorra.'
  },
  'blogs/blog-acer-2.html': {
    title: 'Los mejores portátiles para estudiantes 2025',
    excerpt: 'Guía de compra honesta: decide con información y ahorra.'
  },
  'blogs/blog-bestbuy-2.html': {
    title: '¿Merece la pena la garantía ampliada?',
    excerpt: 'Guía de compra honesta: decide con información y ahorra.'
  },
  'blogs/blog-nike-1.html': {
    title: 'Las mejores zapatillas de baloncesto 2025',
    excerpt: 'Qué hace una gran zapatilla de baloncesto: agarre, amortiguación y soporte.'
  },
  'blogs/blog-adidas-1.html': {
    title: 'Las 10 mejores zapatillas de running 2025',
    excerpt: 'Encuentra la zapatilla adecuada: amortiguación, ajuste y valor.'
  },
  'blogs/blog-sephora-1.html': {
    title: 'Programas de recompensas de belleza',
    excerpt: 'Compara puntos, ventajas y canjes. Saca más partido a tu gasto en belleza.'
  },
  'blogs/blog-farfetch-2.html': {
    title: 'Rebajas de diseñador: cuándo comprar',
    excerpt: 'Guía de compra honesta: decide con información y ahorra.'
  },
  'blogs/blog-sephora-2.html': {
    title: 'Rutina de cuidado de la piel para principiantes',
    excerpt: 'Guía de compra honesta: decide con información y ahorra.'
  },
  'blogs/blog-farfetch-1.html': {
    title: 'Moda de lujo online',
    excerpt: 'Guía de compra honesta: decide con información y ahorra.'
  },
  'blogs/blog-nike-2.html': {
    title: 'Amortiguación en zapatillas de running explicada',
    excerpt: 'Guía de compra honesta: decide con información y ahorra.'
  },
  'blogs/blog-nordstrom-2.html': {
    title: 'Las mejores ofertas en Nordstrom',
    excerpt: 'Guía de compra honesta: decide con información y ahorra.'
  },
  'blogs/blog-nordstrom-1.html': {
    title: 'Guía de la venta aniversario Nordstrom',
    excerpt: 'Guía de compra honesta: decide con información y ahorra.'
  },
  'blogs/blog-adidas-2.html': {
    title: 'Las 7 zapatillas deportivas más cómodas',
    excerpt: 'Guía de compra honesta: decide con información y ahorra.'
  },
  'blogs/blog-shein-1.html': {
    title: 'Moda asequible: dónde comprar con cabeza',
    excerpt: 'Guía de compra honesta: decide con información y ahorra.'
  },
  'blogs/blog-shein-2.html': {
    title: 'Looks de tendencia por menos de 50 dólares',
    excerpt: 'Guía de compra honesta: decide con información y ahorra.'
  },
  'blogs/blog-sport-fashion-running-shoes-2026.html': {
    title: 'Cómo elegir zapatillas según tu pisada y superficie (guía 2026)',
    excerpt: 'Carretera, pista o sendero: no te fíes solo de la etiqueta de la caja.'
  },
  'blogs/blog-sport-fashion-training-vs-running.html': {
    title: 'Zapatillas de entrenamiento frente a running: qué comprar y por qué',
    excerpt: 'Soporte lateral frente a amortiguación hacia delante: cuándo usar cada tipo.'
  },
  'blogs/blog-sport-fashion-athleisure-basics.html': {
    title: 'Básicos athleisure: 8 prendas que funcionan en todo el mundo',
    excerpt: 'Cápsula versátil para viaje, entrenamiento y día a día.'
  },
  'blogs/blog-sport-fashion-read-product-pages.html': {
    title: 'Cómo leer fichas de ropa deportiva (talla, tejidos, cuidados)',
    excerpt: 'Entiende tejidos, tallaje, símbolos de lavado y políticas de devolución.'
  },
  'blogs/blog-sport-fashion-sneaker-sizing.html': {
    title: 'Tallas de zapatillas entre marcas: guía internacional práctica',
    excerpt: 'US, UK, EU y cm entre marcas: guía para compradores internacionales.'
  },
  'blogs/blog-sport-fashion-sales-cycles.html': {
    title: 'Mejor época para comprar material deportivo: ciclos de rebajas',
    excerpt: 'Cuándo bajan precios: temporadas, renovación de modelos y urgencias falsas.'
  },
  'blogs/blog-tripadvisor-1.html': {
    title: 'Leer opiniones de viajes',
    excerpt: 'Guía de compra honesta: decide con información y ahorra.'
  },
  'blogs/blog-expedia-1.html': {
    title: 'Ofertas de viaje combinadas',
    excerpt: 'Guía de compra honesta: decide con información y ahorra.'
  },
  'blogs/blog-hotels-1.html': {
    title: 'Programas de puntos hoteleros',
    excerpt: 'Guía de compra honesta: decide con información y ahorra.'
  },
  'blogs/blog-xcaret-4.html': { title: 'Hotel Xcaret con niños: lista de preparación familiar' },
  'blogs/blog-xcaret-5.html': { title: 'Itinerario de 4 noches en Hotel Xcaret para primeras visitas' },
  'blogs/blog-xcaret-6.html': { title: 'Desglose de presupuesto Hotel Xcaret: qué suma al total' },
  'blogs/blog-xcaret-7.html': { title: 'Traslados al aeropuerto para Hotel Xcaret' },
  'blogs/blog-xcaret-8.html': { title: 'Lista de política de cancelación Hotel Xcaret' },
  'blogs/blog-hotels-2.html': {
    title: 'Reserva directa frente a terceros',
    excerpt: 'Guía de compra honesta: decide con información y ahorra.'
  },
  'blogs/blog-ihg-1.html': {
    title: 'Cadenas hoteleras comparadas',
    excerpt: 'Guía de compra honesta: decide con información y ahorra.'
  },
  'blogs/blog-marriott-1.html': {
    title: 'Programas de fidelidad hotelera',
    excerpt: 'Guía de compra honesta: decide con información y ahorra.'
  },
  'blogs/blog-tripadvisor-2.html': {
    title: 'Reserva de tours y actividades',
    excerpt: 'Guía de compra honesta: decide con información y ahorra.'
  },
  'blogs/blog-avis-1.html': {
    title: 'Gastos ocultos del alquiler de coches',
    excerpt: 'Guía de compra honesta: decide con información y ahorra.'
  },
  'blogs/blog-expedia-2.html': {
    title: 'Comparar precios al planificar un viaje',
    excerpt: 'Guía de compra honesta: decide con información y ahorra.'
  },
  'blogs/blog-priceline-1.html': {
    title: 'Guía Pon tu precio',
    excerpt: 'Guía de compra honesta: decide con información y ahorra.'
  },
  'blogs/blog-target-1.html': {
    title: 'Guía Target Circle Rewards',
    excerpt: 'Saca más partido al programa de fidelidad de Target. Combina ofertas y recompensas.'
  },
  'blogs/blog-walmart-1.html': {
    title: 'Consejos para la compra diaria',
    excerpt: 'Formas prácticas de bajar la factura sin perder calidad.'
  },
  'blogs/blog-macys-1.html': {
    title: 'Calendario de rebajas en grandes almacenes',
    excerpt: 'Cuándo comprar para mejores descuentos. Combina con recompensas.'
  },
  'blogs/blog-macys-2.html': {
    title: 'Las mejores ofertas del hogar en Macy’s',
    excerpt: 'Guía de compra honesta: decide con información y ahorra.'
  },
  'blogs/blog-walmart-2.html': {
    title: 'Las mejores ofertas en Walmart',
    excerpt: 'Guía de compra honesta: decide con información y ahorra.'
  },
  'blogs/blog-ebay-2.html': {
    title: 'eBay frente a Amazon',
    excerpt: 'Guía de compra honesta: decide con información y ahorra.'
  },
  'blogs/blog-ebay-1.html': {
    title: 'Comprar electrónica de segunda mano',
    excerpt: 'Guía de compra honesta: decide con información y ahorra.'
  },
  'blogs/blog-homedepot-1.html': {
    title: 'Guía de herramientas para bricolaje',
    excerpt: 'Guía de compra honesta: decide con información y ahorra.'
  },
  'blogs/blog-homedepot-2.html': {
    title: 'Mejoras en el hogar con poco presupuesto',
    excerpt: 'Guía de compra honesta: decide con información y ahorra.'
  },
  'blogs/blog-kohls-1.html': {
    title: 'Estrategia Kohl’s Cash',
    excerpt: 'Guía de compra honesta: decide con información y ahorra.'
  },
  'blogs/blog-target-2.html': {
    title: 'Las mejores ideas hogar en Target',
    excerpt: 'Guía de compra honesta: decide con información y ahorra.'
  },
  'blogs/blog-kohls-2.html': {
    title: 'Guía de tarjetas de tienda',
    excerpt: 'Guía de compra honesta: decide con información y ahorra.'
  }
};

const FR = {
  'blogs/topic-xcaret.html': { title: 'Hotel Xcaret — hub thématique (2026)' },
  'blogs/blog-xcaret-1.html': {
    title: 'Hotel Xcaret Mexique : le tout-inclus All-Fun vaut-il le coup ?',
    excerpt: 'Guide pratique pour couples et familles : quand vous économisez et quand non.'
  },
  'blogs/blog-xcaret-2.html': { title: 'Hotel Xcaret Arte vs Mexico : lequel réserver' },
  'blogs/blog-xcaret-3.html': { title: '5 erreurs de réservation à éviter à l’Hotel Xcaret' },
  'blogs/blog-booking-1.html': { title: 'Comparer les hôtels et réserver son séjour' },
  'blogs/blog-flightcentre-2.html': {
    title: 'Guide des forfaits voyage',
    excerpt: 'Guide d’achat honnête : décidez en connaissance de cause et économisez.'
  },
  'blogs/blog-orbitz-3.html': {
    title: 'Orbitz Rewards face à la concurrence',
    excerpt: 'Guide d’achat honnête : décidez en connaissance de cause et économisez.'
  },
  'blogs/blog-flightcentre-1.html': {
    title: 'Agent de voyage vs réservation en ligne',
    excerpt: 'Guide d’achat honnête : décidez en connaissance de cause et économisez.'
  },
  'blogs/blog-orbitz-2.html': {
    title: 'Réservations groupées expliquées',
    excerpt: 'Guide d’achat honnête : décidez en connaissance de cause et économisez.'
  },
  'blogs/blog-alamo-3.html': {
    title: 'Programme Alamo Insiders',
    excerpt: 'Guide d’achat honnête : décidez en connaissance de cause et économisez.'
  },
  'blogs/blog-orbitz-1.html': {
    title: 'Guide des récompenses Orbucks',
    excerpt: 'Guide d’achat honnête : décidez en connaissance de cause et économisez.'
  },
  'blogs/blog-priceline-3.html': {
    title: 'Priceline VIP Rewards',
    excerpt: 'Guide d’achat honnête : décidez en connaissance de cause et économisez.'
  },
  'blogs/blog-alamo-2.html': {
    title: 'Location à l’aéroport ou hors site',
    excerpt: 'Guide d’achat honnête : décidez en connaissance de cause et économisez.'
  },
  'blogs/blog-alamo-1.html': {
    title: 'Location voiture kilométrage illimité',
    excerpt: 'Guide d’achat honnête : décidez en connaissance de cause et économisez.'
  },
  'blogs/blog-priceline-2.html': {
    title: 'Express Deals expliqués',
    excerpt: 'Guide d’achat honnête : décidez en connaissance de cause et économisez.'
  },
  'blogs/blog-acer-1.html': {
    title: 'PC portables gaming : les specs qui comptent',
    excerpt: 'Quoi regarder pour un PC gaming. Évitez de surpayer.'
  },
  'blogs/blog-samsung-1.html': {
    title: 'Meilleurs smartphones 2025',
    excerpt: 'Guide honnête : comparez performances, autonomie et rapport qualité-prix.'
  },
  'blogs/blog-newegg-1.html': {
    title: 'Monter un PC : guide complet des pièces pour débutants',
    excerpt: 'Choisissez les composants étape par étape. Évitez les erreurs de compatibilité.'
  },
  'blogs/blog-woot-1.html': {
    title: 'Guide des sites d’offres du jour',
    excerpt: 'Guide d’achat honnête : décidez en connaissance de cause et économisez.'
  },
  'blogs/blog-govee-2.html': {
    title: 'Éclairage connecté à la maison',
    excerpt: 'Guide d’achat honnête : décidez en connaissance de cause et économisez.'
  },
  'blogs/blog-govee-1.html': {
    title: 'Top 10 des rubans LED 2025',
    excerpt: 'Guide d’achat honnête : décidez en connaissance de cause et économisez.'
  },
  'blogs/blog-newegg-2.html': {
    title: 'Top 10 des composants PC',
    excerpt: 'Guide d’achat honnête : décidez en connaissance de cause et économisez.'
  },
  'blogs/blog-bestbuy-1.html': {
    title: 'Guide d’achat high-tech',
    excerpt: 'Guide d’achat honnête : décidez en connaissance de cause et économisez.'
  },
  'blogs/blog-samsung-2.html': {
    title: 'Top 10 des fonctionnalités Samsung Galaxy',
    excerpt: 'Guide d’achat honnête : décidez en connaissance de cause et économisez.'
  },
  'blogs/blog-amazon-1.html': {
    title: 'Amazon Prime : ça vaut encore le coup en 2025 ?',
    excerpt: 'Guide d’achat honnête : décidez en connaissance de cause et économisez.'
  },
  'blogs/blog-acer-2.html': {
    title: 'Meilleurs ordinateurs portables étudiants 2025',
    excerpt: 'Guide d’achat honnête : décidez en connaissance de cause et économisez.'
  },
  'blogs/blog-bestbuy-2.html': {
    title: 'Garantie étendue : oui ou non ?',
    excerpt: 'Guide d’achat honnête : décidez en connaissance de cause et économisez.'
  },
  'blogs/blog-nike-1.html': {
    title: 'Meilleures chaussures de basket 2025',
    excerpt: 'Adhérence, amorti et maintien : ce qui compte vraiment.'
  },
  'blogs/blog-adidas-1.html': {
    title: 'Top 10 des chaussures de running 2025',
    excerpt: 'Trouvez la bonne chaussure : amorti, fit et rapport qualité-prix.'
  },
  'blogs/blog-sephora-1.html': {
    title: 'Programmes de récompenses beauté',
    excerpt: 'Comparez points, avantages et échanges. Profitez mieux de vos achats beauté.'
  },
  'blogs/blog-farfetch-2.html': {
    title: 'Soldes créateurs : quand acheter',
    excerpt: 'Guide d’achat honnête : décidez en connaissance de cause et économisez.'
  },
  'blogs/blog-sephora-2.html': {
    title: 'Routine skincare pour débutants',
    excerpt: 'Guide d’achat honnête : décidez en connaissance de cause et économisez.'
  },
  'blogs/blog-farfetch-1.html': {
    title: 'Mode luxe en ligne',
    excerpt: 'Guide d’achat honnête : décidez en connaissance de cause et économisez.'
  },
  'blogs/blog-nike-2.html': {
    title: 'Amorti des chaussures de running expliqué',
    excerpt: 'Guide d’achat honnête : décidez en connaissance de cause et économisez.'
  },
  'blogs/blog-nordstrom-2.html': {
    title: 'Meilleures affaires Nordstrom',
    excerpt: 'Guide d’achat honnête : décidez en connaissance de cause et économisez.'
  },
  'blogs/blog-nordstrom-1.html': {
    title: 'Guide de la vente anniversaire Nordstrom',
    excerpt: 'Guide d’achat honnête : décidez en connaissance de cause et économisez.'
  },
  'blogs/blog-adidas-2.html': {
    title: 'Les 7 baskets sport les plus confortables',
    excerpt: 'Guide d’achat honnête : décidez en connaissance de cause et économisez.'
  },
  'blogs/blog-shein-1.html': {
    title: 'Mode abordable : où acheter malin',
    excerpt: 'Guide d’achat honnête : décidez en connaissance de cause et économisez.'
  },
  'blogs/blog-shein-2.html': {
    title: 'Tenues tendance à moins de 50 dollars',
    excerpt: 'Guide d’achat honnête : décidez en connaissance de cause et économisez.'
  },
  'blogs/blog-sport-fashion-running-shoes-2026.html': {
    title: 'Choisir ses chaussures de course : foulée et surface (guide 2026)',
    excerpt: 'Route, piste ou trail : ne vous fiez pas qu’à l’étiquette de la boîte.'
  },
  'blogs/blog-sport-fashion-training-vs-running.html': {
    title: 'Chaussures d’entraînement vs running : que choisir',
    excerpt: 'Soutien latéral vs amorti avant : quand utiliser chaque type.'
  },
  'blogs/blog-sport-fashion-athleisure-basics.html': {
    title: 'Basiques athleisure : 8 pièces polyvalentes',
    excerpt: 'Capsule voyage, entraînement et quotidien.'
  },
  'blogs/blog-sport-fashion-read-product-pages.html': {
    title: 'Lire les fiches produit sport (taille, tissus, entretien)',
    excerpt: 'Décoder tissus, tailles, symboles lavage et retours.'
  },
  'blogs/blog-sport-fashion-sneaker-sizing.html': {
    title: 'Pointures baskets entre marques : guide international',
    excerpt: 'US, UK, EU, cm : guide pour acheteurs internationaux.'
  },
  'blogs/blog-sport-fashion-sales-cycles.html': {
    title: 'Meilleur moment pour acheter du matériel sport : soldes',
    excerpt: 'Quand les prix baissent : saisons, renouvellement des modèles.'
  },
  'blogs/blog-tripadvisor-1.html': {
    title: 'Lire les avis voyage',
    excerpt: 'Guide d’achat honnête : décidez en connaissance de cause et économisez.'
  },
  'blogs/blog-expedia-1.html': {
    title: 'Offres voyage groupées',
    excerpt: 'Guide d’achat honnête : décidez en connaissance de cause et économisez.'
  },
  'blogs/blog-hotels-1.html': {
    title: 'Programmes de points hôteliers',
    excerpt: 'Guide d’achat honnête : décidez en connaissance de cause et économisez.'
  },
  'blogs/blog-xcaret-4.html': { title: 'Hotel Xcaret avec enfants : checklist famille' },
  'blogs/blog-xcaret-5.html': { title: 'Itinéraire 4 nuits Hotel Xcaret pour premiers visiteurs' },
  'blogs/blog-xcaret-6.html': { title: 'Budget Hotel Xcaret : ce qui fait le prix total' },
  'blogs/blog-xcaret-7.html': { title: 'Transferts aéroport pour Hotel Xcaret' },
  'blogs/blog-xcaret-8.html': { title: 'Checklist annulation Hotel Xcaret' },
  'blogs/blog-hotels-2.html': {
    title: 'Réservation directe vs tiers',
    excerpt: 'Guide d’achat honnête : décidez en connaissance de cause et économisez.'
  },
  'blogs/blog-ihg-1.html': {
    title: 'Chaînes hôtelières comparées',
    excerpt: 'Guide d’achat honnête : décidez en connaissance de cause et économisez.'
  },
  'blogs/blog-marriott-1.html': {
    title: 'Programmes de fidélité hôtelière',
    excerpt: 'Guide d’achat honnête : décidez en connaissance de cause et économisez.'
  },
  'blogs/blog-tripadvisor-2.html': {
    title: 'Réservation de visites et activités',
    excerpt: 'Guide d’achat honnête : décidez en connaissance de cause et économisez.'
  },
  'blogs/blog-avis-1.html': {
    title: 'Frais cachés location de voiture',
    excerpt: 'Guide d’achat honnête : décidez en connaissance de cause et économisez.'
  },
  'blogs/blog-expedia-2.html': {
    title: 'Comparer les prix voyage',
    excerpt: 'Guide d’achat honnête : décidez en connaissance de cause et économisez.'
  },
  'blogs/blog-priceline-1.html': {
    title: 'Guide Name Your Price',
    excerpt: 'Guide d’achat honnête : décidez en connaissance de cause et économisez.'
  },
  'blogs/blog-target-1.html': {
    title: 'Guide Target Circle Rewards',
    excerpt: 'Tirez le meilleur parti du programme. Cumulez offres et récompenses.'
  },
  'blogs/blog-walmart-1.html': {
    title: 'Conseils courses alimentaires',
    excerpt: 'Réduire l’addition sans sacrifier la qualité.'
  },
  'blogs/blog-macys-1.html': {
    title: 'Calendrier soldes grands magasins',
    excerpt: 'Quand acheter pour les meilleurs rabais. Cumulez avec les récompenses.'
  },
  'blogs/blog-macys-2.html': {
    title: 'Meilleures offres maison chez Macy’s',
    excerpt: 'Guide d’achat honnête : décidez en connaissance de cause et économisez.'
  },
  'blogs/blog-walmart-2.html': {
    title: 'Meilleures offres Walmart',
    excerpt: 'Guide d’achat honnête : décidez en connaissance de cause et économisez.'
  },
  'blogs/blog-ebay-2.html': {
    title: 'eBay vs Amazon',
    excerpt: 'Guide d’achat honnête : décidez en connaissance de cause et économisez.'
  },
  'blogs/blog-ebay-1.html': {
    title: 'Acheter de l’électronique d’occasion',
    excerpt: 'Guide d’achat honnête : décidez en connaissance de cause et économisez.'
  },
  'blogs/blog-homedepot-1.html': {
    title: 'Guide outils bricolage',
    excerpt: 'Guide d’achat honnête : décidez en connaissance de cause et économisez.'
  },
  'blogs/blog-homedepot-2.html': {
    title: 'Rénovation maison petit budget',
    excerpt: 'Guide d’achat honnête : décidez en connaissance de cause et économisez.'
  },
  'blogs/blog-kohls-1.html': {
    title: 'Stratégie Kohl’s Cash',
    excerpt: 'Guide d’achat honnête : décidez en connaissance de cause et économisez.'
  },
  'blogs/blog-target-2.html': {
    title: 'Meilleures idées maison Target',
    excerpt: 'Guide d’achat honnête : décidez en connaissance de cause et économisez.'
  },
  'blogs/blog-kohls-2.html': {
    title: 'Guide cartes magasin',
    excerpt: 'Guide d’achat honnête : décidez en connaissance de cause et économisez.'
  }
};

const DE = {
  'blogs/topic-xcaret.html': { title: 'Hotel Xcaret — Themen-Hub (2026)' },
  'blogs/blog-xcaret-1.html': {
    title: 'Hotel Xcaret Mexiko: Lohnt sich All-Fun All-inclusive?',
    excerpt: 'Praktischer Rat für Paare und Familien: wann sparen, wann nicht.'
  },
  'blogs/blog-xcaret-2.html': { title: 'Hotel Xcaret Arte vs Mexico: Welches buchen?' },
  'blogs/blog-xcaret-3.html': { title: '5 Buchungsfehler am Hotel Xcaret vermeiden' },
  'blogs/blog-booking-1.html': { title: 'Hotels vergleichen und Aufenthalte buchen' },
  'blogs/blog-flightcentre-2.html': {
    title: 'Pauschalangebote – Ratgeber',
    excerpt: 'Ehrlicher Kaufratgeber: informiert entscheiden und sparen.'
  },
  'blogs/blog-orbitz-3.html': {
    title: 'Orbitz Rewards vs. Mitbewerber',
    excerpt: 'Ehrlicher Kaufratgeber: informiert entscheiden und sparen.'
  },
  'blogs/blog-flightcentre-1.html': {
    title: 'Reisebüro vs. Selbstbuchung',
    excerpt: 'Ehrlicher Kaufratgeber: informiert entscheiden und sparen.'
  },
  'blogs/blog-orbitz-2.html': {
    title: 'Bundle-Buchungen erklärt',
    excerpt: 'Ehrlicher Kaufratgeber: informiert entscheiden und sparen.'
  },
  'blogs/blog-alamo-3.html': {
    title: 'Alamo Insiders Programm',
    excerpt: 'Ehrlicher Kaufratgeber: informiert entscheiden und sparen.'
  },
  'blogs/blog-orbitz-1.html': {
    title: 'Orbucks Rewards Ratgeber',
    excerpt: 'Ehrlicher Kaufratgeber: informiert entscheiden und sparen.'
  },
  'blogs/blog-priceline-3.html': {
    title: 'Priceline VIP Rewards',
    excerpt: 'Ehrlicher Kaufratgeber: informiert entscheiden und sparen.'
  },
  'blogs/blog-alamo-2.html': {
    title: 'Mietwagen: Flughafen vs. außerhalb',
    excerpt: 'Ehrlicher Kaufratgeber: informiert entscheiden und sparen.'
  },
  'blogs/blog-alamo-1.html': {
    title: 'Mietwagen mit unbegrenzter Kilometerzahl',
    excerpt: 'Ehrlicher Kaufratgeber: informiert entscheiden und sparen.'
  },
  'blogs/blog-priceline-2.html': {
    title: 'Express Deals erklärt',
    excerpt: 'Ehrlicher Kaufratgeber: informiert entscheiden und sparen.'
  },
  'blogs/blog-acer-1.html': {
    title: 'Gaming-Laptop: Specs, die zählen',
    excerpt: 'Worauf beim Gaming-Laptop achten. Nicht zu viel bezahlen.'
  },
  'blogs/blog-samsung-1.html': {
    title: 'Die besten Smartphones 2025',
    excerpt: 'Ehrlicher Rat: Features, Akku und Preis-Leistung vergleichen.'
  },
  'blogs/blog-newegg-1.html': {
    title: 'PC zusammenbauen: Komplett-Teileguide für Einsteiger',
    excerpt: 'Schritt für Schritt Teile wählen. Budget und Kompatibilität im Blick.'
  },
  'blogs/blog-woot-1.html': {
    title: 'Ratgeber Tagesdeal-Seiten',
    excerpt: 'Ehrlicher Kaufratgeber: informiert entscheiden und sparen.'
  },
  'blogs/blog-govee-2.html': {
    title: 'Smart-Home-Beleuchtung',
    excerpt: 'Ehrlicher Kaufratgeber: informiert entscheiden und sparen.'
  },
  'blogs/blog-govee-1.html': {
    title: 'Top 10 LED-Streifen 2025',
    excerpt: 'Ehrlicher Kaufratgeber: informiert entscheiden und sparen.'
  },
  'blogs/blog-newegg-2.html': {
    title: 'Top 10 PC-Komponenten',
    excerpt: 'Ehrlicher Kaufratgeber: informiert entscheiden und sparen.'
  },
  'blogs/blog-bestbuy-1.html': {
    title: 'Tech-Kaufratgeber',
    excerpt: 'Ehrlicher Kaufratgeber: informiert entscheiden und sparen.'
  },
  'blogs/blog-samsung-2.html': {
    title: 'Top 10 Samsung-Galaxy-Features',
    excerpt: 'Ehrlicher Kaufratgeber: informiert entscheiden und sparen.'
  },
  'blogs/blog-amazon-1.html': {
    title: 'Amazon Prime 2025 noch wert?',
    excerpt: 'Ehrlicher Kaufratgeber: informiert entscheiden und sparen.'
  },
  'blogs/blog-acer-2.html': {
    title: 'Beste Studenten-Laptops 2025',
    excerpt: 'Ehrlicher Kaufratgeber: informiert entscheiden und sparen.'
  },
  'blogs/blog-bestbuy-2.html': {
    title: 'Lohnt sich die erweiterte Garantie?',
    excerpt: 'Ehrlicher Kaufratgeber: informiert entscheiden und sparen.'
  },
  'blogs/blog-nike-1.html': {
    title: 'Beste Basketballschuhe 2025',
    excerpt: 'Grip, Dämpfung, Halt – worauf es ankommt.'
  },
  'blogs/blog-adidas-1.html': {
    title: 'Top 10 Laufschuhe 2025',
    excerpt: 'Passender Schuh: Dämpfung, Passform, Preis-Leistung.'
  },
  'blogs/blog-sephora-1.html': {
    title: 'Beauty-Bonusprogramme',
    excerpt: 'Punkte, Vorteile und Einlösung vergleichen. Mehr aus Beauty-Ausgaben holen.'
  },
  'blogs/blog-farfetch-2.html': {
    title: 'Designer-Sales: wann kaufen',
    excerpt: 'Ehrlicher Kaufratgeber: informiert entscheiden und sparen.'
  },
  'blogs/blog-sephora-2.html': {
    title: 'Skincare-Routine für Einsteiger',
    excerpt: 'Ehrlicher Kaufratgeber: informiert entscheiden und sparen.'
  },
  'blogs/blog-farfetch-1.html': {
    title: 'Luxusmode online',
    excerpt: 'Ehrlicher Kaufratgeber: informiert entscheiden und sparen.'
  },
  'blogs/blog-nike-2.html': {
    title: 'Laufschuh-Dämpfung erklärt',
    excerpt: 'Ehrlicher Kaufratgeber: informiert entscheiden und sparen.'
  },
  'blogs/blog-nordstrom-2.html': {
    title: 'Beste Nordstrom-Funde',
    excerpt: 'Ehrlicher Kaufratgeber: informiert entscheiden und sparen.'
  },
  'blogs/blog-nordstrom-1.html': {
    title: 'Nordstrom Anniversary Sale Guide',
    excerpt: 'Ehrlicher Kaufratgeber: informiert entscheiden und sparen.'
  },
  'blogs/blog-adidas-2.html': {
    title: 'Die 7 bequemsten Trainingssneaker',
    excerpt: 'Ehrlicher Kaufratgeber: informiert entscheiden und sparen.'
  },
  'blogs/blog-shein-1.html': {
    title: 'Günstige Mode: clever einkaufen',
    excerpt: 'Ehrlicher Kaufratgeber: informiert entscheiden und sparen.'
  },
  'blogs/blog-shein-2.html': {
    title: 'Trend-Outfits unter 50 Dollar',
    excerpt: 'Ehrlicher Kaufratgeber: informiert entscheiden und sparen.'
  },
  'blogs/blog-sport-fashion-running-shoes-2026.html': {
    title: 'Laufschuhe nach Gangart und Untergrund wählen (2026)',
    excerpt: 'Straße, Bahn oder Trail – nicht nur das Etikett zählt.'
  },
  'blogs/blog-sport-fashion-training-vs-running.html': {
    title: 'Trainingsschuhe vs. Laufschuhe: was kaufen',
    excerpt: 'Seitliche Stabilität vs. Vorfußdämpfung – wann welcher Typ.'
  },
  'blogs/blog-sport-fashion-athleisure-basics.html': {
    title: 'Athleisure-Basics: 8 Teile weltweit tragbar',
    excerpt: 'Kapsel für Reise, Training und Alltag.'
  },
  'blogs/blog-sport-fashion-read-product-pages.html': {
    title: 'Sportbekleidung-Produktseiten lesen (Passform, Stoffe, Pflege)',
    excerpt: 'Stoffe, Größen, Pflegesymbole und Rückgabe verstehen.'
  },
  'blogs/blog-sport-fashion-sneaker-sizing.html': {
    title: 'Sneaker-Größen zwischen Marken: internationaler Ratgeber',
    excerpt: 'US, UK, EU, cm – für internationale Käufer.'
  },
  'blogs/blog-sport-fashion-sales-cycles.html': {
    title: 'Beste Zeit für Sportausrüstung: Sale-Zyklen',
    excerpt: 'Wann Preise sinken: Saison, Modellwechsel, künstliche Dringlichkeit.'
  },
  'blogs/blog-tripadvisor-1.html': {
    title: 'Reisebewertungen lesen',
    excerpt: 'Ehrlicher Kaufratgeber: informiert entscheiden und sparen.'
  },
  'blogs/blog-expedia-1.html': {
    title: 'Kombi-Reiseangebote',
    excerpt: 'Ehrlicher Kaufratgeber: informiert entscheiden und sparen.'
  },
  'blogs/blog-hotels-1.html': {
    title: 'Hotel-Punkteprogramme',
    excerpt: 'Ehrlicher Kaufratgeber: informiert entscheiden und sparen.'
  },
  'blogs/blog-xcaret-4.html': { title: 'Hotel Xcaret mit Kindern: Familien-Checkliste' },
  'blogs/blog-xcaret-5.html': { title: '4 Nächte Hotel Xcaret: Erstbesucher-Route' },
  'blogs/blog-xcaret-6.html': { title: 'Hotel-Xcaret-Budget: Gesamtkostenfaktoren' },
  'blogs/blog-xcaret-7.html': { title: 'Flughafentransfer zum Hotel Xcaret' },
  'blogs/blog-xcaret-8.html': { title: 'Stornierungs-Checkliste Hotel Xcaret' },
  'blogs/blog-hotels-2.html': {
    title: 'Direktbuchung vs. Drittanbieter',
    excerpt: 'Ehrlicher Kaufratgeber: informiert entscheiden und sparen.'
  },
  'blogs/blog-ihg-1.html': {
    title: 'Hotelketten im Vergleich',
    excerpt: 'Ehrlicher Kaufratgeber: informiert entscheiden und sparen.'
  },
  'blogs/blog-marriott-1.html': {
    title: 'Hotel-Treueprogramme',
    excerpt: 'Ehrlicher Kaufratgeber: informiert entscheiden und sparen.'
  },
  'blogs/blog-tripadvisor-2.html': {
    title: 'Touren und Aktivitäten buchen',
    excerpt: 'Ehrlicher Kaufratgeber: informiert entscheiden und sparen.'
  },
  'blogs/blog-avis-1.html': {
    title: 'Mietwagen: versteckte Gebühren',
    excerpt: 'Ehrlicher Kaufratgeber: informiert entscheiden und sparen.'
  },
  'blogs/blog-expedia-2.html': {
    title: 'Reisepreise vergleichen',
    excerpt: 'Ehrlicher Kaufratgeber: informiert entscheiden und sparen.'
  },
  'blogs/blog-priceline-1.html': {
    title: 'Name-Your-Price Ratgeber',
    excerpt: 'Ehrlicher Kaufratgeber: informiert entscheiden und sparen.'
  },
  'blogs/blog-target-1.html': {
    title: 'Target Circle Rewards Ratgeber',
    excerpt: 'Mehr aus dem Treueprogramm holen. Angebote und Rewards kombinieren.'
  },
  'blogs/blog-walmart-1.html': {
    title: 'Tipps für den Supermarkteinkauf',
    excerpt: 'Die Rechnung senken ohne Qualitätsverlust.'
  },
  'blogs/blog-macys-1.html': {
    title: 'Kaufhaus-Sales: richtig timen',
    excerpt: 'Wann die besten Rabatte kommen. Mit Rewards kombinieren.'
  },
  'blogs/blog-macys-2.html': {
    title: 'Beste Macy’s-Angebote fürs Zuhause',
    excerpt: 'Ehrlicher Kaufratgeber: informiert entscheiden und sparen.'
  },
  'blogs/blog-walmart-2.html': {
    title: 'Beste Walmart-Deals',
    excerpt: 'Ehrlicher Kaufratgeber: informiert entscheiden und sparen.'
  },
  'blogs/blog-ebay-2.html': {
    title: 'eBay vs. Amazon',
    excerpt: 'Ehrlicher Kaufratgeber: informiert entscheiden und sparen.'
  },
  'blogs/blog-ebay-1.html': {
    title: 'Gebrauchte Elektronik kaufen',
    excerpt: 'Ehrlicher Kaufratgeber: informiert entscheiden und sparen.'
  },
  'blogs/blog-homedepot-1.html': {
    title: 'DIY-Werkzeuge: was Sie brauchen',
    excerpt: 'Ehrlicher Kaufratgeber: informiert entscheiden und sparen.'
  },
  'blogs/blog-homedepot-2.html': {
    title: 'Heimwerken mit kleinem Budget',
    excerpt: 'Ehrlicher Kaufratgeber: informiert entscheiden und sparen.'
  },
  'blogs/blog-kohls-1.html': {
    title: 'Kohl’s Cash Strategie',
    excerpt: 'Ehrlicher Kaufratgeber: informiert entscheiden und sparen.'
  },
  'blogs/blog-target-2.html': {
    title: 'Beste Target-Home-Funde',
    excerpt: 'Ehrlicher Kaufratgeber: informiert entscheiden und sparen.'
  },
  'blogs/blog-kohls-2.html': {
    title: 'Ratgeber Store-Kreditkarten',
    excerpt: 'Ehrlicher Kaufratgeber: informiert entscheiden und sparen.'
  }
};

writeHome('es', ES);
writeHome('fr', FR);
writeHome('de', DE);
