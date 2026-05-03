'use client';

import GameResultCard from '@/components/game/shared/GameResultCard';

interface Props {
  score: number;
  best: number;
  onRestart: () => void;
}

export default function EmojiMathGameOverScreen({ score, best, onRestart }: Props) {
  return (
    <GameResultCard
      emoji="🤓"
      title="כל הכבוד על המאמץ!"
      gradientClass="from-yellow-100 to-orange-200"
      buttonClass="from-yellow-400 to-orange-500"
      onRestart={onRestart}
      restartLabel="🔄 שוב!"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-orange-50 rounded-2xl p-3">
          <p className="text-3xl font-black text-orange-600">{score}</p>
          <p className="text-xs text-orange-400">ניקוד</p>
        </div>
        <div className="bg-yellow-50 rounded-2xl p-3">
          <p className="text-3xl font-black text-yellow-500">{best}</p>
          <p className="text-xs text-yellow-400">שיא</p>
        </div>
      </div>
    </GameResultCard>
  );
}
