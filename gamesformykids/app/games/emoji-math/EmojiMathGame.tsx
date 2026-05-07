'use client';
import { useEmojiMathGame } from './useEmojiMathGame';
import ScoreBestResultCard from '@/components/game/shared/ScoreBestResultCard';
import EmojiMathMenuScreen from './components/EmojiMathMenuScreen';
import EmojiMathPlayArea from './components/EmojiMathPlayArea';

export default function EmojiMathGame() {
  const { phase, score, best, startGame } = useEmojiMathGame();

  if (phase === 'menu') return <EmojiMathMenuScreen />;
  if (phase === 'dead') return (
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
  return <EmojiMathPlayArea />;
}
