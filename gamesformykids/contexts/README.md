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

### 🎨 ניהול ציור
- מצב קנבס לציור
- ניהול צבעים ועובי קווים
- שמירת מצב ו-Undo

### 📚 ניהול תרגול
- התקדמות בשלבים
- מעקב השלמת שלבים
- מצבי תרגול שונים (מודרך, עקיבה, כתיבה חופשית)

### 🎉 מערכת עידוד
- הודעות עידוד דינמיות
- הודעות ספציפיות לשלבים
- חזותיות ואנימציות

### 📊 מעקב התקדמות
- מעקב אותיות שהושלמו
- אחוזי התקדמות
- סטטיסטיקות מפורטות

## 🚀 שימוש

### התקנה בסיסית

```tsx
import { HebrewLettersProvider } from '@/contexts/HebrewLettersContext';

function App() {
  return (
    <HebrewLettersProvider>
      {/* הקומפוננטות שלך כאן */}
    </HebrewLettersProvider>
  );
}
```

### שימוש בקומפוננטה

```tsx
import { useHebrewLetters } from '@/contexts/HebrewLettersContext';

function MyComponent() {
  const {
    currentLetter,
    setCurrentLetter,
    practiceState,
    nextStep,
    getStepMessage
  } = useHebrewLetters();

  // השתמש בפונקציות...
}
```

## 📋 API Reference

### מצב בסיסי
- `currentLetter` - האות הנוכחית לתרגול
- `setCurrentLetter(letter)` - הגדרת אות נוכחית
- `drawingState` - מצב הציור הנוכחי
- `practiceState` - מצב התרגול הנוכחי

### פעולות תרגול
- `nextStep()` - מעבר לשלב הבא
- `previousStep()` - חזרה לשלב הקודם
- `markStepCompleted(step)` - סימון שלב כהושלם
- `completeCurrentStep()` - השלמת השלב הנוכחי

### פונקציות עזר
- `getStepMessage(index)` - קבלת הודעה לשלב
- `getCurrentInstructions()` - קבלת הוראות נוכחיות
- `getOverallProgress()` - קבלת אחוז התקדמות כולל

### UI Helpers
- `getStepTabStyle(index)` - עיצוב לכרטיסיית שלב
- `getStepTabIcon(index)` - אייקון לכרטיסיית שלב

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
