/**
 * ===============================================
 * טיפוסים לContext של אותיות עבריות
 * ===============================================
 */

export interface DrawingState {
  isDrawing: boolean;
  currentStroke: Array<{ x: number; y: number }>;
  allStrokes: Array<Array<{ x: number; y: number }>>;
  strokeColor: string;
  strokeWidth: number;
  canvasSize: { width: number; height: number };
}

export interface PracticeState {
  attempts: number;
  correctAttempts: number;
  startTime: Date | null;
  endTime: Date | null;
  mistakes: Array<{ timestamp: Date; type: string }>;
}

export interface EncouragementState {
  level: 'beginner' | 'intermediate' | 'advanced';
  showEncouragement: boolean;
  encouragementType: 'success' | 'effort' | 'improvement';
  customMessage?: string;
}

export interface LearningStats {
  totalPracticeTime: number;
  lettersLearned: string[];
  averageAccuracy: number;
  streakCount: number;
  lastPracticeDate: Date | null;
  practiceSessionsCount: number;
  favoriteLetters: string[];
  challengingLetters: string[];
}

export interface HebrewLettersContextType {
  // Current letter state
  currentLetter: string | null;
  setCurrentLetter: (letter: string | null) => void;
  
  // Drawing state
  drawingState: DrawingState;
  updateDrawingState: (updates: Partial<DrawingState>) => void;
  clearDrawing: () => void;
  
  // Practice state
  practiceState: PracticeState;
  updatePracticeState: (updates: Partial<PracticeState>) => void;
  resetPracticeState: () => void;
  
  // Encouragement system
  encouragementState: EncouragementState;
  updateEncouragementState: (updates: Partial<EncouragementState>) => void;
  
  // Learning statistics
  learningStats: LearningStats;
  updateLearningStats: (updates: Partial<LearningStats>) => void;
  
  // Actions
  startPractice: (letter: string) => void;
  completePractice: (success: boolean) => void;
  provideFeedback: (feedback: string) => void;
}

export interface HebrewLettersProviderProps {
  children: React.ReactNode;
}
