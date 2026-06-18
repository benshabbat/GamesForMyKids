export type AvatarArea = 'face' | 'hair' | 'clothing' | 'accessories';

export interface AvatarPart {
  id: string;
  emoji: string;
  label: string;
  color?: string;
}

export const AVATAR_PARTS: Record<AvatarArea, AvatarPart[]> = {
  face: [
    { id: 'f1', emoji: '😊', label: 'פנים שמחות' },
    { id: 'f2', emoji: '😄', label: 'פנים מאושרות' },
    { id: 'f3', emoji: '😎', label: 'פנים קרירות' },
    { id: 'f4', emoji: '🥳', label: 'פנים חגיגיות' },
    { id: 'f5', emoji: '🤩', label: 'פנים נרגשות' },
    { id: 'f6', emoji: '😇', label: 'פנים תמימות' },
    { id: 'f7', emoji: '😜', label: 'פנים שובבות' },
    { id: 'f8', emoji: '🤗', label: 'פנים חמות' },
  ],
  hair: [
    { id: 'hr1', emoji: '🟤', label: 'שיער חום',     color: '#8B4513' },
    { id: 'hr2', emoji: '🟡', label: 'שיער בלונד',   color: '#F0E68C' },
    { id: 'hr3', emoji: '⬛', label: 'שיער שחור',    color: '#1C1C1C' },
    { id: 'hr4', emoji: '🔴', label: 'שיער אדום',    color: '#CC2200' },
    { id: 'hr5', emoji: '⬜', label: 'שיער לבן',     color: '#E8E8E8' },
    { id: 'hr6', emoji: '🟣', label: 'שיער סגול',   color: '#7B2FBE' },
    { id: 'hr7', emoji: '🌈', label: 'שיער קשת',    color: '#FF6B9D' },
    { id: 'hr8', emoji: '🩶', label: 'שיער אפור',   color: '#888888' },
  ],
  clothing: [
    { id: 'c1', emoji: '👕', label: 'חולצה כחולה' },
    { id: 'c2', emoji: '👗', label: 'שמלה יפה' },
    { id: 'c3', emoji: '🧥', label: 'מעיל חם' },
    { id: 'c4', emoji: '👚', label: 'חולצת ספורט' },
    { id: 'c5', emoji: '🎽', label: 'גופיית ספורט' },
    { id: 'c6', emoji: '👔', label: 'חולצה מכופתרת' },
    { id: 'c7', emoji: '🧣', label: 'צעיף צבעוני' },
    { id: 'c8', emoji: '🩱', label: 'בגד ים' },
  ],
  accessories: [
    { id: 'a0', emoji: '❌', label: 'ללא אביזר' },
    { id: 'a1', emoji: '🎀', label: 'סרט שיער' },
    { id: 'a2', emoji: '🕶️', label: 'משקפי שמש' },
    { id: 'a3', emoji: '🧢', label: 'כובע שטח' },
    { id: 'a4', emoji: '👑', label: 'כתר' },
    { id: 'a5', emoji: '🌟', label: 'כוכב מזהיר' },
    { id: 'a6', emoji: '🎸', label: 'גיטרה' },
    { id: 'a7', emoji: '🌈', label: 'קשת קסם' },
  ],
};

export const AREA_LABELS: Record<AvatarArea, string> = {
  face:        '😊 הבעה',
  hair:        '💇 שיער',
  clothing:    '👕 ביגוד',
  accessories: '🌟 אביזרים',
};

export const AVATAR_AREAS: AvatarArea[] = ['face', 'hair', 'clothing', 'accessories'];

export const DEFAULT_SELECTIONS: Record<AvatarArea, string> = {
  face:        'f1',
  hair:        'hr1',
  clothing:    'c1',
  accessories: 'a0',
};
