/**
 * ===============================================
 * טיפוסים לקומפוננטות Game
 * ===============================================
 */

import { GameType } from '../base';
import { Category } from '../game.types';

export interface CategoryGamesViewProps {
  category: string;
  games: GameType[];
  onGameSelect: (gameType: GameType) => void;
  title?: string;
}

export interface GameItemProps {
  item: {
    name: string;
    hebrew?: string;
    english?: string;
    emoji?: string;
  };
  onClick: () => void;
  isSelected?: boolean;
  variant?: 'card' | 'button' | 'tile';
}

export interface CategoryCardProps {
  category: Category;
  gamesCount: number;
  availableCount: number;
  onClick: () => void;
}

export interface GameCardProps {
  game: import('../game.types').GameRegistration;
}
