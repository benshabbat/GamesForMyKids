'use client';
import ScoreBestResultCard from '@/components/game/shared/ScoreBestResultCard';
import { useEmojiMathGame } from '../useEmojiMathGame';

export default function EmojiMathResultScreen() {
  const { score, best, startGame } = useEmojiMathGame();
  return (
    <ScoreBestResultCard
      emoji="🤓"
      title="כל הכבוד על המאמץ!"
      gradientClass="from-yellow-100 to-orange-200"
      buttonClass="from-yellow-400 to-orange-500"
      score={score}
      best={best}
      scoreBgClass="bg-orange-50"
      scoreTextClass="text-orange-600"
      scoreLabelClass="text-orange-400"
      onRestart={startGame}
      restartLabel="🔄 שוב!"
    />
  );
}
