'use client';

import { QUIZ_THEMES, type QuizTheme } from './quizTheme';
import { QuizProgress } from './QuizProgress';
import { QuizAnswerGrid } from './QuizAnswerGrid';
import { QuizFeedback } from './QuizFeedback';

export interface IndexedQuestion {
  emoji: string;
  category: string;
  question: string;
  answers: string[];
  correctIndex: number;
  funFact?: string;
}

interface Props {
  current: IndexedQuestion;
  choices: string[];
  correctLabel: string;
  onSelect: (v: string) => void;
  theme: QuizTheme;
  categoryColors?: Record<string, string>;
}

export function CategoryIndexedQuestion({ current, choices, correctLabel, onSelect, theme, categoryColors = {} }: Props) {
  const t = QUIZ_THEMES[theme];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${t.gradient} flex flex-col items-center justify-center p-4`} dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-lg w-full">
        <QuizProgress theme={theme} />
        <div className={`${t.card} rounded-2xl p-5 mb-5 text-center`}>
          <div className="text-5xl mb-2">{current.emoji}</div>
          <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 ${categoryColors[current.category] ?? 'bg-gray-400 text-white'}`}>
            {current.category}
          </span>
          <p className="text-gray-800 text-lg font-bold leading-relaxed">{current.question}</p>
        </div>
        <QuizAnswerGrid
          choices={choices}
          correctValue={correctLabel}
          onSelect={onSelect}
          theme={theme}
          renderChoice={(v) => current.answers[Number(v)]}
        />
        <QuizFeedback
          correctLabel={current.answers[Number(correctLabel)]}
          funFact={current.funFact ? `💡 ${current.funFact}` : undefined}
          theme={theme}
        />
      </div>
    </div>
  );
}
