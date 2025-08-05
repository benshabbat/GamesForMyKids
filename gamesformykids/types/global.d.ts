/**
 * Global type definitions for the application
 * These types are available throughout the entire codebase
 */

// Utility types
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Common component props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
  'data-testid'?: string;
}

// Error types
export interface AppError {
  message: string;
  code?: string;
  statusCode?: number;
  cause?: unknown;
}

// Loading states
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Game related types
export interface GameScore {
  score: number;
  maxScore: number;
  percentage: number;
  timeSpent: number;
  attempts: number;
}

export interface GameSession {
  id: string;
  gameType: string;
  startTime: Date;
  endTime?: Date;
  score?: GameScore;
  completed: boolean;
}

// User progress types
export interface UserProgress {
  gamesCompleted: number;
  totalTimePlayed: number;
  averageScore: number;
  favoriteGames: string[];
  achievements: string[];
  lastPlayed: Date;
}

// Audio types
export interface AudioSettings {
  masterVolume: number;
  soundEffectsVolume: number;
  musicVolume: number;
  speechVolume: number;
  muted: boolean;
}

// Theme types
export type Theme = 'light' | 'dark' | 'auto';

export interface ThemeSettings {
  theme: Theme;
  primaryColor: string;
  fontSize: 'small' | 'medium' | 'large';
  animations: boolean;
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: NavItem[];
  external?: boolean;
}

// API response types
export interface ApiResponse<T = unknown> {
  data: T;
  success: boolean;
  message?: string;
  error?: AppError;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Form types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'checkbox' | 'radio';
  required?: boolean;
  placeholder?: string;
  options?: { label: string; value: string }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: RegExp;
    message?: string;
  };
}

export interface FormState<T = Record<string, unknown>> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
}

// Event types
export type EventHandler<T = Event> = (event: T) => void;
export type AsyncEventHandler<T = Event> = (event: T) => Promise<void>;

// Generic function types
export type AsyncFunction<T = void> = () => Promise<T>;
export type Callback<T = void> = () => T;
export type AsyncCallback<T = void> = () => Promise<T>;

// Utility function types
export type Predicate<T> = (item: T) => boolean;
export type Mapper<T, U> = (item: T) => U;
export type Reducer<T, U> = (accumulator: U, current: T) => U;

// Component variant types
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Variant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
export type Color = 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'pink' | 'gray';

// Animation types
export type AnimationType = 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'bounce' | 'pulse' | 'spin';

export interface AnimationConfig {
  type: AnimationType;
  duration: number;
  delay?: number;
  repeat?: number | 'infinite';
  easing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
}

// Modal types
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: Size;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
}

// Toast/Notification types
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Local storage types
export type StorageValue = string | number | boolean | object | null;

export interface StorageOptions {
  encrypt?: boolean;
  expire?: number; // timestamp
  version?: string;
}

// SEO types
export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  author?: string;
  publishedAt?: Date;
  modifiedAt?: Date;
}

// Performance monitoring types
export interface PerformanceMetrics {
  renderTime: number;
  loadTime: number;
  interactionTime: number;
  memoryUsage?: number;
  networkRequests?: number;
}

// Global app state
declare global {
  interface Window {
    // Add any global window properties here
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

// Module augmentation for popular libraries
declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}

declare module '*.mp3' {
  const content: string;
  export default content;
}

declare module '*.wav' {
  const content: string;
  export default content;
}

declare module '*.ogg' {
  const content: string;
  export default content;
}
