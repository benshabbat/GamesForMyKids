/**
 * Paint-bucket flood fill over canvas ImageData.
 * Stack-based (not recursive) to avoid call-stack overflow on large fills.
 * Matches pixels against the clicked pixel's OWN original color (not a fixed
 * white), so it correctly stops at both black outlines and at already
 * differently-colored neighboring regions.
 */

/** Max per-channel diff to still count as "the same color" as the clicked pixel. */
const COLOR_TOLERANCE = 32;

/** Luminance below which a clicked pixel is treated as "on the outline" (no-op). */
const DARK_LINE_LUMINANCE = 12;

export function hexToRgba(hex: string): [number, number, number, number] {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return [r, g, b, 255];
}

function luminance(r: number, g: number, b: number): number {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

/** Returns false if the fill was a no-op (clicked on a line, or already the target color). */
export function floodFill(
  imageData: ImageData,
  startX: number,
  startY: number,
  fillRgba: [number, number, number, number],
): boolean {
  const { width, height, data } = imageData;
  if (startX < 0 || startY < 0 || startX >= width || startY >= height) return false;

  const startIdx = (startY * width + startX) * 4;
  const targetR = data[startIdx] ?? 0;
  const targetG = data[startIdx + 1] ?? 0;
  const targetB = data[startIdx + 2] ?? 0;

  if (luminance(targetR, targetG, targetB) < DARK_LINE_LUMINANCE) return false;

  const [fillR, fillG, fillB, fillA] = fillRgba;
  if (
    Math.abs(targetR - fillR) <= COLOR_TOLERANCE &&
    Math.abs(targetG - fillG) <= COLOR_TOLERANCE &&
    Math.abs(targetB - fillB) <= COLOR_TOLERANCE
  ) {
    return false;
  }

  const matches = (idx: number) =>
    Math.abs((data[idx] ?? 0) - targetR) <= COLOR_TOLERANCE &&
    Math.abs((data[idx + 1] ?? 0) - targetG) <= COLOR_TOLERANCE &&
    Math.abs((data[idx + 2] ?? 0) - targetB) <= COLOR_TOLERANCE;

  const visited = new Uint8Array(width * height);
  const stack: number[] = [startX, startY];
  let changed = false;

  while (stack.length > 0) {
    const y = stack.pop()!;
    const x = stack.pop()!;
    if (x < 0 || y < 0 || x >= width || y >= height) continue;

    const pixelPos = y * width + x;
    if (visited[pixelPos]) continue;
    visited[pixelPos] = 1;

    const idx = pixelPos * 4;
    if (!matches(idx)) continue;

    data[idx] = fillR;
    data[idx + 1] = fillG;
    data[idx + 2] = fillB;
    data[idx + 3] = fillA;
    changed = true;

    stack.push(x + 1, y, x - 1, y, x, y + 1, x, y - 1);
  }

  return changed;
}
