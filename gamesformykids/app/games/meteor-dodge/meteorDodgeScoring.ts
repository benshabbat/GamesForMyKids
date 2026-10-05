/** One survival point is awarded every this many frames. */
export const FRAMES_PER_POINT = 4;

/** Points awarded for catching a star pickup. */
export const STAR_BONUS = 50;

/** Survival score for a run that has lasted `frame` frames. */
export function distanceScore(frame: number): number {
  return Math.floor(frame / FRAMES_PER_POINT);
}

/**
 * Displayed/saved score: survival points plus the bonus collected from stars.
 * The survival part is recomputed from the frame counter every frame, so bonus
 * points have to be tracked separately or the next frame would wipe them out.
 */
export function totalScore(frame: number, bonus: number): number {
  return distanceScore(frame) + bonus;
}
