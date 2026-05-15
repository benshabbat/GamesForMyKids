'use client';

import GameErrorScreen from '@/components/ui/GameErrorScreen';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function RootError({ error, reset }: ErrorProps) {
  return <GameErrorScreen error={error} reset={reset} homeHref="/" />;
}
