'use client';
import GameResultCard from '@/components/game/shared/GameResultCard';

interface Props {
  score: number;
  best: number;
  onRestart: () => void;
}

export default function TrueFalseResultScreen({ score, best, onRestart }: Props) {
  return (
    <GameResultCard
      emoji="🧠"
      title="כל הכבוד על הניסיון!"
      gradientClass="from-teal-100 to-cyan-200"
      buttonClass="from-teal-500 to-cyan-600"
      onRestart={onRestart}
      restartLabel="🔄 שוב!"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-teal-50 rounded-2xl p-3">
          <p className="text-3xl font-black text-teal-600">{score}</p>
          <p className="text-xs text-teal-400">ניקוד</p>
        </div>
        <div className="bg-yellow-50 rounded-2xl p-3">
          <p className="text-3xl font-black text-yellow-500">{best}</p>
          <p className="text-xs text-yellow-400">שיא</p>
        </div>
      </div>
    </GameResultCard>
  );
}
