/** Tailwind classes for clickable SVG regions */
export const REGION_CLASS =
  'cursor-pointer transition-colors duration-100 hover:opacity-75 active:opacity-50';

/** Stroke color for the selected/highlighted region */
export const SEL_STROKE = '#f59e0b';

/** Stroke width for the selected/highlighted region */
export const SEL_WIDTH = 5;

// ── Game data ─────────────────────────────────────────────────────────────────

export const PALETTE_COLORS = [
  { hex: '#FF4136', hebrew: 'אדום' },
  { hex: '#FF851B', hebrew: 'כתום' },
  { hex: '#FFDC00', hebrew: 'צהוב' },
  { hex: '#2ECC40', hebrew: 'ירוק' },
  { hex: '#0074D9', hebrew: 'כחול' },
  { hex: '#B10DC9', hebrew: 'סגול' },
  { hex: '#FF69B4', hebrew: 'ורוד' },
  { hex: '#8B4513', hebrew: 'חום' },
  { hex: '#AAAAAA', hebrew: 'אפור' },
  { hex: '#111111', hebrew: 'שחור' },
  { hex: '#7FDBFF', hebrew: 'תכלת' },
  { hex: '#01FF70', hebrew: 'ירוק בהיר' },
] as const;

export type ImageId = 'cat' | 'house' | 'sun' | 'butterfly' | 'flower' | 'fish' | 'tree' | 'car';

export const IMAGES: { id: ImageId; title: string; emoji: string }[] = [
  { id: 'cat', title: 'חתול', emoji: '🐱' },
  { id: 'house', title: 'בית', emoji: '🏠' },
  { id: 'sun', title: 'שמש', emoji: '☀️' },
  { id: 'butterfly', title: 'פרפר', emoji: '🦋' },
  { id: 'flower', title: 'פרח', emoji: '🌸' },
  { id: 'fish', title: 'דג', emoji: '🐟' },
  { id: 'tree', title: 'עץ', emoji: '🌳' },
  { id: 'car', title: 'מכונית', emoji: '🚗' },
];
