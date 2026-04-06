/**
 * ===============================================
 * Hebrew Letters Store — Zustand
 * ===============================================
 * מנהל את מצב האותיות העבריות ברמה הגלובלית:
 * - האות הנוכחית
 * - אותיות שהושלמו
 * - מצב אודיו
 *
 * המצב הפנימי של הציור והתרגול (drawingState, practiceState)
 * נשאר ב-HebrewLettersContext היכן ש-operations hooks משתמשים בו.
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { HebrewLetter } from '@/app/games/hebrew-letters/constants/hebrewLetters';

// ── State ──────────────────────────────────────────────────
export interface HebrewLettersState {
  currentLetter: HebrewLetter | null;
  completedLetters: Set<string>;
  isAudioEnabled: boolean;
}

// ── Actions ────────────────────────────────────────────────
export interface HebrewLettersStoreActions {
  setCurrentLetter: (letter: HebrewLetter | null) => void;
  addCompletedLetter: (letterName: string) => void;
  resetCompletedLetters: () => void;
  setIsAudioEnabled: (enabled: boolean) => void;
  toggleAudio: () => void;
}

// ── Store ──────────────────────────────────────────────────
export const useHebrewLettersStore = create<HebrewLettersState & HebrewLettersStoreActions>()(
  devtools(
    (set) => ({
      currentLetter: null,
      completedLetters: new Set<string>(),
      isAudioEnabled: true,

      setCurrentLetter: (letter) =>
        set({ currentLetter: letter }, false, 'hebrewLetters/setCurrentLetter'),

      addCompletedLetter: (letterName) =>
        set(
          (state) => ({ completedLetters: new Set([...state.completedLetters, letterName]) }),
          false,
          'hebrewLetters/addCompletedLetter',
        ),

      resetCompletedLetters: () =>
        set({ completedLetters: new Set<string>() }, false, 'hebrewLetters/resetCompleted'),

      setIsAudioEnabled: (enabled) =>
        set({ isAudioEnabled: enabled }, false, 'hebrewLetters/setAudio'),

      toggleAudio: () =>
        set(
          (state) => ({ isAudioEnabled: !state.isAudioEnabled }),
          false,
          'hebrewLetters/toggleAudio',
        ),
    }),
    { name: 'HebrewLettersStore' },
  ),
);
