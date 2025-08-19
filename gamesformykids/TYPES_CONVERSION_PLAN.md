# המרת טיפוסים - תוכנית עבודה

## קבצים להמרה

### 1. ✅ Components - Cards (הושלמו)
- [x] GameCardGrid.tsx - ✅ הומר בהצלחה
- [x] BaseGameCard.tsx - ✅ הומר בהצלחה
- [x] ColoredShapeCard.tsx - ✅ הומר בהצלחה
- [x] UnifiedCard.tsx - ✅ הומר בהצלחה

### 2. ✅ Components - Headers (הושלמו)
- [x] GameHeader.tsx - ✅ הומר בהצלחה
- [x] StartScreenHeader.tsx - ✅ הומר בהצלחה
- [x] UnifiedHeader.tsx - ✅ הומר בהצלחה

### 3. ✅ Components - Screens (הושלמו)
- [x] GenericStartScreen.tsx - ✅ הומר בהצלחה
- [x] GameErrorScreen.tsx - ✅ הומר בהצלחה

### 4. ✅ Components - Displays (הושלמו)
- [x] OptimizedImage.tsx - ✅ הומר בהצלחה
- [x] GenericBox.tsx - ✅ הומר בהצלחה
- [x] ProgressDisplay.tsx - ✅ הומר בהצלחה
- [x] GameProgressDisplay.tsx - ✅ הומר בהצלחה

### 5. ✅ Components - Feedback (הושלמו)
- [x] TipsBox.tsx - ✅ הומר בהצלחה
- [x] SimpleGameInstructions.tsx - ✅ הומר בהצלחה
- [x] GameHints.tsx - ✅ הומר בהצלחה
- [x] GameInstructions.tsx - ✅ הומר בהצלחה
- [x] CelebrationBox.tsx - ✅ הומר בהצלחה
- [x] ChallengeBox.tsx - ✅ הומר בהצלחה

### 6. ✅ Components - Buttons (הושלמו)
- [x] SimpleGameStartButton.tsx - ✅ הומר בהצלחה

### 7. ✅ Hooks - Game State (הושלמו)
- [x] useGameOptions.ts - ✅ הומר בהצלחה
- [x] useGameData.ts - ✅ הומר בהצלחה

### 8. ✅ Contexts שהומרו למופרדים
- [x] MemoryContext.tsx - ✅ הומר בהצלחה - טיפוסים ב-lib/types/contexts/memory.ts

### 9. ❌ Contexts שטרם הומרו (מכילים טיפוסים פנימיים)
- [ ] AuthContext.tsx - יש interface AuthContextType פנימי
- [ ] BuildingContext.tsx - יש interface BuildingContextType פנימי + types מקומיים
- [ ] GameConfigContext.tsx - טרם נבדק
- [ ] GameLogicContext.tsx - טרם נבדק  
- [ ] GameProgressContext.tsx - טרם נבדק
- [ ] GameTypeContext.tsx - טרם נבדק
- [ ] HebrewLettersContext.tsx - יש הרבה interfaces פנימיים

### 9. ❌ Hooks נוספים שטרם נבדקו
- [ ] useBaseGame.ts
- [ ] useAdvancedGameState.ts
- [ ] useAutoGame.ts
- [ ] useGameContext.ts
- [ ] useProgressTracking.ts
- [ ] useGameProgress.ts
- [ ] useAchievements.ts
- [ ] useGameHints.ts
- [ ] useGameEvents.ts

## סטטוס נוכחי
✅ **Build**: עובר בהצלחה  
✅ **TypeScript**: ללא שגיאות  
✅ **ESLint**: ללא אזהרות

## הושלמו עד כה (22 קבצים):
✅ **Cards**: GameCardGrid, BaseGameCard, ColoredShapeCard, UnifiedCard  
✅ **Headers**: GameHeader, StartScreenHeader, UnifiedHeader  
✅ **Screens**: GenericStartScreen, GameErrorScreen  
✅ **Displays**: OptimizedImage, GenericBox, ProgressDisplay, GameProgressDisplay  
✅ **Feedback**: TipsBox, SimpleGameInstructions, GameHints, GameInstructions, CelebrationBox, ChallengeBox  
✅ **Buttons**: SimpleGameStartButton
✅ **Hooks**: useGameOptions, useGameData
✅ **Contexts**: MemoryContext

## עדיפות גבוהה לעבוד עליו:
1. **Contexts** - יש הרבה טיפוסים פנימיים שצריך להפריד
2. **Hooks נוספים** - לוודא שכולם משתמשים בטיפוסים המופרדים

### 9. Hooks - User
- [ ] useUserProfile.ts

### 11. Contexts (בהתקדמות) ⏳
- [x] UniversalGameContext.tsx - ✅ הומר בהצלחה
- [x] SimpleGameProgressContext.tsx - ✅ הומר בהצלחה  
- [x] PuzzleContext.tsx - ✅ הומר בהצלחה
- [ ] AuthContext.tsx
- [ ] BuildingContext.tsx  
- [ ] GameConfigContext.tsx
- [ ] GameLogicContext.tsx
- [ ] GameProgressContext.tsx
- [ ] GameTypeContext.tsx
- [ ] HebrewLettersContext.tsx
- [ ] MemoryContext.tsx

## סטטוס נוכחי
✅ **Build**: עובר בהצלחה  
✅ **TypeScript**: ללא שגיאות  
✅ **ESLint**: ללא אזהרות

## הושלמו עד כה:
- הפרדת טיפוסים למודולים מאורגנים
- יישום טיפוסים ב-components חשובים
- תיקון תאימות עם הקוד הקיים
- שמירה על תפקוד מלא של המערכת

### 4. Components - Displays
- [ ] ProgressDisplay.tsx
- [ ] GameProgressDisplay.tsx
- [x] OptimizedImage.tsx - ✅ הומר בהצלחה
- [x] GenericBox.tsx - ✅ הומר בהצלחה

### 5. Components - Feedback
- [x] TipsBox.tsx - ✅ הומר בהצלחה
- [x] SimpleGameInstructions.tsx - ✅ הומר בהצלחה
- [x] GameHints.tsx - ✅ הומר בהצלחה

### 6. Components - Buttons
- [x] SimpleGameStartButton.tsx - ✅ הומר בהצלחה

### 7. Hooks - Game State (✅ הושלם!)
- [x] useGameOptions.ts - ✅ הומר בהצלחה
- [x] useBaseGame.ts - ✅ הומר בהצלחה
- [x] useAdvancedGameState.ts - ✅ הומר בהצלחה
- [x] useAutoGame.ts - ✅ הומר בהצלחה
- [x] useGameData.ts - ✅ הומר בהצלחה
- [x] useGameContext.ts - ✅ הומר בהצלחה

### 8. Hooks - Progress (✅ הושלם!)
- [x] useProgressTracking.ts - ✅ הומר בהצלחה

### 9. Hooks - UI (✅ הושלם!)
- [x] useGameHints.ts - ✅ הומר בהצלחה
- [x] useGameEvents.ts - ✅ הומר בהצלחה
- [x] useGamePerformance.ts - ✅ הומר בהצלחה

### 10. Hooks - User
- [ ] useUserProfile.ts

### 8. Contexts
- [ ] UniversalGameContext.tsx
- [ ] SimpleGameProgressContext.tsx
- [ ] HebrewLettersContext.tsx
- [ ] MemoryContext.tsx
- [ ] PuzzleContext.tsx
- [ ] GameTypeContext.tsx
- [ ] GameProgressContext.tsx
- [ ] GameLogicContext.tsx
- [ ] GameConfigContext.tsx

## הערות
- צריך לוודא שכל הטיפוסים החדשים כוללים את כל המאפיינים הנדרשים
- לשמור על תאימות לאחור עד להמרה מלאה
- לבדוק build אחרי כל שלב
