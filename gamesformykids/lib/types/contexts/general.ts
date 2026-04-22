/**
 * ===============================================
 * טיפוסים כלליים לContexts - Clean Code & SOLID
 * ===============================================
 */

import { ReactNode } from 'react';

/**
 * Props בסיסיים לProvider - עקרון Single Responsibility
 */
export interface BaseProviderProps {
  readonly children: ReactNode;
}

// הערה: UniversalGameProviderProps מוגדר ב-contexts/universal-game.ts
// הערה: SimpleGameProgressProviderProps מוגדר ב-contexts/simple-game-progress.ts

/**
 * הגדרת סוג משחק אופציונלי - עקרון Single Responsibility
 */
export interface OptionalGameTypeConfig {
  readonly gameType?: string;
}

// הערה: GameProgressProviderProps הוסר - לא בשימוש
// הערה: GameLogicProviderProps הוסר - לא בשימוש
// הערה: GameTypeProviderProps מוגדר ב-contexts/game-type.ts
// הערה: GameConfigProviderProps מוגדר ב-contexts/game-config.ts
