import { type ReactNode } from 'react';
import { shuffle } from '@/lib/utils';
import type { QuizTheme } from '@/components/game/quiz/quizTheme';
import type { GameType } from '@/lib/types/core/base';
import FractionBar from '@/components/game/quiz/FractionBar';

// ── Data imports ──────────────────────────────────────────────────────────────
import { RIDDLES, QUESTIONS_PER_GAME as RPG } from '@/lib/quiz/data/riddles';
import { CAPITAL_QUESTIONS as CAPITALS, QUESTIONS_PER_GAME as CPG } from '@/lib/quiz/data/capitals';
import { SPELLING_WORDS, QUESTIONS_PER_GAME as SPGPG } from '@/lib/quiz/data/spelling';
import { FRACTION_QUESTIONS, QUESTIONS_PER_GAME as FPGPG } from '@/lib/quiz/data/fractions';
import { EMOTION_QUESTIONS, QUESTIONS_PER_GAME as EPGPG } from '@/lib/quiz/data/emotions';
import { INSTRUMENTS, QUESTIONS_PER_GAME as IPGPG } from '@/lib/quiz/data/instruments';
import { LANGUAGE_QUESTIONS, QUESTIONS_PER_GAME as LPGPG } from '@/lib/quiz/data/world-languages';
import { OPPOSITE_WORDS, QUESTIONS_PER_GAME as OPGPG } from '@/lib/quiz/data/opposites';
import { SPORTS_QUESTIONS, QUESTIONS_PER_GAME as SQPGPG } from '@/lib/quiz/data/sports-quiz';
import { CONTINENT_QUESTIONS, QUESTIONS_PER_GAME as CQPGPG } from '@/lib/quiz/data/continents';
import { NUTRITION_QUESTIONS, QUESTIONS_PER_GAME as NQPGPG } from '@/lib/quiz/data/healthy-food';
import { FAMILY_QUESTIONS, QUESTIONS_PER_GAME as FQPGPG } from '@/lib/quiz/data/family';
import { ENGLISH_WORDS, QUESTIONS_PER_GAME as EWPGPG } from '@/lib/quiz/data/english-words';
import { QUIZ_QUESTIONS, SHAPES_3D, QUESTIONS_PER_GAME as S3PGPG } from '@/lib/quiz/data/shapes-3d';

// ─────────────────────────────────────────────────────────────────────────────

export interface QuizGameConfig<Q = unknown> {
  gameType: string;
  emoji: string;
  title: string;
  description: string;
  theme: QuizTheme;
  buttonLabel?: string;
  /** Static preview shown inside the menu card (above the start button). */
  preview?: ReactNode;
  questions: Q[];
  questionsPerGame: number;
  getChoices: (q: Q) => string[];
  isCorrect: (choice: string, q: Q) => boolean;
  getCorrectLabel: (q: Q) => string;
  /** Content rendered inside the themed question card (below QuizProgress). */
  renderQuestion: (q: Q) => ReactNode;
  correctMsg?: string;
  wrongMsg?: (q: Q) => string;
}

const FAMILY_BADGE: Record<string, string> = {
  'מיתרים': 'bg-amber-100 text-amber-800 border-amber-300',
  'נשיפה':  'bg-blue-100 text-blue-800 border-blue-300',
  'הקשה':   'bg-red-100 text-red-800 border-red-300',
  'מקלדת':  'bg-purple-100 text-purple-800 border-purple-300',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const QUIZ_GAME_CONFIGS: Partial<Record<GameType, QuizGameConfig<any>>> = {

  riddles: {
    gameType: 'riddles', emoji: '🧩', title: 'חידות לילדים',
    description: 'פתור 10 חידות מסקרנות!', theme: 'purple',
    preview: (
      <div className="text-right">
        <p className="text-purple-800 font-semibold text-sm mb-2">דוגמה:</p>
        <p className="text-gray-700 text-sm italic">&quot;יש לי ידיים אבל לא יכול לאחוז — מי אני?&quot;</p>
        <p className="text-purple-600 font-bold text-sm mt-1">שעון ⏰</p>
      </div>
    ),
    questions: RIDDLES, questionsPerGame: RPG,
    getChoices: (q) => shuffle([q.answer, ...q.wrongOptions]),
    isCorrect: (c, q) => c === q.answer,
    getCorrectLabel: (q) => q.answer,
    renderQuestion: (q) => (
      <><div className="text-5xl mb-3">{q.emoji}</div>
        <p className="text-gray-700 text-lg font-medium leading-relaxed">{q.riddle}</p></>
    ),
  },

  capitals: {
    gameType: 'capitals', emoji: '🌍', title: 'בירות העולם',
    description: 'מה הבירה של כל מדינה?', theme: 'red',
    preview: (
      <div className="grid grid-cols-2 gap-2">
        {['🇫🇷 פריז', '🇩🇪 ברלין', '🇯🇵 טוקיו', '🇺🇸 וושינגטון'].map(s => (
          <div key={s} className="bg-red-50 rounded-xl px-3 py-2 text-sm font-semibold text-red-700 text-center">{s}</div>
        ))}
      </div>
    ),
    questions: CAPITALS, questionsPerGame: CPG,
    getChoices: (q) => shuffle([q.capital, ...q.wrongOptions]),
    isCorrect: (c, q) => c === q.capital,
    getCorrectLabel: (q) => q.capital,
    renderQuestion: (q) => (
      <><div className="text-7xl mb-3">{q.flag}</div>
        <p className="text-gray-500 text-sm mb-1">מה הבירה של</p>
        <p className="text-2xl font-bold text-red-800">{q.country}?</p></>
    ),
  },

  spelling: {
    gameType: 'spelling', emoji: '📝', title: 'כתיב עברי',
    description: 'בחר את האיות הנכון לכל מילה!', theme: 'rose',
    buttonLabel: '✏️ בואו נכתוב!',
    questions: SPELLING_WORDS, questionsPerGame: SPGPG,
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
  },

  fractions: {
    gameType: 'fractions', emoji: '🔢', title: 'שברים פשוטים',
    description: 'זהה את השבר לפי ייצוג ויזואלי!', theme: 'purple',
    preview: (
      <div>
        <p className="text-sm text-purple-600 font-semibold mb-2">לדוגמה — מה השבר הזה?</p>
        <FractionBar numerator={1} denominator={2} />
        <p className="text-purple-800 font-bold mt-1">חצי (1/2) ✓</p>
      </div>
    ),
    questions: FRACTION_QUESTIONS, questionsPerGame: FPGPG,
    getChoices: (q) => shuffle([q.display, ...q.wrongOptions]),
    isCorrect: (c, q) => c === q.display,
    getCorrectLabel: (q) => q.display,
    renderQuestion: (q) => (
      <><p className="text-gray-600 text-sm mb-2">מה השבר המיוצג כאן?</p>
        <div className="text-4xl font-bold text-purple-700 mb-3">{q.numerator}/{q.denominator}</div>
        <FractionBar numerator={q.numerator} denominator={q.denominator} />
        <p className="text-xs text-gray-500 mt-2">({q.numerator} חלקים מתוך {q.denominator})</p></>
    ),
  },

  emotions: {
    gameType: 'emotions', emoji: '😊', title: 'עולם הרגשות',
    description: 'זהה את הרגש לפי הסיפור!', theme: 'amber',
    preview: (
      <div className="grid grid-cols-4 gap-2">
        {['😊 שמח', '😢 עצוב', '😡 כועס', '😨 מפוחד'].map(e => (
          <div key={e} className="bg-amber-50 rounded-xl p-2 text-xs font-medium text-orange-700 text-center">{e}</div>
        ))}
      </div>
    ),
    questions: EMOTION_QUESTIONS, questionsPerGame: EPGPG,
    getChoices: (q) => shuffle([q.emotion, ...q.wrongOptions]),
    isCorrect: (c, q) => c === q.emotion,
    getCorrectLabel: (q) => q.emotion,
    renderQuestion: (q) => (
      <><div className="text-6xl mb-3">{q.emoji}</div>
        <p className="text-gray-700 text-base leading-relaxed font-medium">{q.scenario}</p>
        <p className="text-orange-600 font-bold mt-3 text-sm">מה הרגש המתואר?</p></>
    ),
  },

  instruments: {
    gameType: 'instruments', emoji: '🎵', title: 'כלי נגינה',
    description: 'זהה את כלי הנגינה לפי התיאור!', theme: 'amber',
    preview: (
      <div className="grid grid-cols-2 gap-2">
        {[['🎸 מיתרים','bg-amber-50'],['🎺 נשיפה','bg-blue-50'],['🥁 הקשה','bg-red-50'],['🎹 מקלדת','bg-purple-50']].map(([l,b]) => (
          <div key={l} className={`${b} rounded-xl p-2 text-center text-sm font-semibold`}>{l}</div>
        ))}
      </div>
    ),
    questions: INSTRUMENTS, questionsPerGame: IPGPG,
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
  },

  'world-languages': {
    gameType: 'world-languages', emoji: '🌐', title: 'שפות העולם',
    description: 'באיזו שפה מדברים בכל מדינה?', theme: 'emerald',
    preview: (
      <div className="grid grid-cols-2 gap-2">
        {['🇮🇱 עברית','🇫🇷 צרפתית','🇯🇵 יפנית','🇧🇷 פורטוגזית'].map(s => (
          <div key={s} className="bg-white rounded-xl py-2 px-3 shadow text-sm font-bold text-gray-700">{s}</div>
        ))}
      </div>
    ),
    buttonLabel: '🌍 בואו נלמד!',
    questions: LANGUAGE_QUESTIONS, questionsPerGame: LPGPG,
    getChoices: (q) => shuffle([q.language, ...q.wrongOptions]),
    isCorrect: (c, q) => c === q.language,
    getCorrectLabel: (q) => q.language,
    renderQuestion: (q) => (
      <><p className="text-sm font-semibold text-gray-400 mb-2">באיזו שפה מדברים ב...</p>
        <div className="text-7xl mb-2">{q.flag}</div>
        <p className="text-3xl font-black text-gray-800">{q.country}</p></>
    ),
  },

  opposites: {
    gameType: 'opposites', emoji: '🙃', title: 'ניגודים',
    description: 'מצא את ההפך של כל מילה!', theme: 'orange',
    preview: (
      <div className="flex justify-center gap-3 text-sm font-bold text-gray-600">
        <div className="bg-white rounded-xl px-4 py-2 shadow">גדול ↔ קטן</div>
        <div className="bg-white rounded-xl px-4 py-2 shadow">חם ↔ קר</div>
      </div>
    ),
    buttonLabel: '🙃 משחק ניגודים!',
    questions: OPPOSITE_WORDS, questionsPerGame: OPGPG,
    getChoices: (q) => shuffle([q.opposite, ...q.wrongOptions]),
    isCorrect: (c, q) => c === q.opposite,
    getCorrectLabel: (q) => q.opposite,
    renderQuestion: (q) => (
      <><p className="text-sm font-semibold text-gray-400 mb-2">מה ההפך של...</p>
        <div className="text-5xl mb-2">{q.emoji}</div>
        <p className="text-4xl font-black text-gray-800">{q.word}</p></>
    ),
  },

  'sports-quiz': {
    gameType: 'sports-quiz', emoji: '🏆', title: 'חידון ספורט',
    description: 'ענה על 10 שאלות על עולם הספורט!', theme: 'green',
    preview: (
      <div className="grid grid-cols-3 gap-2">
        {['⚽ כדורגל','🏀 כדורסל','🏊 שחייה','🎾 טניס','🏅 אולימפיאדה','🤸 גימנסטיקה'].map(s => (
          <div key={s} className="bg-green-50 rounded-xl px-2 py-2 text-xs font-semibold text-green-700 text-center">{s}</div>
        ))}
      </div>
    ),
    questions: SPORTS_QUESTIONS, questionsPerGame: SQPGPG,
    getChoices: (q) => [...q.answers],
    isCorrect: (c, q) => c === q.answers[q.correctIndex],
    getCorrectLabel: (q) => q.answers[q.correctIndex],
    renderQuestion: (q) => (
      <><div className="text-5xl mb-3">{q.emoji}</div>
        <p className="text-lg font-bold text-gray-700 mb-1">{q.sport}</p>
        <p className="text-gray-600">{q.question}</p></>
    ),
  },

  continents: {
    gameType: 'continents', emoji: '🌍', title: 'יבשות העולם',
    description: 'ענה על שאלות על יבשות כדור הארץ!', theme: 'teal',
    questions: CONTINENT_QUESTIONS, questionsPerGame: CQPGPG,
    getChoices: (q) => [...q.answers],
    isCorrect: (c, q) => c === q.answers[q.correctIndex],
    getCorrectLabel: (q) => q.answers[q.correctIndex],
    renderQuestion: (q) => (
      <><div className="text-5xl mb-3">{q.emoji}</div>
        <p className="text-gray-700 text-lg font-medium">{q.question}</p></>
    ),
  },

  'healthy-food': {
    gameType: 'healthy-food', emoji: '🥗', title: 'אוכל בריא',
    description: 'למד על תזונה בריאה!', theme: 'green',
    questions: NUTRITION_QUESTIONS, questionsPerGame: NQPGPG,
    getChoices: (q) => [...q.answers],
    isCorrect: (c, q) => c === q.answers[q.correctIndex],
    getCorrectLabel: (q) => q.answers[q.correctIndex],
    renderQuestion: (q) => (
      <><div className="text-5xl mb-3">{q.emoji}</div>
        <p className="text-gray-700 text-lg font-medium">{q.question}</p></>
    ),
  },

  family: {
    gameType: 'family', emoji: '👨‍👩‍👧‍👦', title: 'המשפחה',
    description: 'ענה על שאלות על קשרי משפחה!', theme: 'rose',
    questions: FAMILY_QUESTIONS, questionsPerGame: FQPGPG,
    getChoices: (q) => [...q.answers],
    isCorrect: (c, q) => c === q.answers[q.correctIndex],
    getCorrectLabel: (q) => q.answers[q.correctIndex],
    renderQuestion: (q) => (
      <><div className="text-5xl mb-3">{q.emoji}</div>
        <p className="text-gray-700 text-lg font-medium">{q.question}</p></>
    ),
  },

  'english-words': {
    gameType: 'english-words', emoji: '🔤', title: 'מילים באנגלית',
    description: 'מה המילה באנגלית?', theme: 'indigo',
    preview: (
      <div className="grid grid-cols-2 gap-2 text-sm">
        {['🐶 dog','🍎 apple','🏠 house','🔴 red'].map(s => (
          <div key={s} className="bg-indigo-50 rounded-xl px-3 py-2 font-semibold text-indigo-700 text-center">{s}</div>
        ))}
      </div>
    ),
    questions: ENGLISH_WORDS, questionsPerGame: EWPGPG,
    getChoices: (q) => shuffle([q.english, ...q.wrongOptions]),
    isCorrect: (c, q) => c === q.english,
    getCorrectLabel: (q) => q.english,
    renderQuestion: (q) => (
      <><div className="text-6xl mb-3">{q.emoji}</div>
        <p className="text-3xl font-black text-gray-800">{q.hebrew}</p>
        <p className="text-gray-500 text-sm mt-2">כיצד אומרים באנגלית?</p></>
    ),
  },

  'shapes-3d': {
    gameType: 'shapes-3d', emoji: '📦', title: 'גופים גיאומטריים',
    description: 'זהה גופים תלת-ממדיים!', theme: 'violet',
    questions: QUIZ_QUESTIONS, questionsPerGame: S3PGPG,
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
  },
};
