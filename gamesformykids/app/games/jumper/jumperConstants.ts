import type { PhaseDead as Phase } from '@/lib/types';

export const W = 300;
export const H = 500;
export const GRAVITY = 0.32;
export const JUMP_VY = -10.5;
export const PLAT_W = 70;
export const PLAT_H = 12;
export const PLAYER_R = 15;
export const PLAT_GAP = 95;
export const INIT_PLATS = 14;

export interface Platform { x: number; y: number; w: number; }

export interface JumperState {
  phase: Phase;
  px: number; py: number;
  pvx: number; pvy: number;
  camY: number;
  maxCamY: number;
  platforms: Array<Platform & { id: number }>;
  score: number; best: number;
  frame: number;
  leftDown: boolean; rightDown: boolean;
  nextPlatY: number;
  startTime: number;
}

export type { Phase };
