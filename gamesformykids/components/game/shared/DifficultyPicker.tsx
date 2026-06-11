'use client';

import { useGameDifficulty } from '@/lib/stores/gameDifficultyStore';
import type { DifficultyLevel } from '@/lib/types/games/base';

const LEVELS: { value: DifficultyLevel; label: string; ariaLabel: string; active: string; inactive: string }[] = [
  {
    value: 'easy',
    label: '⭐',
    ariaLabel: 'קל',
    active: 'bg-yellow-400 text-white border-yellow-400',
    inactive: 'bg-white text-yellow-600 border-yellow-300 hover:bg-yellow-50',
  },
  {
    value: 'medium',
    label: '⭐⭐',
    ariaLabel: 'בינוני',
    active: 'bg-blue-500 text-white border-blue-500',
    inactive: 'bg-white text-blue-600 border-blue-300 hover:bg-blue-50',
  },
  {
    value: 'hard',
    label: '⭐⭐⭐',
    ariaLabel: 'קשה',
    active: 'bg-purple-500 text-white border-purple-500',
    inactive: 'bg-white text-purple-600 border-purple-300 hover:bg-purple-50',
  },
];

export function DifficultyPicker() {
  const { difficulty, setDifficulty } = useGameDifficulty();

  return (
    <div className="flex flex-col items-center gap-2 my-3" role="group" aria-label="רמת קושי">
      <p className="text-sm text-gray-500 font-medium">רמת קושי</p>
      <div className="flex gap-2">
        {LEVELS.map(({ value, label, ariaLabel, active, inactive }) => (
          <button
            key={value}
            onClick={() => setDifficulty(value)}
            aria-pressed={difficulty === value}
            aria-label={ariaLabel}
            className={`px-5 py-3 rounded-full border-2 text-base font-bold transition-colors ${
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
