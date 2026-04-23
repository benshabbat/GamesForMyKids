'use client';
import { useRiddlesGame } from '../useRiddlesGame';
import { QuizProgress, QuizAnswerGrid, QuizFeedback } from '@/components/game/quiz';

export default function RiddlesQuestion() {
  const { index, total, score, current, choices, selected, isCorrect, correctLabel, selectAnswer, next } = useRiddlesGame();

  if (!current) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-lg w-full">
        <QuizProgress index={index} total={total} score={score} theme="purple" />
        <div className="bg-purple-50 rounded-2xl p-5 mb-5 text-center">
          <div className="text-5xl mb-3">{current.emoji}</div>
          <p className="text-gray-700 text-lg font-medium leading-relaxed">{current.riddle}</p>
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
          correctMsg="🎉 נכון מאוד!"
        />
      </div>
    </div>
  );
}