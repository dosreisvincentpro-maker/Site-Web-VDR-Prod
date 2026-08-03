import React from 'react';
import { ContactForm } from '../components/ContactForm';
import { Phone, Mail, MapPin, Youtube, ExternalLink, ArrowRight } from 'lucide-react';
import { YOUTUBE_CHANNEL_URL } from '../data/videos';
import { APP_IMAGES, handleImageError } from '../utils/imageAssets';

const youtubeChannelBg = "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=1600";

export const ContactPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden p-8 sm:p-12 md:p-16 py-10 sm:py-14 border theme-border rounded-sm shadow-2xl min-h-[260px] sm:min-h-[300px] flex flex-col justify-end bg-zinc-950 group">
        {/* Background Image: Photo de fond de la page contact */}
        <img 
          src={APP_IMAGES.contactBg.publicUrl}
          onError={(e) => handleImageError(e, APP_IMAGES.contactBg.bundledUrl, APP_IMAGES.contactBg.unsplashFallback)}
          alt="Contact Background"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105 opacity-80"
        />
        {/* Gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/75 to-zinc-950/35" />

        <div className="relative z-10 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold theme-accent-text">
            <span>[ CONTACT & DEMANDE DE DEVIS ]</span>
            <span className="theme-text-subtle">·</span>
            <span>VDR PRODUCTION</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-5xl font-black theme-text-heading tracking-tight uppercase">
                PRENONS CONTACT
              </h1>
              <p className="text-sm theme-text-muted mt-2 max-w-2xl leading-relaxed">
                Vous avez un projet de Publicité TV / Web, de Contenus Digitaux, de Film de Marque, de Podcast ou une envie de Coaching? Transmettez-moi vos besoins ou échangeons directement par téléphone.
              </p>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <a
                href="tel:0681983382"
                className="px-5 py-3.5 theme-accent-bg theme-accent-bg-hover font-mono font-extrabold text-xs tracking-wider rounded-sm flex items-center space-x-2 shadow-md transition-colors whitespace-nowrap shrink-0"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">06 81 98 33 82</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Coordinates + Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Direct Coordinates Cards */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="space-y-2">
            <div className="text-xs font-mono font-bold theme-accent-text uppercase">
              [ COORDONNÉES DÉTAILLÉES ]
            </div>
            <h2 className="text-2xl font-extrabold theme-text-heading">
              VDR PRODUCTION / Vincent Dos Reis
            </h2>
            <p className="text-xs theme-text-muted leading-relaxed">
              Basé en Bretagne avec une présence fréquente à Paris. Disponible pour tournages et rendez-vous de préparation.
            </p>
          </div>

          <div className="space-y-4">
            
            {/* Phone Card */}
            <a
              href="tel:0681983382"
              className="p-5 theme-bg-card border theme-border hover:theme-accent-border rounded-sm flex items-start space-x-4 transition-all group shadow-xs"
            >
              <div className="w-12 h-12 theme-accent-subtle-bg theme-accent-text rounded-sm flex items-center justify-center shrink-0 border theme-accent-subtle-border group-hover:scale-105 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="text-[10px] theme-text-subtle font-mono">TÉLÉPHONE DIRECT</div>
                <div className="text-lg font-bold theme-text-heading group-hover:theme-accent-text whitespace-nowrap">06 81 98 33 82</div>
                <div className="text-xs theme-text-muted">Ligne directe VDR Production</div>
              </div>
            </a>

            {/* Email Card */}
            <a
              href="mailto:dosreisvincentprod@gmail.com"
              className="p-5 theme-bg-card border theme-border hover:theme-accent-border rounded-sm flex items-start space-x-4 transition-all group shadow-xs"
            >
              <div className="w-12 h-12 theme-accent-subtle-bg theme-accent-text rounded-sm flex items-center justify-center shrink-0 border theme-accent-subtle-border group-hover:scale-105 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="text-[10px] theme-text-subtle font-mono">EMAIL PROFESSIONNEL</div>
                <div className="text-sm font-bold theme-text-heading group-hover:theme-accent-text break-all">dosreisvincentprod@gmail.com</div>
                <div className="text-xs theme-text-muted">Pour dossiers de production & briefs</div>
              </div>
            </a>

            {/* Address Card */}
            <div className="p-5 theme-bg-card border theme-border rounded-sm flex items-start space-x-4 shadow-xs">
              <div className="w-12 h-12 theme-bg-subtle theme-text-main rounded-sm flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 theme-accent-text" />
              </div>
              <div className="space-y-1">
                <div className="text-[10px] theme-text-subtle font-mono">SIÈGE & ADRESSE POSTALE</div>
                <div className="text-sm font-bold theme-text-heading">25 Kermarquer 56950 Crach</div>
                <div className="text-xs theme-accent-text font-mono">Zone d'intervention : Bretagne & France & International</div>
              </div>
            </div>

          </div>

          {/* YouTube Quick Channel Link Box */}
          <div className="relative overflow-hidden theme-bg-card border theme-border rounded-sm p-6 space-y-4 shadow-md">
            {/* Background Photo Overlay */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
              <img 
                src={youtubeChannelBg} 
                alt="Chaîne Youtube Officielle Vincent Dos Reis" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center opacity-40 dark:opacity-50 contrast-105 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-card)]/90 via-[var(--bg-card)]/80 to-[var(--bg-card)]/70" />
            </div>

            <div className="relative z-10 flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-full bg-red-500/10 text-red-600 flex items-center justify-center shrink-0 border border-red-500/30 shadow-xs">
                <Youtube className="w-5 h-5" />
              </div>
              <div>
                <div className="text-base font-bold theme-text-heading">Accédez aux vidéos directement sur YouTube</div>
              </div>
            </div>

            <p className="relative z-10 text-xs sm:text-sm theme-text-muted">
              Retrouvez mes Films, Publicités TV / Web, Contenus Digitaux et Captations sur ma Chaîne YouTube Officielle.
            </p>

            <div className="relative z-10 pt-1 flex justify-center">
              <a
                href={YOUTUBE_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-[#FF0000] hover:bg-red-700 text-white font-mono text-xs font-extrabold tracking-wider rounded-sm inline-flex items-center space-x-1.5 transition-colors shadow-md"
              >
                <span>VOIR SUR YOUTUBE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Conversion Contact Form */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

      </div>

    </div>
  );
};
