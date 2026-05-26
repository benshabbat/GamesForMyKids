import type { StateCreator } from 'zustand';
import type { HebrewLettersStore } from '../types';
import type { EncouragementState, LearningStats } from '../../types/hebrew-letters';
import {
  DEFAULT_ENCOURAGEMENT_STATE,
  DEFAULT_LEARNING_STATS,
  ENCOURAGEMENT_MESSAGES,
} from '../../constants/hebrewLettersConstants';

// Module-level ref lives here since showEncouragement/hideEncouragement manage it
let encouragementTimerRef: ReturnType<typeof setTimeout> | null = null;

export type StatsSlice = {
  encouragementState: EncouragementState;
  learningStats: LearningStats;
  showEncouragement: (message?: string, duration?: number) => void;
  hideEncouragement: () => void;
  startPracticeSession: (letterName: string) => void;
  endPracticeSession: () => void;
  resetAllStats: () => void;
};

export const createStatsSlice: StateCreator<HebrewLettersStore, [['zustand/devtools', never]], [], StatsSlice> = (set) => ({
  encouragementState: { ...DEFAULT_ENCOURAGEMENT_STATE },
  learningStats: { ...DEFAULT_LEARNING_STATS },

  showEncouragement: (message, duration = 2000) => {
    if (encouragementTimerRef) clearTimeout(encouragementTimerRef);
    const msg =
      message ??
      ENCOURAGEMENT_MESSAGES[Math.floor(Math.random() * ENCOURAGEMENT_MESSAGES.length)];
    set(
      { encouragementState: { showEncouragement: true, currentMessage: msg, isStepCompleted: false } },
      false,
      'hebrewLetters/showEncouragement',
    );
    encouragementTimerRef = setTimeout(() => {
      set(
        (s) => ({ encouragementState: { ...s.encouragementState, showEncouragement: false } }),
        false,
        'hebrewLetters/hideEncouragement',
      );
      encouragementTimerRef = null;
    }, duration);
  },

  hideEncouragement: () => {
    if (encouragementTimerRef) {
      clearTimeout(encouragementTimerRef);
      encouragementTimerRef = null;
    }
    set(
      (s) => ({ encouragementState: { ...s.encouragementState, showEncouragement: false } }),
      false,
      'hebrewLetters/hideEncouragement',
    );
  },

  startPracticeSession: (letterName) =>
    set(
      (s) => ({
        learningStats: {
          ...s.learningStats,
          lettersStarted: new Set([...s.learningStats.lettersStarted, letterName]),
          sessionStartTime: Date.now(),
        },
      }),
      false,
      'hebrewLetters/startSession',
    ),

  endPracticeSession: () =>
    set(
      (s) => ({ learningStats: { ...s.learningStats, sessionStartTime: 0 } }),
      false,
      'hebrewLetters/endSession',
    ),

  resetAllStats: () =>
    set(
      {
        completedLetters: new Set<string>(),
        learningStats: { ...DEFAULT_LEARNING_STATS },
      },
      false,
      'hebrewLetters/resetAllStats',
    ),
});
