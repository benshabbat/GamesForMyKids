import { beforeEach, describe, expect, it } from 'vitest';
import { useRobotCoderStore } from '@/app/games/robot-coder/robotCoderStore';
import { LEVELS, type Dir } from '@/app/games/robot-coder/components/LevelData';

const store = useRobotCoderStore;

// The grid renders column 0 on the left, so → is col + 1 and ← is col - 1.
// Each solution follows the level's Hebrew hint (ימינה = →, שמאלה = ←, למעלה = ↑, למטה = ↓).
const SOLUTIONS: Dir[][] = [
  ['→', '→'],
  ['→', '→', '↓', '↓'],
  ['→', '→', '→'],
  ['→', '→', '↑', '↑', '→'],
  ['←', '←', '↓', '↓', '→', '→'],
  ['→', '→', '↑', '↑', '→', '→'],
  ['←', '←', '↓', '↓', '←', '←'],
  ['←', '←', '←', '↑', '↑', '↑', '→', '→', '→'],
  ['→', '→', '→', '↑', '↑', '↑', '→', '→'],
  ['→', '→', '↑', '↑', '→', '→', '↑', '↑'],
];

function play(levelIdx: number, commands: Dir[]) {
  store.getState().startGame();
  for (let i = 0; i < levelIdx; i++) store.getState().nextLevel();
  commands.forEach((dir) => store.getState().addCommand(dir));
  store.getState().run();
  for (let i = 0; i < commands.length && store.getState().phase === 'running'; i++) {
    store.getState().executeStep();
  }
  return store.getState();
}

beforeEach(() => {
  store.getState().resetGame();
});

describe('robotCoderStore', () => {
  it('has a reference solution for every level', () => {
    expect(SOLUTIONS).toHaveLength(LEVELS.length);
  });

  it('moves the robot in the direction of the arrow', () => {
    store.getState().startGame();
    const { row, col } = store.getState().robotPos;
    store.getState().addCommand('→');
    store.getState().run();
    store.getState().executeStep();
    expect(store.getState().robotPos).toEqual({ row, col: col + 1 });
  });

  it.each(LEVELS.map((level, idx) => [level.id, idx] as const))(
    'level %i is solvable by following its hint',
    (_id, idx) => {
      const solution = SOLUTIONS[idx]!;
      expect(solution.length).toBeLessThanOrEqual(LEVELS[idx]!.maxCommands);
      const state = play(idx, solution);
      expect(state.collectedLetters.join('')).toBe(LEVELS[idx]!.targetWord);
      expect(state.phase).toBe('success');
    },
  );

  it('fails when the robot walks off the grid', () => {
    const state = play(0, ['←']);
    expect(state.phase).toBe('fail');
  });
});
