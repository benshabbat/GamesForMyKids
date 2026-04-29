import type { StateCreator } from 'zustand';
import type { HebrewLettersStore } from '../types';
import type { PracticeState } from '../../types/hebrew-letters';
import type { HebrewLetter } from '../../constants/hebrewLetters';
import {
  PRACTICE_STEPS,
  DEFAULT_PRACTICE_STATE,
  DEFAULT_ENCOURAGEMENT_STATE,
} from '../../constants/hebrewLettersConstants';

export type PracticeSlice = {
  practiceState: PracticeState;
  selectLetter: (letter: HebrewLetter) => void;
  nextStep: () => void;
  previousStep: () => void;
  jumpToStep: (stepIndex: number) => void;
  completeCurrentStep: () => void;
  completeLetter: () => void;
  resetPracticeProgress: () => void;
};

export const createPracticeSlice: StateCreator<HebrewLettersStore, [['zustand/devtools', never]], [], PracticeSlice> = (set, get) => ({
  practiceState: { ...DEFAULT_PRACTICE_STATE, completedSteps: new Set<number>() },

  selectLetter: (letter) =>
    set(
      {
        currentLetter: letter,
        practiceState: { ...DEFAULT_PRACTICE_STATE, completedSteps: new Set<number>() },
        encouragementState: { ...DEFAULT_ENCOURAGEMENT_STATE },
      },
      false,
      'hebrewLetters/selectLetter',
    ),

  nextStep: () =>
    set(
      (s) => {
        const next = Math.min(s.practiceState.currentStep + 1, PRACTICE_STEPS.length - 1);
        return {
          practiceState: {
            ...s.practiceState,
            currentStep: next,
            completedSteps: new Set([...s.practiceState.completedSteps, s.practiceState.currentStep]),
          },
        };
      },
      false,
      'hebrewLetters/nextStep',
    ),

  previousStep: () =>
    set(
      (s) => ({
        practiceState: {
          ...s.practiceState,
          currentStep: Math.max(s.practiceState.currentStep - 1, 0),
        },
      }),
      false,
      'hebrewLetters/prevStep',
    ),

  jumpToStep: (stepIndex) => {
    if (stepIndex < 0 || stepIndex >= PRACTICE_STEPS.length) return;
    set(
      (s) => ({ practiceState: { ...s.practiceState, currentStep: stepIndex } }),
      false,
      'hebrewLetters/jumpToStep',
    );
  },

  completeCurrentStep: () => {
    const { practiceState, showEncouragement } = get();
    if (practiceState.completedSteps.has(practiceState.currentStep)) return;
    set(
      (s) => ({
        practiceState: {
          ...s.practiceState,
          completedSteps: new Set([...s.practiceState.completedSteps, s.practiceState.currentStep]),
        },
      }),
      false,
      'hebrewLetters/completeStep',
    );
    showEncouragement();
  },

  completeLetter: () => {
    const { currentLetter, learningStats, showEncouragement } = get();
    if (!currentLetter) return;
    const letterName = currentLetter.letter;
    const sessionTime = learningStats.sessionStartTime
      ? Date.now() - learningStats.sessionStartTime
      : 0;
    set(
      (s) => ({
        completedLetters: new Set([...s.completedLetters, letterName]),
        practiceState: { ...s.practiceState, isCompleted: true } as PracticeState,
        learningStats: {
          ...s.learningStats,
          lettersCompleted: new Set([...s.learningStats.lettersCompleted, letterName]),
          totalPracticeTime: s.learningStats.totalPracticeTime + sessionTime,
          sessionStartTime: 0,
          practiceHistory: [
            ...s.learningStats.practiceHistory,
            {
              letter: letterName,
              stepCompleted: s.practiceState.completedSteps.size,
              timeSpent: sessionTime,
              timestamp: Date.now(),
            },
          ],
        },
      }),
      false,
      'hebrewLetters/completeLetter',
    );
    showEncouragement('כל הכבוד! סיימת את התרגול בהצלחה!', 3000);
  },

  resetPracticeProgress: () =>
    set(
      { practiceState: { ...DEFAULT_PRACTICE_STATE, completedSteps: new Set<number>() } },
      false,
      'hebrewLetters/resetPractice',
    ),
});
