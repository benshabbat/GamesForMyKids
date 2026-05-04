/**
 * ===============================================
 * Home Page Store — Zustand
 * ===============================================
 * מנהל את מצב ה-UI של דף הבית:
 * - הקטגוריה הנבחרת
 * - האם להציג את כל המשחקים
 *
 * מחליף את ה-useState ב-useCategorizedGames.ts,
 * כך שמצב הניווט נשמר גם אם הקומפוננט מתרנדר מחדש.
 */

import { makeStore } from './createStore';

// ── State ──────────────────────────────────────────────────
export interface HomePageState {
  selectedCategory: string | null;
  showAllGames: boolean;
  showFavorites: boolean;
  isLoading: boolean;
  shouldShowLoader: boolean;
}

// ── Actions ────────────────────────────────────────────────
export interface HomePageActions {
  selectCategory: (key: string) => void;
  showAllGamesView: () => void;
  showFavoritesView: () => void;
  showCategoriesView: () => void;
  backToCategories: () => void;
  setIsLoading: (loading: boolean) => void;
  setShouldShowLoader: (show: boolean) => void;
}

export const useHomePageStore = makeStore<HomePageState & HomePageActions>('HomePageStore', (set) => ({
      selectedCategory: null,
      showAllGames: false,
      showFavorites: false,
      isLoading: false,
      shouldShowLoader: false,

      setIsLoading: (loading) => set({ isLoading: loading }, false, 'homePage/setIsLoading'),
      setShouldShowLoader: (show) =>
        set({ shouldShowLoader: show }, false, 'homePage/setShouldShowLoader'),

      selectCategory: (key) =>
        set({ selectedCategory: key, showAllGames: false, showFavorites: false }, false, 'homePage/selectCategory'),

      showAllGamesView: () =>
        set({ selectedCategory: null, showAllGames: true, showFavorites: false }, false, 'homePage/showAllGames'),

      showFavoritesView: () =>
        set({ selectedCategory: null, showAllGames: false, showFavorites: true }, false, 'homePage/showFavorites'),

      showCategoriesView: () =>
        set({ selectedCategory: null, showAllGames: false, showFavorites: false }, false, 'homePage/showCategories'),

      backToCategories: () =>
        set({ selectedCategory: null, showFavorites: false }, false, 'homePage/backToCategories'),
    }));
