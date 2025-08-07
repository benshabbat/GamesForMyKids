'use client';

import React from 'react';

interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
}

interface ParticleSystemProps {
  particles: Particle[];
}

export default function ParticleSystem({ particles }: ParticleSystemProps) {
  return (
    <>
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute pointer-events-none rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.life / 30
          }}
        />
      ))}
    </>
  );
}
