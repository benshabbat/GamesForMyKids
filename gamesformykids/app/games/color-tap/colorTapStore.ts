import { makeStore } from '@/lib/stores/createStore';
import { setupLivesTimer } from '@/lib/stores/livesTimerHelpers';
import { makeLivesInitial } from '@/lib/stores/utils/sliceUtils';
import type { LivesGameState } from '@/lib/types';

// ── Color data ──────────────────────────────────────────────────────────────

export const COLORS = [
  { name: 'אדום',  bg: 'bg-red-500',    hex: '#ef4444', emoji: '🔴' },
  { name: 'כחול',  bg: 'bg-blue-500',   hex: '#3b82f6', emoji: '🔵' },
  { name: 'ירוק',  bg: 'bg-green-500',  hex: '#22c55e', emoji: '🟢' },
  { name: 'צהוב',  bg: 'bg-yellow-400', hex: '#facc15', emoji: '🟡' },
  { name: 'סגול',  bg: 'bg-purple-500', hex: '#a855f7', emoji: '🟣' },
  { name: 'כתום',  bg: 'bg-orange-500', hex: '#f97316', emoji: '🟠' },
  { name: 'ורוד',  bg: 'bg-pink-400',   hex: '#f472b6', emoji: '🩷' },
  { name: 'תכלת',  bg: 'bg-cyan-400',   hex: '#22d3ee', emoji: '🩵' },
];

export type ColorItem = typeof COLORS[number];

export interface Question {
  target:  ColorItem;
  options: ColorItem[];
}

function makeQuestion(): Question {
  const shuffled = [...COLORS].sort(() => Math.random() - 0.5) as ColorItem[];
  return { target: shuffled[0], options: shuffled.slice(0, 4).sort(() => Math.random() - 0.5) };
}

// ── Store ───────────────────────────────────────────────────────────────────

export const TIME_PER_Q = 5;

interface ColorTapState extends LivesGameState {
  question: Question;
}

interface ColorTapActions {
  startGame: () => void;
  handleTap: (color: ColorItem) => void;
}

const INITIAL = makeLivesInitial(TIME_PER_Q, { question: makeQuestion() });

export const useColorTapStore = makeStore<ColorTapState & ColorTapActions>(
  'ColorTapStore',
  (set, get) => {
    const timer = setupLivesTimer({
      name: 'ColorTapStore', timePerQ: TIME_PER_Q, feedbackMs: 700, initialLives: 3,
      set, get,
      getNextUpdates: () => ({ question: makeQuestion() }),
    });

    return {
      ...INITIAL,

      startGame: () => timer.startGame(() => ({ question: makeQuestion() })),

      handleTap: (color: ColorItem) => {
        const { phase, feedback, question } = get();
        if (phase !== 'playing' || feedback !== null) return;
        if (color === question.target) timer.correct(10);
        else timer.wrong();
      },
    };
  },
);
