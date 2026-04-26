'use client';

import { useIsraelGame } from './useIsraelGame';
import type { IsraelCategory } from './data/questions';
import IsraelMenuScreen from './components/IsraelMenuScreen';
import IsraelQuestion from './components/IsraelQuestion';
import { QuizResultScreen } from '@/components/game/quiz';

export default function IsraelGame() {
  const { phase, categories, current, choices, correctLabel, startGame, selectAnswer, restart } = useIsraelGame();

  if (phase === 'menu') return <IsraelMenuScreen categories={categories as readonly IsraelCategory[]} onStart={startGame} />;
  if (phase === 'result') return <QuizResultScreen onRestart={restart} theme="blue" />;
  if (!current) return null;
  return <IsraelQuestion current={current} choices={choices} correctLabel={correctLabel} onSelect={selectAnswer} />;
}
