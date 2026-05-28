import { shuffle } from '@/lib/utils';
import { QUESTIONS_PER_GAME } from '@/lib/quiz/constants';
import { EMOTION_QUESTIONS } from '@/lib/quiz/data/emotions';
import { FAMILY_QUESTIONS } from '@/lib/quiz/data/family';
import { NUTRITION_QUESTIONS } from '@/lib/quiz/data/healthy-food';
import { SINGULAR_PLURAL_QUESTIONS } from '@/lib/quiz/data/singular-plural';
import { MORNING_ROUTINE_QUESTIONS } from '@/lib/quiz/data/morning-routine';
import { defineConfig } from './types';

export const emotionsConfig = defineConfig({
  gameType: 'emotions', emoji: '😊', title: 'עולם הרגשות',
  description: 'זהה את הרגש לפי הסיפור!', theme: 'amber',
  preview: (
    <div className="grid grid-cols-4 gap-2">
      {['😊 שמח', '😢 עצוב', '😡 כועס', '😨 מפוחד'].map(e => (
        <div key={e} className="bg-amber-50 rounded-xl p-2 text-xs font-medium text-orange-700 text-center">{e}</div>
      ))}
    </div>
  ),
  questions: EMOTION_QUESTIONS, questionsPerGame: QUESTIONS_PER_GAME,
  getChoices: (q) => shuffle([q.emotion, ...q.wrongOptions]),
  isCorrect: (c, q) => c === q.emotion,
  getCorrectLabel: (q) => q.emotion,
  renderQuestion: (q) => (
    <><div className="text-6xl mb-3">{q.emoji}</div>
      <p className="text-gray-700 text-base leading-relaxed font-medium">{q.scenario}</p>
      <p className="text-orange-600 font-bold mt-3 text-sm">מה הרגש המתואר?</p></>
  ),
});

export const familyConfig = defineConfig({
  gameType: 'family', emoji: '👨‍👩‍👧‍👦', title: 'המשפחה',
  description: 'ענה על שאלות על קשרי משפחה!', theme: 'rose',
  questions: FAMILY_QUESTIONS, questionsPerGame: QUESTIONS_PER_GAME,
  getChoices: (q) => [...q.answers],
  isCorrect: (c, q) => c === q.answers[q.correctIndex]!,
  getCorrectLabel: (q) => q.answers[q.correctIndex]!,
  renderQuestion: (q) => (
    <><div className="text-5xl mb-3">{q.emoji}</div>
      <p className="text-gray-700 text-lg font-medium">{q.question}</p></>
  ),
});

export const healthyFoodConfig = defineConfig({
  gameType: 'healthy-food', emoji: '🥗', title: 'אוכל בריא',
  description: 'למד על תזונה בריאה!', theme: 'green',
  questions: NUTRITION_QUESTIONS, questionsPerGame: QUESTIONS_PER_GAME,
  getChoices: (q) => [...q.answers],
  isCorrect: (c, q) => c === q.answers[q.correctIndex]!,
  getCorrectLabel: (q) => q.answers[q.correctIndex]!,
  renderQuestion: (q) => (
    <><div className="text-5xl mb-3">{q.emoji}</div>
      <p className="text-gray-700 text-lg font-medium">{q.question}</p></>
  ),
});

export const singularPluralConfig = defineConfig({
  gameType: 'singular-plural', emoji: '📝', title: 'יחיד ורבים',
  description: 'מה צורת הרבים של המילה?', theme: 'teal',
  preview: (
    <div className="grid grid-cols-2 gap-2">
      {['🐕 כלב → כלבים', '👧 ילדה → ילדות', '🌳 עץ → עצים', '🏠 בית → בתים'].map(s => (
        <div key={s} className="bg-teal-50 rounded-xl px-2 py-1.5 text-xs font-medium text-teal-700 text-center">{s}</div>
      ))}
    </div>
  ),
  questions: SINGULAR_PLURAL_QUESTIONS, questionsPerGame: QUESTIONS_PER_GAME,
  getChoices: (q) => shuffle([q.plural, ...q.wrongOptions]),
  isCorrect: (c, q) => c === q.plural,
  getCorrectLabel: (q) => q.plural,
  renderQuestion: (q) => (
    <><div className="text-6xl mb-3">{q.emoji}</div>
      <p className="text-gray-700 text-lg font-medium">מה הרבים של: <strong>{q.singular}</strong></p></>
  ),
});

export const morningRoutineConfig = defineConfig({
  gameType: 'morning-routine', emoji: '🌅', title: 'שגרת הבוקר',
  description: 'מה בא אחרי מה בשגרת היום?', theme: 'amber',
  preview: (
    <div className="text-center">
      <p className="text-amber-800 font-semibold text-sm mb-2">שגרת הבוקר שלי:</p>
      <div className="flex justify-center gap-2 text-xl">
        <span>😴</span><span>→</span><span>🚽</span><span>→</span><span>🦷</span><span>→</span><span>👕</span><span>→</span><span>🥣</span><span>→</span><span>🎒</span>
      </div>
    </div>
  ),
  questions: MORNING_ROUTINE_QUESTIONS, questionsPerGame: QUESTIONS_PER_GAME,
  getChoices: (q) => shuffle([q.answer, ...q.wrongOptions]),
  isCorrect: (c, q) => c === q.answer,
  getCorrectLabel: (q) => q.answer,
  renderQuestion: (q) => (
    <><div className="text-6xl mb-3">{q.emoji}</div>
      <p className="text-gray-700 text-lg font-medium leading-relaxed">{q.question}</p></>
  ),
});
