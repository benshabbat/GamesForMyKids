'use client';

import { QuizProgress, QuizAnswerGrid, QuizFeedback } from '@/components/game/quiz';
import type { SportsQuestion } from '../data/questions';

interface Props {
  index: number;
  total: number;
  score: number;
  current: SportsQuestion;
  choices: string[];
  selected: string | null;
  isCorrect: boolean | null;
  onSelect: (choice: string) => void;
  onNext: () => void;
}

export default function SportsQuizQuestion({
  index, total, score, current, choices, selected, isCorrect, onSelect, onNext,
}: Props) {
  const correctValue = current.answers[current.correctIndex];
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-lg w-full">
        <QuizProgress index={index} total={total} score={score} theme="green" />
        <div className="bg-green-50 rounded-2xl p-5 mb-5 text-center">
          <div className="text-5xl mb-2">{current.emoji}</div>
          <span className="text-xs font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">{current.sport}</span>
          <p className="text-gray-800 text-lg font-bold mt-3 leading-relaxed">{current.question}</p>
        </div>
        <QuizAnswerGrid
          choices={choices}
          selected={selected}
          isCorrect={isCorrect}
          correctValue={correctValue}
          onSelect={onSelect}
          theme="green"
        />
        <QuizFeedback
          isCorrect={isCorrect}
          correctLabel={correctValue}
          onNext={onNext}
          index={index}
          total={total}
          theme="green"
          correctMsg="🎉 כל הכבוד!"
        />
      </div>
    </div>
  );
}
