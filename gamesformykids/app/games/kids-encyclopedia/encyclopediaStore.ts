'use client';

import { create } from 'zustand';

const COLLECTION_KEY = 'kids-encyclopedia-collection';

function loadCollection(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(COLLECTION_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

function saveCollection(ids: Set<string>): void {
  try {
    localStorage.setItem(COLLECTION_KEY, JSON.stringify([...ids]));
  } catch {
    // ignore storage errors
  }
}

type ViewMode = 'categories' | 'grid' | 'card' | 'collection';

interface State {
  viewMode: ViewMode;
  selectedCategory: string | null;
  selectedEntryId: string | null;
  collection: Set<string>;
}

interface Actions {
  selectCategory: (id: string) => void;
  backToCategories: () => void;
  openCard: (entryId: string) => void;
  closeCard: () => void;
  toggleCollection: (entryId: string) => void;
  showCollection: () => void;
  backToGrid: () => void;
}

export const useEncyclopediaStore = create<State & Actions>((set, get) => ({
  viewMode: 'categories',
  selectedCategory: null,
  selectedEntryId: null,
  collection: loadCollection(),

  selectCategory: (id) => set({ viewMode: 'grid', selectedCategory: id }),
  backToCategories: () => set({ viewMode: 'categories', selectedCategory: null, selectedEntryId: null }),
  openCard: (entryId) => set({ viewMode: 'card', selectedEntryId: entryId }),
  closeCard: () => set({ viewMode: 'grid', selectedEntryId: null }),
  showCollection: () => set({ viewMode: 'collection', selectedCategory: null }),
  backToGrid: () => {
    const { selectedCategory } = get();
    if (selectedCategory) {
      set({ viewMode: 'grid', selectedEntryId: null });
    } else {
      set({ viewMode: 'categories', selectedEntryId: null });
    }
  },
  toggleCollection: (entryId) => {
    const next = new Set(get().collection);
    if (next.has(entryId)) {
      next.delete(entryId);
    } else {
      next.add(entryId);
    }
    saveCollection(next);
    set({ collection: next });
  },
}));
