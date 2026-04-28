/**
 * ===============================================
 * טיפוסים לקומפוננטות Displays
 * ===============================================
 */

interface GameProgressStats {
  totalItems: number;
  completedItems: number;
  averageTime: number;
  accuracy: number;
  streak: number;
}

export interface ProgressDisplayProps {
  stats: GameProgressStats;
  showDetailed?: boolean;
  variant?: 'compact' | 'detailed';
}

export interface GenericBoxProps {
  title?: string;
  icon?: string;
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'celebration' | 'challenge' | 'tips';
  size?: 'small' | 'medium' | 'large';
  animation?: string;
  className?: string;
}
