'use client';

import { PATH, GRID_ROWS, GRID_COLS, CELL_PX, isOnPath } from '../letterDefenderStore';
import type { Enemy, Tower } from '../letterDefenderStore';

interface Props {
  enemies: Enemy[];
  towers: Tower[];
  onCellClick: (row: number, col: number) => void;
}


export default function DefenderGrid({ enemies, towers, onCellClick }: Props) {
  const w = GRID_COLS * CELL_PX;
  const h = GRID_ROWS * CELL_PX;

  return (
    <div
      className="relative rounded-2xl overflow-hidden border-2 border-gray-300 shadow-inner"
      style={{ width: w, height: h, background: '#e8f4e8' }}
    >
      {/* Path cells */}
      {PATH.map(([r, c], i) => (
        <div
          key={`p${r}-${c}`}
          className="absolute bg-amber-100 border border-amber-300 flex items-center justify-center text-xs text-amber-400 select-none"
          style={{ top: r * CELL_PX, left: c * CELL_PX, width: CELL_PX, height: CELL_PX }}
        >
          {i === 0 && <span className="text-green-600 font-bold text-sm">▶</span>}
          {i === PATH.length - 1 && <span className="text-red-500 font-bold text-sm">🏁</span>}
        </div>
      ))}

      {/* Non-path cells — clickable for tower placement */}
      {Array.from({ length: GRID_ROWS }, (_, r) =>
        Array.from({ length: GRID_COLS }, (_, c) => {
          if (isOnPath(r, c)) return null;
          const hasTower = towers.some(t => t.row === r && t.col === c);
          return (
            <div
              key={`c${r}-${c}`}
              onClick={() => onCellClick(r, c)}
              className={`absolute border border-gray-200 flex items-center justify-center cursor-pointer select-none transition-colors duration-150 ${hasTower ? 'bg-blue-100 border-blue-300' : 'bg-green-50 hover:bg-green-100'}`}
              style={{ top: r * CELL_PX, left: c * CELL_PX, width: CELL_PX, height: CELL_PX }}
            >
              {hasTower && <span className="text-2xl">🏰</span>}
            </div>
          );
        })
      )}

      {/* Enemies */}
      {enemies.map(enemy => {
        const idx = Math.min(enemy.pathIndex, PATH.length - 1);
        const pos = PATH[idx];
        if (!pos) return null;
        const [r, c] = pos;
        return (
          <div
            key={enemy.id}
            className="absolute flex items-center justify-center rounded-lg border-2 font-bold text-xs select-none"
            style={{
              top: r * CELL_PX + 5,
              left: c * CELL_PX + 5,
              width: CELL_PX - 10,
              height: CELL_PX - 10,
              transition: 'top 0.8s ease, left 0.8s ease, opacity 0.5s, transform 0.5s',
              opacity: enemy.dying ? 0 : 1,
              transform: enemy.dying ? 'scale(0) rotate(90deg)' : 'scale(1)',
              background: 'linear-gradient(135deg, #fee2e2, #fecaca)',
              borderColor: '#f87171',
              color: '#b91c1c',
              zIndex: 10,
            }}
          >
            {enemy.label}
          </div>
        );
      })}
    </div>
  );
}
