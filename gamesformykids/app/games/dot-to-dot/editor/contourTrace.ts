/**
 * Stage 2 of dot-to-dot auto-detect: given a silhouette mask (see
 * `silhouetteMask.ts`), walk its boundary with a Moore-neighbor trace to
 * produce an ordered point path. Also picks the trace's starting point from
 * the largest connected foreground blob, so unrelated decorations scattered
 * around the main subject don't get traced instead.
 */
import type { DotPoint } from '../types';

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
