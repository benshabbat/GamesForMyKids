'use client';
import { useEmojiMathGame } from './useEmojiMathGame';
import GameMenuCard from '@/components/game/shared/GameMenuCard';
import ScoreBestResultCard from '@/components/game/shared/ScoreBestResultCard';
import EmojiMathPlayArea from './components/EmojiMathPlayArea';

export default function EmojiMathGame() {
  const { phase, score, best, startGame } = useEmojiMathGame();

  if (phase === 'menu') return (
    <GameMenuCard
      emoji="🧮"
      title="מתמטיקה עם אמוג'י"
      description="ספור את האמוג'י ופתור את התרגיל!"
      hint="3 חיים · רצף מנצח = +20 נקודות"
      gradientClass="from-yellow-100 to-orange-200"
      buttonClass="from-yellow-400 to-orange-500"
      onStart={startGame}
      startLabel="🧮 התחל!"
      best={best}
    />
  );
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
