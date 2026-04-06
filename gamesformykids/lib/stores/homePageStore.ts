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

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// ── State ──────────────────────────────────────────────────
export interface HomePageState {
  selectedCategory: string | null;
  showAllGames: boolean;
  isLoading: boolean;
  shouldShowLoader: boolean;
}

// ── Actions ────────────────────────────────────────────────
export interface HomePageActions {
  selectCategory: (key: string) => void;
  showAllGamesView: () => void;
  showCategoriesView: () => void;
  backToCategories: () => void;
  setIsLoading: (loading: boolean) => void;
  setShouldShowLoader: (show: boolean) => void;
}

export const useHomePageStore = create<HomePageState & HomePageActions>()(
  devtools(
    (set) => ({
      selectedCategory: null,
      showAllGames: false,
      isLoading: false,
      shouldShowLoader: false,

      setIsLoading: (loading) => set({ isLoading: loading }, false, 'homePage/setIsLoading'),
      setShouldShowLoader: (show) =>
        set({ shouldShowLoader: show }, false, 'homePage/setShouldShowLoader'),

      selectCategory: (key) =>
        set({ selectedCategory: key, showAllGames: false }, false, 'homePage/selectCategory'),

      showAllGamesView: () =>
        set({ selectedCategory: null, showAllGames: true }, false, 'homePage/showAllGames'),

      showCategoriesView: () =>
        set({ selectedCategory: null, showAllGames: false }, false, 'homePage/showCategories'),

      backToCategories: () =>
        set({ selectedCategory: null }, false, 'homePage/backToCategories'),
    }),
    { name: 'HomePageStore' },
  ),
);
