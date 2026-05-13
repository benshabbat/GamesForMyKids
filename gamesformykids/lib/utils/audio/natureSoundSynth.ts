/**
 * ===============================================
 * צלילי טבע סינתטיים — Web Audio API
 * ===============================================
 *
 * ממשק ציבורי: playNatureSound(itemName, audioContext)
 *
 * הלוגיקה פוצלה לתת-מודולים:
 *   natureSounds/helpers.ts — createWhiteNoiseBuffer, wait
 *   natureSounds/sounds.ts  — 10 synth functions + SYNTH_MAP
 */

import { SYNTH_MAP } from "./natureSounds/sounds";

/**
 * משמיע צליל טבע סינתטי לפי שם הפריט.
 * אם אין מיפוי לשם הזה, אין צליל (ללא שגיאה).
 */
export async function playNatureSound(
  itemName: string,
  audioContext: AudioContext,
): Promise<void> {
  const synth = SYNTH_MAP[itemName];
  if (!synth) return;
  await synth(audioContext);
}