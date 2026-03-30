export const TARGET_EMOJIS = [
  '⭐', '🌟', '💎', '🎯', '🎪', '🌈', '🍭', '🎈',
  '🦋', '🌸', '🍄', '🐝', '🔮', '🎆', '🍀', '🌙',
];

export const GAME_DURATION = 60; // seconds

export interface Target {
  id: number;
  x: number;        // percent
  y: number;        // percent
  emoji: string;
  lifetime: number; // ms before disappearing
  born: number;     // timestamp
}

export function getLifetime(score: number): number {
  // Targets live shorter as score increases (faster game)
  return Math.max(800, 2500 - score * 40);
}

export function getSpawnInterval(score: number): number {
  return Math.max(400, 1200 - score * 20);
}
