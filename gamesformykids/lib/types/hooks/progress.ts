/**
 * ===============================================
 * טיפוסים לhooks של Progress
 * ===============================================
 */

import { GameType } from '../base';

export interface GameSession {
  id: string;
  gameType: GameType;
  startTime: Date;
  endTime?: Date;
  score: number;
  level: number;
  correctAnswers: number;
  totalAnswers: number;
  duration: number;
  accuracy: number;
  mistakes: Array<{
    item: string;
    timestamp: Date;
    attempts: number;
  }>;
  completed: boolean;
}

export interface UserProgressStats {
  totalSessions: number;
  totalTime: number;
  averageScore: number;
  bestScore: number;
  totalGamesPlayed: number;
  gamesCompleted: number;
  averageAccuracy: number;
  mostDifficultItems: string[];
  strongestAreas: GameType[];
  weakestAreas: GameType[];
  improvementTrend: 'up' | 'down' | 'stable';
  recommendedPractice: string[];
}

export interface UseProgressTrackingProps {
  gameType: string;
  userId?: string;
  autoSave?: boolean;
}
