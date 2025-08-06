# Memory Game Context

## סקירה כללית

ה-`MemoryContext` מספק מדינה מרכזית ופונקציונליות עבור משחק הזיכרון. הוא מנהל את כל האלמנטים של המשחק כולל קלפים, סטטיסטיקות, מצב המשחק, וקלט משתמש.

## מאפיינים

- 🎮 ניהול מצב משחק מלא (התחלה, השהיה, סיום)
- 🃏 ניהול קלפים וזוגות תואמים
- 📊 מעקב סטטיסטיקות (ניקוד, מהלכים, זמן)
- 🔊 אינטגרציה עם אודיו
- ⚙️ הגדרות רמות קושי
- 🎯 מערכת טיימר מובנית

## שימוש בסיסי

### 1. עטיפת האפליקציה ב-Provider

```tsx
import { MemoryProvider } from '@/contexts';

function App() {
  return (
    <MemoryProvider>
      <MemoryGame />
    </MemoryProvider>
  );
}
```

### 2. שימוש ב-Hook בקומפוננטים

```tsx
import { useMemoryContext } from '@/contexts';

function MemoryGame() {
  const {
    state: {
      gameStarted,
      cards,
      gameStats,
      timeLeft,
      isGameWon,
      isGamePaused
    },
    initializeGame,
    handleCardClick,
    pauseGame,
    resumeGame,
    resetGame
  } = useMemoryContext();

  // לוגיקת הקומפוננט...
}
```

## State Structure

### MemoryState

```typescript
interface MemoryState {
  // מצב המשחק
  gameStarted: boolean;
  isCompleted: boolean;
  isGameWon: boolean;
  timer: number;
  timeLeft: number;
  isGamePaused: boolean;
  difficulty: DifficultyLevel;
  gameStats: GameStats;
  
  // קלפים וחיות
  cards: MemoryCard[];
  animals: AnimalData[];
  flippedCards: number[];
  matchedPairs: string[];
  
  // אודיו
  audioContext: AudioContext | null;
  
  // מצב UI
  showHints: boolean;
  showDebug: boolean;
}
```

### MemoryCard

```typescript
interface MemoryCard {
  id: number;
  animal: AnimalData;
  isFlipped: boolean;
  isMatched: boolean;
}
```

### GameStats

```typescript
interface GameStats {
  moves: number;
  matches: number;
  score: number;
  timeElapsed: number;
  perfectMatches: number;
  streak: number;
}
```

## פונקציות זמינות

### initializeGame(targetDifficulty?: DifficultyLevel)
מתחיל משחק חדש עם רמת הקושי הנתונה

### handleCardClick(cardIndex: number)
מטפל בלחיצה על קלף

### pauseGame() / resumeGame()
משהה או מחדש את המשחק

### resetGame()
מאפס את המשחק למצב התחלתי

### setDifficulty(difficulty: DifficultyLevel)
מגדיר רמת קושי ('EASY' | 'MEDIUM' | 'HARD')

## רמות קושי

- **EASY**: 6 זוגות, 180 שניות
- **MEDIUM**: 9 זוגות, 180 שניות  
- **HARD**: 12 זוגות, 180 שניות

## דוגמת קומפוננט מלא

```tsx
import { MemoryProvider, useMemoryContext } from '@/contexts';

function MemoryGameContent() {
  const {
    state: { gameStarted, cards, gameStats, timeLeft, isGameWon },
    initializeGame,
    handleCardClick,
    pauseGame,
    resetGame
  } = useMemoryContext();

  if (!gameStarted) {
    return (
      <div className="text-center p-8">
        <button 
          onClick={() => initializeGame()}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg"
        >
          התחל משחק
        </button>
      </div>
    );
  }

  return (
    <div className="game-container">
      {/* Header */}
      <div className="header">
        <div>ניקוד: {gameStats.score}</div>
        <div>זמן: {timeLeft}</div>
        <button onClick={pauseGame}>השהה</button>
        <button onClick={resetGame}>איפוס</button>
      </div>

      {/* Game Board */}
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className="card"
            onClick={() => handleCardClick(card.id)}
          >
            {card.isFlipped || card.isMatched ? (
              <div>{card.animal.emoji}</div>
            ) : (
              <div>🎴</div>
            )}
          </div>
        ))}
      </div>

      {/* Win Screen */}
      {isGameWon && (
        <div className="win-message">
          <h2>ניצחת!</h2>
          <p>ניקוד: {gameStats.score}</p>
          <button onClick={() => initializeGame()}>שחק שוב</button>
        </div>
      )}
    </div>
  );
}

export default function MemoryGamePage() {
  return (
    <MemoryProvider>
      <MemoryGameContent />
    </MemoryProvider>
  );
}
```

## Actions זמינים

ניתן לשלוח actions ישירות באמצעות ה-dispatch:

```typescript
const { dispatch } = useMemoryContext();

// דוגמאות
dispatch({ type: 'SET_GAME_STARTED', payload: true });
dispatch({ type: 'UPDATE_GAME_STATS', payload: { score: 100 } });
dispatch({ type: 'TOGGLE_HINTS' });
```

## הערות

- הקונטקסט מנהל אוטומטית את הטיימר כאשר המשחק פעיל
- האודיו מתאתחל אוטומטית עם תחילת המשחק
- סטטיסטיקות מתעדכנות אוטומטית עם כל מהלך
- זוגות תואמים נשמרים ומוצגים בזמן אמת
