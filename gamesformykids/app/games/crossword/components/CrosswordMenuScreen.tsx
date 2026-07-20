'use client';

import { CROSSWORD_PUZZLES } from '../data/puzzles';

interface Props {
  onStart: (puzzleIndex: number) => void;
}

export default function CrosswordMenuScreen({ onStart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🔤</div>
        <h1 className="text-4xl font-bold text-indigo-800 mb-2">תשבץ עברי</h1>
        <p className="text-lg text-indigo-600">מלא את התשבץ עם מילים עבריות!</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-8 max-w-sm w-full">
        {CROSSWORD_PUZZLES.map((p, i) => (
          <button
            key={p.id}
            onClick={() => onStart(i)}
            className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg border-2 border-indigo-100 hover:border-indigo-400 transition-all active:scale-95 text-center"
          >
            <div className="text-2xl mb-1">🧩</div>
            <div className="font-bold text-indigo-800 text-sm">{p.title}</div>
            <div className="text-xs text-gray-500 mt-1">תשבץ {i + 1}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
