/**
 * ===============================================
 * טיפוסים לקומפוננטות Game
 * ===============================================
 */

import { GameType } from '../base';

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
