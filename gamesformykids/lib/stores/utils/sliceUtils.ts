import type { StoreMutatorIdentifier, StateCreator, StoreApi, UseBoundStore } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

// ─────────────────────────────────────────────────────────────────────────────
// createShallowHook
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns a React hook that selects the entire store state shallowly.
 * Eliminates the repeated `useXStore(useShallow((s) => s))` boilerplate.
 *
 * @example
 * export const useColorTapGame = createShallowHook(useColorTapStore);
 */
export function createShallowHook<S>(store: UseBoundStore<StoreApi<S>>): () => S {
  return () => store(useShallow((s) => s));
}


/**
 * Type alias for the `set` function injected into a Zustand StateCreator.
 * Covers both plain stores and stores with devtools middleware.
 */
type SetFn<S> = Parameters<StateCreator<S, [StoreMutatorIdentifier, unknown][], [], Partial<S>>>[0];

// ─────────────────────────────────────────────────────────────────────────────
// makeSetter
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns a Zustand action that sets a single key to the provided value.
 *
 * @example
 * // Inside a StateCreator:
 * setSoundEnabled: makeSetter(set, 'soundEnabled'),
 * setSelectedTool: makeSetter(set, 'selectedTool'),
 */
export function makeSetter<S, K extends keyof S>(
  set: SetFn<S>,
  key: K,
): (value: S[K]) => void {
  return (value) => set({ [key]: value } as unknown as Partial<S>);
}

// ─────────────────────────────────────────────────────────────────────────────
// makeToggle
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns a Zustand action that flips a boolean key.
 *
 * @example
 * // Inside a StateCreator:
 * toggleAudio: makeToggle(set, 'isAudioEnabled'),
 * toggleGrid:  makeToggle(set, 'showGrid'),
 */
export function makeToggle<S, K extends { [P in keyof S]: S[P] extends boolean ? P : never }[keyof S]>(
  set: SetFn<S>,
  key: K,
): () => void {
  return () => set((s) => ({ [key]: !(s as S)[key] } as unknown as Partial<S>));
}
