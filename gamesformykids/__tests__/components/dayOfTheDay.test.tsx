// @vitest-environment jsdom
import { describe, it, expect, afterEach, vi } from 'vitest';
import type { ComponentType } from 'react';
import { act } from 'react';
import { renderToString } from 'react-dom/server';
import { hydrateRoot } from 'react-dom/client';
import { renderHook } from '@testing-library/react';
import JokeOfTheDay from '@/components/marketing/JokeOfTheDay';
import FactOfTheDay from '@/components/marketing/FactOfTheDay';
import RiddleOfTheDay from '@/components/marketing/RiddleOfTheDay';
import { useItemOfTheDay } from '@/hooks/shared/marketing/useItemOfTheDay';
import { getLocalDayIndex } from '@/lib/utils/engagement/localDate';
import { JOKES } from '@/lib/constants/jokes';
import { FACTS } from '@/lib/constants/facts';
import { RIDDLES } from '@/lib/quiz/data/riddles';

// Required so React lets act() flush effects/state updates in this test environment.
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

const ORIGINAL_TZ = process.env.TZ;

// The home page is prerendered on the build day and hydrated on the visit day.
const BUILD_DAY = new Date(2026, 9, 1, 10, 0);
const VISIT_DAY = new Date(2026, 9, 5, 10, 0);

const pick = <T,>(items: readonly T[], d: Date): T => items[getLocalDayIndex(d) % items.length]!;

const CARDS: Array<{
  name: string;
  Component: ComponentType;
  text: (d: Date) => string;
}> = [
  { name: 'JokeOfTheDay', Component: JokeOfTheDay, text: (d) => pick(JOKES, d).setup },
  { name: 'FactOfTheDay', Component: FactOfTheDay, text: (d) => pick(FACTS, d).he },
  { name: 'RiddleOfTheDay', Component: RiddleOfTheDay, text: (d) => pick(RIDDLES, d).riddle },
];

afterEach(() => {
  vi.useRealTimers();
  if (ORIGINAL_TZ === undefined) delete process.env.TZ;
  else process.env.TZ = ORIGINAL_TZ;
});

describe.each(CARDS)('$name hydration', ({ Component, text }) => {
  it('hydrates without a mismatch when the HTML was prerendered on another day', async () => {
    expect(text(BUILD_DAY)).not.toBe(text(VISIT_DAY)); // the scenario really differs

    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(BUILD_DAY);
    const serverHtml = renderToString(<Component />);
    // The server renders only the stable placeholder, never a clock-dependent item.
    expect(serverHtml).not.toContain(text(BUILD_DAY));

    vi.setSystemTime(VISIT_DAY);
    const container = document.createElement('div');
    container.innerHTML = serverHtml;
    document.body.appendChild(container);

    const onRecoverableError = vi.fn();
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    let root: ReturnType<typeof hydrateRoot> | undefined;
    await act(async () => {
      root = hydrateRoot(container, <Component />, { onRecoverableError });
    });

    expect(onRecoverableError).not.toHaveBeenCalled();
    expect(consoleError).not.toHaveBeenCalled();
    // After mount, today's item (for the visitor's day) is shown.
    expect(container.textContent).toContain(text(VISIT_DAY));

    consoleError.mockRestore();
    await act(async () => root?.unmount());
    container.remove();
  });
});

describe('useItemOfTheDay', () => {
  const ITEMS = ['a', 'b', 'c', 'd', 'e'] as const;

  it('rotates at local midnight, not at UTC midnight (Israel)', () => {
    process.env.TZ = 'Asia/Jerusalem';
    expect(new Date(2024, 6, 1, 12).getTimezoneOffset()).toBe(-180);
    vi.useFakeTimers({ toFake: ['Date'] });

    // 23:30 local on the 14th is 20:30Z; 00:30 local on the 15th is 21:30Z: still the same UTC day.
    vi.setSystemTime(new Date(2024, 5, 14, 23, 30));
    const before = renderHook(() => useItemOfTheDay(ITEMS)).result.current;
    vi.setSystemTime(new Date(2024, 5, 15, 0, 30));
    const after = renderHook(() => useItemOfTheDay(ITEMS)).result.current;

    const dayIndex = getLocalDayIndex(new Date(2024, 5, 14, 23, 30));
    expect(before).toBe(ITEMS[dayIndex % ITEMS.length]);
    expect(after).toBe(ITEMS[(dayIndex + 1) % ITEMS.length]);
    expect(after).not.toBe(before);
  });

  it('keeps the same item all day', () => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date(2024, 5, 14, 0, 1));
    const morning = renderHook(() => useItemOfTheDay(ITEMS)).result.current;
    vi.setSystemTime(new Date(2024, 5, 14, 23, 59));
    const night = renderHook(() => useItemOfTheDay(ITEMS)).result.current;
    expect(night).toBe(morning);
  });

  it('returns null for an empty list', () => {
    expect(renderHook(() => useItemOfTheDay([])).result.current).toBeNull();
  });
});
