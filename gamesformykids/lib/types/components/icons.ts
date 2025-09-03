/**
 * ===============================================
 * Icon Component Types - DRY Principle Applied
 * ===============================================
 */

/**
 * Base props for all icons - עקרון DRY
 */
export interface BaseIconProps {
  size?: number;
  className?: string;
}

/**
 * Props עבור אייקון צורה - type alias for clarity
 */
export type ShapeIconProps = BaseIconProps;

/**
 * Props עבור אייקון עברי - type alias for clarity
 */
export type HebrewIconProps = BaseIconProps;
