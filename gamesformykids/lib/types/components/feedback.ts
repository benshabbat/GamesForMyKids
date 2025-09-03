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

/**
 * Base props for context-based components - עקרון DRY
 */
export interface ContextBasedComponentProps {
  // Context-based component - no props needed
  className?: string;
}

export type GameInstructionsProps = ContextBasedComponentProps;

export type CelebrationBoxProps = ContextBasedComponentProps;

export type ChallengeBoxProps = ContextBasedComponentProps;
