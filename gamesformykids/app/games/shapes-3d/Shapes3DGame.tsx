'use client';

import { useShapes3DGame } from './useShapes3DGame';
import Shapes3dMenuScreen from './components/Shapes3dMenuScreen';
import Shapes3dQuestion from './components/Shapes3dQuestion';
import Shapes3dResultScreen from './components/Shapes3dResultScreen';

export default function Shapes3DGame() {
  const { phase, index, score, selected, isCorrect, current, currentShape, choices, total, correctCount, startGame, selectAnswer, next, goMenu, restart } = useShapes3DGame();

  if (phase === 'menu') return <Shapes3dMenuScreen onStart={startGame} />;

  if (phase === 'result') {
    return <Shapes3dResultScreen correctCount={correctCount} total={total} score={score} onRestart={restart} onMenu={goMenu} />;
  }

  if (!current) return null;

  return (
    <Shapes3dQuestion
      index={index}
      total={total}
      score={score}
      current={current}
      currentShape={currentShape ?? null}
      choices={choices as string[]}
      selected={selected as string | null}
      isCorrect={isCorrect}
      onSelect={selectAnswer}
      onNext={next}
    />
  );
}
