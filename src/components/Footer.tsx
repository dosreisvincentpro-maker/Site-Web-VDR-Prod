import React from 'react';
import { PageTab } from '../types';
import { Phone, Mail, MapPin, Youtube, Instagram, Linkedin, ArrowRight, Video, Film, Mic, UserCheck, Users, Radio, Briefcase } from 'lucide-react';
import { YOUTUBE_CHANNEL_URL, INSTAGRAM_URL, LINKEDIN_URL, TIKTOK_URL } from '../data/videos';

const TikTokIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.34 22a6.33 6.33 0 0 0 6.33-6.33V9.11a8.16 8.16 0 0 0 4.69 1.48v-3.9a4.84 4.84 0 0 1-.77-.001z"/>
  </svg>
);

interface FooterProps {
  setActiveTab: (tab: PageTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (tab: PageTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="theme-bg-card border-t theme-border theme-text-muted pt-16 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Call To Action Banner */}
        <div className="theme-bg-subtle border theme-border rounded-sm p-6 sm:p-10 mb-16 relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-md">
          <div className="absolute top-0 right-0 w-64 h-64 theme-accent-subtle-bg rounded-full blur-3xl pointer-events-none opacity-50"></div>
          
          <div className="space-y-2 max-w-2xl relative z-10">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold theme-accent-text theme-accent-subtle-bg px-2.5 py-1 border theme-accent-subtle-border rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full theme-accent-bg animate-ping"></span>
              <span>Nouveau Projet Vidéo, Audio ou Contenu Digital ?</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black theme-text-heading tracking-tight">
              Donnons vie à vos Projets Vidéos avec la beauté et la rigueur du cinéma
            </h3>
            <p className="text-sm theme-text-muted">
              En France et à l'International pour réaliser vos Publicités TV & Web, vos Contenus Digitaux, vos Films de Marque, vos Fictions et vos vidéos sur-mesure.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto relative z-10">
            <button
              onClick={() => handleNavClick('contact')}
              className="px-6 py-3.5 theme-accent-bg theme-accent-bg-hover font-extrabold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center space-x-2 shadow-md rounded-sm cursor-pointer"
            >
              <span>DISCUTER DE VOTRE PROJET</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="tel:0681983382"
              className="px-6 py-3.5 theme-bg-card hover:theme-bg-subtle theme-text-heading font-mono text-xs font-bold transition-all border theme-border rounded-sm flex items-center justify-center space-x-2 shrink-0 whitespace-nowrap"
            >
              <Phone className="w-4 h-4 theme-accent-text shrink-0" />
              <span className="whitespace-nowrap">06 81 98 33 82</span>
            </a>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b theme-border-subtle">
          
          {/* Column 1: Company Profile */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-xl font-black theme-text-heading">
              <span className="theme-accent-text font-mono">[</span>
              <span>VDR PRODUCTION</span>
              <span className="theme-accent-text font-mono">]</span>
            </div>
            <p className="text-xs theme-text-muted leading-relaxed">
              VDR Production réunit plus de 15 ans d'expérience dans l'écriture, la réalisation et production de contenus audiovisuels. Avec 28 années d'actorat professionnel, je suis également spécialisé en Coaching Médias et Training d'acteur.
            </p>
            <div className="pt-2 flex flex-col space-y-2">
              <span className="text-[10px] font-mono theme-text-subtle uppercase tracking-widest">Réseaux Sociaux & Vidéos :</span>
              <div className="flex flex-wrap gap-2">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-xs font-mono font-semibold theme-text-main hover:theme-accent-text theme-bg-subtle border theme-border hover:border-pink-500 px-3 py-2 rounded-sm transition-all shadow-sm"
                  title="Instagram @dosreisvincentprod"
                >
                  <Instagram className="w-4 h-4 text-[#E4405F]" />
                  <span>Instagram</span>
                </a>

                <a
                  href={TIKTOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-xs font-mono font-semibold theme-text-main hover:theme-accent-text theme-bg-subtle border theme-border hover:border-cyan-500 px-3 py-2 rounded-sm transition-all shadow-sm"
                  title="TikTok @vincent.dos.reis"
                >
                  <TikTokIcon className="w-4 h-4 text-[#00f2fe]" />
                  <span>TikTok</span>
                </a>

                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-xs font-mono font-semibold theme-text-main hover:theme-accent-text theme-bg-subtle border theme-border hover:border-blue-500 px-3 py-2 rounded-sm transition-all shadow-sm"
                  title="LinkedIn Vincent Dos Reis"
                >
                  <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={YOUTUBE_CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-xs font-mono font-semibold theme-text-main hover:theme-accent-text theme-bg-subtle border theme-border hover:border-red-600 px-3 py-2 rounded-sm transition-all shadow-sm"
                  title="Chaîne YouTube Officielle"
                >
                  <Youtube className="w-4 h-4 text-[#FF0000]" />
                  <span>YouTube</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold theme-text-heading uppercase tracking-widest border-b theme-border-subtle pb-2">
              [ NAVIGATION ]
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <button onClick={() => handleNavClick('accueil')} className="hover:theme-accent-text transition-colors flex items-center space-x-1 cursor-pointer">
                  <span className="theme-text-subtle">›</span> <span className="theme-accent-text font-semibold">Accueil</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('realisations')} className="hover:theme-accent-text transition-colors flex items-center space-x-1 cursor-pointer">
                  <span className="theme-text-subtle">›</span> <span className="theme-accent-text font-semibold">Réalisations & Films</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('apropos')} className="hover:theme-accent-text transition-colors flex items-center space-x-1 cursor-pointer">
                  <span className="theme-text-subtle">›</span> <span className="theme-accent-text font-semibold">Mon parcours</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('services')} className="hover:theme-accent-text transition-colors flex items-center space-x-1 cursor-pointer">
                  <span className="theme-text-subtle">›</span> <span className="theme-accent-text font-semibold">Services & Prestations</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('contact')} className="hover:theme-accent-text transition-colors flex items-center space-x-1 cursor-pointer">
                  <span className="theme-text-subtle">›</span> <span className="theme-accent-text font-semibold">Formulaire de Contact</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Expertise & Formats */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold theme-text-heading uppercase tracking-widest border-b theme-border-subtle pb-2">
              [ DOMAINES DE RÉALISATION ]
            </h4>
            <ul className="space-y-1.5 text-xs theme-text-muted">
              <li className="flex items-center space-x-2">
                <Film className="w-3.5 h-3.5 theme-accent-text" />
                <span>Films de Marque & Manifestes</span>
              </li>
              <li className="flex items-center space-x-2">
                <Video className="w-3.5 h-3.5 theme-accent-text" />
                <span>Publicités TV & Spots Digitaux</span>
              </li>
              <li className="flex items-center space-x-2">
                <Film className="w-3.5 h-3.5 theme-accent-text" />
                <span>Fictions & Courts-Métrages</span>
              </li>
              <li className="flex items-center space-x-2">
                <Video className="w-3.5 h-3.5 theme-accent-text" />
                <span>Clips & Captations</span>
              </li>
              <li className="flex items-center space-x-2">
                <Radio className="w-3.5 h-3.5 theme-accent-text" />
                <span>Télépilote Professionnel de Drone</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mic className="w-3.5 h-3.5 theme-accent-text" />
                <span>Podcasts & Interviews Vidéo</span>
              </li>
              <li className="flex items-center space-x-2">
                <Film className="w-3.5 h-3.5 theme-accent-text" />
                <span>Post-Production & Monteur Professionnel</span>
              </li>
              <li className="flex items-center space-x-2">
                <UserCheck className="w-3.5 h-3.5 theme-accent-text" />
                <span>Coaching Médias</span>
              </li>
              <li className="flex items-center space-x-2">
                <Briefcase className="w-3.5 h-3.5 theme-accent-text" />
                <span>Films Corporate</span>
              </li>
              <li className="flex items-center space-x-2">
                <Users className="w-3.5 h-3.5 theme-accent-text" />
                <span>Projet de Comité d'Entreprise</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Direct Coordonnées */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold theme-text-heading uppercase tracking-widest border-b theme-border-subtle pb-2">
              [ COORDONNÉES DIRECTES ]
            </h4>
            <div className="space-y-2.5 text-xs">
              <a 
                href="tel:0681983382"
                className="flex items-start space-x-2.5 hover:theme-text-heading transition-colors group"
              >
                <Phone className="w-4 h-4 theme-accent-text shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="text-[10px] theme-text-subtle font-mono">TÉLÉPHONE</div>
                  <div className="font-semibold theme-text-main whitespace-nowrap">06 81 98 33 82</div>
                </div>
              </a>

              <a 
                href="mailto:dosreisvincentprod@gmail.com"
                className="flex items-start space-x-2.5 hover:theme-text-heading transition-colors group"
              >
                <Mail className="w-4 h-4 theme-accent-text shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="text-[10px] theme-text-subtle font-mono">EMAIL DIRECT</div>
                  <div className="font-semibold theme-text-main break-all">dosreisvincentprod@gmail.com</div>
                </div>
              </a>

              <div className="flex items-start space-x-2.5 group">
                <MapPin className="w-4 h-4 theme-accent-text shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] theme-text-subtle font-mono">ADRESSE PRODUCER</div>
                  <div className="font-semibold theme-text-main">25 Kermarquer 56950 Crach</div>
                  <div className="text-[11px] theme-accent-text font-mono mt-0.5">Zone d'intervention : Bretagne & France & International</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs theme-text-subtle font-mono gap-4">
          <div>
            © {currentYear} VDR PRODUCTION - <span className="whitespace-nowrap">Vincent Dos Reis</span>. Tous droits réservés.
          </div>
          <div className="flex flex-wrap items-center space-x-3 text-[11px]">
            <span>Bretagne, France, International</span>
            <span>·</span>
            <button onClick={() => handleNavClick('contact')} className="hover:theme-text-main cursor-pointer">
              Demande de devis
            </button>
            <span>·</span>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:theme-text-main flex items-center space-x-1">
              <Instagram className="w-3 h-3 text-[#E4405F]" />
              <span>Instagram</span>
            </a>
            <span>·</span>
            <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="hover:theme-text-main flex items-center space-x-1">
              <TikTokIcon className="w-3 h-3 text-[#00f2fe]" />
              <span>TikTok</span>
            </a>
            <span>·</span>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="hover:theme-text-main flex items-center space-x-1">
              <Linkedin className="w-3 h-3 text-[#0A66C2]" />
              <span>LinkedIn</span>
            </a>
            <span>·</span>
            <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="hover:theme-text-main flex items-center space-x-1">
              <Youtube className="w-3 h-3 text-[#FF0000]" />
              <span>YouTube</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
