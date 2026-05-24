import { COLORS, SHAPES } from '../constants';
import { makeStore } from '@/lib/stores/createStore';
import { createBlockSlice, type BlockGameSlice } from './blockSlice';
import { createBlockDragSlice, type BlockDragSlice } from './blockDragSlice';
import { createHistorySlice, type HistorySlice } from './historySlice';
import { createParticleSlice, type ParticleSlice } from './particleSlice';
import { createAchievementSlice, type AchievementSlice } from './achievementSlice';
import { createSettingsSlice, type SettingsSlice } from './settingsSlice';

// ─── Types ────────────────────────────────────────────────────────────────────

export type BuildingStore = BlockGameSlice & BlockDragSlice & HistorySlice & ParticleSlice & AchievementSlice & SettingsSlice;

// Re-export aliases for backward-compat consumers
export type { BlockGameSlice as BuildingState, BlockGameSlice as BuildingActions, BlockGameSlice as BlockSlice };

// ─── Store ────────────────────────────────────────────────────────────────────

export const useBuildingStore = makeStore<BuildingStore>('BuildingStore', (...a) => ({
  ...createBlockSlice(...a),
  ...createBlockDragSlice(...a),
  ...createHistorySlice(...a),
  ...createParticleSlice(...a),
  ...createAchievementSlice(...a),
  ...createSettingsSlice(...a),
}));

// ─── Selectors ────────────────────────────────────────────────────────────────
export const BUILDING_COLORS = COLORS;
export const BUILDING_SHAPES = SHAPES;
