/**
 * ===============================================
 * טיפוסים לhooks של Game State
 * ===============================================
 */

import { BaseGameItem } from '../base';

export interface UseGameOptionsProps {
  items: BaseGameItem[];
  difficulty?: 'easy' | 'medium' | 'hard';
  optionsCount?: number;
}

export interface UseBaseGameConfig {
  gameType: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  autoProgress?: boolean;
  timeLimit?: number;
}

export interface GameCardProps {
  name: string;
  hebrew?: string;
  english?: string;
  emoji?: string;
  color_class?: string;
  sound_frequencies?: number[];
}

export interface GameState {
  currentCard: GameCardProps | null;
  options: GameCardProps[];
  score: number;
  level: number;
  isPlaying: boolean;
  showCelebration: boolean;
}

export interface UseAdvancedGameStateConfig<T extends BaseGameItem> {
  items: T[];
  gameType: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  onGameComplete?: (stats: Record<string, unknown>) => void;
}
