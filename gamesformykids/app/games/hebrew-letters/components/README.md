# Hebrew Letters Context

קונטקסט ייעודי עבור משחק תרגול האותיות העבריות שמצמצם props drilling ומספק ניהול מצב מרכזי.

## מה כלול

### HebrewLettersContext
קונטקסט ראשי שמכיל:
- **מצב ציור (Drawing State)**: ניהול כלי הציור במסך הכתיבה
- **מצב תרגול (Practice State)**: מעקב אחר השלבים והתקדמות
- **התקדמות אותיות**: מעקב אחר אותיות שהושלמו
- **הגדרות**: צבעים, עובי קווים, שלבי תרגול

### useHebrewLetters Hook
הוק ראשי לגישה לקונטקסט:
```tsx
const {
  currentLetter,
  setCurrentLetter,
  drawingState,
  updateDrawingState,
  practiceState,
  updatePracticeState,
  // ... עוד פונקציות
} = useHebrewLetters();
```

### useHebrewLetterPractice Hook
הוק מותאם אישית לטיפול בלוגיקת תרגול אות ספציפית:
```tsx
const {
  currentStepInfo,
  initializeLetter,
  completeCurrentStep,
  getCurrentInstructions,
  // ... עוד פונקציות
} = useHebrewLetterPractice(letterData);
```

## רכיבים

### HebrewLetterProgress
רכיב להצגת התקדמות אות עם אינדיקטור חזותי:
```tsx
<HebrewLetterProgress 
  letter={letterData} 
  showName={true} 
  size="lg" 
/>
```

### HebrewLettersStats
רכיב להצגת סטטיסטיקות כלליות של התקדמות במשחק.

### WritingCanvas
קנבס לכתיבה שמשתמש בקונטקסט לניהול מצב הציור.

## שימוש

1. **עטיפה בפרובדיר**: עטפו את הרכיבים ב-`HebrewLettersProvider`
2. **השתמשו בהוקים**: `useHebrewLetters` ו-`useHebrewLetterPractice`
3. **אין צורך להעביר props**: הרכיבים מקבלים את המידע מהקונטקסט

## יתרונות

- ✅ **אין Props Drilling**: כל הנתונים זמינים דרך הקונטקסט
- ✅ **ניהול מצב מרכזי**: כל הלוגיקה במקום אחד
- ✅ **קוד נקי יותר**: רכיבים פשוטים יותר
- ✅ **שימוש חוזר**: הוקים ורכיבים ניתנים לשימוש חוזר
- ✅ **טיפוסים בטוחים**: תמיכה מלאה ב-TypeScript
