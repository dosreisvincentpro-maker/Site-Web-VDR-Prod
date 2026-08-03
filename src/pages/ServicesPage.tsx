import React from 'react';
import { PageTab } from '../types';
import { SERVICES_DATA } from '../data/services';
import { Video, FileText, Mic, Headphones, CheckCircle2, ArrowRight, Film } from 'lucide-react';
import { APP_IMAGES, handleImageError } from '../utils/imageAssets';

const productionProcessBg = "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=1600";

interface ServicesPageProps {
  setActiveTab: (tab: PageTab) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ setActiveTab }) => {
  const mainServices = SERVICES_DATA.filter((s) => !s.isOptional);
  const optionalServices = SERVICES_DATA.filter((s) => s.isOptional);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Headphones':
        return <Headphones className="w-7 h-7" />;
      case 'Mic':
        return <Mic className="w-7 h-7" />;
      case 'FileText':
        return <FileText className="w-7 h-7" />;
      case 'Film':
        return <Film className="w-7 h-7" />;
      default:
        return <Video className="w-7 h-7" />;
    }
  };

  const workflowSteps = [
    {
      num: "01",
      title: "Brief & Stratégie Visuelle",
      desc: "Analyse fine de votre message, de la cible et des canaux de diffusion (TV, Cinéma, Réseaux Sociaux)."
    },
    {
      num: "02",
      title: "Scénario & Découpage Technique",
      desc: "Écriture des scripts, dialogues, note d'intention et préparation précise du plan de tournage."
    },
    {
      num: "03",
      title: "Tournage & Direction Artistique",
      desc: "Installation technique, tournage et direction d'acteur et des intervenants."
    },
    {
      num: "04",
      title: "Post-Production & Livrables",
      desc: "Montage, étalonnage, mixage son et exports aux normes souhaitées."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden p-8 sm:p-12 md:p-16 py-10 sm:py-14 border theme-border rounded-sm shadow-2xl min-h-[260px] sm:min-h-[300px] flex flex-col justify-end bg-zinc-950 group">
        {/* Background Image: Photo studio / tournage en arrière-plan */}
        <img 
          src={APP_IMAGES.servicesBg.publicUrl}
          onError={(e) => handleImageError(e, APP_IMAGES.servicesBg.bundledUrl, APP_IMAGES.servicesBg.unsplashFallback)}
          alt="Services Background"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-[90%_20%] sm:object-[center_20%] transition-transform duration-1000 group-hover:scale-105 opacity-80"
        />
        {/* Gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/75 to-zinc-950/35" />

        <div className="relative z-10 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold theme-accent-text">
            <span>[ PRESTATIONS & EXPERTISES ]</span>
            <span className="theme-text-subtle">·</span>
            <span>VDR PRODUCTION</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-5xl font-black theme-text-heading tracking-tight uppercase">
                RÉALISATION, ÉCRITURE, COACHING
              </h1>
              <p className="text-sm theme-text-muted mt-2 max-w-2xl leading-relaxed">
                Des prestations audiovisuelles professionnelles pour vos Films de Marque, Publicités TV / Web, Fictions, Clips et Captations.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('contact')}
              className="px-6 py-3.5 theme-accent-bg theme-accent-bg-hover font-extrabold text-xs uppercase tracking-wider rounded-sm transition-all shadow-md shrink-0 flex items-center space-x-2 cursor-pointer"
            >
              <span>DEMANDER UN DEVIS DÉTAILLÉ</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>


      {/* MAIN CORE SERVICES */}
      <div className="space-y-8">
        <div className="hidden sm:flex items-center space-x-3">
          <span className="w-2 h-2 rounded-full theme-accent-bg animate-ping" />
          <h2 className="text-xl font-mono font-bold theme-text-heading uppercase tracking-wider">
            [ CŒUR DE MÉTIER - PRESTATIONS PRINCIPALES ]
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {mainServices.map((service) => (
            <div
              key={service.id}
              className="theme-bg-card border theme-border hover:theme-accent-border rounded-sm p-8 sm:p-10 space-y-6 flex flex-col justify-between transition-all duration-300 shadow-md group"
            >
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-sm theme-accent-subtle-bg theme-accent-text flex items-center justify-center border theme-accent-subtle-border group-hover:scale-110 transition-transform shrink-0">
                    {getServiceIcon(service.icon)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold theme-text-heading group-hover:theme-accent-text transition-colors">
                      {service.title}
                    </h3>
                    <div className="text-xs font-mono theme-accent-text mt-1">{service.subtitle}</div>
                  </div>
                </div>

                <p className="text-sm theme-text-main leading-relaxed whitespace-pre-line">
                  {service.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t theme-border-subtle">
                  {/* Deliverables List */}
                  <div className="space-y-3">
                    <div className="text-xs font-mono font-bold theme-text-main uppercase">LIVRABLES PRINCIPAUX :</div>
                    <ul className="space-y-2 text-xs theme-text-main">
                      {service.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-4 h-4 theme-accent-text shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-3">
                    <div className="text-xs font-mono font-bold theme-accent-text uppercase">POINTS FORTS :</div>
                    <ul className="space-y-2 text-xs theme-text-main italic">
                      {service.highlights.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="theme-accent-text font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t theme-border-subtle">
                <button
                  onClick={() => setActiveTab('contact')}
                  className="w-full py-3 theme-bg-subtle hover:theme-accent-bg theme-text-main font-mono text-xs font-bold rounded-sm transition-all flex items-center justify-center space-x-2 border theme-border hover:theme-accent-border cursor-pointer"
                >
                  <span>DISCUTER DE CE PROJET</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* WORKFLOW PROCESS */}
      <div className="relative overflow-hidden border theme-border rounded-sm px-6 pt-8 pb-6 sm:px-10 sm:pt-10 sm:pb-8 space-y-8 shadow-xl bg-gradient-to-br from-amber-950/20 via-slate-900/40 to-zinc-900/60 group">
        {/* Background Image & Overlay Container - Amber warm cinematic tone */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <img 
            src={APP_IMAGES.productionProcessBg.publicUrl}
            onError={(e) => handleImageError(e, APP_IMAGES.productionProcessBg.bundledUrl, APP_IMAGES.productionProcessBg.unsplashFallback)}
            alt="Processus de production"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105 opacity-40 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-amber-950/25 via-slate-900/45 to-slate-950/65 backdrop-blur-[1px]" />
        </div>

        <div className="relative z-10 space-y-8">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold theme-accent-text uppercase tracking-wider">
              [ MÉTHODES ]
            </span>
            <h2 className="text-2xl sm:text-4xl font-black theme-text-heading uppercase tracking-tight">
              LE PROCESSUS DE PRODUCTION EN 4 ÉTAPES
            </h2>
            <p className="text-xs theme-text-muted">
              Une organisation rigoureuse garantissant le respect de vos impératifs artistiques et calendaires.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((step, idx) => (
              <div key={idx} className="p-6 bg-slate-900/70 hover:bg-slate-900/90 backdrop-blur-md border border-amber-500/25 hover:border-amber-500/60 transition-all duration-300 rounded-sm space-y-3 relative shadow-md">
                <div className="text-3xl font-black font-mono theme-accent-text">{step.num}</div>
                <h3 className="text-base font-bold theme-text-heading">{step.title}</h3>
                <p className="text-xs theme-text-muted leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* OPTIONAL SERVICE - SUBTLE MEDIA COACHING SECTION */}
      {optionalServices.length > 0 && (
        <div className="border-t theme-border pt-12 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-mono font-bold theme-text-subtle uppercase">
                [ SERVICE SUR DEMANDE COMPLÉMENTAIRE ]
              </div>
              <h2 className="text-2xl font-bold theme-text-heading mt-1">
                Coaching Média & Prise de Parole Face Caméra
              </h2>
            </div>
            <span className="px-3 py-1 theme-bg-subtle border theme-border theme-text-muted text-xs font-mono rounded-sm hidden sm:inline-block">
              SUR MESURE
            </span>
          </div>

          {optionalServices.map((service) => (
            <div key={service.id} className="p-6 sm:p-8 theme-bg-card border theme-border rounded-sm space-y-4 shadow-xs">
              <p className="text-xs sm:text-sm theme-text-main leading-relaxed">
                {service.description} Nous mettons notre expérience de 28 ans de comédie et de direction d'acteurs au service des dirigeants et porte-paroles pour libérer leur aisance naturelle lors d'interviews télévisées, podcasts ou présentations stratégiques.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs theme-text-muted">
                {service.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 theme-accent-bg rounded-full shrink-0"></span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}




    </div>
  );
};
