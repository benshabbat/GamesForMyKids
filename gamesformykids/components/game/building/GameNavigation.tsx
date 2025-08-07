'use client';

import Link from 'next/link';
import { Home, ArrowLeft, ArrowRight } from 'lucide-react';
import { createElement, useEffect } from 'react';

interface NavigationButton {
  href: string;
  title: string;
  icon: React.ComponentType<{ className?: string }> | React.ReactNode;
  className?: string;
}

interface GameNavigationProps {
  previousGame?: NavigationButton;
  nextGame?: NavigationButton;
  showHomeButton?: boolean;
  currentGameTitle?: string;
}

function renderIcon(icon: React.ComponentType<{ className?: string }> | React.ReactNode, className: string = "w-4 h-4 md:w-5 md:h-5") {
  if (typeof icon === 'function') {
    return createElement(icon, { className });
  }
  return icon;
}

export default function GameNavigation({ 
  previousGame, 
  nextGame, 
  showHomeButton = true,
  currentGameTitle 
}: GameNavigationProps) {
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Escape key - go home
      if (event.key === 'Escape' && showHomeButton) {
        window.location.href = '/';
        return;
      }
      
      // Arrow keys for navigation
      if (event.key === 'ArrowRight' && nextGame) {
        window.location.href = nextGame.href;
        return;
      }
      
      if (event.key === 'ArrowLeft' && previousGame) {
        window.location.href = previousGame.href;
        return;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [previousGame, nextGame, showHomeButton]);

  return (
    <div className="fixed top-4 left-4 right-4 z-50 flex justify-between items-center pointer-events-none">
      {/* Left side - Home and Previous */}
      <div className="flex gap-2 pointer-events-auto">
        {showHomeButton && (
          <Link 
            href="/" 
            className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 font-bold py-2 px-3 md:py-3 md:px-4 rounded-xl shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2 text-sm md:text-base border-2 border-gray-200 hover:border-purple-300"
            title="חזרה לעמוד הראשי (ESC)"
          >
            <Home className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden md:inline">בית</span>
          </Link>
        )}
        
        {previousGame && (
          <Link 
            href={previousGame.href}
            className={`bg-blue-500/90 backdrop-blur-sm hover:bg-blue-600 text-white font-bold py-2 px-3 md:py-3 md:px-4 rounded-xl shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2 text-sm md:text-base border-2 border-blue-400 hover:border-blue-300 ${previousGame.className || ''}`}
            title={`${previousGame.title} (←)`}
          >
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            {renderIcon(previousGame.icon)}
            <span className="hidden lg:inline">{previousGame.title}</span>
          </Link>
        )}
      </div>

      {/* Center - Current game indicator */}
      {currentGameTitle && (
        <div className="bg-black/20 backdrop-blur-sm text-white px-3 py-1 md:px-4 md:py-2 rounded-xl text-sm md:text-base font-medium pointer-events-auto">
          {currentGameTitle}
        </div>
      )}

      {/* Right side - Next */}
      <div className="flex gap-2 pointer-events-auto">
        {nextGame && (
          <Link 
            href={nextGame.href}
            className={`bg-green-500/90 backdrop-blur-sm hover:bg-green-600 text-white font-bold py-2 px-3 md:py-3 md:px-4 rounded-xl shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2 text-sm md:text-base border-2 border-green-400 hover:border-green-300 ${nextGame.className || ''}`}
            title={`${nextGame.title} (→)`}
          >
            <span className="hidden lg:inline">{nextGame.title}</span>
            {renderIcon(nextGame.icon)}
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
          </Link>
        )}
      </div>
    </div>
  );
}
