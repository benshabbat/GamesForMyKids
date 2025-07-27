/**
 * קונפיגורציות משחקים מיוחדים - ספירה, מתמטיקה וזיכרון
 */

import { createGameConfig } from "@/lib/constants/core";

/**
 * ===============================================
 * קונפיגורציית משחק הספירה
 * ===============================================
 */
export const COUNTING_GAME_CONSTANTS = createGameConfig(4, 1, 3);

/**
 * ===============================================
 * קונפיגורציית משחק המתמטיקה
 * ===============================================
 */
export const MATH_GAME_CONSTANTS = {
  BASE_COUNT: 4,
  INCREMENT: 1,
  LEVEL_THRESHOLD: 3,
  BASE_MAX_NUMBER: 5,
  NUMBER_INCREMENT: 2,
  ABSOLUTE_MAX_NUMBER: 20
};

/**
 * ===============================================
 * קונפיגורציית משחק הזיכרון
 * ===============================================
 */
export const MEMORY_GAME_CONSTANTS = {
  FLIP_DURATION: 1000,
  SUCCESS_SOUND_FREQUENCIES: [523, 659, 784, 1047],
  BASE_COUNT: 4,
  INCREMENT: 1,
  LEVEL_THRESHOLD: 3,
};
