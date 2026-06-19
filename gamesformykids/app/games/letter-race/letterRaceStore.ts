import { makePersistStore } from '@/lib/stores/createStore';
import { setupGameTimer } from '@/lib/stores/gameTimerHelpers';
import { useGameDifficulty } from '@/lib/stores/gameDifficultyStore';
import type { PhaseDead as Phase } from '@/lib/types';

export const GAME_TIME = 30;

const DIFFICULTY_TIME = { easy: 45, medium: 30, hard: 20 } as const;

// ── Word-letter dataset ─────────────────────────────────────────────────────

const WORDS: Array<{ word: string; emoji: string; letter: string }> = [
  { word: 'ארנב', emoji: '🐰', letter: 'א' },
  { word: 'בלון', emoji: '🎈', letter: 'ב' },
  { word: 'גמל', emoji: '🐪', letter: 'ג' },
  { word: 'דגל', emoji: '🚩', letter: 'ד' },
  { word: 'הר', emoji: '⛰️', letter: 'ה' },
  { word: 'ורד', emoji: '🌹', letter: 'ו' },
  { word: 'זנב', emoji: '🦊', letter: 'ז' },
  { word: 'חתול', emoji: '🐱', letter: 'ח' },
  { word: 'טבעת', emoji: '💍', letter: 'ט' },
  { word: 'ילד', emoji: '👦', letter: 'י' },
  { word: 'כלב', emoji: '🐶', letter: 'כ' },
  { word: 'לב', emoji: '❤️', letter: 'ל' },
  { word: 'מכונית', emoji: '🚗', letter: 'מ' },
  { word: 'נחש', emoji: '🐍', letter: 'נ' },
  { word: 'ספל', emoji: '☕', letter: 'ס' },
  { word: 'עיט', emoji: '🦅', letter: 'ע' },
  { word: 'פיל', emoji: '🐘', letter: 'פ' },
  { word: 'צב', emoji: '🐢', letter: 'צ' },
  { word: 'קוף', emoji: '🐒', letter: 'ק' },
  { word: 'ראש', emoji: '👤', letter: 'ר' },
  { word: 'שמש', emoji: '☀️', letter: 'ש' },
  { word: 'תפוח', emoji: '🍎', letter: 'ת' },
  { word: 'אוטובוס', emoji: '🚌', letter: 'א' },
  { word: 'ברדלס', emoji: '🦁', letter: 'ב' },
  { word: 'גזר', emoji: '🥕', letter: 'ג' },
  { word: 'דבורה', emoji: '🐝', letter: 'ד' },
  { word: 'הליקופטר', emoji: '🚁', letter: 'ה' },
  { word: 'זברה', emoji: '🦓', letter: 'ז' },
  { word: 'חמור', emoji: '🫏', letter: 'ח' },
  { word: 'ירח', emoji: '🌙', letter: 'י' },
  { word: 'כוכב', emoji: '⭐', letter: 'כ' },
  { word: 'לימון', emoji: '🍋', letter: 'ל' },
  { word: 'מלון', emoji: '🍈', letter: 'מ' },
  { word: 'ניל', emoji: '🎵', letter: 'נ' },
  { word: 'סוס', emoji: '🐴', letter: 'ס' },
  { word: 'עגלה', emoji: '🛒', letter: 'ע' },
  { word: 'פרה', emoji: '🐄', letter: 'פ' },
  { word: 'צפרדע', emoji: '🐸', letter: 'צ' },
  { word: 'קשת', emoji: '🌈', letter: 'ק' },
  { word: 'רכבת', emoji: '🚂', letter: 'ר' },
  { word: 'שן', emoji: '🦷', letter: 'ש' },
  { word: 'תרנגול', emoji: '🐓', letter: 'ת' },
];

const HEBREW_LETTERS = 'אבגדהוזחטיכלמנסעפצקרשת'.split('');

export interface LetterQuestion {
  emoji: string;
  word: string;
  answer: string;
  choices: string[];
}

export function makeLetterQ(): LetterQuestion {
  const item = WORDS[Math.floor(Math.random() * WORDS.length)]!;
  const wrong = new Set<string>();
  while (wrong.size < 3) {
    const l = HEBREW_LETTERS[Math.floor(Math.random() * HEBREW_LETTERS.length)]!;
    if (l !== item.letter) wrong.add(l);
  }
  return {
    emoji: item.emoji,
    word: item.word,
    answer: item.letter,
    choices: [...wrong, item.letter].sort(() => Math.random() - 0.5),
  };
}

// ── Store ────────────────────────────────────────────────────────────────────

interface State {
  phase:    Phase;
  q:        LetterQuestion;
  score:    number;
  best:     number;
  timeLeft: number;
  feedback: 'correct' | 'wrong' | null;
  streak:   number;
  total:    number;
  correct:  number;
}

interface Actions {
  startGame:    () => void;
  tap:          (choice: string) => void;
  nextQuestion: () => void;
}

const INITIAL: State = {
  phase: 'menu', q: makeLetterQ(), score: 0, best: 0,
  timeLeft: GAME_TIME, feedback: null, streak: 0, total: 0, correct: 0,
};

export const useLetterRaceStore = makePersistStore<State & Actions>(
  'LetterRaceStore',
  'letter-race-best',
  (set, get) => {
    const timer = setupGameTimer({
      name: 'letterRace',
      set,
      get,
      onEnd: () => {
        const { score, best } = get();
        set({ timeLeft: 0, phase: 'dead', best: Math.max(best, score) }, false, 'letterRace/gameOver');
      },
    });

    return {
      ...INITIAL,

      startGame: () => {
        const diff = useGameDifficulty.getState().difficulty;
        timer.stop();
        set({ ...INITIAL, phase: 'playing', best: get().best, q: makeLetterQ(), timeLeft: DIFFICULTY_TIME[diff] }, false, 'letterRace/startGame');
        timer.start();
      },

      tap: (choice: string) => {
        const { phase, feedback, q, score, streak, total, correct } = get();
        if (phase !== 'playing' || feedback !== null) return;
        const newTotal = total + 1;
        if (choice === q.answer) {
          const newStreak = streak + 1;
          const pts = newStreak >= 3 ? 20 : 10;
          set({ score: score + pts, streak: newStreak, total: newTotal, correct: correct + 1, feedback: 'correct' }, false, 'letterRace/correct');
        } else {
          set({ streak: 0, total: newTotal, feedback: 'wrong' }, false, 'letterRace/wrong');
        }
      },

      nextQuestion: () => {
        set({ feedback: null, q: makeLetterQ() }, false, 'letterRace/nextQ');
      },
    };
  },
  { partialize: (s) => ({ best: s.best }) },
);
