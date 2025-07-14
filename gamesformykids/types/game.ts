export interface Game {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  href: string;
  available: boolean;
}

export interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface AnimalData {
  emoji: string;
  sound: string;
  name: string;
}

export interface Color {
  name: string;
  hebrew: string;
  value: string;
  sound: number[];
}

export interface GameState {
  currentChallenge: Color | null;
  score: number;
  level: number;
  isPlaying: boolean;
  showCelebration: boolean;
}

// ממשק למשחק אותיות
export interface Letter {
  name: string;
  hebrew: string;
  english: string;
  sound: number[];
}

export interface LetterGameState {
  currentChallenge: Letter | null;
  score: number;
  level: number;
  isPlaying: boolean;
  showCelebration: boolean;
  options: Letter[];
}

// ממשק למשחק צורות
export interface Shape {
  name: string;
  hebrew: string;
  english: string;
  color: string;
  sound: number[];
  svg: string;
}

export interface ShapeGameState {
  currentChallenge: Shape | null;
  score: number;
  level: number;
  isPlaying: boolean;
  showCelebration: boolean;
  options: Shape[];
}

export type GameType = 'memory' | 'colors' | 'letters' | 'shapes' | 'bubbles';