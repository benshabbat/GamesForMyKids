/**
 * ===============================================
 * טיפוסים לקומפוננטות Headers
 * ===============================================
 */

export interface UnifiedHeaderProps {
  title: string;
  showBackButton?: boolean;
  showScore?: boolean;
  onBack?: () => void;
  customActions?: React.ReactNode;
}

export interface StartScreenHeaderProps {
  title: string;
  subtitle?: string;
  subTitle?: string; // alias for compatibility
  showLogo?: boolean;
  textColorHeader?: string;
  textColorSubHeader?: string;
  className?: string;
  children?: React.ReactNode;
}

export interface GameHeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  onReset?: () => void;
  onHome?: () => void;
  levelColor?: string;
  customContent?: React.ReactNode;
}
