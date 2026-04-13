'use client';

import { usePuzzleStore } from '@/app/games/puzzles/store/puzzleStore';

export default function DifficultySelector({ variant = 'buttons' }: { variant?: 'buttons' | 'select' }) {
  const { difficulty, changeDifficulty } = usePuzzleStore();

  if (variant === 'select') {
    return (
      <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 shadow-inner">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <span className="text-blue-800 font-bold text-lg">🎯 רמת קושי נוכחית:</span>
          <select
            value={difficulty}
            onChange={(e) => changeDifficulty(Number(e.target.value))}
            className="px-4 py-3 border-2 border-blue-300 rounded-xl bg-white text-blue-800 font-semibold text-lg shadow-sm hover:shadow-md transition-all duration-200 focus:ring-2 focus:ring-blue-400"
          >
            <option value={4}>🟢 קל (2x2) - 4 חלקים</option>
            <option value={9}>🟡 בינוני (3x3) - 9 חלקים</option>
            <option value={16}>🟠 קשה (4x4) - 16 חלקים</option>
            <option value={25}>🔴 מומחה (5x5) - 25 חלקים</option>
          </select>
        </div>
        <p className="text-center text-sm sm:text-base text-blue-600 mt-3 font-medium">
          🧩 הפאזל ייווצר עם {difficulty} חלקים ({Math.sqrt(difficulty)}×{Math.sqrt(difficulty)})
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 pt-4 border-t border-gray-200">
      <h4 className="text-lg font-semibold text-gray-700 mb-3 text-center">רמת קושי</h4>
      <div className="flex justify-center gap-2">
        {[2, 3, 4, 5].map((level) => (
          <button
            key={level}
            onClick={() => changeDifficulty(level * level)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
              difficulty === level * level
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {level}x{level}
          </button>
        ))}
      </div>
    </div>
  );
}
