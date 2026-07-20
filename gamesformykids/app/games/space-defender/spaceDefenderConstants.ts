export const W = 360;
export const H = 560;
export const SHIP_W = 40;
export const SHIP_H = 40;
export const BULLET_SPEED = 8;
export const BULLET_R = 5;
export const ASTEROID_EMOJIS = ['☄️', '🪨', '💫'];

export interface Bullet { id: number; x: number; y: number; }
export interface Asteroid { id: number; x: number; y: number; speed: number; r: number; emoji: string; angle: number; spin: number; }
