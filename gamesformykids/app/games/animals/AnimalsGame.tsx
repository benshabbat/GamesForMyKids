'use client';

import { useAnimalsGame } from './useAnimalsGame';
import AnimalsMenuScreen from './components/AnimalsMenuScreen';
import AnimalsQuestionCard from './components/AnimalsQuestionCard';
import AnimalsResultScreen from './components/AnimalsResultScreen';

export default function AnimalsGame() {
  const {
    phase, index, score, selected, isCorrect, current, total,
    startGame, selectAnswer, next, goMenu, restart,
  } = useAnimalsGame();

  if (phase === 'menu') return <AnimalsMenuScreen onStart={startGame} />;

  if (phase === 'playing' && current) return (
    <AnimalsQuestionCard
      index={index} total={total} score={score}
      current={current} selected={selected} isCorrect={isCorrect}
      onSelect={selectAnswer} onNext={next} onMenu={goMenu}
    />
  );

  return <AnimalsResultScreen score={score} total={total} onRestart={restart} onMenu={goMenu} />;
}
