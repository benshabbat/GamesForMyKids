'use client';
import { useCapitalsGame } from '../useCapitalsGame';
import { QuizProgress, QuizAnswerGrid, QuizFeedback } from '@/components/game/quiz';

export default function CapitalsQuestion() {
  const { index, total, score, current, choices, selected, isCorrect, correctLabel, selectAnswer, next } = useCapitalsGame();

  if (!current) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-lg w-full">
        <QuizProgress index={index} total={total} score={score} theme="red" />
        <div className="bg-red-50 rounded-2xl p-5 mb-5 text-center">
          <div className="text-7xl mb-3">{current.flag}</div>
          <p className="text-gray-500 text-sm mb-1">מה הבירה של</p>
          <p className="text-2xl font-bold text-red-800">{current.country}?</p>
        </div>
        <QuizAnswerGrid
          choices={choices}
          selected={selected}
          isCorrect={isCorrect}
          correctValue={correctLabel}
          onSelect={selectAnswer}
          theme="red"
        />
        <QuizFeedback
          isCorrect={isCorrect}
          correctLabel={correctLabel}
          onNext={next}
          index={index}
          total={total}
          theme="red"
          correctMsg="🎉 נכון מאוד!"
        />
      </div>
    </div>
  );
}
