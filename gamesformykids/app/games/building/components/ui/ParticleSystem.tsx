'use client';

import { useBuildingStore } from '@/app/games/building/store/buildingStore';

export default function ParticleSystem() {
  const particles = useBuildingStore((s) => s.particles);

  return (
    <>
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute pointer-events-none rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size || 6,
            height: particle.size || 6,
            backgroundColor: particle.color,
            opacity: particle.life / 30
          }}
        />
      ))}
    </>
  );
}
