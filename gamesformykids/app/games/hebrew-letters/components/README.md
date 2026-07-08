# Hebrew Letters Components

רכיבי משחק תרגול האותיות העבריות. הסטייט חי ב-**Zustand store** (`useHebrewLettersStore`), לא ב-React Context — אין Provider, אין props drilling; רכיבים קוראים ישירות מה-store דרך selectors.

## מבנה

הרכיבים מפוצלים לארבע תיקיות תחת `components/`:

```
components/
├── canvas/     # WritingCanvas ומסך הכתיבה
├── hub/        # דף הבית של המשחק — בחירת אות
├── practice/   # מסך תרגול אות בודדת (שלבים)
└── stats/      # מסכי סטטיסטיקה והתקדמות
```

### canvas/
- **WritingCanvas** - קנבס הכתיבה הראשי
- **LetterGuideOverlay** - שכבת הנחיה חזותית מעל האות
- **CanvasToolbar**, **CanvasColorPicker**, **CanvasStrokeWidthPicker** - בקרות ציור
- **CanvasDrawArea** - אזור הציור עצמו
- (פנימי, לא מיוצא מה-barrel: `WritingCanvasContext.tsx`, `useWritingCanvas.ts`, `useLetterGuideOverlay.ts`)

### hub/
- **HebrewLettersHub** - מסך הבית של המשחק (בחירת אות לתרגול)
- **HubHeader**, **HubInstructions**, **HubFunFacts** - חלקי הדף הראשי
- **LettersGrid** - גריד כל האותיות
- **HebrewLetterProgress** - אינדיקטור התקדמות לאות בודדת:
  ```tsx
  <HebrewLetterProgress letter={letterData} showName={true} size="lg" />
  ```

### practice/
- **HebrewLetterPractice** - מסך תרגול האות (מנהל את השלבים)
- **LetterIntroStep**, **LetterTracingStep**, **LetterWritingStep** - שלבי התרגול
- **LetterFunFacts**, **LetterEncouragement** - משוב וטריוויה
- (פנימי: `useLetterEncouragement.ts`)

### stats/
- **HebrewLettersStats** - סטטיסטיקות כלליות של התקדמות במשחק
- **StatsGrid**, **StatsProgressBar**, **StatsAchievement** - רכיבי תצוגה
- (קבצים נוספים בתיקייה שלא ב-barrel: `LetterSpecificStats.tsx`, `PracticeHistoryList.tsx`, `StatPanelCard.tsx`)

## State — Zustand store

`app/games/hebrew-letters/store/hebrewLettersStore.ts` מרכיב את ה-store מ-slices: `letterSlice`, `audioSlice`, `drawingSlice`, `practiceSlice`, `statsSlice`.

```tsx
import { useHebrewLettersStore } from '@/app/games/hebrew-letters/store/hebrewLettersStore';

function MyComponent() {
  const currentLetter = useHebrewLettersStore((s) => s.currentLetter);
  const practiceState = useHebrewLettersStore((s) => s.practiceState);
  // ...
}
```

יש גם `useHebrewLetterPractice` (ב-`app/games/hebrew-letters/hooks/useHebrewLetterPractice.ts`) — הוק ללוגיקת תרגול אות ספציפית שעוטף קריאות ל-store.

## שימוש

```tsx
import { HebrewLettersHub } from '@/app/games/hebrew-letters/components/hub';
import { HebrewLetterPractice } from '@/app/games/hebrew-letters/components/practice';
import { WritingCanvas } from '@/app/games/hebrew-letters/components/canvas';
import { HebrewLettersStats } from '@/app/games/hebrew-letters/components/stats';
```

## יתרונות

- ✅ **אין Props Drilling**: כל הנתונים זמינים דרך ה-store
- ✅ **ניהול מצב מרכזי**: כל הלוגיקה במקום אחד, מפוצלת ל-slices קריאים
- ✅ **בחירתיות (selectors)**: רכיבים נרנדרים מחדש רק כשהחלק הרלוונטי ב-state משתנה
- ✅ **שימוש חוזר**: הוקים ורכיבים ניתנים לשימוש חוזר
- ✅ **טיפוסים בטוחים**: תמיכה מלאה ב-TypeScript
