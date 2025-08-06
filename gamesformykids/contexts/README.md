# Puzzle Context API

זהו Context API חדש לניהול משחקי הפאזל. הוא מרכז את כל הלוגיקה במקום אחד ומאפשר שיתוף קל בין רכיבים.

## מה שונה?

### לפני (עם Hooks נפרדים):
```tsx
// CustomPuzzleGame.tsx
const gameState = useGameState();
const imageManagement = useImageManagement();
const puzzleLogic = usePuzzleGameLogic({
  difficulty: gameState.difficulty,
  timer: gameState.timer
});
const dragAndDrop = useDragAndDrop();
const { feedbackMessage, feedbackType, showFeedback, speak } = usePuzzleFeedback();
```

### אחרי (עם Context API):
```tsx
// CustomPuzzleGame.tsx
const { 
  state, 
  dispatch,
  initializeGame, 
  resetGame,
  handleDragStart,
  handleTouchStart,
  // ... כל הפונקציות
} = usePuzzleContext();
```

## יתרונות החדש:

1. **ריכוז הלוגיקה**: כל הלוגיקה במקום אחד
2. **שיתוף מצב**: קל לשתף מצב בין רכיבים
3. **פשטות**: פחות imports ופחות complexity
4. **ביצועים**: פחות re-renders
5. **תחזוקה**: קל יותר לתחזק ולהוסיף פיצ'רים

## המבנה:

### PuzzleContext.tsx
- **PuzzleState**: כל המצב של המשחק
- **PuzzleAction**: כל הפעולות האפשריות
- **PuzzleProvider**: ה-Provider שעוטף את הרכיבים
- **usePuzzleContext**: ה-Hook לשימוש ב-Context

### הרכיבים המעודכנים:
- `SimplePuzzleGame.tsx` - משתמש ב-Context
- `CustomPuzzleGame.tsx` - משתמש ב-Context
- `page.tsx` - עוטף את הרכיבים ב-PuzzleProvider

## איך להשתמש:

1. עטוף את הרכיב ב-PuzzleProvider:
```tsx
<PuzzleProvider>
  <YourPuzzleComponent />
</PuzzleProvider>
```

2. השתמש ב-Hook בתוך הרכיב:
```tsx
const { state, dispatch, initializeGame } = usePuzzleContext();
```

3. השתמש ב-state ובפונקציות:
```tsx
// מצב המשחק
const isGameStarted = state.gameStarted;
const pieces = state.pieces;

// פעולות
initializeGame(image);
dispatch({ type: 'SET_DIFFICULTY', payload: 16 });
```

## הפונקציות הזמינות:

### הקטגוריות:
- **ניהול מצב**: `dispatch`, `state`
- **אתחול משחק**: `initializeGame`, `initializeSimpleGame`
- **טיפול בגרירה**: `handleDragStart`, `handleTouchStart`, etc.
- **ניהול תמונות**: `handleImageUpload`, `handlePreMadeImageSelect`
- **ניווט**: `goHome`, `goToMenu`
- **פידבק**: `showFeedback`, `speak`

זה הופך את הקוד להרבה יותר נקי וקל לתחזוקה!
