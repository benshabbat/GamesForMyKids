'use client';

import type { Balloon } from '../useBalloonPopGame';

interface Props {
  containerRef: React.RefObject<HTMLDivElement | null>;
  balloons: Balloon[];
  onPop: (id: number) => void;
}

export default function BalloonGameArea({ containerRef, balloons, onPop }: Props) {
  return (
    <div
      ref={containerRef}
      className="flex-1 w-full max-w-sm relative overflow-hidden"
      style={{ minHeight: 480 }}
    >
      {balloons.map(b => {
        if (b.popped) {
          return (
            <div
              key={b.id}
              className="absolute pointer-events-none flex items-center justify-center text-2xl"
              style={{
                left: b.x - b.r,
                top: b.y - b.r,
                width: b.r * 2,
                height: b.r * 2,
                opacity: 1 - b.popAnim,
                transform: `scale(${1 + b.popAnim})`,
              }}
            >
              {b.isBomb ? '💥' : '✨'}
            </div>
          );
        }
        return (
          <button
            key={b.id}
            onClick={() => onPop(b.id)}
            className="absolute rounded-full flex items-center justify-center font-black text-white cursor-pointer active:scale-90 transition-transform shadow-lg"
            style={{
              left: b.x - b.r,
              top: b.y - b.r,
              width: b.r * 2,
              height: b.r * 2,
              background: b.isBomb
                ? '#1f2937'
                : `radial-gradient(circle at 35% 35%, ${b.color[0]}, ${b.color[1]})`,
              fontSize: b.r * 0.8,
            }}
          >
            {b.isBomb ? '💣' : ''}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-gray-600/50"
              style={{ height: b.r * 0.7, top: '100%' }}
            />
          </button>
        );
      })}
    </div>
  );
}
