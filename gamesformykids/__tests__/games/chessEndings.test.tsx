// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, render, renderHook } from '@testing-library/react';
import { INIT, INIT_CASTLING } from '@/app/games/chess/logic/chessBoardUtils';
import type { Board, GamePhase, Piece } from '@/app/games/chess/logic/chessTypes';

const { saveSpy, bestMoveMock } = vi.hoisted(() => ({
  saveSpy: vi.fn(),
  bestMoveMock: vi.fn(),
}));

vi.mock('@/hooks/shared/progress/useGameCompletion', () => ({
  useGameCompletion: () => ({ saveGameResult: saveSpy, saveGameResultRef: { current: saveSpy } }),
}));
vi.mock('@/app/games/chess/logic/chessAI', () => ({ bestComputerMove: bestMoveMock }));

import { useChessStore } from '@/app/games/chess/store/useChessStore';
import { useChessAI } from '@/app/games/chess/store/useChessAI';
import ChessGameOver from '@/app/games/chess/components/ChessGameOver';

function board(pieces: Record<string, Piece>): Board {
  const b: Board = Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => null));
  for (const [key, piece] of Object.entries(pieces)) {
    const [r, c] = key.split(',').map(Number);
    b[r!]![c!] = piece;
  }
  return b;
}

const NO_CASTLING = { wK: false, wQ: false, bK: false, bQ: false };

function setGame(over: Partial<ReturnType<typeof useChessStore.getState>>) {
  useChessStore.setState({ ...INIT, castling: NO_CASTLING, ...over });
}

beforeEach(() => {
  saveSpy.mockClear();
  bestMoveMock.mockReset();
  setGame({ phase: 'menu', castling: INIT_CASTLING });
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe('chess endings — the child moves', () => {
  it('stalemating the computer is a draw, not a win', () => {
    // Black king a8 is boxed in by a queen on b6 but not in check
    setGame({
      phase: 'playing',
      turn: 'w',
      board: board({ '7,4': 'wK', '2,3': 'wQ', '0,0': 'bK' }),
    });

    useChessStore.getState().selectSquare({ row: 2, col: 3 });
    useChessStore.getState().selectSquare({ row: 2, col: 1 });

    const s = useChessStore.getState();
    expect(s.phase).toBe('stalemate');
    expect(s.playerScore).toBe(0);
    expect(s.message).toContain('פאט');
    expect(s.message).toContain('תיקו');
    expect(s.message).not.toContain('ניצחת');
  });

  it('checkmating the computer is a win', () => {
    setGame({
      phase: 'playing',
      turn: 'w',
      board: board({ '2,1': 'wK', '7,7': 'wR', '0,0': 'bK' }),
    });

    useChessStore.getState().selectSquare({ row: 7, col: 7 });
    useChessStore.getState().selectSquare({ row: 0, col: 7 });

    const s = useChessStore.getState();
    expect(s.phase).toBe('checkmate');
    expect(s.turn).toBe('w');
    expect(s.playerScore).toBe(1);
  });
});

describe('chess endings — the computer moves', () => {
  it('stalemating the child is a draw, not a computer win', () => {
    vi.useFakeTimers();
    setGame({
      phase: 'playing',
      turn: 'b',
      board: board({ '7,0': 'wK', '2,6': 'bK', '5,4': 'bQ' }),
    });
    bestMoveMock.mockReturnValue({ from: { row: 5, col: 4 }, to: { row: 5, col: 1 } });

    renderHook(() => useChessAI());
    act(() => { vi.advanceTimersByTime(700); });

    const s = useChessStore.getState();
    expect(s.phase).toBe('stalemate');
    expect(s.computerScore).toBe(0);
    expect(s.playerScore).toBe(0);
    expect(s.message).toContain('תיקו');
    expect(s.message).not.toContain('המחשב ניצח');
  });

  it('checkmating the child is a computer win', () => {
    vi.useFakeTimers();
    setGame({
      phase: 'playing',
      turn: 'b',
      board: board({ '7,0': 'wK', '5,1': 'bK', '3,4': 'bQ' }),
    });
    bestMoveMock.mockReturnValue({ from: { row: 3, col: 4 }, to: { row: 7, col: 4 } });

    renderHook(() => useChessAI());
    act(() => { vi.advanceTimersByTime(700); });

    const s = useChessStore.getState();
    expect(s.phase).toBe('checkmate');
    expect(s.turn).toBe('b');
    expect(s.computerScore).toBe(1);
  });
});

describe('ChessGameOver picks its screen from the phase', () => {
  function renderEnding(phase: GamePhase, turn: 'w' | 'b', message: string) {
    setGame({ phase, turn, message, board: board({ '7,4': 'wK', '0,4': 'bK' }) });
    return render(<ChessGameOver />);
  }

  it('shows the draw screen for a stalemate caused by either side, whatever the message says', () => {
    // Messages that used to fool the old text-matching ("ניצחת" / "ניצח") must not matter
    const { container, unmount } = renderEnding('stalemate', 'w', 'פאט! ניצחת!');
    expect(container.textContent).toContain('🤝');
    expect(container.textContent).toContain('משחק מאוזן');
    expect(container.textContent).not.toContain('⭐');
    unmount();

    const again = renderEnding('stalemate', 'b', 'פאט! המחשב ניצח.');
    expect(again.container.textContent).toContain('🤝');
    expect(again.container.textContent).not.toContain('😢');
  });

  it('shows the win screen when the child delivered mate', () => {
    const { container } = renderEnding('checkmate', 'w', '🏆 שחמט! ניצחת!');
    expect(container.textContent).toContain('🏆');
    expect(container.textContent).toContain('כל הכבוד');
  });

  it('shows the loss screen when the computer delivered mate', () => {
    const { container } = renderEnding('checkmate', 'b', '😢 שחמט! המחשב ניצח.');
    expect(container.textContent).toContain('😢');
    expect(container.textContent).not.toContain('🏆');
  });
});
