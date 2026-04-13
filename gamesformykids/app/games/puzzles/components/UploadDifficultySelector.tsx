'use client';

import { usePuzzleContext } from '@/contexts';

export default function UploadDifficultySelector() {
  const { difficulty, changeDifficulty } = usePuzzleContext();

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
