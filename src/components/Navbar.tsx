import React, { useState } from 'react';
import { PageTab } from '../types';
import { Menu, X, Phone, Mail, Instagram, Linkedin, Youtube } from 'lucide-react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { INSTAGRAM_URL, LINKEDIN_URL, YOUTUBE_CHANNEL_URL, TIKTOK_URL } from '../data/videos';

const TikTokIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.34 22a6.33 6.33 0 0 0 6.33-6.33V9.11a8.16 8.16 0 0 0 4.69 1.48v-3.9a4.84 4.84 0 0 1-.77-.001z"/>
  </svg>
);

interface NavbarProps {
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageTab; label: string }[] = [
    { id: 'accueil', label: 'ACCUEIL' },
    { id: 'apropos', label: 'À PROPOS' },
    { id: 'realisations', label: 'RÉALISATIONS' },
    { id: 'services', label: 'PRESTATIONS' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleNavClick = (tab: PageTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 theme-bg-header backdrop-blur-md border-b theme-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('accueil')}
          className="cursor-pointer group flex items-center space-x-3 select-none"
        >
          <div className="text-xl sm:text-2xl font-black tracking-tight theme-text-heading flex items-center">
            <span className="theme-accent-text font-mono mr-1.5">[</span>
            <span className="group-hover:theme-accent-text transition-colors duration-200">VDR</span>
            <span className="theme-accent-text font-mono ml-1.5">]</span>
          </div>
          <div className="hidden md:block pl-3 border-l theme-border-subtle">
            <div className="text-xs font-bold theme-text-main tracking-wider">PRODUCTION</div>
          </div>
        </div>

        {/* Location & Contact Badge */}
        <div className="hidden xl:flex items-center space-x-4 text-xs theme-text-muted font-mono">
          <a 
            href="tel:0681983382" 
            className="hover:theme-accent-text transition-colors flex items-center space-x-1.5 whitespace-nowrap shrink-0"
          >
            <Phone className="w-3.5 h-3.5 theme-accent-text shrink-0" />
            <span className="whitespace-nowrap">06 81 98 33 82</span>
          </a>
          <span className="theme-text-subtle">|</span>
          <div className="flex items-center space-x-2">
            <a 
              href={INSTAGRAM_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-1 rounded-sm theme-bg-subtle hover:theme-accent-subtle-bg border theme-border hover:border-pink-500 transition-colors" 
              title="Instagram @dosreisvincentprod"
            >
              <Instagram className="w-3.5 h-3.5 text-[#E4405F]" />
            </a>
            <a 
              href={TIKTOK_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-1 rounded-sm theme-bg-subtle hover:theme-accent-subtle-bg border theme-border hover:border-cyan-500 transition-colors" 
              title="TikTok @vincent.dos.reis"
            >
              <TikTokIcon className="w-3.5 h-3.5 text-[#00f2fe]" />
            </a>
            <a 
              href={LINKEDIN_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-1 rounded-sm theme-bg-subtle hover:theme-accent-subtle-bg border theme-border hover:border-blue-500 transition-colors" 
              title="LinkedIn Vincent Dos Reis"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
            </a>
            <a 
              href={YOUTUBE_CHANNEL_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-1 rounded-sm theme-bg-subtle hover:theme-accent-subtle-bg border theme-border hover:border-red-600 transition-colors" 
              title="YouTube Vincent Dos Reis"
            >
              <Youtube className="w-3.5 h-3.5 text-[#FF0000]" />
            </a>
          </div>
        </div>

        {/* Right Actions: Contact Button, Single Theme Switcher, Menu Toggle */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          <button
            onClick={() => handleNavClick('contact')}
            className="inline-flex items-center justify-center h-[30px] px-2.5 sm:px-3 theme-accent-bg theme-accent-bg-hover font-extrabold text-[10px] sm:text-[11px] uppercase tracking-wider transition-all duration-200 space-x-1 shadow-sm rounded-sm active:scale-95 cursor-pointer whitespace-nowrap leading-none"
          >
            <Mail className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            <span>Un projet?</span>
          </button>

          <div className="flex items-center space-x-1.5 sm:space-x-2 pl-1.5 sm:pl-2 border-l theme-border-subtle h-[30px]">
            <ThemeSwitcher />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center h-[30px] px-2.5 sm:px-3 theme-text-main theme-bg-card border theme-border rounded-sm focus:outline-none cursor-pointer space-x-1 hover:theme-bg-subtle transition-colors leading-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-3.5 h-3.5 theme-accent-text" /> : <Menu className="w-3.5 h-3.5 theme-accent-text" />}
              <span className="hidden sm:inline text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase">MENU</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dropdown Drawer Menu for all screen sizes */}
      {mobileMenuOpen && (
        <div className="theme-bg-card border-b theme-border px-4 sm:px-6 lg:px-8 pt-4 pb-6 space-y-4 animate-fadeIn shadow-2xl max-w-7xl mx-auto">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 text-xs sm:text-sm font-mono font-bold tracking-wider rounded-sm transition-all flex items-center justify-between cursor-pointer border ${
                    isActive
                      ? 'theme-accent-subtle-bg theme-accent-text border-[var(--accent-primary)] shadow-sm'
                      : 'theme-text-muted hover:theme-text-heading theme-bg-subtle/50 hover:theme-bg-subtle border-transparent'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t theme-border-subtle flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono theme-text-muted px-2 lg:hidden">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full theme-accent-bg animate-pulse"></span>
              <span className="theme-text-main font-semibold">Bretagne, France, International</span>
            </div>
            
            <a
              href="tel:0681983382"
              className="flex items-center space-x-2 px-3 py-1.5 theme-bg-subtle border theme-border rounded-sm text-xs font-mono theme-text-main hover:theme-accent-text transition-colors whitespace-nowrap shrink-0"
            >
              <Phone className="w-3.5 h-3.5 theme-accent-text shrink-0" />
              <span className="whitespace-nowrap">06 81 98 33 82</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
