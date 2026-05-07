import { makeCanvasGameStore } from '@/lib/stores/utils/canvasGameStore';

export const GAME_DURATION = 45;

export const useCatchFruitStore = makeCanvasGameStore(
  'CatchFruitStore',
  'catch-fruit-best',
  GAME_DURATION,
);
