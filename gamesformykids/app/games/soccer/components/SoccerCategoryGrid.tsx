'use client';

import type { SoccerCategory } from '../data/soccer';
import { useSoccerGame } from '../useSoccerGame';
import { CATEGORY_COLORS, CATEGORY_ICONS } from './SoccerShared';

export default function SoccerCategoryGrid() {
  const { categories, startGame } = useSoccerGame();

  return (
    <div className="grid grid-cols-2 gap-3 w-full max-w-sm mb-6">
      {(categories as readonly SoccerCategory[]).map((cat) => (
        <button
          key={cat}
          onClick={() => startGame(cat)}
          className={`py-3 px-4 rounded-xl font-bold text-white shadow-lg active:scale-95 transition-all bg-gradient-to-br ${CATEGORY_COLORS[cat] ?? 'from-green-500 to-emerald-600'} ${cat === 'הכל' ? 'col-span-2 py-4 text-xl' : ''}`}
        >
          <span className="me-1">{CATEGORY_ICONS[cat] ?? '⚽'}</span> {cat}
        </button>
      ))}
    </div>
  );
}
