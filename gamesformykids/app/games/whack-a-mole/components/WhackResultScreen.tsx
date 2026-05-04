'use client';
import ScoreBestResultCard from '@/components/game/shared/ScoreBestResultCard';

interface Props {
  score: number;
  best: number;
  onRestart: () => void;
}

export default function WhackResultScreen({ score, best, onRestart }: Props) {
  return (
    <ScoreBestResultCard
      emoji="🔨"
      title="הזמן נגמר!"
      gradientClass="from-yellow-50 to-amber-100"
      buttonClass="from-amber-500 to-orange-500"
      score={score}
      best={best}
      scoreBgClass="bg-amber-50"
      scoreTextClass="text-amber-600"
      scoreLabelClass="text-amber-400"
      onRestart={onRestart}
    />
  );
}
