'use client';
import { useRef, useState, useCallback, useEffect } from 'react';
import type { PlacedWord } from '../wordSearchStore';
import { GRID_SIZE } from '../wordSearchStore';

type CellCoord = [number, number];

type Props = {
  grid: string[][];
  placed: PlacedWord[];
  found: Set<string>;
  onSelect: (cells: CellCoord[]) => boolean;
};

const FOUND_COLORS = [
  'bg-yellow-300', 'bg-green-300', 'bg-blue-300', 'bg-pink-300',
  'bg-purple-300', 'bg-orange-300', 'bg-teal-300', 'bg-red-300',
];

function getLineCells(start: CellCoord, end: CellCoord): CellCoord[] {
  const [r0, c0] = start;
  const [r1, c1] = end;
  const dr = r1 - r0;
  const dc = c1 - c0;
  const steps = Math.max(Math.abs(dr), Math.abs(dc));
  if (steps === 0) return [start];
  const isDiagonal = Math.abs(dr) === Math.abs(dc);
  const isHoriz = dr === 0;
  const isVert = dc === 0;
  if (!isHoriz && !isVert && !isDiagonal) return [start];
  const sr = dr === 0 ? 0 : dr / Math.abs(dr);
  const sc = dc === 0 ? 0 : dc / Math.abs(dc);
  return Array.from({ length: steps + 1 }, (_, i) => [r0 + i * sr, c0 + i * sc] as CellCoord);
}

function cellKey(r: number, c: number) { return `${r},${c}`; }

export default function SearchGrid({ grid, placed, found, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrongFlashTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(wrongFlashTimerRef.current), []);
  const [dragging, setDragging] = useState(false);
  const [startCell, setStartCell] = useState<CellCoord | null>(null);
  const [currentCell, setCurrentCell] = useState<CellCoord | null>(null);
  const [wrongFlash, setWrongFlash] = useState<Set<string>>(new Set());

  const foundColorMap: Record<string, string> = {};
  placed.filter(pw => found.has(pw.word)).forEach((pw, i) => {
    pw.cells.forEach(([r, c]) => {
      foundColorMap[cellKey(r, c)] = FOUND_COLORS[i % FOUND_COLORS.length]!;
    });
  });

  const getCellFromPoint = useCallback((clientX: number, clientY: number): CellCoord | null => {
    const el = containerRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const cellW = rect.width / GRID_SIZE;
    const cellH = rect.height / GRID_SIZE;
    const col = Math.floor((clientX - rect.left) / cellW);
    const row = Math.floor((clientY - rect.top) / cellH);
    if (row < 0 || row >= GRID_SIZE || col < 0 || col >= GRID_SIZE) return null;
    return [row, col];
  }, []);

  const selection = (startCell && currentCell) ? getLineCells(startCell, currentCell) : [];
  const selectionKeys = new Set(selection.map(([r, c]) => cellKey(r, c)));

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    const cell = getCellFromPoint(e.clientX, e.clientY);
    if (!cell) return;
    containerRef.current?.setPointerCapture(e.pointerId);
    setDragging(true);
    setStartCell(cell);
    setCurrentCell(cell);
  }, [getCellFromPoint]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging) return;
    e.preventDefault();
    const cell = getCellFromPoint(e.clientX, e.clientY);
    if (cell) setCurrentCell(cell);
  }, [dragging, getCellFromPoint]);

  const handlePointerUp = useCallback((_e: React.PointerEvent) => {
    if (!dragging || !startCell || !currentCell) return;
    setDragging(false);
    const cells = getLineCells(startCell, currentCell);
    if (cells.length < 2) { setStartCell(null); setCurrentCell(null); return; }
    const found = onSelect(cells);
    if (!found) {
      const keys = new Set(cells.map(([r, c]) => cellKey(r, c)));
      setWrongFlash(keys);
      clearTimeout(wrongFlashTimerRef.current);
      wrongFlashTimerRef.current = setTimeout(() => setWrongFlash(new Set()), 400);
    }
    setStartCell(null);
    setCurrentCell(null);
  }, [dragging, startCell, currentCell, onSelect]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square select-none touch-none cursor-crosshair"
      style={{ userSelect: 'none' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <div
        className="grid w-full h-full"
        style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`, gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)` }}
      >
        {grid.map((row, r) =>
          row.map((letter, c) => {
            const key = cellKey(r, c);
            const isSel = selectionKeys.has(key);
            const isWrong = wrongFlash.has(key);
            const foundColor = foundColorMap[key];
            return (
              <div
                key={key}
                className={`flex items-center justify-center border border-white/10 font-extrabold text-lg sm:text-xl transition-colors duration-100 ${
                  isWrong
                    ? 'bg-red-400 text-white scale-110'
                    : isSel
                    ? 'bg-yellow-300 text-gray-900 scale-105'
                    : foundColor
                    ? `${foundColor} text-gray-900`
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {letter}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
