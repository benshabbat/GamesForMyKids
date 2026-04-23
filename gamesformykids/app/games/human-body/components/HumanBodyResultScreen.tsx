'use client';

import type { BodyCategory } from '../data/body';

interface Props {
  score: number;
  total: number;
  category: BodyCategory;
  onRestart: (category: BodyCategory) => void;
}

export default function HumanBodyResultScreen({ score, total, category, onRestart }: Props) {
  const pct = Math.round((score / total) * 100);
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex flex-col items-center justify-center p-6" dir="rtl">
      <div className="text-8xl mb-4">🏆</div>
      <h2 className="text-3xl font-bold text-red-700 mb-4">כל הכבוד!</h2>
      <p className="text-xl text-gray-700 mb-2">ענית נכון על <span className="font-bold text-red-600">{score}</span> מתוך {total}</p>
      <p className="text-lg text-gray-500 mb-8">{pct}% הצלחה</p>
      <div className="flex gap-4">
        <button onClick={() => onRestart(category)} className="px-6 py-3 bg-red-500 text-white rounded-xl font-bold shadow active:scale-95">שחק שוב</button>
      </div>
    </div>
  );
}
