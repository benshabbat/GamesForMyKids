'use client';
import ScoreBestResultCard from '@/components/game/shared/ScoreBestResultCard';

interface Props {
  score: number;
  best: number;
  onRestart: () => void;
}

export default function TrueFalseResultScreen({ score, best, onRestart }: Props) {
  return (
    <ScoreBestResultCard
      emoji="🧠"
      title="כל הכבוד על הניסיון!"
      gradientClass="from-teal-100 to-cyan-200"
      buttonClass="from-teal-500 to-cyan-600"
      score={score}
      best={best}
      scoreBgClass="bg-teal-50"
      scoreTextClass="text-teal-600"
      scoreLabelClass="text-teal-400"
      onRestart={onRestart}
      restartLabel="🔄 שוב!"
    />
  );
}
