import { makeCanvasGameStore } from '@/lib/stores/utils/canvasGameStore';

export const GAME_DURATION = 60;

export const useSpaceDefenderStore = makeCanvasGameStore(
  'SpaceDefenderStore',
  'space-defender-best',
  GAME_DURATION,
);
