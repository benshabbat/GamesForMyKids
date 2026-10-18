/**
 * Wheel geometry shared by the spin animation and the tests.
 *
 * SpinnerWheel draws segment i starting at `rotation + i * segAngle` degrees,
 * measured clockwise from the top (12 o'clock). The pointer is fixed at the
 * top, so the segment under it is the one containing `-rotation` (mod 360).
 */

/** Index of the segment currently under the top pointer for a given wheel rotation (degrees). */
export function segmentUnderPointer(rotation: number, segmentCount: number): number {
  const segAngle = 360 / segmentCount;
  const pointerAngle = (((-rotation) % 360) + 360) % 360;
  return Math.min(segmentCount - 1, Math.floor(pointerAngle / segAngle));
}

/**
 * Final wheel rotation (degrees) that brings the middle of segment `winIndex`
 * under the pointer, after `fullSpins` extra full turns from `currentRotation`.
 */
export function finalRotationFor(
  currentRotation: number,
  winIndex: number,
  segmentCount: number,
  fullSpins: number,
): number {
  const segAngle = 360 / segmentCount;
  // We want: finalRotation % 360 === 360 - (winIndex + 0.5) * segAngle
  const targetAngle = 360 - (winIndex + 0.5) * segAngle;
  const currentMod = currentRotation % 360;
  const delta = (targetAngle - currentMod + 360) % 360;
  return currentRotation + fullSpins * 360 + delta;
}
