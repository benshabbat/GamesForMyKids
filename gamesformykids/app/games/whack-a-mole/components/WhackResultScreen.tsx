'use client';
import GameResultCard from '@/components/game/shared/GameResultCard';

interface Props {
  score: number;
  best: number;
  onRestart: () => void;
}

export default function WhackResultScreen({ score, best, onRestart }: Props) {
  return (
    <GameResultCard
      emoji="🔨"
      title="הזמן נגמר!"
      gradientClass="from-yellow-50 to-amber-100"
      buttonClass="from-amber-500 to-orange-500"
      onRestart={onRestart}
    >
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-amber-50 rounded-2xl p-4">
          <p className="text-4xl font-black text-amber-600">{score}</p>
          <p className="text-xs text-amber-400">ניקוד</p>
        </div>
        <div className="bg-yellow-50 rounded-2xl p-4">
          <p className="text-4xl font-black text-yellow-500">{best}</p>
          <p className="text-xs text-yellow-400">שיא</p>
        </div>
      </div>
    </GameResultCard>
  );
}
