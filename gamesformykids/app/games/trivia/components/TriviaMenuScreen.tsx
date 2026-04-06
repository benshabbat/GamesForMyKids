'use client';
import type { TriviaCategory } from '../data/questions';
import { CATEGORIES, CATEGORY_EMOJIS } from '../data/questions';

interface Props {
  onStart: (category: TriviaCategory | 'all') => void;
}

export default function TriviaMenuScreen({ onStart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 p-4" dir="rtl">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">🎯</div>
          <h1 className="text-3xl font-bold text-amber-800 mb-2">ידע כללי</h1>
          <p className="text-amber-600">בחר נושא או שחק הכל!</p>
        </div>
        <div className="flex flex-col gap-3 mb-4">
          <button
            onClick={() => onStart('all')}
            className="w-full py-5 rounded-2xl text-white font-bold text-xl bg-gradient-to-l from-amber-500 to-yellow-500 shadow-lg hover:opacity-90 active:scale-95 transition-all"
          >
            🎯 שאלות מכל הנושאים!
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => onStart(cat)}
              className="p-4 rounded-2xl font-bold text-gray-700 shadow bg-white border-2 border-amber-200 hover:border-amber-400 hover:bg-amber-50 active:scale-95 transition-all text-right"
            >
              <div className="text-3xl mb-1">{CATEGORY_EMOJIS[cat]}</div>
              <div>{cat}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
