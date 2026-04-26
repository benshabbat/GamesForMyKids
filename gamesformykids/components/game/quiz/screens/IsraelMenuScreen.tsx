'use client';
import type { IsraelCategory } from '@/lib/quiz/data/israel';
import { CATEGORIES, CATEGORY_COLORS } from '@/lib/quiz/data/israel';

interface Props {
  onStart: (cat: IsraelCategory) => void;
}

export default function IsraelMenuScreen({ onStart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="text-8xl mb-6">🇮🇱</div>
        <h1 className="text-3xl font-bold text-blue-700 mb-2">ישראל שלי</h1>
        <p className="text-gray-500 mb-4">בחר קטגוריה ובחן את הידע שלך!</p>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => onStart(cat)}
              className={`py-3 px-2 rounded-xl font-bold text-sm transition-all shadow hover:opacity-90 ${CATEGORY_COLORS[cat] ?? 'bg-gray-400 text-white'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
