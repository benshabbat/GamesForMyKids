'use client';

import { useGameDifficulty } from '@/lib/stores/gameDifficultyStore';
import type { DifficultyLevel } from '@/lib/types/games/base';

const LEVELS: { value: DifficultyLevel; label: string; active: string; inactive: string }[] = [
  {
    value: 'easy',
    label: 'קל',
    active: 'bg-green-500 text-white border-green-500',
    inactive: 'bg-white text-green-600 border-green-300 hover:bg-green-50',
  },
  {
    value: 'medium',
    label: 'רגיל',
    active: 'bg-yellow-500 text-white border-yellow-500',
    inactive: 'bg-white text-yellow-600 border-yellow-300 hover:bg-yellow-50',
  },
  {
    value: 'hard',
    label: 'קשה',
    active: 'bg-red-500 text-white border-red-500',
    inactive: 'bg-white text-red-600 border-red-300 hover:bg-red-50',
  },
];

export function DifficultyPicker() {
  const { difficulty, setDifficulty } = useGameDifficulty();

  return (
    <div className="flex flex-col items-center gap-2 my-3">
      <p className="text-sm text-gray-500 font-medium">רמת קושי</p>
      <div className="flex gap-2">
        {LEVELS.map(({ value, label, active, inactive }) => (
          <button
            key={value}
            onClick={() => setDifficulty(value)}
            className={`px-4 py-1.5 rounded-full border-2 text-sm font-bold transition-colors ${
              difficulty === value ? active : inactive
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
