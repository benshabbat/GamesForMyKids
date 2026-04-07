import { create } from 'zustand';
import { COUNTRIES, QUESTIONS_PER_GAME, Country, QuestionMode } from './data/countries';
import type { PhaseResult as Phase } from '@/lib/types';

export interface GeoQuestion {
  country: Country;
  mode: QuestionMode;
  choices: Country[];
}

function buildQuestion(pool: Country[], mode: QuestionMode): GeoQuestion {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const country = shuffled[0];
  const distractors = shuffled.slice(1, 4);
  const choices = [country, ...distractors].sort(() => Math.random() - 0.5);
  return { country, mode, choices };
}

interface GeographyState {
  phase: Phase;
  questions: GeoQuestion[];
  index: number;
  score: number;
  selected: string | null;
  isCorrect: boolean | null;
  mode: QuestionMode;
}

interface GeographyActions {
  startGame: (mode?: QuestionMode) => void;
  selectAnswer: (id: string) => void;
  next: () => void;
  goMenu: () => void;
  restart: () => void;
}

export const useGeographyGameStore = create<GeographyState & GeographyActions>()((set, get) => ({
  phase: 'menu',
  questions: [],
  index: 0,
  score: 0,
  selected: null,
  isCorrect: null,
  mode: 'capital',

  startGame: (mode: QuestionMode = 'capital') => {
    const pool = [...COUNTRIES].sort(() => Math.random() - 0.5).slice(0, QUESTIONS_PER_GAME + 4);
    const qs: GeoQuestion[] = [];
    for (let i = 0; i < QUESTIONS_PER_GAME; i++) {
      const slice = pool.slice(i);
      if (slice.length < 4) break;
      qs.push(buildQuestion(slice, mode));
    }
    set({ phase: 'playing', questions: qs, index: 0, score: 0, selected: null, isCorrect: null, mode });
  },

  selectAnswer: (id: string) => {
    const { selected, questions, index, score } = get();
    const current = questions[index];
    if (selected || !current) return;
    const ok = id === current.country.id;
    set({ selected: id, isCorrect: ok, score: ok ? score + 1 : score });
  },

  next: () => {
    const { index, questions } = get();
    const n = index + 1;
    if (n >= questions.length) {
      set({ phase: 'result' });
    } else {
      set({ index: n, selected: null, isCorrect: null });
    }
  },

  goMenu: () => set({ phase: 'menu' }),

  restart: () => {
    const { mode } = get();
    get().startGame(mode);
  },
}));
