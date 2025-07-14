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
export type GameType = 'memory' | 'colors' | 'shapes' | 'bubbles';