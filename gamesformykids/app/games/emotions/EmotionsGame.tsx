'use client';

import { useEmotionsGame } from './useEmotionsGame';
import EmotionsMenuScreen from './components/EmotionsMenuScreen';
import EmotionsQuestion from './components/EmotionsQuestion';
import EmotionsResultScreen from './components/EmotionsResultScreen';

export default function EmotionsGame() {
  const { phase, index, score, selected, isCorrect, current, choices, total, correctCount, startGame, selectAnswer, next, goMenu, restart } = useEmotionsGame();

  if (phase === 'menu') return <EmotionsMenuScreen onStart={startGame} />;

  if (phase === 'result') return (
    <EmotionsResultScreen correctCount={correctCount} total={total} score={score} onRestart={restart} onMenu={goMenu} />
  );

  if (!current) return null;

  return (
    <EmotionsQuestion
      index={index} total={total} score={score}
      current={current} choices={choices} selected={selected}
      isCorrect={isCorrect} onSelect={selectAnswer} onNext={next}
    />
  );
}
