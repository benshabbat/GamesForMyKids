# GameType Context

קונטקסט לניהול סוג המשחק הנוכחי ומידע קשור במערכת המשחקים.

## תכונות

### State Management
- מעקב אחר סוג המשחק הנוכחי
- שמירת המשחק הקודם
- היסטוריית משחקים

### Game Information
- גישה לקונפיגורציה של המשחק הנוכחי
- גישה לפריטי המשחק
- בדיקת תמיכה במשחק

### Navigation
- ניווט בין משחקים
- חזרה למשחק קודם
- ניקוי היסטוריה

## שימוש בסיסי

### הגדרת Provider
```tsx
import { GameTypeProvider } from '@/contexts/GameTypeContext';

function App() {
  return (
    <GameTypeProvider initialGameType="animals">
      <YourGameComponent />
    </GameTypeProvider>
  );
}
```

### שימוש בקומפוננטים
```tsx
import { useGameType, useCurrentGameType, useCurrentGameConfig } from '@/contexts/GameTypeContext';

function GameComponent() {
  const { 
    currentGameType, 
    currentGameConfig, 
    navigateToGame,
    goToPreviousGame 
  } = useGameType();

  return (
    <div>
      <h1>{currentGameConfig?.title}</h1>
      <button onClick={() => navigateToGame('colors')}>
        עבור לצבעים
      </button>
      <button onClick={goToPreviousGame}>
        משחק קודם
      </button>
    </div>
  );
}

// או שימוש מקוצר
function SimpleGameInfo() {
  const gameType = useCurrentGameType();
  const config = useCurrentGameConfig();
  
  return <h2>{config?.title || 'לא נבחר משחק'}</h2>;
}
```

## API Reference

### GameTypeProvider Props
- `children`: React children
- `initialGameType?`: סוג משחק התחלתי

### useGameType Hook
מחזיר אובייקט עם:

#### State
- `gameState`: מצב המשחק הנוכחי
- `currentGameType`: סוג המשחק הנוכחי
- `currentGameConfig`: קונפיגורציה של המשחק הנוכחי
- `currentGameItems`: פריטי המשחק הנוכחי

#### Actions  
- `setCurrentGameType(gameType)`: עדכון סוג המשחק
- `navigateToGame(gameType)`: ניווט למשחק
- `goToPreviousGame()`: חזרה למשחק קודם
- `clearGameHistory()`: ניקוי היסטוריה

#### Utilities
- `isGameSupported(gameType)`: בדיקת תמיכה במשחק
- `getGameConfig(gameType)`: קבלת קונפיגורציה למשחק
- `getGameItems(gameType)`: קבלת פריטים למשחק

### Helper Hooks
- `useCurrentGameType()`: מחזיר רק את סוג המשחק הנוכחי
- `useCurrentGameConfig()`: מחזיר רק את הקונפיגורציה של המשחק הנוכחי

## דוגמאות

### קומפוננט ניווט פשוט
```tsx
function GameNavigation() {
  const { 
    currentGameConfig, 
    gameState, 
    navigateToGame 
  } = useGameType();

  return (
    <nav>
      <h3>{currentGameConfig?.title}</h3>
      <div>
        {gameState.gameHistory.map(gameType => (
          <button 
            key={gameType}
            onClick={() => navigateToGame(gameType)}
          >
            {gameType}
          </button>
        ))}
      </div>
    </nav>
  );
}
```

### מידע על המשחק הנוכחי
```tsx
function CurrentGameInfo() {
  const { currentGameType, currentGameConfig } = useGameType();

  if (!currentGameType) {
    return <div>לא נבחר משחק</div>;
  }

  return (
    <div>
      <h2>{currentGameConfig?.title}</h2>
      <p>{currentGameConfig?.subTitle}</p>
      <span>סוג: {currentGameType}</span>
    </div>
  );
}
```

### שימוש ב-AutoGamePage
```tsx
// הקונטקסט מתעדכן אוטומטית כשהמשחק נטען
function GamePage({ gameType }) {
  return (
    <GameTypeProvider initialGameType={gameType}>
      <AutoGamePage gameType={gameType} />
      <GameNavigation /> {/* יציג מידע על המשחק הנוכחי */}
    </GameTypeProvider>
  );
}
```

## יתרונות

1. **מרכזיות**: כל המידע על המשחק הנוכחי במקום אחד
2. **גמישות**: ניתן לגשת למידע מכל קומפוננט
3. **ניווט קל**: פונקציות ניווט מובנות
4. **היסטוריה**: מעקב אחר משחקים שנוצרו
5. **Type Safety**: תמיכה מלאה ב-TypeScript

## הערות

- הקונטקסט מתעדכן אוטומטית ב-AutoGamePage
- ההיסטוריה מוגבלת למספר סביר של משחקים
- כל הפונקציות ה-Utilities הן memoized לביצועים טובים
- הקונטקסט תומך בכל סוגי המשחקים המוגדרים ב-GameType
