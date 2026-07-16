import { describe, expect, it } from 'vitest';
import {
  buildSilhouetteMask,
  traceOuterContour,
  simplifyPolygon,
  resampleClosedPolygon,
  scaleToViewBox,
  type PixelData,
} from '@/app/games/dot-to-dot/editor/contourTrace';

/** '#' = dark ink pixel, '.' = white background pixel. All rows must be equal length. */
function makePixelData(rows: string[]): PixelData {
  const height = rows.length;
  const width = rows[0]!.length;
  const data = new Uint8ClampedArray(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const dark = rows[y]![x] === '#';
      const v = dark ? 0 : 255;
      data[idx] = v;
      data[idx + 1] = v;
      data[idx + 2] = v;
      data[idx + 3] = 255;
    }
  }
  return { data, width, height };
}

describe('buildSilhouetteMask', () => {
  it('fills the white interior enclosed by a dark outline', () => {
    const mask = buildSilhouetteMask(makePixelData([
      '.......',
      '.#####.',
      '.#...#.',
      '.#...#.',
      '.#####.',
      '.......',
    ]));
    // Center of the hollow square was left "white" but is enclosed by the outline.
    expect(mask[3 * 7 + 3]).toBe(1);
  });

  it('leaves background outside the outline unmarked', () => {
    const mask = buildSilhouetteMask(makePixelData([
      '.......',
      '.#####.',
      '.#...#.',
      '.#...#.',
      '.#####.',
      '.......',
    ]));
    expect(mask[0]).toBe(0); // top-left corner, clearly outside
  });

  it('absorbs an internal detail (e.g. a seed) into the solid silhouette instead of leaving it as a separate hole', () => {
    const mask = buildSilhouetteMask(makePixelData([
      '........',
      '.######.',
      '.#....#.',
      '.#.##.#.',
      '.#....#.',
      '.######.',
      '........',
    ]));
    // The internal "seed" blob's own pixel, and the background immediately around it, are both inside.
    expect(mask[3 * 8 + 3]).toBe(1); // the seed pixel itself
    expect(mask[3 * 8 + 2]).toBe(1); // white pixel right next to the seed, still enclosed
  });
});

describe('traceOuterContour', () => {
  it('returns an empty path for a mask with no foreground pixels', () => {
    const mask = new Uint8Array(9); // 3x3, all zero
    expect(traceOuterContour(mask, 3, 3)).toEqual([]);
  });

  it('traces a closed walk where every point lies on the mask and consecutive points are 8-adjacent', () => {
    const width = 8;
    const height = 8;
    const mask = new Uint8Array(width * height);
    for (let y = 2; y <= 5; y++) {
      for (let x = 2; x <= 5; x++) mask[y * width + x] = 1;
    }
    const path = traceOuterContour(mask, width, height);
    expect(path.length).toBeGreaterThan(0);
    for (const p of path) {
      expect(mask[p.y * width + p.x]).toBe(1);
    }
    for (let i = 0; i < path.length; i++) {
      const a = path[i]!;
      const b = path[(i + 1) % path.length]!;
      const dx = Math.abs(a.x - b.x);
      const dy = Math.abs(a.y - b.y);
      expect(dx).toBeLessThanOrEqual(1);
      expect(dy).toBeLessThanOrEqual(1);
      expect(dx + dy).toBeGreaterThan(0);
    }
  });

  it('traces the largest blob, ignoring a smaller disconnected speck that appears earlier in raster order', () => {
    // A tiny 2x2 "decoration" near the top-left, disconnected from a much
    // bigger 10x10 "subject" blob lower in the image (mirrors a real picture
    // with scattered stars/hearts separate from the main silhouette).
    const width = 20;
    const height = 20;
    const mask = new Uint8Array(width * height);
    for (let y = 1; y <= 2; y++) for (let x = 1; x <= 2; x++) mask[y * width + x] = 1;
    for (let y = 8; y <= 17; y++) for (let x = 5; x <= 14; x++) mask[y * width + x] = 1;

    const path = traceOuterContour(mask, width, height);
    const xs = path.map((p) => p.x);
    const ys = path.map((p) => p.y);
    expect(Math.min(...xs)).toBeGreaterThanOrEqual(5);
    expect(Math.max(...xs)).toBeLessThanOrEqual(14);
    expect(Math.min(...ys)).toBeGreaterThanOrEqual(8);
    expect(Math.max(...ys)).toBeLessThanOrEqual(17);
  });
});

describe('simplifyPolygon', () => {
  it('drops a midpoint that lies on (or very near) the line between its neighbors', () => {
    const points = [{ x: 0, y: 0 }, { x: 5, y: 0 }, { x: 10, y: 0 }];
    expect(simplifyPolygon(points, 1)).toEqual([{ x: 0, y: 0 }, { x: 10, y: 0 }]);
  });

  it('keeps a point that deviates from the line by more than epsilon', () => {
    const points = [{ x: 0, y: 0 }, { x: 5, y: 10 }, { x: 10, y: 0 }];
    const simplified = simplifyPolygon(points, 1);
    expect(simplified).toContainEqual({ x: 5, y: 10 });
  });

  it('removes a point once epsilon is larger than its deviation', () => {
    const points = [{ x: 0, y: 0 }, { x: 5, y: 2 }, { x: 10, y: 0 }];
    expect(simplifyPolygon(points, 5)).toEqual([{ x: 0, y: 0 }, { x: 10, y: 0 }]);
  });

  it('reduces a tight zigzag (mirroring a small spiral antenna) far more than a smooth run of the same length', () => {
    // A jittery path bouncing between two nearby y-values (high perimeter for
    // its small footprint, like the antenna curl) vs. a plain straight run
    // covering the same span.
    const zigzag = Array.from({ length: 20 }, (_, i) => ({ x: i, y: i % 2 === 0 ? 0 : 2 }));
    const straight = Array.from({ length: 20 }, (_, i) => ({ x: i, y: 0 }));
    const epsilon = 3;
    const simplifiedZigzag = simplifyPolygon(zigzag, epsilon);
    const simplifiedStraight = simplifyPolygon(straight, epsilon);
    expect(simplifiedStraight).toHaveLength(2); // fully collinear, collapses to endpoints
    expect(simplifiedZigzag.length).toBeLessThan(zigzag.length);
  });

  it('leaves short paths and non-positive epsilon unchanged', () => {
    const points = [{ x: 0, y: 0 }, { x: 1, y: 1 }];
    expect(simplifyPolygon(points, 5)).toEqual(points);
    const triangle = [{ x: 0, y: 0 }, { x: 5, y: 5 }, { x: 10, y: 0 }];
    expect(simplifyPolygon(triangle, 0)).toEqual(triangle);
  });
});

describe('resampleClosedPolygon', () => {
  it('returns exactly targetCount points', () => {
    const square = [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }, { x: 0, y: 10 }];
    expect(resampleClosedPolygon(square, 8)).toHaveLength(8);
  });

  it('samples evenly by arc length, landing exactly on known corners', () => {
    // Perimeter = 40, so 8 samples are spaced every 5 units: k=0 -> dist 0 (first
    // corner), k=2 -> dist 10 (end of the first edge, the second corner), k=4 ->
    // dist 20 (third corner).
    const square = [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }, { x: 0, y: 10 }];
    const resampled = resampleClosedPolygon(square, 8);
    expect(resampled[0]).toEqual({ x: 0, y: 0 });
    expect(resampled[2]).toEqual({ x: 10, y: 0 });
    expect(resampled[4]).toEqual({ x: 10, y: 10 });
  });

  it('returns an empty array for an empty input', () => {
    expect(resampleClosedPolygon([], 10)).toEqual([]);
  });
});

describe('scaleToViewBox', () => {
  it('uniformly scales by the limiting dimension and centers the shorter axis', () => {
    const result = scaleToViewBox(
      [{ x: 0, y: 0 }, { x: 100, y: 50 }],
      100, 50, 300, 20,
    );
    // available = 260; scale = min(260/100, 260/50) = 2.6; offsetX = 20, offsetY = 85.
    expect(result).toEqual([{ x: 20, y: 85 }, { x: 280, y: 215 }]);
  });
});
