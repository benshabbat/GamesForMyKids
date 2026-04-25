'use client';

import { useQuizGameStore } from '@/lib/stores/quizGameStore';
import { QUIZ_THEMES, type QuizTheme } from './quizTheme';

export function QuizProgress({ theme }: { theme: QuizTheme }) {
  const index = useQuizGameStore(s => s.index);
  const total = useQuizGameStore(s => s.total);
  const score = useQuizGameStore(s => s.score);
  const t = QUIZ_THEMES[theme];
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-500 text-sm">שאלה {index + 1} / {total}</span>
        <span className={`${t.badge} font-bold px-3 py-1 rounded-full`}>{score * 10} נקודות</span>
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
