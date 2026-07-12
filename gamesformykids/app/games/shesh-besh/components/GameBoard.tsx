import { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useGameBoard } from '../hooks';
import { BoardPoint } from './BoardPoint';
import { Bar } from './Bar';
import { BorneOff } from './BorneOff';
import { PIECE_MOVE_MS } from '../sheshBeshAnimation';
import type { Side } from '../types';

const TOP_POINTS = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
const BOT_POINTS = [12, 11, 10,  9,  8,  7,  6,  5,  4,  3,  2,  1];

// Natural board proportions (12 points @ 1 unit + bar 0.33 + tray 0.53 wide; 2 point-rows + label row tall).
const BOARD_ASPECT = '584 / 272';
const PIECE_ASPECT = 17 / 28; // matches PieceStack's disc aspect ratio

type Flight = { x1: number; y1: number; x2: number; y2: number; w: number; h: number; side: Side; key: string };

export function GameBoard() {
  const { points, barPlayer, barComputer, selected, validMoves, selectPoint, animatingMove } = useGameBoard();
  const validTargets = new Set(validMoves.map(m => m.to));

  const boardRef           = useRef<HTMLDivElement | null>(null);
  const pointRefs           = useRef<Map<number, HTMLButtonElement>>(new Map());
  const barPlayerRef        = useRef<HTMLButtonElement | null>(null);
  const barComputerRef      = useRef<HTMLDivElement | null>(null);
  const borneOffPlayerRef   = useRef<HTMLButtonElement | null>(null);
  const borneOffComputerRef = useRef<HTMLDivElement | null>(null);

  const [flight, setFlight] = useState<Flight | null>(null);

  useLayoutEffect(() => {
    if (!animatingMove || !boardRef.current) { setFlight(null); return; }
    const slotEl = (idx: number, side: Side): HTMLElement | null => {
      if (idx === -1) return side === 'player' ? barPlayerRef.current : barComputerRef.current;
      if (idx === 0) return borneOffPlayerRef.current;
      if (idx === 25) return borneOffComputerRef.current;
      return pointRefs.current.get(idx) ?? null;
    };
    const fromEl = slotEl(animatingMove.from, animatingMove.side);
    const toEl = slotEl(animatingMove.to, animatingMove.side);
    if (!fromEl || !toEl) { setFlight(null); return; }
    const boardBox = boardRef.current.getBoundingClientRect();
    const fromBox = fromEl.getBoundingClientRect();
    const toBox = toEl.getBoundingClientRect();
    // Size the flying disc relative to the actual rendered slot size, so it matches
    // the board at any viewport width instead of a fixed pixel size.
    const w = Math.max(14, Math.min(fromBox.width, toBox.width) * 0.7);
    const h = w * PIECE_ASPECT;
    setFlight({
      x1: fromBox.left - boardBox.left + fromBox.width / 2 - w / 2,
      y1: fromBox.top - boardBox.top + fromBox.height / 2 - h / 2,
      x2: toBox.left - boardBox.left + toBox.width / 2 - w / 2,
      y2: toBox.top - boardBox.top + toBox.height / 2 - h / 2,
      w, h,
      side: animatingMove.side,
      key: `${animatingMove.from}-${animatingMove.to}-${animatingMove.side}-${Date.now()}`,
    });
  }, [animatingMove]);

  // Hide the moving piece at its origin while it's mid-flight so it isn't rendered twice.
  const displayPoints = animatingMove
    ? points.map((p, idx) => {
        if (idx !== animatingMove.from) return p;
        const p2 = { ...p };
        if (animatingMove.side === 'player') p2.player = Math.max(0, p2.player - 1);
        else p2.computer = Math.max(0, p2.computer - 1);
        return p2;
      })
    : points;
  const displayBarPlayer = animatingMove?.from === -1 && animatingMove.side === 'player' ? barPlayer - 1 : barPlayer;
  const displayBarComputer = animatingMove?.from === -1 && animatingMove.side === 'computer' ? barComputer - 1 : barComputer;

  const registerPointRef = (i: number) => (el: HTMLButtonElement | null) => {
    if (el) pointRefs.current.set(i, el); else pointRefs.current.delete(i);
  };

  return (
    /* Walnut outer frame */
    <div
      className="w-full rounded-2xl p-[1.2%] shadow-[0_24px_64px_rgba(0,0,0,0.9)] ring-1 ring-black/60"
      style={{ background: 'linear-gradient(155deg,#92400e 0%,#3b1505 45%,#92400e 100%)' }}
    >
      {/* Felt surface — fixed aspect ratio so it scales fluidly with the wrapper's width */}
      <div
        ref={boardRef}
        className="relative flex w-full bg-[#0b3d1b] rounded-xl overflow-hidden border border-black/40"
        style={{ aspectRatio: BOARD_ASPECT }}
      >

        {/* Left quad: 13–18 top / 12–7 bottom */}
        <div className="flex flex-col h-full" style={{ flex: '480 480 0%' }}>
          <div className="flex" style={{ flex: '120 120 0%' }}>
            {TOP_POINTS.slice(0, 6).map(i => (
              <BoardPoint key={i} idx={i} pt={displayPoints[i]!} isTop
                isSelected={selected === i} isTarget={validTargets.has(i)}
                onClick={() => selectPoint(i)} registerRef={registerPointRef(i)} />
            ))}
          </div>
          <div className="flex items-center justify-center" style={{ flex: '32 32 0%' }}>
            <span className="text-[clamp(6px,1.4vw,10px)] text-amber-700/40 font-bold select-none">← מחשב</span>
          </div>
          <div className="flex" style={{ flex: '120 120 0%' }}>
            {BOT_POINTS.slice(0, 6).map(i => (
              <BoardPoint key={i} idx={i} pt={displayPoints[i]!} isTop={false}
                isSelected={selected === i} isTarget={validTargets.has(i)}
                onClick={() => selectPoint(i)} registerRef={registerPointRef(i)} />
            ))}
          </div>
        </div>

        {/* Bar */}
        <Bar
          playerBar={displayBarPlayer} compBar={displayBarComputer}
          isSelected={selected === -1}
          onClickPlayer={() => barPlayer > 0 && selectPoint(-1)}
          playerRef={(el) => { barPlayerRef.current = el; }}
          computerRef={(el) => { barComputerRef.current = el; }}
        />

        {/* Right quad: 19–24 top / 6–1 bottom */}
        <div className="flex flex-col h-full" style={{ flex: '480 480 0%' }}>
          <div className="flex" style={{ flex: '120 120 0%' }}>
            {TOP_POINTS.slice(6).map(i => (
              <BoardPoint key={i} idx={i} pt={displayPoints[i]!} isTop
                isSelected={selected === i} isTarget={validTargets.has(i)}
                onClick={() => selectPoint(i)} registerRef={registerPointRef(i)} />
            ))}
          </div>
          <div className="flex items-center justify-center" style={{ flex: '32 32 0%' }}>
            <span className="text-[clamp(6px,1.4vw,10px)] text-amber-700/40 font-bold select-none">אתה →</span>
          </div>
          <div className="flex" style={{ flex: '120 120 0%' }}>
            {BOT_POINTS.slice(6).map(i => (
              <BoardPoint key={i} idx={i} pt={displayPoints[i]!} isTop={false}
                isSelected={selected === i} isTarget={validTargets.has(i)}
                onClick={() => selectPoint(i)} registerRef={registerPointRef(i)} />
            ))}
          </div>
        </div>

        {/* Borne-off tray */}
        <BorneOff
          playerCount={displayPoints[0]?.player ?? 0}
          compCount={displayPoints[25]?.computer ?? 0}
          onBearOff={() => selectPoint(0)}
          isBearOffTarget={validTargets.has(0) && selected !== null}
          playerRef={(el) => { borneOffPlayerRef.current = el; }}
          computerRef={(el) => { borneOffComputerRef.current = el; }}
        />

        {/* Flying piece overlay — slides from source to destination before the real state commits */}
        {flight && (
          <motion.div
            key={flight.key}
            initial={{ x: flight.x1, y: flight.y1 }}
            animate={{ x: flight.x2, y: flight.y2 }}
            transition={{ duration: PIECE_MOVE_MS / 1000, ease: 'easeInOut' }}
            className="absolute top-0 left-0 z-30 pointer-events-none rounded-full border-2 shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
            style={{
              width: flight.w, height: flight.h,
              ...(flight.side === 'player'
                ? { background: 'linear-gradient(to bottom right, #fda4af, #f43f5e, #881337)', borderColor: 'rgba(254,205,211,0.6)' }
                : { background: 'linear-gradient(to bottom right, #ffffff, #f1f5f9, #94a3b8)', borderColor: 'rgba(255,255,255,0.7)' }),
            }}
          />
        )}
      </div>
    </div>
  );
}
