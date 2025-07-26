/**
 * ===============================================
 * טיפוסים לממשק המשתמש
 * ===============================================
 */

import { ReactNode } from 'react';

/**
 * שלב הדרכה במשחק
 */
export interface GameStep {
  icon: string;
  title: string;
  description: string;
}

/**
 * מאפייני כפתורי התחלה
 */
export interface StartButtonProps {
  fromColor?: string;
  toColor?: string;
  onStart: () => void;
}

/**
 * מאפיינים של פריט משחק גנרי
 */
export interface GameItemProps {
  key?: string | number;
  name?: string;
  hebrewText: string;
  secondaryText?: string;
  color: string;
  icon?: ReactNode;
  shape?: "rounded" | "circle" | "square";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  hideSoundIcon?: boolean;
  textColor?: string;
  borderColor?: string;
}

/**
 * מאפייני כותרת מסך פתיחה
 */
export interface StartScreenHeaderProps {
  title?: string;
  subTitle?: string;
  textColorHeader?: string;
  textColorSubHeader?: string;
}

/**
 * מאפייני הוראות משחק
 */
export interface GameInstructionsProps {
  steps: GameStep[];
  bgClass?: string;
}
