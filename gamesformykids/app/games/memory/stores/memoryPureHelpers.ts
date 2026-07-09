/**
 * Pure display helpers — zero store dependency, fully unit-testable.
 * Extracted from useMemoryStore.ts where they lived as store actions
 * despite having no access to Zustand state.
 */
import { formatGameTime } from '@/lib/utils/game/gameUtils';

export const formatTime = formatGameTime;

export function getTimeColor(timeLeft: number): string {
  if (timeLeft <= 10) return 'text-red-500';
  if (timeLeft <= 30) return 'text-orange-500';
  return 'text-green-600';
}

export function getGridCols(cardCount: number): string {
  if (cardCount === 8) return 'grid-cols-2 md:grid-cols-4';
  if (cardCount === 12) return 'grid-cols-3 md:grid-cols-4';
  if (cardCount === 16) return 'grid-cols-4 md:grid-cols-4';
  return 'grid-cols-3 md:grid-cols-4';
}

export function getAnimationDelay(index: number): string {
  return `${index * 0.1}s`;
}
