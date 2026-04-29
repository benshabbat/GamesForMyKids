import type { StateCreator } from 'zustand';
import type { BuildingStore } from '../buildingStore';
import type { Particle } from '@/app/games/building/types';

export type ParticleSlice = {
  particles: Particle[];
  createParticles: (x: number, y: number, color: string) => void;
  tickParticles: () => void;
  clearParticles: () => void;
};

export const createParticleSlice: StateCreator<BuildingStore, [], [], ParticleSlice> = (set) => ({
  particles: [],

  createParticles: (x, y, color) => {
    const newParticles: Particle[] = Array.from({ length: 10 }, (_, i) => ({
      id: `particle-${Date.now()}-${i}`,
      x: x + 30,
      y: y + 30,
      vx: (Math.random() - 0.5) * 8,
      vy: Math.random() * -8 - 2,
      life: 30,
      color,
      size: Math.random() * 4 + 2,
    }));
    set((s) => ({ particles: [...s.particles, ...newParticles] }));
  },

  tickParticles: () => {
    set((s) => ({
      particles: s.particles
        .map((p) => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.5,
          life: p.life - 1,
          size: Math.max(0, (p.size ?? 6) - 0.2),
        }))
        .filter((p) => p.life > 0),
    }));
  },

  clearParticles: () => set({ particles: [] }),
});
