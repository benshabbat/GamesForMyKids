export type JokeCategory = 'animals' | 'school' | 'food';

export interface Joke {
  id: number;
  category: JokeCategory;
  setup: string;
  punchline: string;
  emoji: string;
}

export const JOKES: Joke[] = [
  // Animals — בעלי חיים
  { id: 1,  category: 'animals', emoji: '🐟', setup: 'למה הדג לא הלך לבית ספר?',            punchline: 'כי הוא כבר ים חכם! 😂' },
  { id: 2,  category: 'animals', emoji: '🐘', setup: 'למה לפיל לא יכול להסתתר?',            punchline: 'כי הוא תמיד בולט! 😄' },
  { id: 3,  category: 'animals', emoji: '🐸', setup: 'מה אומר הצפרדע לחברו?',               punchline: 'כבה לי, ידידי! 🐸' },
  { id: 4,  category: 'animals', emoji: '🐶', setup: 'איך הכלב אומר שלום?',                punchline: 'הב הב הב — שלום רב! 🐾' },
  { id: 5,  category: 'animals', emoji: '🐱', setup: 'למה החתול ישב על המחשב?',             punchline: 'כי הוא רצה לשמור על העכבר! 😹' },
  { id: 6,  category: 'animals', emoji: '🐧', setup: 'מה הפינגווין עשה בחוף הים?',          punchline: 'הוא הצטנן — כמו תמיד! ❄️' },
  { id: 7,  category: 'animals', emoji: '🐄', setup: 'למה הפרה עברה את הכביש?',             punchline: 'כי היה שם עשב ירוק יותר! 🌿' },
  { id: 8,  category: 'animals', emoji: '🦁', setup: 'מה אומר הארי כשנפגש עם חמישה אחרים?', punchline: 'מה ה-ה-הזדמנות! 🦁' },
  { id: 9,  category: 'animals', emoji: '🐰', setup: 'מה אוכלות ארנבות מרקיסות?',           punchline: 'גזר בשמפניה! 🥕' },
  { id: 10, category: 'animals', emoji: '🐍', setup: 'למה הנחש קיבל ציון גרוע?',            punchline: 'כי לא הצליח להחזיק עט! 😂' },
  { id: 11, category: 'animals', emoji: '🦊', setup: 'מה עושה שועל שמרגיש עצוב?',           punchline: 'בוכה כמו גור! 🦊' },
  { id: 12, category: 'animals', emoji: '🐻', setup: 'למה הדב לא שמע את השעון?',            punchline: 'כי הוא ישן כל החורף! 😴' },
  { id: 13, category: 'animals', emoji: '🦒', setup: 'למה הג׳ירף לא עבר בדלת?',             punchline: 'כי הוא גבוה על עצמו! 😄' },
  { id: 14, category: 'animals', emoji: '🐊', setup: 'מה אמר התנין לחברתו?',               punchline: 'את לא נתפסת! 🐊' },
  { id: 15, category: 'animals', emoji: '🦜', setup: 'למה התוכי לא שתק?',                  punchline: 'כי הוא אוהב לחזור על עצמו! 🦜' },
  { id: 16, category: 'animals', emoji: '🐙', setup: 'כמה ידיים לתמנון?',                  punchline: 'שמונה — ובכולן הוא מחבק! 🤗' },
  { id: 17, category: 'animals', emoji: '🦋', setup: 'מה אמרה הפרפרת לפרח?',               punchline: 'אני חייבת לעוף! יש לי פרפרים בבטן! 🌸' },
  { id: 18, category: 'animals', emoji: '🐿️', setup: 'למה הסנאי קפץ מעץ לעץ?',             punchline: 'כי האוטובוס לא עבר! 🚌' },

  // School — בית ספר
  { id: 19, category: 'school', emoji: '📚', setup: 'למה הספר ביקש הפסקה?',                punchline: 'כי היו בו יותר מדי פרקים! 😄' },
  { id: 20, category: 'school', emoji: '✏️', setup: 'מה אמר העיפרון לדף?',                 punchline: 'כבר ציירתי עליך! ✏️' },
  { id: 21, category: 'school', emoji: '🎒', setup: 'למה התיק לא הצליח לרוץ?',             punchline: 'כי היה עמוס בשיעורי בית! 🎒' },
  { id: 22, category: 'school', emoji: '📐', setup: 'למה המחשבון עצוב?',                   punchline: 'כי הוא סה"כ בעניין! 🔢' },
  { id: 23, category: 'school', emoji: '🍎', setup: 'מה עשה התלמיד עם תפוח המורה?',       punchline: 'אכל אותו ואמר: זה היה חינוכי! 😂' },
  { id: 24, category: 'school', emoji: '🖊️', setup: 'למה העט לא יכול לשמור סוד?',         punchline: 'כי הוא תמיד מוציא לאור! 📝' },
  { id: 25, category: 'school', emoji: '📏', setup: 'מה אמרה הסרגל לעיפרון?',             punchline: 'אתה מאוד ישר! 📏' },
  { id: 26, category: 'school', emoji: '🔬', setup: 'למה המיקרוסקופ פחד?',                punchline: 'כי ראה דברים גדולים יותר מדי! 😨' },
  { id: 27, category: 'school', emoji: '🎓', setup: 'מה ההבדל בין מורה לרכבת?',            punchline: 'המורה אומר: תוציאו גומי! הרכבת אומרת: תשמרו על הפסים! 🚂' },
  { id: 28, category: 'school', emoji: '📓', setup: 'למה המחברת בכתה?',                    punchline: 'כי היו בה הרבה שגיאות! 😢' },
  { id: 29, category: 'school', emoji: '🎨', setup: 'מה אמר הצבע האדום לצבע הכחול?',      punchline: 'אני צובע ממך! 🎨' },
  { id: 30, category: 'school', emoji: '📊', setup: 'למה הגרף עלה למעלה?',                punchline: 'כי הוא רצה להגיע לפסגה! 📈' },
  { id: 31, category: 'school', emoji: '🔭', setup: 'מה ראה הילד בטלסקופ?',               punchline: 'כוכבים — ועוד שיעורי בית! 😩' },
  { id: 32, category: 'school', emoji: '🖥️', setup: 'למה המחשב לבש מעיל?',               punchline: 'כי החלונות שלו פתוחים! 🌬️' },
  { id: 33, category: 'school', emoji: '📌', setup: 'מה אמר הסיכה ללוח?',                 punchline: 'דבקתי בך! 📌' },

  // Food — אוכל
  { id: 34, category: 'food', emoji: '🍕', setup: 'למה הפיצה לא הצטחקה?',                punchline: 'כי היא הייתה עגולה מאוד! 🍕' },
  { id: 35, category: 'food', emoji: '🍌', setup: 'מה אמרה הבננה לתפוח?',                punchline: 'הי, אתה מאוד אדום היום! 🍎' },
  { id: 36, category: 'food', emoji: '🥕', setup: 'למה הגזר עצוב?',                      punchline: 'כי כולם רוצים לנגוס בו! 😄' },
  { id: 37, category: 'food', emoji: '🥚', setup: 'מה אמרה הביצה למחבת?',                punchline: 'אתה מחמם את ליבי! 🍳' },
  { id: 38, category: 'food', emoji: '🍦', setup: 'למה הגלידה בכתה?',                    punchline: 'כי הילד לקח ממנה כדור! 🍦' },
  { id: 39, category: 'food', emoji: '🥪', setup: 'מה אמר הכריך לחלב?',                 punchline: 'אתה מלבין את שמי! 🥛' },
  { id: 40, category: 'food', emoji: '🍫', setup: 'למה השוקולד כל כך פופולרי?',           punchline: 'כי כולם נמסים ממנו! 😍' },
  { id: 41, category: 'food', emoji: '🍇', setup: 'מה אמר הענב לחברו?',                  punchline: 'אני כזה מרוסק היום! 🍷' },
  { id: 42, category: 'food', emoji: '🥜', setup: 'למה הבוטן התגלגל ברחוב?',             punchline: 'כי הוא ניסה לברוח מחמאת הבוטנים! 😂' },
  { id: 43, category: 'food', emoji: '🍰', setup: 'מה אמרה העוגה לנרות?',               punchline: 'תפסיקו להצית אותי! 🎂' },
  { id: 44, category: 'food', emoji: '🥦', setup: 'למה הברוקולי לא רצה להיאכל?',        punchline: 'כי הוא לא רצה להיות ירוק מכעס! 🥦' },
  { id: 45, category: 'food', emoji: '🍓', setup: 'מה אמרה התות לאוכל שלה?',            punchline: 'אתה מאוד מתוק איתי! 💕' },
  { id: 46, category: 'food', emoji: '🧀', setup: 'מה אמר הגבינה לחברתה?',              punchline: 'עברת צ׳דר? 🧀' },
  { id: 47, category: 'food', emoji: '🥞', setup: 'למה הפנקייק שמח?',                   punchline: 'כי מרחו עליו דבש! 🍯' },
  { id: 48, category: 'food', emoji: '🥑', setup: 'מה אמר האבוקדו לחברו?',              punchline: 'אנחנו גוואקים יחד! 🥑' },
  { id: 49, category: 'food', emoji: '🍩', setup: 'למה הסופגנייה הלכה לרופא?',           punchline: 'כי היה לה חור באמצע! 😂' },
  { id: 50, category: 'food', emoji: '🌽', setup: 'מה אמרה התירס לחברתה?',              punchline: 'אני כזה גרעין! 🌽' },

  // Extra mix — שונות
  { id: 51, category: 'animals', emoji: '🦓', setup: 'מה ההבדל בין זברה לפסנתר?',          punchline: 'הפסנתר יש לו שחור-לבן, הזברה — לבן-שחור! 🎹' },
  { id: 52, category: 'school',  emoji: '🔢', setup: 'למה הספרה 6 פחדה מ-7?',              punchline: 'כי שבע אכלה שמונה תשע! 😱' },
  { id: 53, category: 'food',    emoji: '🍜', setup: 'מה אמרה הספגטי לרוטב?',             punchline: 'אתה מתפלש עליי! 🍝' },
  { id: 54, category: 'animals', emoji: '🐌', setup: 'למה החילזון עצוב?',                  punchline: 'כי הוא תמיד מרגיש שהוא נושא הכול! 🐌' },
  { id: 55, category: 'school',  emoji: '🔋', setup: 'מה אמרה הסוללה לילד?',              punchline: 'תהיה מלא! ⚡' },
  { id: 56, category: 'animals', emoji: '🦈', setup: 'מה הכריש אוכל בצהריים?',             punchline: 'סיט! 😂' },
  { id: 57, category: 'food',    emoji: '🫐', setup: 'מה אמרה האוכמנית לחברתה?',          punchline: 'אנחנו ממש כחולות מהצחוק! 💙' },
  { id: 58, category: 'school',  emoji: '🌍', setup: 'למה כדור הארץ לא לומד היסטוריה?',    punchline: 'כי הוא יודע שהוא נסוב סביבה! 🌀' },
  { id: 59, category: 'animals', emoji: '🐝', setup: 'מה אמרה הדבורה לחבר שלה?',           punchline: 'עז, עז, זוּזּ! 🍯' },
  { id: 60, category: 'food',    emoji: '🥐', setup: 'מה אמר הקרואסון לכוס הקפה?',        punchline: 'אנחנו פריז-פקטיים יחד! ☕' },
  { id: 61, category: 'school',  emoji: '🎵', setup: 'למה הגיטרה קיבלה ציון מושלם?',       punchline: 'כי היא ניגנה בכל המיתרים! 🎸' },
  { id: 62, category: 'animals', emoji: '🦩', setup: 'למה הפלמינגו עומד על רגל אחת?',      punchline: 'כי אם ירים את השנייה הוא ייפול! 😂' },
  { id: 63, category: 'food',    emoji: '🍋', setup: 'מה אמר הלימון ששתו אותו?',           punchline: 'זה כבר לא חמוץ — זה מר! 😬' },
  { id: 64, category: 'school',  emoji: '🕐', setup: 'מה אמרה השעה שתיים לשעה שתיים עשרה?', punchline: 'כמה זמן עבר מאז שהתראינו! ⏰' },
  { id: 65, category: 'animals', emoji: '🐴', setup: 'מה אמר הסוס לחציר?',               punchline: 'תאכל אותי! אני כבר ה-יִ! 🌾' },
  { id: 66, category: 'food',    emoji: '🍪', setup: 'למה העוגייה הלכה לרופא?',            punchline: 'כי היא הרגישה עוגמה! 😅' },
  { id: 67, category: 'animals', emoji: '🦔', setup: 'מה אמר הקיפוד לרוח?',               punchline: 'תפסיק לנשוף — אני כבר מסוקסקס! 😤' },
  { id: 68, category: 'school',  emoji: '🌡️', setup: 'למה המד-חום עצוב?',                 punchline: 'כי כולם מרגישים גבוה ממנו! 🤒' },
  { id: 69, category: 'food',    emoji: '🧁', setup: 'מה אמרה הקאפקייק לנר?',             punchline: 'תכבה! אני כבר שרוף מהשמחה! 🎉' },
  { id: 70, category: 'animals', emoji: '🦚', setup: 'למה הטווס גאה מאוד?',               punchline: 'כי כולם מסתכלים בזנב שלו! 🌈' },
  { id: 71, category: 'school',  emoji: '📡', setup: 'למה האנטנה קיבלה ציון גבוה?',        punchline: 'כי היא קלטה הכול! 📶' },
  { id: 72, category: 'food',    emoji: '🥝', setup: 'מה אמר הקיווי לאנשים שפחדו ממנו?',   punchline: 'אל תשפטו ספר לפי הכריכה! 🍃' },
  { id: 73, category: 'animals', emoji: '🦭', setup: 'מה אכל האוטם לארוחת ערב?',           punchline: 'דגים — כמה הפתעה! 🐟' },
  { id: 74, category: 'school',  emoji: '🏫', setup: 'למה בית הספר פתח חלון?',             punchline: 'כי הכיתה הייתה מלאה תלמידים! 😆' },
  { id: 75, category: 'food',    emoji: '🧇', setup: 'מה אמרה הוופל לסירופ?',              punchline: 'תפסיק לטבוע בי! 🍁' },
  { id: 76, category: 'animals', emoji: '🐓', setup: 'למה התרנגול קם ב-5 בבוקר?',          punchline: 'כי לא היה לו שעון מעורר! ⏰' },
  { id: 77, category: 'school',  emoji: '✂️', setup: 'מה אמרה המספריים לדף?',              punchline: 'אני חותכת לך! ✂️' },
  { id: 78, category: 'food',    emoji: '🫕', setup: 'מה אמרה המרק לצלחת?',               punchline: 'אתה חם בשבילי! 🍲' },
  { id: 79, category: 'animals', emoji: '🦦', setup: 'מה עושה לוטרה שמשעממת לה?',          punchline: 'מרימה כפות ואומרת: מה חדש? 🐾' },
  { id: 80, category: 'school',  emoji: '🔦', setup: 'למה הפנס הביא מטריה לבית ספר?',      punchline: 'כי שמע שיהיה מבחן ב׳אור׳! ☔' },
];

export const JOKE_CATEGORY_LABELS: Record<JokeCategory, string> = {
  animals: '🐾 בעלי חיים',
  school:  '📚 בית ספר',
  food:    '🍕 אוכל',
};

export const JOKE_CATEGORY_COLORS: Record<JokeCategory, string> = {
  animals: 'from-green-400 to-emerald-500',
  school:  'from-blue-400 to-indigo-500',
  food:    'from-orange-400 to-amber-500',
};
