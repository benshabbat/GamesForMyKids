# מבנה הפרויקט החדש - מדריך ארגון

## 📁 סקירה כללית
הפרויקט עבר ארגון מחדש כדי להיות מודולרי ונוח יותר לתחזוקה. כל משחק הוא יחידה עצמאית עם כל הקבצים שקשורים אליו.

## 🎮 מבנה משחק בודד

כל משחק ממוקם תחת `app/games/[game-name]/` ומכיל:

```
app/games/[game-name]/
├── components/          # קומפוננטות ספציפיות למשחק
│   ├── index.ts        # ייצוא כל הקומפוננטות
│   └── *.tsx           # קבצי הקומפוננטות
├── contexts/           # context ו-state management
│   ├── [Game]Context.tsx
│   └── utils.ts        # פונקציות עזר לקונטקסט
├── hooks/              # hooks ספציפיים למשחק
│   ├── index.ts
│   └── use*.ts
├── types/              # טיפוסים ספציפיים למשחק
│   └── *.ts
├── constants/          # קבועים ונתונים
│   └── *.ts
├── utils/              # פונקציות עזר
│   └── *.ts
├── index.ts            # ייצוא כל המשחק
└── page.tsx            # העמוד הראשי של המשחק
```

## 🏗️ משחקים קיימים

### ✅ מלא מאורגנים:
- **Building** - `app/games/building/`
- **Hebrew Letters** - `app/games/hebrew-letters/`
- **Memory** - `app/games/memory/`
- **Puzzles** - `app/games/puzzles/`
- **Tetris** - `app/games/tetris/`
- **Counting** - `app/games/counting/`
- **Math** - `app/games/math/`
- **Bubbles** - `app/games/bubbles/`
- **Tzedakah** - `app/games/tzedakah/`
- **Drawing** - `app/games/drawing/`

## 📦 ייבוא מהמשחקים

### ייבוא מתוך משחק:
```typescript
// ייבוא קומפוננטה ספציפית
import { MemoryGameBoard } from '@/app/games/memory/components';

// ייבוא hook ספציפי
import { useHebrewLetterPractice } from '@/app/games/hebrew-letters/hooks';

// ייבוא קונטקסט
import { usePuzzleContext } from '@/app/games/puzzles/contexts';

// ייבוא טיפוסים
import type { PuzzleState } from '@/app/games/puzzles/types';
```

### ייבוא מהמשחק כולו:
```typescript
// ייבוא הכל מהמשחק
import * from '@/app/games/memory';

// ייבוא ספציפי מה-index
import { MemoryProvider, useMemoryContext } from '@/app/games/memory';
```

## 🌍 קבצים כלליים

### קומפוננטות כלליות:
- `components/shared/` - קומפוננטות משותפות
- `components/ui/` - קומפוננטות UI בסיסיות
- `components/layout/` - קומפוננטות פריסה

### הגיון כללי:
- `lib/utils/` - פונקציות עזר כלליות
- `lib/types/` - טיפוסים כלליים
- `hooks/shared/` - hooks משותפים

## 🔧 כיצד להוסיף משחק חדש

1. **צור תיקיה חדשה**:
   ```bash
   mkdir app/games/new-game
   ```

2. **צור את המבנה הבסיסי**:
   ```bash
   mkdir app/games/new-game/{components,contexts,hooks,types,constants,utils}
   ```

3. **צור קבצי index.ts** בכל תיקיה

4. **צור page.tsx** עבור המשחק

5. **הוסף את המשחק לרישום** ב-`lib/registry/gamesRegistry.ts`

## 📝 דוגמה למשחק חדש

```typescript
// app/games/new-game/index.ts
export * from './components';
export * from './contexts';
export * from './hooks';
export * from './types';

// app/games/new-game/page.tsx
import NewGameComponent from './components/NewGameComponent';

export default function NewGamePage() {
  return <NewGameComponent />;
}
```

## 🎯 יתרונות המבנה החדש

1. **מודולריות** - כל משחק עצמאי
2. **תחזוקה קלה** - קל למצוא קבצים
3. **פיתוח מקבילי** - אין התנגשויות
4. **הרחבה** - קל להוסיף משחקים חדשים
5. **בדיקות** - קל לבדוק משחק ספציפי

## 🔍 איך למצוא דברים

- **קומפוננטה של משחק**: `app/games/[game]/components/`
- **hook של משחק**: `app/games/[game]/hooks/`
- **קונטקסט של משחק**: `app/games/[game]/contexts/`
- **טיפוסים של משחק**: `app/games/[game]/types/`
- **קבועים של משחק**: `app/games/[game]/constants/`

---

*המבנה הזה מבטיח שהפרויקט יישאר מאורגן וקל לתחזוקה גם כשהוא גדל.*
