interface Diff {
  index: number;
  altEmoji: string;
  hint: string;
}

export interface Scene {
  name: string;
  emoji: string;
  bg: string;
  cols: number;
  items: string[];
  diffs: Diff[];
}

export const SCENES: Scene[] = [
  {
    name: 'חיות', emoji: '🐾', bg: 'from-green-100 to-emerald-200',
    cols: 5,
    items: [
      '🐶','🐱','🐭','🐹','🐰',
      '🦊','🐻','🐼','🐨','🐯',
      '🦁','🐮','🐷','🐸','🐵',
      '🐔','🐧','🐦','🐤','🦜',
    ],
    diffs: [
      { index: 2,  altEmoji: '🐹', hint: 'הכלב שינה' },
      { index: 7,  altEmoji: '🐨', hint: 'הפנדה שינה' },
      { index: 11, altEmoji: '🦙', hint: 'הפרה שינתה' },
      { index: 16, altEmoji: '🦚', hint: 'הפינגווין שינה' },
      { index: 18, altEmoji: '🐦', hint: 'האפרוח שינה' },
    ],
  },
  {
    name: 'מטבח', emoji: '🍴', bg: 'from-orange-100 to-yellow-200',
    cols: 5,
    items: [
      '🍕','🍔','🌮','🌯','🥗',
      '🍱','🍛','🍲','🥘','🥣',
      '🥞','🧇','🥓','🥚','🍳',
      '🥩','🍗','🍖','🌽','🥦',
    ],
    diffs: [
      { index: 0,  altEmoji: '🍰', hint: 'הפיצה שינתה' },
      { index: 5,  altEmoji: '🍣', hint: 'הקופסה שינתה' },
      { index: 10, altEmoji: '🥐', hint: 'הלביבות שינו' },
      { index: 15, altEmoji: '🍖', hint: 'הבשר שינה' },
      { index: 18, altEmoji: '🥒', hint: 'התירס שינה' },
    ],
  },
  {
    name: 'גן', emoji: '🌳', bg: 'from-lime-100 to-green-200',
    cols: 5,
    items: [
      '🌳','🌲','🌴','🌵','🌾',
      '🍀','🌿','🌱','🌸','🌺',
      '🌻','🌼','💐','🌷','🌹',
      '🏡','🚗','🚕','🐕','🐈',
    ],
    diffs: [
      { index: 1,  altEmoji: '🌺', hint: 'עץ שינה' },
      { index: 6,  altEmoji: '🌸', hint: 'הצמח שינה' },
      { index: 12, altEmoji: '🌻', hint: 'הזר שינה' },
      { index: 17, altEmoji: '🚙', hint: 'המכונית שינתה' },
      { index: 19, altEmoji: '🐱', hint: 'החתול שינה' },
    ],
  },
  {
    name: 'ים', emoji: '🌊', bg: 'from-blue-100 to-cyan-200',
    cols: 5,
    items: [
      '🐠','🐟','🐡','🦈','🐙',
      '🦑','🦐','🦞','🦀','🐚',
      '🪸','🐚','🐬','🐳','🐋',
      '🦭','🐊','🐢','🌊','💧',
    ],
    diffs: [
      { index: 0,  altEmoji: '🐡', hint: 'הדג שינה' },
      { index: 4,  altEmoji: '🦑', hint: 'התמנון שינה' },
      { index: 9,  altEmoji: '🪸', hint: 'הצדפה שינתה' },
      { index: 13, altEmoji: '🐋', hint: 'הדולפין שינה' },
      { index: 17, altEmoji: '🐟', hint: 'הצב שינה' },
    ],
  },
  {
    name: 'שמים', emoji: '🌟', bg: 'from-indigo-100 to-purple-200',
    cols: 5,
    items: [
      '☀️','🌤️','⛅','🌥️','☁️',
      '🌦️','🌧️','⛈️','🌩️','🌨️',
      '❄️','🌬️','🌈','🌙','⭐',
      '✨','💫','🌟','🌠','🌌',
    ],
    diffs: [
      { index: 0,  altEmoji: '🌝', hint: 'השמש שינתה' },
      { index: 4,  altEmoji: '🌩️', hint: 'הענן שינה' },
      { index: 9,  altEmoji: '☃️', hint: 'השלג שינה' },
      { index: 14, altEmoji: '🌑', hint: 'הכוכב שינה' },
      { index: 17, altEmoji: '💥', hint: 'הכוכב שינה' },
    ],
  },
];

export const TIMER_START = 90;
export const DIFF_POINTS = 20;
