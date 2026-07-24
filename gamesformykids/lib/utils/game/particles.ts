/**
 * Shared particle-burst physics for canvas games and Zustand-driven effects.
 * Covers the common "spawn N particles → apply gravity → decay life → drop dead ones" loop.
 */

export interface BaseParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

export interface SpawnParticlesOptions<T extends BaseParticle> {
  count: number;
  x: number;
  y: number;
  /** Random velocity spread per axis when `velocity` isn't given: vx/vy = (Math.random() - 0.5) * speed. Default 6. */
  speed?: number;
  /** Override to fully control per-particle velocity (e.g. an upward-biased burst). */
  velocity?: (index: number) => { vx: number; vy: number };
  /** Initial life value. Default 1. */
  life?: number;
  /** Extra per-particle fields beyond x/y/vx/vy/life (e.g. color, size, id). */
  extra?: (index: number) => Omit<T, keyof BaseParticle>;
}

export function spawnParticles<T extends BaseParticle = BaseParticle>(
  opts: SpawnParticlesOptions<T>,
): T[] {
  const { count, x, y, speed = 6, velocity, life = 1, extra } = opts;
  return Array.from({ length: count }, (_, i) => {
    const { vx, vy } = velocity
      ? velocity(i)
      : { vx: (Math.random() - 0.5) * speed, vy: (Math.random() - 0.5) * speed };
    return { x, y, vx, vy, life, ...(extra ? extra(i) : {}) } as T;
  });
}

export interface UpdateParticlesOptions<T extends BaseParticle> {
  /** Added to vy every tick. Default 0 (no gravity). */
  gravity?: number;
  /** Subtracted from life every tick. Default 0.05. */
  decay?: number;
  /** Per-tick transform for extra fields beyond the base kinematics (e.g. shrinking size). */
  extra?: (p: T) => Partial<T>;
}

/** Advances position/velocity/life for one frame and drops particles whose life has run out. */
export function updateParticles<T extends BaseParticle>(
  particles: T[],
  opts: UpdateParticlesOptions<T> = {},
): T[] {
  const { gravity = 0, decay = 0.05, extra } = opts;
  return particles
    .map((p) => ({
      ...p,
      x: p.x + p.vx,
      y: p.y + p.vy,
      vy: p.vy + gravity,
      life: p.life - decay,
      ...(extra ? extra(p) : null),
    }))
    .filter((p) => p.life > 0);
}
