"use client";

import { useState, useEffect, useCallback } from "react";

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
  const [isLoading, setIsLoading] = useState(false);
  const [shouldShowLoader, setShouldShowLoader] = useState(false);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");
    if (!hasVisited && process.env.NODE_ENV !== "development") {
      setShouldShowLoader(true);
      setIsLoading(true);
      sessionStorage.setItem("hasVisited", "true");
    }
  }, []);

  return { isLoading, shouldShowLoader, handleLoadingComplete };
}
