import os

base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

capitals = """\
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
"""

fractions = """\
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
"""

spelling = """\
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
"""

files = {
    'app/games/capitals/components/CapitalsQuestion.tsx': capitals,
    'app/games/fractions/components/FractionsQuestion.tsx': fractions,
    'app/games/spelling/components/SpellingQuestion.tsx': spelling,
}

for rel, content in files.items():
    path = os.path.join(base, rel)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Written: {rel}')
