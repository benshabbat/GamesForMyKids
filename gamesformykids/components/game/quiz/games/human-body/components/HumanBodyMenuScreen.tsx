'use client';

import type { BodyCategory } from '../data/body';
import { BODY_CATEGORIES, CATEGORY_GRADIENT_COLORS, CATEGORY_LABELS } from '../data/body';

interface Props {
  onStart: (category: BodyCategory) => void;
}

export default function HumanBodyMenuScreen({ onStart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex flex-col items-center justify-center p-6" dir="rtl">
      <div className="text-8xl mb-4">🦴</div>
      <h1 className="text-4xl font-bold text-red-700 mb-2">גוף האדם</h1>
      <p className="text-gray-600 mb-8 text-center">גלה את הפלאות של גוף האדם!</p>
      <div className="grid grid-cols-2 gap-3 mb-8 w-full max-w-sm">
        {BODY_CATEGORIES.map(cat => (
          <button key={cat} onClick={() => onStart(cat)}
            className={`py-3 px-4 rounded-xl font-bold text-white shadow-md active:scale-95 transition-all bg-gradient-to-r ${CATEGORY_GRADIENT_COLORS[cat] ?? 'from-gray-400 to-gray-600'} ${cat === 'הכל' ? 'col-span-2' : ''}`}>
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>
    </div>
  );
}
