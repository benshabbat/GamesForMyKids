import type { DotToDotPicture, DotToDotTheme } from '../types';

export const DOT_TO_DOT_THEMES: { id: DotToDotTheme; title: string; emoji: string }[] = [
  { id: 'space', title: 'חלל', emoji: '🚀' },
  { id: 'animals', title: 'חיות', emoji: '🐱' },
  { id: 'vehicles', title: 'כלי רכב', emoji: '🚗' },
];

export const DOT_TO_DOT_PICTURES: DotToDotPicture[] = [
  {
    id: 'rocket',
    title: 'רקטה',
    emoji: '🚀',
    theme: 'space',
    viewBox: '0 0 300 300',
    closed: true,
    points: [
      { x: 150, y: 30 }, { x: 180, y: 100 }, { x: 180, y: 180 }, { x: 215, y: 240 },
      { x: 180, y: 210 }, { x: 165, y: 230 }, { x: 135, y: 230 }, { x: 120, y: 210 },
      { x: 85, y: 240 }, { x: 120, y: 180 }, { x: 120, y: 100 },
    ],
  },
  {
    id: 'star',
    title: 'כוכב',
    emoji: '⭐',
    theme: 'space',
    viewBox: '0 0 300 300',
    closed: true,
    points: [
      { x: 150, y: 40 }, { x: 176, y: 114 }, { x: 255, y: 116 }, { x: 193, y: 164 },
      { x: 215, y: 239 }, { x: 150, y: 195 }, { x: 85, y: 239 }, { x: 107, y: 164 },
      { x: 45, y: 116 }, { x: 124, y: 114 },
    ],
  },
  {
    id: 'cat',
    title: 'חתול',
    emoji: '🐱',
    theme: 'animals',
    viewBox: '0 0 300 300',
    closed: true,
    points: [
      { x: 150, y: 230 }, { x: 95, y: 205 }, { x: 85, y: 150 }, { x: 90, y: 50 },
      { x: 118, y: 105 }, { x: 150, y: 85 }, { x: 182, y: 105 }, { x: 210, y: 50 },
      { x: 215, y: 150 }, { x: 205, y: 205 },
    ],
  },
  {
    id: 'fish',
    title: 'דג',
    emoji: '🐟',
    theme: 'animals',
    viewBox: '0 0 300 300',
    closed: true,
    points: [
      { x: 50, y: 120 }, { x: 100, y: 150 }, { x: 50, y: 180 }, { x: 110, y: 175 },
      { x: 190, y: 190 }, { x: 240, y: 150 }, { x: 190, y: 110 }, { x: 110, y: 125 },
    ],
  },
  {
    id: 'sailboat',
    title: 'סירת מפרש',
    emoji: '⛵',
    theme: 'vehicles',
    viewBox: '0 0 300 300',
    closed: true,
    points: [
      { x: 150, y: 40 }, { x: 200, y: 170 }, { x: 230, y: 175 }, { x: 255, y: 220 },
      { x: 150, y: 235 }, { x: 45, y: 220 }, { x: 70, y: 175 }, { x: 100, y: 170 },
    ],
  },
  {
    id: 'car',
    title: 'מכונית',
    emoji: '🚗',
    theme: 'vehicles',
    viewBox: '0 0 300 300',
    closed: true,
    points: [
      { x: 50, y: 200 }, { x: 50, y: 160 }, { x: 90, y: 130 }, { x: 140, y: 105 },
      { x: 190, y: 105 }, { x: 230, y: 130 }, { x: 260, y: 160 }, { x: 260, y: 200 },
    ],
  },
  {
    id: 'butterfly',
    title: 'פרפר',
    emoji: '🦋',
    theme: 'animals',
    viewBox: '0 0 300 300',
    closed: true,
    imageSrc: '/images/dot-to-dot/butterfly.png',
    // Traced from public/images/dot-to-dot/butterfly.png (curly antennae + 4 patterned wing lobes).
    points: [
      { x: 138, y: 118 }, { x: 125, y: 93 }, { x: 144, y: 113 }, { x: 174, y: 94 },
      { x: 162, y: 118 }, { x: 200, y: 91 }, { x: 237, y: 103 }, { x: 234, y: 133 },
      { x: 200, y: 142 }, { x: 222, y: 148 }, { x: 240, y: 181 }, { x: 210, y: 199 },
      { x: 150, y: 203 }, { x: 90, y: 199 }, { x: 63, y: 181 }, { x: 78, y: 148 },
      { x: 101, y: 142 }, { x: 66, y: 133 }, { x: 29, y: 103 }, { x: 66, y: 91 },
    ],
  },
];

export function getPicturesByTheme(theme: DotToDotTheme): DotToDotPicture[] {
  return DOT_TO_DOT_PICTURES.filter((p) => p.theme === theme);
}

export function getPictureById(id: string): DotToDotPicture | undefined {
  return DOT_TO_DOT_PICTURES.find((p) => p.id === id);
}
