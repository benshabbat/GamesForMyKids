'use client';

import { type ReactNode } from 'react';
import { useQuizGameStore } from '@/lib/stores/quizGameStore';
import { QUIZ_THEMES, type QuizTheme } from './quizTheme';

interface Props {
  choices: string[];
  correctValue: string;
  onSelect: (choice: string) => void;
  theme: QuizTheme;
  renderChoice?: (choice: string) => ReactNode;
  cols?: 1 | 2;
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
      {choices.map((choice) => {
        let cls = 'p-4 rounded-2xl border-2 font-bold text-base transition-all text-center ';
        if (selected === null) {
          cls += `${t.answerIdle} cursor-pointer`;
        } else if (choice === correctValue) {
          cls += 'border-green-500 bg-green-100 text-green-800';
        } else if (choice === selected) {
          cls += 'border-red-400 bg-red-100 text-red-700';
        } else {
          cls += 'border-gray-200 bg-gray-50 text-gray-400';
        }
        return (
          <button
            key={choice}
            onClick={() => onSelect(choice)}
            disabled={selected !== null}
            className={cls}
          >
            {renderChoice ? renderChoice(choice) : choice}
          </button>
        );
      })}
    </div>
  );
}
