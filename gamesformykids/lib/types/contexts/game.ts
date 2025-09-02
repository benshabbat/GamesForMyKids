/**
 * ===============================================
 * טיפוסים לContexts של משחקים
 * ===============================================
 */

export interface UniversalGameProviderProps {
  children: React.ReactNode;
  defaultGameType?: string;
}

// SimpleGameProgressContext
export interface SimpleGameProgressProviderProps {
  children: React.ReactNode;
  gameType: string;
}
