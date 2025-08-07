"use client";

import { UniversalGameNavigation } from '@/components/shared';

interface GamesLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout למשחקים עם ניווט אוניברסלי
 */
export default function GamesLayout({ children }: GamesLayoutProps) {
  return (
    <div className="relative">
      {/* Universal Game Navigation */}
      <UniversalGameNavigation />
      
      {/* Game Content */}
      {children}
    </div>
  );
}
