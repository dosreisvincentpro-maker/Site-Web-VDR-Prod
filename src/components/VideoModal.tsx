import React from 'react';
import { VideoProject } from '../types';
import { X, ExternalLink, Clock, Tag, Film, CheckCircle2 } from 'lucide-react';
import { TIKTOK_URL } from '../data/videos';

const TikTokIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.34 22a6.33 6.33 0 0 0 6.33-6.33V9.11a8.16 8.16 0 0 0 4.69 1.48v-3.9a4.84 4.84 0 0 1-.77-.001z"/>
  </svg>
);

interface VideoModalProps {
  project: VideoProject | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const isTikTok = project.isTikTokOnly || project.id === 'vdr-26' || project.id === 'vdr-28' || project.id === 'vdr-29';
  const isTopChef = project.id === 'vdr-26' || project.id === 'vdr-28' || project.id === 'vdr-29' || project.title.toLowerCase().includes('top chef') || project.isTikTokOnly;
  const tiktokId = project.tiktokVideoId || '7666918428006944022';
  const tiktokHref = project.tiktokUrl || `https://www.tiktok.com/@vincent.dos.reis/video/${tiktokId}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md transition-all animate-fadeIn overflow-y-auto">
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className={`relative w-full ${isTikTok ? 'max-w-2xl' : 'max-w-4xl'} theme-bg-card border theme-border rounded-sm shadow-2xl overflow-hidden z-10 flex flex-col my-auto max-h-[92vh]`}>
        
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 theme-bg-header border-b theme-border shrink-0">
          <div className="flex items-center space-x-2.5">
            {isTikTok ? (
              <span className="bg-gradient-to-r from-[#00f2fe] to-[#ff0050] text-black font-mono font-extrabold text-[10px] sm:text-xs px-2 py-0.5 rounded-xs flex items-center space-x-1">
                <TikTokIcon className="w-3 h-3 text-black" />
                <span>FORMAT VERTICAL TIKTOK</span>
              </span>
            ) : (
              <span className="theme-accent-text font-mono font-bold text-xs">[ VIDEO REEL ]</span>
            )}
            <span className="text-xs font-mono theme-text-muted font-medium truncate max-w-[150px] sm:max-w-md">
              {project.categoryLabel} · {project.clientOrProject}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 theme-text-muted hover:theme-text-heading theme-bg-subtle border theme-border rounded-sm hover:theme-accent-border transition-colors cursor-pointer"
            aria-label="Fermer la fenêtre"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Container */}
        {isTikTok ? (
          /* UNIQUE VERTICAL TIKTOK PLAYER LAYOUT */
          <div className="p-4 sm:p-6 theme-bg-subtle/80 flex flex-col items-center justify-center border-b theme-border bg-gradient-to-b from-black/60 to-black/90">
            <div className="w-full max-w-[340px] sm:max-w-[360px] aspect-[9/16] bg-black rounded-xl overflow-hidden border-2 border-zinc-800 shadow-[0_0_30px_rgba(0,242,254,0.2)] relative group flex flex-col">
              
              {/* TikTok Video Embed Iframe (Official Embed v2) */}
              <iframe
                src={`https://www.tiktok.com/embed/v2/${tiktokId}?lang=fr-FR&autoplay=1`}
                title={project.title}
                className="w-full h-full border-0 relative z-10"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />

              {/* TikTok Header Overlay with Fullscreen Button */}
              <div className="absolute top-3 right-3 z-20 flex items-center justify-end pointer-events-none">
                {/* Discrete Fullscreen Button (hidden on mobile, visible on sm+) */}
                <a
                  href={tiktokHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Regarder la vidéo avec le son sur TikTok"
                  className="hidden sm:flex px-2.5 py-1 bg-black/85 hover:bg-[#ff0050] text-white text-[10px] font-mono font-bold rounded-full border border-white/30 backdrop-blur-md transition-all items-center space-x-1.5 shadow-md hover:scale-105 active:scale-95 cursor-pointer pointer-events-auto"
                >
                  <TikTokIcon className="w-3 h-3 text-[#00f2fe]" />
                  <span>Plein écran ↗</span>
                </a>
              </div>
            </div>

            {/* Direct Link Banner below vertical video */}
            <a
              href={tiktokHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3.5 w-full max-w-[360px] px-4 py-3 bg-gradient-to-r from-black via-zinc-900 to-black hover:from-[#ff0050]/20 hover:to-black text-white font-mono text-xs font-bold rounded-lg flex items-center justify-between transition-all shadow-xl border border-[#00f2fe]/50 hover:border-[#00f2fe] group"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-full bg-[#00f2fe]/20 flex items-center justify-center text-sm group-hover:scale-110 transition-transform">
                  🔊
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-white text-xs font-bold">LANCER AVEC LE SON SUR TIKTOK</span>
                  <span className="text-[10px] text-zinc-400 font-normal">Ouvrir dans l'application TikTok ou le navigateur</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#00f2fe] group-hover:text-[#ff0050] transition-colors" />
            </a>
          </div>
        ) : (
          /* STANDARD LANDSCAPE YOUTUBE PLAYER LAYOUT */
          <div className="relative aspect-video bg-black w-full border-b theme-border shrink-0">
            <iframe
              src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&rel=0`}
              title={project.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {/* Modal Content Info */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 theme-bg-card shrink">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono theme-accent-text mb-1">
                <span>{project.role}</span>
                <span>·</span>
                <span>{project.year}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold theme-text-heading tracking-tight">
                {project.title}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <a
                href={isTikTok ? tiktokHref : (project.tiktokUrl || TIKTOK_URL)}
                target="_blank"
                rel="noopener noreferrer"
                className={`${isTopChef ? 'flex' : 'hidden lg:flex'} px-4 py-2.5 bg-black hover:bg-zinc-800 text-white text-xs font-mono font-bold rounded-sm items-center space-x-2 transition-colors shadow-md border border-zinc-700`}
              >
                <TikTokIcon className="w-4 h-4 text-[#00f2fe]" />
                <span>VOIR SUR TIKTOK</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>
            </div>
          </div>

          <p className="text-sm theme-text-main leading-relaxed theme-bg-subtle p-4 border theme-border-subtle rounded-sm">
            {project.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono theme-text-muted pt-2 border-t theme-border-subtle">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 theme-accent-text" />
              <span>Durée : <strong className="theme-text-heading">{project.duration}</strong></span>
            </div>
            <div className="flex items-center space-x-2">
              <Film className="w-4 h-4 theme-accent-text" />
              <span>Rôle : <strong className="theme-text-heading">{project.role}</strong></span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 theme-accent-text" />
              <span>Client/Cadre : <strong className="theme-text-heading">{project.clientOrProject}</strong></span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-1">
            {project.tags.map((tag, idx) => (
              <span 
                key={idx}
                className="px-2.5 py-1 theme-bg-subtle border theme-border text-[11px] font-mono theme-text-muted rounded-sm flex items-center space-x-1"
              >
                <Tag className="w-3 h-3 theme-accent-text" />
                <span>{tag}</span>
              </span>
            ))}
          </div>

        </div>

        {/* Modal Footer CTA */}
        <div className="p-3.5 sm:p-4 theme-bg-header border-t theme-border flex items-center justify-between text-xs font-mono shrink-0">
          <span className="theme-text-muted truncate mr-2">
            Intéressé par ce type de réalisations ?
          </span>
          <a
            href="tel:0681983382"
            className="theme-accent-text hover:underline font-bold shrink-0"
          >
            06 81 98 33 82
          </a>
        </div>

      </div>
    </div>
  );
};
