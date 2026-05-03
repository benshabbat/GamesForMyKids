import { shuffle } from '@/lib/utils';
import { QUESTIONS_PER_GAME } from '@/lib/quiz/constants';
import { RIDDLES } from '@/lib/quiz/data/riddles';
import { CAPITAL_QUESTIONS as CAPITALS } from '@/lib/quiz/data/capitals';
import { INSTRUMENTS } from '@/lib/quiz/data/instruments';
import { SPORTS_QUESTIONS } from '@/lib/quiz/data/sports-quiz';
import { CONTINENT_QUESTIONS } from '@/lib/quiz/data/continents';
import { defineConfig } from './types';

const FAMILY_BADGE: Record<string, string> = {
  'מיתרים': 'bg-amber-100 text-amber-800 border-amber-300',
  'נשיפה':  'bg-blue-100 text-blue-800 border-blue-300',
  'הקשה':   'bg-red-100 text-red-800 border-red-300',
  'מקלדת':  'bg-purple-100 text-purple-800 border-purple-300',
};

export const riddlesConfig = defineConfig({
  gameType: 'riddles', emoji: '🧩', title: 'חידות לילדים',
  description: 'פתור 10 חידות מסקרנות!', theme: 'purple',
  preview: (
    <div className="text-right">
      <p className="text-purple-800 font-semibold text-sm mb-2">דוגמה:</p>
      <p className="text-gray-700 text-sm italic">&quot;יש לי ידיים אבל לא יכול לאחוז — מי אני?&quot;</p>
      <p className="text-purple-600 font-bold text-sm mt-1">שעון ⏰</p>
    </div>
  ),
  questions: RIDDLES, questionsPerGame: QUESTIONS_PER_GAME,
  getChoices: (q) => shuffle([q.answer, ...q.wrongOptions]),
  isCorrect: (c, q) => c === q.answer,
  getCorrectLabel: (q) => q.answer,
  renderQuestion: (q) => (
    <><div className="text-5xl mb-3">{q.emoji}</div>
      <p className="text-gray-700 text-lg font-medium leading-relaxed">{q.riddle}</p></>
  ),
});

export const capitalsConfig = defineConfig({
  gameType: 'capitals', emoji: '🌍', title: 'בירות העולם',
  description: 'מה הבירה של כל מדינה?', theme: 'red',
  preview: (
    <div className="grid grid-cols-2 gap-2">
      {['🇫🇷 פריז', '🇩🇪 ברלין', '🇯🇵 טוקיו', '🇺🇸 וושינגטון'].map(s => (
        <div key={s} className="bg-red-50 rounded-xl px-3 py-2 text-sm font-semibold text-red-700 text-center">{s}</div>
      ))}
    </div>
  ),
  questions: CAPITALS, questionsPerGame: QUESTIONS_PER_GAME,
  getChoices: (q) => shuffle([q.capital, ...q.wrongOptions]),
  isCorrect: (c, q) => c === q.capital,
  getCorrectLabel: (q) => q.capital,
  renderQuestion: (q) => (
    <><div className="text-7xl mb-3">{q.flag}</div>
      <p className="text-gray-500 text-sm mb-1">מה הבירה של</p>
      <p className="text-2xl font-bold text-red-800">{q.country}?</p></>
  ),
});

export const instrumentsConfig = defineConfig({
  gameType: 'instruments', emoji: '🎵', title: 'כלי נגינה',
  description: 'זהה את כלי הנגינה לפי התיאור!', theme: 'amber',
  preview: (
    <div className="grid grid-cols-2 gap-2">
      {[['🎸 מיתרים', 'bg-amber-50'], ['🎺 נשיפה', 'bg-blue-50'], ['🥁 הקשה', 'bg-red-50'], ['🎹 מקלדת', 'bg-purple-50']].map(([l, b]) => (
        <div key={l} className={`${b} rounded-xl p-2 text-center text-sm font-semibold`}>{l}</div>
      ))}
    </div>
  ),
  questions: INSTRUMENTS, questionsPerGame: QUESTIONS_PER_GAME,
  getChoices: (q) => shuffle([q.instrument, ...q.wrongInstruments]),
  isCorrect: (c, q) => c === q.instrument,
  getCorrectLabel: (q) => q.instrument,
  renderQuestion: (q) => (
    <><div className="text-6xl mb-3">{q.emoji}</div>
      <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full border ${FAMILY_BADGE[q.family] ?? 'bg-gray-100 text-gray-700'}`}>
        משפחה: {q.family}
      </span>
      <p className="text-gray-700 text-base mt-3 leading-relaxed">{q.description}</p>
      <p className="text-amber-700 font-bold mt-2">שם כלי הנגינה הוא?</p></>
  ),
  correctMsg: '🎵 נכון מאוד!',
});

export const sportsQuizConfig = defineConfig({
  gameType: 'sports-quiz', emoji: '🏆', title: 'חידון ספורט',
  description: 'ענה על 10 שאלות על עולם הספורט!', theme: 'green',
  preview: (
    <div className="grid grid-cols-3 gap-2">
      {['⚽ כדורגל', '🏀 כדורסל', '🏊 שחייה', '🎾 טניס', '🏅 אולימפיאדה', '🤸 גימנסטיקה'].map(s => (
        <div key={s} className="bg-green-50 rounded-xl px-2 py-2 text-xs font-semibold text-green-700 text-center">{s}</div>
      ))}
    </div>
  ),
  questions: SPORTS_QUESTIONS, questionsPerGame: QUESTIONS_PER_GAME,
  getChoices: (q) => [...q.answers],
  isCorrect: (c, q) => c === q.answers[q.correctIndex],
  getCorrectLabel: (q) => q.answers[q.correctIndex] ?? '',
  renderQuestion: (q) => (
    <><div className="text-5xl mb-3">{q.emoji}</div>
      <p className="text-lg font-bold text-gray-700 mb-1">{q.sport}</p>
      <p className="text-gray-600">{q.question}</p></>
  ),
});

export const continentsConfig = defineConfig({
  gameType: 'continents', emoji: '🌍', title: 'יבשות העולם',
  description: 'ענה על שאלות על יבשות כדור הארץ!', theme: 'teal',
  questions: CONTINENT_QUESTIONS, questionsPerGame: QUESTIONS_PER_GAME,
  getChoices: (q) => [...q.answers],
  isCorrect: (c, q) => c === q.answers[q.correctIndex],
  getCorrectLabel: (q) => q.answers[q.correctIndex] ?? '',
  renderQuestion: (q) => (
    <><div className="text-5xl mb-3">{q.emoji}</div>
      <p className="text-gray-700 text-lg font-medium">{q.question}</p></>
  ),
});
