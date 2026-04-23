'use client';

import { QUIZ_THEMES, type QuizTheme } from './quizTheme';

interface Props {
  index: number;
  total: number;
  score: number;
  theme: QuizTheme;
}

/** Header row (question counter + score badge) plus progress bar. */
export function QuizProgress({ index, total, score, theme }: Props) {
  const t = QUIZ_THEMES[theme];
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-500 text-sm">שאלה {index + 1} / {total}</span>
        <span className={`${t.badge} font-bold px-3 py-1 rounded-full`}>{score} נקודות</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-5">
        <div
          className={`${t.progress} h-2 rounded-full transition-all`}
          style={{ width: `${((index + 1) / total) * 100}%` }}
        />
      </div>
    </>
  );
}
