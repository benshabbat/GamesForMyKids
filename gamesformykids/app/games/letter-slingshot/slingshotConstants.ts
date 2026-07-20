export const GRAVITY = 0.00055;
export const POWER = 0.006;
export const MAX_DRAG = 90;
export const BOX_W = 110;
export const BOX_H = 50;
export const BALL_R = 22;
export const SLING_X_FRAC = 0.22;
export const SLING_Y_FRAC = 0.55;

export type Phase = 'menu' | 'aiming' | 'flying' | 'feedback' | 'result';
export type Box = { x: number; y: number; word: string; isCorrect: boolean; popped: boolean };
export type Ball = { x: number; y: number; vx: number; vy: number };
export type DragState = { active: boolean; dx: number; dy: number };
