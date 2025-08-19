# מדריך מעבר - Migration Guide

## 🔄 שינויים במבנה הקבצים

### קומפוננטות שהועברו

| לפני | אחרי |
|------|------|
| `components/game/building/` | `app/games/building/components/` |
| `components/game/hebrew-letters/` | `app/games/hebrew-letters/components/` |
| `components/game/memory/` | `app/games/memory/components/` |
| `components/game/puzzles/` | `app/games/puzzles/components/` |
| `components/game/tetris/` | `app/games/tetris/components/` |
| `components/game/counting/` | `app/games/counting/components/` |
| `components/game/math/` | `app/games/math/components/` |
| `components/game/bubbles/` | `app/games/bubbles/components/` |
| `components/game/tzedakah/` | `app/games/tzedakah/components/` |

### קונטקסטים שהועברו

| לפני | אחרי |
|------|------|
| `contexts/BuildingContext.tsx` | `app/games/building/contexts/BuildingContext.tsx` |
| `contexts/HebrewLettersContext.tsx` | `app/games/hebrew-letters/contexts/HebrewLettersContext.tsx` |
| `contexts/MemoryContext.tsx` | `app/games/memory/contexts/MemoryContext.tsx` |
| `contexts/PuzzleContext.tsx` | `app/games/puzzles/contexts/PuzzleContext.tsx` |

### Hooks שהועברו

| לפני | אחרי |
|------|------|
| `hooks/games/useHebrewLetterPractice.ts` | `app/games/hebrew-letters/hooks/useHebrewLetterPractice.ts` |
| `hooks/games/useHebrewLettersStats.ts` | `app/games/hebrew-letters/hooks/useHebrewLettersStats.ts` |
| `hooks/games/usePuzzleFeedback.ts` | `app/games/puzzles/hooks/usePuzzleFeedback.ts` |

### טיפוסים שהועברו

| לפני | אחרי |
|------|------|
| `lib/types/contexts/building.ts` | `app/games/building/types/building.ts` |
| `lib/types/contexts/hebrew-letters.ts` | `app/games/hebrew-letters/types/hebrew-letters.ts` |
| `lib/types/contexts/memory.ts` | `app/games/memory/types/memory.ts` |
| `lib/types/contexts/puzzle.ts` | `app/games/puzzles/types/puzzle.ts` |

### קבועים שהועברו

| לפני | אחרי |
|------|------|
| `lib/constants/hebrewLettersConstants.ts` | `app/games/hebrew-letters/constants/hebrewLettersConstants.ts` |
| `lib/constants/gameData/hebrewLetters.ts` | `app/games/hebrew-letters/constants/hebrewLetters.ts` |
| `lib/constants/simplePuzzlesData.ts` | `app/games/puzzles/constants/simplePuzzlesData.ts` |

### Utils שהועברו

| לפני | אחרי |
|------|------|
| `lib/utils/puzzleUtils.ts` | `app/games/puzzles/utils/puzzleUtils.ts` |

## 📝 עדכון Imports

### דוגמאות לייבואים שהשתנו:

#### קומפוננטות:
```typescript
// ❌ לפני
import { MemoryGameBoard } from '@/components/game/memory';

// ✅ אחרי
import { MemoryGameBoard } from '@/app/games/memory/components';
// או
import MemoryGameBoard from '@/app/games/memory/components/MemoryGameBoard';
```

#### קונטקסטים:
```typescript
// ❌ לפני
import { useBuildingContext } from '@/contexts/BuildingContext';

// ✅ אחרי
import { useBuildingContext } from '@/app/games/building/contexts/BuildingContext';
// או
import { useBuildingContext } from '@/app/games/building';
```

#### Hooks:
```typescript
// ❌ לפני
import { useHebrewLetterPractice } from '@/hooks/games/useHebrewLetterPractice';

// ✅ אחרי
import { useHebrewLetterPractice } from '@/app/games/hebrew-letters/hooks/useHebrewLetterPractice';
// או
import { useHebrewLetterPractice } from '@/app/games/hebrew-letters';
```

#### טיפוסים:
```typescript
// ❌ לפני
import type { PuzzleState } from '@/lib/types/contexts/puzzle';

// ✅ אחרי
import type { PuzzleState } from '@/app/games/puzzles/types/puzzle';
// או
import type { PuzzleState } from '@/app/games/puzzles';
```

## 🛠️ כלים לעזרה במעבר

### 1. חיפוש והחלפה ב-VS Code

```bash
# חיפוש: @/components/game/memory
# החלפה: @/app/games/memory/components

# חיפוש: @/contexts/BuildingContext
# החלפה: @/app/games/building/contexts/BuildingContext
```

### 2. Script אוטומטי (אופציונלי)

```bash
# בטרמינל
grep -r "@/components/game/" src/ --include="*.ts" --include="*.tsx"
```

## ⚠️ נקודות חשובות

1. **קבצי index.ts**: כל משחק יש לו קובץ index.ts שמייצא הכל
2. **ייבואים יחסיים**: בתוך המשחק עצמו, השתמש בייבואים יחסיים
3. **טיפוסים**: חלק מהטיפוסים זמינים גם מ-contexts/index.ts לתאימות לאחור
4. **קומפוננטות כלליות**: נשארו במקומן הקודם

## 🔍 איך לבדוק שהכל עובד

1. **בדיקת build**:
   ```bash
   npm run build
   ```

2. **בדיקת lint**:
   ```bash
   npm run lint
   ```

3. **בדיקת טיפוסים**:
   ```bash
   npm run type-check
   ```

## 🚀 יתרונות החדשים

- **ארגון טוב יותר**: כל דבר במקום הנכון
- **תחזוקה קלה**: קל למצוא ולערוך
- **פיתוח מקבילי**: מפתחים יכולים לעבוד בנפרד
- **מודולריות**: כל משחק עצמאי

---

*אם יש בעיות או שאלות, תבדוק את GAME_STRUCTURE_GUIDE.md לפרטים נוספים.*
