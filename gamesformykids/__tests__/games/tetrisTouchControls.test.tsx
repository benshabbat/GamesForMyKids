// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import TouchControls from '@/app/games/tetris/components/TouchControls';
import { useTetrisStore } from '@/app/games/tetris/store/tetrisStore';
import { EMPTY_BOARD, TETROMINOES } from '@/app/games/tetris/constants';

const store = useTetrisStore;

const downButton = () => screen.getByRole('button', { name: 'הזז מטה, החזק להורדה רציפה' });
const pieceRow = () => store.getState().position.y;

beforeEach(() => {
  vi.useFakeTimers();
  store.setState({
    board: EMPTY_BOARD,
    currentPiece: { type: 'O', blocks: TETROMINOES.O!.blocks, color: 'cyan' },
    position: { x: 4, y: 0 },
    phase: 'playing',
    clearingRows: [],
    score: 0,
    level: 1,
    linesCleared: 0,
  } as unknown as Parameters<typeof store.setState>[0]);
});

afterEach(() => {
  vi.useRealTimers();
});

describe('tetris down button (touch controls)', () => {
  it('drops exactly one row for a tap, even with the compatibility mouse events a touch tap emits', () => {
    render(<TouchControls />);
    const button = downButton();

    // Event order a browser fires for a single finger tap.
    fireEvent.pointerDown(button, { pointerType: 'touch' });
    fireEvent.touchStart(button);
    act(() => {
      vi.advanceTimersByTime(120);
    });
    fireEvent.pointerUp(button, { pointerType: 'touch' });
    fireEvent.touchEnd(button);
    fireEvent.mouseDown(button);
    fireEvent.mouseUp(button);
    fireEvent.click(button);

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(pieceRow()).toBe(1);
  });

  it('keeps stepping down while held and stops on release', () => {
    render(<TouchControls />);
    const button = downButton();

    fireEvent.pointerDown(button, { pointerType: 'touch' });
    act(() => {
      vi.advanceTimersByTime(700);
    });
    const whileHeld = pieceRow();
    expect(whileHeld).toBeGreaterThan(3);

    fireEvent.pointerUp(button, { pointerType: 'touch' });
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(pieceRow()).toBe(whileHeld);
  });

  it('stops repeating when the touch is cancelled', () => {
    render(<TouchControls />);
    const button = downButton();

    fireEvent.pointerDown(button, { pointerType: 'touch' });
    act(() => {
      vi.advanceTimersByTime(500);
    });
    fireEvent.pointerCancel(button, { pointerType: 'touch' });
    const afterCancel = pieceRow();
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(pieceRow()).toBe(afterCancel);
  });
});
