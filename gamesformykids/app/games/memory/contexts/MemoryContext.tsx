'use client';

// Backwards-compatibility shim  all logic moved to useMemoryStore (Zustand).
export { useMemoryStore as useMemoryContext } from '../stores/useMemoryStore';

import type { ReactNode } from 'react';
export function MemoryProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
