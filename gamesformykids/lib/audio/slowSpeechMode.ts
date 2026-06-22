/**
 * Module-level singleton for session-scoped slow speech mode.
 * Readable by non-React utility functions (voiceSelector, speaker).
 */
let _slowMode = false;

export function isSlowModeActive(): boolean {
  return _slowMode;
}

export function setSlowModeActive(v: boolean): void {
  _slowMode = v;
}
