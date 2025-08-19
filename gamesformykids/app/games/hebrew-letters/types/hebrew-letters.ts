/**
 * ===============================================
 * טיפוסים לContext של אותיות עבריות
 * ===============================================
 */

import { ReactNode } from 'react';
import { HebrewLetter } from '../constants/hebrewLetters';

/**
 * Drawing state interface for canvas operations
 */
export interface DrawingState {
  isDrawing: boolean;
  paths: ImageData[];
  currentStrokeWidth: number;
  currentStrokeColor: string;
  showLetterGuide: boolean;
  canvasWidth: number;
  canvasHeight: number;
  backgroundColor: string;
  lastDrawPosition: { x: number; y: number } | null;
}

/**
 * Practice progression state
 */
export interface PracticeState {
  currentStep: number;
  completedSteps: Set<number>;
  practiceMode: 'tracing' | 'freewriting' | 'guided';
}

/**
 * Encouragement and feedback state
 */
export interface EncouragementState {
  showEncouragement: boolean;
  currentMessage: string;
  isStepCompleted: boolean;
}

/**
 * Learning statistics and analytics
 */
export interface LearningStats {
  totalPracticeTime: number; // in milliseconds
  lettersStarted: Set<string>;
  lettersCompleted: Set<string>;
  totalStrokes: number;
  sessionStartTime: number;
  practiceHistory: Array<{
    letter: string;
    stepCompleted: number;
    timeSpent: number;
    timestamp: number;
  }>;
}

/**
 * Main context interface providing all Hebrew letter practice functionality
 */
export interface HebrewLettersContextType {
  // ========================================================================================
  // LETTER STATE MANAGEMENT
  // ========================================================================================
  
  /** Currently selected Hebrew letter */
  currentLetter: HebrewLetter | null;
  /** Set the current letter for practice */
  setCurrentLetter: (letter: HebrewLetter | null) => void;

  // ========================================================================================
  // DRAWING OPERATIONS
  // ========================================================================================
  
  /** Drawing canvas state */
  drawingState: DrawingState;
  /** Update drawing state properties */
  updateDrawingState: (updates: Partial<DrawingState>) => void;
  /** Clear the drawing canvas */
  clearCanvas: () => void;
  
  // ========================================================================================
  // PRACTICE PROGRESSION
  // ========================================================================================
  
  /** Practice step progression state */
  practiceState: PracticeState;
  /** Update practice state properties */
  updatePracticeState: (updates: Partial<PracticeState>) => void;
  /** Move to next practice step */
  nextStep: () => void;
  /** Move to previous practice step */
  previousStep: () => void;
  /** Mark a specific step as completed */
  markStepCompleted: (step: number) => void;
  /** Jump to a specific practice step */
  goToStep: (step: number) => void;
  
  // ========================================================================================
  // PRACTICE LOGIC
  // ========================================================================================
  
  /** Initialize practice for a new letter */
  initializeLetter: (letterData: HebrewLetter) => void;
  /** Complete the current practice step */
  completeCurrentStep: () => void;
  /** Check if a step is completed */
  isStepCompleted: (stepIndex: number) => boolean;
  /** Get information about current step */
  getCurrentStepInfo: () => {
    stepIndex: number;
    stepName: string;
    isCompleted: boolean;
    isFirst: boolean;
    isLast: boolean;
  };
  /** Get instructions for current practice step */
  getCurrentInstructions: () => string[];
  /** Get overall practice progress percentage */
  getOverallProgress: () => number;
  
  // ========================================================================================
  // ENCOURAGEMENT SYSTEM
  // ========================================================================================
  
  /** Encouragement and feedback state */
  encouragementState: EncouragementState;
  /** Show step completion encouragement */
  showStepEncouragement: () => void;
  /** Hide encouragement message */
  hideEncouragement: () => void;
  
  // ========================================================================================
  // CANVAS OPERATIONS
  // ========================================================================================
  
  /** Save current canvas state */
  saveCanvasState: (imageData: ImageData) => void;
  /** Undo last canvas action */
  undoLastAction: () => void;
  /** Initialize canvas with dimensions and background */
  initializeCanvas: (width: number, height: number, backgroundColor?: string) => void;
  /** Start drawing at position */
  startDrawing: (x: number, y: number) => void;
  /** Continue drawing to position */
  continueDrawing: (x: number, y: number) => void;
  /** Stop current drawing stroke */
  stopDrawing: () => void;
  /** Download canvas as image */
  downloadCanvas: (filename?: string) => void;
  /** Get mouse position relative to canvas */
  getCanvasPosition: (event: MouseEvent | TouchEvent, canvas: HTMLCanvasElement) => { x: number; y: number };
  /** Reset canvas to initial state */
  resetCanvas: () => void;
  
  // ========================================================================================
  // AUDIO AND SPEECH
  // ========================================================================================
  
  /** Play letter pronunciation */
  playLetterSound: (letter?: string) => void;
  /** Play encouragement sound */
  playEncouragementSound: () => void;
  /** Play step completion sound */
  playStepCompletionSound: () => void;
  /** Toggle audio on/off */
  toggleAudio: () => void;
  /** Audio enabled state */
  isAudioEnabled: boolean;
  
  // ========================================================================================
  // SETTINGS AND CONSTANTS
  // ========================================================================================
  
  /** Available stroke colors */
  strokeColors: readonly string[];
  /** Available stroke widths */
  strokeWidths: readonly number[];
  /** Practice step names */
  practiceSteps: readonly string[];
  /** Encouragement messages */
  encouragementMessages: readonly string[];
  /** Step-specific messages */
  stepMessages: Record<number, string>;
  
  // ========================================================================================
  // HELPER FUNCTIONS
  // ========================================================================================
  
  /** Get message for specific step */
  getStepMessage: (stepIndex: number) => string;
  /** Get completion message for letter */
  getCompletionMessage: (letterName: string) => string;
  /** Get CSS style for step tab */
  getStepTabStyle: (stepIndex: number) => string;
  /** Get icon for step tab */
  getStepTabIcon: (stepIndex: number) => string;
  
  // ========================================================================================
  // PROGRESS TRACKING
  // ========================================================================================
  
  /** Set of completed letter names */
  completedLetters: Set<string>;
  /** Mark a letter as fully completed */
  markLetterCompleted: (letterName: string) => void;
  /** Get progress percentage for specific letter */
  getLetterProgress: (letterName: string) => number;
  
  // ========================================================================================
  // ANALYTICS AND STATISTICS
  // ========================================================================================
  
  /** Learning statistics */
  learningStats: LearningStats;
  /** Start a new practice session */
  startPracticeSession: (letterName: string) => void;
  /** End current practice session */
  endPracticeSession: () => void;
  /** Log practice activity */
  logPracticeActivity: (letter: string, step: number, timeSpent: number) => void;
  /** Get total practice time */
  getTotalPracticeTime: () => number;
  /** Get practice statistics for letter */
  getLetterStats: (letterName: string) => {
    timesStarted: number;
    timesCompleted: number;
    totalTimeSpent: number;
    averageTimePerStep: number;
  };
  /** Export learning data */
  exportLearningData: () => string;
  /** Reset all statistics */
  resetAllStats: () => void;
}

export interface HebrewLettersProviderProps {
  children: ReactNode;
}
