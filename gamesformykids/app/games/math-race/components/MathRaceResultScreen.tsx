'use client';
import GameResultCard from '@/components/game/shared/GameResultCard';
import { StatCell, StatGrid } from '@/components/game/shared/StatGrid';
import { useMathRaceStore } from '../mathRaceStore';

export default function MathRaceResultScreen() {
  const { score, best, correct, total, startGame } = useMathRaceStore();
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <GameResultCard
      emoji="🏁"
      title="הסיום!"
      gradientClass="from-blue-100 to-indigo-200"
      buttonClass="from-blue-500 to-indigo-600"
      onRestart={startGame}
      restartLabel="🔄 שוב!"
      shareText={`🏁 קיבלתי ${score} נקודות במרוץ מתמטיקה!`}
      score={score}
      best={best}
    >
      <StatGrid>
        <StatCell label="ניקוד" value={score} bgClass="bg-blue-50" textClass="text-blue-600" labelClass="text-blue-400" />
        <StatCell label="שיא" value={best} bgClass="bg-yellow-50" textClass="text-yellow-500" labelClass="text-yellow-400" />
        <StatCell label='נכון/סה"כ' value={`${correct}/${total}`} bgClass="bg-green-50" textClass="text-green-600" labelClass="text-green-400" />
        <StatCell label="דיוק" value={`${accuracy}%`} bgClass="bg-purple-50" textClass="text-purple-600" labelClass="text-purple-400" />
      </StatGrid>
    </GameResultCard>
  );
}
