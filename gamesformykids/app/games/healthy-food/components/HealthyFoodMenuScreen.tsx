'use client';

import type { FoodQuestion } from '../data/food';

interface Props {
  preview: FoodQuestion[];
  onStart: () => void;
}

export default function HealthyFoodMenuScreen({ preview, onStart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 to-green-100 flex flex-col items-center justify-center p-6" dir="rtl">
      <div className="text-8xl mb-4">🥗</div>
      <h1 className="text-4xl font-bold text-green-700 mb-2">אוכל בריא</h1>
      <p className="text-gray-600 mb-6 text-center">גלה את סודות התזונה הנכונה!</p>
      <div className="grid grid-cols-4 gap-2 mb-8">
        {preview.map(f => (
          <div key={f.id} className="bg-white rounded-xl p-2 text-center shadow">
            <div className="text-3xl">{f.emoji}</div>
            <div className="text-xs text-gray-600 mt-1">{f.food}</div>
          </div>
        ))}
      </div>
      <button onClick={onStart} className="px-10 py-4 bg-gradient-to-r from-green-500 to-lime-500 text-white text-xl font-bold rounded-2xl shadow-lg active:scale-95 transition-all">
        🥦 התחל משחק!
      </button>
    </div>
  );
}
