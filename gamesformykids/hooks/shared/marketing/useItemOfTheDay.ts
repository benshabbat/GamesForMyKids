'use client';
import { useState, useEffect } from 'react';
import { getLocalDayIndex } from '@/lib/utils/engagement/localDate';

/**
 * Returns today's item from `items` (rotating at local midnight), or null until
 * the component has mounted. The home page is statically prerendered and CDN-cached,
 * so picking by the clock during render makes the server HTML (built on another
 * day) disagree with the client's first render and breaks hydration.
 */
export function useItemOfTheDay<T>(items: readonly T[]): T | null {
  const [item, setItem] = useState<T | null>(null);

  useEffect(() => {
    setItem(items[getLocalDayIndex() % items.length] ?? items[0] ?? null);
  }, [items]);

  return item;
}
