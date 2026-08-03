import React from 'react';
import { VideoProject } from '../types';
import { Play, Youtube, Clock } from 'lucide-react';

const TikTokIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.34 22a6.33 6.33 0 0 0 6.33-6.33V9.11a8.16 8.16 0 0 0 4.69 1.48v-3.9a4.84 4.84 0 0 1-.77-.001z"/>
  </svg>
);

interface VideoCardProps {
  project: VideoProject;
  onSelect: (project: VideoProject) => void;
  showDate?: boolean;
}

export const VideoCard: React.FC<VideoCardProps> = ({ project, onSelect, showDate = true }) => {
  const isTopChef = project.id === 'vdr-26' || project.id === 'vdr-28' || project.id === 'vdr-29' || project.title.toLowerCase().includes('top chef') || project.isTikTokOnly;

  return (
    <div className="group relative theme-bg-card border theme-border rounded-sm overflow-hidden hover:theme-accent-border transition-all duration-300 flex flex-col h-full shadow-md hover:shadow-xl">
      
      {/* Thumbnail Container */}
      <div 
        onClick={() => onSelect(project)}
        className="relative aspect-video w-full bg-slate-800/40 overflow-hidden cursor-pointer"
      >
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 opacity-100 filter brightness-125 contrast-105 group-hover:brightness-135"
          loading="lazy"
          onLoad={(e) => {
            const target = e.currentTarget;
            if (target.naturalWidth <= 120 && target.src.includes('maxresdefault.jpg')) {
              target.src = target.src.replace('maxresdefault.jpg', 'hqdefault.jpg');
            } else if (target.naturalWidth <= 120 && target.src.includes('hqdefault.jpg')) {
              target.src = target.src.replace('hqdefault.jpg', 'mqdefault.jpg');
            }
          }}
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src.includes('maxresdefault.jpg')) {
              target.src = target.src.replace('maxresdefault.jpg', 'hqdefault.jpg');
            } else if (target.src.includes('sddefault.jpg')) {
              target.src = target.src.replace('sddefault.jpg', 'hqdefault.jpg');
            } else if (target.src.includes('hqdefault.jpg')) {
              target.src = target.src.replace('hqdefault.jpg', 'mqdefault.jpg');
            } else if (target.src.includes('mqdefault.jpg')) {
              target.src = target.src.replace('mqdefault.jpg', '0.jpg');
            }
          }}
        />

        {/* Soft, light gradient overlay for readability at the bottom only */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-85 group-hover:opacity-100 transition-opacity">
          <div className="w-13 h-13 rounded-full theme-accent-bg flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
            <Play className="w-5 h-5 ml-0.5 fill-current" />
          </div>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/75 backdrop-blur-sm text-[11px] font-mono text-white border border-white/20 rounded-sm flex items-center space-x-1">
          <Clock className="w-3 h-3 theme-accent-text" />
          <span>{project.duration}</span>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3 px-2.5 py-1 theme-bg-header backdrop-blur-sm text-[10px] font-mono font-bold tracking-wider theme-accent-text border theme-accent-subtle-border rounded-sm shadow-sm">
          [ {project.categoryLabel.toUpperCase()} ]
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between text-xs font-mono theme-text-muted mb-1.5">
            <span className="theme-accent-text font-semibold">{project.role}</span>
            {showDate && <span>{project.year}</span>}
          </div>

          <h3 
            onClick={() => onSelect(project)}
            className="text-base sm:text-lg font-bold theme-text-heading group-hover:theme-accent-text transition-colors cursor-pointer"
          >
            {project.title}
          </h3>

          <p className="text-[10px] theme-text-muted mt-2 leading-snug whitespace-pre-line max-h-60 overflow-y-auto pr-1">
            {project.description}
          </p>
        </div>

        {/* Footer Links & Actions */}
        <div className="pt-3 border-t theme-border-subtle flex items-center justify-between text-xs font-mono">
          <button
            onClick={() => onSelect(project)}
            className="theme-text-main hover:theme-accent-text font-bold flex items-center space-x-1 transition-colors cursor-pointer"
          >
            <span>REGARDER</span>
            <span className="theme-accent-text font-mono">›</span>
          </button>

          <div className="flex items-center space-x-2">
            {project.tiktokUrl && (
              <a
                href={project.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Ouvrir sur TikTok"
                className={`${isTopChef ? 'flex' : 'hidden lg:flex'} p-1.5 theme-text-muted hover:text-[#00f2fe] hover:theme-bg-subtle rounded-sm transition-all items-center space-x-1`}
              >
                <TikTokIcon className="w-3.5 h-3.5 text-[#00f2fe]" />
                <span className="text-[10px] theme-text-subtle">TikTok</span>
              </a>
            )}
            {project.youtubeUrl && (
              <a
                href={project.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Ouvrir sur YouTube"
                className={`p-1.5 theme-text-muted hover:text-red-600 hover:theme-bg-subtle rounded-sm transition-all flex items-center space-x-1 ${
                  project.tiktokUrl && !isTopChef ? 'flex' : ''
                }`}
              >
                <Youtube className="w-4 h-4 text-red-500" />
                <span className="text-[10px] theme-text-subtle">YouTube</span>
              </a>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
