export interface CraftStep {
  emoji: string;
  instruction: string;
}

export interface CraftProject {
  id: string;
  name: string;
  emoji: string;
  color: string;
  materials: string[];
  steps: CraftStep[];
}

export const CRAFT_PROJECTS: CraftProject[] = [
  {
    id: 'paper-boat',
    name: 'ספינת נייר',
    emoji: '⛵',
    color: 'from-blue-400 to-cyan-600',
    materials: ['דף נייר A4'],
    steps: [
      { emoji: '📄', instruction: 'הנח את הנייר לפניך לרוחב על שולחן ישר.' },
      { emoji: '📐', instruction: 'קפל את הנייר לחצי מלמעלה למטה — עכשיו יש לך מלבן.' },
      { emoji: '📐', instruction: 'קפל שוב לחצי כדי לסמן את קו האמצע, ואז פתח חזרה.' },
      { emoji: '📐', instruction: 'קפל את שתי הפינות העליונות לכיוון קו האמצע — תקבל צורת חץ.' },
      { emoji: '📐', instruction: 'קפל את שולי הנייר התחתונים כלפי מעלה משני הצדדים.' },
      { emoji: '⛵', instruction: 'פתח את הסירה בעדינות ועצב אותה — כל הכבוד! סירתך מוכנה!' },
    ],
  },
  {
    id: 'greeting-card',
    name: 'כרטיס ברכה',
    emoji: '💌',
    color: 'from-pink-400 to-rose-600',
    materials: ['נייר צבעוני', 'עפרונות צבעוניים', 'מדבקות'],
    steps: [
      { emoji: '📄', instruction: 'קח גיליון נייר צבעוני וקפל אותו לחצי — זו הכריכה של הכרטיס.' },
      { emoji: '🎨', instruction: 'ציור ציור יפה על הכריכה — פרח, לב, כוכב — מה שתרצה!' },
      { emoji: '✏️', instruction: 'פתח את הכרטיס וכתוב את שם המקבל בצד הימני בפנים.' },
      { emoji: '💌', instruction: 'כתוב מסר אישי — "אני אוהב אותך", "שתהיה בריא", או כל דבר מהלב.' },
      { emoji: '🌟', instruction: 'קשט עם מדבקות ועיצובים צבעוניים — הכרטיס שלך מוכן לשליחה!' },
    ],
  },
  {
    id: 'sock-puppet',
    name: 'בובת גרב',
    emoji: '🧦',
    color: 'from-orange-400 to-amber-600',
    materials: ['גרב ישנה', 'כפתורים', 'נייר אדום', 'דבק'],
    steps: [
      { emoji: '🧦', instruction: 'הכנס את ידך לתוך הגרב — אצבעות כלפי הקצה, האגודל למטה.' },
      { emoji: '👁️', instruction: 'הדבק שתי עיניים מלאכותיות או שני כפתורים לחלק העליון.' },
      { emoji: '👄', instruction: 'גזור פס אדום מנייר וצור פה — הדבק אותו מתחת לעיניים.' },
      { emoji: '👃', instruction: 'הוסף אף עגול מנייר או כפתור קטן מעל הפה.' },
      { emoji: '💇', instruction: 'צור שיער מחתיכות חוט צבעוניות — הדבק אותן בחלק העליון של הגרב.' },
      { emoji: '🎭', instruction: 'תן לבובה שם! עכשיו שחק בה וצור הצגה לכל המשפחה!' },
    ],
  },
  {
    id: 'window-art',
    name: 'קישוט חלון',
    emoji: '🌈',
    color: 'from-violet-400 to-purple-600',
    materials: ['נייר אורז שקוף', 'צבעי מים', 'ניר דבק שקוף', 'מספריים'],
    steps: [
      { emoji: '🎨', instruction: 'הכן נייר אורז שקוף לפניך על שטח נקי.' },
      { emoji: '🖌️', instruction: 'צבע צורות יפות בצבעי מים — כוכבים, לבבות, פרחים, קשת.' },
      { emoji: '☀️', instruction: 'המתן בסבלנות עד שהצבע יתייבש לגמרי.' },
      { emoji: '✂️', instruction: 'גזור את הצורות בזהירות עם מספריים.' },
      { emoji: '🌈', instruction: 'הצמד לחלון עם ניר דבק שקוף — אור השמש יגרום לצורות לזהור!' },
    ],
  },
  {
    id: 'bookmark',
    name: 'סרגל ספרים',
    emoji: '📚',
    color: 'from-emerald-400 to-green-600',
    materials: ['קרטון', 'עפרונות צבעוניים', 'מספריים'],
    steps: [
      { emoji: '✂️', instruction: 'גזור פס קרטון ברוחב 5 ס"מ ואורך 20 ס"מ.' },
      { emoji: '🎨', instruction: 'צבע את הרקע בצבע האהוב עליך.' },
      { emoji: '✏️', instruction: 'ציור ציור יפה — בעל חיים, נוף, פרח — מה שאתה אוהב!' },
      { emoji: '📝', instruction: 'כתוב את שמך או מסר: "אני אוהב לקרוא! 📖"' },
      { emoji: '📚', instruction: 'סרגל הספרים שלך מוכן! הכנס אותו לספר האהוב עליך.' },
    ],
  },
];
