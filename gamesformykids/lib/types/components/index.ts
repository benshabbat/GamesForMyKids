/**
 * ===============================================
 * ייצוא מרכזי לטיפוסי קומפוננטות - Clean Code
 * ===============================================
 */

// ייצוא האינטרפייסים הקיימים מה-UI
import type {
  ButtonProps,
  GameStartButtonProps,
  HeaderProps,
  SimpleLoadingScreenProps,
  ErrorScreenProps,
  NavigationProps,
  ModalProps,
  ToastProps,
  GoogleAnalyticsProps
} from '../ui/core';

// ייצוא עם alias למניעת קונפליקטים
export type ComponentTypes = {
  // כפתורים
  ButtonProps: ButtonProps;
  GameStartButtonProps: GameStartButtonProps;
  
  // כותרות
  HeaderProps: HeaderProps;
  
  // מסכים
  LoadingScreenProps: SimpleLoadingScreenProps;
  ErrorScreenProps: ErrorScreenProps;
  
  // ניווט
  NavigationProps: NavigationProps;
  
  // מודאלים
  ModalProps: ModalProps;
  ToastProps: ToastProps;
  
  // אנליטיקס
  GoogleAnalyticsProps: GoogleAnalyticsProps;
  
  // Props כלליים שנוספו לתאימות
  UnifiedCardProps: {
    size?: 'small' | 'medium' | 'large';
    shape?: 'rounded' | 'circle' | 'square';
    aspectRatio?: 'square' | 'wide' | 'tall';
    hoverEffect?: 'scale' | 'lift' | 'glow' | 'none';
    shadow?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'none';
    animation?: 'bounce' | 'pulse' | 'none';
  };
};

// ===== קומפוננטות בסיסיות =====
export * from './buttons';    // כפתורים וקומפוננטות אינטראקטיביות
export * from './headers';    // כותרות וניווט
export * from './layout';     // מבנה עמוד ופריסה

// ===== קומפוננטות משחק =====
export * from './cards';      // קלפים ופריטי משחק
export * from './game';       // קומפוננטות ספציפיות למשחקים
export * from './icons';      // איקונים וגרפיקה

// ===== תצוגה ומשוב =====
export * from './displays';   // תצוגת מידע וסטטיסטיקות
export * from './feedback';   // רמזים, הוראות וחגיגות
export * from './screens';    // מסכים מלאים