// UI Component Props Types

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
}

export interface HeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export interface LoadingScreenProps {
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
