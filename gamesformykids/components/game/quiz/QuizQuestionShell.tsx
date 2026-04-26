'use client';

import { type ReactNode } from 'react';
import { QUIZ_THEMES, type QuizTheme } from './quizTheme';
import { QuizProgress } from './QuizProgress';
import { QuizAnswerGrid } from './QuizAnswerGrid';
import { QuizFeedback } from './QuizFeedback';

interface Props {
  theme: QuizTheme;
  choices: string[];
  correctLabel: string;
  onSelect: (choice: string) => void;
  correctMsg?: string;
  wrongMsg?: string;
  funFact?: string;
  cardVariant?: 'themed' | 'white';
  cols?: 1 | 2;
  renderChoice?: (choice: string) => ReactNode;
  children: ReactNode;
}

export function QuizQuestionShell({
  theme,
  choices,
  correctLabel,
  onSelect,
  correctMsg = '🎉 נכון מאוד!',
  wrongMsg,
  funFact,
  cardVariant = 'themed',
  cols,
  renderChoice,
  children,
}: Props) {
  const t = QUIZ_THEMES[theme];
  const cardCls = cardVariant === 'white'
    ? 'bg-white shadow-xl rounded-2xl p-5 mb-5 text-center'
    : `${t.card} rounded-2xl p-5 mb-5 text-center`;
  return (
    <div className={`min-h-screen bg-gradient-to-br ${t.gradient} flex flex-col items-center justify-center p-4`} dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-lg w-full">
        <QuizProgress theme={theme} />
        <div className={cardCls}>
          {children}
        </div>
        <QuizAnswerGrid
          choices={choices}
          correctValue={correctLabel}
          onSelect={onSelect}
          theme={theme}
          cols={cols}
          renderChoice={renderChoice}
        />
        <QuizFeedback
          correctLabel={correctLabel}
          theme={theme}
          correctMsg={correctMsg}
          wrongMsg={wrongMsg}
          funFact={funFact}
        />
      </div>
    </div>
  );
}
