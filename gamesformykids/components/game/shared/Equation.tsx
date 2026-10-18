import type { ReactNode } from 'react';

/**
 * Keeps a math equation in left-to-right order inside the RTL page. Without it the bidi
 * algorithm lays "15 - 3 = ?" out right-to-left and the child reads "? = 3 - 15".
 * The override is on the span itself, so it works regardless of ancestor direction.
 */
export function Equation({ children }: { children: ReactNode }) {
  return <span style={{ direction: 'ltr', unicodeBidi: 'bidi-override' }}>{children}</span>;
}
