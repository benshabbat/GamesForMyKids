'use client';

import GameResultCard from '@/components/game/shared/GameResultCard';

interface Props {
  score: number;
  best: number;
  onRestart: () => void;
}

export default function ColorTapGameOverScreen({ score, best, onRestart }: Props) {
  return (
    <GameResultCard
      emoji="😢"
      title="נגמרו החיים!"
      gradientClass="from-pink-100 to-purple-200"
      buttonClass="from-pink-500 to-purple-600"
      onRestart={onRestart}
      restartLabel="🔄 שוב!"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-pink-50 rounded-2xl p-3">
          <p className="text-3xl font-black text-pink-600">{score}</p>
          <p className="text-xs text-pink-400">ניקוד</p>
        </div>
        <div className="bg-yellow-50 rounded-2xl p-3">
          <p className="text-3xl font-black text-yellow-500">{best}</p>
          <p className="text-xs text-yellow-400">שיא</p>
        </div>
      </div>
    </GameResultCard>
  );
}
