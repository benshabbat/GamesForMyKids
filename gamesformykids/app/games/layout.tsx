'use client';

import { ReactNode } from 'react';
import SimpleGameNavigation from '@/components/shared/SimpleGameNavigation';
import { usePathname } from 'next/navigation';

// GameLayout Interface - עכשיו חלק מהלayout הגלובלי
interface GameLayoutProps {
  children: ReactNode;
  backgroundStyle?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | '7xl';
  className?: string;
}

// GameLayout Component - זמין לכל המשחקים
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
  
  // חילוץ ה-gameId מהנתיב
  const getGameIdFromPath = (path: string): string | null => {
    // דוגמאות נתיבים:
    // /games/memory -> memory
    // /games/drawing -> drawing  
    // /games/puzzles -> puzzles
    // /games/animals -> animals
    // /games/advanced/some-game -> advanced
    
    const segments = path.split('/').filter(Boolean);
    if (segments.length >= 2 && segments[0] === 'games') {
      return segments[1] || null;
    }
    return null;
  };
  
  const gameId = getGameIdFromPath(pathname) || '';

  return (
    <div>
      {/* ניווט פשוט ואחיד לכל המשחקים */}
      {gameId && <SimpleGameNavigation currentGameId={gameId} />}
      
      {/* GameLayout אוטומטי לכל המשחקים */}
      <GameLayout 
        backgroundStyle="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100"
        maxWidth="4xl"
        className=""
      >
        {children}
      </GameLayout>
    </div>
  );
}
