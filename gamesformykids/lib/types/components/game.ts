/**
 * ===============================================
 * טיפוסים לקומפוננטות Game
 * ===============================================
 */

import { GameType } from '../base';
import { Category, AgeGroup } from '../game.types';

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

export interface CategoriesViewProps {
  categories: Record<string, Category>;
  allGameRegistrations: import('../game.types').GameRegistration[];
  onCategorySelect: (categoryKey: string) => void;
}

export interface CategoryGamesViewProps {
  selectedCategory: string;
  categories: Record<string, Category>;
  allGameRegistrations: import('../game.types').GameRegistration[];
  onBackToCategories: () => void;
}

export interface AllGamesViewProps {
  allGameRegistrations: import('../game.types').GameRegistration[];
  totalGamesCount: number;
}

export interface AgeGroupCardProps {
  ageGroup: AgeGroup;
}

export interface CategoryNavigationProps {
  selectedCategory: string | null;
  showAllGames: boolean;
  totalGamesCount: number;
  onShowCategories: () => void;
  onShowAllGames: () => void;
}

export interface RecommendationsHeaderProps {
  title: string;
  description: string;
}

export interface FeaturedGameCallToActionProps {
  featuredGame: import('../game.types').GameRegistration;
}
