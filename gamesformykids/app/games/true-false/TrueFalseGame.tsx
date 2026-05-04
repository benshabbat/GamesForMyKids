'use client';
import { useTrueFalseGame, TIME_PER_Q } from './useTrueFalseGame';
import TrueFalseMenuScreen from './components/TrueFalseMenuScreen';
import TrueFalsePlayScreen from './components/TrueFalsePlayScreen';
import ScoreBestResultCard from '@/components/game/shared/ScoreBestResultCard';

export default function TrueFalseGame() {
  const { phase, score, best, startGame } = useTrueFalseGame();

  if (phase === 'menu') return <TrueFalseMenuScreen best={best} timePer={TIME_PER_Q} onStart={startGame} />;
  if (phase === 'dead') return (
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
  return <TrueFalsePlayScreen />;
}
