import React from 'react';
import { PageTab } from '../types';
import { VINCENT_BIO, BIO_TIMELINE } from '../data/about';
import { ArrowRight } from 'lucide-react';
import { APP_IMAGES, handleImageError } from '../utils/imageAssets';

const aboutPageBg = APP_IMAGES.standaloneAboutBg.publicUrl;
const aboutPagePortrait = APP_IMAGES.aboutPagePortrait.publicUrl;
const careerTimelineBg = APP_IMAGES.careerTimelineBg.publicUrl;

interface AboutPageProps {
  setActiveTab: (tab: PageTab) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ setActiveTab }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-8 lg:py-12 space-y-10 sm:space-y-16 md:space-y-10 lg:space-y-16">
      
      {/* Header Profile Banner */}
      <div className="max-w-5xl mx-auto theme-bg-card border-2 theme-border rounded-sm p-6 sm:p-10 md:p-6 lg:p-12 shadow-xl relative overflow-hidden">
        {/* Background Photo Overlay */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <img 
            src={aboutPageBg} 
            onError={(e) => handleImageError(e, APP_IMAGES.standaloneAboutBg.bundledUrl, APP_IMAGES.standaloneAboutBg.unsplashFallback)}
            alt="Background À Propos" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-45 dark:opacity-55 contrast-105 brightness-120 scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-card)]/80 via-[var(--bg-card)]/60 to-[var(--bg-card)]/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)]/80 via-transparent to-[var(--bg-card)]/30" />
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-5 lg:gap-10 items-center">
          
          {/* Portrait Photo Column */}
          <div className="md:col-span-5 relative group flex justify-center">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-none h-[380px] sm:h-[440px] md:h-[320px] lg:h-[480px] overflow-hidden rounded-sm border-2 theme-accent-border shadow-2xl bg-zinc-900">
              <img
                src={aboutPagePortrait}
                onError={(e) => handleImageError(e, APP_IMAGES.aboutPagePortrait.bundledUrl, APP_IMAGES.aboutPagePortrait.unsplashFallback)}
                alt="Vincent Dos Reis - Réalisateur & Scénariste"
                className="w-full h-full object-cover object-[25%_25%] transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-end text-[10px] font-mono">
                {VINCENT_BIO.photoCredit && (
                  <span className="text-white bg-black/80 px-2 py-0.5 rounded backdrop-blur-sm">
                    {VINCENT_BIO.photoCredit}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Bio Text & Details Column */}
          <div className="md:col-span-7 theme-bg-subtle/80 backdrop-blur-md p-6 sm:p-8 md:p-5 lg:p-8 border theme-border rounded-sm shadow-xl space-y-6 md:space-y-3 lg:space-y-6">
            <div className="space-y-2 md:space-y-1">
              <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold theme-accent-text theme-accent-subtle-bg px-3 py-1 border theme-accent-subtle-border rounded-sm">
                <span>[ À PROPOS DE... ]</span>
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-3xl lg:text-5xl font-black theme-text-heading tracking-tight uppercase leading-tight">
                VINCENT <span className="whitespace-nowrap">DOS REIS</span>
              </h1>
              <p className="text-sm md:text-xs lg:text-sm font-mono theme-accent-text font-bold">
                RÉALISATION · ÉCRITURE · COACHING
              </p>
            </div>

            <div className="space-y-3 md:space-y-2 lg:space-y-3 text-sm sm:text-base md:text-xs lg:text-base theme-text-main leading-relaxed md:leading-snug lg:leading-relaxed">
              {VINCENT_BIO.bioParagraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Key Expertise Tags */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-2 lg:gap-3 pt-2 md:pt-1 lg:pt-2">
              <div className="p-3.5 md:p-2 lg:p-3.5 theme-bg-card border theme-border rounded-sm space-y-1">
                <div className="text-[10px] md:text-[9px] lg:text-[10px] font-mono theme-text-subtle uppercase">RÉALISATION</div>
                <div className="text-xs sm:text-sm md:text-[11px] lg:text-sm font-bold theme-text-heading">15+ Ans d'Expérience</div>
              </div>
              <div className="p-3.5 md:p-2 lg:p-3.5 theme-bg-card border theme-border rounded-sm space-y-1">
                <div className="text-[10px] md:text-[9px] lg:text-[10px] font-mono theme-text-subtle uppercase">COMÉDIE PRO</div>
                <div className="text-xs sm:text-sm md:text-[11px] lg:text-sm font-bold theme-accent-text">Depuis 1996</div>
              </div>
              <div className="p-3.5 md:p-2 lg:p-3.5 theme-bg-card border theme-border rounded-sm space-y-1 col-span-2 sm:col-span-1">
                <div className="text-[10px] md:text-[9px] lg:text-[10px] font-mono theme-text-subtle uppercase">FORMATS</div>
                <div className="text-xs sm:text-sm md:text-[11px] lg:text-sm font-bold theme-text-heading">Pub, Contenu Digital, Film de Marque, Fiction, Corporate & Coaching</div>
              </div>
            </div>

            <div className="pt-2 md:pt-1 lg:pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => setActiveTab('contact')}
                className="px-6 py-3 md:px-4 md:py-2 lg:px-6 lg:py-3 theme-accent-bg theme-accent-bg-hover text-white font-extrabold text-xs uppercase tracking-wider rounded-xs transition-all flex items-center space-x-2 shadow-md cursor-pointer active:scale-95"
              >
                <span>DISCUTER D'UN PROJET</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
      
      {/* CAREER TIMELINE */}
      <div className="relative overflow-hidden theme-bg-card/90 border theme-border rounded-sm p-6 sm:p-10 shadow-xl space-y-8">
        {/* Background Photo Overlay */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <img 
            src={careerTimelineBg} 
            onError={(e) => handleImageError(e, APP_IMAGES.careerTimelineBg.bundledUrl, APP_IMAGES.careerTimelineBg.unsplashFallback)}
            alt="Background Parcours" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-[center_25%] opacity-40 dark:opacity-50 contrast-105 brightness-105 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-card)]/85 via-[var(--bg-card)]/60 to-[var(--bg-card)]/85" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)]/90 via-transparent to-[var(--bg-card)]/60" />
        </div>

        <div className="relative z-10 space-y-8">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold theme-accent-text uppercase tracking-wider">
              [ FEUILLE DE ROUTE PROFESSIONNELLE ]
            </span>
            <h2 className="text-3xl font-black theme-text-heading uppercase tracking-tight">
              PARCOURS & CHRONOLOGIE
            </h2>
          </div>

        <div className="space-y-6 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:-ml-px before:w-0.5 before:theme-bg-subtle">
          {BIO_TIMELINE.map((item, idx) => (
            <div 
              key={idx}
              className={`relative flex flex-col sm:flex-row items-start ${
                idx % 2 === 0 ? 'sm:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full theme-accent-bg border-4 theme-bg-main z-10" />

              {/* Content Card */}
              <div className={`pl-9 sm:pl-0 sm:w-1/2 w-full box-border ${
                idx % 2 === 0 ? 'sm:pl-6 sm:pr-2' : 'sm:pr-6 sm:pl-2'
              }`}>
                <div className="p-4 sm:p-5 theme-bg-card border theme-border rounded-sm hover:theme-accent-border transition-all duration-300 shadow-sm space-y-3 overflow-hidden">
                  {item.imageUrl && (
                    <div className="relative w-full h-36 sm:h-44 overflow-hidden rounded-xs border theme-border group bg-zinc-900">
                      <img
                        src={item.imageUrl}
                        onError={(e) => {
                          const bundledBackup = item.imageUrl.includes('554681364')
                            ? APP_IMAGES.presentVdrPhoto.bundledUrl
                            : item.imageUrl.includes('IMG_1688')
                            ? APP_IMAGES.elementProdPhoto.bundledUrl
                            : item.imageUrl.includes('472996971')
                            ? APP_IMAGES.featureFilmsPhoto.bundledUrl
                            : item.imageUrl.includes('644295844')
                            ? APP_IMAGES.behindCameraPhoto.bundledUrl
                            : item.imageUrl.includes('AB002A')
                            ? APP_IMAGES.theaterDirectingPhoto.bundledUrl
                            : item.imageUrl.includes('chopalovitch')
                            ? APP_IMAGES.chopalovitchPhoto.bundledUrl
                            : APP_IMAGES.careerTimelineBg.bundledUrl;
                          handleImageError(e, bundledBackup, APP_IMAGES.careerTimelineBg.unsplashFallback);
                        }}
                        alt={item.title}
                        className={`w-full h-full object-cover transition-transform duration-700 sm:group-hover:scale-105 filter ${
                          item.imageUrl.includes('644295844')
                            ? 'object-[center_30%] brightness-115 contrast-105'
                            : item.imageUrl.includes('2018')
                            ? 'brightness-130 contrast-105 object-center'
                            : 'brightness-115 contrast-105 object-center'
                        }`}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    </div>
                  )}

                  <div className={`space-y-2 ${idx % 2 !== 0 ? 'sm:text-right' : 'sm:text-left'}`}>
                    <div className={`flex items-center justify-between text-xs font-mono ${
                      idx % 2 !== 0 ? 'sm:flex-row-reverse' : ''
                    }`}>
                      <span className="theme-accent-text font-extrabold text-sm">{item.year}</span>
                      <span className="theme-text-subtle font-semibold text-[11px]">{item.role}</span>
                    </div>
                    <h3 className="text-base font-bold theme-text-heading leading-tight">{item.title}</h3>
                    <p className="text-xs theme-text-muted leading-relaxed">{item.description}</p>

                    {item.highlight && (
                      <div className={`pt-1 text-[11px] font-mono theme-accent-text font-semibold flex items-center space-x-1 ${
                        idx % 2 !== 0 ? 'sm:justify-end' : 'sm:justify-start'
                      }`}>
                        <span>›</span>
                        <span>{item.highlight}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>




    </div>
  );
};
