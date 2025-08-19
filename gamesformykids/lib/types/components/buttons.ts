/**
 * ===============================================
 * טיפוסים לקומפוננטות Buttons
 * ===============================================
 */

export interface SimpleGameStartButtonProps {
  title?: string;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'success';
  size?: 'small' | 'medium' | 'large';
}
