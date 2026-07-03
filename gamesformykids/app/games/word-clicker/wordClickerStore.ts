'use client';
import { create } from 'zustand';

export interface FloatingLetter {
  id: string;
  letter: string;
  x: number;
  y: number;
  isCorrectNext: boolean;
  shaking: boolean;
}

interface WordClickerState {
  phase: 'idle' | 'playing' | 'result';
  words: string[];
  wordIndex: number;
  currentLetterIndex: number;
  score: number;
  floatingLetters: FloatingLetter[];
  feedback: 'correct' | 'wrong' | null;
  wordComplete: boolean;
}

interface WordClickerActions {
  startGame: () => void;
  tapLetter: (id: string) => void;
  nextWord: () => void;
  clearFeedback: () => void;
  clearShaking: () => void;
  reset: () => void;
}

const WORD_LIST = [
  'שמש', 'ירח', 'כלב', 'פרח', 'גזר', 'ספר', 'ילד', 'ים',
  'שלום', 'תפוח', 'ילדה', 'ספינה', 'בית', 'ענן', 'עץ',
  'פיל', 'דג', 'סוס', 'דב', 'חתול',
];

const EXTRA_LETTERS = 'אבגדהוזחטיכלמנסעפצקרשת';

function buildFloatingLetters(word: string): FloatingLetter[] {
  const wordLetters = word.split('').map((letter, i) => ({
    id: `w-${i}-${letter}`,
    letter,
    x: 0,
    y: 0,
    isCorrectNext: i === 0,
    shaking: false,
  }));

  const distractors: FloatingLetter[] = [];
  const pool = EXTRA_LETTERS.split('').filter(l => !word.includes(l));
  const shuffledPool = pool.sort(() => Math.random() - 0.5).slice(0, 3);
  shuffledPool.forEach((letter, i) => {
    distractors.push({
      id: `d-${i}-${letter}`,
      letter,
      x: 0,
      y: 0,
      isCorrectNext: false,
      shaking: false,
    });
  });

  return [...wordLetters, ...distractors].sort(() => Math.random() - 0.5);
}

export const useWordClickerStore = create<WordClickerState & WordClickerActions>((set, get) => ({
  phase: 'idle',
  words: [],
  wordIndex: 0,
  currentLetterIndex: 0,
  score: 0,
  floatingLetters: [],
  feedback: null,
  wordComplete: false,

  startGame: () => {
    const words = [...WORD_LIST].sort(() => Math.random() - 0.5).slice(0, 8);
    const firstWord = words[0] ?? WORD_LIST[0] ?? 'שמש';
    set({
      phase: 'playing',
      words,
      wordIndex: 0,
      currentLetterIndex: 0,
      score: 0,
      floatingLetters: buildFloatingLetters(firstWord),
      feedback: null,
      wordComplete: false,
    });
  },

  tapLetter: (id: string) => {
    const { words, wordIndex, currentLetterIndex, floatingLetters, score } = get();
    const word = words[wordIndex];
    if (!word) return;
    const expectedLetter = word[currentLetterIndex];
    const tapped = floatingLetters.find(l => l.id === id);
    if (!tapped) return;

    if (tapped.letter === expectedLetter) {
      const nextIndex = currentLetterIndex + 1;
      const wordDone = nextIndex >= word.length;

      if (wordDone) {
        set({ feedback: 'correct', score: score + 1, wordComplete: true });
      } else {
        const updatedLetters = floatingLetters.map(l => ({
          ...l,
          isCorrectNext: l.id !== id && l.letter === word[nextIndex],
          shaking: false,
        }));
        set({ currentLetterIndex: nextIndex, floatingLetters: updatedLetters, feedback: 'correct' });
      }
    } else {
      const updatedLetters = floatingLetters.map(l =>
        l.id === id ? { ...l, shaking: true } : l
      );
      set({ floatingLetters: updatedLetters, feedback: 'wrong' });
    }
  },

  nextWord: () => {
    const { words, wordIndex } = get();
    const nextWordIndex = wordIndex + 1;
    if (nextWordIndex >= words.length) {
      set({ phase: 'result', wordComplete: false, feedback: null });
      return;
    }
    const nextWord = words[nextWordIndex] ?? '';
    set({
      wordIndex: nextWordIndex,
      currentLetterIndex: 0,
      floatingLetters: buildFloatingLetters(nextWord),
      feedback: null,
      wordComplete: false,
    });
  },

  clearFeedback: () => set({ feedback: null }),

  clearShaking: () => set(s => ({
    floatingLetters: s.floatingLetters.map(l => ({ ...l, shaking: false })),
    feedback: null,
  })),

  reset: () => set({
    phase: 'idle',
    words: [],
    wordIndex: 0,
    currentLetterIndex: 0,
    score: 0,
    floatingLetters: [],
    feedback: null,
    wordComplete: false,
  }),
}));
