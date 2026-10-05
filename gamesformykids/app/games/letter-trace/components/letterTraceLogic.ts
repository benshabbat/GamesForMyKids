export type Point = [number, number];

/** Converts a waypoint in 0-100 normalized coordinates to canvas pixels. */
export function toCanvasPx(norm: Point, size: number): Point {
  return [norm[0] * size / 100, norm[1] * size / 100];
}

/**
 * Waypoints are captured in order across ALL strokes of the letter (so a multi-stroke letter
 * keeps its progress when the finger is lifted between strokes). Returns the new "next waypoint"
 * index after every consecutive waypoint within `radius` of `pos` has been captured.
 */
export function advanceWaypoints(
  waypoints: Point[],
  nextIdx: number,
  pos: Point,
  size: number,
  radius: number,
): number {
  let idx = nextIdx;
  while (idx < waypoints.length) {
    const [wpx, wpy] = toCanvasPx(waypoints[idx]!, size);
    if (Math.hypot(pos[0] - wpx, pos[1] - wpy) > radius) break;
    idx += 1;
  }
  return idx;
}

/**
 * An attempt ends once every waypoint is covered or the child has drawn as many strokes as the
 * letter has. Until then lifting the finger just ends a stroke, so multi-stroke letters
 * (א ה צ ש ת) can be traced one stroke at a time.
 */
export function isAttemptComplete(
  strokesDrawn: number,
  expectedStrokes: number,
  captured: number,
  totalWaypoints: number,
): boolean {
  return captured >= totalWaypoints || strokesDrawn >= expectedStrokes;
}
