import type { BaseGameItem } from '@/lib/types/core/base';

// ─── Geography: Flags mode ────────────────────────────────────────────────────
// name = iso2 (unique key), hebrew = country name (answer on card), id = iso2 (flag URL)
export const GEOGRAPHY_FLAGS_ITEMS: BaseGameItem[] = [
  { name: 'il', hebrew: 'ישראל', hebrewNikud: 'יִשְׂרָאֵל', english: 'Israel', emoji: '🇮🇱', id: 'il' },
  { name: 'fr', hebrew: 'צרפת', hebrewNikud: 'צָרְפַת', english: 'France', emoji: '🇫🇷', id: 'fr' },
  { name: 'de', hebrew: 'גרמניה', hebrewNikud: 'גֶּרְמַנְיָה', english: 'Germany', emoji: '🇩🇪', id: 'de' },
  { name: 'gb', hebrew: 'בריטניה', hebrewNikud: 'בְּרִיטַנְיָה', english: 'UK', emoji: '🇬🇧', id: 'gb' },
  { name: 'it', hebrew: 'איטליה', hebrewNikud: 'אִיטַלְיָה', english: 'Italy', emoji: '🇮🇹', id: 'it' },
  { name: 'es', hebrew: 'ספרד', hebrewNikud: 'סְפָרַד', english: 'Spain', emoji: '🇪🇸', id: 'es' },
  { name: 'us', hebrew: 'ארצות הברית', hebrewNikud: 'אַרְצוֹת הַבְּרִית', english: 'USA', emoji: '🇺🇸', id: 'us' },
  { name: 'br', hebrew: 'ברזיל', hebrewNikud: 'בְּרָזִיל', english: 'Brazil', emoji: '🇧🇷', id: 'br' },
  { name: 'ar', hebrew: 'ארגנטינה', hebrewNikud: 'אַרְגֶּנְטִינָה', english: 'Argentina', emoji: '🇦🇷', id: 'ar' },
  { name: 'ca', hebrew: 'קנדה', hebrewNikud: 'קָנָדָה', english: 'Canada', emoji: '🇨🇦', id: 'ca' },
  { name: 'mx', hebrew: 'מקסיקו', hebrewNikud: 'מֶקְסִיקוֹ', english: 'Mexico', emoji: '🇲🇽', id: 'mx' },
  { name: 'cn', hebrew: 'סין', hebrewNikud: 'סִין', english: 'China', emoji: '🇨🇳', id: 'cn' },
  { name: 'jp', hebrew: 'יפן', hebrewNikud: 'יָפָן', english: 'Japan', emoji: '🇯🇵', id: 'jp' },
  { name: 'in', hebrew: 'הודו', hebrewNikud: 'הוֹדוּ', english: 'India', emoji: '🇮🇳', id: 'in' },
  { name: 'ru', hebrew: 'רוסיה', hebrewNikud: 'רוּסְיָה', english: 'Russia', emoji: '🇷🇺', id: 'ru' },
  { name: 'au', hebrew: 'אוסטרליה', hebrewNikud: 'אוֹסְטְרַלְיָה', english: 'Australia', emoji: '🇦🇺', id: 'au' },
  { name: 'eg', hebrew: 'מצרים', hebrewNikud: 'מִצְרַיִם', english: 'Egypt', emoji: '🇪🇬', id: 'eg' },
  { name: 'za', hebrew: 'דרום אפריקה', hebrewNikud: 'דְּרוֹם אַפְרִיקָה', english: 'South Africa', emoji: '🇿🇦', id: 'za' },
  { name: 'ng', hebrew: 'ניגריה', hebrewNikud: 'נִיגֶרְיָה', english: 'Nigeria', emoji: '🇳🇬', id: 'ng' },
  { name: 'tr', hebrew: 'טורקיה', hebrewNikud: 'טוּרְקִיָה', english: 'Turkey', emoji: '🇹🇷', id: 'tr' },
  { name: 'gr', hebrew: 'יוון', hebrewNikud: 'יָוָן', english: 'Greece', emoji: '🇬🇷', id: 'gr' },
  { name: 'pt', hebrew: 'פורטוגל', hebrewNikud: 'פּוֹרְטוּגָל', english: 'Portugal', emoji: '🇵🇹', id: 'pt' },
  { name: 'nl', hebrew: 'הולנד', hebrewNikud: 'הוֹלַנְד', english: 'Netherlands', emoji: '🇳🇱', id: 'nl' },
  { name: 'se', hebrew: 'שוודיה', hebrewNikud: 'שְׁוֶודְיָה', english: 'Sweden', emoji: '🇸🇪', id: 'se' },
];

// ─── Geography: Capitals mode ─────────────────────────────────────────────────
// hebrew = capital (answer on card), plural = country Hebrew name (for challenge question)
export const GEOGRAPHY_CAPITALS_ITEMS: BaseGameItem[] = [
  { name: 'il', hebrew: 'ירושלים', hebrewNikud: 'יְרוּשָׁלַיִם', english: 'Jerusalem', emoji: '🇮🇱', id: 'il', plural: 'ישראל' },
  { name: 'fr', hebrew: 'פריז', hebrewNikud: 'פָּרִיז', english: 'Paris', emoji: '🇫🇷', id: 'fr', plural: 'צרפת' },
  { name: 'de', hebrew: 'ברלין', hebrewNikud: 'בֶּרְלִין', english: 'Berlin', emoji: '🇩🇪', id: 'de', plural: 'גרמניה' },
  { name: 'gb', hebrew: 'לונדון', hebrewNikud: 'לוֹנְדוֹן', english: 'London', emoji: '🇬🇧', id: 'gb', plural: 'בריטניה' },
  { name: 'it', hebrew: 'רומא', hebrewNikud: 'רוֹמָא', english: 'Rome', emoji: '🇮🇹', id: 'it', plural: 'איטליה' },
  { name: 'es', hebrew: 'מדריד', hebrewNikud: 'מַדְרִיד', english: 'Madrid', emoji: '🇪🇸', id: 'es', plural: 'ספרד' },
  { name: 'us', hebrew: 'וושינגטון', hebrewNikud: 'ווֹשִׁינְגְטוֹן', english: 'Washington DC', emoji: '🇺🇸', id: 'us', plural: 'ארצות הברית' },
  { name: 'br', hebrew: 'ברזיליה', hebrewNikud: 'בְּרָזִילְיָה', english: 'Brasilia', emoji: '🇧🇷', id: 'br', plural: 'ברזיל' },
  { name: 'ar', hebrew: 'בואנוס איירס', hebrewNikud: 'בּוּאֵנוֹס אַיְירֶס', english: 'Buenos Aires', emoji: '🇦🇷', id: 'ar', plural: 'ארגנטינה' },
  { name: 'ca', hebrew: 'אוטווה', hebrewNikud: 'אוֹטַווָה', english: 'Ottawa', emoji: '🇨🇦', id: 'ca', plural: 'קנדה' },
  { name: 'mx', hebrew: 'מקסיקו סיטי', hebrewNikud: 'מֶקְסִיקוֹ סִיטִי', english: 'Mexico City', emoji: '🇲🇽', id: 'mx', plural: 'מקסיקו' },
  { name: 'cn', hebrew: 'בייג\'ינג', hebrewNikud: 'בֵּייגִ\'ינְג', english: 'Beijing', emoji: '🇨🇳', id: 'cn', plural: 'סין' },
  { name: 'jp', hebrew: 'טוקיו', hebrewNikud: 'טוֹקְיוֹ', english: 'Tokyo', emoji: '🇯🇵', id: 'jp', plural: 'יפן' },
  { name: 'in', hebrew: 'ניו דלהי', hebrewNikud: 'נְיוּ דֶּלְהִי', english: 'New Delhi', emoji: '🇮🇳', id: 'in', plural: 'הודו' },
  { name: 'ru', hebrew: 'מוסקבה', hebrewNikud: 'מוֹסְקְבָה', english: 'Moscow', emoji: '🇷🇺', id: 'ru', plural: 'רוסיה' },
  { name: 'au', hebrew: 'קנברה', hebrewNikud: 'קָנְבֶּרָה', english: 'Canberra', emoji: '🇦🇺', id: 'au', plural: 'אוסטרליה' },
  { name: 'eg', hebrew: 'קהיר', hebrewNikud: 'קָהִיר', english: 'Cairo', emoji: '🇪🇬', id: 'eg', plural: 'מצרים' },
  { name: 'za', hebrew: 'פרטוריה', hebrewNikud: 'פְּרֶטוֹרְיָה', english: 'Pretoria', emoji: '🇿🇦', id: 'za', plural: 'דרום אפריקה' },
  { name: 'ng', hebrew: 'אבוג\'ה', hebrewNikud: 'אָבּוּגָ\'ה', english: 'Abuja', emoji: '🇳🇬', id: 'ng', plural: 'ניגריה' },
  { name: 'tr', hebrew: 'אנקרה', hebrewNikud: 'אַנְקָרָה', english: 'Ankara', emoji: '🇹🇷', id: 'tr', plural: 'טורקיה' },
  { name: 'gr', hebrew: 'אתונה', hebrewNikud: 'אָתוּנָה', english: 'Athens', emoji: '🇬🇷', id: 'gr', plural: 'יוון' },
  { name: 'pt', hebrew: 'ליסבון', hebrewNikud: 'לִיסְבּוֹן', english: 'Lisbon', emoji: '🇵🇹', id: 'pt', plural: 'פורטוגל' },
  { name: 'nl', hebrew: 'אמסטרדם', hebrewNikud: 'אַמְסְטֶרְדָּם', english: 'Amsterdam', emoji: '🇳🇱', id: 'nl', plural: 'הולנד' },
  { name: 'se', hebrew: 'שטוקהולם', hebrewNikud: 'שְׁטוֹקְהוֹלְם', english: 'Stockholm', emoji: '🇸🇪', id: 'se', plural: 'שוודיה' },
];

// ─── Geography: Continents mode ───────────────────────────────────────────────
// hebrew = continent (answer on card), color = continent (for unique-by-continent
// option generation), plural = country Hebrew name (for challenge question)
export const GEOGRAPHY_CONTINENTS_ITEMS: BaseGameItem[] = [
  { name: 'il', hebrew: 'אסיה', hebrewNikud: 'אַסְיָה', english: 'Asia', emoji: '🇮🇱', id: 'il', color: 'אסיה', plural: 'ישראל' },
  { name: 'fr', hebrew: 'אירופה', hebrewNikud: 'אֵירוֹפָּה', english: 'Europe', emoji: '🇫🇷', id: 'fr', color: 'אירופה', plural: 'צרפת' },
  { name: 'de', hebrew: 'אירופה', hebrewNikud: 'אֵירוֹפָּה', english: 'Europe', emoji: '🇩🇪', id: 'de', color: 'אירופה', plural: 'גרמניה' },
  { name: 'gb', hebrew: 'אירופה', hebrewNikud: 'אֵירוֹפָּה', english: 'Europe', emoji: '🇬🇧', id: 'gb', color: 'אירופה', plural: 'בריטניה' },
  { name: 'it', hebrew: 'אירופה', hebrewNikud: 'אֵירוֹפָּה', english: 'Europe', emoji: '🇮🇹', id: 'it', color: 'אירופה', plural: 'איטליה' },
  { name: 'es', hebrew: 'אירופה', hebrewNikud: 'אֵירוֹפָּה', english: 'Europe', emoji: '🇪🇸', id: 'es', color: 'אירופה', plural: 'ספרד' },
  { name: 'us', hebrew: 'אמריקה', hebrewNikud: 'אָמֶרִיקָה', english: 'Americas', emoji: '🇺🇸', id: 'us', color: 'אמריקה', plural: 'ארצות הברית' },
  { name: 'br', hebrew: 'אמריקה', hebrewNikud: 'אָמֶרִיקָה', english: 'Americas', emoji: '🇧🇷', id: 'br', color: 'אמריקה', plural: 'ברזיל' },
  { name: 'ar', hebrew: 'אמריקה', hebrewNikud: 'אָמֶרִיקָה', english: 'Americas', emoji: '🇦🇷', id: 'ar', color: 'אמריקה', plural: 'ארגנטינה' },
  { name: 'ca', hebrew: 'אמריקה', hebrewNikud: 'אָמֶרִיקָה', english: 'Americas', emoji: '🇨🇦', id: 'ca', color: 'אמריקה', plural: 'קנדה' },
  { name: 'mx', hebrew: 'אמריקה', hebrewNikud: 'אָמֶרִיקָה', english: 'Americas', emoji: '🇲🇽', id: 'mx', color: 'אמריקה', plural: 'מקסיקו' },
  { name: 'cn', hebrew: 'אסיה', hebrewNikud: 'אַסְיָה', english: 'Asia', emoji: '🇨🇳', id: 'cn', color: 'אסיה', plural: 'סין' },
  { name: 'jp', hebrew: 'אסיה', hebrewNikud: 'אַסְיָה', english: 'Asia', emoji: '🇯🇵', id: 'jp', color: 'אסיה', plural: 'יפן' },
  { name: 'in', hebrew: 'אסיה', hebrewNikud: 'אַסְיָה', english: 'Asia', emoji: '🇮🇳', id: 'in', color: 'אסיה', plural: 'הודו' },
  { name: 'ru', hebrew: 'אירופה', hebrewNikud: 'אֵירוֹפָּה', english: 'Europe', emoji: '🇷🇺', id: 'ru', color: 'אירופה', plural: 'רוסיה' },
  { name: 'au', hebrew: 'אוקיאניה', hebrewNikud: 'אוֹקְיָאנְיָה', english: 'Oceania', emoji: '🇦🇺', id: 'au', color: 'אוקיאניה', plural: 'אוסטרליה' },
  { name: 'eg', hebrew: 'אפריקה', hebrewNikud: 'אַפְרִיקָה', english: 'Africa', emoji: '🇪🇬', id: 'eg', color: 'אפריקה', plural: 'מצרים' },
  { name: 'za', hebrew: 'אפריקה', hebrewNikud: 'אַפְרִיקָה', english: 'Africa', emoji: '🇿🇦', id: 'za', color: 'אפריקה', plural: 'דרום אפריקה' },
  { name: 'ng', hebrew: 'אפריקה', hebrewNikud: 'אַפְרִיקָה', english: 'Africa', emoji: '🇳🇬', id: 'ng', color: 'אפריקה', plural: 'ניגריה' },
  { name: 'tr', hebrew: 'אסיה', hebrewNikud: 'אַסְיָה', english: 'Asia', emoji: '🇹🇷', id: 'tr', color: 'אסיה', plural: 'טורקיה' },
  { name: 'gr', hebrew: 'אירופה', hebrewNikud: 'אֵירוֹפָּה', english: 'Europe', emoji: '🇬🇷', id: 'gr', color: 'אירופה', plural: 'יוון' },
  { name: 'pt', hebrew: 'אירופה', hebrewNikud: 'אֵירוֹפָּה', english: 'Europe', emoji: '🇵🇹', id: 'pt', color: 'אירופה', plural: 'פורטוגל' },
  { name: 'nl', hebrew: 'אירופה', hebrewNikud: 'אֵירוֹפָּה', english: 'Europe', emoji: '🇳🇱', id: 'nl', color: 'אירופה', plural: 'הולנד' },
  { name: 'se', hebrew: 'אירופה', hebrewNikud: 'אֵירוֹפָּה', english: 'Europe', emoji: '🇸🇪', id: 'se', color: 'אירופה', plural: 'שוודיה' },
];
