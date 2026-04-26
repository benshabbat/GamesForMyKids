'use client';
import type { ComponentType, ReactNode } from 'react';
import { QuizGameShell } from '@/components/game/quiz';

export function makeQuizGame<S>(
  useGame: () => S,
  render: (state: S) => { menu: ReactNode; question: ReactNode; result: ReactNode },
): ComponentType {
  return function QuizGame() {
    const state = useGame();
    const { menu, question, result } = render(state);
    return <QuizGameShell menu={menu} question={question} result={result} />;
  };
}
