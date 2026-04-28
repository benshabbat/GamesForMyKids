/**
 * ===============================================
 * UI Component Props Types - Clean Code & SOLID
 * ===============================================
 */

import { ReactNode } from 'react';

/**
 * מאפיינים בסיסיים לכל רכיב - עקרון Single Responsibility
 */
interface BaseComponentProps {
  readonly children?: ReactNode;
  readonly className?: string;
}

/**
 * Props בסיסיים לכפתור - עקרון Interface Segregation
 */
interface BaseButtonProps extends BaseComponentProps {
  readonly onClick?: () => void;
  readonly disabled?: boolean;
  readonly loading?: boolean;
}

/**
 * Type alias לתאימות לאחור - ButtonProps
 */
export type ButtonProps = BaseButtonProps;

/**
 * סוגי וריאנטים לכפתור - עקרון Open/Closed
 */
type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

/**
 * גדלים זמינים לכפתור - עקרון Open/Closed
 */
type ComponentSize = 'small' | 'medium' | 'large';

/**
 * Props ל-Google Analytics - עקרון Single Responsibility
 */
export interface GoogleAnalyticsProps {
  readonly GA_MEASUREMENT_ID: string;
}

/**
 * Props למסך טעינה - עקרון Single Responsibility
 */
export interface LoadingScreenProps {
  readonly message?: string;
  readonly showSpinner?: boolean;
  readonly onLoadingComplete?: () => void;
}
