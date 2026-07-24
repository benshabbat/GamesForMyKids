import type { StateCreator } from 'zustand';
import { spawnParticles, updateParticles } from '@/lib/utils';
import type { BuildingStore } from './buildingStore';
import type { Particle } from '../types';

export type ParticleSlice = {
  particles: Particle[];
  createParticles: (x: number, y: number, color: string) => void;
  tickParticles: () => void;
  clearParticles: () => void;
};

export const createParticleSlice: StateCreator<BuildingStore, [], [], ParticleSlice> = (set) => ({
  particles: [],

  createParticles: (x, y, color) => {
    const newParticles = spawnParticles<Particle>({
      count: 10,
      x: x + 30,
      y: y + 30,
      velocity: () => ({ vx: (Math.random() - 0.5) * 8, vy: Math.random() * -8 - 2 }),
      life: 30,
      extra: (i) => ({ id: `particle-${Date.now()}-${i}`, color, size: Math.random() * 4 + 2 }),
    });
    set((s) => ({ particles: [...s.particles, ...newParticles] }));
  },

  tickParticles: () => {
    set((s) => ({
      particles: updateParticles(s.particles, {
        gravity: 0.5,
        decay: 1,
        extra: (p) => ({ size: Math.max(0, (p.size ?? 6) - 0.2) }),
      }),
    }));
  },

  clearParticles: () => set({ particles: [] }),
});
