'use client';
import ScoreBestResultCard from '@/components/game/shared/ScoreBestResultCard';
import { useColorTapGame } from '../useColorTapGame';

export default function ColorTapResultScreen() {
  const { score, best, startGame } = useColorTapGame();
  return (
    <ScoreBestResultCard
      emoji="😢"
      title="נגמרו החיים!"
      gradientClass="from-pink-100 to-purple-200"
      buttonClass="from-pink-500 to-purple-600"
      score={score}
      best={best}
      scoreBgClass="bg-pink-50"
      scoreTextClass="text-pink-600"
      scoreLabelClass="text-pink-400"
      onRestart={startGame}
      restartLabel="🔄 שוב!"
      shareText={`🎨 קיבלתי ${score} נקודות בהקש צבע!`}
    />
  );
}
