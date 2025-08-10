'use client';

import { useBuildingContext } from '@/contexts/BuildingContext';

export default function ParticleSystem() {
  const { particles } = useBuildingContext();

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
