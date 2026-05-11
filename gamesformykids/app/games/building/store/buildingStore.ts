import { COLORS, SHAPES } from '../constants';
import { makeStore } from '@/lib/stores/createStore';
import { createBlockSlice, type BlockSlice } from './blockSlice';
import { createHistorySlice, type HistorySlice } from './historySlice';
import { createParticleSlice, type ParticleSlice } from './particleSlice';
import { createAchievementSlice, type AchievementSlice } from './achievementSlice';
import { createSettingsSlice, type SettingsSlice } from './settingsSlice';

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
