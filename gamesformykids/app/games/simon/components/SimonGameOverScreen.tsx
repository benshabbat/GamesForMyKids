'use client';

import GameResultCard from '@/components/game/shared/GameResultCard';

interface Props {
  roundScore: number;
  best: number;
  onRestart: () => void;
}

export default function SimonGameOverScreen({ roundScore, best, onRestart }: Props) {
  return (
    <GameResultCard
      emoji="😵"
      title="טעית!"
      gradientClass="from-gray-800 to-gray-900"
      buttonClass="from-gray-600 to-gray-800"
      onRestart={onRestart}
      restartLabel="🔄 שוב!"
    >
      <p className="text-gray-400 text-sm mb-4">הגעת לרצף של {roundScore} צבעים</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-2xl p-3">
          <p className="text-3xl font-black text-gray-700">{roundScore}</p>
          <p className="text-xs text-gray-400">סיבובים</p>
        </div>
        <div className="bg-yellow-50 rounded-2xl p-3">
          <p className="text-3xl font-black text-yellow-500">{best}</p>
          <p className="text-xs text-yellow-400">שיא</p>
        </div>
      </div>
    </GameResultCard>
  );
}
