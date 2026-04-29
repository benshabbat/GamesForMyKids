import type { StateCreator } from 'zustand';
import type { HebrewLettersStore } from '../types';
import type { HebrewLetter } from '../../constants/hebrewLetters';

export type LetterSlice = {
  currentLetter: HebrewLetter | null;
  completedLetters: Set<string>;
  setCurrentLetter: (letter: HebrewLetter | null) => void;
  addCompletedLetter: (letterName: string) => void;
  resetCompletedLetters: () => void;
};

export const createLetterSlice: StateCreator<HebrewLettersStore, [['zustand/devtools', never]], [], LetterSlice> = (set) => ({
  currentLetter: null,
  completedLetters: new Set<string>(),

  setCurrentLetter: (letter) =>
    set({ currentLetter: letter }, false, 'hebrewLetters/setCurrentLetter'),

  addCompletedLetter: (letterName) =>
    set(
      (s) => ({ completedLetters: new Set([...s.completedLetters, letterName]) }),
      false,
      'hebrewLetters/addCompletedLetter',
    ),

  resetCompletedLetters: () =>
    set({ completedLetters: new Set<string>() }, false, 'hebrewLetters/resetCompleted'),
});
