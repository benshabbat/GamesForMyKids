import { shuffle } from '@/lib/utils';
import { QUESTIONS_PER_GAME } from '@/lib/quiz/constants';
import { FRACTION_QUESTIONS } from '@/lib/quiz/data/fractions';
import { QUIZ_QUESTIONS, SHAPES_3D } from '@/lib/quiz/data/shapes-3d';
import FractionBar from '@/components/game/quiz/FractionBar';
import { defineConfig } from './types';

export const fractionsConfig = defineConfig({
  gameType: 'fractions', emoji: '🔢', title: 'שברים פשוטים',
  description: 'זהה את השבר לפי ייצוג ויזואלי!', theme: 'purple',
  preview: (
    <div>
      <p className="text-sm text-purple-600 font-semibold mb-2">לדוגמה — מה השבר הזה?</p>
      <FractionBar numerator={1} denominator={2} />
      <p className="text-purple-800 font-bold mt-1">חצי (1/2) ✓</p>
    </div>
  ),
  questions: FRACTION_QUESTIONS, questionsPerGame: QUESTIONS_PER_GAME,
  getChoices: (q) => shuffle([q.display, ...q.wrongOptions]),
  isCorrect: (c, q) => c === q.display,
  getCorrectLabel: (q) => q.display,
  renderQuestion: (q) => (
    <><p className="text-gray-600 text-sm mb-2">מה השבר המיוצג כאן?</p>
      <div className="text-4xl font-bold text-purple-700 mb-3">{q.numerator}/{q.denominator}</div>
      <FractionBar numerator={q.numerator} denominator={q.denominator} />
      <p className="text-xs text-gray-500 mt-2">({q.numerator} חלקים מתוך {q.denominator})</p></>
  ),
});

export const shapes3dConfig = defineConfig({
  gameType: 'shapes-3d', emoji: '📦', title: 'גופים גיאומטריים',
  description: 'זהה גופים תלת-ממדיים!', theme: 'violet',
  questions: QUIZ_QUESTIONS, questionsPerGame: QUESTIONS_PER_GAME,
  getChoices: (q) => {
    const shape = SHAPES_3D.find((s) => s.id === q.shapeId);
    if (!shape) {
      return shuffle([q.answer]);
    }
    return shuffle([q.answer, ...shape.wrongOptions]);
  },
  isCorrect: (c, q) => c === q.answer,
  getCorrectLabel: (q) => q.answer,
  renderQuestion: (q) => {
    const shape = SHAPES_3D.find((s) => s.id === q.shapeId);
    const shapeEmoji = shape?.emoji ?? '📦';
    return (
      <><div className="text-5xl mb-3">{shapeEmoji}</div>
        <p className="text-gray-700 text-lg font-medium">{q.question}</p></>
    );
  },
});
