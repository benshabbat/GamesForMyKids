/**
 * ===============================================
 * UI Component Props Types - Clean Code & SOLID
 * ===============================================
 */

import { ReactNode } from 'react';

/**
 * מאפיינים בסיסיים לכל רכיב - עקרון Single Responsibility
 */
export interface BaseComponentProps {
  readonly children?: ReactNode;
  readonly className?: string;
}

/**
 * מאפיינים לפעולה - עקרון Single Responsibility
 */
export interface Actionable {
  readonly onClick?: () => void;
  readonly disabled?: boolean;
}

/**
 * מאפיינים למצב טעינה - עקרון Single Responsibility
 */
export interface Loadable {
  readonly loading?: boolean;
}

/**
 * Props בסיסיים לכפתור - עקרון Interface Segregation
 */
export interface BaseButtonProps extends 
  BaseComponentProps, 
  Actionable, 
  Loadable {}

/**
 * סוגי וריאנטים לכפתור - עקרון Open/Closed
 */
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

/**
 * גדלים זמינים לכפתור - עקרון Open/Closed
 */
export type ComponentSize = 'small' | 'medium' | 'large';

/**
 * מאפיינים לעיצוב כפתור - עקרון Single Responsibility
 */
export interface ButtonStyling {
  readonly variant?: ButtonVariant;
  readonly size?: ComponentSize;
}

/**
 * Props לכפתור רגיל - עקרון Interface Segregation
 */
export interface ButtonProps extends BaseButtonProps, ButtonStyling {}

/**
 * מאפיינים לטקסט כפתור משחק - עקרון Single Responsibility
 */
export interface GameButtonText {
  readonly title?: string;
  readonly text?: string;
}

/**
 * מאפיינים לגרדיאנט - עקרון Single Responsibility
 */
export interface GradientColors {
  readonly fromColor?: string;
  readonly toColor?: string;
}

/**
 * מאפיינים לפעולה מותאמת - עקרון Single Responsibility
 */
export interface CustomAction {
  readonly customOnStart?: () => void;
}

/**
 * Props לכפתור התחלת משחק - עקרון Interface Segregation
 */
export interface GameStartButtonProps extends 
  BaseButtonProps,
  ButtonStyling,
  GameButtonText,
  GradientColors,
  CustomAction {}

/**
 * מאפיינים לכותרת - עקרון Single Responsibility
 */
export interface TitledComponent {
  readonly title: string;
  readonly description?: string;
}

/**
 * Props לכותרת - עקרון Interface Segregation
 */
export interface HeaderProps extends BaseComponentProps, TitledComponent {}

/**
 * מאפיינים לטעינה עם הודעה - עקרון Single Responsibility
 */
export interface LoadingWithMessage {
  readonly message?: string;
  readonly onLoadingComplete?: () => void;
}

/**
 * Props למסך טעינה פשוט - Type alias עם משמעות ברורה
 */
export type SimpleLoadingScreenProps = LoadingWithMessage;

/**
 * מאפיינים לשגיאה - עקרון Single Responsibility
 */
export interface ErrorInfo {
  readonly error: Error | string;
  readonly title?: string;
}

/**
 * מאפיינים לטיפול בשגיאה - עקרון Single Responsibility
 */
export interface ErrorRecoverable {
  readonly onRetry?: () => void;
}

/**
 * Props למסך שגיאה - עקרון Interface Segregation
 */
export interface ErrorScreenProps extends ErrorInfo, ErrorRecoverable {}

/**
 * פריט ניווט בסיסי - עקרון Single Responsibility
 */
export interface NavigationItemBase {
  readonly id: string;
  readonly label: string;
  readonly href?: string;
  readonly active?: boolean;
}

/**
 * פריט ניווט עם אייקון - עקרון Single Responsibility
 */
export interface NavigationItemWithIcon {
  readonly icon?: React.ComponentType<{ className?: string }>;
}

/**
 * פריט ניווט מלא - עקרון Interface Segregation
 */
export interface NavigationItem extends NavigationItemBase, NavigationItemWithIcon {}

/**
 * מאפיינים לניווט - עקרון Single Responsibility
 */
export interface NavigationBehavior {
  readonly activeItem?: string;
  readonly onItemClick?: (itemId: string) => void;
}

/**
 * Props לניווט - עקרון Interface Segregation
 */
export interface NavigationProps extends NavigationBehavior {
  readonly items: ReadonlyArray<NavigationItem>;
}

/**
 * מצב מודאל - עקרון Single Responsibility
 */
export interface ModalState {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

/**
 * תוכן מודאל - עקרון Single Responsibility
 */
export interface ModalContent extends BaseComponentProps, TitledComponent {
  readonly size?: ComponentSize;
}

/**
 * Props למודאל - עקרון Interface Segregation
 */
export interface ModalProps extends ModalState, ModalContent {}

/**
 * סוגי הודעות Toast - עקרון Open/Closed
 */
export type ToastType = 'success' | 'error' | 'warning' | 'info';

/**
 * מאפיינים להודעת Toast - עקרון Single Responsibility
 */
export interface ToastContent {
  readonly message: string;
  readonly type: ToastType;
}

/**
 * מאפיינים לזמן הצגה - עקרון Single Responsibility
 */
export interface ToastTiming {
  readonly duration?: number;
  readonly onClose?: () => void;
}

/**
 * Props להודעת Toast - עקרון Interface Segregation
 */
export interface ToastProps extends ToastContent, ToastTiming {}

/**
 * Props ל-Google Analytics - עקרון Single Responsibility
 */
export interface GoogleAnalyticsProps {
  readonly GA_MEASUREMENT_ID: string;
}
