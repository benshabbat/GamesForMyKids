'use client';
import { useFractionsGame } from '../useFractionsGame';
import { QuizProgress, QuizAnswerGrid, QuizFeedback } from '@/components/game/quiz';
import FractionBar from './FractionBar';

export default function FractionsQuestion() {
  const { index, total, score, current, choices, selected, isCorrect, correctLabel, selectAnswer, next } = useFractionsGame();

  if (!current) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-100 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-lg w-full">
        <QuizProgress index={index} total={total} score={score} theme="purple" />
        <div className="bg-purple-50 rounded-2xl p-5 mb-5 text-center">
          <p className="text-gray-600 text-sm mb-2">מה השבר המיוצג כאן?</p>
          <div className="text-4xl font-bold text-purple-700 mb-3">
            {current.numerator}/{current.denominator}
          </div>
          <FractionBar numerator={current.numerator} denominator={current.denominator} />
          <p className="text-xs text-gray-500 mt-2">({current.numerator} חלקים מתוך {current.denominator})</p>
        </div>
        <QuizAnswerGrid
          choices={choices}
          selected={selected}
          isCorrect={isCorrect}
          correctValue={correctLabel}
          onSelect={selectAnswer}
          theme="purple"
        />
        <QuizFeedback
          isCorrect={isCorrect}
          correctLabel={correctLabel}
          onNext={next}
          index={index}
          total={total}
          theme="purple"
        />
      </div>
    </div>
  );
}
