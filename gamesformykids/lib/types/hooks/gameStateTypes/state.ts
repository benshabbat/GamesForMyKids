import { BaseGameItem, GameType } from '../../core/base';

export interface GameState {
  readonly isPlaying: boolean;
  readonly showCelebration: boolean;
  readonly currentChallenge: BaseGameItem | null;
  readonly options: BaseGameItem[];
  readonly score: number;
  readonly level: number;
}

export interface GameProgress {
  readonly currentAccuracy: number;
  readonly streak: number;
  readonly timeSpent: number;
  readonly totalQuestions: number;
  readonly correctAnswers: number;
}

export interface GameActions {
  readonly startGame: () => void;
  readonly resetGame: () => void;
  readonly handleItemClick: (item: BaseGameItem) => void;
  readonly speakItemName: (itemName: string) => void;
  readonly pauseGame: () => void;
  readonly resumeGame: () => void;
  readonly resetProgress: () => void;
  readonly navigateToGame: (gameType: GameType) => void;
}

export interface GameResponseActions {
  readonly handleCorrectAnswer: (data?: Record<string, unknown>) => void;
  readonly handleWrongAnswer: (data?: Record<string, unknown>) => void;
}
