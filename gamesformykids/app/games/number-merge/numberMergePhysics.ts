import { Ball, RADIUS_FOR_VALUE } from './numberMergeStore';
import {
  DAMPING, FLOOR_Y, FRICTION, GRAVITY, OVERFLOW_LINE_Y, OVERFLOW_SETTLE_TICKS, WALL_LEFT, WALL_RIGHT,
} from './numberMergeCanvasConfig';

function circlePair(a: Ball, b: Ball) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const minDist = a.radius + b.radius;
  return { dx, dy, dist, minDist, overlap: minDist - dist };
}

function resolveCollision(balls: Ball[]): { balls: Ball[]; merges: { x: number; y: number; value: number }[] } {
  const merges: { x: number; y: number; value: number }[] = [];
  const toRemove = new Set<number>();

  for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      const a = balls[i];
      const b = balls[j];
      if (!a || !b || toRemove.has(a.id) || toRemove.has(b.id)) continue;
      if (a.value !== b.value) continue;

      const { dist, minDist } = circlePair(a, b);
      if (dist >= minDist) continue;

      // Same value touching → merge
      toRemove.add(a.id);
      toRemove.add(b.id);
      const newVal = Math.min(a.value + b.value, 10);
      const nx = (a.x + b.x) / 2;
      const ny = (a.y + b.y) / 2;
      const merged: Ball = {
        id: Date.now() + Math.random(),
        x: nx,
        y: ny,
        vx: (a.vx + b.vx) * 0.5,
        vy: (a.vy + b.vy) * 0.5,
        value: newVal,
        radius: RADIUS_FOR_VALUE(newVal),
        merging: false,
        merged: false,
        age: 0,
      };
      balls.push(merged);
      merges.push({ x: nx, y: ny, value: newVal });
      // skip inner j loop since a is gone
      break;
    }
  }

  return {
    balls: balls.filter(b => !toRemove.has(b.id)),
    merges,
  };
}

export function stepPhysics(balls: Ball[]): { balls: Ball[]; merges: { x: number; y: number; value: number }[] } {
  // Apply gravity + velocity
  for (const b of balls) {
    b.age += 1;
    b.vy += GRAVITY;
    b.x += b.vx;
    b.y += b.vy;

    // Floor
    if (b.y + b.radius >= FLOOR_Y) {
      b.y = FLOOR_Y - b.radius;
      b.vy *= -DAMPING;
      b.vx *= FRICTION;
    }
    // Walls
    if (b.x - b.radius <= WALL_LEFT) {
      b.x = WALL_LEFT + b.radius;
      b.vx *= -DAMPING;
    }
    if (b.x + b.radius >= WALL_RIGHT) {
      b.x = WALL_RIGHT - b.radius;
      b.vx *= -DAMPING;
    }
  }

  // Ball-ball separation (push apart first, then merge)
  for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      const a = balls[i];
      const b = balls[j];
      if (!a || !b) continue;
      const { dist, dx, dy, overlap } = circlePair(a, b);
      if (overlap <= 0 || dist === 0) continue;
      if (a.value === b.value) continue; // will be merged separately

      const nx = dx / dist;
      const ny = dy / dist;
      const push = overlap / 2;
      a.x -= nx * push;
      a.y -= ny * push;
      b.x += nx * push;
      b.y += ny * push;

      // Elastic-ish bounce
      const dvx = b.vx - a.vx;
      const dvy = b.vy - a.vy;
      const dot = dvx * nx + dvy * ny;
      if (dot < 0) {
        const impulse = dot * 0.5;
        a.vx += impulse * nx;
        a.vy += impulse * ny;
        b.vx -= impulse * nx;
        b.vy -= impulse * ny;
      }
    }
  }

  return resolveCollision(balls);
}

/**
 * True when a settled ball is resting at the top of the board (game over).
 *
 * Only balls older than OVERFLOW_SETTLE_TICKS count: a ball that was just dropped
 * starts at the top and would otherwise end the game on its first tick. No speed
 * check on top of that — balls in a compressed column keep a high vy (observed
 * 3-10 px/tick) so a "nearly stationary" test never fires for a real overflow,
 * while a falling ball leaves the top zone within ~6 ticks, well inside the
 * settle period.
 */
export function hasOverflow(balls: Ball[]): boolean {
  return balls.some(b => b.age >= OVERFLOW_SETTLE_TICKS && b.y - b.radius <= OVERFLOW_LINE_Y);
}
