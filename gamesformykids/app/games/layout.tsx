import UniversalGameNavigation from '@/components/game/universal/navigation/UniversalGameNavigation';
import SwipeNavigator from '@/components/game/shared/SwipeNavigator';
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

      {/* Game Content — pt reserves space below the fixed nav bar (~56px = top-4 + button height) */}
      <div className="pt-16 md:pt-20">
        {children}
      </div>
    </div>
  );
}
