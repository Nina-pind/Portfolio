import { projects, slugify } from './projects.js'

/* =====================================================================
   CONTENU DES PAGES PROJET

   Une seule page (ProjectPage.jsx) sert tous les projets. Pour en
   personnaliser un, remplis son bloc ci-dessous. Tout est facultatif :
   ce qui est vide n'apparaît pas sur la page.

   '<slug>': {
     folder:    nom du dossier dans src/assets/Mesprojets (galerie automatique)
     accent:    'lavender' | 'peach' | 'pink' | 'periwinkle' (couleur de la page)
     tagline:   phrase courte sous le titre
     intro:     paragraphe à côté du visuel (sinon : la description de la carte)
     meta:      [{ label: 'Outils', value: 'Figma, Illustrator' }, ...]

     sections:  textes juste SOUS le visuel. Chaque bloc = un titre + un ou plusieurs paragraphes.
                Pour en ajouter un, copie un bloc { ... } et colle-le à la suite.
                [{
                  label: 'Présentation',            // nom dans le sommaire
                  title: 'Une phrase accroche.',    // grand titre (sinon : label)
                  text: 'Un paragraphe',            // ou ['Paragraphe 1', 'Paragraphe 2']
                  stats: [{ value: '128', label: 'pages' }],              // facultatif
                  quote: { text: 'Une phrase.', author: 'Nom · Rôle' },    // facultatif
                }, ...]

     imageTexts: texte à CÔTÉ d'une image de la galerie (l'image passe en grand,
                 le texte à côté, et la mise en page alterne gauche / droite).
                 La clé est le nom du fichier dans le dossier du projet :
                 {
                   'Mockup_3flyer.png': { title: 'Un titre', text: 'Un paragraphe' },
                   'Affiche.jpg':       { title: 'Un autre titre', text: ['Paragraphe 1', 'Paragraphe 2'] },
                 }
                 (en mode développement, la console du navigateur affiche les noms
                 des fichiers de chaque projet)

     captions:  ['Légende image 1', 'Légende image 2', ...]  // dans l'ordre d'affichage
     exclude:   ['fichier-a-ne-pas-afficher.jpg']             // fichiers du dossier à ignorer
     dossier:   {                                      // section « Dossier de conception » en bas
                  title: 'Le dossier de conception.',
                  text: 'Un paragraphe',
                  image: 'apercu.png',                     // image du dossier du projet (sinon : visuel principal)
                  pdf: 'Dossier.pdf',                      // PDF déposé dans le dossier du projet
                  details: 'PDF · 16 pages',               // petite ligne d'info (facultatif)
                }
     galleryAfter: 2  // la galerie s'affiche après la section n° 3 (0 = après la première)
     order:     ['image-a.jpg', 'image-b.png']  // ordre de la galerie (sinon : alphabétique)
   }

   Le slug est le titre du projet sans accents ni majuscules, avec des tirets :
   'Réinterprétation du logo Starbucks' -> 'reinterpretation-du-logo-starbucks'
   ===================================================================== */

const details = {

  'sweat-mmi': {
    folder: 'sweatmmi',
    accent: 'lavender',
    intro: 'Le département MMI a organisé un concours pour créer le logo de son sweat.',
    meta: [{ label: 'Outils', value: 'Illustrator, Photoshop' }],

    // ↓ Titre + paragraphe(s) SOUS le visuel principal
    sections: [
      {
        label: 'Présentation',
        title: 'Un logo pour tout le département.',
        text: [
          'Pour ce projet, j’ai réalisé le logo destiné au sweat de mon département MMI. Mon objectif était de créer un visuel qui puisse plaire au plus grand nombre, avec une identité moderne et un style inspiré du streetwear.',
          'Ma proposition a remporté le concours.',
        ],
      },
      {
        label: 'Démarche',
        title: 'Des codes du streetwear au logo.',
        text: 'J’ai commencé par une phase de recherche d’inspiration sur Pinterest et les réseaux sociaux, afin d’analyser les tendances graphiques et les codes visuels propres à ce style. Une fois mes idées définies, j’ai développé le design sur Adobe Illustrator, en travaillant sur la forme, la typographie et l’équilibre du logo.',
      },
    ],
    galleryAfter: 1, // la galerie s'affiche après « Démarche »

    // Doublons du visuel principal à ne pas afficher deux fois
    exclude: ['Front pull BLANC noir.png', 'final/BLANC/Back pull BLANC noir.png'],

    // ↓ Ordre de la galerie (déplace une ligne pour déplacer l'image)
    order: [
      'final/BLANC/Front pull BLANC noir.png',
      'final/NOIR/Front pull NOIR blanc.png',
      'final/NOIR/Back pull NOIR blanc.png',
      'final/BLEU/Front pull BLEU blanc.png',
      'final/BLEU/Back pull BLEU blanc.png',
      'final/ROSE/Front pull ROSE blanc.png',
      'final/ROSE/Back pull ROSE blanc.png',
    ],

    // ↓ Légendes, dans le même ordre (la 1re = visuel principal)
    captions: [
      'Sweat blanc · dos',
      'Sweat blanc · face',
      'Sweat noir · face',
      'Sweat noir · dos',
      'Sweat bleu · face',
      'Sweat bleu · dos',
      'Sweat rose · face',
      'Sweat rose · dos',
    ],

    // ↓ Texte À CÔTÉ d'une image (vide = image seule)
    imageTexts: {
      'final/BLANC/Front pull BLANC noir.png': {
        title: 'Les mockups',
        text: 'J’ai réalisé des mockups sur Photoshop afin de visualiser le rendu final sur un pull et de mieux projeter l’aspect réel du design.',
      },
      'final/NOIR/Front pull NOIR blanc.png': {
        title: 'Quatre coloris',
        text: 'Le logo a été décliné sur quatre couleurs de sweat : blanc, noir, bleu et rose, avec un marquage noir ou blanc selon le fond.',
      },
    },

    // ↓ Section du bas : la planche des coloris
    dossier: {
      eyebrow: 'Planche des coloris',
      label: 'Coloris',
      title: 'Tous les coloris.',
      text: 'Les quatre versions du sweat, de face et de dos, réunies dans une seule planche.',
      image: 'final/ROSE/Front pull ROSE blanc.png',
      pdf: 'final/PDF coloris.pdf',
      details: 'PDF',
    },
  },
  'flyer-hiero': {
    folder: 'flyerhiero',
    accent: 'pink',
    meta: [{ label: 'Outils', value: 'Photoshop, tablette graphique' }],

    // ↓ Titre + paragraphe(s) SOUS le visuel principal
    sections: [
      {
        label: 'Présentation',
        title: 'Trois flyers, trois univers.',
        text: [
          'Pour ce projet, j’ai conçu une série de trois flyers recto verso pour annoncer des concerts. Chaque flyer repose sur une illustration originale, réalisée à la tablette graphique dans Photoshop.',
          'J’ai d’abord analysé les supports existants (flyers trimestriels, affiches, posts pour les réseaux sociaux, site web) pour comprendre ce qui fait leur identité.',
        ],
      },
      {
        label: 'Démarche',
        title: 'Une image décalée, tout de suite lisible.',
        text: [
          'L’analyse a fait ressortir cinq principes : un personnage central immédiatement identifiable, une situation décalée, une référence à la culture populaire, une illustration hybride et un fort impact graphique.',
          'J’ai suivi la même méthode pour chaque flyer : la photographie sert de base, puis elle est transformée par le dessin, les aplats de couleur et les textures. Des contours marqués, une palette limitée, du grain et une composition très lisible permettent au flyer de se démarquer.',
        ],
      },
    ],
    galleryAfter: 1, // la galerie s'affiche après « Démarche »

    // ↓ Section « Dossier de conception » tout en bas de la page
    dossier: {
      title: 'Le dossier de conception.',
      text: 'Toute la démarche en détail : l’analyse des flyers existants, les recherches d’illustration, les pistes graphiques et les rendus finaux des trois flyers.',
      image: 'danseuse.jpg', // image du dossier du projet affichée en aperçu
      pdf: 'PinardelNina-Dossier_de_conception.pdf', // PDF déposé dans le dossier du projet
      details: 'PDF · 16 pages',
    },

    // ↓ Ordre de la galerie : danseuse, puis b-boy, puis zombie
    order: [
      
      'danseuse avant.png',
      'danseuse.jpg',
      'danseuse_arriere.jpg',
      'danseuse_recto-verson.png',
      ,
      'b-boy.jpg',
      'b-boy_arriere.jpg',
      'b-boy_recto-verson.png',
      'zombie_arriere.jpg',
      'zombie_recto-verson.png',
      'zombie.jpg',
    ],

    // ↓ Légendes, dans le même ordre (la 1re = visuel principal)
    captions: [
      'Les trois flyers',
      'Danseuse · recto',
      'Danseuse · illustration',
      'Danseuse · verso',
      'Danseuse · recto verso',
      'B-boy · illustration',
      'B-boy · verso',
      'B-boy · recto verso',
      'Zombie · verso',
      'Zombie · recto verso',
      'Zombie · illustration',
    ],

    // ↓ Texte À CÔTÉ de chaque image de la galerie (laisse vide = image seule)
    //   Le texte de chaque flyer est sur sa première image.
    imageTexts: {
      'danseuse avant.png': {
        title: 'La danseuse',
        text: [
          'J’ai voulu m’éloigner de la représentation habituelle du ballet : la tête occupe le premier plan et le corps semble se prolonger vers le bas de l’image.',
          'Le personnage fait aussi référence à Mia Wallace (carré noir, lèvres rouges, cigarette), mais de façon subtile. Pendant les essais, j’ai corrigé la pose pour qu’elle donne un sens de lecture, avec la jambe comme ligne directrice.',
        ],
      },
      'danseuse_arriere.jpg': { title: '', text: '' },
      'danseuse_recto-verson.png': { title: '', text: '' },
      'danseuse.jpg': { title: '', text: '' },

      'b-boy_arriere.jpg': {
        title: 'Le b-boy et le vase',
        text: [
          'L’idée de ce flyer est d’associer deux univers très éloignés : l’énergie du breakdance et la fragilité de la porcelaine de Limoges.',
          'J’ai choisi une pose en mouvement qui crée une forte diagonale dans l’image, avec un jeu d’équilibre entre le danseur et le vase.',
        ],
      },
      'b-boy.jpg': { title: '', text: '' },
      'b-boy_recto-verson.png': { title: '', text: '' },

      'zombie_arriere.jpg': {
        title: 'Le zombie',
        text: [
          'Ce flyer s’inspire des zombies du cinéma et des jeux vidéo, et de Gorillaz, le groupe britannique formé de quatre personnages de fiction animés.',
          'Le zombie a une posture typique. Son casque militaire évoque la guerre et les soldats morts au combat, ce qui fait le lien avec les morts-vivants.',
        ],
      },
      'zombie_recto-verson.png': { title: '', text: '' },
      'zombie.jpg': { title: '', text: '' },
    },
  },

  'dossier-de-presse': {
    folder: 'Dossier de presse',
    accent: 'peach',
    tagline: 'EXIL BREAK, un festival dédié à la scène rap underground.',
    meta: [
      { label: 'Format', value: 'En binôme' },
      { label: 'Support', value: 'Dossier de presse de 20 pages' },
    ],

    // ↓ Titre + paragraphe(s) SOUS le visuel principal
    sections: [
      {
        label: 'Présentation',
        title: 'Un festival underground.',
        text: [
          'Le but de ce projet était de concevoir, en groupe de deux, le dossier de presse d’un festival. Nous avons choisi de créer un festival underground : EXIL BREAK.',
          'EXIL BREAK est dédié à la scène rap underground. Il est imaginé pour faire découvrir au grand public une génération d’artistes émergents aux univers bruts et singuliers, pendant trois jours au 6MIC, à Aix-en-Provence.',
        ],
      },
      {
        label: 'Démarche',
        title: 'Tout ce dont la presse a besoin.',
        text: [
          'Le dossier présente le festival et son édito, les ateliers (écriture rap, beatmaking, freestyle, graffiti…), puis la programmation jour par jour.',
          'Il réunit aussi toutes les informations pratiques : billetterie, restauration, accès, engagements du festival, partenaires et contact presse.',
        ],
      },
    ],
    galleryAfter: 1, // la galerie s'affiche après « Démarche »

    // ↓ Légendes, dans le même ordre (la 1re = visuel principal)
    captions: ['Mockup du dossier de presse', 'Dossier de presse'],

    // ↓ Texte À CÔTÉ d'une image (vide = image seule)
    imageTexts: {
      'dossierdepresse.avif': { title: '', text: '' },
    },

    // ↓ Section du bas : le dossier de presse en PDF
    dossier: {
      eyebrow: 'Dossier de presse',
      title: 'Le dossier complet.',
      text: 'Les 20 pages du dossier de presse d’EXIL BRK : présentation, édito, ateliers, programmation, billetterie, infos pratiques et contact presse.',
      image: 'dossierdepresse.avif',
      pdf: 'DP_TRELAT_PINARDEL.pdf',
      details: 'PDF · 20 pages',
    },
  },

  'mmi-party': {
    folder: 'MMI party',
    accent: 'periwinkle',
    tagline: 'Un jeu créé en 24h, classé premier par les professeurs.',
    intro: 'Pour la Nuit MMI, nous avions 24h à l’IUT pour créer un jeu en équipe. Notre jeu, MMI Party, a remporté la première place.',
    meta: [
      { label: 'Rôle', value: 'Directrice artistique' },
      { label: 'Équipe', value: '5 personnes' },
    ],

    // ↓ Titre + paragraphe(s) SOUS le visuel principal
    sections: [
      {
        label: 'La Nuit MMI',
        title: '24h pour créer un jeu.',
        text: [
          'Le principe de la Nuit MMI : rester 24h à l’IUT pour créer un jeu avec son groupe dans le temps imparti. À la fin des 24h, les professeurs établissent le classement des meilleurs jeux.',
          'Avec mon équipe, nous avons terminé premiers : nous avons remporté la Nuit MMI, avec des goodies et un trophée à la clé.',
        ],
      },
      {
        label: 'Le jeu',
        title: 'Ton corps est la manette.',
        text: [
          'MMI Party est une collection d’exergames : des mini-jeux rapides où l’on joue avec son corps. Grâce au suivi des mouvements, il faut esquiver, viser, réagir et bouger pour marquer un maximum de points.',
          'On peut enchaîner les mini-jeux à la suite. À la fin, le score total s’affiche : il ne reste plus qu’à battre les autres joueurs et grimper dans le classement.',
        ],
      },
    ],
    galleryAfter: 1, // la galerie s'affiche après « Le jeu »

    // ↓ Ordre de la galerie (déplace une ligne pour déplacer l'image)
    order: [
      'site-02-objectif.jpg',
      'site-03-mini-jeux.jpg',
      'site-04-tapis-v2.jpg',
      'site-05-equipe.jpg',
      'efefe6_7ca7142b9b0f4c419707ad2e0bd6a2b7~mv2.avif',
      'efefe6_1187f44282304ef79b10fc74528f17b1~mv2.avif',
    ],

    // ↓ Légendes, dans le même ordre (la 1re = visuel principal)
    captions: [
      'MMI Party',
      'Le site · objectif du jeu',
      'Le site · les mini-jeux',
      'Le site · la V2',
      'Le site · l’équipe',
    ],

    // ↓ Texte À CÔTÉ d'une image (vide = image seule)
    imageTexts: {
      'site-02-objectif.jpg': {
        title: 'Trois mini-jeux',
        text: [
          'Cowboy Duel : un duel de western contre une IA, où il faut dégainer plus vite que l’adversaire au signal.',
          'Plumber Puzzle : connecter les tuyaux avant la fin du temps. Color Lines : un jeu de rythme où il faut suivre les lignes de couleur au bon moment.',
        ],
      },
      'site-03-mini-jeux.jpg': { title: '', text: '' },
      'site-04-tapis-v2.jpg': {
        title: 'Et après : un tapis de jeu',
        text: 'Pour une V2, nous avons imaginé un tapis de sol avec quatre zones de couleur : on joue à Color Lines avec les pieds, en marchant sur la bonne forme au bon moment.',
      },
      'site-05-equipe.jpg': {
        title: 'Une équipe de cinq',
        text: 'Nous étions cinq : deux développeurs, un graphiste, un game designer et développeur web, et moi à la direction artistique.',
      },
      'efefe6_7ca7142b9b0f4c419707ad2e0bd6a2b7~mv2.avif': { title: '', text: '' },
      'efefe6_1187f44282304ef79b10fc74528f17b1~mv2.avif': { title: '', text: '' },
    },

    // ↓ Section du bas : lien vers le site du jeu (à la place d'un dossier de conception)
    dossier: {
      eyebrow: 'Le site du jeu',
      label: 'Le site',
      title: 'Jouer à MMI Party.',
      text: 'Le site du jeu présente les mini-jeux et l’équipe, et permet de lancer une partie.',
      image: 'site-01-accueil.jpg',
      link: 'https://nuit-mmi.vercel.app/',
      linkLabel: 'Découvrir le site',
    },
  },

  'stop-motion': {
    folder: 'Stop motion',
    accent: 'peach',
    tagline: 'Donner vie à des fruits pour donner envie d’en manger.',
    meta: [
      { label: 'Format', value: 'En équipe' },
      { label: 'Technique', value: 'Stop motion, montage vidéo' },
    ],

    // ↓ Titre + paragraphe(s) SOUS le visuel principal
    sections: [
      {
        label: 'Présentation',
        title: 'Des fruits comme personnages.',
        text: 'Ce projet a été réalisé en équipe, dans le cadre de ma formation. Notre mission était de créer une vidéo en stop motion sur le thème de l’alimentation, destinée à sensibiliser un jeune public à l’importance de manger des fruits et légumes.',
      },
      {
        label: 'Démarche',
        title: 'De l’idée au scénario.',
        text: [
          'J’ai commencé par une phase de conception créative pour trouver le meilleur moyen de raconter notre message. L’idée principale était de donner vie à des fruits (pommes, bananes…) pour qu’ils deviennent les personnages principaux de notre histoire.',
          'Une fois le scénario écrit, j’ai utilisé des fruits réels comme éléments de ma scène.',
        ],
      },
      {
        label: 'Bilan',
        title: 'Ce que j’en retiens.',
        text: 'Ce projet m’a permis de développer mes compétences en narration visuelle, en montage vidéo et en gestion de projet, tout en utilisant un format d’animation très précis et créatif.',
      },
    ],
    galleryAfter: 1, // la vidéo et la galerie s'affichent après « Démarche »

    // ↓ Vidéo (lien complet ou fichier du dossier du projet)
    video: {
      src: 'https://video.wixstatic.com/video/efefe6_9f61ee5e57e647c8a6e9188d9ead42d8/1080p/mp4/file.mp4',
      poster: 'efefe6_fcff8a638a42427599a9b13adf19636b~mv2.avif',
    },

    // ↓ Ordre de la galerie (déplace une ligne pour déplacer l'image)
    order: [
      'efefe6_150b845f9126465eb0b7ff067a0e55df~mv2.avif',
      'efefe6_3d23cbee5fcd4fc2afadff6524a7cfba~mv2.avif',
      'efefe6_45ba55468c9741748178ac4b4d1eaf9e~mv2.avif',
      'efefe6_6a1b2390dc674ed6aea6667488ea5f7e~mv2.avif',
      'efefe6_860ede5c07954a6ebbe0f4038bd982d4~mv2.avif',
      'efefe6_9d5af462dda147508b3ceb60bf64889a~mv2.avif',
      'efefe6_a22fd1cde56a43e5ab4fa114142e1f23~mv2.avif',
      'efefe6_f51463124cf84188bdef3c00f7c72c4f~mv2.avif',
    ],

    // ↓ Légendes, dans le même ordre (la 1re = visuel principal ; vide = « Visuel 01 »…)
    captions: [],

    // ↓ Texte À CÔTÉ d'une image (vide = image seule)
    imageTexts: {
      'efefe6_150b845f9126465eb0b7ff067a0e55df~mv2.avif': {
        title: 'La production',
        text: [
          'J’ai pris les photos nécessaires à la technique du stop motion, en déplaçant très légèrement les fruits entre chaque cliché pour créer l’illusion du mouvement. Ce travail demandait beaucoup de patience et de précision.',
          'J’ai ensuite géré le montage de la vidéo pour donner le rythme au clip et insérer la bande sonore en anglais.',
        ],
      },
      'efefe6_3d23cbee5fcd4fc2afadff6524a7cfba~mv2.avif': { title: '', text: '' },
      'efefe6_45ba55468c9741748178ac4b4d1eaf9e~mv2.avif': { title: '', text: '' },
      'efefe6_6a1b2390dc674ed6aea6667488ea5f7e~mv2.avif': { title: '', text: '' },
      'efefe6_860ede5c07954a6ebbe0f4038bd982d4~mv2.avif': { title: '', text: '' },
      'efefe6_9d5af462dda147508b3ceb60bf64889a~mv2.avif': { title: '', text: '' },
      'efefe6_a22fd1cde56a43e5ab4fa114142e1f23~mv2.avif': { title: '', text: '' },
      'efefe6_f51463124cf84188bdef3c00f7c72c4f~mv2.avif': { title: '', text: '' },
    },
    // (pas de dossier de conception pour ce projet)
  },

  'ugc-miam-bloodfizz': {
    folder: 'UGC miam Bloodfizz',
    accent: 'pink',
    tagline: 'Un soda cerise-piment aux codes de l’horreur.',
    meta: [{ label: 'Outils', value: 'Illustrator' }],

    // ↓ Titre + paragraphe(s) SOUS le visuel principal
    sections: [
      {
        label: 'Présentation',
        title: 'Une boisson qui fait frissonner.',
        text: 'Dans le cadre de ma gamme de produits pour UGC Miam, j’ai créé la boisson gazeuse « Bloodfizz », en choisissant le thème de l’horreur pour un contraste marqué avec les chocolats. L’idée était de concevoir un produit audacieux et impactant.',
      },
      {
        label: 'Démarche',
        title: 'Les codes de l’horreur.',
        text: 'Ma démarche a consisté à créer un visuel qui utilise les codes de l’horreur pour attirer l’attention. J’ai choisi une base noir mat pour le corps de la canette, offrant un fond sombre pour faire ressortir les éléments graphiques.',
      },
    ],
    galleryAfter: 1, // la galerie s'affiche après « Démarche »

    // ↓ Ordre de la galerie (déplace une ligne pour déplacer l'image)
    order: ['packaging.png', 'SODA.png', 'efefe6_e2513267b7564f2cbe607827f530c521~mv2.avif'],

    // ↓ Légendes, dans le même ordre (la 1re = visuel principal)
    captions: ['Bloodfizz', 'Le packaging · face et dos', 'Mockup de la canette'],

    // ↓ Texte À CÔTÉ d'une image (vide = image seule)
    imageTexts: {
      'packaging.png': {
        title: 'Le design sur Illustrator',
        text: [
          'J’ai intégré des coulures rouges au sommet de la canette, qui rappellent le sang, ainsi que des illustrations de piments et de cerises pour donner un indice sur le goût, piquant et fruité, tout en collant au thème.',
          'L’élément central est un squelette stylisé, dessiné en blanc pour créer un contraste maximal et renforcer l’ambiance lugubre et décalée. Le nom du produit, « Bloodfizz », est placé pour être visible et mémorable.',
        ],
      },
      'SODA.png': {
        title: 'Le mockup',
        text: 'Pour finir, j’ai créé un mockup 3D de la canette en suspension. Cette mise en scène permet d’imaginer une campagne de publicité dynamique, qui jouerait sur l’aspect sombre, piquant et fun de la boisson.',
      },
      'efefe6_e2513267b7564f2cbe607827f530c521~mv2.avif': { title: '', text: '' },
    },
    // (pas de dossier de conception pour ce projet)
  },

  'ugc-miam-chocolove': {
    folder: 'UGC miam chocolove',
    accent: 'peach',
    tagline: 'Des cœurs au chocolat pour une gamme placée sous le signe de l’amour.',
    meta: [{ label: 'Outils', value: 'Illustrator' }],

    // ↓ Titre + paragraphe(s) SOUS le visuel principal
    sections: [
      {
        label: 'Présentation',
        title: 'Le chocolat, version amour.',
        text: 'Pour ce projet de packaging pour UGC Miam, j’ai choisi de créer une gamme de chocolats, les « Chocolove », en associant l’univers de la marque au thème de l’amour. L’objectif était de proposer un visuel doux et attrayant.',
      },
      {
        label: 'Démarche',
        title: 'Romantique et gourmand.',
        text: 'J’ai commencé par définir une identité visuelle romantique et gourmande. J’ai opté pour une couleur de base rose vif et des cœurs de chocolat dispersés sur le sachet.',
      },
    ],
    galleryAfter: 1, // la galerie s'affiche après « Démarche »

    // ↓ Ordre de la galerie (déplace une ligne pour déplacer l'image)
    order: ['packaging- 5.png', 'CHOCO.png', 'efefe6_a1be99a486314b9c9576b8a32fdad1b9~mv2.avif'],

    // ↓ Légendes, dans le même ordre (la 1re = visuel principal)
    captions: ['Chocolove', 'Le packaging · face et dos', 'Mockup du sachet'],

    // ↓ Texte À CÔTÉ d'une image (vide = image seule)
    imageTexts: {
      'packaging- 5.png': {
        title: 'Le design sur Illustrator',
        text: [
          'J’ai conçu l’intégralité du packaging sur Adobe Illustrator. Du chocolat fondu coule depuis le haut du sachet, ce qui renforce l’aspect gourmand du produit.',
          'L’illustration d’un Cupidon blanc apporte une touche classique et féerique au thème de l’amour, en contraste avec le rose. La typographie UGC reste claire et centrale pour une bonne lisibilité en rayon.',
        ],
      },
      'CHOCO.png': {
        title: 'Le mockup',
        text: 'Enfin, j’ai réalisé un mockup du sachet avec un éclairage ciblé, pour mettre en avant le produit et imaginer l’impact d’une future campagne publicitaire centrée sur la douceur et la séduction.',
      },
      'efefe6_a1be99a486314b9c9576b8a32fdad1b9~mv2.avif': { title: '', text: '' },
    },
    // (pas de dossier de conception pour ce projet)
  },

  'site-de-streaming': {
    folder: 'Site de streaming',
    accent: 'periwinkle',
    tagline: 'Un site de streaming.',
    meta: [{ label: 'Langages', value: 'PHP, MySQL, HTML, CSS' }],

    // ↓ Titre + paragraphe(s) SOUS le visuel principal
    sections: [
      {
        label: 'Présentation',
        title: 'Développer un site de streaming.',
        text: 'Le but de ce projet était de développer un site de streaming avec PHP, MySQL, HTML et CSS, étape par étape, en respectant des user stories.',
      },
      {
        label: 'Démarche',
        title: 'Reproduire un site existant.',
        text: 'Chaque étape ajoutait une fonctionnalité décrite par une user story. À la fin, un site de streaming existant nous a été attribué, et nous devions essayer de le reproduire.',
      },
    ],
    galleryAfter: 1, // la galerie s'affiche après « Démarche »

    // ↓ Ordre de la galerie (déplace une ligne pour déplacer l'image)
    order: [
      'efefe6_2f33f8b6cc104bc69c48ad7b99f0bcd4~mv2.avif',
      'efefe6_61c0b72baae5413b988fc17ee5747f77~mv2.avif',
      'efefe6_7e4c48aefdca448bba9b4a4a0f7888d1~mv2.avif',
    ],

    // ↓ Légendes, dans le même ordre (la 1re = visuel principal ; vide = « Visuel 01 »…)
    captions: [],

    // ↓ Texte À CÔTÉ d'une image (vide = image seule)
    imageTexts: {
      'efefe6_2f33f8b6cc104bc69c48ad7b99f0bcd4~mv2.avif': { title: '', text: '' },
      'efefe6_61c0b72baae5413b988fc17ee5747f77~mv2.avif': { title: '', text: '' },
      'efefe6_7e4c48aefdca448bba9b4a4a0f7888d1~mv2.avif': { title: '', text: '' },
    },
    // (pas de dossier de conception pour ce projet)
  },

  'motion-design': {
    folder: 'Motion design',
    accent: 'lavender',
    tagline: 'Une affiche de voyage qui prend vie.',
    meta: [{ label: 'Sujet', value: 'Lieu touristique · Ibiza' }],

    // ↓ Titre + paragraphe(s) SOUS le visuel principal
    sections: [
      {
        label: 'Présentation',
        title: 'Ibiza, en mouvement.',
        text: 'Pour ce projet de motion design, le thème était un lieu touristique. J’ai choisi Ibiza, aux îles Baléares, et je l’ai imaginé comme une affiche de voyage illustrée qui s’anime.',
      },
      {
        label: 'Démarche',
        title: 'De l’illustration à l’animation.',
        text: [
          'J’ai d’abord construit l’illustration en aplats de couleurs : le ciel en dégradé, le soleil, l’île, la mer, les voiliers et la végétation au premier plan.',
          'J’ai ensuite animé chaque élément séparément pour donner de la vie à la scène, tout en gardant une composition simple et lisible, comme une affiche.',
        ],
      },
    ],
    galleryAfter: 1,

    // ↓ Vidéo (lien complet ou fichier du dossier du projet)
    video: {
      src: 'https://video.wixstatic.com/video/efefe6_6fa047f3fef2442dbaad41ce971fedb0/1080p/mp4/file.mp4',
      poster: "Capture d'écran 2026-10-17 235711.png",
    },
    // (pas de section « Dossier de conception » pour ce projet)
  },
  adopt: {
    folder: 'Adopt',
    accent: 'pink',
    tagline: 'Réserver en ligne, récupérer en boutique.',
    intro:
      'Concevoir un système de Click & Collect pour une plateforme e-commerce existante : j’ai choisi Adopt, marque française de parfums et de cosmétiques.',
    meta: [{ label: 'Outils', value: 'Figma, WordPress' }],

    // ↓ Titre + paragraphe(s) SOUS le visuel principal
    sections: [
      {
        label: 'Présentation',
        title: 'Ajouter le Click & Collect à un site existant.',
        text: [
          'Pour ce projet académique, il fallait choisir une plateforme e-commerce existante et lui imaginer un système de Click & Collect : le client réserve ses produits en ligne, puis vient les récupérer en boutique.',
          'J’ai choisi Adopt, une marque française de parfums, de maquillage et de soins, dont l’univers coloré se prêtait bien à l’exercice.',
        ],
      },
      {
        label: 'Démarche',
        title: 'Des user stories au site en ligne.',
        text: [
          'J’ai d’abord rédigé les user stories, pour définir précisément ce dont le client a besoin à chaque étape : trouver un produit, choisir une variante, réserver et venir le chercher.',
          'J’ai ensuite conçu les maquettes sur Figma, de la page d’accueil jusqu’à la validation de la commande, avant de développer le site sur WordPress.',
        ],
      },
    ],
    galleryAfter: 1, // la galerie s'affiche après « Démarche »

    // ↓ Ordre de la galerie (déplace une ligne pour déplacer l'image)
    order: [
      "Capture d'écran 2026-11-04 231910.png",
      "Capture d'écran 2026-11-04 231934.png",
      "Capture d'écran 2026-11-04 231959.png",
      "Capture d'écran 2026-11-04 232023.png",
      "Capture d'écran 2026-11-04 232039.png",
      "Capture d'écran 2026-11-04 232144.png",
    ],

    // ↓ Légendes, dans le même ordre (la 1re = visuel principal)
    captions: [
      'Adopt · Parfums français',
      'Page d’accueil',
      'Catalogue',
      'Catégorie parfum',
      'Fiche produit · maquillage',
      'Fiche produit · soin visage',
      'Validation de la commande',
    ],

    // ↓ Texte À CÔTÉ d'une image (vide = image seule)
    imageTexts: {
      "Capture d'écran 2026-11-04 231910.png": {
        title: 'Le Click & Collect mis en avant',
        text: 'Dès la page d’accueil, une grande bannière présente le service : « Réservez en ligne, récupérez en boutique ». Juste en dessous, le catalogue se filtre par catégorie : parfum, maquillage ou visage.',
      },
      "Capture d'écran 2026-11-04 231934.png": { title: '', text: '' },
      "Capture d'écran 2026-11-04 231959.png": { title: '', text: '' },
      "Capture d'écran 2026-11-04 232023.png": {
        title: 'Des fiches produit claires',
        text: 'Chaque fiche affiche l’essentiel : l’avis client, le prix, les informations de livraison et le choix de la variante (couleur pour le maquillage, texture pour les soins), avant l’ajout au panier.',
      },
      "Capture d'écran 2026-11-04 232039.png": { title: '', text: '' },
      "Capture d'écran 2026-11-04 232144.png": {
        title: 'Une commande simple',
        text: 'Le formulaire de commande demande seulement les informations utiles et l’option de retrait, avec le récapitulatif du panier et du total juste en dessous.',
      },
    },

    // ↓ Section du bas : lien vers la maquette Figma
    dossier: {
      eyebrow: 'Maquette Figma',
      label: 'Figma',
      title: 'La maquette sur Figma.',
      text: 'Toutes les pages du site maquettées sur Figma, de l’accueil à la validation de la commande.',
      image: "Capture d'écran 2026-11-04 231910.png",
      link: 'https://www.figma.com/design/IUw4gjdRagf3vOcswzUoQ2/Sae-3.01-%7C-Pinardel-Nina?node-id=1-6&t=EtFmOelO7ngqHGHu-1',
      linkLabel: 'Voir la maquette',
    },
  },
  'illustrations-porcelaine': {
    folder: 'Illustration porcelaine',
    accent: 'periwinkle',
    tagline: 'Un univers illustré pour faire découvrir les métiers de la céramique.',
    meta: [
      { label: 'Cible', value: 'Touristes français et internationaux' },
      { label: 'Support', value: 'Illustrations, flyer A6' },
    ],

    // ↓ Titre + paragraphe(s) SOUS le visuel principal
    sections: [
      {
        label: 'Présentation',
        title: 'Une céramique vivante et accessible.',
        text: [
          'Pour le « Parcours des métiers de la céramique » de l’office de tourisme de Limoges, j’ai créé un univers illustré destiné à valoriser les métiers de la céramique contemporaine. Il devait pouvoir se décliner sur plusieurs supports : print, réseaux sociaux, motion design et supports touristiques.',
          'Le public visé : les touristes français et internationaux. Le ton recherché : inclusif, actuel, qualitatif et attractif, pour faire découvrir une céramique vivante et accessible à travers un langage illustré cohérent.',
        ],
      },
      {
        label: 'Démarche',
        title: 'De l’inspiration au langage graphique.',
        text: [
          'J’ai commencé par une recherche visuelle : formes simplifiées, couleurs contemporaines, personnages expressifs et compositions sans décor. Les travaux de Jean Jullien, d’Olimpia Zagnoli ou de Malika Favre m’ont aidée à simplifier les formes et à travailler la couleur.',
          'J’ai ensuite testé plusieurs styles sur un même personnage : avec texture, avec contour sur l’objet, en palette pastel ou en contour noir.',
        ],
      },
    ],
    galleryAfter: 1, // la galerie s'affiche après « Démarche »

    // ↓ Ordre de la galerie (déplace une ligne pour déplacer l'image)
    order: [
      'dossier-recherche-style.jpg',
      'dossier-identite.jpg',
      'metier-01.jpg',
      'metier-02.jpg',
      'metier-03.jpg',
      'metier-04.jpg',
      'metier-05.jpg',
      'metier-06.jpg',
      'metier-07.jpg',
      'dossier-declinaison.jpg',
    ],

    // ↓ Légendes, dans le même ordre (la 1re = visuel principal)
    captions: [
      'Flyer A6 · Parcours des métiers de la céramique',
      'Recherche du style',
      'Donner une identité à la porcelaine',
      'Métier 1 · version unie et texturée',
      'Métier 2 · version unie et texturée',
      'Métier 3 · version unie et texturée',
      'Métier 4 · version unie et texturée',
      'Métier 5 · version unie et texturée',
      'Métier 6 · version unie et texturée',
      'Métier 7 · version unie et texturée',
      'Déclinaison en série',
    ],

    // ↓ Texte À CÔTÉ d'une image (vide = image seule)
    imageTexts: {
      'dossier-recherche-style.jpg': { title: '', text: '' },
      'dossier-identite.jpg': {
        title: 'Faire entrer la porcelaine dans le dessin',
        text: [
          'Le premier style permettait d’identifier une activité, mais restait trop générique. J’ai donc fait entrer les codes de la porcelaine directement dans le langage graphique, et pas seulement dans les objets représentés.',
          'Un trait bleu fin rappelle les décors peints, comme le bleu de Limoges. Les dégradés évoquent les émaux et les changements de couleur à la cuisson, le grain rappelle le kaolin, et les formes pleines et galbées s’inspirent des pièces tournées ou moulées.',
        ],
      },
      'metier-01.jpg': {
        title: 'Le rouge comme repère',
        text: 'Le rouge attire l’œil vers l’activité représentée : il distingue l’élément travaillé ou l’outil utilisé, et permet de différencier les métiers tout en gardant la même identité graphique. Chaque personnage existe en deux versions, unie et texturée.',
      },
      'metier-02.jpg': { title: '', text: '' },
      'metier-03.jpg': { title: '', text: '' },
      'metier-04.jpg': { title: '', text: '' },
      'metier-05.jpg': { title: '', text: '' },
      'metier-06.jpg': { title: '', text: '' },
      'metier-07.jpg': { title: '', text: '' },
      'dossier-declinaison.jpg': {
        title: 'Une série homogène',
        text: 'Le principe graphique est décliné sur plusieurs personnages pour créer une série cohérente. Chaque illustration garde les mêmes règles de formes, de couleurs et de proportions, tout en montrant un métier différent. La série a ensuite été mise en situation sur un flyer A6.',
      },
    },

    // ↓ Section « Dossier de conception » en bas
    dossier: {
      title: 'Le dossier de conception.',
      text: 'Toutes les étapes de création : la recherche visuelle, les essais de style, l’identité inspirée de la porcelaine, la déclinaison en série et la mise en situation.',
      image: 'dossier-identite.jpg',
      pdf: 'PinardelNina-PRESENTATION_ETAPES_DE_CREATION.pdf',
      details: 'PDF · 15 pages',
    },
  },
  'campagne-beer-pong': {
    folder: 'Campagecom_beer_pong',
    accent: 'periwinkle',
    tagline: 'Faire d’un jeu de soirée un vrai championnat international.',
    intro:
      'En binôme, nous avons créé la campagne de communication d’un tournoi international de Beer Pong organisé à Košice, en Slovaquie.',
    meta: [
      { label: 'Format', value: 'En binôme' },
      { label: 'Événement', value: 'Championnat international · Košice' },
    ],

    // ↓ Titre + paragraphe(s) SOUS le visuel principal
    sections: [
      {
        label: 'Présentation',
        title: 'Un tournoi festif, mais officiel.',
        text: [
          'Le but de ce projet était de créer, par deux, la campagne de communication d’un événement. Le nôtre : un championnat international de Beer Pong à Košice, en Slovaquie, une ville étudiante et dynamique qui devient un point de rencontre entre les cultures européennes.',
          'L’objectif : transformer un jeu populaire et informel en véritable compétition internationale, sans perdre son esprit festif. Le championnat repose sur quatre valeurs : la convivialité, l’esprit de compétition, l’ouverture culturelle, l’énergie et la modernité.',
        ],
      },
      {
        label: 'Démarche',
        title: 'Entre tension et convivialité.',
        text: [
          'Notre question de départ : comment exprimer à la fois la convivialité du beer pong, l’intensité d’une compétition internationale et une dimension jeune et moderne ?',
          'L’identité repose sur un équilibre : des formes arrondies pour l’aspect social, une composition structurée pour la crédibilité sportive et des couleurs vives pour l’énergie. Nous nous sommes inspirés des codes des festivals, de l’e-sport et du graphisme contemporain, avec une palette bleu, rouge, rose et jaune, une typographie « bubble » pour les titres et une typographie neutre pour les informations.',
        ],
      },
    ],
    galleryAfter: 1, // la galerie s'affiche après « Démarche »

    // ↓ Ordre de la galerie (déplace une ligne pour déplacer l'image)
    order: [
      'Logo final.svg',
      'notice-elements-graphiques.jpg',
      'Poster Mockup.jpg',
      'Poster2 Mockup.jpg',
      'brochure/page1 mockup.jpg',
      'brochure/page2 mockup.jpg',
      'Free_Ticket_Mockup_4.jpg',
      'cup mockup.jpg',
      'cup (rouge)mockup.jpg',
      'Banner Mockup.jpg',
      'T-shirt/T-Shirt avant(bleu).jpg',
      'T-shirt/T-Shirt arriere(bleu).jpg',
      'T-shirt/T-Shirt avant(rouge).jpg',
      'T-shirt/T-Shirt arriere(rouge).jpg',
      'notice-instagram-posts.jpg',
      'notice-instagram-carrousel.jpg',
      'notice-site-one-page.jpg',
    ],

    // ↓ Légendes, dans le même ordre (la 1re = visuel principal)
    captions: [
      'Les deux affiches en situation',
      'Logo',
      'Éléments graphiques',
      'Affiche principale',
      'Affiche secondaire · Beyond the Game',
      'Brochure · extérieur',
      'Brochure · intérieur',
      'Ticket d’entrée',
      'Gobelets bleus',
      'Gobelets rouges',
      'Bannière',
      'T-shirt bleu · face',
      'T-shirt bleu · dos',
      'T-shirt rouge · face',
      'T-shirt rouge · dos',
      'Publications Instagram',
      'Carrousel Instagram · les règles',
      'Site one page',
    ],

    // ↓ Texte À CÔTÉ d'une image (vide = image seule)
    imageTexts: {
      'Logo final.svg': {
        title: 'Le logo',
        text: [
          'Le logo est le cœur de la campagne : il fait passer le beer pong de simple jeu de soirée à championnat officiel. L’icône fusionne une chope et une explosion, qui évoque le « splash » de la balle dans le verre, l’instant de la victoire.',
          'La typographie « bubble », grasse et arrondie, apporte le côté fun ; le « O » en forme de balle rappelle directement le jeu. Le blanc cassé évoque l’écume de la bière, et le bloc compact fait penser à un blason sportif.',
        ],
      },
      'notice-elements-graphiques.jpg': { title: '', text: '' },
      'Poster Mockup.jpg': {
        title: 'L’affiche principale',
        text: [
          'Pour cette affiche, j’ai voulu éviter le côté « beuverie » et mettre en avant l’aspect sportif et officiel du tournoi. La composition, très symétrique, évoque le duel : deux équipes face à face, une table au milieu.',
          'Les supports des gobelets reprennent la forme d’une capsule de bière, le contraste bleu-rouge reprend la couleur des cups, et les balles jaunes servent de points d’accroche. Le slogan « Only One Team Wins! » sépare les deux camps.',
        ],
      },
      'Poster2 Mockup.jpg': {
        title: 'L’affiche secondaire',
        text: 'Elle montre que l’événement est aussi un festival : concerts, DJ sets, camping, food… Deux bouteilles roses qui trinquent symbolisent la fête et la rencontre, et les formes de mousse encadrent la liste des activités et les partenaires.',
      },
      'brochure/page1 mockup.jpg': {
        title: 'La brochure des règles',
        text: 'Un triptyque pédagogique qui explique le tournoi et donne envie de s’inscrire. À l’intérieur, les règles sont découpées en trois étapes : Setup, Throw, Win. Les illustrations ont un rôle explicatif, et la table dessinée en perspective permet de visualiser l’espace de jeu.',
      },
      'brochure/page2 mockup.jpg': { title: '', text: '' },
      'Free_Ticket_Mockup_4.jpg': { title: '', text: '' },
      'cup mockup.jpg': {
        title: 'Les gobelets',
        text: 'Le gobelet devient un objet de la compétition et un souvenir de l’événement. Déclinés en bleu et en rouge pour marquer l’opposition des équipes, ils portent le logo en blanc comme un label et un léger motif ton sur ton qui reprend les formes de la charte.',
      },
      'cup (rouge)mockup.jpg': { title: '', text: '' },
      'Banner Mockup.jpg': {
        title: 'La bannière',
        text: 'Une signalétique verticale qui récapitule le programme sur place. La composition est épurée pour rester lisible dans la foule, les titres des tournois sont en jaune sur le bleu, et le logo est placé en haut, à hauteur d’yeux.',
      },
      'T-shirt/T-Shirt avant(bleu).jpg': {
        title: 'Les t-shirts',
        text: 'Le t-shirt sert à la fois de maillot officiel et de produit dérivé. Les rayures verticales rappellent les maillots de sport, le bleu et le rouge identifient les deux camps, et une silhouette de joueur en filigrane habille le dos.',
      },
      'T-shirt/T-Shirt arriere(bleu).jpg': { title: '', text: '' },
      'T-shirt/T-Shirt avant(rouge).jpg': { title: '', text: '' },
      'T-shirt/T-Shirt arriere(rouge).jpg': { title: '', text: '' },
      'notice-instagram-posts.jpg': {
        title: 'Les réseaux sociaux',
        text: 'Des posts de teasing avec de vraies photos d’ambiance et de Košice (« Best Atmosphere », « In the Best City ») pour créer l’envie avant l’événement, et un carrousel qui reprend les règles de la brochure étape par étape.',
      },
      'notice-instagram-carrousel.jpg': { title: '', text: '' },
      'notice-site-one-page.jpg': {
        title: 'Le site one page',
        text: 'Ensemble, nous avons conçu sur Figma un site en une seule page qui centralise tout le tournoi : les règles, les prix et l’inscription. Les pictogrammes rendent les règles compréhensibles quelle que soit la langue, et le bouton « Register Your Team » est placé pour faciliter l’inscription.',
      },
    },

    // ↓ Section du bas : la notice (PDF) et la maquette Figma du site
    dossier: {
      eyebrow: 'Notice de démarche créative',
      title: 'Toute la démarche.',
      text: 'La notice détaille chaque choix de la campagne, du logo aux réseaux sociaux. La maquette du site one page est sur Figma.',
      image: 'notice-elements-graphiques.jpg',
      pdf: 'PINARDEL_DESMOULINS-noticecrea.pdf',
      link: 'https://www.figma.com/design/J9SuXmqWjpzl7uPzoLIVY2/Sa%C3%A9-4.01?node-id=156-23&t=Zo6KjHrNuv8Qji3D-1',
      linkLabel: 'Maquette Figma',
      details: 'PDF · 30 pages',
    },
  },
  'overwatch-market': {
    folder: 'Overwatch_market',
    accent: 'peach',
    tagline: 'Une boutique en ligne d’objets tirés de l’univers d’Overwatch.',
    intro:
      'En groupe de quatre, nous avons imaginé une boutique en ligne qui vend des objets du jeu Overwatch : maquette, site WordPress, objets 3D et communication.',
    meta: [
      { label: 'Équipe', value: '4 personnes' },
      { label: 'Outils', value: 'Figma, WordPress, Blender' },
    ],

    // ↓ Titre + paragraphe(s) SOUS le visuel principal
    sections: [
      {
        label: 'Présentation',
        title: 'Vendre les objets d’un jeu vidéo.',
        text: [
          'Le but de ce projet était de créer la boutique en ligne d’objets que l’on retrouve dans un jeu vidéo. Nous avons choisi Overwatch, le hero shooter de Blizzard.',
          'En groupe de quatre, il fallait concevoir les éléments graphiques, maquetter le site puis le développer sur WordPress, créer des posts Instagram et modéliser les objets en 3D sur Blender pour les présenter dans la boutique.',
        ],
      },
      {
        label: 'Démarche',
        title: 'Plonger dans l’univers du jeu.',
        text: [
          'Nous avons d’abord analysé Overwatch : son concept, ses rôles, son identité visuelle (un futur proche optimiste, des héros très colorés, des formes simples et iconiques), sa palette autour de l’orange et ses typographies, de BankSansCaps à BigNoodleTitling.',
          'Nous avons aussi repéré les objets emblématiques du jeu et étudié des boutiques existantes, comme le Blizzard Gear Store, le Nintendo Store ou Fangamer, pour voir comment transformer un univers de jeu en site e-commerce clair.',
        ],
      },
      {
        label: 'Le site WordPress',
        title: 'De la maquette au site.',
        text: [
          'Après la maquette, nous avons créé notre propre thème WordPress : la palette et les polices importées, puis les compositions de chaque section, du header au footer, et enfin les modèles de pages, en respectant la maquette Figma.',
          'Avec WooCommerce, nous avons ajouté les produits, et l’extension 3D Viewer permet au client de faire tourner et de zoomer sur chaque objet. Nous avons aussi dû contourner quelques limites, en passant par du CSS additionnel pour personnaliser les composants de WooCommerce.',
        ],
      },
    ],
    galleryAfter: 1, // la galerie s'affiche après « Démarche », puis « Le site WordPress »

    // ↓ Ordre de la galerie (déplace une ligne pour déplacer l'image)
    order: [
      'Mesobjets3d/image 114.png',
      'Mesobjets3d/image 113.png',
      'Mesobjets3d/image 59.png',
      'websitemaquette/maquette-02-histoire.jpg',
      'websitemaquette/maquette-03-categories.jpg',
      'websitemaquette/maquette-04-produits.jpg',
      'websitemaquette/maquette-05-detail-produit.jpg',
      'websitemaquette/maquette-06-panier.jpg',
      'websitemaquette/maquette-07-paiement.jpg',
      'websitemaquette/maquette-08-confirmation.jpg',
      'instagram-profil.jpg',
      'instagram-posts.jpg',
      'minijeu-concept.jpg',
      'minijeu-direction-artistique.jpg',
    ],

    // ↓ Légendes, dans le même ordre (la 1re = visuel principal)
    captions: [
      'Maquette · page d’accueil',
      'Objet 3D · porte-bonheur de la griffe',
      'Objet 3D · crédit',
      'Objet 3D · prisme mythique',
      'Maquette · histoire',
      'Maquette · catégories',
      'Maquette · produits',
      'Maquette · détail produit',
      'Maquette · panier',
      'Maquette · paiement',
      'Maquette · confirmation',
      'Instagram · le compte OW_shop',
      'Instagram · publications',
      'Mini-jeu · concept',
      'Mini-jeu · direction artistique',
    ],

    // ↓ Texte À CÔTÉ d'une image (vide = image seule)
    imageTexts: {
      'Mesobjets3d/image 114.png': {
        title: 'Les objets en 3D',
        text: 'Les objets vendus sont modélisés sur Blender : le porte-bonheur de la griffe, le crédit (la monnaie du jeu), le prisme mythique, le katana de Genji, les lootbox… Sur le site, le client peut les faire tourner pour les voir sous tous les angles.',
      },
      'Mesobjets3d/image 113.png': { title: '', text: '' },
      'Mesobjets3d/image 59.png': { title: '', text: '' },
      'websitemaquette/maquette-02-histoire.jpg': {
        title: 'La maquette sur Figma',
        text: [
          'La page d’accueil reprend la direction artistique d’Overwatch pour que le joueur retrouve tout de suite les codes du jeu, dans un site e-commerce clair : informations, catégories, produits du moment et appel à l’action.',
          'La page Histoire explique le concept : une boutique inspirée du jeu où l’on retrouve les objets d’Overwatch.',
        ],
      },
      'websitemaquette/maquette-03-categories.jpg': { title: '', text: '' },
      'websitemaquette/maquette-04-produits.jpg': { title: '', text: '' },
      'websitemaquette/maquette-05-detail-produit.jpg': {
        title: 'Trouver son objet',
        text: 'Les catégories organisent les types d’objets, la page produits les présente en grille pour les comparer facilement, et la fiche détaille chaque objet et son lien avec l’univers du jeu.',
      },
      'websitemaquette/maquette-06-panier.jpg': {
        title: 'Un achat simple',
        text: 'Le panier permet de vérifier et de modifier sa commande, le paiement limite les étapes, et la confirmation récapitule les objets commandés pour rassurer l’utilisateur.',
      },
      'websitemaquette/maquette-07-paiement.jpg': { title: '', text: '' },
      'websitemaquette/maquette-08-confirmation.jpg': { title: '', text: '' },
      'instagram-profil.jpg': {
        title: 'Le compte Instagram',
        text: 'Le compte OW_shop présente et promeut les objets du jeu, avec un style pensé pour une audience jeune et gamer. Les publications expliquent le concept de la boutique et mettent en avant les nouveaux objets.',
      },
      'instagram-posts.jpg': { title: '', text: '' },
      'minijeu-concept.jpg': {
        title: 'Une publicité à jouer',
        text: [
          'Pour promouvoir la boutique, nous avons imaginé une bannière publicitaire interactive : un mini-jeu inspiré de Crossy Road où l’on incarne Lúcio, qui doit traverser une route sans se faire écraser.',
          'Après quatre manches réussies, le joueur gagne un code promo valable dans la boutique. Le jeu est pensé pour ordinateur, mobile et tablette, avec p5.js.',
        ],
      },
      'minijeu-direction-artistique.jpg': { title: '', text: '' },
    },

    // ↓ Section du bas : le livrable (PDF) et la maquette Figma
    dossier: {
      title: 'Le livrable et la maquette.',
      text: 'Le livrable reprend tout le projet : l’analyse du jeu et des boutiques existantes, les objets 3D, l’interface, la réalisation sur WordPress et la stratégie de communication. La maquette complète du site est sur Figma.',
      image: 'websitemaquette/maquette-05-detail-produit.jpg',
      pdf: 'LIVRABLE 1.pdf',
      link: 'https://www.figma.com/design/3cwPlzQLK6Qcad79KehvR3/SAE4.02?node-id=0-1&t=j92X8a2ra6CV5DcO-1',
      linkLabel: 'Maquette Figma',
      details: 'PDF',
    },
  },
  'mascotte-fast-food': {
    folder: 'Mascotteinsecte',
    accent: 'pink',
    tagline: 'Grill’Insect, le fast-food qui ne sert que des insectes grillés.',
    meta: [{ label: 'Outils', value: 'Photoshop, dessin à la main' }],

    // ↓ Titre + paragraphe(s) SOUS le visuel principal
    sections: [
      {
        label: 'Présentation',
        title: 'Une mascotte, une contrainte à chaque étape.',
        text: [
          'Le but : créer la mascotte d’une chaîne de restauration rapide. Aucun concept, style ou outil n’était imposé, seulement un thème.',
          'À chaque nouvelle étape, une consigne venait modifier les règles et imposer une nouvelle contrainte à respecter.',
        ],
      },
      {
        label: 'Démarche',
        title: 'Du croquis au déséquilibre.',
        text: [
          'Étape 1, le thème : « Entomologie Express », un fast-food qui sert exclusivement des insectes grillés. J’ai commencé par des croquis à la main.',
          'Étape 2, la ligne de fuite forcée : la mascotte devait être dessinée en perspective exagérée. J’ai adapté le croquis en plongée extrême, testé des variations d’épaisseur de trait, puis une mise en couleur sans contour.',
          'Étape 3, « je préfère l’aquarelle » : j’ai cherché un tutoriel pour donner un effet aquarelle dans Photoshop, et fait plusieurs essais.',
          'Étape 4, le déséquilibre : il fallait déplacer le centre de gravité pour que la mascotte ait l’air de tomber.',
        ],
      },
    ],
    galleryAfter: 1, // la galerie s'affiche après « Démarche »

    // ↓ Ordre de la galerie (déplace une ligne pour déplacer l'image)
    order: ['mascotte_versionfinalpng.png', 'Mockup_boxt.png'],

    // ↓ Légendes, dans le même ordre (la 1re = visuel principal)
    captions: ['Devanture du fast-food', 'La mascotte · version finale', 'Packaging'],

    // ↓ Texte À CÔTÉ d'une image (vide = image seule)
    imageTexts: {
      'mascotte_versionfinalpng.png': {
        title: 'La version finale',
        text: [
          'Pour la dernière étape, j’ai retravaillé l’effet aquarelle et ajouté une expression faciale qui donne l’impression que la mascotte tombe.',
          'La bouche grande ouverte et la main en l’air donnent l’impression qu’elle essaie de se rattraper.',
        ],
      },
      'Mockup_boxt.png': {
        title: 'L’identité de Grill’Insect',
        text: [
          'J’ai ensuite imaginé la direction artistique du fast-food : son nom, Grill’Insect, une palette de couleurs et deux typographies, Bungee pour les titres et Poppins pour les textes.',
          'La mascotte et cette identité ont été déclinées sur la devanture et le packaging.',
        ],
      },
    },

    // ↓ Section « Dossier de conception » en bas
    dossier: {
      title: 'Le dossier de conception.',
      text: 'Toutes les étapes en détail : les croquis, les tests de perspective, les essais d’aquarelle, la version finale et la direction artistique du fast-food.',
      image: 'mascotte_versionfinalpng.png',
      pdf: 'dossierdeconception.pdf',
      details: 'PDF · 10 pages',
    },
  },
  'reinterpretation-du-logo-starbucks': {
    folder: 'RéinterprétationlogoStarbucks',
    accent: 'periwinkle',
    tagline: 'Transformer la sirène en sculpture Low Poly, sans perdre son identité.',
    meta: [{ label: 'Outils', value: 'Illustrator' }],

    // ↓ Titre + paragraphe(s) SOUS le visuel principal
    sections: [
      {
        label: 'Présentation',
        title: 'Un symbole familier, un nouveau langage.',
        text: [
          'Pour ce projet, j’ai réinterprété le logo de Starbucks en Low Poly, une technique qui construit les formes à partir de facettes géométriques, surtout des triangles.',
          'Mon objectif : proposer une nouvelle lecture du logo tout en gardant les éléments qui font l’identité visuelle de la marque.',
        ],
      },
      {
        label: 'Démarche',
        title: 'Ce qu’il fallait garder.',
        text: [
          'J’ai commencé par étudier l’histoire du logo, de la sirène à deux queues de 1971 à la sirène seule de 2011, puis l’image de marque de Starbucks. Cette analyse m’a permis d’identifier les éléments à préserver : la sirène, le vert emblématique, la symétrie et les références à l’univers maritime et mythologique.',
          'J’ai aussi étudié le Low Poly à travers des références visuelles (portraits facettés, sculptures comme le David de Michel-Ange, personnages géométriques) et réuni le tout dans un moodboard.',
        ],
      },
    ],
    galleryAfter: 1, // la galerie s'affiche après « Démarche »

    // ↓ Ordre de la galerie (déplace une ligne pour déplacer l'image)
    order: ['test_V1.png', 'test_V2.png', 'Logo_final.svg', '11662294.png', 'Free Coffee Bag Mockup.png'],

    // ↓ Légendes, dans le même ordre (la 1re = visuel principal)
    captions: ['Mockup gobelet', 'Premier essai', 'Deuxième essai', 'Logo final', 'Mockup gobelet', 'Mockup paquet de café'],

    // ↓ Texte À CÔTÉ d'une image (vide = image seule)
    imageTexts: {
      'test_V1.png': {
        title: 'Les premiers essais',
        text: [
          'Le plus difficile a été de trouver l’équilibre entre la géométrisation des formes et la lisibilité du personnage.',
          'Mes premiers tests avec le script Triangulator sur Illustrator n’ont pas donné le résultat voulu : facettes incohérentes, formes aléatoires, symétrie non respectée. J’ai donc choisi de construire le logo de façon plus maîtrisée.',
        ],
      },
      'test_V2.png': { title: '', text: '' },
      'Logo_final.svg': {
        title: 'La version finale',
        text: [
          'La symétrie occupe une place centrale pour rappeler le logo original. Les queues de la sirène structurent la silhouette et soulignent le mouvement, et la couronne renforce sa dimension mythologique.',
          'Le visage et les cheveux, construits en facettes, créent des jeux d’ombre et de lumière qui donnent un aspect sculptural. La palette repose sur différentes nuances de vert, associées à des tons clairs pour garder la marque reconnaissable.',
        ],
      },
      '11662294.png': { title: '', text: '' },
      'Free Coffee Bag Mockup.png': { title: '', text: '' },
    },

    // ↓ Section « Dossier de conception » en bas
    dossier: {
      title: 'Le dossier de conception.',
      text: 'Toute la démarche en détail : l’histoire du logo, l’image de marque de Starbucks, le moodboard, les premiers essais et la version finale.',
      image: 'Logo_final.svg',
      pdf: 'Dossier_de_conception.pdf',
      details: 'PDF · 15 pages',
    },
  },
}

/* ---------- Galerie automatique ----------
   Toutes les images d'un dossier de src/assets/Mesprojets sont chargées.
   Ajouter une image à un projet = la déposer dans son dossier. */

const folderFiles = import.meta.glob('../assets/Mesprojets/**/*.{png,jpg,jpeg,webp,avif,gif,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
})

// PDF (dossier de conception) déposés dans les dossiers des projets
const pdfFiles = import.meta.glob('../assets/Mesprojets/**/*.pdf', {
  eager: true,
  query: '?url',
  import: 'default',
})

// Vidéos déposées dans les dossiers des projets
const videoFiles = import.meta.glob('../assets/Mesprojets/**/*.{mp4,webm,mov}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const projectsRoot = '../assets/Mesprojets/'

// `file` peut contenir un sous-dossier : 'final/BLEU/Front pull BLEU blanc.png'
function fileInFolder(files, folder, file) {
  if (!folder || !file) return undefined
  const wanted = `${projectsRoot}${folder}/${file}`.normalize('NFC')
  return Object.entries(files).find(([path]) => path.normalize('NFC') === wanted)?.[1]
}

// Fichier du dossier du projet, ou lien complet (https://…)
function fileOrUrl(files, folder, value) {
  if (!value) return undefined
  return /^https?:\/\//.test(value) ? value : fileInFolder(files, folder, value)
}

const collator = new Intl.Collator('fr', { numeric: true, sensitivity: 'base' })

// Toutes les images du dossier du projet, sous-dossiers compris
function imagesInFolder(folder, exclude = []) {
  if (!folder) return []
  const prefix = `${projectsRoot}${folder}/`.normalize('NFC')
  return Object.entries(folderFiles)
    .map(([path, src]) => ({ path: path.normalize('NFC'), src }))
    .filter((item) => item.path.startsWith(prefix))
    .map((item) => ({ file: item.path.slice(prefix.length), src: item.src }))
    .filter((item) => !exclude.includes(item.file))
    .sort((a, b) => collator.compare(a.file, b.file))
}

/* ---------- Assemblage d'une page ---------- */

const pad = (n) => String(n).padStart(2, '0')

// Même ordre que la page « Projets » (du plus récent au plus ancien)
const ordered = [...projects].sort((a, b) => new Date(b.date) - new Date(a.date))

// Un texte d'image vide ({ title: '', text: '' }) = image seule
function filledNote(note) {
  if (!note) return undefined
  const text = (Array.isArray(note.text) ? note.text : [note.text]).filter((p) => p && String(p).trim())
  return note.title?.trim() || text.length ? note : undefined
}

function link(project) {
  return { title: project.title, slug: slugify(project.title) }
}

export function getProjectPage(slug) {
  const position = ordered.findIndex((project) => slugify(project.title) === slug)
  if (position === -1) return null

  const project = ordered[position]
  const info = details[slug] ?? {}
  const captions = info.captions ?? []

  // Image 1 = visuel de la carte, puis les images du dossier (sans doublon)
  // Ordre : d'abord les fichiers listés dans `order`, puis les autres (ordre alphabétique)
  const rank = (file) => {
    const i = info.order?.indexOf(file) ?? -1
    return i === -1 ? Infinity : i
  }
  const gallerySources = imagesInFolder(info.folder, info.exclude)
    .filter((item) => item.src !== project.image)
    .sort((a, b) => rank(a.file) - rank(b.file))
  const images = [{ src: project.image }, ...gallerySources].map((image, i) => {
    const caption = captions[i] ?? `Visuel ${pad(i + 1)}`
    return {
      src: image.src,
      file: image.file,
      note: image.file ? filledNote(info.imageTexts?.[image.file]) : undefined, // texte à côté de l'image
      caption,
      alt: i === 0 && !captions[0] ? project.alt : `${project.title} — ${caption}`,
    }
  })

  const sections = (info.sections ?? [])
    .filter((section) => section.title || section.text?.length || section.stats?.length || section.quote)
    .map((section, i) => ({
      ...section,
      id: section.id ?? slugify(section.label),
      number: pad(i + 1),
    }))

  // Sections et galerie, dans l'ordre d'affichage
  // (si une section prévue est encore vide, la galerie se place après la dernière section remplie)
  const galleryAfter = Math.min(info.galleryAfter ?? Math.max(sections.length - 2, 0), sections.length - 1)
  const blocks = []
  sections.forEach((section, i) => {
    blocks.push({ type: 'section', ...section })
    if (images.length > 1 && i === galleryAfter) blocks.push({ type: 'gallery', id: 'galerie', label: 'Galerie' })
  })
  if (images.length > 1 && sections.length === 0) blocks.push({ type: 'gallery', id: 'galerie', label: 'Galerie' })

  // Vidéo : juste après les textes, avant la galerie
  const v = info.video
  const videoSrc = v && fileOrUrl(videoFiles, info.folder, v.src)
  const video = videoSrc
    ? { ...v, src: videoSrc, poster: fileInFolder(folderFiles, info.folder, v.poster) }
    : undefined
  if (video) {
    const at = blocks.findIndex((block) => block.type === 'gallery')
    blocks.splice(at === -1 ? blocks.length : at, 0, { type: 'video', id: 'video', label: 'Vidéo' })
  }

  // Dossier de conception (ou lien vers un site) tout en bas
  const d = info.dossier
  // Sans PDF ni lien, la carte n'apparaît qu'en local (pour te rappeler de l'ajouter), jamais sur le site en ligne
  const dossierPdf = d && fileInFolder(pdfFiles, info.folder, d.pdf)
  const dossier = d && (dossierPdf || d.link || import.meta.env.DEV)
    ? {
        ...d,
        title: d.title || 'Le dossier de conception.',
        eyebrow: d.eyebrow || 'Dossier de conception',
        pdf: dossierPdf,
        pdfName: d.pdf?.split('/').pop(),
        image: fileInFolder(folderFiles, info.folder, d.image) ?? project.image,
      }
    : undefined
  if (dossier) blocks.push({ type: 'dossier', id: 'dossier', label: d.label || 'Dossier' })

  return {
    project,
    slug,
    accent: info.accent ?? 'lavender',
    tagline: info.tagline,
    intro: info.intro ?? project.description,
    meta: info.meta ?? [],
    images,
    blocks,
    dossier,
    video,
    files: gallerySources.map((item) => item.file),
    position: position + 1,
    total: ordered.length,
    previous: link(ordered[(position - 1 + ordered.length) % ordered.length]),
    next: link(ordered[(position + 1) % ordered.length]),
  }
}