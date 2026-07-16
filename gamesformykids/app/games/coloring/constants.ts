/** Tailwind classes for clickable SVG regions */
export const REGION_CLASS =
  'cursor-pointer transition-colors duration-100 hover:opacity-75 active:opacity-50';

/** Stroke color for the selected/highlighted region */
export const SEL_STROKE = '#f59e0b';

/** Stroke width for the selected/highlighted region */
export const SEL_WIDTH = 5;

// ── Game data ─────────────────────────────────────────────────────────────────

export const PALETTE_COLORS = [
  { hex: '#FF4136', hebrew: 'אדום', hebrewNikud: 'אָדֹם' },
  { hex: '#FF851B', hebrew: 'כתום', hebrewNikud: 'כָּתֹם' },
  { hex: '#FFDC00', hebrew: 'צהוב', hebrewNikud: 'צָהֹב' },
  { hex: '#2ECC40', hebrew: 'ירוק', hebrewNikud: 'יָרֹק' },
  { hex: '#0074D9', hebrew: 'כחול', hebrewNikud: 'כָּחֹל' },
  { hex: '#B10DC9', hebrew: 'סגול', hebrewNikud: 'סָגֹל' },
  { hex: '#FF69B4', hebrew: 'ורוד', hebrewNikud: 'וָרֹד' },
  { hex: '#8B4513', hebrew: 'חום', hebrewNikud: 'חוּם' },
  { hex: '#AAAAAA', hebrew: 'אפור', hebrewNikud: 'אָפֹר' },
  { hex: '#111111', hebrew: 'שחור', hebrewNikud: 'שָׁחֹר' },
  { hex: '#7FDBFF', hebrew: 'תכלת', hebrewNikud: 'תְּכֵלֶת' },
  { hex: '#01FF70', hebrew: 'ירוק בהיר', hebrewNikud: 'יָרֹק בָּהִיר' },
] as const;

export type ImageId = 'cat' | 'house' | 'sun' | 'butterfly' | 'flower' | 'fish' | 'tree' | 'car'
  | 'star' | 'balloon' | 'robot' | 'dog' | 'boat' | 'forest' | 'forest-friends'
  | 'fruits' | 'superheroes-team' | 'lion' | 'woodland-park' | 'superheroes-kids'
  | 'superheroes-team-2' | 'elephant' | 'jungle-animals' | 'jungle-animals-2' | 'giraffe'
  | 'princess-garden' | 'woodland-friends' | 'princess-library' | 'princess-picnic' | 'jungle-panda';

export const IMAGES: { id: ImageId; title: string; emoji: string }[] = [
  { id: 'cat', title: 'חתול', emoji: '🐱' },
  { id: 'house', title: 'בית', emoji: '🏠' },
  { id: 'sun', title: 'שמש', emoji: '☀️' },
  { id: 'butterfly', title: 'פרפר', emoji: '🦋' },
  { id: 'flower', title: 'פרח', emoji: '🌸' },
  { id: 'fish', title: 'דג', emoji: '🐟' },
  { id: 'tree', title: 'עץ', emoji: '🌳' },
  { id: 'car', title: 'מכונית', emoji: '🚗' },
  { id: 'star', title: 'כוכב', emoji: '⭐' },
  { id: 'balloon', title: 'בלונים', emoji: '🎈' },
  { id: 'robot', title: 'רובוט', emoji: '🤖' },
  { id: 'dog', title: 'כלב', emoji: '🐶' },
  { id: 'boat', title: 'סירה', emoji: '⛵' },
  { id: 'forest', title: 'יער קסום', emoji: '🌲' },
  { id: 'forest-friends', title: 'יער החברים', emoji: '🦊' },
  { id: 'fruits', title: 'פירות טעימים', emoji: '🍓' },
  { id: 'superheroes-team', title: 'גיבורי-על', emoji: '🦸' },
  { id: 'lion', title: 'אריה', emoji: '🦁' },
  { id: 'woodland-park', title: 'פארק ביער', emoji: '🐿️' },
  { id: 'superheroes-kids', title: 'גיבורי-על צעירים', emoji: '🦸‍♀️' },
  { id: 'superheroes-team-2', title: 'גיבורי-על 2', emoji: '🦹' },
  { id: 'elephant', title: 'פיל', emoji: '🐘' },
  { id: 'jungle-animals', title: 'חיות ג\'ונגל', emoji: '🐒' },
  { id: 'jungle-animals-2', title: 'חיות ג\'ונגל 2', emoji: '🦓' },
  { id: 'giraffe', title: 'ג\'ירפה', emoji: '🦒' },
  { id: 'princess-garden', title: 'נסיכה בגן קסום', emoji: '👸' },
  { id: 'woodland-friends', title: 'חברים ביער', emoji: '🦔' },
  { id: 'princess-library', title: 'ספריית הנסיכה', emoji: '📚' },
  { id: 'princess-picnic', title: 'פיקניק נסיכות', emoji: '🧺' },
  { id: 'jungle-panda', title: 'ג\'ונגל עם פנדה', emoji: '🐼' },
];
