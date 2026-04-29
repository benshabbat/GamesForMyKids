import type { StateCreator } from 'zustand';
import type { BuildingStore } from '../buildingStore';
import type { Block } from '@/app/games/building/types';
import { ACHIEVEMENTS } from '@/app/games/building/constants';

export type AchievementSlice = {
  achievements: string[];
  score: number;
  checkAchievements: (blocks: Block[]) => void;
  addScore: (points: number) => void;
};

export const createAchievementSlice: StateCreator<BuildingStore, [], [], AchievementSlice> = (
  set,
  get,
) => ({
  achievements: [],
  score: 0,

  checkAchievements: (blocks) => {
    const { achievements } = get();
    const newAchievements = [...achievements];

    if (
      blocks.length >= ACHIEVEMENTS.BUILDER.threshold &&
      !newAchievements.includes(ACHIEVEMENTS.BUILDER.id)
    ) {
      newAchievements.push(ACHIEVEMENTS.BUILDER.id);
    }

    const starCount = blocks.filter(
      (b) => b.shape === ACHIEVEMENTS.STAR_COLLECTOR.shape,
    ).length;
    if (
      starCount >= ACHIEVEMENTS.STAR_COLLECTOR.threshold &&
      !newAchievements.includes(ACHIEVEMENTS.STAR_COLLECTOR.id)
    ) {
      newAchievements.push(ACHIEVEMENTS.STAR_COLLECTOR.id);
    }

    if (newAchievements.length !== achievements.length) {
      set({ achievements: newAchievements });
    }
  },

  addScore: (points) => set((s) => ({ score: s.score + points })),
});
