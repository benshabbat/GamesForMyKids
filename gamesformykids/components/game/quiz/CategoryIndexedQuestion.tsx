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
  index: number;
  total: number;
  score: number;
  current: IndexedQuestion;
  selected: number | null;
  isCorrect: boolean;
  onSelect: (i: number) => void;
  onNext: () => void;
  theme: QuizTheme;
  categoryColors?: Record<string, string>;
}

/**
 * Generic question card for games that use an emoji + category badge + answers[correctIndex] pattern.
 * Used by NatureQuestion, IsraelQuestion, and similar category-indexed quiz games.
 */
export function CategoryIndexedQuestion({
  index, total, score, current, selected, isCorrect,
  onSelect, onNext, theme, categoryColors = {},
}: Props) {
  const t = QUIZ_THEMES[theme];
  const choices = current.answers.map((_, i) => String(i));
  const strSelected = selected !== null ? String(selected) : null;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${t.gradient} flex flex-col items-center justify-center p-4`} dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-lg w-full">
        <QuizProgress index={index} total={total} score={score} theme={theme} />
        <div className={`${t.card} rounded-2xl p-5 mb-5 text-center`}>
          <div className="text-5xl mb-2">{current.emoji}</div>
          <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 ${categoryColors[current.category] ?? 'bg-gray-400 text-white'}`}>
            {current.category}
          </span>
          <p className="text-gray-800 text-lg font-bold leading-relaxed">{current.question}</p>
        </div>
        <QuizAnswerGrid
          choices={choices}
          selected={strSelected}
          isCorrect={isCorrect}
          correctValue={String(current.correctIndex)}
          onSelect={(v) => onSelect(Number(v))}
          theme={theme}
          renderChoice={(v) => current.answers[Number(v)]}
        />
        <QuizFeedback
          isCorrect={selected !== null ? isCorrect : null}
          correctLabel={current.answers[current.correctIndex]}
          funFact={current.funFact ? `💡 ${current.funFact}` : undefined}
          onNext={onNext}
          index={index}
          total={total}
          theme={theme}
        />
      </div>
    </div>
  );
}
