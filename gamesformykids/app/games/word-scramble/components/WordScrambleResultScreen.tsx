'use client';
import GameResultCard from '@/components/game/shared/GameResultCard';

interface Props {
  score: number;
  lives: number;
  onRestart: () => void;
}

export default function WordScrambleResultScreen({ score, lives, onRestart }: Props) {
  const emoji = score >= 100 ? '🏆' : score >= 60 ? '🎉' : '😊';
  const title = score >= 100 ? 'מדהים!' : score >= 60 ? 'כל הכבוד!' : 'ניסיון טוב!';
  return (
    <GameResultCard
      emoji={emoji}
      title={title}
      gradientClass="from-green-100 to-emerald-200"
      buttonClass="from-green-500 to-emerald-600"
      onRestart={onRestart}
      restartLabel="🔄 שחק שוב"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-50 rounded-2xl p-3">
          <p className="text-3xl font-black text-green-600">{score}</p>
          <p className="text-xs text-green-400">ניקוד</p>
        </div>
        <div className="bg-red-50 rounded-2xl p-3">
          <p className="text-3xl font-black text-red-500">{3 - lives}</p>
          <p className="text-xs text-red-400">טעויות</p>
        </div>
      </div>
    </GameResultCard>
  );
}
