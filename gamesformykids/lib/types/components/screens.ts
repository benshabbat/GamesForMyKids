/**
 * ===============================================
 * טיפוסים לקומפוננטות Screens
 * ===============================================
 */

export interface GenericStartScreenProps<T> {
  title: string;
  subtitle?: string;
  items: T[];
  onStart: () => void;
  onItemClick?: (item: T) => void;
  showPreview?: boolean;
  difficulty?: 'easy' | 'medium' | 'hard';
  customContent?: React.ReactNode;
}

export interface GameErrorScreenProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  onGoHome?: () => void;
  errorDetails?: string;
}
