import { makePersistStore } from '@/lib/stores/createStore';
import { useGameDifficulty } from '@/lib/stores/gameDifficultyStore';
import { setupLivesTimer } from '@/lib/stores/livesTimerHelpers';
import { makeLivesInitial, DEFAULT_DIFFICULTY_LIVES } from '@/lib/stores/utils/sliceUtils';
import type { LivesGameState } from '@/lib/types';
import { randInt as rnd } from '@/lib/utils';

// ── Question helpers ────────────────────────────────────────────────────────

const EMOJIS = ['🍎','🍊','🍋','🍇','🍓','🫐','🍒','🍑','🥝','🍉','🍍','🥭'];

export type Op = '+' | '-';

export interface Question {
  a: number; b: number; op: Op; answer: number;
  choices: number[]; emojiA: string; emojiB: string;
}

function pickEmoji() { return EMOJIS[Math.floor(Math.random() * EMOJIS.length)]!; }

export function makeQuestion(level: number): Question {
  const maxNum = Math.min(5 + level * 2, 15);
  const op: Op = level < 3 ? '+' : (Math.random() < 0.6 ? '+' : '-');
  let a: number, b: number;
  if (op === '+') {
    a = rnd(1, maxNum); b = rnd(1, maxNum - a + 1);
  } else {
    a = rnd(2, maxNum); b = rnd(1, a);
  }
  const answer = op === '+' ? a + b : a - b;
  const wrong = new Set<number>();
  while (wrong.size < 3) {
    const w = answer + rnd(-3, 3);
    if (w !== answer && w >= 0 && w <= 20) wrong.add(w);
  }
  const choices = [...wrong, answer].sort(() => Math.random() - 0.5);
  const e1 = pickEmoji(), e2 = op === '+' ? pickEmoji() : e1;
  return { a, b, op, answer, choices, emojiA: e1, emojiB: e2 };
}

// ── Store ───────────────────────────────────────────────────────────────────

export const TIME_PER_Q = 8;

const DIFFICULTY_TIME_EM = { easy: 12, medium: TIME_PER_Q, hard: 5 } as const;

interface EmojiMathState extends LivesGameState {
  q:      Question;
  level:  number;
  streak: number;
}

interface EmojiMathActions {
  startGame: () => void;
  tap:       (choice: number) => void;
}

const INITIAL = makeLivesInitial(TIME_PER_Q, { q: makeQuestion(1), level: 1, streak: 0 });

export const useEmojiMathStore = makePersistStore<EmojiMathState & EmojiMathActions>(
  'EmojiMathStore',
  'emoji-math-best',
  (set, get) => {
    const timer = setupLivesTimer({
      name: 'EmojiMathStore', timePerQ: TIME_PER_Q, feedbackMs: 900, initialLives: 3,
      set, get,
      getNextUpdates: () => ({ q: makeQuestion(get().level) }),
    });

    return {
      ...INITIAL,

      startGame: () => {
        const diff = useGameDifficulty.getState().difficulty;
        timer.startGame(() => ({ q: makeQuestion(1), level: 1, streak: 0 }));
        set({ lives: DEFAULT_DIFFICULTY_LIVES[diff], timeLeft: DIFFICULTY_TIME_EM[diff] });
      },

      tap: (choice: number) => {
        const { phase, feedback, q, streak, score, level } = get();
        if (phase !== 'playing' || feedback !== null) return;

        if (choice === q.answer) {
          const newStreak = streak + 1;
          const bonus     = newStreak >= 3 ? 20 : 10;
          const newScore  = score + bonus;
          const newLevel  = newScore > 0 && newScore % 50 === 0 ? level + 1 : level;
          timer.correct(bonus, { streak: newStreak, level: newLevel });
        } else {
          timer.wrong({ streak: 0 });
        }
      },
    };
  },
  { partialize: (s) => ({ best: s.best }) },
);
