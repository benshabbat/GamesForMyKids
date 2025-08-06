import { useMemoryContext } from '@/contexts';

/**
 * הוק שמספק מידע מפורט על מצב המשחק לצרכי דיבוג
 */
export function useMemoryDebug() {
  const context = useMemoryContext();
  
  const debugInfo = {
    // מידע בסיסי על המשחק
    gameInfo: {
      started: context.state.gameStarted,
      completed: context.state.isCompleted,
      won: context.state.isGameWon,
      paused: context.state.isGamePaused,
      difficulty: context.state.difficulty,
      timer: context.state.timer,
      timeLeft: context.state.timeLeft,
    },
    
    // מידע על הקלפים
    cardsInfo: {
      total: context.state.cards.length,
      flipped: context.state.flippedCards.length,
      matched: context.state.matchedPairs.length,
      remaining: context.difficultyConfig.pairs - context.state.matchedPairs.length,
      flippedIds: context.state.flippedCards,
      matchedPairs: context.state.matchedPairs,
    },
    
    // סטטיסטיקות
    stats: context.state.gameStats,
    
    // קונפיגורציה
    config: context.difficultyConfig,
    
    // מידע על החיות
    animals: context.state.animals.map(animal => ({
      name: animal.name,
      emoji: animal.emoji,
      isMatched: context.state.matchedPairs.includes(animal.name)
    })),
    
    // מידע על האודיו
    audioInfo: {
      contextAvailable: !!context.state.audioContext,
      contextState: context.state.audioContext?.state || 'N/A'
    }
  };
  
  // פונקציות דיבוג
  const debugActions = {
    // הדפס מידע למסוף
    logState: () => {
      console.group('🎮 Memory Game Debug Info');
      console.log('Game Info:', debugInfo.gameInfo);
      console.log('Cards Info:', debugInfo.cardsInfo);
      console.log('Stats:', debugInfo.stats);
      console.log('Config:', debugInfo.config);
      console.log('Animals:', debugInfo.animals);
      console.log('Audio:', debugInfo.audioInfo);
      console.groupEnd();
    },
    
    // בדיקת תקינות המשחק
    validateGame: () => {
      const issues = [];
      
      // בדיקת מספר קלפים
      if (context.state.cards.length !== context.difficultyConfig.pairs * 2) {
        issues.push(`מספר קלפים לא תקין: ${context.state.cards.length} במקום ${context.difficultyConfig.pairs * 2}`);
      }
      
      // בדיקת זוגות תואמים
      const uniqueAnimals = new Set(context.state.cards.map(card => card.animal.name));
      if (uniqueAnimals.size !== context.difficultyConfig.pairs) {
        issues.push(`מספר חיות ייחודיות לא תקין: ${uniqueAnimals.size} במקום ${context.difficultyConfig.pairs}`);
      }
      
      // בדיקת קלפים הפוכים
      if (context.state.flippedCards.length > 2) {
        issues.push(`יותר מ-2 קלפים הפוכים: ${context.state.flippedCards.length}`);
      }
      
      // בדיקת זוגות מותאמים
      const matchedCount = context.state.matchedPairs.length;
      const expectedMatched = context.state.cards.filter(card => card.isMatched).length / 2;
      if (matchedCount !== expectedMatched) {
        issues.push(`אי התאמה בזוגות מותאמים: ${matchedCount} vs ${expectedMatched}`);
      }
      
      if (issues.length === 0) {
        console.log('✅ המשחק תקין');
      } else {
        console.warn('⚠️ נמצאו בעיות:', issues);
      }
      
      return issues;
    },
    
    // סימולציה של ניצחון
    simulateWin: () => {
      console.log('🎯 מדמה ניצחון...');
      context.state.cards.forEach((_, index) => {
        if (!context.state.cards[index].isMatched) {
          context.handleCardClick(index);
        }
      });
    },
    
    // איפוס זמן (למטרות בדיקה)
    resetTime: () => {
      context.dispatch({ type: 'SET_TIME_LEFT', payload: context.difficultyConfig.timeLimit });
    }
  };
  
  return {
    ...debugInfo,
    actions: debugActions,
    context // גישה מלאה לקונטקסט למקרה הצורך
  };
}
