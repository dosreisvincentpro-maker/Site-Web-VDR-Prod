import React, { useRef, useEffect, useCallback } from 'react';
import { VideoProject } from '../types';
import { X, ExternalLink } from 'lucide-react';
import { exitFullScreenSafe } from '../utils/fullscreen';

const TikTokIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.34 22a6.33 6.33 0 0 0 6.33-6.33V9.11a8.16 8.16 0 0 0 4.69 1.48v-3.9a4.84 4.84 0 0 1-.77-.001z"/>
  </svg>
);

interface VideoModalProps {
  project: VideoProject | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ project, onClose }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wasFullscreen = useRef(false);

  // Fermer la vidéo et quitter le plein écran
  const handleClose = useCallback(() => {
    exitFullScreenSafe();
    onClose();
  }, [onClose]);

  // Synchronisation avec l'API Fullscreen du navigateur
  useEffect(() => {
    if (!project) return;

    // Écoute de l'événement de sortie de plein écran (ex: touche Échap native)
    const onFullscreenChange = () => {
      const isNowFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      );

      if (isNowFullscreen) {
        wasFullscreen.current = true;
      } else if (wasFullscreen.current) {
        // L'utilisateur est sorti du plein écran via la touche Échap native du navigateur
        handleClose();
      }
    };

    // Écoute de la touche Échap
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('fullscreenchange', onFullscreenChange);
    document.addEventListener('webkitfullscreenchange', onFullscreenChange);
    document.addEventListener('mozfullscreenchange', onFullscreenChange);
    document.addEventListener('MSFullscreenChange', onFullscreenChange);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', onFullscreenChange);
      document.removeEventListener('mozfullscreenchange', onFullscreenChange);
      document.removeEventListener('MSFullscreenChange', onFullscreenChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, handleClose]);

  if (!project) return null;

  // Privilégier YouTube s'il existe pour garantir 100% de fluidité et aucun blocage "ratelimit"
  const hasYouTube = Boolean(project.youtubeId);
  const isPureTikTokOnly = !hasYouTube && (project.isTikTokOnly || Boolean(project.tiktokVideoId));
  const tiktokId = project.tiktokVideoId || '7667319468292427030';
  const tiktokHref = project.tiktokUrl || `https://www.tiktok.com/@vincent.dos.reis/video/${tiktokId}`;
  const originParam = typeof window !== 'undefined' ? encodeURIComponent(window.location.origin) : '';

  // URL optimisée haute performance YouTube direct CDN
  const youtubeEmbedUrl = project.youtubeId
    ? `https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&rel=0&playsinline=1&enablejsapi=1&origin=${originParam}`
    : '';

  const vimeoEmbedUrl = project.vimeoId
    ? `https://player.vimeo.com/video/${project.vimeoId}?autoplay=1&muted=0&quality=1080p&dnt=1`
    : '';

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center w-screen h-screen p-0 m-0 overflow-hidden select-none"
      onClick={(e) => {
        // Ferme si l'utilisateur clique sur le fond noir en dehors du lecteur
        if (e.target === containerRef.current) {
          handleClose();
        }
      }}
    >
      {/* Boutons d'action en haut à droite */}
      <div className="absolute top-3 right-3 sm:top-5 sm:right-6 z-50 flex items-center space-x-2">
        {project.tiktokUrl && (
          <a
            href={project.tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-black/80 hover:bg-[#ff0050] text-white border border-white/30 hover:border-white/70 transition-all shadow-xl active:scale-95 cursor-pointer backdrop-blur-md flex items-center space-x-1.5 text-xs font-mono font-bold group"
            title="Ouvrir directement sur TikTok"
          >
            <TikTokIcon className="w-3.5 h-3.5 text-[#00f2fe] group-hover:text-white" />
            <span className="hidden sm:inline">OUVRIR SUR TIKTOK ↗</span>
          </a>
        )}

        {/* Bouton pour fermer (très visible et accessible sur desktop & mobile) */}
        <button
          onClick={handleClose}
          className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-black/80 hover:bg-zinc-900 text-white border border-white/30 hover:border-white/70 transition-all shadow-xl active:scale-95 cursor-pointer backdrop-blur-md flex items-center space-x-2 group"
          aria-label="Fermer la vidéo"
          title="Fermer la vidéo (Échap)"
        >
          <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-200" />
          <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-white">
            Fermer
          </span>
        </button>
      </div>

      {/* Titre discret de la vidéo en haut à gauche */}
      <div className="absolute top-3 left-3 sm:top-5 sm:left-6 z-50 pointer-events-none flex items-center space-x-2.5 max-w-[calc(100%-220px)]">
        <span className="px-2 py-0.5 bg-red-600/90 text-white font-mono font-extrabold text-[10px] sm:text-xs rounded-xs tracking-wider uppercase shadow-md shrink-0">
          {hasYouTube ? 'Full HD' : 'TikTok'}
        </span>
        <span className="text-xs sm:text-sm font-mono text-white/90 font-bold truncate drop-shadow-md">
          {project.title}
        </span>
      </div>

      {/* Lecteur sur fond noir avec accélération matérielle GPU */}
      <div 
        className="w-full aspect-video max-h-screen relative flex items-center justify-center bg-black"
        style={{ transform: 'translateZ(0)', willChange: 'transform' }}
      >
        {isPureTikTokOnly ? (
          /* Carte d'accès direct TikTok pour éviter le blocage "ratelimit" des iframes TikTok */
          <div className="w-full max-w-md aspect-[9/16] max-h-[85vh] bg-zinc-900/90 border border-zinc-700 rounded-xl overflow-hidden shadow-2xl flex flex-col justify-between p-6 text-center relative group">
            {project.thumbnail && (
              <img
                src={project.thumbnail}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover opacity-30 blur-xs"
              />
            )}
            <div className="relative z-10 flex flex-col items-center pt-8">
              <div className="w-16 h-16 rounded-full bg-black/80 border border-[#00f2fe]/50 flex items-center justify-center shadow-lg mb-4">
                <TikTokIcon className="w-8 h-8 text-[#00f2fe]" />
              </div>
              <h3 className="text-lg font-bold text-white uppercase tracking-tight max-w-xs">
                {project.title}
              </h3>
              <p className="text-xs text-zinc-400 mt-2 font-mono">
                {project.clientOrProject} · {project.duration}
              </p>
            </div>

            <div className="relative z-10 space-y-3 pb-6">
              <p className="text-xs text-zinc-300 max-w-xs mx-auto leading-relaxed">
                Ce contenu est diffusé au format vertical sur TikTok. Cliquez ci-dessous pour lancer la vidéo :
              </p>
              <a
                href={tiktokHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 w-full py-3.5 px-6 rounded-lg bg-gradient-to-r from-[#ff0050] to-[#00f2fe] text-black font-extrabold text-sm tracking-wider shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                <span>VOIR SUR TIKTOK</span>
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        ) : youtubeEmbedUrl ? (
          /* Lecteur YouTube Haute Performance Direct CDN */
          <iframe
            ref={iframeRef}
            src={youtubeEmbedUrl}
            title={project.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            loading="eager"
          />
        ) : vimeoEmbedUrl ? (
          /* Lecteur Vimeo 16/9 */
          <iframe
            ref={iframeRef}
            src={vimeoEmbedUrl}
            title={project.title}
            className="w-full h-full border-0"
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen
            loading="eager"
          />
        ) : null}
      </div>
    </div>
  );
};
