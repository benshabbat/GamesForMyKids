'use client';
import { QuizResultScreen } from '@/components/game/quiz';
import { useMultiplicationGameStore } from '../multiplicationGameStore';
import { QUESTIONS_PER_LEVEL } from '../data/tables';

export default function MultiplicationResultScreen() {
  const { level, correct, startGame } = useMultiplicationGameStore();
  return <QuizResultScreen correctCount={correct} total={QUESTIONS_PER_LEVEL} onRestart={() => startGame(level)} theme="violet" />;
}
