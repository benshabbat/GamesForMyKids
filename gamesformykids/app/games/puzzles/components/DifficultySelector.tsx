'use client';

import { usePuzzleContext } from '@/contexts';

export default function DifficultySelector() {
  const { state, changeDifficulty } = usePuzzleContext();
  const { difficulty } = state;
  const onDifficultyChange = changeDifficulty;
  return (
    <div className="mt-6 pt-4 border-t border-gray-200">
      <h4 className="text-lg font-semibold text-gray-700 mb-3 text-center">רמת קושי</h4>
      <div className="flex justify-center gap-2">
        {[2, 3, 4, 5].map((level) => (
          <button
            key={level}
            onClick={() => onDifficultyChange(level * level)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
              difficulty === level
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
