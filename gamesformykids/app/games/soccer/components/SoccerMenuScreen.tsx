'use client';

import { PitchBackground, CATEGORY_COLORS, CATEGORY_ICONS } from './SoccerShared';

interface Props {
  categories: readonly string[];
  onStart: (category: string) => void;
}

export default function SoccerMenuScreen({ categories, onStart }: Props) {
  return (
    <PitchBackground>
      <div className="flex flex-col items-center justify-center min-h-screen p-6" dir="rtl">
        <div className="text-8xl mb-2 drop-shadow-xl">⚽</div>
        <h1 className="text-5xl font-black text-white mb-1 drop-shadow-lg">כדורגל</h1>
        <p className="text-green-200 mb-8 text-center text-lg">שאלות על ספורט המלכים!</p>
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm mb-6">
          {categories.map(cat => (
            <button key={cat}
              onClick={() => onStart(cat)}
              className={`py-3 px-4 rounded-xl font-bold text-white shadow-lg active:scale-95 transition-all bg-gradient-to-br ${CATEGORY_COLORS[cat] ?? 'from-green-500 to-emerald-600'} ${cat === 'הכל' ? 'col-span-2 py-4 text-xl' : ''}`}
            >
              <span className="mr-1">{CATEGORY_ICONS[cat] ?? '⚽'}</span> {cat}
            </button>
          ))}
        </div>
        <div className="flex gap-6 text-3xl">
          {['🥅', '⚽', '🏃', '🧤', '🏆'].map((e, i) => (
            <div key={i} className="text-white opacity-80 animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>{e}</div>
          ))}
        </div>
      </div>
    </PitchBackground>
  );
}
