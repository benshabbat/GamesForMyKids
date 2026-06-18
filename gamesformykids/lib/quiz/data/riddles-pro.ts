export interface RiddlePro {
  id: number;
  riddle: string;
  clues: [string, string, string];
  answer: string;
  wrongOptions: [string, string, string];
  category: 'animals' | 'food' | 'nature' | 'objects';
}

export const RIDDLES_PRO: RiddlePro[] = [
  // Animals
  { id: 1,  riddle: 'אני החיה הגדולה ביבשה, יש לי חוטם ארוך — מי אני?', clues: ['🌿', '🌍', '🐾'], answer: 'פיל',     category: 'animals', wrongOptions: ['גירפה', 'היפופוטם', 'קרנף'] },
  { id: 2,  riddle: 'אני ישן כל החורף ואוהב דבש — מי אני?',              clues: ['❄️', '🍯', '🌲'], answer: 'דב',      category: 'animals', wrongOptions: ['זאב', 'שועל', 'חזיר בר'] },
  { id: 3,  riddle: 'יש לי כיס על הבטן לנשיאת הגור שלי — מי אני?',      clues: ['🇦🇺', '🦘', '👶'], answer: 'קנגורו', category: 'animals', wrongOptions: ['קוואלה', 'וומבט', 'טסמניה'] },
  { id: 4,  riddle: 'אני שר בלילה ורואה בחושך — מי אני?',                 clues: ['🌙', '🦉', '🌳'], answer: 'ינשוף',  category: 'animals', wrongOptions: ['עטלף', 'חתול', 'ציפור'] },
  { id: 5,  riddle: 'אני הכי מהיר ביבשה ויש לי נקודות — מי אני?',       clues: ['⚡', '🏃', '🌾'], answer: 'צ\'יטה',  category: 'animals', wrongOptions: ['נמר', 'אריה', 'ברדלס'] },
  { id: 6,  riddle: 'אני חי בים ואין לי עצמות — זרועות רבות לי — מי אני?', clues: ['🌊', '🔴', '💧'], answer: 'תמנון',  category: 'animals', wrongOptions: ['דיונון', 'סרטן', 'לובסטר'] },
  { id: 7,  riddle: 'אני מעופף, שר שירים, ואוכל תולעים — מי אני?',       clues: ['🌸', '🎵', '🌿'], answer: 'ציפור',  category: 'animals', wrongOptions: ['אגם', 'חרק', 'שפרפר'] },
  { id: 8,  riddle: 'אני הכי גדול בים, שר שירים — מי אני?',              clues: ['🌊', '🎵', '🔵'], answer: 'לוויתן', category: 'animals', wrongOptions: ['כריש', 'דולפין', 'נהר'] },

  // Food
  { id: 9,  riddle: 'אני צהוב ומתוק, יש לי קליפה לקלף — מי אני?',        clues: ['🌞', '🐒', '🍌'], answer: 'בננה',   category: 'food', wrongOptions: ['לימון', 'מנגו', 'אנanas'] },
  { id: 10, riddle: 'אני עגול ואדום ומתוק, גדל על עץ גבוה — מי אני?',   clues: ['🌳', '❤️', '🌞'], answer: 'תפוח',   category: 'food', wrongOptions: ['עגבנייה', 'אבטיח', 'שזיף'] },
  { id: 11, riddle: 'אני ירוק מבחוץ ואדום מבפנים — מי אני?',             clues: ['☀️', '🏖️', '🍉'], answer: 'אבטיח',  category: 'food', wrongOptions: ['מלון', 'אגס', 'קיווי'] },
  { id: 12, riddle: 'אני עשוי מחלב ויש לי חורים — מי אני?',              clues: ['🐄', '🇨🇭', '🧀'], answer: 'גבינה',  category: 'food', wrongOptions: ['יוגורט', 'שמנת', 'חמאה'] },
  { id: 13, riddle: 'אני קטן, סגול, וגדל על אשכולות — מי אני?',          clues: ['🌱', '🌡️', '🍇'], answer: 'ענב',    category: 'food', wrongOptions: ['זית', 'בלוברי', 'שזיף'] },
  { id: 14, riddle: 'אני מתוק, חום ודביק — דבורים עושות אותי — מי אני?', clues: ['🐝', '🌸', '🌻'], answer: 'דבש',    category: 'food', wrongOptions: ['סירופ', 'ריבה', 'סוכר'] },
  { id: 15, riddle: 'אני עגול, שטוח, ואתה אוכל אותי בפיצה — מי אני?',   clues: ['🇮🇹', '🍕', '🌶️'], answer: 'עגבנייה', category: 'food', wrongOptions: ['גמבה', 'פפריקה', 'צ\'ילי'] },

  // Nature
  { id: 16, riddle: 'אני גבוה בבוקר ונמוך בלילה — מי אני?',              clues: ['🌅', '🌞', '🌇'], answer: 'שמש',    category: 'nature', wrongOptions: ['ירח', 'כוכב', 'ענן'] },
  { id: 17, riddle: 'אני לבן ורך, יורד בחורף ומכסה הכל — מי אני?',      clues: ['❄️', '☃️', '🎿'], answer: 'שלג',    category: 'nature', wrongOptions: ['גשם', 'ברד', 'ערפל'] },
  { id: 18, riddle: 'אני מגיע עם הרעמים ומאיר את השמיים — מי אני?',      clues: ['⛈️', '🌩️', '⚡'], answer: 'ברק',    category: 'nature', wrongOptions: ['שמש', 'קשת', 'מבזק'] },
  { id: 19, riddle: 'אני קשת צבעים שמופיעה אחרי הגשם — מי אני?',        clues: ['🌧️', '🌈', '☀️'], answer: 'קשת',    category: 'nature', wrongOptions: ['צבע', 'פרח', 'שמיים'] },
  { id: 20, riddle: 'יש לי ענפים, עלים ושורשים — מי אני?',               clues: ['🌱', '🍂', '🌳'], answer: 'עץ',     category: 'nature', wrongOptions: ['פרח', 'שיח', 'צמח'] },
  { id: 21, riddle: 'אני הר שפורץ ומוציא לבה — מי אני?',                 clues: ['🌋', '🔥', '💨'], answer: 'הר געש', category: 'nature', wrongOptions: ['הר שלג', 'מצוק', 'גבעה'] },
  { id: 22, riddle: 'אני מים שנפלים ממצוק גבוה — מי אני?',               clues: ['🌊', '🏔️', '💦'], answer: 'מפל',    category: 'nature', wrongOptions: ['נהר', 'אגם', 'מעיין'] },

  // Objects
  { id: 23, riddle: 'יש לי ידיים אבל לא אוחז, פנים אבל לא רואה — מי אני?', clues: ['⏰', '🔔', '🕐'], answer: 'שעון',    category: 'objects', wrongOptions: ['מראה', 'תמונה', 'לוח'] },
  { id: 24, riddle: 'אני עוזר לך לראות כשאין אור — מי אני?',              clues: ['🌑', '🔦', '🌟'], answer: 'פנס',     category: 'objects', wrongOptions: ['נר', 'מנורה', 'אש'] },
  { id: 25, riddle: 'אני קר, מרובע, ושומר על האוכל שלך — מי אני?',       clues: ['🧊', '🥶', '🥩'], answer: 'מקרר',    category: 'objects', wrongOptions: ['תנור', 'ארון', 'מיקרוגל'] },
  { id: 26, riddle: 'אני מריץ סרטים וצוחק ובוכה — מי אני?',              clues: ['🎬', '🍿', '🌟'], answer: 'טלוויזיה', category: 'objects', wrongOptions: ['מחשב', 'טלפון', 'מצלמה'] },
  { id: 27, riddle: 'אני עשוי עור ועוזר לסחוב ספרים — מי אני?',          clues: ['📚', '🎒', '✏️'], answer: 'תיק',     category: 'objects', wrongOptions: ['ארנק', 'מזוודה', 'קופסה'] },
  { id: 28, riddle: 'אני כותב ואפשר למחוק אותי — מי אני?',               clues: ['✏️', '🗑️', '📝'], answer: 'עיפרון',  category: 'objects', wrongOptions: ['עט', 'מרקר', 'גיר'] },
  { id: 29, riddle: 'אני עגול ומתגלגל, אפשר לשחק איתי — מי אני?',       clues: ['⚽', '🏃', '🏟️'], answer: 'כדור',    category: 'objects', wrongOptions: ['חישוק', 'פריזבי', 'עפיפון'] },
  { id: 30, riddle: 'אני נמצא בבית ספר, שחור ולבן, ומורה כותב עליי — מי אני?', clues: ['🏫', '📖', '✏️'], answer: 'לוח',  category: 'objects', wrongOptions: ['נייר', 'מחברת', 'ספר'] },
];
