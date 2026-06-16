export interface StoryChoice {
  label: string;
  emoji: string;
  nextId: string;
}

export interface StoryNode {
  id: string;
  emoji: string;
  text: string;
  choices?: StoryChoice[];
  isEnding?: true;
  endingEmoji?: string;
}

export interface Story {
  id: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  startId: string;
  nodes: StoryNode[];
}

export const STORIES: Story[] = [
  {
    id: 'cat',
    title: 'יוסי והחתול',
    description: 'מה יקרה כשיוסי מוצא חתול קטן בגינה?',
    emoji: '🐱',
    color: 'from-orange-400 to-yellow-500',
    startId: 'start',
    nodes: [
      {
        id: 'start',
        emoji: '😺',
        text: 'יוסי מצא חתול קטן בגינה. החתול מיאו בקול עצוב ורעד מקור. מה יעשה יוסי?',
        choices: [
          { label: 'תן לו אוכל', emoji: '🍖', nextId: 'fed' },
          { label: 'קרא לאמא', emoji: '📢', nextId: 'called_mom' },
          { label: 'בנה לו בית מקרטון', emoji: '📦', nextId: 'house' },
        ],
      },
      {
        id: 'fed',
        emoji: '😋',
        text: 'יוסי הביא אוכל לחתול. החתול אכל בשמחה ומירד את זנבו. יוסי שמח מאוד. האם יתן לו שם?',
        choices: [
          { label: 'כן! שם יפה', emoji: '🏷️', nextId: 'named' },
          { label: 'לא, לשחרר אותו', emoji: '🐾', nextId: 'freed' },
        ],
      },
      {
        id: 'named',
        emoji: '⭐',
        text: 'יוסי קרא לחתול "כוכב". הם נהיו חברים הכי טובים בעולם. כוכב גר אצל יוסי הרבה שנים ואהב לישון על הספה!',
        isEnding: true,
        endingEmoji: '🐱⭐',
      },
      {
        id: 'freed',
        emoji: '🐱🐱',
        text: 'יוסי שחרר את החתול. למחרת בבוקר, החתול חזר עם חבר! היו שני חתולים שמחים בגינה. יוסי צחק מרוב שמחה!',
        isEnding: true,
        endingEmoji: '🐱🐱',
      },
      {
        id: 'called_mom',
        emoji: '👩',
        text: 'אמא של יוסי באה וראתה את החתול הקטן. היא אמרה: "הוא צריך בית חם". מה לעשות?',
        choices: [
          { label: 'לשמור אותו אצלנו', emoji: '🏠', nextId: 'keep' },
          { label: 'למצוא לו משפחה', emoji: '❤️', nextId: 'adopt' },
        ],
      },
      {
        id: 'keep',
        emoji: '🏠',
        text: 'החתול נשאר בבית יוסי! הוא גדל והיה חתול גדול ושמן. כל הילדים מהשכונה אהבו לבוא לשחק איתו!',
        isEnding: true,
        endingEmoji: '🐈🏠',
      },
      {
        id: 'adopt',
        emoji: '❤️',
        text: 'מצאו לחתול משפחה נהדרת. יוסי ביקר אותו כל שבוע. הם נשארו חברים לנצח וחתול תמיד ריץ אליו!',
        isEnding: true,
        endingEmoji: '❤️🐱',
      },
      {
        id: 'house',
        emoji: '📦',
        text: 'יוסי בנה בית מקרטון עם שמיכה רכה. החתול נכנס ונרדם מיד. כשאבא חזר הביתה, הוא אמר: "איזה אדריכל גדול!"',
        isEnding: true,
        endingEmoji: '🏡🐱',
      },
    ],
  },
  {
    id: 'forest',
    title: 'הטיול ביער',
    description: 'עדי מוצאת ילד אבוד ביער — מה היא תעשה?',
    emoji: '🌲',
    color: 'from-green-400 to-teal-500',
    startId: 'start',
    nodes: [
      {
        id: 'start',
        emoji: '🌳',
        text: 'עדי ואמה הלכו לטיול ביער. פתאום עדי ראתה ילד קטן בוכה לבד בין העצים. מה לעשות?',
        choices: [
          { label: 'גשי אליו בעצמך', emoji: '🤝', nextId: 'approach' },
          { label: 'קראי לאמא לעזור', emoji: '👩', nextId: 'tell_mom' },
          { label: 'הצחיקי אותו', emoji: '😄', nextId: 'cheer' },
        ],
      },
      {
        id: 'approach',
        emoji: '🤗',
        text: 'עדי גשה לילד. שמו היה אלי. הוא אמר שאיבד את ההורים שלו. איך לעזור?',
        choices: [
          { label: 'חפשו ביחד בקול רם', emoji: '📣', nextId: 'search' },
          { label: 'תני לו אוכל ממה שיש', emoji: '🍎', nextId: 'give_food' },
        ],
      },
      {
        id: 'search',
        emoji: '🌟',
        text: 'עדי ואלי קראו בקול: "אמא! אבא!" אחרי עשר דקות — קול ענה! ההורים של אלי ריצו אליו ובכו מרוב שמחה. עדי קיבלה מדליית גיבורה!',
        isEnding: true,
        endingEmoji: '🦸🌟',
      },
      {
        id: 'give_food',
        emoji: '🍎',
        text: 'אלי אכל את התפוח ושמח. אז הם ניסו לקרוא בקול יחד. מצאו את המשפחה! אמא של אלי אמרה: "תודה לך, גיבורה קטנה!"',
        isEnding: true,
        endingEmoji: '🍎🤝',
      },
      {
        id: 'tell_mom',
        emoji: '👩‍👧',
        text: 'אמא של עדי הלכה לאלי, הרגיעה אותו והחזיקה בידו. ביחד, כולם הלכו לחפש את ההורים שלו ומצאו אותם ליד המעיין!',
        choices: [
          { label: 'מה אלי אמר?', emoji: '💬', nextId: 'grateful' },
          { label: 'חגגו יחד', emoji: '🎉', nextId: 'celebrate' },
        ],
      },
      {
        id: 'grateful',
        emoji: '💙',
        text: 'אלי אמר: "לא אשכח אתכם לעולם!" הם החליפו מספרי טלפון ונהיו חברים. כל חופשה הם נפגשים ביער!',
        isEnding: true,
        endingEmoji: '💙🌲',
      },
      {
        id: 'celebrate',
        emoji: '🎊',
        text: 'הם ישבו יחד ואכלו כריכים ושתו מיץ. ואז כולם שרו שיר יחד. זה היה הטיול הכי כיף שעדי אי פעם הייתה בו!',
        isEnding: true,
        endingEmoji: '🎊🌲',
      },
      {
        id: 'cheer',
        emoji: '😂',
        text: 'עדי עשתה פרצופים מצחיקים ואלי פסק לבכות והתחיל לצחוק. "מי אתה?" שאלה. אחרי שמיצאו את ההורים, הוא אמר: "אתה כי מצחיקה לכל חיים!"',
        isEnding: true,
        endingEmoji: '😄🤝',
      },
    ],
  },
  {
    id: 'space',
    title: 'טיסה לחלל',
    description: 'רון ומיה בחללית — הרפתקה בין הכוכבים!',
    emoji: '🚀',
    color: 'from-indigo-500 to-purple-600',
    startId: 'start',
    nodes: [
      {
        id: 'start',
        emoji: '🚀',
        text: 'רון ומיה היו בחללית מעל כדור הארץ. פתאום — בום! סלע חלל פגע בהם. מה לעשות?',
        choices: [
          { label: 'לחץ על הכפתור האדום', emoji: '🔴', nextId: 'red_button' },
          { label: 'קרא למרכז הבקרה', emoji: '📡', nextId: 'control_center' },
          { label: 'צא לתיקון בחלל', emoji: '🧑‍🚀', nextId: 'spacewalk' },
        ],
      },
      {
        id: 'red_button',
        emoji: '🛡️',
        text: 'הכפתור האדום הפעיל מגן אנרגיה! החללית הייתה בטוחה. אבל הם איבדו את הכיוון. לאן ללכת?',
        choices: [
          { label: 'לכוכב הירוק הקרוב', emoji: '🟢', nextId: 'green_star' },
          { label: 'לחזור לכדור הארץ', emoji: '🌍', nextId: 'home' },
        ],
      },
      {
        id: 'green_star',
        emoji: '👽',
        text: 'הם נחתו על כוכב ירוק. מצאו שם חייזרים קטנים וחמודים שאמרו: "שלום!" בעברית! החייזרים עזרו להם לחזור הביתה ונשארו חברים!',
        isEnding: true,
        endingEmoji: '👽🌍',
      },
      {
        id: 'home',
        emoji: '🌍',
        text: 'רון ומיה ניווטו לפי הכוכבים וחזרו לכדור הארץ בשלום! כשנחתו, כולם מחאו כפיים. הם הפכו לאסטרונאוטים הצעירים ביותר בעולם!',
        isEnding: true,
        endingEmoji: '🌍🏆',
      },
      {
        id: 'control_center',
        emoji: '📡',
        text: 'מרכז הבקרה ענה: "אל תדאגו! שלחנו חללית הצלה!" אחרי כמה דקות ראו אורות כחולים. הגיעה העזרה!',
        choices: [
          { label: 'תספרו לכולם', emoji: '📺', nextId: 'tell_all' },
          { label: 'שמרו את הסוד', emoji: '🤫', nextId: 'secret' },
        ],
      },
      {
        id: 'tell_all',
        emoji: '📺',
        text: 'רון ומיה הפכו לגיבורים. הם הופיעו בחדשות ובספרים. ילדים מכל העולם שאלו: "איך זה להיות בחלל?" והם סיפרו הכל!',
        isEnding: true,
        endingEmoji: '📺🌟',
      },
      {
        id: 'secret',
        emoji: '🌟',
        text: 'הם החליטו לשמור את הסוד. רק הם שניים ידעו. ובלילה, כשהביטו בכוכבים, חייכו בסוד ואמרו: "אנחנו יודעים..."',
        isEnding: true,
        endingEmoji: '🌟🤫',
      },
      {
        id: 'spacewalk',
        emoji: '🧑‍🚀',
        text: 'רון לבש חליפת חלל יצא לתקן. זה היה קר ושקט שם בחוץ. הוא ראת את כדור הארץ כולו — כחול ויפה! הוא תיקן הכל ושב. "הצלחתי!" הוא צעק!',
        isEnding: true,
        endingEmoji: '🧑‍🚀🔧',
      },
    ],
  },
];
