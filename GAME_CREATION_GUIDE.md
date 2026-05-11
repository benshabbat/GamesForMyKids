# 🎮 מדריך ליצירת משחק חדש

מדריך מפורט ליצירת משחקים חדשים בפלטפורמת המשחקים החינוכיים לילדים.

## 📋 תוכן העניינים

1. [סקירה כללית](#סקירה-כללית)
2. [שלבי הפיתוח](#שלבי-הפיתוח)
3. [מבנה קבצים](#מבנה-קבצים)
4. [דוגמאות קוד](#דוגמאות-קוד)
5. [בדיקות והרצה](#בדיקות-והרצה)

## 🎯 סקירה כללית

הפלטפורמה תומכת בשני סוגי משחקים עיקריים:

### 1. משחקים פשוטים (Simple Games)
- משחקי זיהוי פריטים (צבעים, חיות, פירות וכו')
- מבוססים על `AutoGamePage` ו-`useSimpleGame`
- נוצרים דרך מיפוי בקובץ `[gameType]/page.tsx`

### 2. משחקים מותאמים אישית (Custom Games)
- משחקים עם לוגיקה מיוחדת (זיכרון, חידות וכו')
- דורשים קונטקסט ייעודי ודף נפרד
- דוגמאות: `memory`, `hebrew-letters`, `puzzles`

## 🚀 שלבי הפיתוח

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
// בתחילת הקובץ
import { MY_GAME_ITEMS, MY_GAME_PRONUNCIATIONS, MY_GAME_CONFIG } from './gameData/myCategory';

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

הוסף את סוג המשחק החדש ל-`lib/types/base.ts`:

```typescript
export type GameType =
  | 'memory'
  | 'colors' 
  | 'letters'
  // ... סוגי משחקים קיימים
  | 'my-game'     // הוסף את המשחק החדש
  | 'advanced';
```

### שלב 5: הוספה לרשימת המשחקים הנתמכים

עדכן את `app/games/[gameType]/page.tsx`:

```typescript
// הוסף את המשחק החדש לרשימה
const SUPPORTED_GAMES = [
  'animals', 'colors', 'fruits', 'vegetables', 'clothing',
  'letters', 'shapes', 'numbers', 'smells-tastes', 'weather',
  'transport', 'vehicles', 'tools', 'space', 'house',
  'instruments', 'professions', 'emotions', 'math',
  'my-game'  // הוסף כאן
] as const;
```

## 🎨 יצירת משחק מותאם אישית

### שלב 1: יצירת קונטקסט

צור קובץ `contexts/MyGameContext.tsx`:

```typescript
"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import { useAdvancedGameState } from '@/hooks/shared/useAdvancedGameState';
import { BaseGameItem } from '@/lib/types/base';

// הגדרת מצב המשחק
interface MyGameState {
  // הגדר את המצב הייחודי למשחק שלך
  items: BaseGameItem[];
  currentItem: BaseGameItem | null;
  gameStarted: boolean;
  // ... שדות נוספים
}

// פעולות המשחק
interface MyGameActions {
  initializeGame: () => void;
  selectItem: (item: BaseGameItem) => void;
  resetGame: () => void;
  // ... פעולות נוספות
}

interface MyGameContextType {
  state: MyGameState;
  actions: MyGameActions;
}

const MyGameContext = createContext<MyGameContextType | undefined>(undefined);

export function MyGameProvider({ children }: { children: ReactNode }) {
  // השתמש ב-useAdvancedGameState או ב-hooks אחרים
  const gameState = useAdvancedGameState({
    // הגדרות התחלתיות
  });

  const value = {
    state: {
      // מיפוי המצב
    },
    actions: {
      // מיפוי הפעולות
    }
  };

  return (
    <MyGameContext.Provider value={value}>
      {children}
    </MyGameContext.Provider>
  );
}

export function useMyGame() {
  const context = useContext(MyGameContext);
  if (!context) {
    throw new Error('useMyGame must be used within MyGameProvider');
  }
  return context;
}
```

### שלב 2: יצירת דף המשחק

צור תיקייה `app/games/my-game/` והוסף `page.tsx`:

```typescript
"use client";

import { MyGameProvider, useMyGame } from "@/contexts/MyGameContext";
import AutoStartScreen from "@/components/shared/AutoStartScreen";

function MyGameContent() {
  const { state, actions } = useMyGame();

  if (!state.gameStarted) {
    return (
      <AutoStartScreen 
        gameType="my-game" 
        items={state.items} 
        onStart={actions.initializeGame}
        onSpeak={() => {}}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-200 p-4">
      <div className="max-w-4xl mx-auto">
        {/* רכיבי המשחק שלך כאן */}
      </div>
    </div>
  );
}

export default function MyGamePage() {
  return (
    <MyGameProvider>
      <MyGameContent />
    </MyGameProvider>
  );
}
```

### שלב 3: הסרה מרשימת המשחקים הכלליים

הסר את המשחק מ-`SUPPORTED_GAMES` ב-`[gameType]/page.tsx` כדי שהוא יעבור לדף המותאם שלו.

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
import { useGameAudio } from "@/hooks/shared/useGameAudio";

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
import { useSessionStats } from "@/hooks/shared/useSessionStats";

function MyGameComponent() {
  const { 
    progress, 
    updateProgress, 
    resetProgress 
  } = useSessionStats('my-game');

  const handleCorrectAnswer = () => {
    updateProgress({
      correct: progress.correct + 1,
      level: Math.floor(progress.correct / 3) + 1
    });
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

```
app/games/my-game/           # (רק למשחקים מותאמים)
├── page.tsx                 # דף המשחק הראשי
├── components/              # רכיבים ייעודיים למשחק
│   ├── GameBoard.tsx
│   └── GameCard.tsx
└── types.ts                 # טיפוסים ייעודיים

contexts/                    # (רק למשחקים מותאמים)
├── MyGameContext.tsx        # קונטקסט המשחק
└── index.ts                 # ייצוא

lib/constants/gameData/
├── myCategory.ts            # נתוני המשחק
└── index.ts                 # ייצוא (עדכן)

lib/types/
├── games.ts                 # טיפוסים (עדכן)
└── base.ts                  # טיפוסים בסיסיים (עדכן)
```

בהצלחה ביצירת המשחק החדש! 🎉
