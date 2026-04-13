// ─────────────────────── Shared types ───────────────────────
export type Side = 'player' | 'computer';
export type GamePhase = 'menu' | 'rolling' | 'moving' | 'computer' | 'won' | 'lost';
export type Die = 1 | 2 | 3 | 4 | 5 | 6;

export interface PointState {
  player: number;
  computer: number;
}

export type SimpleMove = { from: number; to: number; die: Die };
export type TurnSnapshot = {
  points: PointState[];
  barPlayer: number;
  barComputer: number;
  dice: Die[];
};
