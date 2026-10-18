// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePhaseGameCompletion } from '@/hooks/shared/progress/usePhaseGameCompletion';

function setup(initialPhase: string) {
  const save = vi.fn();
  const saveRef = { current: save };
  const hook = renderHook(
    ({ phase }) => usePhaseGameCompletion(phase, saveRef, () => ({ score: 5, level: 1 })),
    { initialProps: { phase: initialPhase } },
  );
  return { save, ...hook };
}

describe('usePhaseGameCompletion', () => {
  it('saves once with the elapsed time when playing to dead', () => {
    const { save, rerender } = setup('menu');
    rerender({ phase: 'playing' });
    rerender({ phase: 'dead' });
    expect(save).toHaveBeenCalledTimes(1);
    expect(save.mock.calls[0]![0]).toMatchObject({ score: 5, level: 1 });
    expect(save.mock.calls[0]![0].durationSeconds).toBeLessThan(5);
  });

  it('does not report an epoch-sized duration when mounted already in "playing"', () => {
    const { save, rerender } = setup('playing');
    rerender({ phase: 'dead' });
    expect(save).toHaveBeenCalledTimes(1);
    expect(save.mock.calls[0]![0].durationSeconds).toBeLessThan(5);
  });

  it('does not save when the game never ran', () => {
    const { save, rerender } = setup('menu');
    rerender({ phase: 'dead' });
    expect(save).not.toHaveBeenCalled();
  });
});
