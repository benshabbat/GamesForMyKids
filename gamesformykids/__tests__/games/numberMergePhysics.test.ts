import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useNumberMergeStore, type Ball } from '@/app/games/number-merge/numberMergeStore';
import { stepPhysics, hasOverflow } from '@/app/games/number-merge/numberMergePhysics';
import { OVERFLOW_LINE_Y, OVERFLOW_SETTLE_TICKS, WALL_LEFT, WALL_RIGHT } from '@/app/games/number-merge/numberMergeCanvasConfig';

/** Deterministic Math.random so dropped values (1-5) are reproducible. */
function seedMathRandom(seed: number) {
  let s = seed;
  vi.spyOn(Math, 'random').mockImplementation(() => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  });
}

/** Drops a ball through the real store action and returns the store's balls (copied, as MergeCanvas does). */
function dropAt(x: number): Ball[] {
  useNumberMergeStore.setState({ dropX: x });
  useNumberMergeStore.getState().dropBall();
  return useNumberMergeStore.getState().balls.map(b => ({ ...b }));
}

describe('number-merge overflow detection', () => {
  beforeEach(() => {
    seedMathRandom(7);
    useNumberMergeStore.getState().startGame('easy');
  });
  afterEach(() => { vi.restoreAllMocks(); });

  it('does not end the game on the first physics tick after a drop', () => {
    const balls = dropAt(160);
    const { balls: next } = stepPhysics(balls);
    // Scenario check: the previous rule (top edge near the top and |vy| < 0.5)
    // matched this brand-new ball and ended the game immediately.
    expect(next.some(b => b.y - b.radius <= 10 && Math.abs(b.vy) < 0.5)).toBe(true);
    expect(hasOverflow(next)).toBe(false);
  });

  it.each([WALL_LEFT + 20, 160, WALL_RIGHT - 20])(
    'a single ball dropped at x=%i never counts as overflow while it falls, lands and rests',
    (x) => {
      let balls = dropAt(x);
      for (let tick = 0; tick < 600; tick++) {
        balls = stepPhysics(balls).balls;
        expect(hasOverflow(balls)).toBe(false);
      }
    },
  );

  it('does not count a ball that is at the top but not yet settled', () => {
    const base = dropAt(160)[0]!;
    const fresh: Ball = { ...base, y: base.radius, vy: 0, age: OVERFLOW_SETTLE_TICKS - 1 };
    expect(hasOverflow([fresh])).toBe(false);
    expect(hasOverflow([{ ...fresh, age: OVERFLOW_SETTLE_TICKS }])).toBe(true);
  });

  it('does not count settled balls that are well below the top line', () => {
    const base = dropAt(160)[0]!;
    const low: Ball = { ...base, y: OVERFLOW_LINE_Y + base.radius + 1, age: 1000 };
    expect(hasOverflow([low])).toBe(false);
  });

  it('gives merged balls a fresh age', () => {
    const base = dropAt(160)[0]!;
    const a: Ball = { ...base, id: 100, x: 100, y: 200, vy: 0, age: 500 };
    const b: Ball = { ...base, id: 101, x: 100 + base.radius, y: 200, vy: 0, age: 500 };
    const { balls, merges } = stepPhysics([a, b]);
    expect(merges).toHaveLength(1);
    expect(balls).toHaveLength(1);
    expect(balls[0]!.age).toBe(0);
  });

  it('still ends the game when the pile really reaches the top', () => {
    // Keep dropping at the same x (every ~0.6 s, the game's drop cooldown).
    let balls: Ball[] = [];
    let overflowAt = -1;
    for (let tick = 0; tick < 6000 && overflowAt < 0; tick++) {
      if (tick % 36 === 0) {
        useNumberMergeStore.setState({ balls });
        balls = dropAt(160);
      }
      balls = stepPhysics(balls).balls;
      if (hasOverflow(balls)) overflowAt = tick;
    }
    expect(overflowAt).toBeGreaterThan(OVERFLOW_SETTLE_TICKS);
    // The ball that triggered it had been in play for at least the settle period.
    expect(balls.some(b => b.age >= OVERFLOW_SETTLE_TICKS && b.y - b.radius <= OVERFLOW_LINE_Y)).toBe(true);
  });
});
