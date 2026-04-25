'use client';

import { useHumanBodyGame } from './useHumanBodyGame';
import type { BodyCategory } from './data/body';
import HumanBodyMenuScreen from './components/HumanBodyMenuScreen';
import HumanBodyQuestion from './components/HumanBodyQuestion';
import { QuizResultScreen } from '@/components/game/quiz';

export default function HumanBodyGame() {
  const { phase, category, currentQuestion, choices, startGame, selectAnswer } = useHumanBodyGame();

  if (phase === 'menu') return <HumanBodyMenuScreen onStart={(cat: BodyCategory) => startGame(cat)} />;
  if (phase === 'result') return <QuizResultScreen onRestart={() => startGame(category)} theme="red" />;
  if (!currentQuestion) return null;
  return <HumanBodyQuestion currentQuestion={currentQuestion} choices={choices} onSelect={selectAnswer} />;
}
