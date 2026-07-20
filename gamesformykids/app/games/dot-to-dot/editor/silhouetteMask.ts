/**
 * Stage 1 of dot-to-dot auto-detect: threshold an uploaded image to find ink
 * pixels, then flood-fill the interior so internal details (e.g. watermelon
 * seeds) get absorbed into the silhouette mask rather than traced separately.
 * Pure functions over plain pixel arrays (no live <canvas>) so this stays
 * unit-testable under this repo's node-environment Vitest config.
 */
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
