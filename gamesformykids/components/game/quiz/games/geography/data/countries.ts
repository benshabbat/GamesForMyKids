export type Continent = 'אירופה' | 'אסיה' | 'אמריקה' | 'אפריקה' | 'אוקיאניה';

export interface Country {
  id: string;
  name: string;
  capital: string;
  continent: Continent;
  flag: string;
}

export const COUNTRIES: Country[] = [
  { id: 'israel',      name: 'ישראל',        capital: 'ירושלים',      continent: 'אסיה',     flag: '🇮🇱' },
  { id: 'france',      name: 'צרפת',          capital: 'פריז',          continent: 'אירופה',   flag: '🇫🇷' },
  { id: 'germany',     name: 'גרמניה',        capital: 'ברלין',         continent: 'אירופה',   flag: '🇩🇪' },
  { id: 'uk',          name: 'בריטניה',       capital: 'לונדון',        continent: 'אירופה',   flag: '🇬🇧' },
  { id: 'italy',       name: 'איטליה',        capital: 'רומא',          continent: 'אירופה',   flag: '🇮🇹' },
  { id: 'spain',       name: 'ספרד',          capital: 'מדריד',         continent: 'אירופה',   flag: '🇪🇸' },
  { id: 'usa',         name: 'ארצות הברית',   capital: 'וושינגטון',     continent: 'אמריקה',   flag: '🇺🇸' },
  { id: 'brazil',      name: 'ברזיל',         capital: 'ברזיליה',       continent: 'אמריקה',   flag: '🇧🇷' },
  { id: 'argentina',   name: 'ארגנטינה',      capital: 'בואנוס איירס',  continent: 'אמריקה',   flag: '🇦🇷' },
  { id: 'canada',      name: 'קנדה',          capital: 'אוטווה',        continent: 'אמריקה',   flag: '🇨🇦' },
  { id: 'mexico',      name: 'מקסיקו',        capital: 'מקסיקו סיטי',   continent: 'אמריקה',   flag: '🇲🇽' },
  { id: 'china',       name: 'סין',           capital: 'בייג\'ינג',     continent: 'אסיה',     flag: '🇨🇳' },
  { id: 'japan',       name: 'יפן',           capital: 'טוקיו',         continent: 'אסיה',     flag: '🇯🇵' },
  { id: 'india',       name: 'הודו',          capital: 'ניו דלהי',      continent: 'אסיה',     flag: '🇮🇳' },
  { id: 'russia',      name: 'רוסיה',         capital: 'מוסקבה',        continent: 'אירופה',   flag: '🇷🇺' },
  { id: 'australia',   name: 'אוסטרליה',      capital: 'קנברה',         continent: 'אוקיאניה', flag: '🇦🇺' },
  { id: 'egypt',       name: 'מצרים',         capital: 'קהיר',          continent: 'אפריקה',   flag: '🇪🇬' },
  { id: 'south-africa',name: 'דרום אפריקה',   capital: 'פרטוריה',       continent: 'אפריקה',   flag: '🇿🇦' },
  { id: 'nigeria',     name: 'ניגריה',        capital: 'אבוג\'ה',       continent: 'אפריקה',   flag: '🇳🇬' },
  { id: 'turkey',      name: 'טורקיה',        capital: 'אנקרה',         continent: 'אסיה',     flag: '🇹🇷' },
  { id: 'greece',      name: 'יוון',          capital: 'אתונה',         continent: 'אירופה',   flag: '🇬🇷' },
  { id: 'portugal',    name: 'פורטוגל',       capital: 'ליסבון',        continent: 'אירופה',   flag: '🇵🇹' },
  { id: 'netherlands', name: 'הולנד',         capital: 'אמסטרדם',       continent: 'אירופה',   flag: '🇳🇱' },
  { id: 'sweden',      name: 'שוודיה',        capital: 'שטוקהולם',      continent: 'אירופה',   flag: '🇸🇪' },
];

export type QuestionMode = 'capital' | 'flag' | 'continent';

export const QUESTIONS_PER_GAME = 12;
export const CONTINENTS: Continent[] = ['אירופה', 'אסיה', 'אמריקה', 'אפריקה', 'אוקיאניה'];
