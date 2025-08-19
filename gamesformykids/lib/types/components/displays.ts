/**
 * ===============================================
 * טיפוסים לקומפוננטות Displays
 * ===============================================
 */

export interface ProgressStats {
  totalItems: number;
  completedItems: number;
  averageTime: number;
  accuracy: number;
  streak: number;
}

export interface GameProgressDisplayProps {
  currentLevel: number;
  totalLevels: number;
  score: number;
  progress: number;
  showDetails?: boolean;
  stats?: ProgressStats;
}

export interface ProgressDisplayProps {
  stats: ProgressStats;
  showDetailed?: boolean;
  variant?: 'compact' | 'detailed';
}

export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  fallback?: string;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
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
