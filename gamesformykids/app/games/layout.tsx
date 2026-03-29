"use client";

import { UniversalGameNavigation } from '@/components/shared';
import { ReactNode } from 'react';

interface GamesLayoutProps {
  children: ReactNode;
}

/**
 * Layout למשחקים עם ניווט אוניברסלי
 */
export default function GamesLayout({ children }: GamesLayoutProps) {
  return (
    <div className="relative">
      {/* Universal Game Navigation — fixed, floats above content */}
      <UniversalGameNavigation />
      
      {/* Game Content — pt reserves space below the fixed nav bar (~56px = top-4 + button height) */}
      <div className="pt-16 md:pt-20">
        {children}
      </div>
    </div>
  );
}
