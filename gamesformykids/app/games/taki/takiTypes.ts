export type CardColor = 'red' | 'green' | 'blue' | 'yellow' | 'wild';
export type CardValue =
  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  | 'taki' | 'stop' | 'plus' | 'colorChange' | 'superTaki' | 'king';

export interface TakiCard {
  id: string;
  color: CardColor;
  value: CardValue;
}

export type GamePhase = 'menu' | 'playing' | 'won' | 'lost';

export interface TakiGameState {
  phase: GamePhase;
  deck: TakiCard[];
  playerHand: TakiCard[];
  computerHand: TakiCard[];
  topCard: TakiCard;
  currentTurn: 'player' | 'computer';
  effectiveColor: CardColor | null;
  inTakiSequence: boolean;
  takiColor: CardColor | null;
  needsColorChoice: boolean;
  message: string;
  playerScore: number;
  computerScore: number;
  turnId: number;
}

export const INITIAL_STATE: TakiGameState = {
  phase: 'menu',
  deck: [],
  playerHand: [],
  computerHand: [],
  topCard: { id: 'init', color: 'red', value: 1 },
  currentTurn: 'player',
  effectiveColor: null,
  inTakiSequence: false,
  takiColor: null,
  needsColorChoice: false,
  message: 'ברוך הבא למשחק טאקי! 🃏',
  playerScore: 0,
  computerScore: 0,
  turnId: 0,
};
