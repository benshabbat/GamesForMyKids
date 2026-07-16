/**
 * Auto-detect a dot-to-dot picture's outer silhouette from an uploaded image:
 * threshold to find ink pixels, flood-fill the interior so internal details
 * (e.g. watermelon seeds) get absorbed rather than traced separately, walk
 * the resulting silhouette's boundary, then resample to an exact dot count.
 * Pure functions over plain pixel arrays (no live <canvas>) so this stays
 * unit-testable under this repo's node-environment Vitest config.
 */
import type { DotPoint } from '../types';

export interface PixelData {
  data: Uint8ClampedArray;
  width: number;
  height: number;
}

const DEFAULT_DARK_THRESHOLD = 200;

function luminance(r: number, g: number, b: number): number {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

/** 1 = inside the silhouette (ink or enclosed by it), 0 = background reachable from the border. */
export function buildSilhouetteMask(imageData: PixelData, threshold = DEFAULT_DARK_THRESHOLD): Uint8Array {
  const { data, width, height } = imageData;
  const size = width * height;
  const isDark = new Uint8Array(size);
  for (let i = 0; i < size; i++) {
    const idx = i * 4;
    const r = data[idx] ?? 255;
    const g = data[idx + 1] ?? 255;
    const b = data[idx + 2] ?? 255;
    const a = data[idx + 3] ?? 255;
    isDark[i] = a > 10 && luminance(r, g, b) < threshold ? 1 : 0;
  }

  const outside = new Uint8Array(size);
  const stack: number[] = [];
  const seed = (x: number, y: number) => {
    const i = y * width + x;
    if (!isDark[i] && !outside[i]) {
      outside[i] = 1;
      stack.push(x, y);
    }
  };
  for (let x = 0; x < width; x++) {
    seed(x, 0);
    seed(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    seed(0, y);
    seed(width - 1, y);
  }

  while (stack.length > 0) {
    const y = stack.pop()!;
    const x = stack.pop()!;
    const candidates: Array<[number, number]> = [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]];
    for (const [nx, ny] of candidates) {
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
      const ni = ny * width + nx;
      if (isDark[ni] || outside[ni]) continue;
      outside[ni] = 1;
      stack.push(nx, ny);
    }
  }

  const mask = new Uint8Array(size);
  for (let i = 0; i < size; i++) mask[i] = outside[i] ? 0 : 1;
  return mask;
}

// Clockwise 8-neighborhood starting at West: W, NW, N, NE, E, SE, S, SW.
const NEIGHBORS_CW: Array<[number, number]> = [
  [-1, 0], [-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1],
];

// 8-connected neighborhood, used only for connected-component labeling below.
const NEIGHBORS_8: Array<[number, number]> = [
  [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1],
];

/**
 * A mask can contain several disconnected foreground blobs (e.g. a picture's
 * main silhouette plus small unrelated decorations scattered around it).
 * Returns the topmost-then-leftmost pixel of the LARGEST connected blob, so
 * tracing follows the intended subject instead of whichever speck happens to
 * appear first in raster-scan order.
 */
function findLargestComponentStart(mask: Uint8Array, width: number, height: number): DotPoint | null {
  const labeled = new Uint8Array(mask.length);
  let bestSize = 0;
  let bestStart: DotPoint | null = null;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      if (mask[i] !== 1 || labeled[i]) continue;

      // Flood-fill this component, tracking its size and topmost-leftmost pixel.
      let size = 0;
      let compStartX = x;
      let compStartY = y;
      const stack: number[] = [x, y];
      labeled[i] = 1;
      while (stack.length > 0) {
        const cy = stack.pop()!;
        const cx = stack.pop()!;
        size++;
        if (cy < compStartY || (cy === compStartY && cx < compStartX)) {
          compStartX = cx;
          compStartY = cy;
        }
        for (const [dx, dy] of NEIGHBORS_8) {
          const nx = cx + dx;
          const ny = cy + dy;
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
          const ni = ny * width + nx;
          if (mask[ni] !== 1 || labeled[ni]) continue;
          labeled[ni] = 1;
          stack.push(nx, ny);
        }
      }

      if (size > bestSize) {
        bestSize = size;
        bestStart = { x: compStartX, y: compStartY };
      }
    }
  }

  return bestStart;
}

/** Moore-neighbor boundary trace of a mask's largest connected blob, as an ordered (open) point list. */
export function traceOuterContour(mask: Uint8Array, width: number, height: number): DotPoint[] {
  const at = (x: number, y: number) => x >= 0 && y >= 0 && x < width && y < height && mask[y * width + x] === 1;

  const start = findLargestComponentStart(mask, width, height);
  if (!start) return [];
  const { x: startX, y: startY } = start;

  const boundary: DotPoint[] = [{ x: startX, y: startY }];

  let hasNeighbor = false;
  for (const [dx, dy] of NEIGHBORS_CW) {
    if (at(startX + dx, startY + dy)) { hasNeighbor = true; break; }
  }
  if (!hasNeighbor) return boundary;

  let cx = startX;
  let cy = startY;
  let entryIdx = 0; // arrived from the West by convention (start is topmost-then-leftmost)
  const maxSteps = width * height * 4;

  for (let steps = 0; steps < maxSteps; steps++) {
    let moved = false;
    for (let k = 1; k <= 8; k++) {
      const idx = (entryIdx + k) % 8;
      const [dx, dy] = NEIGHBORS_CW[idx]!;
      const nx = cx + dx;
      const ny = cy + dy;
      if (at(nx, ny)) {
        cx = nx;
        cy = ny;
        entryIdx = (idx + 4) % 8;
        moved = true;
        break;
      }
    }
    if (!moved) break;
    if (cx === startX && cy === startY) break;
    boundary.push({ x: cx, y: cy });
  }

  return boundary;
}

function perpendicularDistance(p: DotPoint, a: DotPoint, b: DotPoint): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) return Math.hypot(p.x - a.x, p.y - a.y);
  const t = ((p.x - a.x) * dx + (p.y - a.y) * dy) / lenSq;
  const projX = a.x + t * dx;
  const projY = a.y + t * dy;
  return Math.hypot(p.x - projX, p.y - projY);
}

/**
 * Ramer-Douglas-Peucker simplification of an (open) point path. A raw pixel-
 * level trace can contain fine wiggly detail (e.g. a spiral antenna curl)
 * whose perimeter is disproportionately large for its size — left unsimplified,
 * even arc-length resampling would "spend" most of the dot budget on that tiny
 * detail instead of the main silhouette. Removing it here first lets dots be
 * spent where the shape actually needs them.
 */
export function simplifyPolygon(points: DotPoint[], epsilon: number): DotPoint[] {
  if (points.length < 3 || epsilon <= 0) return points;

  let maxDist = 0;
  let maxIdx = 0;
  const first = points[0]!;
  const last = points[points.length - 1]!;
  for (let i = 1; i < points.length - 1; i++) {
    const d = perpendicularDistance(points[i]!, first, last);
    if (d > maxDist) {
      maxDist = d;
      maxIdx = i;
    }
  }

  if (maxDist > epsilon) {
    const left = simplifyPolygon(points.slice(0, maxIdx + 1), epsilon);
    const right = simplifyPolygon(points.slice(maxIdx), epsilon);
    return [...left.slice(0, -1), ...right];
  }
  return [first, last];
}

/** Resample a closed polygon (last point implicitly connects to the first) to exactly targetCount points, evenly spaced by arc length. */
export function resampleClosedPolygon(points: DotPoint[], targetCount: number): DotPoint[] {
  if (points.length === 0 || targetCount <= 0) return [];
  if (points.length === 1) return Array.from({ length: targetCount }, () => ({ ...points[0]! }));

  const n = points.length;
  const segLengths: number[] = [];
  let perimeter = 0;
  for (let i = 0; i < n; i++) {
    const a = points[i]!;
    const b = points[(i + 1) % n]!;
    const d = Math.hypot(b.x - a.x, b.y - a.y);
    segLengths.push(d);
    perimeter += d;
  }
  if (perimeter === 0) return Array.from({ length: targetCount }, () => ({ ...points[0]! }));

  const result: DotPoint[] = [];
  const step = perimeter / targetCount;
  let segIdx = 0;
  let segStart = 0;
  for (let k = 0; k < targetCount; k++) {
    const targetDist = k * step;
    while (segIdx < n - 1 && segStart + segLengths[segIdx]! < targetDist) {
      segStart += segLengths[segIdx]!;
      segIdx++;
    }
    const a = points[segIdx]!;
    const b = points[(segIdx + 1) % n]!;
    const segLen = segLengths[segIdx]!;
    const t = segLen > 0 ? (targetDist - segStart) / segLen : 0;
    result.push({
      x: Math.round(a.x + (b.x - a.x) * t),
      y: Math.round(a.y + (b.y - a.y) * t),
    });
  }
  return result;
}

/** Uniform-scale-and-center points from source pixel space into the picture's square viewBox. */
export function scaleToViewBox(
  points: DotPoint[],
  srcWidth: number,
  srcHeight: number,
  viewSize = 300,
  margin = 20,
): DotPoint[] {
  const available = viewSize - margin * 2;
  const scale = Math.min(available / srcWidth, available / srcHeight);
  const scaledWidth = srcWidth * scale;
  const scaledHeight = srcHeight * scale;
  const offsetX = (viewSize - scaledWidth) / 2;
  const offsetY = (viewSize - scaledHeight) / 2;
  return points.map((p) => ({
    x: Math.round(p.x * scale + offsetX),
    y: Math.round(p.y * scale + offsetY),
  }));
}
