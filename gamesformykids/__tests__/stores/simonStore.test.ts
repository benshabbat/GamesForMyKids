import { beforeEach, describe, expect, it, vi, afterEach } from 'vitest';
import { useSimonStore, BUTTONS } from '@/app/games/simon/simonStore';

const store = useSimonStore;

beforeEach(() => {
  vi.useFakeTimers();
  store.setState({
    phase: 'menu', activeColor: null, playerIdx: 0,
    best: 0, roundScore: 0, sequence: [],
  } as unknown as Parameters<typeof store.setState>[0]);
});

afterEach(() => {
  vi.useRealTimers();
});

describe('simonStore', () => {
  describe('initial state', () => {
    it('starts at menu phase', () => {
      expect(store.getState().phase).toBe('menu');
    });

    it('has no active color', () => {
      expect(store.getState().activeColor).toBeNull();
    });

    it('has empty sequence', () => {
      expect(store.getState().sequence).toHaveLength(0);
    });
  });

  describe('setPhase', () => {
    it('updates phase', () => {
      store.getState().setPhase('showing');
      expect(store.getState().phase).toBe('showing');
    });
  });

  describe('setActiveColor', () => {
    it('sets active color', () => {
      store.getState().setActiveColor('red');
      expect(store.getState().activeColor).toBe('red');
    });

    it('clears active color', () => {
      store.getState().setActiveColor('red');
      store.getState().setActiveColor(null);
      expect(store.getState().activeColor).toBeNull();
    });
  });

  describe('setSequence', () => {
    it('stores the sequence', () => {
      store.getState().setSequence(['red', 'blue', 'green']);
      expect(store.getState().sequence).toEqual(['red', 'blue', 'green']);
    });
  });

  describe('setRoundScore', () => {
    it('updates roundScore', () => {
      store.getState().setRoundScore(5);
      expect(store.getState().roundScore).toBe(5);
    });
  });

  describe('updateBest', () => {
    it('updates best when new score is higher', () => {
      store.getState().updateBest(10);
      expect(store.getState().best).toBe(10);
    });

    it('does not decrease best', () => {
      store.setState({ best: 15 } as unknown as Parameters<typeof store.setState>[0]);
      store.getState().updateBest(5);
      expect(store.getState().best).toBe(15);
    });
  });

  describe('setPlayerIdx', () => {
    it('updates player index', () => {
      store.getState().setPlayerIdx(2);
      expect(store.getState().playerIdx).toBe(2);
    });
  });

  describe('initGame', () => {
    it('creates a sequence with one button', () => {
      store.getState().initGame();
      expect(store.getState().sequence).toHaveLength(1);
    });

    it('sequence contains a valid button id', () => {
      store.getState().initGame();
      const validIds = BUTTONS.map(b => b.id);
      expect(validIds).toContain(store.getState().sequence[0]);
    });

    it('resets round score to 0', () => {
      store.setState({ roundScore: 5 } as unknown as Parameters<typeof store.setState>[0]);
      store.getState().initGame();
      expect(store.getState().roundScore).toBe(0);
    });

    it('keeps the best score from earlier games', () => {
      store.setState({ best: 12 } as unknown as Parameters<typeof store.setState>[0]);
      store.getState().initGame();
      expect(store.getState().best).toBe(12);
    });

    it('resets the rest of the previous run', () => {
      store.setState({
        phase: 'dead', activeColor: 'red', playerIdx: 3, sequence: ['red', 'blue', 'green', 'red'],
      } as unknown as Parameters<typeof store.setState>[0]);
      store.getState().initGame();
      expect(store.getState().phase).toBe('menu');
      expect(store.getState().activeColor).toBeNull();
      expect(store.getState().playerIdx).toBe(0);
      expect(store.getState().sequence).toHaveLength(1);
    });
  });

  describe('registerTap', () => {
    const setInput = (sequence: Array<'red' | 'blue' | 'green' | 'yellow'>, playerIdx = 0) =>
      store.setState({ phase: 'input', sequence, playerIdx } as unknown as Parameters<typeof store.setState>[0]);

    it.each(['menu', 'showing', 'dead'] as const)('ignores taps while the phase is %s', (phase) => {
      store.setState({ phase, sequence: ['red'], playerIdx: 0 } as unknown as Parameters<typeof store.setState>[0]);
      expect(store.getState().registerTap('red')).toBe('ignored');
      expect(store.getState().phase).toBe(phase);
      expect(store.getState().playerIdx).toBe(0);
      expect(store.getState().sequence).toEqual(['red']);
    });

    it('advances the player index on a correct tap mid-sequence', () => {
      setInput(['red', 'blue', 'green']);
      expect(store.getState().registerTap('red')).toBe('correct');
      expect(store.getState().playerIdx).toBe(1);
      expect(store.getState().phase).toBe('input');
    });

    it('ends the game on a wrong tap and records the completed rounds', () => {
      setInput(['red', 'blue', 'green'], 1);
      expect(store.getState().registerTap('green')).toBe('wrong');
      expect(store.getState().phase).toBe('dead');
      expect(store.getState().roundScore).toBe(2);
      expect(store.getState().best).toBe(2);
    });

    it('does not lower the best score on a wrong tap', () => {
      store.setState({ best: 9 } as unknown as Parameters<typeof store.setState>[0]);
      setInput(['red', 'blue']);
      store.getState().registerTap('blue');
      expect(store.getState().best).toBe(9);
    });

    it('grows the sequence and locks input as soon as the last tap is correct', () => {
      setInput(['red', 'blue'], 1);
      expect(store.getState().registerTap('blue')).toBe('round-complete');

      const state = store.getState();
      expect(state.phase).toBe('showing');
      expect(state.playerIdx).toBe(0);
      expect(state.roundScore).toBe(2);
      expect(state.sequence).toHaveLength(3);
      expect(state.sequence.slice(0, 2)).toEqual(['red', 'blue']);
    });

    it('ignores an extra tap in the pause before the replay instead of killing the game', () => {
      setInput(['red'], 0);
      store.getState().registerTap('red'); // round complete, replay pending
      const before = store.getState();

      // The next colour hasn't been shown yet; any tap here must be a no-op.
      for (const id of ['red', 'blue', 'green', 'yellow'] as const) {
        expect(store.getState().registerTap(id)).toBe('ignored');
      }
      expect(store.getState().phase).toBe('showing');
      expect(store.getState().sequence).toEqual(before.sequence);
      expect(store.getState().roundScore).toBe(before.roundScore);
    });

    it('stays dead after a wrong tap (late taps cannot revive the game)', () => {
      setInput(['red']);
      store.getState().registerTap('blue');
      expect(store.getState().registerTap('red')).toBe('ignored');
      expect(store.getState().phase).toBe('dead');
    });

    it('plays through consecutive rounds', () => {
      store.getState().initGame();
      for (let round = 1; round <= 3; round++) {
        store.getState().setPhase('input');
        store.getState().setPlayerIdx(0);
        for (const id of [...store.getState().sequence]) store.getState().registerTap(id);
        expect(store.getState().phase).toBe('showing');
        expect(store.getState().sequence).toHaveLength(round + 1);
        expect(store.getState().roundScore).toBe(round);
      }
    });
  });
});
