/**
 * ===============================================
 * טיפוסים ל-SimpleGameProgressContext
 * ===============================================
 */

export interface SimpleGameProgress {
  score: number;
  level: number;
  attempts: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number;
  startTime: number;
  streakCount: number;
  bestStreak: number;
}

export interface SimpleGameProgressContextValue {
  progress: SimpleGameProgress;
  
  // Progress Actions
  incrementScore: (points?: number) => void;
  incrementLevel: () => void;
  recordAttempt: (isCorrect: boolean) => void;
  resetProgress: () => void;
  updateProgress: (updates: Partial<SimpleGameProgress>) => void;
  
  // Computed values
  getAccuracy: () => number;
  getAverageTimePerQuestion: () => number;
}

// הערה: SimpleGameProgressProviderProps מוגדר ב-general.ts לפי עקרון DRY
