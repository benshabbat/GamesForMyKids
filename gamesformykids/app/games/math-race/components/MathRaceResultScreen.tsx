'use client';
import GameResultCard from '@/components/game/shared/GameResultCard';

interface Props {
  score: number;
  best: number;
  correct: number;
  total: number;
  accuracy: number;
  onRestart: () => void;
}

export default function MathRaceResultScreen({ score, best, correct, total, accuracy, onRestart }: Props) {
  return (
    <GameResultCard
      emoji="🏁"
      title="הסיום!"
      gradientClass="from-blue-100 to-indigo-200"
      buttonClass="from-blue-500 to-indigo-600"
      onRestart={onRestart}
      restartLabel="🔄 שוב!"
    >
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-blue-50 rounded-2xl p-3">
          <p className="text-3xl font-black text-blue-600">{score}</p>
          <p className="text-xs text-blue-400">ניקוד</p>
        </div>
        <div className="bg-yellow-50 rounded-2xl p-3">
          <p className="text-3xl font-black text-yellow-500">{best}</p>
          <p className="text-xs text-yellow-400">שיא</p>
        </div>
        <div className="bg-green-50 rounded-2xl p-3">
          <p className="text-3xl font-black text-green-600">{correct}/{total}</p>
          <p className="text-xs text-green-400">נכון/סה&quot;כ</p>
        </div>
        <div className="bg-purple-50 rounded-2xl p-3">
          <p className="text-3xl font-black text-purple-600">{accuracy}%</p>
          <p className="text-xs text-purple-400">דיוק</p>
        </div>
      </div>
    </GameResultCard>
  );
}
