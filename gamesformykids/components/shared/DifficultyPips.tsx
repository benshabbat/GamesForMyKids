import type { GameDifficulty } from '@/lib/types/games/base';

interface DifficultyPipsProps {
  difficulty: GameDifficulty;
  className?: string;
}

const LABELS = ['קל', 'בינוני', 'קשה'] as const;

export default function DifficultyPips({ difficulty, className = '' }: DifficultyPipsProps) {
  return (
    <span
      className={`inline-flex gap-0.5 leading-none ${className}`}
      aria-label={`קושי: ${LABELS[difficulty - 1]}`}
      role="img"
    >
      {Array.from({ length: 3 }, (_, i) => (
        <span
          key={i}
          className={`text-xs ${i < difficulty ? 'opacity-100' : 'opacity-30'}`}
          aria-hidden="true"
        >
          ⭐
        </span>
      ))}
    </span>
  );
}
