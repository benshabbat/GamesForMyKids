/**
 * ===============================================
 * טיפוסים לאותיות עבריות
 * ===============================================
 */

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


