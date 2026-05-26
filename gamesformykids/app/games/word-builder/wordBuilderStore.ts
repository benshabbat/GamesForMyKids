import { makeStore } from '@/lib/stores/createStore';
import type { PhaseResult as Phase } from '@/lib/types';
import { WORD_PUZZLES, type WordPuzzle, shuffleLetters } from './data/words';

// ── Types ──────────────────────────────────────────────────────────────────

export type { WordPuzzle } from './data/words';
export interface AvailableLetter { letter: string; used: boolean; }

// ── Store ──────────────────────────────────────────────────────────────────

interface WordBuilderState {
  phase:     Phase;
  puzzles:   WordPuzzle[];
  index:     number;
  score:     number;
  typed:     string[];
  available: AvailableLetter[];
  status:    'idle' | 'correct' | 'wrong';
}

interface WordBuilderActions {
  startGame:   () => void;
  pressLetter: (idx: number) => void;
  clearTyped:  () => void;
  next:        () => void;
}

const INITIAL: WordBuilderState = {
  phase: 'menu', puzzles: [], index: 0, score: 0,
  typed: [], available: [], status: 'idle',
};

function makePuzzles(): WordPuzzle[] {
  return [...WORD_PUZZLES].sort(() => Math.random() - 0.5).slice(0, 10);
}

function loadLetters(word: string): AvailableLetter[] {
  return shuffleLetters(word).map(l => ({ letter: l, used: false }));
}

export const useWordBuilderStore = makeStore<WordBuilderState & WordBuilderActions>(
  'WordBuilderStore',
  (set, get) => ({
    ...INITIAL,

    startGame: () => {
      const puzzles = makePuzzles();
      set(
        { ...INITIAL, phase: 'playing', puzzles, available: loadLetters(puzzles[0]!.word) },
        false, 'wordBuilder/startGame',
      );
    },

    pressLetter: (idx: number) => {
      const { status, available, typed, puzzles, index, score } = get();
      if (status !== 'idle') return;
      const letter = available[idx];
      if (!letter || letter.used) return;

      const newTyped  = [...typed, letter.letter];
      const newAvail  = available.map((l, i) => i === idx ? { ...l, used: true } : l);
      const wordLen   = puzzles[index]!.word.length;

      if (newTyped.length < wordLen) {
        set({ typed: newTyped, available: newAvail }, false, 'wordBuilder/press');
        return;
      }

      const attempt = newTyped.join('');
      const correct = attempt === puzzles[index]!.word;
      set(
        { typed: newTyped, available: newAvail, status: correct ? 'correct' : 'wrong', score: correct ? score + 1 : score },
        false, `wordBuilder/${correct ? 'correct' : 'wrong'}`,
      );
    },

    clearTyped: () => {
      const { available } = get();
      set(
        { available: available.map(l => ({ ...l, used: false })), typed: [], status: 'idle' },
        false, 'wordBuilder/clear',
      );
    },

    next: () => {
      const { index, puzzles } = get();
      if (index < puzzles.length - 1) {
        const nextIdx = index + 1;
        set(
          { index: nextIdx, available: loadLetters(puzzles[nextIdx]!.word), typed: [], status: 'idle' },
          false, 'wordBuilder/next',
        );
      } else {
        set({ phase: 'result' }, false, 'wordBuilder/result');
      }
    },
  }),
);
