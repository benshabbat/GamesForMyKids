'use client';
import GameResultCard from '@/components/game/shared/GameResultCard';

interface Props {
  score: number;
  missed: number;
  onRestart: () => void;
}

export default function ReflexResultScreen({ score, missed, onRestart }: Props) {
  const accuracy = score + missed > 0 ? Math.round((score / (score + missed)) * 100) : 0;
  return (
    <GameResultCard
      emoji="⚡"
      title="הסתיים!"
      gradientClass="from-rose-50 to-red-100"
      buttonClass="from-rose-500 to-red-600"
      onRestart={onRestart}
      animateEmoji
    >
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-yellow-50 rounded-2xl p-4">
          <p className="text-3xl font-black text-yellow-600">{score}</p>
          <p className="text-xs text-yellow-500">לחיצות</p>
        </div>
        <div className="bg-red-50 rounded-2xl p-4">
          <p className="text-3xl font-black text-red-500">{missed}</p>
          <p className="text-xs text-red-400">פספוסים</p>
        </div>
        <div className="bg-blue-50 rounded-2xl p-4">
          <p className="text-3xl font-black text-blue-600">{accuracy}%</p>
          <p className="text-xs text-blue-400">דיוק</p>
        </div>
      </div>
    </GameResultCard>
  );
}
