import type { BaseGameItem } from '@/lib/types/core/base';

// ─── Geography: Flags mode ────────────────────────────────────────────────────
// name = iso2 (unique key), hebrew = country name (answer on card), id = iso2 (flag URL)
export const GEOGRAPHY_FLAGS_ITEMS: BaseGameItem[] = [
  { name: 'il', hebrew: 'ישראל',        english: 'Israel',        emoji: '🇮🇱', id: 'il' },
  { name: 'fr', hebrew: 'צרפת',          english: 'France',        emoji: '🇫🇷', id: 'fr' },
  { name: 'de', hebrew: 'גרמניה',        english: 'Germany',       emoji: '🇩🇪', id: 'de' },
  { name: 'gb', hebrew: 'בריטניה',       english: 'UK',            emoji: '🇬🇧', id: 'gb' },
  { name: 'it', hebrew: 'איטליה',        english: 'Italy',         emoji: '🇮🇹', id: 'it' },
  { name: 'es', hebrew: 'ספרד',          english: 'Spain',         emoji: '🇪🇸', id: 'es' },
  { name: 'us', hebrew: 'ארצות הברית',   english: 'USA',           emoji: '🇺🇸', id: 'us' },
  { name: 'br', hebrew: 'ברזיל',         english: 'Brazil',        emoji: '🇧🇷', id: 'br' },
  { name: 'ar', hebrew: 'ארגנטינה',      english: 'Argentina',     emoji: '🇦🇷', id: 'ar' },
  { name: 'ca', hebrew: 'קנדה',          english: 'Canada',        emoji: '🇨🇦', id: 'ca' },
  { name: 'mx', hebrew: 'מקסיקו',        english: 'Mexico',        emoji: '🇲🇽', id: 'mx' },
  { name: 'cn', hebrew: 'סין',           english: 'China',         emoji: '🇨🇳', id: 'cn' },
  { name: 'jp', hebrew: 'יפן',           english: 'Japan',         emoji: '🇯🇵', id: 'jp' },
  { name: 'in', hebrew: 'הודו',          english: 'India',         emoji: '🇮🇳', id: 'in' },
  { name: 'ru', hebrew: 'רוסיה',         english: 'Russia',        emoji: '🇷🇺', id: 'ru' },
  { name: 'au', hebrew: 'אוסטרליה',      english: 'Australia',     emoji: '🇦🇺', id: 'au' },
  { name: 'eg', hebrew: 'מצרים',         english: 'Egypt',         emoji: '🇪🇬', id: 'eg' },
  { name: 'za', hebrew: 'דרום אפריקה',   english: 'South Africa',  emoji: '🇿🇦', id: 'za' },
  { name: 'ng', hebrew: 'ניגריה',        english: 'Nigeria',       emoji: '🇳🇬', id: 'ng' },
  { name: 'tr', hebrew: 'טורקיה',        english: 'Turkey',        emoji: '🇹🇷', id: 'tr' },
  { name: 'gr', hebrew: 'יוון',          english: 'Greece',        emoji: '🇬🇷', id: 'gr' },
  { name: 'pt', hebrew: 'פורטוגל',       english: 'Portugal',      emoji: '🇵🇹', id: 'pt' },
  { name: 'nl', hebrew: 'הולנד',         english: 'Netherlands',   emoji: '🇳🇱', id: 'nl' },
  { name: 'se', hebrew: 'שוודיה',        english: 'Sweden',        emoji: '🇸🇪', id: 'se' },
];

// ─── Geography: Capitals mode ─────────────────────────────────────────────────
// hebrew = capital (answer on card), plural = country Hebrew name (for challenge question)
export const GEOGRAPHY_CAPITALS_ITEMS: BaseGameItem[] = [
  { name: 'il', hebrew: 'ירושלים',        english: 'Jerusalem',         emoji: '🇮🇱', id: 'il', plural: 'ישראל' },
  { name: 'fr', hebrew: 'פריז',            english: 'Paris',             emoji: '🇫🇷', id: 'fr', plural: 'צרפת' },
  { name: 'de', hebrew: 'ברלין',           english: 'Berlin',            emoji: '🇩🇪', id: 'de', plural: 'גרמניה' },
  { name: 'gb', hebrew: 'לונדון',          english: 'London',            emoji: '🇬🇧', id: 'gb', plural: 'בריטניה' },
  { name: 'it', hebrew: 'רומא',            english: 'Rome',              emoji: '🇮🇹', id: 'it', plural: 'איטליה' },
  { name: 'es', hebrew: 'מדריד',           english: 'Madrid',            emoji: '🇪🇸', id: 'es', plural: 'ספרד' },
  { name: 'us', hebrew: 'וושינגטון',       english: 'Washington DC',     emoji: '🇺🇸', id: 'us', plural: 'ארצות הברית' },
  { name: 'br', hebrew: 'ברזיליה',         english: 'Brasilia',          emoji: '🇧🇷', id: 'br', plural: 'ברזיל' },
  { name: 'ar', hebrew: 'בואנוס איירס',    english: 'Buenos Aires',      emoji: '🇦🇷', id: 'ar', plural: 'ארגנטינה' },
  { name: 'ca', hebrew: 'אוטווה',          english: 'Ottawa',            emoji: '🇨🇦', id: 'ca', plural: 'קנדה' },
  { name: 'mx', hebrew: 'מקסיקו סיטי',     english: 'Mexico City',       emoji: '🇲🇽', id: 'mx', plural: 'מקסיקו' },
  { name: 'cn', hebrew: 'בייג\'ינג',       english: 'Beijing',           emoji: '🇨🇳', id: 'cn', plural: 'סין' },
  { name: 'jp', hebrew: 'טוקיו',           english: 'Tokyo',             emoji: '🇯🇵', id: 'jp', plural: 'יפן' },
  { name: 'in', hebrew: 'ניו דלהי',        english: 'New Delhi',         emoji: '🇮🇳', id: 'in', plural: 'הודו' },
  { name: 'ru', hebrew: 'מוסקבה',          english: 'Moscow',            emoji: '🇷🇺', id: 'ru', plural: 'רוסיה' },
  { name: 'au', hebrew: 'קנברה',           english: 'Canberra',          emoji: '🇦🇺', id: 'au', plural: 'אוסטרליה' },
  { name: 'eg', hebrew: 'קהיר',            english: 'Cairo',             emoji: '🇪🇬', id: 'eg', plural: 'מצרים' },
  { name: 'za', hebrew: 'פרטוריה',         english: 'Pretoria',          emoji: '🇿🇦', id: 'za', plural: 'דרום אפריקה' },
  { name: 'ng', hebrew: 'אבוג\'ה',         english: 'Abuja',             emoji: '🇳🇬', id: 'ng', plural: 'ניגריה' },
  { name: 'tr', hebrew: 'אנקרה',           english: 'Ankara',            emoji: '🇹🇷', id: 'tr', plural: 'טורקיה' },
  { name: 'gr', hebrew: 'אתונה',           english: 'Athens',            emoji: '🇬🇷', id: 'gr', plural: 'יוון' },
  { name: 'pt', hebrew: 'ליסבון',          english: 'Lisbon',            emoji: '🇵🇹', id: 'pt', plural: 'פורטוגל' },
  { name: 'nl', hebrew: 'אמסטרדם',         english: 'Amsterdam',         emoji: '🇳🇱', id: 'nl', plural: 'הולנד' },
  { name: 'se', hebrew: 'שטוקהולם',        english: 'Stockholm',         emoji: '🇸🇪', id: 'se', plural: 'שוודיה' },
];

// ─── Geography: Continents mode ───────────────────────────────────────────────
// hebrew = continent (answer on card), color = continent (for unique-by-continent
// option generation), plural = country Hebrew name (for challenge question)
export const GEOGRAPHY_CONTINENTS_ITEMS: BaseGameItem[] = [
  { name: 'il', hebrew: 'אסיה',     english: 'Asia',    emoji: '🇮🇱', id: 'il', color: 'אסיה',     plural: 'ישראל' },
  { name: 'fr', hebrew: 'אירופה',   english: 'Europe',  emoji: '🇫🇷', id: 'fr', color: 'אירופה',   plural: 'צרפת' },
  { name: 'de', hebrew: 'אירופה',   english: 'Europe',  emoji: '🇩🇪', id: 'de', color: 'אירופה',   plural: 'גרמניה' },
  { name: 'gb', hebrew: 'אירופה',   english: 'Europe',  emoji: '🇬🇧', id: 'gb', color: 'אירופה',   plural: 'בריטניה' },
  { name: 'it', hebrew: 'אירופה',   english: 'Europe',  emoji: '🇮🇹', id: 'it', color: 'אירופה',   plural: 'איטליה' },
  { name: 'es', hebrew: 'אירופה',   english: 'Europe',  emoji: '🇪🇸', id: 'es', color: 'אירופה',   plural: 'ספרד' },
  { name: 'us', hebrew: 'אמריקה',   english: 'Americas', emoji: '🇺🇸', id: 'us', color: 'אמריקה', plural: 'ארצות הברית' },
  { name: 'br', hebrew: 'אמריקה',   english: 'Americas', emoji: '🇧🇷', id: 'br', color: 'אמריקה', plural: 'ברזיל' },
  { name: 'ar', hebrew: 'אמריקה',   english: 'Americas', emoji: '🇦🇷', id: 'ar', color: 'אמריקה', plural: 'ארגנטינה' },
  { name: 'ca', hebrew: 'אמריקה',   english: 'Americas', emoji: '🇨🇦', id: 'ca', color: 'אמריקה', plural: 'קנדה' },
  { name: 'mx', hebrew: 'אמריקה',   english: 'Americas', emoji: '🇲🇽', id: 'mx', color: 'אמריקה', plural: 'מקסיקו' },
  { name: 'cn', hebrew: 'אסיה',     english: 'Asia',    emoji: '🇨🇳', id: 'cn', color: 'אסיה',     plural: 'סין' },
  { name: 'jp', hebrew: 'אסיה',     english: 'Asia',    emoji: '🇯🇵', id: 'jp', color: 'אסיה',     plural: 'יפן' },
  { name: 'in', hebrew: 'אסיה',     english: 'Asia',    emoji: '🇮🇳', id: 'in', color: 'אסיה',     plural: 'הודו' },
  { name: 'ru', hebrew: 'אירופה',   english: 'Europe',  emoji: '🇷🇺', id: 'ru', color: 'אירופה',   plural: 'רוסיה' },
  { name: 'au', hebrew: 'אוקיאניה', english: 'Oceania', emoji: '🇦🇺', id: 'au', color: 'אוקיאניה', plural: 'אוסטרליה' },
  { name: 'eg', hebrew: 'אפריקה',   english: 'Africa',  emoji: '🇪🇬', id: 'eg', color: 'אפריקה',   plural: 'מצרים' },
  { name: 'za', hebrew: 'אפריקה',   english: 'Africa',  emoji: '🇿🇦', id: 'za', color: 'אפריקה',   plural: 'דרום אפריקה' },
  { name: 'ng', hebrew: 'אפריקה',   english: 'Africa',  emoji: '🇳🇬', id: 'ng', color: 'אפריקה',   plural: 'ניגריה' },
  { name: 'tr', hebrew: 'אסיה',     english: 'Asia',    emoji: '🇹🇷', id: 'tr', color: 'אסיה',     plural: 'טורקיה' },
  { name: 'gr', hebrew: 'אירופה',   english: 'Europe',  emoji: '🇬🇷', id: 'gr', color: 'אירופה',   plural: 'יוון' },
  { name: 'pt', hebrew: 'אירופה',   english: 'Europe',  emoji: '🇵🇹', id: 'pt', color: 'אירופה',   plural: 'פורטוגל' },
  { name: 'nl', hebrew: 'אירופה',   english: 'Europe',  emoji: '🇳🇱', id: 'nl', color: 'אירופה',   plural: 'הולנד' },
  { name: 'se', hebrew: 'אירופה',   english: 'Europe',  emoji: '🇸🇪', id: 'se', color: 'אירופה',   plural: 'שוודיה' },
];
