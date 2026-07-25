import { useRef } from 'react';
import { GameBoardProps } from '../types';
import { useTetrisStore } from '../store/tetrisStore';

// Below this many pixels a touch gesture counts as a tap (rotate) rather than a swipe.
const SWIPE_THRESHOLD = 25;

const GameBoard = ({ displayBoard }: GameBoardProps) => {
  const phase = useTetrisStore(s => s.phase);
  const clearingRows = useTetrisStore(s => s.clearingRows);
  const movePiece = useTetrisStore(s => s.movePiece);
  const handleRotate = useTetrisStore(s => s.handleRotate);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStart.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (phase !== 'playing' || !start) return;

    const touch = e.changedTouches[0];
    if (!touch) return;

    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;

    if (Math.abs(dx) < SWIPE_THRESHOLD && Math.abs(dy) < SWIPE_THRESHOLD) {
      handleRotate();
      return;
    }

    if (Math.abs(dx) > Math.abs(dy)) {
      movePiece(dx > 0 ? 1 : -1, 0);
    } else if (dy > 0) {
      movePiece(0, 1);
    }
  };

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-lg rounded-3xl p-3 lg:p-4 shadow-2xl border border-white/20 touch-none"
    >
      {phase === 'paused' && (
        <div className="absolute inset-3 lg:inset-4 flex items-center justify-center bg-black/70 backdrop-blur-sm rounded-2xl z-10">
          <div className="text-center">
            <p className="text-6xl mb-2">⏸️</p>
            <p className="text-white font-black text-xl drop-shadow-lg">מושהה</p>
          </div>
        </div>
      )}
      <div dir="ltr" style={{ direction: 'ltr' }} className="grid grid-cols-10 gap-0.5 lg:gap-1 bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-2 lg:p-3 rounded-2xl border border-gray-600/50">
        {displayBoard.map((row, y) =>
          row.map((cell, x) => {
            const isEmpty = !cell || cell === 0;
            const isClearing = clearingRows.includes(y);
            return (
              <div
                key={`${y}-${x}`}
                className={`w-6 h-6 lg:w-7 lg:h-7 rounded-md border border-gray-600/50 ${isEmpty ? '' : 'transform transition duration-150'} ${isClearing ? 'animate-pulse' : ''}`}
                style={{
                  background: isClearing
                    ? '#ffffff'
                    : isEmpty
                    ? 'linear-gradient(135deg, #1f2937 0%, #111827 100%)'
                    : cell,
                  boxShadow: isClearing
                    ? '0 0 16px 4px rgba(255,255,255,0.9)'
                    : isEmpty
                    ? 'inset 0 1px 2px rgba(0,0,0,0.3)'
                    : '0 1px 4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
                  willChange: isEmpty ? 'auto' : 'transform'
                }}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default GameBoard;
