# 🎣 מערכת Hooks DRY - מדריך שימוש מלא

## 🚀 סקירה כללית

המערכת החדשה מאפשרת יצירת משחקים חדשים ב-**5 שורות** במקום 150+ שורות!

## 📁 מבנה הקבצים החדשים

```
hooks/
├── shared/
│   ├── useGameAudio.ts          # ניהול אודיו ודיבור
│   ├── useGameAnalytics.ts      # אנליטיקס וביצועים
│   ├── useGameOptions.ts        # ניהול אפשרויות משחק
│   ├── useAdvancedGameState.ts  # ניהול מצב מתקדם
│   └── useBaseGame.ts           # Hook בסיסי לכל המשחקים
├── games/
│   └── useSimpleGame.ts         # Hook פשוט למשחקים רגילים
└── index.ts                     # ייצוא מרכזי
```

## 🎮 איך ליצור משחק חדש (דרך פשוטה)

### שלב 1: צור Hook למשחק (5 שורות!)

```typescript
// app/games/dogs/useDogGame.ts
import { useSimpleGame } from "@/hooks/games/useSimpleGame";
import { ALL_DOGS, DOG_HEBREW_PRONUNCIATIONS, DOG_GAME_CONSTANTS } from "@/lib/constants";

export function useDogGame() {
  return useSimpleGame({
    items: ALL_DOGS,
    pronunciations: DOG_HEBREW_PRONUNCIATIONS,
    gameConstants: DOG_GAME_CONSTANTS,
  });
}
```

### שלב 2: השתמש במשחק (זהה לקודם!)

```typescript
// app/games/dogs/page.tsx
import { useDogGame } from "./useDogGame";

export default function DogGame() {
  const {
    gameState,
    speakItemName,
    startGame,
    handleItemClick,
    resetGame,
  } = useDogGame(); // ⭐ זה השינוי היחיד!

  // כל השאר זהה כמו במשחקים קיימים...
}
```

## 🔧 איך ליצור משחק מתקדם

### עם אנליטיקס וביצועים:

```typescript
// app/games/advanced/useAdvancedGame.ts
import { useSimpleGame, useGameAnalytics, useGameAudio } from "@/hooks";
import { MY_ITEMS, MY_PRONUNCIATIONS, MY_CONSTANTS } from "@/lib/constants";

export function useAdvancedGame() {
  // משחק בסיסי
  const gameLogic = useSimpleGame({
    items: MY_ITEMS,
    pronunciations: MY_PRONUNCIATIONS,
    gameConstants: MY_CONSTANTS,
  });

  // אנליטיקס
  const analytics = useGameAnalytics(gameLogic.gameState);

  // אודיו נוסף
  const audio = useGameAudio();

  // פונקציה משולבת
  const handleItemClick = async (item: BaseGameItem) => {
    const isCorrect = item.name === gameLogic.gameState.currentChallenge?.name;
    
    analytics.recordAnswer(isCorrect);
    
    if (isCorrect) {
      audio.playSuccessSound();
    }
    
    await gameLogic.handleItemClick(item);
  };

  return {
    ...gameLogic,
    handleItemClick,
    analytics,
    audio,
  };
}
```

## 📊 איך להשתמש באנליטיקס

```typescript
const { analytics } = useAdvancedGame();

// בסוף המשחק
const stats = analytics.getStats();
console.log(`זמן משחק: ${stats.playTime}ms`);
console.log(`דיוק: ${stats.accuracy}%`);
console.log(`תשובות נכונות: ${stats.correctAnswers}/${stats.totalAnswers}`);
```

## 🔄 איך להמיר משחק קיים

### לפני (150+ שורות):
```typescript
// useOldGame.ts - קוד ארוך ומסובך
export function useOldGame(items: BaseGameItem[]) {
  const [gameState, setGameState] = useState({...});
  const [audioContext, setAudioContext] = useState(null);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  
  // 140+ שורות נוספות של קוד חוזר...
}
```

### אחרי (5 שורות):
```typescript
// useNewGame.ts - קצר ונקי
import { useSimpleGame } from "@/hooks/games/useSimpleGame";

export function useNewGame() {
  return useSimpleGame({
    items: MY_ITEMS,
    pronunciations: MY_PRONUNCIATIONS,
    gameConstants: MY_CONSTANTS,
  });
}
```

## 🎯 Hooks זמינים

### Hooks בסיסיים:
- `useGameAudio()` - ניהול אודיו ודיבור
- `useGameAnalytics(gameState)` - מעקב ביצועים
- `useGameOptions(config)` - ניהול אפשרויות משחק
- `useAdvancedGameState(config)` - ניהול מצב מתקדם
- `useBaseGame(config)` - Hook בסיסי מלא

### Hooks למשחקים:
- `useSimpleGame(config)` - למשחקים פשוטים
- `useVegetableGameDry()` - דוגמה למשחק ירקות
- `useFruitGameDry()` - דוגמה למשחק פירות
- `useAnimalGameDry()` - דוגמה למשחק חיות
- `useColorGameAdvanced()` - דוגמה למשחק מתקדם

## 📈 יתרונות המערכת החדשה

### ❌ לפני:
- 150+ שורות לכל משחק
- קוד חוזר ונשנה
- קשה לתחזוקה
- באגים חוזרים

### ✅ אחרי:
- 5 שורות למשחק חדש
- קוד DRY ונקי
- תחזוקה קלה
- באג נתקן = כל המשחקים מתוקנים

## 🔍 דוגמאות מעשיות

### משחק חדש מאפס:
```typescript
// 1. הוסף נתונים לקבועים
export const CAR_CONSTANTS = { /* ... */ };
export const ALL_CARS = [/* ... */];
export const CAR_HEBREW_PRONUNCIATIONS = {/* ... */};
export const CAR_GAME_CONSTANTS = createGameConfig(4, 1, 3);

// 2. צור Hook (5 שורות)
export function useCarGame() {
  return useSimpleGame({
    items: ALL_CARS,
    pronunciations: CAR_HEBREW_PRONUNCIATIONS,
    gameConstants: CAR_GAME_CONSTANTS,
  });
}

// 3. השתמש בדף (עותק-הדבק מדף קיים)
// פשוט החלף את ה-Hook!
```

### העתק משחק קיים:
```typescript
// במקום:
import { useOldFruitGame } from "./useOldFruitGame";

// השתמש:
import { useFruitGameDry } from "./useFruitGameDry";

// הכל עובד זהה!
```

## 🐛 פתרון בעיות נפוצות

### שגיאת TypeScript:
```typescript
// ❌ שגוי
const game = useSimpleGame({ items: myItems }); // חסרים פרמטרים

// ✅ נכון
const game = useSimpleGame({
  items: myItems,
  pronunciations: myPronunciations,
  gameConstants: myConstants,
});
```

### Hook לא עובד:
1. בדוק שהקבועים מוגדרים נכון
2. בדוק שה-import נכון
3. בדוק שהפונקציות מיובאות מ-`@/lib/utils/gameUtils`

## 🚀 התחלה מהירה

1. העתק אחד מהמשחקים הקיימים:
   - `useVegetableGameDry`
   - `useFruitGameDry`
   - `useAnimalGameDry`

2. החלף את הקבועים שלך

3. עבדת! 🎉

## 💡 עצות למתקדמים

### הרכבת Hooks:
```typescript
const useMyComplexGame = () => {
  const game = useSimpleGame({...});
  const analytics = useGameAnalytics(game.gameState);
  const audio = useGameAudio();
  
  return { game, analytics, audio };
};
```

### Hook מותאם אישית:
```typescript
const useMyCustomGame = () => {
  const baseGame = useBaseGame({...});
  
  // הוסף לוגיקה מותאמת
  const customFunction = () => { /* ... */ };
  
  return { ...baseGame, customFunction };
};
```

---

**זה הכל! 🎉 עכשיו אתה יכול ליצור משחקים חדשים תוך דקות במקום שעות!**
