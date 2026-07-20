'use client';

import type { Difficulty } from '../marketStore';

interface MarketMenuScreenProps {
  onStart: (difficulty: Difficulty) => void;
}

export default function MarketMenuScreen({ onStart }: MarketMenuScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-50 to-pink-100 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="text-center mb-8">
        <div className="text-7xl mb-4">🛒</div>
        <h1 className="text-4xl font-bold text-orange-800 mb-2">שוק של ילדים</h1>
        <p className="text-lg text-orange-600 mb-1">שרת לקוחות — תן להם מה שביקשו!</p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        {(['easy', 'medium', 'hard'] as Difficulty[]).map((d) => {
          const labels: Record<Difficulty, { he: string; desc: string; emoji: string }> = {
            easy:   { he: 'קל',    desc: '1-5 פריטים, 30 שניות',  emoji: '🌱' },
            medium: { he: 'בינוני',desc: '1-10 פריטים, 20 שניות', emoji: '🌿' },
            hard:   { he: 'קשה',   desc: '1-20 פריטים, 15 שניות', emoji: '🌳' },
          };
          const l = labels[d];
          return (
            <button
              key={d}
              onClick={() => onStart(d)}
              className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg border-2 border-orange-100 hover:border-orange-400 transition-all active:scale-95 text-right"
            >
              <div className="text-2xl mb-1">{l.emoji}</div>
              <div className="font-bold text-orange-800 text-xl">{l.he}</div>
              <div className="text-sm text-gray-500">{l.desc}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
