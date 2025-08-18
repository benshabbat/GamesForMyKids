export interface GameRegistration {
  id: string;
  title: string;
  description: string;
  href: string;
  available: boolean;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface Category {
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number }>;
  gradient: string;
  gameIds: string[];
}

export interface AgeGroup {
  title: string;
  icon: string;
  description: string;
  recommendedGames: GameRegistration[];
}

export interface GameChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  completed: boolean;
}

export interface GameStats {
  totalPlayed: number;
  totalWins: number;
  bestScore: number;
  totalTime: number;
  averageScore: number;
}
