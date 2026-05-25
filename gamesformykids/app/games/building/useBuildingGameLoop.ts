'use client';

import { useEffect } from 'react';
import { useBuildingStore } from '@/app/games/building/store/buildingStore';

/**
 * Drives the two time-based loops that were previously inlined inside
 * BuildingGameClient as bare useEffect / setInterval pairs:
 *
 *  1. Particle tick  — advances particle positions every 50 ms.
 *  2. Animation tick — rotates every block by 2° every 100 ms when
 *                      animationMode is enabled.
 */
export function useBuildingGameLoop() {
  useEffect(() => {
    const interval = setInterval(() => {
      const { particles, tickParticles } = useBuildingStore.getState();
      if (particles.length > 0) tickParticles();
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!useBuildingStore.getState().animationMode) return;
      useBuildingStore.setState((s) => ({
        blocks: s.blocks.map((block) => ({
          ...block,
          rotation: (block.rotation + 2) % 360,
        })),
      }));
    }, 100);
    return () => clearInterval(interval);
  }, []);
}
