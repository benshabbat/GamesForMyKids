/**
 * ===============================================
 * טיפוסים לקומפוננטות Buttons
 * ===============================================
 */

// ייבוא מהטיפוסים המרכזיים
export type { 
  BaseButtonProps,
  ButtonProps, 
  GameStartButtonProps 
} from '../ui/core';

// אליאס לתאימות לאחור
import type { GameStartButtonProps } from '../ui/core';
export type SimpleGameStartButtonProps = GameStartButtonProps;
