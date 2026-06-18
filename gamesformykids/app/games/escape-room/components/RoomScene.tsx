'use client';
import type { Room } from './puzzleData';

type Props = {
  room: Room;
  solvedIds: Set<string>;
  onClickHotspot: (id: string) => void;
};

export default function RoomScene({ room, solvedIds, onClickHotspot }: Props) {
  return (
    <div className={`relative w-full aspect-[16/9] rounded-3xl bg-gradient-to-br ${room.bg} border-4 border-white/50 shadow-2xl overflow-hidden select-none`}>
      {/* Floor line */}
      <div className="absolute bottom-[28%] left-0 right-0 h-1 bg-white/20 rounded-full" />

      {/* Hotspots */}
      {room.hotspots.map((hotspot) => {
        const isSolved = solvedIds.has(hotspot.id);
        const hasPuzzle = hotspot.puzzle !== null;
        return (
          <button
            key={hotspot.id}
            onClick={() => onClickHotspot(hotspot.id)}
            disabled={isSolved && hasPuzzle}
            style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-0.5 transition duration-200 ${
              isSolved && hasPuzzle
                ? 'opacity-60 cursor-default'
                : 'hover:scale-125 active:scale-110 cursor-pointer'
            }`}
            title={hotspot.label}
          >
            <span className="text-3xl sm:text-4xl drop-shadow-md leading-none">
              {hotspot.emoji}
            </span>
            {isSolved && hasPuzzle && (
              <span className="text-base leading-none">✅</span>
            )}
            {hasPuzzle && !isSolved && (
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-bounce" />
            )}
            <span className="text-xs font-bold text-gray-700 bg-white/70 rounded-full px-1.5 leading-tight" dir="rtl">
              {hotspot.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
