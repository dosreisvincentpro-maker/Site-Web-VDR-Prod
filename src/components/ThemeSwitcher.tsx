import React, { useState } from 'react';
import { useTheme, ThemeMode } from '../context/ThemeContext';
import { Palette, Check, Moon, Compass } from 'lucide-react';

interface ThemeSwitcherProps {
  className?: string;
  buttonClassName?: string;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ className = '', buttonClassName = '' }) => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes: { id: ThemeMode; label: string; desc: string; icon: React.ReactNode; colorPreview: string }[] = [
    {
      id: 'dark-slate',
      label: 'Sombre Cinéma',
      desc: 'Fond sombre et profond, contrastes cinéma & orange VDR',
      icon: <Moon className="w-4 h-4 text-[#FF7300]" />,
      colorPreview: 'bg-[#14171F] border-[#FF7300]',
    },
    {
      id: 'pastel-cyan',
      label: 'Pastel Bleu Lagon',
      desc: 'Teintes pastel azur fraîches et aquatiques',
      icon: <Compass className="w-4 h-4 text-[#2B8A9E]" />,
      colorPreview: 'bg-[#EEF6F8] border-[#2B8A9E]',
    },
  ];

  const currentThemeObj = themes.find((t) => t.id === theme) || themes[0];

  return (
    <div className={`relative inline-block text-left ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`h-[30px] px-2.5 sm:px-3 rounded-sm border transition-all duration-200 flex items-center justify-center space-x-1.5 text-xs font-mono font-bold tracking-wider cursor-pointer shadow-sm theme-bg-card theme-border hover:theme-border-accent leading-none ${buttonClassName}`}
        title="Changer la palette de couleurs"
      >
        <Palette className="w-3 h-3 sm:w-3.5 sm:h-3.5 theme-accent-text shrink-0" />
        <span className="theme-text-main">Thèmes</span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)} 
          />

          {/* Switcher Dropdown */}
          <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-sm shadow-2xl z-50 p-2 theme-bg-card theme-border border animate-fadeIn space-y-1">
            <div className="px-3 py-2 border-b theme-border-subtle flex items-center justify-between text-[11px] font-mono theme-text-subtle">
              <span>PALETTES DE COULEURS</span>
              <Palette className="w-3.5 h-3.5 theme-accent-text" />
            </div>

            <div className="space-y-1 pt-1 max-h-80 overflow-y-auto">
              {themes.map((t) => {
                const isSelected = theme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTheme(t.id);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-sm transition-all flex items-start space-x-3 cursor-pointer ${
                      isSelected
                        ? 'theme-accent-subtle-bg theme-accent-subtle-border border'
                        : 'hover:theme-bg-subtle border border-transparent'
                    }`}
                  >
                    <div className={`p-1.5 rounded-sm border shrink-0 mt-0.5 ${t.colorPreview}`}>
                      {t.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold theme-text-heading truncate">{t.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 theme-accent-text shrink-0 ml-1" />}
                      </div>
                      <p className="text-[10px] theme-text-muted leading-tight mt-0.5">
                        {t.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

          </div>
        </>
      )}
    </div>
  );
};
