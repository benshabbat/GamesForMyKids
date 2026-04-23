'use client';
import { useSpellingGame } from '../useSpellingGame';
import { QuizProgress, QuizAnswerGrid, QuizFeedback } from '@/components/game/quiz';

export default function SpellingQuestion() {
  const { index, total, score, current, choices, selected, isCorrect, correctLabel, selectAnswer, next } = useSpellingGame();

  if (!current) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 p-4" dir="rtl">
      <div className="max-w-lg mx-auto">
        <QuizProgress index={index} total={total} score={score} theme="rose" />
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-5 text-center">
          <div className="text-7xl mb-3">{current.emoji}</div>
          <p className="text-xl font-bold text-gray-700">{current.hint}</p>
          <p className="text-gray-400 text-sm mt-1">מה האיית הנכון?</p>
        </div>
        <QuizAnswerGrid
          choices={choices}
          selected={selected}
          isCorrect={isCorrect}
          correctValue={correctLabel}
          onSelect={selectAnswer}
          theme="rose"
        />
        <QuizFeedback
          isCorrect={selected !== null ? isCorrect : null}
          correctLabel={correctLabel}
          correctMsg={`✅ נכון! הכתיב הנכון: "${correctLabel}"`}
          wrongMsg={`💙 הנכון: "${correctLabel}"`}
          onNext={next}
          index={index}
          total={total}
          theme="rose"
        />
      </div>
    </div>
  );
}
