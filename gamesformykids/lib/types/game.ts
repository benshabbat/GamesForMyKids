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
  tailwindClass?: string;
}

export interface GameState {
  currentChallenge: Color | null;
  score: number;
  level: number;
  isPlaying: boolean;
  showCelebration: boolean;
  options: Color[];
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

// ממשק למשחק מספרים
export interface NumberItem {
  name: string;
  hebrew: string;
  english: string;
  digit: string;
  sound: number[];
}

export interface NumberGameState {
  currentChallenge: NumberItem | null;
  score: number;
  level: number;
  isPlaying: boolean;
  showCelebration: boolean;
  options: NumberItem[];
}


export type GameType = 'memory' | 'colors' | 'letters' | 'shapes' | 'numbers' | 'fruits' | 'bubbles' | 'animals';

// הוספת הממשקים החדשים לפירות
export interface Fruit {
  name: string;
  hebrew: string;
  english: string;
  emoji: string;
  color: string;
  sound: number[];
}

export interface FruitGameState {
  currentChallenge: Fruit | null;
  score: number;
  level: number;
  isPlaying: boolean;
  showCelebration: boolean;
  options: Fruit[];
}

export interface Animal {
  name: string;
  hebrew: string;
  english: string;
  emoji: string;
  sound: number[];
  color: string;
}

export interface AnimalGameState {
  currentChallenge: Animal | null;
  score: number;
  level: number;
  isPlaying: boolean;
  showCelebration: boolean;
  options: Animal[];
}