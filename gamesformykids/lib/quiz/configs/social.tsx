import { shuffle } from '@/lib/utils';
import { QUESTIONS_PER_GAME } from '@/lib/quiz/constants';
import { EMOTION_QUESTIONS } from '@/lib/quiz/data/emotions';
import { FAMILY_QUESTIONS } from '@/lib/quiz/data/family';
import { NUTRITION_QUESTIONS } from '@/lib/quiz/data/healthy-food';
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
  isCorrect: (c, q) => c === q.answers[q.correctIndex],
  getCorrectLabel: (q) => q.answers[q.correctIndex] ?? '',
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
  isCorrect: (c, q) => c === q.answers[q.correctIndex],
  getCorrectLabel: (q) => q.answers[q.correctIndex] ?? '',
  renderQuestion: (q) => (
    <><div className="text-5xl mb-3">{q.emoji}</div>
      <p className="text-gray-700 text-lg font-medium">{q.question}</p></>
  ),
});
