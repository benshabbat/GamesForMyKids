# Memory Game Components

תיקייה זו מכילה את כל הקומפוננטות הספציפיות למשחק הזיכרון.

## קומפוננטות:

- **MemoryCard.tsx** - קלף זיכרון יחיד
- **MemoryGameBoard.tsx** - לוח המשחק עם כל הקלפים
- **MemoryStartScreen.tsx** - מסך התחלה של המשחק
- **MemoryGameHeader.tsx** - כותרת המשחק עם ניקוד וזמן
- **GameWinMessage.tsx** - הודעת ניצחון
- **GameTimeoutScreen.tsx** - מסך תום זמן
- **GameControls.tsx** - כפתורי בקרה (השהיה, איפוס וכו')
- **GameProgressBar.tsx** - פס התקדמות
- **GameStatsBar.tsx** - שורת סטטיסטיקות
- **PauseOverlay.tsx** - שכבת השהיה
- **WinAchievements.tsx** - הישגים במסך ניצחון
- **WinStatsGrid.tsx** - גריד סטטיסטיקות במסך ניצחון

## שימוש:

```tsx
import { MemoryCard, MemoryGameBoard } from '@/app/games/memory/components';
```
