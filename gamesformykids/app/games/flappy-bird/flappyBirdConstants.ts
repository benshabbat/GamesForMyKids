import type { PhaseDead as Phase } from '@/lib/types';

export const W = 360;
export const H = 560;
export const BIRD_X = 80;
export const BIRD_R = 18;
export const GRAVITY = 0.45;
export const FLAP_STRENGTH = -9;
export const PIPE_W = 54;
export const PIPE_GAP = 145;
export const PIPE_SPEED = 2.5;
export const PIPE_INTERVAL = 95;
export const GROUND_H = 55;

export interface Pipe { x: number; gapY: number; scored: boolean; }

export interface FlappyBirdState {
  phase: Phase;
  birdY: number;
  birdVY: number;
  pipes: Pipe[];
  score: number;
  frame: number;
  bgOffset: number;
  startTime: number;
}

export type { Phase };
