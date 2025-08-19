/**
 * ===============================================
 * טיפוסים כלליים לContexts
 * ===============================================
 */

export interface GameTypeProviderProps {
  children: React.ReactNode;
  defaultGameType?: string;
}

export interface GameProgressProviderProps {
  children: React.ReactNode;
  gameType?: string;
}

export interface GameLogicProviderProps {
  children: React.ReactNode;
  gameType: string;
}

export interface GameConfigProviderProps {
  children: React.ReactNode;
  gameType: string;
}
