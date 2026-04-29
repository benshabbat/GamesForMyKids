import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { TOTAL_HEBREW_LETTERS } from '../constants/hebrewLetters';
import { PRACTICE_STEPS, STEP_MESSAGES } from '../constants/hebrewLettersConstants';
import type { PracticeState } from '../types/hebrew-letters';
import type { HebrewLetter } from '../constants/hebrewLetters';
import type { HebrewLettersState, HebrewLettersStore } from './types';

import { createLetterSlice } from './slices/letterSlice';
import { createAudioSlice } from './slices/audioSlice';
import { createDrawingSlice } from './slices/drawingSlice';
import { createPracticeSlice } from './slices/practiceSlice';
import { createStatsSlice } from './slices/statsSlice';

// Re-export interfaces for backward compat
export type { HebrewLettersState, HebrewLettersStore };
export type { HebrewLettersStoreActions } from './types';

// ── Store ──────────────────────────────────────────────────
export const useHebrewLettersStore = create<HebrewLettersStore>()(
  devtools(
    (...a) => ({
      ...createLetterSlice(...a),
      ...createAudioSlice(...a),
      ...createDrawingSlice(...a),
      ...createPracticeSlice(...a),
      ...createStatsSlice(...a),
    }),
    { name: 'hebrewLettersStore' },
  ),
);

// ── Pure utility functions ─────────────────────────────────

export function getStepMessage(practiceState: PracticeState, stepIndex: number): string {
  const baseMessage = STEP_MESSAGES[stepIndex as keyof typeof STEP_MESSAGES] ?? 'כל הכבוד!';
  if (practiceState.completedSteps.has(stepIndex)) return `✅ ${baseMessage} השלב הושלם!`;
  if (practiceState.practiceMode === 'tracing') return `${baseMessage} עקוב אחר הקווים בעדינות`;
  if (practiceState.practiceMode === 'freewriting') return `${baseMessage} כתוב את האות בחופשיות`;
  return baseMessage;
}

export function getCurrentInstructions(
  currentLetter: HebrewLetter | null,
  practiceState: PracticeState,
): string[] {
  if (!currentLetter) return ['בחר אות לתרגול'];
  switch (practiceState.currentStep) {
    case 0:
      return [
        `התבונני באות ${currentLetter.letter} הגדולה למעלה`,
        `האות ${currentLetter.letter} נקראת "${currentLetter.pronunciation}"`,
        `למד על צורת האות ואיך היא נכתבת`,
      ];
    case 1:
      return [
        `עקבי באצבע על האותיות המנוקדות`,
        `התחילי מהנקודה העליונה של האות`,
        `עקבי לאט ובזהירות על הקווים`,
        `או תרגלי כתיבה על הקנבס עם המדריך`,
      ];
    case 2:
      return [
        `עכשיו תרגלי לכתוב את האות ${currentLetter.letter} בעצמך בחופשיות`,
        `בלי מדריך - תהיי יצירתית!`,
        `השתמשי בעכבר או במגע על המסך`,
        `זכרי לכתוב מימין לשמאל`,
        `נסי צבעים וגדלים שונים`,
      ];
    default:
      return [`תרגלי את האות ${currentLetter.letter}`];
  }
}

export function getOverallProgress(practiceState: PracticeState): number {
  return Math.round((practiceState.completedSteps.size / PRACTICE_STEPS.length) * 100);
}

export function getStepTabStyle(practiceState: PracticeState, stepIndex: number): string {
  if (practiceState.currentStep === stepIndex) return 'bg-purple-500 text-white';
  if (practiceState.completedSteps.has(stepIndex)) return 'bg-green-200 text-green-800 hover:bg-green-300';
  return 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300';
}

export function getStepTabIcon(practiceState: PracticeState, stepIndex: number): string {
  return practiceState.completedSteps.has(stepIndex) ? '✓' : '';
}

export const selectLettersCompletionPercent = (s: HebrewLettersState): number =>
  Math.round((s.completedLetters.size / TOTAL_HEBREW_LETTERS) * 100);

export function getLetterProgress(letterName: string): number {
  const { completedLetters, currentLetter, practiceState } = useHebrewLettersStore.getState();
  if (completedLetters.has(letterName)) return 100;
  if (currentLetter?.letter === letterName) {
    return Math.round((practiceState.completedSteps.size / PRACTICE_STEPS.length) * 100);
  }
  return 0;
}

export function getCanvasPosition(
  event: MouseEvent | TouchEvent,
  canvas: HTMLCanvasElement,
): { x: number; y: number } {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  let clientX: number, clientY: number;
  if (event instanceof MouseEvent) {
    clientX = event.clientX;
    clientY = event.clientY;
  } else {
    clientX = event.touches[0]?.clientX ?? 0;
    clientY = event.touches[0]?.clientY ?? 0;
  }
  return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
}
