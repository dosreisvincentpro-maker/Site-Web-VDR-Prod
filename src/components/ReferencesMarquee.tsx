import React, { useState } from 'react';
import { CLIENT_REFERENCES, ClientReference } from '../data/references';
import { LayoutGrid, Play, Pause, ShieldCheck, Film } from 'lucide-react';

interface ReferenceCardProps {
  refItem: ClientReference;
  inGrid?: boolean;
}

const ReferenceCard: React.FC<ReferenceCardProps> = ({ refItem, inGrid = false }) => {
  const [imgError, setImgError] = useState(false);
  const potentialLogoPath = `/images/logos/${refItem.slug}.png`;

  return (
    <div
      className={`group relative flex items-center justify-center h-24 sm:h-28 ${
        inGrid ? 'w-full' : 'w-48 sm:w-56 mx-3'
      } p-4 sm:p-5 rounded-sm bg-white border border-black/10 hover:border-[var(--accent-primary)] hover:shadow-md transition-all duration-300 shadow-xs shrink-0 select-none cursor-default`}
      title={refItem.name}
    >
      {!imgError ? (
        <img
          src={encodeURI(refItem.logoUrl || potentialLogoPath)}
          alt={`Logo ${refItem.name}`}
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="text-sm font-mono font-black text-gray-900 tracking-wider">
          {refItem.name.toUpperCase()}
        </span>
      )}
    </div>
  );
};

export const ReferencesMarquee: React.FC = () => {
  const [viewMode, setViewMode] = useState<'marquee' | 'grid'>('marquee');
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section id="references" className="relative overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8 theme-bg-card/90 border theme-border rounded-sm shadow-xl transition-colors duration-300">
      
      {/* En-tête */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b theme-border pb-6">
        <div className="space-y-2">
          <div className="text-xs font-mono font-bold theme-accent-text uppercase tracking-wider flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
            <span>[ RÉFÉRENCES · ILS M'ONT FAIT CONFIANCE ]</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black theme-text-heading tracking-tight uppercase">
            RÉFÉRENCES & COLLABORATIONS
          </h2>
          <p className="text-xs sm:text-sm theme-text-muted max-w-2xl leading-relaxed">
            Grandes Marques Nationales, Chaines de Télévision, Institutions, Filières d'excellences, Entreprises. Quelques exemples de clients qui m'ont fait confiance pour leurs productions audiovisuelles.
          </p>
        </div>

        {/* Boutons de contrôle */}
        <div className="flex items-center space-x-2 shrink-0">
          {viewMode === 'marquee' && (
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="px-3 py-2 theme-bg-subtle hover:theme-bg-card theme-text-heading font-mono text-xs font-bold border theme-border rounded-sm transition-all flex items-center space-x-1.5 cursor-pointer shadow-xs"
              title={isPaused ? "Relancer le défilement" : "Mettre en pause le défilement"}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 theme-accent-text" /> : <Pause className="w-3.5 h-3.5 theme-accent-text" />}
              <span>{isPaused ? 'DÉFILER' : 'PAUSE'}</span>
            </button>
          )}

          <button
            onClick={() => setViewMode(viewMode === 'marquee' ? 'grid' : 'marquee')}
            className={`px-3.5 py-2 font-mono text-xs font-bold border rounded-sm transition-all flex items-center space-x-1.5 cursor-pointer shadow-xs active:scale-95 ${
              viewMode === 'grid'
                ? 'theme-accent-bg text-white border-[var(--accent-primary)] hover:opacity-95'
                : 'theme-bg-subtle hover:theme-bg-card theme-text-heading theme-border'
            }`}
            title={viewMode === 'grid' ? "Revenir au défilement" : "Afficher tous les logos en grille"}
          >
            {viewMode === 'grid' ? (
              <>
                <Film className="w-3.5 h-3.5 text-white" />
                <span className="text-white font-bold">DÉFILEMENT</span>
              </>
            ) : (
              <>
                <LayoutGrid className="w-3.5 h-3.5 theme-accent-text" />
                <span>VOIR TOUT ({CLIENT_REFERENCES.length})</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Vue Défilement Horizontal Unique (Droite -> Gauche ralenti) */}
      {viewMode === 'marquee' ? (
        <div className="relative overflow-hidden py-4">
          
          {/* Masques de dégradé latéral pour fondu cinématique */}
          <div className="absolute top-0 bottom-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-[var(--bg-card)] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-[var(--bg-card)] to-transparent z-10 pointer-events-none" />

          {/* Rangée unique ralentie, pause automatique au survol de la souris */}
          <div 
            className={`animate-marquee flex items-center hover:[animation-play-state:paused] ${isPaused ? '!animate-none' : ''}`}
            style={{ animationDuration: '95s' }}
          >
            {/* Liste dupliquée pour boucle infinie fluide */}
            {[...CLIENT_REFERENCES, ...CLIENT_REFERENCES].map((client, idx) => (
              <ReferenceCard key={`marquee-${client.id}-${idx}`} refItem={client} />
            ))}
          </div>

        </div>
      ) : (
        /* Vue Grille complète de tous les logos */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 pt-2">
          {CLIENT_REFERENCES.map((client) => (
            <ReferenceCard key={`grid-${client.id}`} refItem={client} inGrid />
          ))}
        </div>
      )}

      {/* Note de bas de section */}
      <div className="pt-4 border-t theme-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono theme-text-muted">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 theme-accent-text shrink-0" />
          <span>Films d'entreprise · Spots publicitaires · Fictions · Contenus digitaux</span>
        </div>
        <div className="theme-text-subtle text-[11px]">
          VDR Production
        </div>
      </div>

    </section>
  );
};
