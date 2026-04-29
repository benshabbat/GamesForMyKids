import type { HebrewLetter } from '../constants/hebrewLetters';
import type {
  DrawingState,
  PracticeState,
  EncouragementState,
  LearningStats,
} from '../types/hebrew-letters';

// ── State ──────────────────────────────────────────────────
export interface HebrewLettersState {
  currentLetter: HebrewLetter | null;
  completedLetters: Set<string>;
  isAudioEnabled: boolean;
  drawingState: DrawingState;
  practiceState: PracticeState;
  encouragementState: EncouragementState;
  learningStats: LearningStats;
}

// ── Actions ────────────────────────────────────────────────
export interface HebrewLettersStoreActions {
  // Letter management
  setCurrentLetter: (letter: HebrewLetter | null) => void;
  addCompletedLetter: (letterName: string) => void;
  resetCompletedLetters: () => void;

  // Audio
  setIsAudioEnabled: (enabled: boolean) => void;
  toggleAudio: () => void;
  speakText: (text: string, settings?: { rate?: number; pitch?: number; volume?: number; lang?: string }) => void;
  playLetterSound: (letter?: string) => void;
  playEncouragementSound: () => void;
  playStepCompletionSound: () => void;

  // Drawing
  updateDrawingState: (updates: Partial<DrawingState>) => void;
  clearCanvas: () => void;
  saveCanvasState: (imageData: ImageData) => void;
  undoLastAction: () => void;
  initializeCanvas: (width: number, height: number, backgroundColor?: string) => void;
  startDrawing: (x: number, y: number) => void;
  continueDrawing: (x: number, y: number) => void;
  stopDrawing: () => void;
  resetCanvas: () => void;
  updateStrokeColor: (color: string) => void;
  updateStrokeWidth: (width: number) => void;

  // Practice
  selectLetter: (letter: HebrewLetter) => void;
  nextStep: () => void;
  previousStep: () => void;
  jumpToStep: (stepIndex: number) => void;
  completeCurrentStep: () => void;
  completeLetter: () => void;
  resetPracticeProgress: () => void;

  // Encouragement
  showEncouragement: (message?: string, duration?: number) => void;
  hideEncouragement: () => void;

  // Session / stats
  startPracticeSession: (letterName: string) => void;
  endPracticeSession: () => void;
  resetAllStats: () => void;
}

export type HebrewLettersStore = HebrewLettersState & HebrewLettersStoreActions;
