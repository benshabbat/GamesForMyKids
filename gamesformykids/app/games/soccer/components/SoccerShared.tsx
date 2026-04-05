'use client';

import React from 'react';

export function GoalAnimation() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="flex flex-col items-center animate-bounce">
        <div className="text-9xl drop-shadow-2xl">⚽</div>
        <div className="text-5xl font-black text-white mt-2 drop-shadow-2xl"
          style={{ textShadow: '0 0 20px #22c55e, 0 0 40px #22c55e' }}>
          GOOOAL!
        </div>
      </div>
    </div>
  );
}

export function PitchBackground({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen relative"
      style={{ background: 'linear-gradient(180deg, #166534 0%, #15803d 30%, #16a34a 60%, #15803d 100%)' }}
    >
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white -translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-white" />
        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white -translate-x-1/2" />
      </div>
      {children}
    </div>
  );
}

export const CATEGORY_COLORS: Record<string, string> = {
  'הכל':    'from-green-500 to-emerald-600',
  'כללי':   'from-blue-500 to-blue-700',
  'שחקנים': 'from-yellow-500 to-orange-500',
  'קבוצות': 'from-red-500 to-red-700',
  'חוקים':  'from-purple-500 to-purple-700',
  'טכניקה': 'from-teal-500 to-teal-700',
};

export const CATEGORY_ICONS: Record<string, string> = {
  'הכל':    '⚽',
  'כללי':   '🏟️',
  'שחקנים': '⭐',
  'קבוצות': '🎽',
  'חוקים':  '🟨',
  'טכניקה': '👟',
};
