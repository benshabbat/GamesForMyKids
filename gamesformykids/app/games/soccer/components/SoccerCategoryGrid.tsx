'use client';

import { SOCCER_CATEGORIES, type SoccerCategory } from '../data/soccer';
import { CATEGORY_COLORS, CATEGORY_ICONS } from './SoccerShared';

interface Props {
  onStart: (cat: SoccerCategory) => void;
}

export default function SoccerCategoryGrid({ onStart }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3 w-full max-w-sm mb-6">
      {SOCCER_CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onStart(cat)}
          className={`py-3 px-4 rounded-xl font-bold text-white shadow-lg active:scale-95 transition bg-gradient-to-br ${CATEGORY_COLORS[cat] ?? 'from-green-500 to-emerald-600'} ${cat === 'הכל' ? 'col-span-2 py-4 text-xl' : ''}`}
        >
          <span className="me-1">{CATEGORY_ICONS[cat] ?? '⚽'}</span> {cat}
        </button>
      ))}
    </div>
  );
}
