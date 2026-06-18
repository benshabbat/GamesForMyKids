export type SoundCategory = 'animals' | 'instruments' | 'nature' | 'household';

export interface SoundClip {
  id: string;
  name: string;       // Hebrew name (correct answer label)
  emoji: string;
  soundText: string;  // Hebrew onomatopoeia spoken by TTS
  category: SoundCategory;
}

export const SOUND_CLIPS: SoundClip[] = [
  // ── בעלי חיים ──────────────────────────────────────────────────────────────
  { id: 'a1',  name: 'חתול',    emoji: '🐱', soundText: 'מיאו מיאו',       category: 'animals' },
  { id: 'a2',  name: 'כלב',     emoji: '🐶', soundText: 'הב הב הב',        category: 'animals' },
  { id: 'a3',  name: 'פרה',     emoji: '🐄', soundText: 'מוּ מוּ מוּ',      category: 'animals' },
  { id: 'a4',  name: 'דבורה',   emoji: '🐝', soundText: 'בזז בזז',          category: 'animals' },
  { id: 'a5',  name: 'תרנגול',  emoji: '🐓', soundText: 'קוקוריקו',          category: 'animals' },
  { id: 'a6',  name: 'צפרדע',   emoji: '🐸', soundText: 'קוואק קוואק',       category: 'animals' },
  { id: 'a7',  name: 'כבש',     emoji: '🐑', soundText: 'מֵה מֵה',           category: 'animals' },
  { id: 'a8',  name: 'נחש',     emoji: '🐍', soundText: 'שששששש',            category: 'animals' },
  { id: 'a9',  name: 'ציפור',   emoji: '🐦', soundText: 'צ\'יק צ\'יק',      category: 'animals' },
  { id: 'a10', name: 'פרא',     emoji: '🐴', soundText: 'אִיִיִי',           category: 'animals' },
  { id: 'a11', name: 'קוף',     emoji: '🐒', soundText: 'אוּ אוּ אָה',       category: 'animals' },
  { id: 'a12', name: 'אריה',    emoji: '🦁', soundText: 'רּוּוּאר',          category: 'animals' },

  // ── כלי נגינה ──────────────────────────────────────────────────────────────
  { id: 'i1',  name: 'תוף',     emoji: '🥁', soundText: 'בום בום צַק',       category: 'instruments' },
  { id: 'i2',  name: 'חצוצרה',  emoji: '🎺', soundText: 'טָה טָה טָטָה',    category: 'instruments' },
  { id: 'i3',  name: 'גיטרה',   emoji: '🎸', soundText: 'לָה לָה לָה',       category: 'instruments' },
  { id: 'i4',  name: 'פסנתר',   emoji: '🎹', soundText: 'דִינג דִינג דִינג', category: 'instruments' },
  { id: 'i5',  name: 'כינור',   emoji: '🎻', soundText: 'לִי לִי לִי',       category: 'instruments' },
  { id: 'i6',  name: 'מפוחית',  emoji: '🪗', soundText: 'וּאָה וּאָה',        category: 'instruments' },
  { id: 'i7',  name: 'פלוט',    emoji: '🪈', soundText: 'פְרִי פְרִי פְרִי', category: 'instruments' },
  { id: 'i8',  name: 'מרמבה',   emoji: '🎵', soundText: 'בּוּם בּוּם טִינג', category: 'instruments' },
  { id: 'i9',  name: 'מצילות',  emoji: '🔔', soundText: 'טִינג טִינג',        category: 'instruments' },
  { id: 'i10', name: 'אקורדיון', emoji: '🎶', soundText: 'לָה לָה לָלָה',     category: 'instruments' },

  // ── טבע ────────────────────────────────────────────────────────────────────
  { id: 'n1',  name: 'גשם',     emoji: '🌧️', soundText: 'טִיף טִיף טִיף',   category: 'nature' },
  { id: 'n2',  name: 'רעם',     emoji: '⛈️', soundText: 'בוּוּוּוּם',         category: 'nature' },
  { id: 'n3',  name: 'רוח',     emoji: '💨', soundText: 'שׁוּוּוּוּ',          category: 'nature' },
  { id: 'n4',  name: 'ים',      emoji: '🌊', soundText: 'וּוּשׁ וּוּשׁ',       category: 'nature' },
  { id: 'n5',  name: 'צרצר',    emoji: '🦗', soundText: 'צְרְ צְרְ צְרְ',     category: 'nature' },
  { id: 'n6',  name: 'מפל',     emoji: '🏞️', soundText: 'שַׁשׁשׁ שַׁשׁשׁ',     category: 'nature' },
  { id: 'n7',  name: 'אש',      emoji: '🔥', soundText: 'טַרַק טַרַק פִצ',    category: 'nature' },
  { id: 'n8',  name: 'סופה',    emoji: '🌪️', soundText: 'וּוּוּוּוּ',           category: 'nature' },
  { id: 'n9',  name: 'קרח',     emoji: '🧊', soundText: 'טְרִיק טְרִיק',       category: 'nature' },
  { id: 'n10', name: 'עץ',      emoji: '🌲', soundText: 'שְׁרִיקַת עלים',      category: 'nature' },

  // ── בית ────────────────────────────────────────────────────────────────────
  { id: 'h1',  name: 'שעון',    emoji: '⏰', soundText: 'טִיק טָק טִיק טָק',  category: 'household' },
  { id: 'h2',  name: 'טלפון',   emoji: '📱', soundText: 'טְרִינג טְרִינג',     category: 'household' },
  { id: 'h3',  name: 'דלת',     emoji: '🚪', soundText: 'דַּנג קּלִיק',          category: 'household' },
  { id: 'h4',  name: 'שואב אבק',emoji: '🧹', soundText: 'ווּּוּוּ ווּּוּוּ',     category: 'household' },
  { id: 'h5',  name: 'מקלדת',   emoji: '⌨️', soundText: 'טַק טַק טַק',         category: 'household' },
  { id: 'h6',  name: 'כיריים',  emoji: '🍳', soundText: 'שִׁיש שִׁיש שִׁיש',    category: 'household' },
  { id: 'h7',  name: 'חשמלית',  emoji: '🔔', soundText: 'דִינג דוֹנג',           category: 'household' },
  { id: 'h8',  name: 'מיקסר',   emoji: '🥣', soundText: 'וּוּוּוּוּ',             category: 'household' },
  { id: 'h9',  name: 'מקלחת',   emoji: '🚿', soundText: 'שׁ שׁ שׁ שׁ',           category: 'household' },
  { id: 'h10', name: 'מכונת כביסה', emoji: '🫧', soundText: 'גּוּרגּוּר שְׁ שְׁ', category: 'household' },
];

export const CATEGORY_LABELS: Record<SoundCategory, string> = {
  animals:     '🐾 בעלי חיים',
  instruments: '🎵 כלי נגינה',
  nature:      '🌿 טבע',
  household:   '🏠 בית',
};

export const SOUND_CATEGORIES: SoundCategory[] = ['animals', 'instruments', 'nature', 'household'];
