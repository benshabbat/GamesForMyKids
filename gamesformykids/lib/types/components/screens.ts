/**
 * ===============================================
 * טיפוסים לקומפוננטות Screens
 * ===============================================
 */

export interface GenericStartScreenProps<T> {
  // Header props
  title?: string | undefined;
  subtitle?: string | undefined;
  subTitle?: string | undefined;
  textColorHeader?: string | undefined;
  textColorSubHeader?: string | undefined;

  // Game props
  items?: T[] | undefined;
  gameSteps?: Array<{
    stepNumber?: number;
    stepText?: string;
    icon: string;
    title: string;
    description: string;
  }> | undefined;
  gameStepsBgClass?: string | undefined;
  onStart?: (() => void) | undefined;
  customOnStart?: (() => void) | undefined;
  onItemClick?: ((item: T) => void) | undefined;
  onSpeak?: ((name: string) => void) | undefined;
  showPreview?: boolean | undefined;
  difficulty?: 'easy' | 'medium' | 'hard' | undefined;

  // Button colors
  buttonFromColor?: string | undefined;
  buttonToColor?: string | undefined;

  // Background
  backgroundStyle?: string | undefined;

  // Items display
  itemsTitle?: string | undefined;
  itemsDescription?: string | undefined;
  itemsDescriptionColor?: string | undefined;
  itemsGridClass?: string | undefined;

  // Item rendering function
  renderItem?: ((item: T, index: number) => React.ReactNode) | undefined;
  customItemsRenderer?: (() => React.ReactNode) | undefined;
  customContent?: React.ReactNode;

  // Layout options
  showAudioCheck?: boolean | undefined;
  className?: string | undefined;

  // Extra controls below the start button (e.g. study-first toggle)
  extraControls?: React.ReactNode;
}

export interface GameErrorScreenProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  onGoHome?: () => void;
  errorDetails?: string;
}
