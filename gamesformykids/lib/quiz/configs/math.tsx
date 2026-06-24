import { shuffle } from '@/lib/utils';
import { QUESTIONS_PER_GAME } from '@/lib/quiz/constants';
import { MISPAR_BONDS_QUESTIONS } from '@/lib/quiz/data/mispar-bonds';
import { FRACTION_QUESTIONS } from '@/lib/quiz/data/fractions';
import { GEMATRIA_QUESTIONS } from '@/lib/quiz/data/gematria';
import { QUIZ_QUESTIONS, SHAPES_3D } from '@/lib/quiz/data/shapes-3d';
import { SKIP_COUNTING_QUESTIONS } from '@/lib/quiz/data/skip-counting';
import { VISUAL_ADDITION_QUESTIONS } from '@/lib/quiz/data/visual-addition';
import { MATH_STORY_QUESTIONS } from '@/lib/quiz/data/math-stories';
import FractionBar from '@/components/game/quiz/FractionBar';
import { defineConfig } from './types';

export const gematriaConfig = defineConfig({
  gameType: 'gematria', emoji: 'א', title: 'גמטריה',
  description: 'למד את ערכי האותיות העבריות וחשב גמטריה!', theme: 'violet',
  buttonLabel: 'א בואו נחשב!',
  preview: (
    <div className="grid grid-cols-2 gap-2">
      {['א = 1', 'י = 10', 'כ = 20', 'ק = 100'].map(s => (
        <div key={s} className="bg-violet-50 rounded-xl px-2 py-1.5 text-sm font-bold text-violet-700 text-center">{s}</div>
      ))}
    </div>
  ),
  questions: GEMATRIA_QUESTIONS, questionsPerGame: QUESTIONS_PER_GAME,
  getChoices: (q) => shuffle([q.answer, ...q.wrongOptions]),
  isCorrect: (c, q) => c === q.answer,
  getCorrectLabel: (q) => q.answer,
  wrongMsg: (q) => q.hint,
  renderQuestion: (q) => (
    <>
      <div className="text-5xl mb-3 font-hebrew">{q.emoji}</div>
      <p className="text-gray-700 text-lg font-bold mb-1 text-center" dir="rtl">{q.question}</p>
      {q.type === 'letter' && (
        <p className="text-xs text-violet-500 mt-1">כל אות עברית שווה מספר מיוחד</p>
      )}
      {q.type === 'word' && (
        <p className="text-xs text-violet-500 mt-1">חבר את ערכי כל האותיות</p>
      )}
      {q.type === 'reverse' && (
        <p className="text-xs text-violet-500 mt-1">איזו אות מתאימה למספר זה?</p>
      )}
    </>
  ),
});

export const visualAdditionConfig = defineConfig({
  gameType: 'visual-addition', emoji: '➕', title: 'חיבור חזותי',
  description: 'ספור את האובייקטים וחבר אותם!', theme: 'green',
  preview: (
    <div className="grid grid-cols-2 gap-2">
      {['🐸 + 🐸🐸 = 3', '⭐⭐ + ⭐⭐ = 4', '🍎🍎🍎 + 🍎 = 4', '🎈🎈🎈 + 🎈🎈🎈 = 6'].map(s => (
        <div key={s} className="bg-green-50 rounded-xl px-2 py-1.5 text-xs font-medium text-green-700 text-center">{s}</div>
      ))}
    </div>
  ),
  buttonLabel: '➕ בואו נספור!',
  questions: VISUAL_ADDITION_QUESTIONS, questionsPerGame: QUESTIONS_PER_GAME,
  getChoices: (q) => shuffle([q.answer, ...q.wrongOptions]),
  isCorrect: (c, q) => c === q.answer,
  getCorrectLabel: (q) => q.answer,
  renderQuestion: (q) => (
    <><div className="text-4xl mb-3">{q.emoji}</div>
      <p className="text-gray-600 text-sm mb-2">{'כמה סה"כ?'}</p>
      <p className="text-3xl font-black text-green-700 tracking-widest">{q.question}</p></>
  ),
});

export const skipCountingConfig = defineConfig({
  gameType: 'skip-counting', emoji: '🔢', title: 'ספירה לפי קפיצות',
  description: 'ספור לפי 2, 5 ו-10 — מלא את המספר החסר!', theme: 'blue',
  questions: SKIP_COUNTING_QUESTIONS, questionsPerGame: QUESTIONS_PER_GAME,
  getChoices: (q) => shuffle([q.answer, ...q.wrongOptions]),
  isCorrect: (c, q) => c === q.answer,
  getCorrectLabel: (q) => q.answer,
  renderQuestion: (q) => (
    <><div className="text-4xl mb-3">{q.emoji}</div>
      <p className="text-gray-600 text-sm mb-2">מה המספר החסר?</p>
      <p className="text-2xl font-bold text-blue-700 mb-1">{q.question}</p></>
  ),
});

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
    const shape = SHAPES_3D.find(s => s.id === q.shapeId)!;
    return shuffle([q.answer, ...shape.wrongOptions]);
  },
  isCorrect: (c, q) => c === q.answer,
  getCorrectLabel: (q) => q.answer,
  renderQuestion: (q) => {
    const shape = SHAPES_3D.find(s => s.id === q.shapeId);
    return (
      <><div className="text-5xl mb-3">{shape?.emoji}</div>
        <p className="text-gray-700 text-lg font-medium">{q.question}</p></>
    );
  },
});

export const misparBondsConfig = defineConfig({
  gameType: 'mispar-bonds', emoji: '🔢', title: 'קשרי מספרים',
  description: 'מה המספר החסר? בחר את השם העברי הנכון!', theme: 'green',
  buttonLabel: '🔢 בואו נחשב!',
  preview: (
    <div className="grid grid-cols-2 gap-2">
      {['1 + __ = 3', '__ + 3 = 7', '2 + __ = 5', '__ + 4 = 6'].map(s => (
        <div key={s} className="bg-green-50 rounded-xl px-2 py-1.5 text-sm font-bold text-green-700 text-center">{s}</div>
      ))}
    </div>
  ),
  questions: MISPAR_BONDS_QUESTIONS, questionsPerGame: QUESTIONS_PER_GAME,
  getChoices: (q) => shuffle([q.answer, ...q.wrongOptions]),
  isCorrect: (c, q) => c === q.answer,
  getCorrectLabel: (q) => q.answer,
  renderQuestion: (q) => (
    <div className="w-full flex flex-col items-center gap-2">
      <div className="text-5xl">{q.emoji}</div>
      <p className="text-gray-600 text-sm mb-1" dir="rtl">מה המספר החסר?</p>
      <p className="text-3xl font-black text-green-700 tracking-widest" dir="ltr">{q.question}</p>
    </div>
  ),
});

export const mathStoriesConfig = defineConfig({
  gameType: 'math-stories', emoji: '📝', title: 'בעיות מילוליות',
  description: 'פתור בעיות מתמטיות בעברית — מילים למספרים!', theme: 'blue',
  buttonLabel: '📝 בואו נפתור!',
  questions: MATH_STORY_QUESTIONS, questionsPerGame: QUESTIONS_PER_GAME,
  getChoices: (q) => shuffle([q.answer, ...q.wrongOptions]),
  isCorrect: (c, q) => c === q.answer,
  getCorrectLabel: (q) => q.answer,
  renderQuestion: (q) => (
    <div className="w-full flex flex-col items-center gap-2">
      <div className="text-5xl">{q.emoji}</div>
      <p className="text-center text-gray-700 text-base font-semibold leading-relaxed" dir="rtl">
        {q.question}
      </p>
    </div>
  ),
});
