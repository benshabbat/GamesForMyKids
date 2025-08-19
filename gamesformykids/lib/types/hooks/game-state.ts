 /**
 * ===============================================
 * טיפוסים לhooks של Game State
 * ===============================================
 */

import { BaseGameItem, GameType, BaseGameState } from '../base';

// Import GameUIConfig from its proper location
import type { GameUIConfig } from '@/lib/constants/ui/gameConfigs';

export interface UseGameOptionsProps {
  allItems: BaseGameItem[];
  level: number;
  baseCount?: number;
  increment?: number;  
  levelThreshold?: number;
}

export interface UseBaseGameConfig {
  gameType: GameType;
  items: BaseGameItem[];
  pronunciations: Record<string, string>;
  gameConstants: {
    BASE_COUNT: number;
    INCREMENT: number;
    LEVEL_THRESHOLD: number;
  };
}

export interface GameCardProps {
  item: BaseGameItem;
  onClick: (item: BaseGameItem) => void;
}

export interface GameState {
  isPlaying: boolean;
  showCelebration: boolean;
  currentChallenge: BaseGameItem | null;
  options: BaseGameItem[];
  score: number;
  level: number;
}

export interface GameLogicState {
  // Game State
  gameState: GameState | null;
  isPlaying: boolean;
  showCelebration: boolean;
  currentChallenge: BaseGameItem | null;
  options: BaseGameItem[] | null;
  score: number;
  level: number;
  
  // Game Actions
  startGame: () => void;
  resetGame: () => void;
  handleItemClick: (item: BaseGameItem) => void;
  speakItemName: (itemName: string) => void;
  
  // Enhanced Features
  hints?: string[];
  hasMoreHints?: boolean;
  showNextHint?: () => void;
  currentAccuracy?: number;
  progressStats?: Record<string, unknown>;
  
  // UI State
  showProgressModal: boolean;
  setShowProgressModal: (show: boolean) => void;
  
  // Configuration
  config: GameUIConfig;
  items: BaseGameItem[];
  CardComponent: React.ComponentType<GameCardProps>;
  gameType: unknown; // GameType | AutoGameType
}

export interface UseAdvancedGameStateConfig<T extends BaseGameItem> {
  initialState: BaseGameState<T>;
}

export interface GameItem {
  id: string
  name: string
  hebrew: string
  english: string
  emoji: string
  category: string
  subcategory?: string
  color_class?: string
  sound_frequencies: number[]
  additional_data: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface GameTypeDbRecord {
  id: string
  name: string
  display_name_hebrew: string
  display_name_english: string
  description?: string
  icon?: string
  category: string
  difficulty_level: string
  min_age: number
  max_age: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface GameContextHookReturn {
  // Game Type Info
  gameType: string | null;
  gameConfig: {
    title: string;
    subTitle: string;
  } | null;
  
  // Progress Info
  score: number;
  level: number;
  streak: number;
  accuracy: number;
  isGameActive: boolean;
  
  // Actions
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  resetProgress: () => void;
  handleCorrectAnswer: (data?: Record<string, unknown>) => void;
  handleWrongAnswer: (data?: Record<string, unknown>) => void;
  navigateToGame: (gameType: GameType) => void;
  
  // Status
  timeSpent: number;
  totalQuestions: number;
  correctAnswers: number;
}

export interface UseGameDataReturn {
  // Data
  gameItems: GameItem[];
  gameTypes: GameTypeDbRecord[];
  
  // Loading states
  loading: boolean;
  error: string | null;
  
  // Helper functions
  getItemsByCategory: (category: string) => GameItem[];
  getItemsBySubcategory: (subcategory: string) => GameItem[];
  getGameTypeByName: (name: string) => GameTypeDbRecord | undefined;
  getGameTypesByCategory: (category: string) => GameTypeDbRecord[];
  refreshData: () => Promise<void>;
  
  // Quick access to common categories
  colors: GameItem[];
  shapes: GameItem[];
  coloredShapes: GameItem[];
  numbers: GameItem[];
  letters: GameItem[];
  animals: GameItem[];
  fruits: GameItem[];
  vegetables: GameItem[];
}
