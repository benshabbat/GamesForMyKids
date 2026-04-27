import { shuffle } from '@/lib/utils';
import { QUESTIONS_PER_GAME } from '@/lib/quiz/constants';
import { SPELLING_WORDS } from '@/lib/quiz/data/spelling';
import { OPPOSITE_WORDS } from '@/lib/quiz/data/opposites';
import { ENGLISH_WORDS } from '@/lib/quiz/data/english-words';
import { LANGUAGE_QUESTIONS } from '@/lib/quiz/data/world-languages';
import { defineConfig } from './types';

export const spellingConfig = defineConfig({
  gameType: 'spelling', emoji: '📝', title: 'כתיב עברי',
  description: 'בחר את האיות הנכון לכל מילה!', theme: 'rose',
  buttonLabel: '✏️ בואו נכתוב!',
  questions: SPELLING_WORDS, questionsPerGame: QUESTIONS_PER_GAME,
  getChoices: (q) => shuffle([q.word, ...q.wrong]),
  isCorrect: (c, q) => c === q.word,
  getCorrectLabel: (q) => q.word,
  renderQuestion: (q) => (
    <><div className="text-7xl mb-3">{q.emoji}</div>
      <p className="text-xl font-bold text-gray-700">{q.hint}</p>
      <p className="text-gray-400 text-sm mt-1">מה האיות הנכון?</p></>
  ),
  correctMsg: '✅ נכון!',
  wrongMsg: (q) => `💙 הנכון: "${q.word}"`,
});

export const oppositesConfig = defineConfig({
  gameType: 'opposites', emoji: '🙃', title: 'ניגודים',
  description: 'מצא את ההפך של כל מילה!', theme: 'orange',
  preview: (
    <div className="flex justify-center gap-3 text-sm font-bold text-gray-600">
      <div className="bg-white rounded-xl px-4 py-2 shadow">גדול ↔ קטן</div>
      <div className="bg-white rounded-xl px-4 py-2 shadow">חם ↔ קר</div>
    </div>
  ),
  buttonLabel: '🙃 משחק ניגודים!',
  questions: OPPOSITE_WORDS, questionsPerGame: QUESTIONS_PER_GAME,
  getChoices: (q) => shuffle([q.opposite, ...q.wrongOptions]),
  isCorrect: (c, q) => c === q.opposite,
  getCorrectLabel: (q) => q.opposite,
  renderQuestion: (q) => (
    <><p className="text-sm font-semibold text-gray-400 mb-2">מה ההפך של...</p>
      <div className="text-5xl mb-2">{q.emoji}</div>
      <p className="text-4xl font-black text-gray-800">{q.word}</p></>
  ),
});

export const englishWordsConfig = defineConfig({
  gameType: 'english-words', emoji: '🔤', title: 'מילים באנגלית',
  description: 'מה המילה באנגלית?', theme: 'indigo',
  preview: (
    <div className="grid grid-cols-2 gap-2 text-sm">
      {['🐶 dog', '🍎 apple', '🏠 house', '🔴 red'].map(s => (
        <div key={s} className="bg-indigo-50 rounded-xl px-3 py-2 font-semibold text-indigo-700 text-center">{s}</div>
      ))}
    </div>
  ),
  questions: ENGLISH_WORDS, questionsPerGame: QUESTIONS_PER_GAME,
  getChoices: (q) => shuffle([q.english, ...q.wrongOptions]),
  isCorrect: (c, q) => c === q.english,
  getCorrectLabel: (q) => q.english,
  renderQuestion: (q) => (
    <><div className="text-6xl mb-3">{q.emoji}</div>
      <p className="text-3xl font-black text-gray-800">{q.hebrew}</p>
      <p className="text-gray-500 text-sm mt-2">כיצד אומרים באנגלית?</p></>
  ),
});

export const worldLanguagesConfig = defineConfig({
  gameType: 'world-languages', emoji: '🌐', title: 'שפות העולם',
  description: 'באיזו שפה מדברים בכל מדינה?', theme: 'emerald',
  preview: (
    <div className="grid grid-cols-2 gap-2">
      {['🇮🇱 עברית', '🇫🇷 צרפתית', '🇯🇵 יפנית', '🇧🇷 פורטוגזית'].map(s => (
        <div key={s} className="bg-white rounded-xl py-2 px-3 shadow text-sm font-bold text-gray-700">{s}</div>
      ))}
    </div>
  ),
  buttonLabel: '🌍 בואו נלמד!',
  questions: LANGUAGE_QUESTIONS, questionsPerGame: QUESTIONS_PER_GAME,
  getChoices: (q) => shuffle([q.language, ...q.wrongOptions]),
  isCorrect: (c, q) => c === q.language,
  getCorrectLabel: (q) => q.language,
  renderQuestion: (q) => (
    <><p className="text-sm font-semibold text-gray-400 mb-2">באיזו שפה מדברים ב...</p>
      <div className="text-7xl mb-2">{q.flag}</div>
      <p className="text-3xl font-black text-gray-800">{q.country}</p></>
  ),
});
