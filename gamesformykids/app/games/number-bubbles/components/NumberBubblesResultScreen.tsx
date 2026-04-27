'use client';
import GameResultCard from '@/components/game/shared/GameResultCard';

interface Props {
  level: number;
  elapsed: number;
  onNextLevel: (level: number) => void;
  onRestart: () => void;
}

export default function NumberBubblesResultScreen({ level, elapsed, onNextLevel, onRestart }: Props) {
  return (
    <GameResultCard
      emoji="🎉"
      title="כל הכבוד!"
      gradientClass="from-sky-100 to-blue-200"
      buttonClass="from-sky-500 to-blue-600"
      onRestart={() => onNextLevel(level)}
      restartLabel={`➡️ רמה ${level + 1}`}
      secondaryAction={{ label: '🔄 מחדש', onClick: onRestart }}
    >
      <p className="text-gray-500 mb-2">סיימת רמה {level} ב-{elapsed} שניות</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-sky-50 rounded-2xl p-3">
          <p className="text-3xl font-black text-sky-600">{level}</p>
          <p className="text-xs text-sky-400">רמה</p>
        </div>
        <div className="bg-green-50 rounded-2xl p-3">
          <p className="text-3xl font-black text-green-600">{elapsed}s</p>
          <p className="text-xs text-green-400">זמן</p>
        </div>
      </div>
    </GameResultCard>
  );
}
