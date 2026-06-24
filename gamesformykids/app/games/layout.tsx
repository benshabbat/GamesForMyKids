import UniversalGameNavigation from '@/components/game/universal/navigation/UniversalGameNavigation';
import SwipeNavigator from '@/components/game/shared/SwipeNavigator';
import ScreenTimeOverlay from '@/components/game/shared/ScreenTimeOverlay';
import ChampionshipOverlay from '@/components/game/shared/ChampionshipOverlay';
import { ReactNode } from 'react';

interface GamesLayoutProps {
  children: ReactNode;
}

/**
 * Layout למשחקים עם ניווט אוניברסלי.
 * Server Component — UniversalGameNavigation מביא "use client" בעצמו.
 */
export default function GamesLayout({ children }: GamesLayoutProps) {
  return (
    <div className="relative">
      {/* Universal Game Navigation — fixed, floats above content */}
      <UniversalGameNavigation />

      {/* RTL swipe gesture handler + first-visit hint */}
      <SwipeNavigator />

      {/* Screen time overlay — only renders when limit is set and reached */}
      <ScreenTimeOverlay />

      {/* Championship mode bottom bar — only renders when a championship is active */}
      <ChampionshipOverlay />

      {/* Game Content — pt reserves space below the fixed nav bar (~56px = top-4 + button height) */}
      <div className="pt-16 md:pt-20">
        {children}
      </div>
    </div>
  );
}
