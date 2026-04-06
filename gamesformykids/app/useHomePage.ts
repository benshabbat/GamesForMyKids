"use client";

'use client';

import { useEffect, useCallback } from "react";
import { useHomePageStore } from "@/lib/stores/homePageStore";

export interface UseHomePageReturn {
  isLoading: boolean;
  shouldShowLoader: boolean;
  handleLoadingComplete: () => void;
}

/**
 * לוגיקת עמוד הבית —
 * מחליט אם להציג LoadingScreen (רק ביקור ראשון, לא ב-dev).
 */
export function useHomePage(): UseHomePageReturn {
  const isLoading = useHomePageStore((s) => s.isLoading);
  const shouldShowLoader = useHomePageStore((s) => s.shouldShowLoader);
  const setIsLoading = useHomePageStore((s) => s.setIsLoading);
  const setShouldShowLoader = useHomePageStore((s) => s.setShouldShowLoader);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");
    if (!hasVisited && process.env.NODE_ENV !== "development") {
      setShouldShowLoader(true);
      setIsLoading(true);
      sessionStorage.setItem("hasVisited", "true");
    }
  }, [setIsLoading, setShouldShowLoader]);

  return { isLoading, shouldShowLoader, handleLoadingComplete };
}
