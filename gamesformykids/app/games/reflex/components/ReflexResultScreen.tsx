'use client';
import GameResultCard from '@/components/game/shared/GameResultCard';
import { StatCell, StatGrid } from '@/components/game/shared/StatGrid';
import { useReflexStore } from '../reflexStore';

export default function ReflexResultScreen() {
  const { score, missed, startGame } = useReflexStore();
  const accuracy = score + missed > 0 ? Math.round((score / (score + missed)) * 100) : 0;

  return (
    <GameResultCard
      emoji="⚡"
      title="הסתיים!"
      gradientClass="from-rose-50 to-red-100"
      buttonClass="from-rose-500 to-red-600"
      onRestart={startGame}
      animateEmoji
      shareText={`⚡ קיבלתי ${score} לחיצות ברפלקס!`}
    >
      <StatGrid cols={3}>
        <StatCell label="לחיצות" value={score} bgClass="bg-yellow-50" textClass="text-yellow-600" labelClass="text-yellow-500" />
        <StatCell label="פספוסים" value={missed} bgClass="bg-red-50" textClass="text-red-500" labelClass="text-red-400" />
        <StatCell label="דיוק" value={`${accuracy}%`} bgClass="bg-blue-50" textClass="text-blue-600" labelClass="text-blue-400" />
      </StatGrid>
    </GameResultCard>
  );
}
