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
  index: number;
  total: number;
  score: number;
  current: TriviaQuestion;
  selected: number | null;
  isCorrect: boolean;
  onSelect: (idx: number) => void;
  onNext: () => void;
}

export default function TriviaQuestion({ index, total, score, current, selected, isCorrect, onSelect, onNext }: Props) {
  const choices = current.answers.map((_, i) => String(i));
  const strSelected = selected !== null ? String(selected) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-2xl p-6 w-full">
        <QuizProgress index={index} total={total} score={score} theme="amber" />
        <div className="bg-amber-50 rounded-2xl p-5 mb-5 text-center">
          <span className="text-sm font-bold text-amber-700">{CATEGORY_EMOJIS[current.category]} {current.category}</span>
          <p className="text-xl font-bold text-gray-800 mt-2">{current.question}</p>
        </div>
        <QuizAnswerGrid
          choices={choices}
          selected={strSelected}
          isCorrect={isCorrect}
          correctValue={String(current.correctIndex)}
          onSelect={(v) => onSelect(Number(v))}
          theme="amber"
          cols={1}
          renderChoice={(v) => current.answers[Number(v)]}
        />
        <QuizFeedback
          isCorrect={selected !== null ? isCorrect : null}
          correctLabel={current.answers[current.correctIndex]}
          funFact={current.funFact}
          onNext={onNext}
          index={index}
          total={total}
          theme="amber"
          correctMsg="🌟 מעולה!"
        />
      </div>
    </div>
  );
}
