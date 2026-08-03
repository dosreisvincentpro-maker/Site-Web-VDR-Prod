import React, { useState } from 'react';
import { VideoProject, VideoCategory } from '../types';
import { VIDEO_PROJECTS, YOUTUBE_CHANNEL_URL } from '../data/videos';
import { VideoCard } from '../components/VideoCard';
import { Youtube, ExternalLink, Filter, ChevronDown, ArrowRight } from 'lucide-react';
import { APP_IMAGES, handleImageError } from '../utils/imageAssets';

const youtubeChannelBg = "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=1600";

interface RealisationsPageProps {
  onSelectVideo: (project: VideoProject) => void;
}

export const RealisationsPage: React.FC<RealisationsPageProps> = ({ onSelectVideo }) => {
  const [selectedCategory, setSelectedCategory] = useState<VideoCategory>('all');

  const isProjectInCategory = (p: VideoProject, catId: VideoCategory) => {
    if (catId === 'all') return true;
    if (p.category === catId) return true;
    if (p.categories && p.categories.includes(catId)) return true;
    return false;
  };

  const filteredProjects = selectedCategory === 'all'
    ? VIDEO_PROJECTS
    : VIDEO_PROJECTS.filter((p) => isProjectInCategory(p, selectedCategory));

  const categories: { id: VideoCategory; label: string; count: number }[] = [
    { id: 'all', label: 'Toutes les vidéos', count: VIDEO_PROJECTS.length },
    { id: 'pub', label: 'Pubs & Films de Marque', count: VIDEO_PROJECTS.filter((p) => isProjectInCategory(p, 'pub')).length },
    { id: 'podcast', label: 'Podcasts', count: VIDEO_PROJECTS.filter((p) => isProjectInCategory(p, 'podcast')).length },
    { id: 'social', label: 'Réseaux Sociaux', count: VIDEO_PROJECTS.filter((p) => isProjectInCategory(p, 'social')).length },
    { id: 'corporate', label: 'Corporate', count: VIDEO_PROJECTS.filter((p) => isProjectInCategory(p, 'corporate')).length },
    { id: 'tv', label: 'TV', count: VIDEO_PROJECTS.filter((p) => isProjectInCategory(p, 'tv')).length },
    { id: 'fiction', label: 'Fictions & Cinéma', count: VIDEO_PROJECTS.filter((p) => isProjectInCategory(p, 'fiction')).length },
    { id: 'clip', label: 'Clips', count: VIDEO_PROJECTS.filter((p) => isProjectInCategory(p, 'clip')).length },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden p-8 sm:p-12 md:p-16 py-12 sm:py-16 border theme-border rounded-sm shadow-2xl min-h-[280px] sm:min-h-[320px] flex flex-col justify-end bg-zinc-950 group">
        {/* Background Image: Photo du plateau / tournage */}
        <img 
          src={APP_IMAGES.selectedPortfolioBg.publicUrl}
          onError={(e) => handleImageError(e, APP_IMAGES.selectedPortfolioBg.bundledUrl, APP_IMAGES.selectedPortfolioBg.unsplashFallback)}
          alt="Portfolio Background"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105 opacity-85"
        />
        {/* Gradient overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/20" />

        <div className="relative z-10 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold theme-accent-text">
            <span>[ PORTFOLIO VIDÉOS SÉLECTIONNÉES ]</span>
            <span className="theme-text-subtle">·</span>
            <span>{VIDEO_PROJECTS.length} FILMS RÉPERTORIÉS</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-5xl font-black theme-text-heading tracking-tight uppercase">
                Portfolio
              </h1>
              <p className="text-sm theme-text-muted mt-2 max-w-2xl leading-relaxed">
                Avec plus de 15 ans d'expérience en tant que réalisateur et 28 ans en tant que comédien professionnel, j'accompagne chaque projet audiovisuel de l'écriture, à sa réalisation.
              </p>
            </div>

            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2.5 bg-[#FF0000] hover:bg-red-700 text-white font-mono text-[11px] sm:text-xs font-bold rounded-sm flex items-center space-x-2 transition-all shadow-md shrink-0 self-start md:self-auto"
            >
              <Youtube className="w-4 h-4" />
              <span>ACCÉDER À LA CHAÎNE YOUTUBE</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 pb-2">
        <div className="flex items-center space-x-1.5 text-xs font-mono theme-text-subtle mr-2 shrink-0">
          <Filter className="w-3.5 h-3.5 theme-accent-text" />
          <span>FILTRER :</span>
        </div>

        {/* Dropdown Menu for Mobile & Tablet (< lg) */}
        <div className="lg:hidden w-full sm:w-auto">
          <div className="relative w-full sm:w-80">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as VideoCategory)}
              className="w-full pl-4 pr-10 py-3 text-xs font-mono font-bold uppercase tracking-wider rounded-sm theme-bg-card theme-text-main border theme-border hover:theme-accent-border focus:theme-accent-border focus:outline-none appearance-none cursor-pointer shadow-sm transition-all"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id} className="bg-zinc-900 text-white dark:bg-zinc-900 dark:text-white py-2 font-mono uppercase">
                  {cat.label.toUpperCase()} ({cat.count})
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none theme-accent-text" />
          </div>
        </div>

        {/* Horizontal Buttons for Desktop (>= lg) */}
        <div className="hidden lg:flex items-center gap-1.5 xl:gap-2 flex-nowrap overflow-x-auto max-w-full py-1 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 xl:px-3.5 xl:py-2 text-[11px] xl:text-xs font-mono font-bold rounded-sm transition-all whitespace-nowrap flex items-center space-x-1.5 shrink-0 cursor-pointer ${
                  isActive
                    ? 'theme-accent-bg shadow-sm'
                    : 'theme-bg-card theme-text-main hover:theme-text-heading border theme-border'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white/20 text-white font-extrabold' : 'theme-bg-subtle theme-text-muted'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Video Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <VideoCard
            key={project.id}
            project={project}
            onSelect={onSelectVideo}
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
  );
};
