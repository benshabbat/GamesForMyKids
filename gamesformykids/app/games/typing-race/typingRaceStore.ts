'use client';
import { create } from 'zustand';
import { TYPING_WORDS_BY_LEVEL } from './typingWordBank';
import { shuffle } from '@/lib/utils';

const WORDS_PER_GAME = 10;

type Phase = 'menu' | 'playing' | 'result';

interface State {
  phase: Phase;
  words: string[];
  currentIndex: number;
  typedCount: number;
  errorCount: number;
  wordTimes: number[];
  wordStartTime: number;
  hasError: boolean;
  level: 'easy' | 'medium' | 'hard';
}

interface Actions {
  startGame: (level?: 'easy' | 'medium' | 'hard') => void;
  typeKey: (letter: string) => void;
  clearError: () => void;
  restart: () => void;
  goToMenu: () => void;
}

const INITIAL: State = {
  phase: 'menu',
  words: [],
  currentIndex: 0,
  typedCount: 0,
  errorCount: 0,
  wordTimes: [],
  wordStartTime: 0,
  hasError: false,
  level: 'easy',
};

export const useTypingRaceStore = create<State & Actions>((set, get) => ({
  ...INITIAL,

  startGame: (level = 'easy') => {
    const pool = TYPING_WORDS_BY_LEVEL[level];
    const words = shuffle([...pool]).slice(0, WORDS_PER_GAME);
    set({
      phase: 'playing',
      words,
      currentIndex: 0,
      typedCount: 0,
      errorCount: 0,
      wordTimes: [],
      wordStartTime: Date.now(),
      hasError: false,
      level,
    });
  },

  typeKey: (letter: string) => {
    const { words, currentIndex, typedCount, errorCount, wordTimes, wordStartTime } = get();
    const currentWord = words[currentIndex] ?? '';
    const expectedLetter = currentWord[typedCount] ?? '';

    if (letter === expectedLetter) {
      const newTypedCount = typedCount + 1;
      if (newTypedCount >= currentWord.length) {
        const elapsed = Date.now() - wordStartTime;
        const newTimes = [...wordTimes, elapsed];
        const newIndex = currentIndex + 1;
        if (newIndex >= words.length) {
          set({ phase: 'result', wordTimes: newTimes, typedCount: 0 });
        } else {
          set({
            currentIndex: newIndex,
            typedCount: 0,
            wordTimes: newTimes,
            wordStartTime: Date.now(),
          });
        }
      } else {
        set({ typedCount: newTypedCount });
      }
    } else {
      set({ errorCount: errorCount + 1, hasError: true });
    }
  },

  clearError: () => set({ hasError: false }),

  restart: () => {
    const { level } = get();
    get().startGame(level);
  },

  goToMenu: () => set(INITIAL),
}));
