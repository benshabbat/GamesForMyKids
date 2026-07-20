/**
 * Stage 3 of dot-to-dot auto-detect: post-process a raw boundary trace (see
 * `contourTrace.ts`) into an exact dot count — simplify away fine wiggly
 * detail (Ramer-Douglas-Peucker), resample evenly by arc length, then scale
 * the result into the picture's square viewBox.
 */
import type { DotPoint } from '../types';

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
