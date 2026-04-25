'use client';

import { QuizProgress, QuizAnswerGrid, QuizFeedback } from '@/components/game/quiz';
import { CATEGORY_EMOJIS, type TriviaCategory } from '../data/questions';

interface TriviaQuestion {
  category: TriviaCategory;
  question: string;
  answers: string[];
  correctIndex: number;
  funFact: string;
}

interface Props {
  current: TriviaQuestion;
  onSelect: (idx: number) => void;
}

export default function TriviaQuestion({ current, onSelect }: Props) {
  const choices = current.answers.map((_, i) => String(i));

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-2xl p-6 w-full">
        <QuizProgress theme="amber" />
        <div className="bg-amber-50 rounded-2xl p-5 mb-5 text-center">
          <span className="text-sm font-bold text-amber-700">{CATEGORY_EMOJIS[current.category]} {current.category}</span>
          <p className="text-xl font-bold text-gray-800 mt-2">{current.question}</p>
        </div>
        <QuizAnswerGrid
          choices={choices}
          correctValue={String(current.correctIndex)}
          onSelect={(v) => onSelect(Number(v))}
          theme="amber"
          cols={1}
          renderChoice={(v) => current.answers[Number(v)]}
        />
        <QuizFeedback
          correctLabel={current.answers[current.correctIndex]}
          funFact={current.funFact}
          theme="amber"
          correctMsg="🌟 מעולה!"
        />
      </div>
    </div>
  );
}
