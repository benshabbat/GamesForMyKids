import { COLORS, SHAPES } from '@/app/games/building/constants';
import { makeStore } from './createStore';
import { createBlockSlice, type BlockSlice } from './building/blockSlice';
import { createHistorySlice, type HistorySlice } from './building/historySlice';
import { createParticleSlice, type ParticleSlice } from './building/particleSlice';
import { createAchievementSlice, type AchievementSlice } from './building/achievementSlice';
import { createSettingsSlice, type SettingsSlice } from './building/settingsSlice';

// ─── Types ────────────────────────────────────────────────────────────────────

export type BuildingStore = BlockSlice & HistorySlice & ParticleSlice & AchievementSlice & SettingsSlice;

// Re-export for consumers that import BuildingState / BuildingActions by name
export type { BlockSlice as BuildingState, BlockSlice as BuildingActions };

// ─── Store ────────────────────────────────────────────────────────────────────

export const useBuildingStore = makeStore<BuildingStore>('BuildingStore', (...a) => ({
  ...createBlockSlice(...a),
  ...createHistorySlice(...a),
  ...createParticleSlice(...a),
  ...createAchievementSlice(...a),
  ...createSettingsSlice(...a),
}));

// ─── Selectors ────────────────────────────────────────────────────────────────
export const BUILDING_COLORS = COLORS;
export const BUILDING_SHAPES = SHAPES;
