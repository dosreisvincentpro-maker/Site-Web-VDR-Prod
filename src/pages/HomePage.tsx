import React from 'react';
import { PageTab, VideoProject } from '../types';
import { VIDEO_PROJECTS, YOUTUBE_CHANNEL_URL } from '../data/videos';
import { VINCENT_BIO } from '../data/about';
import { SERVICES_DATA } from '../data/services';
import { VideoCard } from '../components/VideoCard';
import { ContactForm } from '../components/ContactForm';
import { Play, Youtube, ArrowRight, Phone, Mail, CheckCircle2, MapPin, Volume2, VolumeX } from 'lucide-react';
import { APP_IMAGES, handleImageError } from '../utils/imageAssets';

const youtubeChannelBg = "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=1600";

interface HomePageProps {
  setActiveTab: (tab: PageTab) => void;
  onSelectVideo: (project: VideoProject) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setActiveTab, onSelectVideo }) => {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const [isMuted, setIsMuted] = React.useState<boolean>(true);

  const toggleSound = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({
          event: 'command',
          func: nextMute ? 'mute' : 'unMute',
          args: []
        }),
        '*'
      );
    }
  };

  const rawFeatured = VIDEO_PROJECTS.filter((p) => p.featured).slice(0, 6);
  const featuredProjects = [...rawFeatured];
  if (featuredProjects.length >= 3) {
    const temp = featuredProjects[0];
    featuredProjects[0] = featuredProjects[2];
    featuredProjects[2] = temp;
  }
  // Inverse 4th and 5th video position on Home Page
  if (featuredProjects.length >= 5) {
    const temp = featuredProjects[3];
    featuredProjects[3] = featuredProjects[4];
    featuredProjects[4] = temp;
  }
  const showreelProject = VIDEO_PROJECTS.find((p) => p.youtubeId === 'ZvVTAVucOpA') || VIDEO_PROJECTS.find((p) => p.id === 'vdr-18') || VIDEO_PROJECTS[0];

  return (
    <div className="space-y-20 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative flex flex-col sm:block min-h-0 sm:min-h-[85vh] justify-center theme-bg-main overflow-hidden border-b theme-border transition-colors duration-300">
        
        {/* Mobile Header Title (Above Video) */}
        <div className="block sm:hidden px-4 pt-6 pb-4">
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-5xl font-black theme-text-heading tracking-tighter uppercase leading-none pl-0">
              VINCENT <br />
              <span className="theme-accent-text">DOS REIS</span>
            </h1>
            <div className="text-xs font-mono theme-text-muted font-bold tracking-widest uppercase pt-1">
              RÉALISATEUR & SCÉNARISTE
            </div>
          </div>
        </div>

        {/* Background / Middle Video */}
        <div className="relative sm:absolute inset-0 z-0 h-[220px] xs:h-[260px] sm:h-full w-full overflow-hidden opacity-90 sm:opacity-40 sm:dark:opacity-70">
          <iframe
            ref={iframeRef}
            src="https://www.youtube.com/embed/ZvVTAVucOpA?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=ZvVTAVucOpA&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&playsinline=1"
            title="Vincent Dos Reis - Background Video"
            className="w-[160%] h-[160%] min-w-full min-h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none object-cover"
            allow="autoplay; encrypted-media"
          />
          <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-[var(--bg-main)]/90 via-[var(--bg-main)]/70 to-[var(--bg-main)]/40 pointer-events-none" />
          <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-[var(--bg-main)] via-transparent to-[var(--bg-main)]/60 pointer-events-none" />          {/* Speaker Sound Toggle Button (Mobile only) */}
          <div className="absolute bottom-3 right-3 z-20 sm:hidden">
            <button
              onClick={toggleSound}
              className={`p-1.5 rounded-full border backdrop-blur-md transition-all duration-300 shadow-lg active:scale-95 cursor-pointer flex items-center justify-center ${
                isMuted
                  ? 'bg-black/80 hover:bg-black border-white/40 text-white hover:border-white/80'
                  : 'bg-black/80 hover:bg-black border-[var(--accent-primary)]/70 text-[var(--accent-primary)] hover:border-[var(--accent-primary)] shadow-[var(--accent-primary)]/20'
              }`}
              aria-label={isMuted ? "Activer le son" : "Couper le son"}
              title={isMuted ? "Activer le son" : "Couper le son"}
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-white" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-[var(--accent-primary)] animate-pulse" />
              )}
            </button>
          </div>
        </div>

        {/* Hero Decorative Bracket Elements - Desktop Only */}
        <div className="absolute top-8 left-8 hidden lg:flex items-center space-x-2 text-xs font-mono theme-accent-text">
          <span>[ VDR ]</span>
          <span className="theme-text-subtle">·</span>
          <span className="theme-text-muted">DIRECTOR & SCREENWRITER</span>
        </div>

        <div className="absolute top-8 right-8 hidden lg:flex items-center space-x-2 text-xs font-mono theme-accent-text">
          <MapPin className="w-3.5 h-3.5" />
          <span className="theme-text-main font-semibold">Bretagne, France, International</span>
        </div>

        {/* Desktop Hero Content Overlay */}
        <div className="hidden sm:flex relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full flex-col justify-center">
          
          <div className="w-full space-y-4">
            
            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black theme-text-heading tracking-tighter uppercase leading-[0.9] pl-0">
                VINCENT <br />
                <span className="theme-accent-text">
                  DOS REIS
                </span>
              </h1>
              <div className="text-lg sm:text-xl font-mono theme-text-muted font-bold tracking-widest uppercase pt-2">
                RÉALISATEUR & SCÉNARISTE
              </div>
            </div>

            {/* CTAs & Showreel Quick Play */}
            <div className="pt-20 sm:pt-36 flex items-center justify-between w-full">
              {/* Left Side: Speaker Sound Toggle Button */}
              <button
                onClick={toggleSound}
                className={`p-2.5 sm:p-3 rounded-full border backdrop-blur-md transition-all duration-300 shadow-lg active:scale-95 cursor-pointer flex items-center justify-center ${
                  isMuted
                    ? 'bg-black/80 hover:bg-black border-white/40 text-white hover:border-white/80'
                    : 'bg-black/80 hover:bg-black border-[var(--accent-primary)]/70 text-[var(--accent-primary)] hover:border-[var(--accent-primary)] shadow-[var(--accent-primary)]/20'
                }`}
                aria-label={isMuted ? "Activer le son" : "Couper le son"}
                title={isMuted ? "Activer le son" : "Couper le son"}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                ) : (
                  <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--accent-primary)] animate-pulse" />
                )}
              </button>

              {/* Right Side: Showreel Button */}
              <button
                onClick={() => onSelectVideo(showreelProject)}
                className="px-5 py-2.5 theme-accent-bg theme-accent-bg-hover font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center space-x-2 shadow-md rounded-sm active:scale-95 group cursor-pointer"
              >
                <div className="w-4 h-4 rounded-full bg-white/90 text-[var(--accent-primary)] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Play className="w-2.5 h-2.5 ml-0.5 fill-current" />
                </div>
                <span>VOIR LE SHOWREEL / DÉMO</span>
              </button>
            </div>

          </div>

          {/* Bottom Hero Metadata Bar */}
          <div className="mt-12 pt-6 border-t theme-border-subtle grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono theme-text-muted">
            <div>
              <div className="text-[10px] theme-text-subtle uppercase">EXPÉRIENCE</div>
              <div className="theme-text-heading font-bold text-sm mt-0.5">+15 années de réalisation</div>
            </div>
            <div>
              <div className="text-[10px] theme-text-subtle uppercase">PARCOURS JEU</div>
              <div className="theme-accent-text font-bold text-sm mt-0.5">Comédien Pro (1996)</div>
            </div>
            <div>
              <div className="text-[10px] theme-text-subtle uppercase">PRODUCTIONS</div>
              <div className="theme-accent-text font-bold text-sm mt-0.5">Pub, Contenu Digital, Fiction, Coaching</div>
            </div>
            <div>
              <div className="text-[10px] theme-text-subtle uppercase">INTERVENTION</div>
              <div className="theme-text-heading font-bold text-sm mt-0.5">Bretagne, France, Int.</div>
            </div>
          </div>

        </div>

        {/* Mobile Hero Metadata Bar (Below Video) */}
        <div className="block sm:hidden px-4 pt-4 pb-6 space-y-4">
          <div className="pt-2 border-t theme-border-subtle grid grid-cols-2 gap-4 text-xs font-mono theme-text-muted">
            <div>
              <div className="text-[10px] theme-text-subtle uppercase">EXPÉRIENCE</div>
              <div className="theme-text-heading font-bold text-sm mt-0.5">+15 années de réalisation</div>
            </div>
            <div>
              <div className="text-[10px] theme-text-subtle uppercase">PARCOURS JEU</div>
              <div className="theme-accent-text font-bold text-sm mt-0.5">Comédien Pro (1996)</div>
            </div>
            <div>
              <div className="text-[10px] theme-text-subtle uppercase">PRODUCTIONS</div>
              <div className="theme-accent-text font-bold text-sm mt-0.5">Pub, Contenu Digital, Fiction, Coaching</div>
            </div>
            <div>
              <div className="text-[10px] theme-text-subtle uppercase">INTERVENTION</div>
              <div className="theme-text-heading font-bold text-sm mt-0.5">Bretagne, France, Int.</div>
            </div>
          </div>
        </div>

      </section>


      {/* CREDIBILITY & METRICS STRIP WITH VINCENT DOS REIS PROFILE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden theme-bg-card border theme-border p-6 sm:p-10 lg:p-12 rounded-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center shadow-lg">
          
          {/* Background Photo Overlay */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <img 
              src={APP_IMAGES.aboutBg.publicUrl} 
              onError={(e) => handleImageError(e, APP_IMAGES.aboutBg.bundledUrl, APP_IMAGES.aboutBg.unsplashFallback)}
              alt="Background plateau tournage" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-[center_20%] opacity-35 dark:opacity-45 contrast-105 brightness-95 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-card)]/90 via-[var(--bg-card)]/80 to-[var(--bg-card)]/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)]/85 via-transparent to-[var(--bg-card)]/30" />
          </div>

          {/* Vincent Portrait & À Propos Card */}
          <div className="relative z-10 lg:col-span-6 flex flex-col sm:flex-row items-center sm:items-start space-y-5 sm:space-y-0 sm:space-x-6 theme-bg-subtle/95 backdrop-blur-md p-6 sm:p-8 border-2 theme-border rounded-sm shadow-xl">
            <div className="relative w-48 h-60 sm:w-56 sm:h-72 lg:w-64 lg:h-80 shrink-0 overflow-hidden rounded-sm border-2 theme-accent-border shadow-2xl group">
              <img
                src={VINCENT_BIO.photoUrl}
                onError={(e) => handleImageError(e, VINCENT_BIO.fallbackPhotoUrl, APP_IMAGES.portrait.unsplashFallback)}
                alt="Vincent Dos Reis"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-3 min-w-0 flex-1 text-center sm:text-left">
              <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold theme-accent-text theme-accent-subtle-bg px-2.5 py-0.5 border theme-accent-subtle-border rounded-xs">
                <span>[ À PROPOS ]</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black theme-text-heading tracking-tight uppercase leading-tight">
                VINCENT <span className="whitespace-nowrap">DOS REIS</span>
              </h2>
              <p className="text-xs font-mono theme-accent-text font-bold">
                RÉALISATEUR · SCÉNARISTE · COACH
              </p>
              <p className="text-xs sm:text-sm theme-text-muted italic leading-relaxed">
                "{VINCENT_BIO.quote}"
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('apropos')}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 theme-accent-bg theme-accent-bg-hover text-white font-extrabold text-xs uppercase tracking-wider rounded-xs transition-all cursor-pointer shadow-md active:scale-95"
                >
                  <span>DÉCOUVRIR MON PARCOURS</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="relative z-10 lg:col-span-6 grid grid-cols-2 gap-6 sm:gap-8">
            
            <div className="space-y-1.5 p-4 theme-bg-subtle/80 border theme-border rounded-sm">
              <div className="text-3xl sm:text-5xl font-black theme-accent-text">15+</div>
              <div className="text-xs sm:text-sm font-mono font-bold theme-text-heading">Années de Réalisation</div>
              <div className="text-xs theme-text-muted">Films de Marque, Pubs TV & Web, Contenus Digitaux, Fictions, Clips</div>
            </div>

            <div className="space-y-1.5 p-4 theme-bg-subtle/80 border theme-border rounded-sm">
              <div className="text-3xl sm:text-5xl font-black theme-text-heading">1996</div>
              <div className="text-xs sm:text-sm font-mono font-bold theme-text-heading">Comédien Pro</div>
              <div className="text-xs theme-text-muted">Direction d'acteurs & Coaching Personnalisé</div>
            </div>

            <div className="space-y-1.5 p-4 theme-bg-subtle/80 border theme-border rounded-sm col-span-2">
              <div className="text-xl sm:text-3xl font-black theme-text-heading">BRETAGNE / FRANCE / INT.</div>
              <div className="text-xs sm:text-sm font-mono font-bold theme-text-heading">Rayonnement Régional, National et International</div>
              <div className="text-xs theme-text-muted">Projets audiovisuels complets de la conception au livrable final</div>
            </div>

          </div>

        </div>
      </section>


      {/* FEATURED WORK & VIDEO SHOWCASE */}
      <section className="relative overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 theme-bg-card/95 border theme-border rounded-sm shadow-xl">
        {/* Background Photo Overlay */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <img 
            src={APP_IMAGES.portfolioBg.publicUrl} 
            onError={(e) => handleImageError(e, APP_IMAGES.portfolioBg.bundledUrl, APP_IMAGES.portfolioBg.unsplashFallback)}
            alt="Background portfolio" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-25 dark:opacity-30 contrast-105 brightness-95 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-card)]/90 via-[var(--bg-card)]/80 to-[var(--bg-card)]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)]/90 via-transparent to-[var(--bg-card)]/40" />
        </div>

        <div className="relative z-10 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b theme-border pb-6">
            <div>
              <div className="text-xs font-mono font-bold theme-accent-text uppercase tracking-wider flex items-center space-x-2">
                <span className="inline-block w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                <span>[ PORTFOLIO VIDÉOS SÉLECTIONNÉES ]</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black theme-text-heading tracking-tight mt-1">
                PROJETS
              </h2>
              <p className="text-xs sm:text-sm theme-text-muted mt-1 max-w-xl">
                Toutes mes créations vidéos sont accessibles en Haute Définition directement sur YouTube.
              </p>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <button
                onClick={() => setActiveTab('realisations')}
                className="px-4 py-2.5 theme-bg-card hover:theme-bg-subtle theme-text-heading font-mono text-xs font-bold border theme-border rounded-sm transition-all flex items-center space-x-2 cursor-pointer shadow-xs"
              >
                <span>PLUS DE VIDÉOS +{VIDEO_PROJECTS.length}</span>
                <ArrowRight className="w-3.5 h-3.5 theme-accent-text" />
              </button>

              <a
                href={YOUTUBE_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-600 border border-red-500/30 text-xs font-mono font-bold rounded-sm flex items-center space-x-2 transition-all shadow-xs"
              >
                <Youtube className="w-4 h-4" />
                <span>YOUTUBE</span>
              </a>
            </div>
          </div>

          {/* Video Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <VideoCard
                key={project.id}
                project={project}
                onSelect={onSelectVideo}
                showDate={false}
              />
            ))}
          </div>

          {/* Banner linking directly to YouTube channel */}
          <div className="relative overflow-hidden theme-bg-card border theme-border rounded-sm p-7 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-md min-h-[110px]">
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

            <div className="relative z-10 flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-600 flex items-center justify-center shrink-0 border border-red-500/30 shadow-xs">
                <Youtube className="w-6 h-6" />
              </div>
              <div>
                <div className="text-base sm:text-lg font-bold theme-text-heading">Accédez aux vidéos directement sur YouTube</div>
                <p className="text-xs sm:text-sm theme-text-muted mt-0.5">
                  Retrouvez mes Films, Publicités TV / Web, Contenus Digitaux et Captations sur ma Chaîne YouTube Officielle.
                </p>
              </div>
            </div>

            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 px-4 py-2.5 bg-[#FF0000] hover:bg-red-700 text-white font-mono text-xs font-extrabold tracking-wider rounded-sm flex items-center space-x-1.5 shrink-0 transition-colors shadow-md"
            >
              <span>VOIR SUR YOUTUBE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </section>


      {/* SERVICES SUMMARY GRID */}
      <section className="relative overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-16 sm:pb-20 space-y-10 theme-bg-card/95 border theme-border rounded-sm shadow-xl">
        
        {/* Background Photo Overlay */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <img 
            src={APP_IMAGES.solutionsBg.publicUrl} 
            onError={(e) => handleImageError(e, APP_IMAGES.solutionsBg.bundledUrl, APP_IMAGES.solutionsBg.unsplashFallback)}
            alt="Studio de tournage et scénarios" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-35 dark:opacity-45 contrast-105 brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-card)]/80 via-[var(--bg-card)]/50 to-[var(--bg-card)]/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)]/80 via-transparent to-[var(--bg-card)]/50" />
        </div>

        <div className="relative z-10 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold theme-accent-text uppercase tracking-wider">
              [ PRESTATIONS & EXPERTISES ]
            </span>
            <h2 className="text-3xl sm:text-4xl font-black theme-text-heading tracking-tight">
              SOLUTIONS AUDIOVISUELLES <span className="whitespace-nowrap">SUR-MESURE</span>
            </h2>
            <p className="text-xs sm:text-sm theme-text-muted">
              De la conception initiale à la livraison finale, je prends en charge la totalité de vos besoins audiovisuels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICES_DATA.map((service) => (
              <div
                key={service.id}
                className="p-6 sm:p-8 theme-bg-card border theme-border rounded-sm transition-all duration-300 flex flex-col justify-between hover:theme-accent-border shadow-md"
              >
                <div className="flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3 sm:gap-4">
                      <span className="px-2.5 py-1 theme-accent-subtle-bg theme-accent-text text-[10px] font-mono font-bold rounded-sm border theme-accent-subtle-border whitespace-nowrap shrink-0">
                        {service.isOptional ? '[ SERVICE COMPLÉMENTAIRE ]' : '[ CŒUR DE MÉTIER ]'}
                      </span>
                      {service.experience && (
                        <span className="theme-text-subtle font-mono text-[11px] text-right shrink-0 whitespace-pre-line leading-tight">{service.experience}</span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold theme-text-heading">{service.title}</h3>
                    <p className="text-xs theme-text-muted leading-relaxed min-h-[3rem] sm:min-h-[3.25rem] whitespace-pre-line">{service.description}</p>
                  </div>

                  {/* Key Deliverables */}
                  <div className="space-y-2 pt-3 border-t theme-border-subtle mt-auto">
                    <div className="text-[11px] font-mono font-bold theme-text-main">LIVRABLES :</div>
                    <ul className="space-y-1.5 text-xs theme-text-muted">
                      {service.deliverables.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="w-1.5 h-1.5 theme-accent-bg rounded-full shrink-0 mt-1.5"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => setActiveTab('services')}
                    className="text-xs font-mono font-bold theme-accent-text hover:underline flex items-center space-x-1 cursor-pointer"
                  >
                    <span>DÉTAILS DES PRESTATIONS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => setActiveTab('services')}
              className="px-8 py-3.5 theme-bg-card hover:theme-bg-subtle theme-text-heading font-mono text-xs font-bold border theme-border rounded-sm transition-all inline-flex items-center space-x-2 cursor-pointer shadow-xs"
            >
              <span>DÉCOUVRIR TOUTES LES PRESTATIONS EN DÉTAILS</span>
              <ArrowRight className="w-4 h-4 theme-accent-text" />
            </button>
          </div>
        </div>

      </section>


      {/* CONVERSION SECTION & CONTACT FORM */}
      <section id="contact-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold theme-accent-text uppercase tracking-wider">
                [ CONTACT DIRECT ]
              </span>
              <h2 className="text-3xl sm:text-4xl font-black theme-text-heading tracking-tight">
                UN PROJET VIDÉO, UN PROJET AUDIO OU UN BESOIN DE COACHING ?
              </h2>
              <p className="text-xs sm:text-sm theme-text-muted leading-relaxed">
                J'étudie directement chaque demande avec attention et réactivité. Obtenez une offre artistique et financière adaptée à vos enjeux.
              </p>
            </div>

            {/* Direct Cards */}
            <div className="space-y-3 pt-2">
              <a
                href="tel:0681983382"
                className="p-4 theme-bg-card border theme-border hover:theme-accent-border rounded-sm flex items-center space-x-4 transition-all group shadow-xs"
              >
                <div className="w-12 h-12 theme-accent-subtle-bg theme-accent-text rounded-sm flex items-center justify-center shrink-0 border theme-accent-subtle-border group-hover:scale-105 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] theme-text-subtle font-mono">TÉLÉPHONE DIRECT</div>
                  <div className="text-base font-bold theme-text-heading group-hover:theme-accent-text whitespace-nowrap">06 81 98 33 82</div>
                  <div className="text-[11px] theme-text-muted">Lundi au Samedi · 8h - 20h</div>
                </div>
              </a>

              <a
                href="mailto:dosreisvincentprod@gmail.com"
                className="p-4 theme-bg-card border theme-border hover:theme-accent-border rounded-sm flex items-center space-x-4 transition-all group shadow-xs"
              >
                <div className="w-12 h-12 theme-accent-subtle-bg theme-accent-text rounded-sm flex items-center justify-center shrink-0 border theme-accent-subtle-border group-hover:scale-105 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] theme-text-subtle font-mono">EMAIL PROFESSIONNEL</div>
                  <div className="text-sm font-bold theme-text-heading group-hover:theme-accent-text break-all">dosreisvincentprod@gmail.com</div>
                  <div className="text-[11px] theme-text-muted">Réponse sous 24h à 48h</div>
                </div>
              </a>

              <div className="p-4 theme-bg-card border theme-border rounded-sm flex items-center space-x-4 shadow-xs">
                <div className="w-12 h-12 theme-bg-subtle theme-text-main rounded-sm flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 theme-accent-text" />
                </div>
                <div>
                  <div className="text-[10px] theme-text-subtle font-mono">LOCALISATION & ADRESSE</div>
                  <div className="text-sm font-bold theme-text-heading">25 Kermarquer 56950 Crach</div>
                  <div className="text-[11px] theme-accent-text font-mono">Zone d'intervention : Bretagne & France & International</div>
                </div>
              </div>
            </div>

            {/* Quick Guarantees */}
            <div className="p-4 theme-bg-subtle border theme-border rounded-sm space-y-2 text-xs font-mono theme-text-main">
              <div className="flex items-center space-x-2 theme-accent-text font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>ENGAGEMENT QUALITÉ VDR PRODUCTION</span>
              </div>
              <p className="theme-text-muted leading-normal">
                Transparence Budgétaire, respect des plannings et réactivité permanente.
              </p>
            </div>

          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

        </div>

      </section>

    </div>
  );
};
