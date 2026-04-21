/**
 * ===============================================
 * Favorites Store — Zustand + persist
 * ===============================================
 * שומר רשימת מזהי משחקים מועדפים ב-localStorage.
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface FavoritesState {
  favoriteIds: string[];
}

export interface FavoritesActions {
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState & FavoritesActions>()(
  devtools(
    persist(
      (set, get) => ({
        favoriteIds: [],

        toggleFavorite: (id) =>
          set(
            (state) => ({
              favoriteIds: state.favoriteIds.includes(id)
                ? state.favoriteIds.filter((f) => f !== id)
                : [...state.favoriteIds, id],
            }),
            false,
            'favorites/toggle',
          ),

        isFavorite: (id) => get().favoriteIds.includes(id),
      }),
      { name: 'gfk-favorites' },
    ),
    { name: 'FavoritesStore' },
  ),
);
