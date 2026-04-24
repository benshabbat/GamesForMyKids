/**
 * ===============================================
 * UI Component Props Types - Clean Code & SOLID
 * ===============================================
 */

import { ReactNode } from 'react';
import type { TitledEntity } from '../core/base';

/**
 * מאפיינים בסיסיים לכל רכיב - עקרון Single Responsibility
 */
export interface BaseComponentProps {
  readonly children?: ReactNode;
  readonly className?: string;
}

/**
 * Props בסיסיים לכפתור - עקרון Interface Segregation
 */
export interface BaseButtonProps extends BaseComponentProps {
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
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

/**
 * גדלים זמינים לכפתור - עקרון Open/Closed
 */
export type ComponentSize = 'small' | 'medium' | 'large';

/**
 * Props לכפתור התחלת משחק
 */
export interface GameStartButtonProps extends BaseButtonProps {
  readonly variant?: ButtonVariant;
  readonly size?: ComponentSize;
  readonly title?: string;
  readonly text?: string;
  readonly fromColor?: string;
  readonly toColor?: string;
  readonly customOnStart?: () => void;
}

/**
 * מאפיינים לכותרת - עקרון DRY, type alias
 */
export type TitledComponent = TitledEntity;

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
