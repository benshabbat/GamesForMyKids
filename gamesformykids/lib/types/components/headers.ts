/**
 * ===============================================
 * טיפוסים לקומפוננטות Headers
 * ===============================================
 */

export interface UnifiedHeaderProps {
  title: string;
  showBackButton?: boolean;
  showScore?: boolean;
  score?: number;
  level?: number;
  onBack?: () => void;
  customActions?: React.ReactNode;
}

export interface StartScreenHeaderProps {
  title: string;
  subtitle?: string;
  showLogo?: boolean;
}

export interface GameHeaderProps {
  title: string;
  score?: number;
  level?: number;
  showBackButton?: boolean;
  onBack?: () => void;
  customContent?: React.ReactNode;
}
