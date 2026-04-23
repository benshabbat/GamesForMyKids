'use client';

import { type ReactNode } from 'react';
import { QUIZ_THEMES, type QuizTheme } from './quizTheme';
import { QuizProgress } from './QuizProgress';
import { QuizAnswerGrid } from './QuizAnswerGrid';
import { QuizFeedback } from './QuizFeedback';

interface Props {
  theme: QuizTheme;
  index: number;
  total: number;
  score: number;
  choices: string[];
  selected: string | null;
  isCorrect: boolean | null;
  correctLabel: string;
  onSelect: (choice: string) => void;
  onNext: () => void;
  correctMsg?: string;
  wrongMsg?: string;
  /** 'themed' (default) uses theme card color; 'white' uses bg-white shadow-xl */
  cardVariant?: 'themed' | 'white';
  /** The question-specific content card (emoji + text / image / etc.) */
  children: ReactNode;
}

/**
 * Outer shell for standard quiz questions.
 * Renders: background → white card → QuizProgress → {children} → QuizAnswerGrid → QuizFeedback
 */
export function QuizQuestionShell({
  theme,
  index,
  total,
  score,
  choices,
  selected,
  isCorrect,
  correctLabel,
  onSelect,
  onNext,
  correctMsg = '🎉 נכון מאוד!',
  wrongMsg,
  cardVariant = 'themed',
  children,
}: Props) {
  const t = QUIZ_THEMES[theme];
  const cardCls = cardVariant === 'white'
    ? 'bg-white shadow-xl rounded-2xl p-5 mb-5 text-center'
    : `${t.card} rounded-2xl p-5 mb-5 text-center`;
  return (
    <div className={`min-h-screen bg-gradient-to-br ${t.gradient} flex flex-col items-center justify-center p-4`} dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-lg w-full">
        <QuizProgress index={index} total={total} score={score} theme={theme} />
        <div className={cardCls}>
          {children}
        </div>
        <QuizAnswerGrid
          choices={choices}
          selected={selected}
          isCorrect={isCorrect}
          correctValue={correctLabel}
          onSelect={onSelect}
          theme={theme}
        />
        <QuizFeedback
          isCorrect={isCorrect}
          correctLabel={correctLabel}
          onNext={onNext}
          index={index}
          total={total}
          theme={theme}
          correctMsg={correctMsg}
          wrongMsg={wrongMsg}
        />
      </div>
    </div>
  );
}
