'use client';

import { makePersistStore } from './createStore';

export type AgeRange = 'all' | '3-4' | '5-7' | '8-10';

export interface AgeFilterState {
  ageRange: AgeRange;
}

export interface AgeFilterActions {
  setAgeRange: (range: AgeRange) => void;
}

export const useAgeFilterStore = makePersistStore<AgeFilterState & AgeFilterActions>(
  'AgeFilterStore',
  'gfk-age-filter',
  (set) => ({
    ageRange: 'all',
    setAgeRange: (range) => set({ ageRange: range }, false, 'ageFilter/setRange'),
  }),
  { version: 1 },
);

/** Returns true if a game's ageMin is compatible with the selected range. */
export function isAgeAppropriate(ageMin: number | undefined, range: AgeRange): boolean {
  if (range === 'all' || ageMin === undefined) return true;
  if (range === '3-4') return ageMin <= 4;
  if (range === '5-7') return ageMin <= 7;
  if (range === '8-10') return ageMin >= 5;
  return true;
}
