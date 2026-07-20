export const MAX_LIVES = 3;
export const BUBBLE_SPEED = 0.06;
export const BULLET_SPEED = 0.55;
export const BUBBLE_RADIUS = 46;
export const CANNON_X_RATIO = 0.5;
export const CANNON_Y_OFFSET = 80;
export const BARREL_LENGTH = 60;
export const BARREL_WIDTH = 14;

export const BUBBLE_COLORS = ['#f97316', '#8b5cf6', '#0ea5e9', '#10b981'];

export type Bubble = { id: number; x: number; y: number; label: string; isCorrect: boolean; color: string };
export type Bullet = { x: number; y: number; vx: number; vy: number };
