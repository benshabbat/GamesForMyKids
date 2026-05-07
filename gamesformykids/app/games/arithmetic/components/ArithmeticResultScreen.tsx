'use client';
import { useArithmeticGame } from '../useArithmeticGame';
import { QUESTIONS_PER_GAME } from '@/lib/quiz/constants';
import GameResultCard from '@/components/game/shared/GameResultCard';

export default function ArithmeticResultScreen() {
  const { level, correct, score, startGame, goMenu } = useArithmeticGame();
  const pct = Math.round((correct / QUESTIONS_PER_GAME) * 100);
  return (
    <GameResultCard
      emoji={pct >= 80 ? '🏆' : pct >= 50 ? '😊' : '💪'}
      title={`${level.label} — סיום!`}
      gradientClass="from-blue-50 to-indigo-100"
      buttonClass="from-indigo-500 to-blue-600"
      onRestart={() => startGame(level)}
      secondaryAction={{ label: '📋 רמות', onClick: goMenu }}
    >
      <div className="bg-indigo-50 rounded-2xl p-5">
        <p className="text-4xl font-black text-indigo-700">{correct} / {QUESTIONS_PER_GAME}</p>
        <p className="text-indigo-500 text-sm mt-1">תשובות נכונות</p>
        <p className="text-xl font-bold text-indigo-600 mt-2">⭐ {score} נקודות</p>
        <div className="mt-2 h-3 bg-indigo-100 rounded-full">
          <div className="h-full bg-indigo-400 rounded-full" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </GameResultCard>
  );
}
