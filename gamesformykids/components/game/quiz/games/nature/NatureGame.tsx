'use client';

import { useNatureGame } from './useNatureGame';
import type { NatureCategory } from './data/questions';
import NatureMenuScreen from './components/NatureMenuScreen';
import NatureQuestion from './components/NatureQuestion';
import { QuizResultScreen } from '@/components/game/quiz';

export default function NatureGame() {
  const { phase, categories, current, choices, correctLabel, startGame, selectAnswer, restart } = useNatureGame();

  if (phase === 'menu') return <NatureMenuScreen categories={categories as readonly NatureCategory[]} onStart={startGame} />;
  if (phase === 'result') return <QuizResultScreen onRestart={restart} theme="green" />;
  if (!current) return null;
  return <NatureQuestion current={current} choices={choices} correctLabel={correctLabel} onSelect={selectAnswer} />;
}
