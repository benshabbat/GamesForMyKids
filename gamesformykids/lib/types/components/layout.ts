/**
 * ===============================================
 * טיפוסים לקומפוננטות Layout
 * ===============================================
 */

export interface LoadingScreenProps {
  message?: string;
  progress?: number;
  showProgress?: boolean;
  variant?: 'spinner' | 'dots' | 'pulse';
}
