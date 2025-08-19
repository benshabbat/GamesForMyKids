/**
 * ===============================================
 * טיפוסים לhooks של Progress
 * ===============================================
 */

export interface GameSession {
  id: string;
  gameType: string;
  startTime: Date;
  endTime?: Date;
  score: number;
  level: number;
  duration: number;
  accuracy: number;
  mistakes: number;
  completed: boolean;
}

export interface ProgressStats {
  totalSessions: number;
  totalTime: number;
  averageScore: number;
  bestScore: number;
  totalGamesPlayed: number;
  gamesCompleted: number;
  averageAccuracy: number;
  improvementTrend: 'up' | 'down' | 'stable';
}

export interface UseProgressTrackingProps {
  gameType: string;
  userId?: string;
  autoSave?: boolean;
}
