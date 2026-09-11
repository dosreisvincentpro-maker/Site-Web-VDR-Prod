export type PageTab = 'accueil' | 'realisations' | 'apropos' | 'services' | 'contact';

export type VideoCategory = 'all' | 'showreel' | 'pub' | 'fiction' | 'clip' | 'corporate' | 'podcast' | 'tv' | 'social';

export interface VideoProject {
  id: string;
  title: string;
  category: 'showreel' | 'pub' | 'fiction' | 'clip' | 'corporate' | 'podcast' | 'tv' | 'social';
  categories?: ('showreel' | 'pub' | 'fiction' | 'clip' | 'corporate' | 'podcast' | 'tv' | 'social')[];
  categoryLabel: string;
  youtubeId?: string; // YouTube Video ID or playlist reference
  youtubeUrl?: string; // Direct YouTube link to the video/channel
  vimeoId?: string; // Vimeo Video ID
  vimeoUrl?: string; // Direct Vimeo link
  tiktokUrl?: string; // Direct TikTok video URL
  tiktokVideoId?: string; // TikTok video ID for embedding
  isTikTokOnly?: boolean; // Flag if video is exclusively TikTok layout
  duration: string;
  year: string;
  clientOrProject: string;
  description: string;
  thumbnail: string;
  role: string; // e.g. "Réalisateur & Scénariste", "Réalisateur & Direction Artistique"
  featured?: boolean;
  tags: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  deliverables: string[];
  highlights: string[];
  experience?: string;
  isFeatured?: boolean;
  isOptional?: boolean;
}

export interface BioTimelineItem {
  year: string;
  title: string;
  role: string;
  description: string;
  highlight?: string;
  imageUrl?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  location: string;
  message: string;
}
