'use client';

import { useState } from 'react';

export function useOptimizedImage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => setIsLoading(false);

  const handleError = () => {
    setError(true);
    setIsLoading(false);
  };

  return { isLoading, error, handleLoad, handleError };
}
