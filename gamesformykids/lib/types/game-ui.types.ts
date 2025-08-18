// Game UI Component Types
import { GameStats, GameChallenge } from './game.types';

export interface GameHeaderProps {
  title: string;
  description?: string;
  score?: number;
  level?: number;
  showBackButton?: boolean;
  onBack?: () => void;
}

export interface GameStatsProps {
  stats: GameStats;
  onViewDetails?: () => void;
}

export interface GameChallengeProps {
  challenge: GameChallenge;
  onComplete?: (challengeId: string) => void;
}

export interface GameLoadingProps {
  message?: string;
  progress?: number;
}

export interface GameErrorProps {
  error: Error | string;
  onRetry?: () => void;
  onBack?: () => void;
}

export interface GameMainContentProps {
  children: React.ReactNode;
  isPlaying: boolean;
  isPaused?: boolean;
  showControls?: boolean;
}
