/**
 * ===============================================
 * טיפוסים לקומפוננטות Feedback
 * ===============================================
 */

export interface Hint {
  id: string;
  text: string;
  type: 'tip' | 'warning' | 'info';
  priority: number;
}

export interface GameHintsProps {
  hints: Hint[];
  currentHintIndex?: number;
  showHints?: boolean;
  onHintChange?: (index: number) => void;
}

export interface TipsBoxProps {
  tips?: string[];
  currentTip?: number;
  autoRotate?: boolean;
  interval?: number;
  tip?: string; // For single tip compatibility
  description?: string; // For single tip compatibility
}

export interface SimpleGameInstructionsProps {
  title: string;
  instructions: string[];
  showSteps?: boolean;
  variant?: 'simple' | 'detailed';
}

export interface GameInstructionsProps {
  // Context-based component - no props needed
  className?: string;
}

export interface CelebrationBoxProps {
  // Context-based component - no props needed
  className?: string;
}

export interface ChallengeBoxProps {
  // Context-based component - no props needed
  className?: string;
}
