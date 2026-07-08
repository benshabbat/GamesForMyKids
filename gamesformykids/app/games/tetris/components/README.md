# Tetris Game Components

תיקייה זו מכילה את כל הקומפוננטות הספציפיות למשחק הטטריס.

## קומפוננטות:

- **TetrisGame.tsx** - משחק הטטריס הראשי
- **GameBoard.tsx** - לוח המשחק
- **AnimatedBackground.tsx** - רקע מונפש
- **NextPieceDisplay.tsx** - תצוגת החלק הבא
- **TouchControls.tsx** - בקרי מגע למובייל
- **useTouchControls.ts** - הוק ללוגיקת בקרות המגע
- **InfoPanels.tsx** - פאנלי מידע (`MobileInfoPanel`, `DesktopInfoPanel`)

מסך הטעינה נשאב מהרכיב המשותף `@/components/layout` (`LoadingScreen`), לא מקובץ מקומי.

## שימוש:

```tsx
import { TetrisGame, GameBoard } from '@/app/games/tetris/components';
```
