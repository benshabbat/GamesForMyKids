export const COLS = 8;
export const GRID_ROWS = 7;
export const R = 26;
export const DIA = R * 2 + 2;
export const SPEED = 0.65;
export const MIN_MATCH = 3;

export const LETTERS = ['א', 'ב', 'ג', 'ד', 'ה', 'ו'];
export const COLORS: Record<string, string> = {
  'א': '#3b82f6', 'ב': '#ef4444', 'ג': '#22c55e',
  'ד': '#f97316', 'ה': '#a855f7', 'ו': '#14b8a6',
};
export const DARK: Record<string, string> = {
  'א': '#1d4ed8', 'ב': '#b91c1c', 'ג': '#15803d',
  'ד': '#c2410c', 'ה': '#7e22ce', 'ו': '#0f766e',
};

export type Phase = 'menu' | 'playing' | 'result';
export interface FlyBubble { letter: string; x: number; y: number; vx: number; vy: number; }
export interface PopAnim { x: number; y: number; t: number; letter: string; }
