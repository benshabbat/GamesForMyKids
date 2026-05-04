import { create, type StateCreator } from 'zustand';
import { devtools, persist, type PersistOptions } from 'zustand/middleware';

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

/**
 * Like makeStore but also wraps with zustand/persist.
 * Use for stores that need localStorage/sessionStorage persistence.
 *
 * Usage:
 *   export const useFooStore = makePersistStore<FooState & FooActions>(
 *     'FooStore',
 *     'my-localstorage-key',
 *     (set, get) => ({ ...INITIAL_STATE, action: () => set(...) }),
 *     { version: 1, partialize: (s) => ({ field: s.field }) }, // optional
 *   );
 */
export function makePersistStore<T extends object>(
  name: string,
  persistKey: string,
  creator: StateCreator<T, [['zustand/devtools', never], ['zustand/persist', unknown]]>,
  persistOptions?: Omit<PersistOptions<T, Partial<T>>, 'name'>,
) {
  return create<T>()(
    devtools(
      persist(creator, { name: persistKey, ...persistOptions }),
      { name },
    ),
  );
}
