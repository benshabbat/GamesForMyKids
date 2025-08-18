/**
 * ===============================================
 * Context Factory - יצירת Context אוטומטית
 * ===============================================
 * 
 * פתרון לדופליקייטים בהגדרות Context
 */

import React, { createContext, useContext, ReactNode } from 'react';

/**
 * יוצר Context עם Provider ו-Hook בצורה אוטומטית
 */
export function createGameContext<T>(contextName: string) {
  const Context = createContext<T | undefined>(undefined);

  // Hook אוטומטי
  const useContextHook = (): T => {
    const context = useContext(Context);
    if (context === undefined) {
      throw new Error(`use${contextName} must be used within a ${contextName}Provider`);
    }
    return context;
  };

  // Provider רכיב
  const Provider = ({ children, value }: { children: ReactNode; value: T }) => {
    return React.createElement(Context.Provider, { value }, children);
  };

  return {
    Context,
    Provider,
    [`use${contextName}`]: useContextHook,
  };
}

/**
 * דוגמה לשימוש:
 * 
 * ```typescript
 * interface MyGameContextValue {
 *   score: number;
 *   level: number;
 * }
 * 
 * const { Provider: MyGameProvider, useMyGame } = createGameContext<MyGameContextValue>('MyGame');
 * 
 * // שימוש
 * function MyComponent() {
 *   const { score, level } = useMyGame();
 *   return <div>Score: {score}, Level: {level}</div>;
 * }
 * ```
 */
