export interface ClientReference {
  id: string;
  name: string;
  slug: string;
  category?: string;
  logoUrl?: string; // Optional custom logo image file in /images/logos/{slug}.png or .svg or .webp
  scale?: number; // Facteur d'agrandissement optique pour compenser les marges d'origine
}

export const CLIENT_REFERENCES: ClientReference[] = [
  { id: '1', name: 'Volkswagen', slug: 'volkswagen', category: 'Automobile', logoUrl: '/images/logos/Logo_Volkswagen_D_LightBlue.png' },
  { id: '2', name: 'M6', slug: 'm6', category: 'Télévision & Média', logoUrl: '/images/logos/M6.png' },
  { id: '3', name: 'Or en Cash', slug: 'or-en-cash', category: 'Finance & Réseau', logoUrl: '/images/logos/Or en Cash.jpg', scale: 0.90 },
  { id: '4', name: 'Adecco', slug: 'adecco', category: 'Ressources Humaines', logoUrl: '/images/logos/Adecco_2016.png', scale: 1.08 },
  { id: '5', name: 'France 2', slug: 'france-2', category: 'Télévision Publique', logoUrl: '/images/logos/France-2-Logo-1536x966.png' },
  { id: '6', name: 'Skoda', slug: 'skoda', category: 'Automobile', logoUrl: '/images/logos/Skoda.png' },
  { id: '7', name: 'Auvergne Destination', slug: 'auvergne-destination', category: 'Tourisme & Territoire', logoUrl: '/images/logos/AUVERGNE Destination-logo-Vert.png' },
  { id: '8', name: 'Rians', slug: 'rians', category: 'Agroalimentaire & Terroir', logoUrl: '/images/logos/Rians.png', scale: 1.14 },
  { id: '9', name: 'CNC', slug: 'cnc', category: 'Cinéma & Audiovisuel', logoUrl: '/images/logos/CNC.jpg', scale: 1.10 },
  { id: '10', name: 'Continental', slug: 'continental', category: 'Industrie & Auto', logoUrl: '/images/logos/Continental-Logo-1536x864.png', scale: 1.08 },
  { id: '11', name: 'Yachts de Paris', slug: 'yachts-de-paris', category: 'Événementiel & Luxe', logoUrl: '/images/logos/Yachts de Paris.png' },
  { id: '12', name: 'Prince de Bretagne', slug: 'prince-de-bretagne', category: 'Agroalimentaire & Terroir', logoUrl: '/images/logos/Prince de Bretagne.png' },
  { id: '13', name: 'Allier', slug: 'allier', category: 'Institution & Département', logoUrl: '/images/logos/Allier_(03)_logo_2022.svg.png' },
  { id: '14', name: 'Blue Whale', slug: 'blue-whale', category: 'Agroalimentaire', logoUrl: '/images/logos/Blue whale.png' },
  { id: '15', name: 'CNPO', slug: 'cnpo', category: 'Filière Professionnelle', logoUrl: '/images/logos/CNPO.jpg' },
  { id: '16', name: 'Top Chef', slug: 'top-chef', category: 'Télévision & Gastronomie', logoUrl: '/images/logos/Logo_de_Top-Chef.png' },
  { id: '17', name: 'Safran', slug: 'safran', category: 'Aéronautique & Défense', logoUrl: '/images/logos/Safran-logo-1536x864.png' },
  { id: '18', name: 'Only Lyon', slug: 'only-lyon', category: 'Attractivité & Métropole', logoUrl: '/images/logos/Only Lyon.png' },
  { id: '19', name: 'MG', slug: 'mg', category: 'Automobile', logoUrl: '/images/logos/MG.png' },
  { id: '20', name: 'Normandie Fraîcheur Mer', slug: 'normandie-fraicheur-mer', category: 'Pêche & Marée', logoUrl: '/images/logos/Normandie Fraicheur Mer.png' },
  { id: '21', name: 'Tomate Mygoo', slug: 'tomate-mygoo', category: 'Agroalimentaire', logoUrl: '/images/logos/Mygoo.png', scale: 1.12 },
  { id: '22', name: 'Foie Gras de France', slug: 'foie-gras-de-france', category: 'Gastronomie & Terroir', logoUrl: '/images/logos/FOIE_GRAS_DE_FRANCE.jpg', scale: 1.18 },
  { id: '23', name: 'France Travail', slug: 'france-travail', category: 'Service Public', logoUrl: '/images/logos/LOGO-FRANCE-TRAVAIL.webp', scale: 0.88 },
  { id: '25', name: 'Jambon de Bayonne', slug: 'jambon-de-bayonne', category: 'AOP / Terroir', logoUrl: '/images/logos/Logo_Jambon_de_Bayonne.png' },
  { id: '26', name: 'Piment d’Espelette', slug: 'piment-despelette', category: 'AOP / Terroir', logoUrl: "/images/logos/Piment d'Esplette.webp", scale: 1.12 },
  { id: '27', name: 'Isigny Ste Mère', slug: 'isigny-ste-mere', category: 'Laiterie & AOP', logoUrl: '/images/logos/Isigny Ste Mere. png.png', scale: 1.08 },
  { id: '28', name: 'Fraise de France', slug: 'fraise-de-france', category: 'Filière Agricole', logoUrl: '/images/logos/fraise-de-france-logo-png_seeklogo-57243.png', scale: 1.14 },
  { id: '29', name: 'Potager de Jade', slug: 'potager-de-jade', category: 'Maraîchage', logoUrl: '/images/logos/Potager de Jade.png', scale: 1.16 },
  { id: '30', name: 'Voisin', slug: 'voisin', category: 'Chocolaterie & Torréfaction', logoUrl: '/images/logos/Voisin.jpg', scale: 1.10 },
  { id: '31', name: 'Pomliberty', slug: 'pomliberty', category: 'Agroalimentaire', logoUrl: '/images/logos/Pomliberty.png' },
  { id: '32', name: 'Abondance', slug: 'abondance', category: 'Fromage AOP', logoUrl: '/images/logos/Abondance.jpg' },
  { id: '33', name: 'Fourme', slug: 'fourme', category: 'Fromage AOP', logoUrl: '/images/logos/Fourme.png' },
  { id: '34', name: 'Emmental de Savoie IGP', slug: 'emmental-de-savoie-igp', category: 'Fromage IGP', logoUrl: '/images/logos/emmental de savoie igp.svg' },
  { id: '35', name: 'Fermier d’Argoat', slug: 'fermier-dargoat', category: 'Terroir Breton', logoUrl: '/images/logos/argoat-150x150.png' },
  { id: '36', name: 'Pruneaux d’Agen', slug: 'pruneaux-dagen', category: 'IGP / Terroir', logoUrl: '/images/logos/logo_pruneau-optimized.png' },
  { id: '37', name: 'Noix de Grenoble', slug: 'noix-de-grenoble', category: 'AOP / Terroir', logoUrl: '/images/logos/NOIX de Grenobla.png' }
];
