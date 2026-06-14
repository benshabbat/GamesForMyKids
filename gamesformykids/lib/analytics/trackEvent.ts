type GameEventParams = {
  game_type?: string;
  score?: number;
  total?: number;
};

// Safe wrapper around gtag — no-ops when gtag is not loaded (dev, no GA ID, SSR)
export function trackEvent(name: string, params?: GameEventParams): void {
  if (typeof window === 'undefined') return;
  const g = (window as unknown as Record<string, unknown>).gtag;
  if (typeof g !== 'function') return;
  (g as (...args: unknown[]) => void)('event', name, params ?? {});
}
