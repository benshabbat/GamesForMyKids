# Hebrew Letters Context

## 📖 תיאור

קונטקסט מקיף לניהול פונקציונליות תרגול כתיבת אותיות עבריות. הקונטקסט מנהל מצב עבור ציור, התקדמות תרגול, מערכת עידוד ומעקב התקדמות.

## 🏗️ מבנה

הקונטקסט מחולק למספר קבצים לשיפור תחזוקה:

### קבצים עיקריים

- **`HebrewLettersContext.tsx`** - הקונטקסט הראשי והקומפוננטת Provider
- **`hebrewLettersConstants.ts`** - קבועים ומצבי ברירת מחדל
- **`hebrewLettersUtils.ts`** - פונקציות עזר לתרמור קוד נקי

## 🎯 תכונות עיקריות

### 🎨 ניהול ציור מתקדם
- מצב קנבס לציור עם תמיכה במגע ועכבר
- ניהול צבעים ועובי קווים דינמי
- שמירת מצב ו-Undo מתקדם
- פונקציות עזר לחישוב מיקום ואיפוס

### 📚 ניהול תרגול חכם
- התקדמות בשלבים עם מעקב מלא
- מעקב השלמת שלבים ואותיות
- מצבי תרגול שונים (מודרך, עקיבה, כתיבה חופשית)
- לוגיקה חכמה למעבר בין שלבים

### 🎉 מערכת עידוד ואודיו
- הודעות עידוד דינמיות עם קול
- הודעות ספציפיות לשלבים
- תמיכה בדיבור עברי (Text-to-Speech)
- בקרת עוצמה ומהירות דיבור

### 📊 אנליטיקה וסטטיסטיקות
- מעקב זמן תרגול מפורט
- היסטוריית פעילות מלאה
- סטטיסטיקות לכל אות בנפרד
- ייצוא נתונים ואיפוס

## 🚀 שימוש

### התקנה בסיסית

```tsx
import { HebrewLettersProvider } from '@/app/games/hebrew-letters/contexts/HebrewLettersContext';

function App() {
  return (
    <HebrewLettersProvider>
      {/* הקומפוננטות שלך כאן */}
    </HebrewLettersProvider>
  );
}
```

### שימוש בקומפוננטה מתקדמת

```tsx
import { useHebrewLetters } from '@/app/games/hebrew-letters/contexts/HebrewLettersContext';
import HebrewLettersStatsPanel from '@/app/games/hebrew-letters/components/HebrewLettersStatsPanel';

function AdvancedComponent() {
  const {
    currentLetter,
    drawingState,
    initializeCanvas,
    startDrawing,
    playLetterSound,
    learningStats,
    exportLearningData
  } = useHebrewLetters();

  // השתמש בפונקציות המתקדמות...
  
  return (
    <div>
      <HebrewLettersStatsPanel letterName={currentLetter?.name} />
      {/* שאר הקומפוננטות... */}
    </div>
  );
}
```

## 📋 API Reference

### מצב בסיסי
- `currentLetter` - האות הנוכחית לתרגול
- `setCurrentLetter(letter)` - הגדרת אות נוכחית
- `drawingState` - מצב הציור הנוכחי
- `practiceState` - מצב התרגול הנוכחי
- `learningStats` - סטטיסטיקות למידה

### פעולות קנבס מתקדמות
- `initializeCanvas(width, height, bg)` - אתחול קנבס
- `startDrawing(x, y)` - התחלת ציור
- `continueDrawing(x, y)` - המשך ציור
- `stopDrawing()` - עצירת ציור
- `getCanvasPosition(event, canvas)` - חישוב מיקום
- `resetCanvas()` - איפוס מלא

### פעולות אודיו
- `playLetterSound(letter)` - השמעת שם האות
- `playEncouragementSound()` - השמעת עידוד
- `playStepCompletionSound()` - השמעת השלמת שלב
- `toggleAudio()` - הפעלה/כיבוי אודיו

### אנליטיקה
- `startPracticeSession(letter)` - התחלת סשן תרגול
- `endPracticeSession()` - סיום סשן תרגול
- `logPracticeActivity(letter, step, time)` - רישום פעילות
- `getTotalPracticeTime()` - קבלת זמן כולל
- `getLetterStats(letter)` - סטטיסטיקות לאות
- `exportLearningData()` - ייצוא נתונים
- `resetAllStats()` - איפוס כל הסטטיסטיקות

## 🎨 קבועים זמינים

### צבעים
- `STROKE_COLORS` - מערך צבעי הקווים הזמינים
- `STROKE_WIDTHS` - מערך עוביי הקווים הזמינים

### הודעות
- `ENCOURAGEMENT_MESSAGES` - הודעות עידוד
- `STEP_MESSAGES` - הודעות ספציפיות לשלבים
- `PRACTICE_STEPS` - שמות השלבים

## 🔧 התאמה אישית

### הוספת צבעים חדשים
ערוך את `STROKE_COLORS` בקובץ `hebrewLettersConstants.ts`:

```ts
export const STROKE_COLORS = [
  '#2E7D32', // ירוק
  '#1976D2', // כחול
  '#YOUR_NEW_COLOR', // הצבע החדש שלך
  // ...
] as const;
```

### הוספת הודעות עידוד
ערוך את `ENCOURAGEMENT_MESSAGES`:

```ts
export const ENCOURAGEMENT_MESSAGES = [
  "כל הכבוד! 🌟",
  "ההודעה החדשה שלך! 🎉",
  // ...
] as const;
```

## 🧪 בדיקות

הקונטקסט מספק הגנות מפני שימוש לא נכון:
- זריקת שגיאה כאשר משתמשים מחוץ ל-Provider
- בדיקות טיפוס חזקות עם TypeScript
- ולידציה של מצבי התרגול

## 📝 הערות פיתוח

- הקונטקסט משתמש ב-`useCallback` לאופטימיזציה
- המצב מנוהל באמצעות hooks מובנים של React
- הקוד מחולק לפונקציות עזר לקריאות טובה יותר

## 🤝 תרומה

בעת הוספת תכונות חדשות:
1. הוסף טיפוסים מתאימים
2. עדכן את ה-API Reference
3. הוסף הערות תיעוד מתאימות
4. בדוק שכל השגיאות נטפלות

---

**גרסה:** 2.0 - נוקה ומאורגן מחדש  
**עודכן:** אוגוסט 2025
