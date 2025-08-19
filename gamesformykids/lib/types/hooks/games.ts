/**
 * ===============================================
 * טיפוסים לhooks של Games
 * ===============================================
 */

export interface UseSimpleGameProps {
  gameType: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  autoStart?: boolean;
  timeLimit?: number;
}
