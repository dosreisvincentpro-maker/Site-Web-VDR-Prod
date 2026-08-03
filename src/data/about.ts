import { BioTimelineItem } from '../types';
import { APP_IMAGES } from '../utils/imageAssets';

export const VINCENT_BIO = {
  name: "Vincent Dos Reis",
  companyName: "VDR PRODUCTION",
  title: "Réalisateur & Scénariste",
  photoUrl: APP_IMAGES.portrait.publicUrl,
  fallbackPhotoUrl: APP_IMAGES.portrait.bundledUrl,
  photoCredit: "",
  experienceYears: 15,
  actingYears: 28,
  locations: ["Bretagne, France, Internationale", "Bretagne"],
  contactPhone: "06 81 98 33 82",
  contactEmail: "dosreisvincentprod@gmail.com",
  contactAddress: "25 Kermarquer 56950 Crach",
  youtubeChannel: "https://www.youtube.com/@vincentdosreis/videos",
  quote: "Connaître les deux côtés de la caméra permet de transformer un texte en une émotion juste et sincère.",
  bioParagraphs: [
    "Avec plus de 15 ans d'expérience en réalisation et 28 ans de parcours en comédie professionnelle, j'accompagne chaque projet audiovisuel de l'écriture du scénario à la réalisation.",
    "Formé au jeu dramatique et à la narration visuelle, j'ai également créé des mises en scène théâtrales et écrit des pièces.",
    "Au sein de VDR PRODUCTION, j'accompagne des Marques, des Agences, des Artistes et des Producteurs en Bretagne, en France et à l'International dans la création de leurs Films de Marque, Publicités TV / Web, Contenus Digitaux, Fictions, Clips ou vidéos sur-mesure."
  ],
  keyStats: [
    { label: "Années de Réalisation", value: "15+" },
    { label: "Années de Comédie Pro", value: "28" },
    { label: "Films & Spots Réalisés", value: "50+" },
    { label: "Zone d'Intervention", value: "Bretagne, France, Internationale" }
  ]
};

export const BIO_TIMELINE: BioTimelineItem[] = [
  {
    year: "1996",
    title: "Débuts Comédien Professionnel",
    role: "Acteur Théâtre & Télévision",
    description: "Premiers rôles au théâtre et apparitions télévisées. Découverte du jeu dramatique et de l'art du dialogue.",
    highlight: "Déclic pour la création scénique",
    imageUrl: "/images/foto plateau chopalovitch 3.jpg"
  },
  {
    year: "2004",
    title: "Mises en Scène & Écriture Théâtrale",
    role: "Auteur & Metteur en Scène",
    description: "Écriture de pièces originales et direction de comédiens. Exploration de la dynamique de plateau et de la mise en espace.",
    highlight: "Début de la passion de l'écriture",
    imageUrl: "/images/AB002A_1.JPG"
  },
  {
    year: "2009",
    title: "Passage derrière la Caméra",
    role: "Réalisateur Indépendant",
    description: "Réalisation de premiers courts-métrage de fiction et de clips musicaux originaux",
    highlight: "Développement d'un style visuel et narratif",
    imageUrl: "/images/644295844_10240923307558320_748844994663426488_n.jpg"
  },
  {
    year: "2018",
    title: "Projets Longs & Fictions",
    role: "Direction d'Acteurs",
    description: "Expérience en tant que directeur de casting sur un long métrage et d'assistant réalisateur sur des fictions exigeantes",
    highlight: "Exigence du format cinéma",
    imageUrl: "/images/472996971_924965393153372_61239502768032929_n.jpg"
  },
  {
    year: "2023",
    title: "Création d'Élément Production",
    role: "Réalisateur & Producteur",
    description: "Réalisation et Production des pastilles sur Top Chef : La Brigade Cachée pour M6, ainsi que de nombreuses Publicités TV et Web, de Films de Marque et de Contenus Digitaux.",
    highlight: "Expertise dans la production et le travail d'une agence de communication",
    imageUrl: "/images/IMG_1688.jpg"
  },
  {
    year: "2026",
    title: "Création de VDR Production",
    role: "Réalisateur & Producteur",
    description: "Réalisation et Production de Publicités TV / Web, de Films de Marque, de Contenus Digitaux et de Podcast. Interventions fréquentes en tant que Coach Médias et au sein d'établissements Scolaires.",
    highlight: "Expertise au service des marques & créateurs",
    imageUrl: "/images/554681364_31443243558657454_8796418406734165410_n.jpg"
  }
];
