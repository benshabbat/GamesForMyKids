'use client';
import { useState } from 'react';
import {
  TRIVIA_CAT_CATEGORIES,
  TRIVIA_CAT_DIFFICULTIES,
  CATEGORY_EMOJIS,
  DIFFICULTY_EMOJIS,
  DIFFICULTY_COLORS,
  type TriviaCatCategory,
  type TriviaCatDifficulty,
} from '@/lib/quiz/data/trivia-categories';

interface Props {
  onStart: (category: TriviaCatCategory, difficulty: TriviaCatDifficulty) => void;
}

export default function TriviaCategoryPicker({ onStart }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<TriviaCatCategory | null>(null);

  if (!selectedCategory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 flex flex-col items-center justify-center p-6" dir="rtl">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-lg w-full text-center">
          <div className="text-6xl mb-4">🧠</div>
          <h1 className="text-3xl font-bold text-amber-800 mb-2">טריוויה מדורגת</h1>
          <p className="text-amber-600 mb-6">בחר נושא להתחלה!</p>
          <div className="grid grid-cols-2 gap-3">
            {TRIVIA_CAT_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl border-2 border-amber-200 hover:border-amber-400 hover:bg-amber-50 transition-all active:scale-95 bg-white"
              >
                <span className="text-3xl">{CATEGORY_EMOJIS[cat]}</span>
                <span className="font-bold text-gray-700">{cat}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 flex flex-col items-center justify-center p-6" dir="rtl">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center">
        <button
          onClick={() => setSelectedCategory(null)}
          className="mb-4 text-amber-600 hover:text-amber-800 text-sm font-medium flex items-center gap-1"
        >
          ← חזרה לנושאים
        </button>
        <div className="text-5xl mb-3">{CATEGORY_EMOJIS[selectedCategory]}</div>
        <h2 className="text-2xl font-bold text-amber-800 mb-2">{selectedCategory}</h2>
        <p className="text-amber-600 mb-6">בחר רמת קושי:</p>
        <div className="flex flex-col gap-3">
          {TRIVIA_CAT_DIFFICULTIES.map(diff => (
            <button
              key={diff}
              onClick={() => onStart(selectedCategory, diff)}
              className={`bg-gradient-to-r ${DIFFICULTY_COLORS[diff]} text-white font-bold py-4 px-6 rounded-2xl text-lg flex items-center justify-between hover:opacity-90 active:scale-95 transition-all shadow-md`}
            >
              <span>{DIFFICULTY_EMOJIS[diff]}</span>
              <span>{diff}</span>
              <span className="opacity-0">x</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
