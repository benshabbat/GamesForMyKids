import type { PhaseWonDead } from '@/lib/types';

export const W = 360;
export const H = 560;
export const PAD_W = 80;
export const PAD_H = 12;
export const PAD_Y = H - 50;
export const BALL_R = 8;
export const ROWS = 6;
export const COLS = 8;
export const BRICK_W = Math.floor((W - 20) / COLS);
export const BRICK_H = 20;
export const BRICK_PAD = 3;
export const BRICK_TOP = 50;

export const ROW_COLORS = [
  ['#EF4444', '#DC2626'],
  ['#F97316', '#EA580C'],
  ['#EAB308', '#CA8A04'],
  ['#22C55E', '#16A34A'],
  ['#3B82F6', '#2563EB'],
  ['#8B5CF6', '#7C3AED'],
];

export type Phase = PhaseWonDead;
export interface Brick { alive: boolean; row: number; }
export type BrickParticle = { x: number; y: number; vx: number; vy: number; life: number; color: string };
