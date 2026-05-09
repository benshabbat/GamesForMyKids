'use client';
import ScoreBestResultCard from '@/components/game/shared/ScoreBestResultCard';
import { useTrueFalseGame } from '../useTrueFalseGame';

export default function TrueFalseResultScreen() {
  const { score, best, startGame } = useTrueFalseGame();
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
      onRestart={startGame}
      restartLabel="🔄 שוב!"
    />
  );
}
