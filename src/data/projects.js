import sweatArtwork from '../assets/Mesprojets/sweatmmi/Back pull BLANC noir.png'
import hieroArtwork from '../assets/Mesprojets/flyerhiero/Mockup_3flyer.png'
import pressArtwork from '../assets/Mesprojets/Dossier de presse/Brochure_Mockup.jpg'
import partyArtwork from '../assets/Mesprojets/MMI party/efefe6_699eb05c21e2401a90d566f4a17c3a61~mv2.avif'
import streamingArtwork from '../assets/Mesprojets/Site de streaming/PC.png'
import stopMotionArtwork from '../assets/Mesprojets/Stop motion/efefe6_fcff8a638a42427599a9b13adf19636b~mv2.avif'
import bloodfizzArtwork from '../assets/Mesprojets/UGC miam Bloodfizz/efefe6_7fdc875ef5cb49dba39b843e301fd00e~mv2.avif'
import chocoloveArtwork from '../assets/Mesprojets/UGC miam chocolove/efefe6_bf7928a6901b4ea9908b3d23a2771040~mv2.avif'
import motionDesignArtwork from '../assets/Mesprojets/Motion design/Capture d\'écran 2026-10-17 235711.png'
import mascotteArtwork from '../assets/Mesprojets/Mascotteinsecte/Mockup_storefront.png'
import logostarbucksArtwork from '../assets/Mesprojets/RéinterprétationlogoStarbucks/Coffee Cup Mockup Stone Table.png'
import adoptArtwork from '../assets/Mesprojets/Adopt/adopt-couverture.png'
import porcelaineArtwork from '../assets/Mesprojets/Illustration porcelaine/flyer-A6.jpg'
import beerPongArtwork from '../assets/Mesprojets/Campagecom_beer_pong/Stand Mockup.jpg'
import overwatchArtwork from '../assets/Mesprojets/Overwatch_market/websitemaquette/maquette-01-accueil.jpg'

export const projectCategories = [
  'Identité & édition',
  'Développement web',
  'Direction artistique',
]

// Type de projet : 'academique' | 'personnel' | 'stage'
/* Année de BUT (projets académiques uniquement)
   Dans chaque projet ci-dessous, la ligne  but: 'BUT2',  indique l'année où il a été fait.
   Valeurs possibles : 'BUT1', 'BUT2' ou 'BUT3'.
   Elle s'affiche dans l'étiquette du projet : « Académique · BUT2 ».
   Supprime la ligne pour ne rien afficher. */
export const butYears = ['BUT1', 'BUT2', 'BUT3']

export const projectTypes = {
  academique: 'Académique',
  personnel: 'Personnel',
  stage: 'Stage',
}

export const projects = [
  {
    title: 'Sweat MMI',
    type: 'personnel',
    category: 'Identité & édition',
    year: 2026,
    date: '2026-06-12',
    description: 'Concours de design du sweat du département MMI remporté.',
    alt: 'Visuel du sweat MMI blanc, présenté de dos sur fond noir.',
    image: sweatArtwork,
  },
  {
    title: 'Flyer HIERO',
    type: 'academique',
    but: 'BUT3', // année de BUT : 'BUT1', 'BUT2' ou 'BUT3'
    category: 'Direction artistique',
    year: 2026,
    date: '2026-04-18',
    description: 'Concevoir des Flyer pour promouvoir des concerts.',
    alt: 'Flyer pour promouvoir des concerts.',
    image: hieroArtwork,
  },
  {
    title: 'Dossier de presse',
    type: 'academique',
    but: 'BUT2', // année de BUT : 'BUT1', 'BUT2' ou 'BUT3'
    category: 'Identité & édition',
    year: 2025,
    date: '2025-11-20',
    description: 'Concevoir un dossier de presse pour un festival.',
    alt: 'Composition graphique colorée réalisée pour un dossier de presse.',
    image: pressArtwork,
  },
  {
    title: 'MMI Party',
    type: 'academique',
    but: 'BUT2', // année de BUT : 'BUT1', 'BUT2' ou 'BUT3'
    category: 'Développement web',
    year: 2026,
    date: '2026-10-03',
    description: 'Développer un jeu à l\'IUT en 24h.',
    alt: 'Visuel de communication pour la soirée étudiante MMI Party.',
    image: partyArtwork,
  },
  {
    title: 'Stop motion',
    type: 'academique',
    but: 'BUT1', // année de BUT : 'BUT1', 'BUT2' ou 'BUT3'
    category: 'Direction artistique',
    year: 2025,
    date: '2025-06-09',
    description: 'Publicité alimentaire pour Waitrose.',
    alt: 'Image extraite du projet d’animation en stop motion.',
    image: stopMotionArtwork,
  },
  {
    title: 'UGC miam Bloodfizz',
    type: 'academique',
    but: 'BUT1', // année de BUT : 'BUT1', 'BUT2' ou 'BUT3'
    category: 'Direction artistique',
    year: 2025,
    date: '2025-04-25',
    description: 'Concevoir le packaging d\'une boisson pour UGC.',
    alt: 'Visuel de contenu créatif réalisé pour la marque Bloodfizz.',
    image: bloodfizzArtwork,
  },
  {
    title: 'UGC miam chocolove',
    type: 'academique',
    but: 'BUT1', // année de BUT : 'BUT1', 'BUT2' ou 'BUT3'
    category: 'Direction artistique',
    year: 2025,
    date: '2025-02-11',
    description: 'Concevoir le packaging de chocolat pour UGC.',
    alt: 'Visuel de contenu créatif réalisé pour la marque Chocolove.',
    image: chocoloveArtwork,
  },
  {
    title: 'Site de streaming',
    type: 'academique',
    but: 'BUT1', // année de BUT : 'BUT1', 'BUT2' ou 'BUT3'
    category: 'Développement web',
    year: 2025,
    date: '2025-09-04',
    description: 'Développer un site de streaming.',
    alt: 'Écran de conception du projet de site de streaming.',
    image: streamingArtwork,
  },
  {
    title: 'Motion design',
    type: 'academique',
    but: 'BUT2', // année de BUT : 'BUT1', 'BUT2' ou 'BUT3'
    category: 'Direction artistique',
    year: 2025,
    date: '2025-09-04',
    description: 'Créer une animation motion design.',
    alt: 'Écran de conception du projet de motion design.',
    image: motionDesignArtwork,
  },
    {
    title: 'Mascotte fast-food',
    type: 'academique',
    but: 'BUT3', // année de BUT : 'BUT1', 'BUT2' ou 'BUT3'
    category: 'Direction artistique',
    year: 2026,
    date: '2025-10-10',
    description: 'Créer la mascotte pour un restaurant de fast-food.',
    alt: 'Écran de conception du projet de mascotte fast-food.',
    image: mascotteArtwork,
  },
  {
    title: 'Réinterprétation du logo Starbucks',
    type: 'academique',
    but: 'BUT3', // année de BUT : 'BUT1', 'BUT2' ou 'BUT3'
    category: 'Direction artistique',
    year: 2026,
    date: '2026-10-15',
    description: 'Réinterpréter le logo de Starbucks en Low poly.',
    alt: 'Mockup du nouveau logo de Starbucks.',
    image: logostarbucksArtwork,
  },
  {
    title: 'Adopt',
    type: 'academique',
    but: 'BUT2', // année de BUT : 'BUT1', 'BUT2' ou 'BUT3'
    category: 'Développement web',
    year: 2025,
    date: '2025-12-01',
    description: 'Concevoir un système de Click & Collect pour un site e-commerce.',
    alt: 'Logo Adopt Parfums Français sur une rangée de flacons de parfum.',
    image: adoptArtwork,
  },
  {
    title: 'Illustrations porcelaine',
    type: 'academique',
    but: 'BUT3', // année de BUT : 'BUT1', 'BUT2' ou 'BUT3'
    category: 'Direction artistique',
    year: 2026,
    date: '2026-09-25',
    description: 'Créer un univers illustré pour valoriser les métiers de la porcelaine.',
    alt: 'Flyer « Parcours des métiers de la céramique » avec une céramiste illustrée.',
    image: porcelaineArtwork,
  },
  {
    title: 'Campagne Beer Pong',
    type: 'academique',
    but: 'BUT2', // année de BUT : 'BUT1', 'BUT2' ou 'BUT3'
    category: 'Direction artistique',
    year: 2026,
    date: '2026-03-15',
    description: 'Créer la campagne de communication d’un tournoi international de Beer Pong.',
    alt: 'Deux affiches du championnat international de Beer Pong sur des panneaux dans la rue.',
    image: beerPongArtwork,
  },
  {
    title: 'Overwatch Market',
    type: 'academique',
    but: 'BUT2', // année de BUT : 'BUT1', 'BUT2' ou 'BUT3'
    category: 'Développement web',
    year: 2026,
    date: '2026-04-10',
    description: 'Créer une boutique en ligne d’objets tirés du jeu Overwatch.',
    alt: 'Maquette de la page d’accueil de la boutique Overwatch.',
    image: overwatchArtwork,
  },
]

/* ---------- Liens vers les pages détail ---------- */

// 'Réinterprétation du logo Starbucks' -> 'reinterpretation-du-logo-starbucks'
export function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function projectPath(project) {
  return `${import.meta.env.BASE_URL}projets/${slugify(project.title)}`
}