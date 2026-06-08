'use client';

import { type ReactNode } from 'react';
import { useQuizGameStore } from '@/lib/stores/quizGameStore';
import { QUIZ_THEMES, type QuizTheme } from './quizTheme';
import { answerButtonClass } from '@/lib/quiz/answerButtonClass';

interface Props {
  choices: string[];
  correctValue: string;
  onSelect: (choice: string) => void;
  theme: QuizTheme;
  renderChoice?: ((choice: string) => ReactNode) | undefined;
  cols?: 1 | 2 | undefined;
}

export function QuizAnswerGrid({
  choices,
  correctValue,
  onSelect,
  theme,
  renderChoice,
  cols = 2,
}: Props) {
  const selected = useQuizGameStore(s => s.selected);
  const t = QUIZ_THEMES[theme];
  const gridClass = cols === 1
    ? 'grid grid-cols-1 gap-3 mb-4'
    : 'grid grid-cols-2 gap-3 mb-4';

  return (
    <div className={gridClass}>
      {choices.map((choice) => (
        <button
          key={choice}
          onClick={() => onSelect(choice)}
          disabled={selected !== null}
          className={`p-4 rounded-2xl border-2 font-bold text-base transition-colors text-center ${answerButtonClass(
            choice === correctValue,
            choice === selected,
            selected !== null,
            `${t.answerIdle} cursor-pointer`,
          )}`}
        >
          {renderChoice ? renderChoice(choice) : choice}
        </button>
      ))}
    </div>
  );
}
