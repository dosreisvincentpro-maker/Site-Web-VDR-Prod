import React, { useRef, useEffect, useCallback } from 'react';
import { VideoProject } from '../types';
import { X } from 'lucide-react';
import { exitFullScreenSafe } from '../utils/fullscreen';

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

  const isTikTok = project.isTikTokOnly || project.id === 'vdr-26' || project.id === 'vdr-28' || project.id === 'vdr-29';
  const tiktokId = project.tiktokVideoId || '7666918428006944022';
  const originParam = typeof window !== 'undefined' ? encodeURIComponent(window.location.origin) : '';

  // URL optimisée haute performance :
  // - youtube.com avec CDN Google direct pour éliminer tout lag / buffering
  // - rel=0 pour restreindre les suggestions
  // - playsinline=1 pour support mobile immédiat
  // - autoplay=1 pour lecture immédiate
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
      {/* Bouton pour fermer (très visible et accessible sur desktop & mobile) */}
      <button
        onClick={handleClose}
        className="absolute top-3 right-3 sm:top-5 sm:right-6 z-50 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-black/80 hover:bg-zinc-900 text-white border border-white/30 hover:border-white/70 transition-all shadow-xl active:scale-95 cursor-pointer backdrop-blur-md flex items-center space-x-2 group"
        aria-label="Fermer la vidéo"
        title="Fermer la vidéo (Échap)"
      >
        <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-200" />
        <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-white">
          Fermer
        </span>
      </button>

      {/* Titre discret de la vidéo en haut à gauche */}
      <div className="absolute top-3 left-3 sm:top-5 sm:left-6 z-50 pointer-events-none flex items-center space-x-2.5 max-w-[calc(100%-140px)]">
        <span className="px-2 py-0.5 bg-red-600/90 text-white font-mono font-extrabold text-[10px] sm:text-xs rounded-xs tracking-wider uppercase shadow-md shrink-0">
          Full HD
        </span>
        <span className="text-xs sm:text-sm font-mono text-white/90 font-bold truncate drop-shadow-md">
          {project.title}
        </span>
      </div>

      {/* Lecteur à 100 % de la largeur au format 16/9 sur fond noir avec accélération matérielle GPU */}
      <div 
        className="w-full aspect-video max-h-screen relative flex items-center justify-center bg-black"
        style={{ transform: 'translateZ(0)', willChange: 'transform' }}
      >
        {isTikTok ? (
          /* Lecteur TikTok vertical si projet dédié TikTok */
          <div className="w-full max-w-[360px] aspect-[9/16] max-h-screen relative bg-black">
            <iframe
              src={`https://www.tiktok.com/embed/v2/${tiktokId}?lang=fr-FR&autoplay=1&playsinline=1`}
              title={project.title}
              className="w-full h-full border-0"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
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
