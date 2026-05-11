# 🎮 מדריך ליצירת משחק חדש

מדריך מפורט ליצירת משחקים חדשים בפלטפורמת המשחקים החינוכיים לילדים.

## 📋 תוכן העניינים

1. [סקירה כללית](#סקירה-כללית)
2. [שלבי הפיתוח](#שלבי-הפיתוח)
3. [מבנה קבצים](#מבנה-קבצים)
4. [דוגמאות קוד](#דוגמאות-קוד)
5. [בדיקות והרצה](#בדיקות-והרצה)

## 🎯 סקירה כללית

כל המשחקים מוגשים ממסלול יחיד: `app/games/[gameType]/page.tsx`

הפלטפורמה תומכת בשלושה סוגי משחקים:

### 1. משחקי כרטיסים (Card Games)
- משחקי זיהוי פריטים (צבעים, חיות, פירות וכו')
- מרונדרים דרך `UltimateGamePage` + `GameTypeProvider` + `GameLogicSync`
- נוצרים ע"י הוספה ל-`SUPPORTED_GAMES` ב-`gamePageConstants.ts`
- דוגמאות: `colors`, `animals`, `math`, `weather`

### 2. משחקי חידון (Quiz Games)
- שאלות ותשובות, מילים, גאוגרפיה, מדע וכו'
- מרונדרים דרך `UltimateGamePage` → `QuizGameRouter`
- משתמשים ב-`createCategoryIndexQuizHook` או ב-`useGenericQuizGame`
- דוגמאות: `geography`, `science`, `spelling`, `clock`

### 3. משחקים מותאמים אישית (Custom Games)
- משחקים עם לוגיקה ייחודית (ארקייד, לוח, ציור וכו')
- מרונדרים דרך `CustomGameRenderer` → רכיב ייעודי
- הסטייט מנוהל ב-Zustand store (לא React Context)
- דוגמאות: `memory`, `chess`, `tetris`, `drawing`, `hebrew-letters`

## 🚀 שלבי הפיתוח — משחק כרטיסים

### שלב 1: הגדרת נתוני המשחק

#### 1.1 הוספת נתונים ל-`gameData`

צור או עדכן קובץ בתיקייה `lib/constants/gameData/`:

```typescript
// lib/constants/gameData/myCategory.ts
import { BaseGameItem } from "@/lib/types/base";

export const MY_GAME_CONSTANTS: Record<string, BaseGameItem> = {
  ITEM1: {
    name: "item1",
    hebrew: "פריט ראשון", 
    english: "First Item",
    emoji: "🎈",
    color: "bg-gradient-to-br from-blue-400 to-blue-600",
    sound: [440, 550, 660]
  },
  ITEM2: {
    name: "item2",
    hebrew: "פריט שני",
    english: "Second Item", 
    emoji: "🎁",
    color: "bg-gradient-to-br from-green-400 to-green-600",
    sound: [523, 659, 784]
  },
  // ... המשך פריטים
};

// רשימת פריטים למשחק
export const MY_GAME_ITEMS = Object.values(MY_GAME_CONSTANTS);

// מילון הגייה (אופציונלי)
export const MY_GAME_PRONUNCIATIONS: Record<string, string> = {
  "item1": "איטֶם רִאשוֹן",
  "item2": "איטֶם שֵנִי",
};

// הגדרות משחק
export const MY_GAME_CONFIG = {
  BASE_COUNT: 4,      // מספר פריטים בהתחלה
  INCREMENT: 2,       // כמה פריטים להוסיף בכל שלב
  LEVEL_THRESHOLD: 3  // כמה תשובות נכונות לעלייה בשלב
};
```

#### 1.2 הוספה למיפוי `gameItemsMap`

עדכן את הקובץ `lib/constants/gameItemsMap.ts`:

```typescript
// בתוך GAME_ITEMS_MAP
export const GAME_ITEMS_MAP = {
  // ... משחקים קיימים
  'my-game': {
    items: MY_GAME_ITEMS,
    pronunciations: MY_GAME_PRONUNCIATIONS,
    config: MY_GAME_CONFIG
  },
} as const;
```

### שלב 2: הוספה לרישום המשחקים

עדכן את `lib/registry/gamesRegistry.ts`:

```typescript
// בתחילת הקובץ
import { YourIcon } from "lucide-react"; // בחר אייקון מתאים

// בתוך GAMES_REGISTRY
{
  id: "my-game",
  title: "המשחק שלי",
  description: "תיאור קצר של המשחק",
  icon: YourIcon,
  color: "bg-blue-400 hover:bg-blue-500",
  href: "/games/my-game",
  available: true,
  order: 15, // מספר סדר התצוגה
}
```

### שלב 3: הוספת הגדרות UI

עדכן את `lib/constants/ui/gameConfigs.ts`:

```typescript
export const GAME_UI_CONFIGS: Record<GameType, GameUIConfig> = {
  // ... הגדרות קיימות
  'my-game': {
    title: 'המשחק שלי',
    subTitle: 'למד על...',
    description: 'תיאור מפורט של המשחק',
    instructions: 'הוראות המשחק כאן',
    tips: 'טיפים למשחק',
    gradients: {
      background: 'from-blue-100 via-purple-100 to-indigo-200',
      card: 'from-blue-400 to-blue-600'
    },
    sounds: {
      success: [523, 659, 784],
      error: [220, 165, 110] 
    }
  }
};
```

### שלב 4: עדכון טיפוסים

הוסף את סוג המשחק החדש ל-`lib/types/core/base.ts`:

```typescript
export type GameType =
  | 'memory'
  | 'colors' 
  | 'letters'
  // ... סוגי משחקים קיימים
  | 'my-game';     // הוסף את המשחק החדש
```

### שלב 5: הוספה לרשימת המשחקים הנתמכים

עדכן את `app/games/[gameType]/gamePageConstants.ts`:

```typescript
export const SUPPORTED_GAMES = [
  // ...
  'my-game',  // הוסף כאן (בקטגוריה המתאימה)
] as const;
```

### שלב 6: הוספה לגריד הקטגוריות

עדכן את `components/marketing/CategorizedGamesGrid.tsx` כדי שהמשחק יופיע בדף הבית תחת הקטגוריה הנכונה.

## � יצירת משחק מותאם אישית (Custom Game)

משחקים מותאמים משתמשים ב-Zustand store (לא React Context).  
הסטייט חי בחנות גלובלית — אין props drilling ואין Provider.

### שלב 1: יצירת Zustand store

השתמש ב-`makeStore` / `makePersistStore` מ-`@/lib/stores/storeFactory`:

```typescript
// app/games/my-game/myGameStore.ts
'use client';

import { makeStore } from '@/lib/stores/storeFactory';

interface MyGameState {
  score: number;
  level: number;
  phase: 'idle' | 'playing' | 'finished';
}

interface MyGameActions {
  incrementScore: (by: number) => void;
  nextLevel: () => void;
  reset: () => void;
}

export const useMyGameStore = makeStore<MyGameState & MyGameActions>(
  'MyGameStore',
  (set) => ({
    score: 0,
    level: 1,
    phase: 'idle',

    incrementScore: (by) => set((s) => ({ score: s.score + by })),
    nextLevel: () => set((s) => ({ level: s.level + 1 })),
    reset: () => set({ score: 0, level: 1, phase: 'idle' }),
  })
);
```

### שלב 2: יצירת hook ייעודי

```typescript
// app/games/my-game/useMyGame.ts
'use client';

import { useCallback } from 'react';
import { useMyGameStore } from './myGameStore';

export function useMyGame() {
  const score   = useMyGameStore((s) => s.score);
  const level   = useMyGameStore((s) => s.level);
  const phase   = useMyGameStore((s) => s.phase);
  const { incrementScore, nextLevel, reset } = useMyGameStore();

  const handleCorrect = useCallback(() => {
    incrementScore(10);
  }, [incrementScore]);

  return { score, level, phase, handleCorrect, reset };
}
```

### שלב 3: יצירת רכיבי המשחק

```
app/games/my-game/
├── MyGameClient.tsx          # רכיב לקוח ראשי ('use client')
├── myGameStore.ts            # Zustand store
├── useMyGame.ts              # Hook ייעודי
└── components/
    ├── MyGameMenuScreen.tsx  # מסך תפריט (אם יש)
    └── MyGamePlayArea.tsx    # אזור משחק
```

#### MyGameClient.tsx

```typescript
'use client';

import { useMyGame } from './useMyGame';
import MyGamePlayArea from './components/MyGamePlayArea';

export default function MyGameClient() {
  const { score, level, phase, handleCorrect, reset } = useMyGame();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-4">
      <MyGamePlayArea
        score={score}
        level={level}
        onCorrect={handleCorrect}
        onReset={reset}
      />
    </div>
  );
}
```

### שלב 4: רישום ב-CustomGameRenderer

עדכן את `app/games/[gameType]/CustomGameRenderer.tsx`:

```typescript
const GAME_CLIENTS: Partial<Record<SupportedGameType, ComponentType>> = {
  // ... משחקים קיימים
  'my-game': dynamic(() => import('../my-game/MyGameClient')),
};
```

### שלב 5: הוספה ל-CUSTOM_GAME_TYPES

ב-`app/games/[gameType]/gamePageConstants.ts`, הוסף את `'my-game'` גם ל-`SUPPORTED_GAMES` וגם ל-`CUSTOM_GAME_TYPES`.

## 🧩 רכיבים נפוצים

### רכיב כרטיס פריט

```typescript
interface ItemCardProps {
  item: BaseGameItem;
  onClick: () => void;
  disabled?: boolean;
}

function ItemCard({ item, onClick, disabled }: ItemCardProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-24 h-24 rounded-xl shadow-lg transform transition-all duration-200
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}
        ${item.color || 'bg-gradient-to-br from-blue-400 to-blue-600'}
      `}
    >
      <span className="text-4xl">{item.emoji}</span>
      <div className="text-white text-sm font-bold mt-1">
        {item.hebrew}
      </div>
    </button>
  );
}
```

### רכיב כותרת משחק

```typescript
import { GameHeader } from "@/components/shared";

function MyGameHeader() {
  return (
    <GameHeader
      title="המשחק שלי"
      subtitle="למד ותתרגל"
      onHome={() => window.location.href = '/'}
    />
  );
}
```

## 🔊 הוספת צלילים

```typescript
import { useGameAudio } from "@/hooks/shared/ui/useGameAudio";

function MyGameComponent() {
  const { playSound, speak } = useGameAudio();

  const handleSuccess = () => {
    playSound([523, 659, 784]); // צליל הצלחה
    speak("כל הכבוד!");
  };

  const handleError = () => {
    playSound([220, 165, 110]); // צליל שגיאה
    speak("נסה שוב");
  };

  // ...
}
```

## 📊 מעקב התקדמות

```typescript
import { useSessionStats } from "@/hooks/shared/progress/useSessionStats";

function MyGameComponent() {
  const {
    currentSession,
    startSession,
    recordAnswer,
    endSession,
  } = useSessionStats('my-game');

  // קרא לפני תחילת המשחק
  const handleStart = () => startSession();

  // קרא על כל תשובה
  const handleAnswer = (item: BaseGameItem, correct: boolean) => {
    recordAnswer(item, correct);
  };

  // ...
}
```

## ✅ רשימת בדיקות

לפני פרסום המשחק, ודא:

- [ ] המשחק מופיע ברשימת המשחקים הראשית
- [ ] הנתונים נטענים נכון
- [ ] הצלילים עובדים
- [ ] ההגייה תקינה
- [ ] המשחק רספונסיבי (נייד ודסקטופ)
- [ ] מעקב התקדמות עובד
- [ ] מסכי הצלחה ושגיאה מופיעים
- [ ] ניתן לחזור למסך הבית
- [ ] הוראות המשחק ברורות

## 🚀 הרצה ובדיקה

```bash
# הרצת שרת הפיתוח
npm run dev

# בדיקת build
npm run build

# הרצת מצב production
npm start
```

## 💡 טיפים נוספים

1. **אנימציות**: השתמש ב-Tailwind transitions לאנימציות חלקות
2. **נגישות**: הוסף `aria-label` ו-`role` מתאימים
3. **ביצועים**: השתמש ב-`useMemo` ו-`useCallback` לאופטימיזציה
4. **בדיקות**: בדוק את המשחק על מכשירים שונים
5. **משוב**: הוסף הודעות עידוד ותגובות חיוביות

---

## 📁 מבנה קבצים למשחק חדש

### משחק כרטיסים

```
lib/constants/gameData/myCategory.ts   # נתוני הפריטים
lib/constants/gameItemsMap.ts          # הוסף ערך
lib/registry/gamesRegistry.ts         # הוסף רשומה
lib/types/core/base.ts                # הוסף ל-GameType
lib/constants/ui/gameConfigs.ts       # הוסף הגדרות UI
app/games/[gameType]/gamePageConstants.ts  # הוסף ל-SUPPORTED_GAMES
components/marketing/CategorizedGamesGrid.tsx  # הוסף לקטגוריה
```

### משחק מותאם (Custom)

```
app/games/my-game/
├── MyGameClient.tsx          # רכיב לקוח ראשי ('use client')
├── myGameStore.ts            # Zustand store
├── useMyGame.ts              # Hook ייעודי
└── components/
    ├── MyGameMenuScreen.tsx  # מסך תפריט
    └── MyGamePlayArea.tsx    # אזור משחק

# עדכן גם:
app/games/[gameType]/CustomGameRenderer.tsx   # הוסף dynamic import
app/games/[gameType]/gamePageConstants.ts     # הוסף ל-SUPPORTED_GAMES + CUSTOM_GAME_TYPES
lib/registry/gamesRegistry.ts                # הוסף רשומה
lib/types/core/base.ts                       # הוסף ל-GameType
```

בהצלחה ביצירת המשחק החדש! 🎉
