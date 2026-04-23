'use client';

import { type ReactNode } from 'react';
import { QUIZ_THEMES, type QuizTheme } from './quizTheme';

interface Props {
  choices: string[];
  selected: string | null;
  isCorrect: boolean | null;
  /** The string value of the correct answer, used to highlight the correct button. */
  correctValue: string;
  onSelect: (choice: string) => void;
  theme: QuizTheme;
  /** Optional custom renderer for each choice label. Falls back to the choice string. */
  renderChoice?: (choice: string) => ReactNode;
  cols?: 1 | 2;
}

/**
 * A 2×2 (or 1-column) answer grid with three-state button styling:
 * idle → theme colour  |  correct → green  |  wrong → red  |  neutral → gray
 */
export function QuizAnswerGrid({
  choices,
  selected,
  correctValue,
  onSelect,
  theme,
  renderChoice,
  cols = 2,
}: Props) {
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
