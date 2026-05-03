import { create, type StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

/**
 * Wraps create<T>()(devtools(creator, { name })) to reduce per-store boilerplate.
 * Named `makeStore` to avoid shadowing Zustand v5's own `createStore` export.
 *
 * Usage:
 *   export const useFooStore = makeStore<FooState & FooActions>('FooStore', (set, get) => ({
 *     ...INITIAL_STATE,
 *     action: () => set({...}, false, 'foo/action'),
 *   }));
 */
export function makeStore<T extends object>(
  name: string,
  creator: StateCreator<T, [['zustand/devtools', never]]>,
) {
  return create<T>()(devtools(creator, { name }));
}
