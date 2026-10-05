import { describe, expect, it } from 'vitest';
import { HEBREW_LETTER_PATHS } from '@/lib/constants/gameData/hebrewLetterPaths';
import { advanceWaypoints, isAttemptComplete, toCanvasPx, type Point } from '@/app/games/letter-trace/components/letterTraceLogic';
import { CANVAS_SIZE, SUCCESS_THRESHOLD, WAYPOINT_RADIUS } from '@/app/games/letter-trace/components/useLetterCanvas';

const RADIUS = WAYPOINT_RADIUS * 1.5;

/** Pointer positions of a finger tracing a stroke exactly along its waypoints. */
function traceStroke(stroke: Point[]): Point[] {
  const points: Point[] = [];
  for (let i = 0; i < stroke.length; i++) {
    const [x, y] = toCanvasPx(stroke[i]!, CANVAS_SIZE);
    if (i === 0) { points.push([x, y]); continue; }
    const [px, py] = points[points.length - 1]!;
    const steps = Math.max(1, Math.ceil(Math.hypot(x - px, y - py) / 3));
    for (let s = 1; s <= steps; s++) points.push([px + ((x - px) * s) / steps, py + ((y - py) * s) / steps]);
  }
  return points;
}

describe('advanceWaypoints', () => {
  const waypoints: Point[] = [[10, 10], [50, 50], [90, 90]];

  it('captures the next waypoint when the pointer is within the radius', () => {
    const [x, y] = toCanvasPx([10, 10], CANVAS_SIZE);
    expect(advanceWaypoints(waypoints, 0, [x + 5, y - 5], CANVAS_SIZE, RADIUS)).toBe(1);
  });

  it('does not capture waypoints out of order', () => {
    const [x, y] = toCanvasPx([90, 90], CANVAS_SIZE);
    expect(advanceWaypoints(waypoints, 0, [x, y], CANVAS_SIZE, RADIUS)).toBe(0);
  });

  it('captures several consecutive waypoints that are all within the radius', () => {
    const close: Point[] = [[50, 50], [51, 51], [52, 52], [90, 90]];
    const [x, y] = toCanvasPx([51, 51], CANVAS_SIZE);
    expect(advanceWaypoints(close, 0, [x, y], CANVAS_SIZE, RADIUS)).toBe(3);
  });

  it('never goes past the last waypoint', () => {
    const [x, y] = toCanvasPx([90, 90], CANVAS_SIZE);
    expect(advanceWaypoints(waypoints, 3, [x, y], CANVAS_SIZE, RADIUS)).toBe(3);
  });
});

describe('isAttemptComplete', () => {
  it('stays open after the first stroke of a two-stroke letter', () => {
    expect(isAttemptComplete(1, 2, 3, 6)).toBe(false);
  });

  it('completes when the child has drawn every stroke of the letter', () => {
    expect(isAttemptComplete(2, 2, 4, 6)).toBe(true);
    expect(isAttemptComplete(1, 1, 2, 4)).toBe(true);
  });

  it('completes as soon as every waypoint is covered', () => {
    expect(isAttemptComplete(1, 2, 6, 6)).toBe(true);
  });
});

describe('tracing every letter stroke by stroke', () => {
  const multiStroke = HEBREW_LETTER_PATHS.filter((l) => l.strokes.length > 1);

  it('includes the multi-stroke letters that used to be impossible to pass', () => {
    expect(multiStroke.map((l) => l.char)).toEqual(expect.arrayContaining(['א', 'ה', 'צ']));
  });

  it.each(HEBREW_LETTER_PATHS.map((l) => [l.char, l] as const))(
    'letter %s is fully captured and only completes after its last stroke',
    (_char, letter) => {
      const all = letter.strokes.flat();
      let next = 0;
      let strokesDrawn = 0;
      letter.strokes.forEach((stroke, i) => {
        for (const pos of traceStroke(stroke)) {
          next = advanceWaypoints(all, next, pos, CANVAS_SIZE, RADIUS);
        }
        strokesDrawn += 1;
        const isLast = i === letter.strokes.length - 1;
        expect(isAttemptComplete(strokesDrawn, letter.strokes.length, next, all.length)).toBe(isLast);
      });
      expect(next).toBe(all.length);
      expect(next / all.length).toBeGreaterThanOrEqual(SUCCESS_THRESHOLD);
    },
  );

  it('could not pass if the attempt ended at the first finger-lift (the old behaviour)', () => {
    for (const char of ['א', 'ה', 'צ']) {
      const letter = HEBREW_LETTER_PATHS.find((l) => l.char === char)!;
      const all = letter.strokes.flat();
      let next = 0;
      for (const pos of traceStroke(letter.strokes[0]!)) next = advanceWaypoints(all, next, pos, CANVAS_SIZE, RADIUS);
      expect(next / all.length).toBeLessThan(SUCCESS_THRESHOLD);
    }
  });
});
