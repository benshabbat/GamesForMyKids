'use client';
import { createShallowHook } from '@/lib/stores/utils/sliceUtils';
import { useTrueFalseStore } from './trueFalseStore';

export type { Fact } from './trueFalseStore';
export { FACTS, TIME_PER_Q } from './trueFalseStore';

const _useStore = createShallowHook(useTrueFalseStore);

export function useTrueFalseGame() {
  const state = _useStore();
  return { ...state, q: state.deck[state.idx] };
}
