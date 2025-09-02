// UI Component Props Types

/**
 * Props בסיסיים לכפתור
 */
export interface BaseButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

/**
 * Props לכפתור רגיל
 */
export interface ButtonProps extends BaseButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'small' | 'medium' | 'large';
}

/**
 * Props לכפתור התחלת משחק
 */
export interface GameStartButtonProps extends BaseButtonProps {
  title?: string;
  text?: string;
  variant?: 'primary' | 'secondary' | 'success';
  size?: 'small' | 'medium' | 'large';
  fromColor?: string;
  toColor?: string;
  customOnStart?: () => void;
}

export interface HeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export interface SimpleLoadingScreenProps {
  onLoadingComplete?: () => void;
  message?: string;
}

export interface ErrorScreenProps {
  error: Error | string;
  onRetry?: () => void;
  title?: string;
}

export interface NavigationProps {
  items: NavigationItem[];
  activeItem?: string;
  onItemClick?: (itemId: string) => void;
}

export interface NavigationItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
  active?: boolean;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
}

export interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose?: () => void;
}

export interface GoogleAnalyticsProps {
  GA_MEASUREMENT_ID: string;
}
