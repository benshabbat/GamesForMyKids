export type Continent = 'אירופה' | 'אסיה' | 'אמריקה' | 'אפריקה' | 'אוקיאניה';

export interface Country {
  id: string;
  name: string;
  capital: string;
  continent: Continent;
  flag: string;
  iso2: string;
}

export function getFlagUrl(iso2: string, size: 80 | 160 = 80): string {
  return `https://flagcdn.com/w${size}/${iso2}.png`;
}

export const COUNTRIES: Country[] = [
  { id: 'israel',       name: 'ישראל',        capital: 'ירושלים',      continent: 'אסיה',     flag: '🇮🇱', iso2: 'il' },
  { id: 'france',       name: 'צרפת',          capital: 'פריז',          continent: 'אירופה',   flag: '🇫🇷', iso2: 'fr' },
  { id: 'germany',      name: 'גרמניה',        capital: 'ברלין',         continent: 'אירופה',   flag: '🇩🇪', iso2: 'de' },
  { id: 'uk',           name: 'בריטניה',       capital: 'לונדון',        continent: 'אירופה',   flag: '🇬🇧', iso2: 'gb' },
  { id: 'italy',        name: 'איטליה',        capital: 'רומא',          continent: 'אירופה',   flag: '🇮🇹', iso2: 'it' },
  { id: 'spain',        name: 'ספרד',          capital: 'מדריד',         continent: 'אירופה',   flag: '🇪🇸', iso2: 'es' },
  { id: 'usa',          name: 'ארצות הברית',   capital: 'וושינגטון',     continent: 'אמריקה',   flag: '🇺🇸', iso2: 'us' },
  { id: 'brazil',       name: 'ברזיל',         capital: 'ברזיליה',       continent: 'אמריקה',   flag: '🇧🇷', iso2: 'br' },
  { id: 'argentina',    name: 'ארגנטינה',      capital: 'בואנוס איירס',  continent: 'אמריקה',   flag: '🇦🇷', iso2: 'ar' },
  { id: 'canada',       name: 'קנדה',          capital: 'אוטווה',        continent: 'אמריקה',   flag: '🇨🇦', iso2: 'ca' },
  { id: 'mexico',       name: 'מקסיקו',        capital: 'מקסיקו סיטי',   continent: 'אמריקה',   flag: '🇲🇽', iso2: 'mx' },
  { id: 'china',        name: 'סין',           capital: 'בייג\'ינג',     continent: 'אסיה',     flag: '🇨🇳', iso2: 'cn' },
  { id: 'japan',        name: 'יפן',           capital: 'טוקיו',         continent: 'אסיה',     flag: '🇯🇵', iso2: 'jp' },
  { id: 'india',        name: 'הודו',          capital: 'ניו דלהי',      continent: 'אסיה',     flag: '🇮🇳', iso2: 'in' },
  { id: 'russia',       name: 'רוסיה',         capital: 'מוסקבה',        continent: 'אירופה',   flag: '🇷🇺', iso2: 'ru' },
  { id: 'australia',    name: 'אוסטרליה',      capital: 'קנברה',         continent: 'אוקיאניה', flag: '🇦🇺', iso2: 'au' },
  { id: 'egypt',        name: 'מצרים',         capital: 'קהיר',          continent: 'אפריקה',   flag: '🇪🇬', iso2: 'eg' },
  { id: 'south-africa', name: 'דרום אפריקה',   capital: 'פרטוריה',       continent: 'אפריקה',   flag: '🇿🇦', iso2: 'za' },
  { id: 'nigeria',      name: 'ניגריה',        capital: 'אבוג\'ה',       continent: 'אפריקה',   flag: '🇳🇬', iso2: 'ng' },
  { id: 'turkey',       name: 'טורקיה',        capital: 'אנקרה',         continent: 'אסיה',     flag: '🇹🇷', iso2: 'tr' },
  { id: 'greece',       name: 'יוון',          capital: 'אתונה',         continent: 'אירופה',   flag: '🇬🇷', iso2: 'gr' },
  { id: 'portugal',     name: 'פורטוגל',       capital: 'ליסבון',        continent: 'אירופה',   flag: '🇵🇹', iso2: 'pt' },
  { id: 'netherlands',  name: 'הולנד',         capital: 'אמסטרדם',       continent: 'אירופה',   flag: '🇳🇱', iso2: 'nl' },
  { id: 'sweden',       name: 'שוודיה',        capital: 'שטוקהולם',      continent: 'אירופה',   flag: '🇸🇪', iso2: 'se' },
];

export type QuestionMode = 'capital' | 'flag' | 'continent';

export const GEO_QUESTIONS_PER_GAME = 12;
export const CONTINENTS: Continent[] = ['אירופה', 'אסיה', 'אמריקה', 'אפריקה', 'אוקיאניה'];

export const MODES: { mode: QuestionMode; label: string; desc: string; emoji: string }[] = [
  { mode: 'capital',   label: 'בירות',  desc: 'מה הבירה של...?',          emoji: '🏛️' },
  { mode: 'flag',      label: 'דגלים',  desc: 'לאיזו מדינה שייך הדגל?',  emoji: '🚩' },
  { mode: 'continent', label: 'יבשות',  desc: 'באיזו יבשה נמצאת המדינה?', emoji: '🌍' },
];

export function getGeoPrompt(country: Country, mode: QuestionMode): string {
  if (mode === 'capital') return `🏙️ מה הבירה של ${country.name}?`;
  if (mode === 'flag')    return 'לאיזו מדינה שייך הדגל?';
  return `🌍 באיזו יבשת נמצאת ${country.name}?`;
}

export function getChoiceLabel(c: Country, mode: QuestionMode): string {
  if (mode === 'capital') return c.capital;
  if (mode === 'flag')    return c.name;
  return c.continent;
}
