/**
 * ===============================================
 * טיפוסים לutils כלליים
 * ===============================================
 */

export interface GameStructuredDataProps {
  gameType: string;
  title: string;
  description: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  ageRange?: {
    min: number;
    max: number;
  };
  features?: string[];
}

export interface GameTheme {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  borderRadius: string;
  fontFamily: string;
}

export interface BubbleData {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  content?: string;
  emoji?: string;
}

export interface BubbleGameState {
  bubbles: BubbleData[];
  score: number;
  level: number;
  gameStatus: 'idle' | 'playing' | 'paused' | 'gameOver';
  timeLeft: number;
  poppedBubbles: number;
}

export interface BubbleGameMathState {
  currentProblem: {
    operand1: number;
    operand2: number;
    operator: '+' | '-' | '*' | '/';
    answer: number;
  } | null;
  options: number[];
  score: number;
  level: number;
  lives: number;
  gameStatus: 'idle' | 'playing' | 'gameOver';
  timeLeft?: number;
}
