'use client';
import ScoreBestResultCard from '@/components/game/shared/ScoreBestResultCard';

interface Props {
  score: number;
  best: number;
  onRestart: () => void;
}

export default function ColorTapGameOverScreen({ score, best, onRestart }: Props) {
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
      onRestart={onRestart}
      restartLabel="🔄 שוב!"
    />
  );
}
