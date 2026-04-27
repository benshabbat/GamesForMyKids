'use client';
import { useAnimalsSession } from '../hooks/useAnimalsSession';
import { CATEGORY_ORDER, CATEGORY_DISPLAY } from '../data/animals';

export default function AnimalsMenuScreen() {
  const { startGame } = useAnimalsSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 p-4" dir="rtl">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">🐘</div>
          <h1 className="text-3xl font-bold text-green-800 mb-2">בעלי חיים</h1>
          <p className="text-green-600">בחר קטגוריה ותתחיל!</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {CATEGORY_ORDER.map(cat => (
            <button key={cat} onClick={() => startGame(cat)}
              className="py-5 rounded-2xl font-bold text-lg text-white shadow-lg hover:scale-105 active:scale-95 transition-all bg-gradient-to-br from-green-500 to-teal-600">
              {CATEGORY_DISPLAY[cat]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
