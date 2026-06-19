'use client';
import GameResultCard from '@/components/game/shared/GameResultCard';
import { StatCell, StatGrid } from '@/components/game/shared/StatGrid';
import { useLetterRaceStore } from '../letterRaceStore';

export default function LetterRaceResultScreen() {
  const { score, best, correct, total, startGame } = useLetterRaceStore();
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <GameResultCard
      emoji="🏁"
      title="הסיום!"
      gradientClass="from-violet-100 to-purple-200"
      buttonClass="from-violet-500 to-purple-600"
      onRestart={startGame}
      restartLabel="🔄 שוב!"
      shareText={`🔤 זיהיתי ${score} נקודות במרוץ אותיות!`}
      score={score}
      best={best}
    >
      <StatGrid>
        <StatCell label="ניקוד" value={score} bgClass="bg-violet-50" textClass="text-violet-600" labelClass="text-violet-400" />
        <StatCell label="שיא" value={best} bgClass="bg-yellow-50" textClass="text-yellow-500" labelClass="text-yellow-400" />
        <StatCell label='נכון/סה"כ' value={`${correct}/${total}`} bgClass="bg-green-50" textClass="text-green-600" labelClass="text-green-400" />
        <StatCell label="דיוק" value={`${accuracy}%`} bgClass="bg-purple-50" textClass="text-purple-600" labelClass="text-purple-400" />
      </StatGrid>
    </GameResultCard>
  );
}
