'use client';
import { useMathRaceGame, GAME_TIME } from './useMathRaceGame';
import GameMenuCard from '@/components/game/shared/GameMenuCard';
import MathRaceResultScreen from './components/MathRaceResultScreen';
import MathRacePlayScreen from './components/MathRacePlayScreen';

export default function MathRaceGame() {
  const { phase, score, best, correct, total, accuracy, startGame } = useMathRaceGame();

  if (phase === 'menu') return (
    <GameMenuCard
      emoji="🏎️"
      title="מרוץ מתמטיקה"
      description={`פתור כמה שיותר תרגילים ב-${GAME_TIME} שניות!`}
      hint="רצף 3+ = 20 נקודות · הקושי עולה עם הניקוד"
      gradientClass="from-blue-100 to-indigo-200"
      buttonClass="from-blue-500 to-indigo-600"
      onStart={startGame}
      startLabel="🏎️ התחל!"
      best={best}
    />
  );
  if (phase === 'dead') return (
    <MathRaceResultScreen
      score={score} best={best} correct={correct} total={total} accuracy={accuracy} onRestart={startGame}
    />
  );
  return <MathRacePlayScreen />;
}
