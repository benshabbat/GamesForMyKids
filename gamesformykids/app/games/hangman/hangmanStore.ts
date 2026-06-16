'use client';
import { create } from 'zustand';
import { WORD_CATEGORIES, CATEGORY_NAMES, type WordEntry } from './data/wordCategories';

const MAX_WRONG = 6;

const HEBREW_ALPHABET = 'אבגדהוזחטיכלמנסעפצקרשת';

export type Phase = 'menu' | 'playing' | 'won' | 'lost';

interface State {
  phase: Phase;
  categoryName: string;
  entry: WordEntry;
  guessed: Set<string>;
  wrongCount: number;
  score: number;
  streak: number;
  alphabet: string[];
}

interface Actions {
  startGame: (categoryName: string) => void;
  guessLetter: (letter: string) => void;
  nextWord: () => void;
  resetGame: () => void;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

export const useHangmanStore = create<State & Actions>((set, get) => ({
  phase: 'menu',
  categoryName: '',
  entry: { word: '', hint: '' },
  guessed: new Set(),
  wrongCount: 0,
  score: 0,
  streak: 0,
  alphabet: HEBREW_ALPHABET.split(''),

  startGame: (categoryName) => {
    const words = WORD_CATEGORIES[categoryName];
    if (!words || words.length === 0) return;
    const entry = pickRandom(words);
    set({ phase: 'playing', categoryName, entry, guessed: new Set(), wrongCount: 0 });
  },

  guessLetter: (letter) => {
    const { entry, guessed, wrongCount, score, streak } = get();
    if (guessed.has(letter)) return;

    const newGuessed = new Set(guessed);
    newGuessed.add(letter);

    const isCorrect = entry.word.includes(letter);
    const newWrong = isCorrect ? wrongCount : wrongCount + 1;

    const allRevealed = entry.word.split('').every(ch => newGuessed.has(ch));

    if (allRevealed) {
      const bonus = (MAX_WRONG - newWrong) * 10;
      set({ guessed: newGuessed, wrongCount: newWrong, phase: 'won', score: score + 50 + bonus, streak: streak + 1 });
    } else if (newWrong >= MAX_WRONG) {
      set({ guessed: newGuessed, wrongCount: newWrong, phase: 'lost', streak: 0 });
    } else {
      set({ guessed: newGuessed, wrongCount: newWrong });
    }
  },

  nextWord: () => {
    const { categoryName } = get();
    const words = WORD_CATEGORIES[categoryName];
    if (!words || words.length === 0) return;
    const entry = pickRandom(words);
    set({ phase: 'playing', entry, guessed: new Set(), wrongCount: 0 });
  },

  resetGame: () => {
    const cat = pickRandom(CATEGORY_NAMES);
    set({ phase: 'menu', categoryName: cat, score: 0, streak: 0, guessed: new Set(), wrongCount: 0 });
  },
}));
