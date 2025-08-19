/**
 * ===============================================
 * טיפוסים לקומפוננטות Screens
 * ===============================================
 */

export interface GenericStartScreenProps<T> {
  // Header props
  title: string;
  subtitle?: string;
  subTitle?: string; // alias for subtitle
  textColorHeader?: string;
  textColorSubHeader?: string;
  
  // Game props
  items: T[];
  gameSteps?: Array<{
    stepNumber?: number;
    stepText?: string;
    icon: string;
    title: string;
    description: string;
  }>;
  gameStepsBgClass?: string;
  onStart?: () => void;
  customOnStart?: () => void;
  onItemClick?: (item: T) => void;
  onSpeak?: (name: string) => void;
  showPreview?: boolean;
  difficulty?: 'easy' | 'medium' | 'hard';
  
  // Button colors
  buttonFromColor?: string;
  buttonToColor?: string;
  
  // Background
  backgroundStyle?: string;
  
  // Items display
  itemsTitle?: string;
  itemsDescription?: string;
  itemsDescriptionColor?: string;
  itemsGridClass?: string;
  
  // Item rendering function
  renderItem?: (item: T, index: number) => React.ReactNode;
  customItemsRenderer?: () => React.ReactNode;
  customContent?: React.ReactNode;
  
  // Layout options
  showAudioCheck?: boolean;
  className?: string;
}

export interface GameErrorScreenProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  onGoHome?: () => void;
  errorDetails?: string;
}
