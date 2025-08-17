/**
 * Enhanced Game Page Wrapper
 * מעטפת משופרת לדפי משחק שמשלבת את כל הקונטקסטים
 */

'use client';

import { ReactNode } from 'react';
import { GameTypeProvider } from '@/contexts/GameTypeContext';
import { GameProgressProvider } from '@/contexts/GameProgressContext';
import { GameConfigProvider } from '@/contexts/GameConfigContext';
import { GameType } from '@/lib/types/base';

interface EnhancedGameWrapperProps {
  gameType: GameType;
  children: ReactNode;
  maxLevel?: number;
  pointsPerCorrect?: number;
  showProgress?: boolean;
}

/**
 * Enhanced Game Wrapper
 * מעטפת שמשלבת את כל הקונטקסטים הדרושים למשחק
 */
export function EnhancedGameWrapper({
  gameType,
  children,
  maxLevel = 10,
  pointsPerCorrect = 10,
}: EnhancedGameWrapperProps) {
  return (
    <GameTypeProvider initialGameType={gameType}>
      <GameConfigProvider gameType={gameType}>
        <GameProgressProvider 
          maxLevel={maxLevel}
          pointsPerCorrect={pointsPerCorrect}
        >
          {children}
        </GameProgressProvider>
      </GameConfigProvider>
    </GameTypeProvider>
  );
}

/**
 * Complete Game Layout
 * פריסה מלאה למשחק עם כל הקומפוננטים
 */
import { GameProgressDisplay } from './GameProgressDisplay';
import { GameNavigation } from './GameNavigation';
import { AutoGamePage } from './AutoGamePage';

interface CompleteGameLayoutProps {
  gameType: GameType;
  showNavigation?: boolean;
  showProgress?: boolean;
  progressCompact?: boolean;
  maxLevel?: number;
  pointsPerCorrect?: number;
}

export function CompleteGameLayout({
  gameType,
  showNavigation = true,
  showProgress = true,
  progressCompact = false,
  maxLevel = 10,
  pointsPerCorrect = 10,
}: CompleteGameLayoutProps) {
  return (
    <EnhancedGameWrapper 
      gameType={gameType}
      maxLevel={maxLevel}
      pointsPerCorrect={pointsPerCorrect}
    >
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        {showNavigation && (
          <div className="sticky top-0 z-10 bg-white shadow-sm">
            <GameNavigation />
          </div>
        )}
        
        {/* Progress Display */}
        {showProgress && (
          <div className="container mx-auto px-4 py-2">
            <GameProgressDisplay 
              compact={progressCompact}
              showDetailedStats={!progressCompact}
            />
          </div>
        )}
        
        {/* Main Game Content */}
        <main className="container mx-auto px-4 pb-8">
          <AutoGamePage />
        </main>
      </div>
    </EnhancedGameWrapper>
  );
}
