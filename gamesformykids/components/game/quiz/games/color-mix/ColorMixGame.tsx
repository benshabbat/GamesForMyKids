'use client';
import { useColorMixGame } from './useColorMixGame';
import ColorMixQuestion from './components/ColorMixQuestion';
import { QuizMenuScreen, QuizResultScreen } from '@/components/game/quiz';

export default function ColorMixGame() {
  const { phase, current, startGame, selectAnswer, restart } = useColorMixGame();

  if (phase === 'menu') return (
    <QuizMenuScreen
      emoji="🎨"
      title="ערבוב צבעים"
      description="מה מקבלים כשמערבבים שני צבעים?"
      theme="violet"
      buttonLabel="🖌️ בואו נערבב!"
      onStart={startGame}
    />
  );

  if (phase === 'playing' && current) return (
    <ColorMixQuestion mix={current.mix} choices={current.choices} onSelect={selectAnswer} />
  );

  return <QuizResultScreen onRestart={restart} theme="violet" />;
}
