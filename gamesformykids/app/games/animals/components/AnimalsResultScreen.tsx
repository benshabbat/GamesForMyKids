'use client';
import { useQuizGameStore } from '@/lib/stores/quizGameStore';
import { useAnimalsSession } from '../hooks/useAnimalsSession';
import GameResultCard from '@/components/game/shared/GameResultCard';

export default function AnimalsResultScreen() {
  const total = useQuizGameStore(s => s.total);
  const { score, restart } = useAnimalsSession();
  const pct = Math.round((score / total) * 100);
  return (
    <GameResultCard
      emoji="🐘"
      title="כל הכבוד!"
      gradientClass="from-green-50 to-teal-100"
      buttonClass="from-green-500 to-teal-600"
      onRestart={restart}
    >
      <div className="bg-green-50 rounded-2xl p-5">
        <p className="text-4xl font-black text-green-700">{score} / {total}</p>
        <div className="mt-2 h-3 bg-green-100 rounded-full">
          <div className="h-full bg-green-400 rounded-full" style={{ width: `${pct}%` }} />
        </div>
        <p className="text-green-500 text-sm mt-1">{pct}%</p>
      </div>
    </GameResultCard>
  );
}
