'use client';

import { ReactNode } from 'react';
import SimpleGameNavigation from '@/components/shared/SimpleGameNavigation';
import { usePathname } from 'next/navigation';

// GameLayout Interface - עיצוב אחיד למשחקים רגילים
interface GameLayoutProps {
  children: ReactNode;
  backgroundStyle?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | '7xl';
  className?: string;
}

// GameLayout Component - לשימוש אופציונלי במשחקים מיוחדים
export function GameLayout({ 
  children, 
  backgroundStyle = "min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100",
  maxWidth = '4xl',
  className = ""
}: GameLayoutProps) {
  const maxWidthClass = {
    'sm': 'max-w-sm',
    'md': 'max-w-md', 
    'lg': 'max-w-lg',
    'xl': 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl'
  }[maxWidth];

  return (
    <div className={`${backgroundStyle} ${className}`}>
      <div className={`${maxWidthClass} mx-auto px-4 py-8`}>
        {children}
      </div>
    </div>
  );
}

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // זיהוי סוג המשחק
  const getGameInfo = (path: string) => {
    const segments = path.split('/').filter(Boolean);
    if (segments.length >= 2 && segments[0] === 'games') {
      const gameId = segments[1] || '';
      
      // משחקים מיוחדים שצריכים עיצוב מותאם
      const specialGames = ['math', 'hebrew-letters', 'cartoon-generator'];
      
      return {
        gameId,
        isSpecial: specialGames.includes(gameId)
      };
    }
    return { gameId: '', isSpecial: false };
  };
  
  const { gameId, isSpecial } = getGameInfo(pathname);

  return (
    <div>
      {/* ניווט גלובלי לכל המשחקים */}
      {gameId && <SimpleGameNavigation currentGameId={gameId} />}
      
      {/* עיצוב אחיד למשחקים רגילים */}
      {!isSpecial && gameId ? (
        <GameLayout 
          backgroundStyle="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
          maxWidth="4xl"
          className="game-standard-layout"
        >
          {children}
        </GameLayout>
      ) : (
        // משחקים מיוחדים מטפלים בעיצוב בעצמם
        <div className="game-special-layout">
          {children}
        </div>
      )}
    </div>
  );
}
