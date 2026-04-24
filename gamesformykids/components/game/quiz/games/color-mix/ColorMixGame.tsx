'use client';
import { useColorMixGame } from './useColorMixGame';
import ColorMixQuestion from './components/ColorMixQuestion';
import { QuizMenuScreen, QuizResultScreen } from '@/components/game/quiz';

export default function ColorMixGame() {
  const {
    phase, index, score, selected, isCorrect, current, total,
    startGame, selectAnswer, next, restart,
  } = useColorMixGame();

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
    <ColorMixQuestion
      index={index} total={total} score={score}
      mix={current.mix} choices={current.choices}
      selected={selected} isCorrect={isCorrect ?? false}
      onSelect={selectAnswer} onNext={next}
    />
  );

  return <QuizResultScreen correctCount={score} total={total} onRestart={restart} theme="violet" />;
}
