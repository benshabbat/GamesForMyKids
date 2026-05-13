// ── Types ──────────────────────────────────────────────────────────────────

export type Side = 'player' | 'computer';
export type GamePhase = 'menu' | 'playing' | 'won' | 'lost';
export interface Cell { color: Side | null; isKing: boolean; }
export type Board = Cell[][];
export interface Pos { row: number; col: number; }
export interface DamkaMove { from: Pos; to: Pos; captures: Pos[]; }
