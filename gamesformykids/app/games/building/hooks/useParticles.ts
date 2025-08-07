import { useState, useCallback } from 'react';
import { Particle } from '../types';

export const useParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  const createParticles = useCallback((x: number, y: number, color: string) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 10; i++) {
      newParticles.push({
        id: `particle-${Date.now()}-${i}`,
        x: x + 30,
        y: y + 30,
        vx: (Math.random() - 0.5) * 8,
        vy: Math.random() * -8 - 2,
        life: 30,
        color,
        size: Math.random() * 4 + 2
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
  }, []);

  const clearParticles = useCallback(() => {
    setParticles([]);
  }, []);

  return {
    particles,
    setParticles,
    createParticles,
    clearParticles
  };
};
