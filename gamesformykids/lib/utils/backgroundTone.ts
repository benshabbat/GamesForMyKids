/**
 * Decides whether text drawn over a CSS background (a solid color or a gradient)
 * should be dark or light, so a screen can stay readable whatever palette its
 * game config picked.
 */

const HEX_RE = /#([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{3,4})\b/gi;
const RGB_RE = /rgba?\(\s*(\d+(?:\.\d+)?)[\s,]+(\d+(?:\.\d+)?)[\s,]+(\d+(?:\.\d+)?)/gi;

/**
 * Background luminance above which dark text has more contrast than white.
 * White and near-black text tie at roughly 0.18 (the WCAG crossover point).
 */
const LIGHT_THRESHOLD = 0.18;

function channel(c: number): number {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

/** WCAG relative luminance of an sRGB color, 0 (black) – 1 (white). */
export function relativeLuminance(r: number, g: number, b: number): number {
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.length <= 4 ? [...hex].map((c) => c + c).join('') : hex;
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

/** Every color stop found in a CSS background value, as [r, g, b]. */
function colorStops(css: string): [number, number, number][] {
  const stops: [number, number, number][] = [];
  for (const m of css.matchAll(HEX_RE)) stops.push(hexToRgb(m[1]!));
  for (const m of css.matchAll(RGB_RE)) stops.push([Number(m[1]), Number(m[2]), Number(m[3])]);
  return stops;
}

/**
 * True when the background is light enough that text on it should be dark.
 * Averages the luminance of every color stop; a background with no parseable
 * color (undefined, a named color, an image) falls back to `fallback`.
 */
export function isLightBackground(css: string | undefined, fallback = true): boolean {
  if (!css) return fallback;
  const stops = colorStops(css);
  if (stops.length === 0) return fallback;
  const avg = stops.reduce((sum, [r, g, b]) => sum + relativeLuminance(r, g, b), 0) / stops.length;
  return avg > LIGHT_THRESHOLD;
}
