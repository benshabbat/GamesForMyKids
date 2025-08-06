'use client';

import SimpleGameNavigation from '@/components/shared/SimpleGameNavigation';
import { usePathname } from 'next/navigation';

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
      return segments[1];
    }
    return null;
  };
  
  const gameId = getGameIdFromPath(pathname);

  return (
    <div>
      {/* ניווט פשוט ואחיד לכל המשחקים */}
      {gameId && <SimpleGameNavigation currentGameId={gameId} />}
      {children}
    </div>
  );
}
