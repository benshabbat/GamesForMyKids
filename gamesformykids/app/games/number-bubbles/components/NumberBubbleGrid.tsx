'use client';

interface Bubble {
  id: number;
  num: number;
  x: number;
  y: number;
  color: string;
  popped: boolean;
}

interface Props {
  bubbles: Bubble[];
  next: number;
  level: number;
  onTap: (bubble: Bubble, next: number, level: number) => void;
}

export default function NumberBubbleGrid({ bubbles, next, level, onTap }: Props) {
  return (
    <div className="relative w-full" style={{ height: '70vh', maxWidth: 400 }}>
      {bubbles.map(b => (
        <button
          key={b.id}
          onClick={() => onTap(b, next, level)}
          style={{ position: 'absolute', left: `${b.x}%`, top: `${b.y}%`, transform: 'translate(-50%,-50%)' }}
          className={`w-14 h-14 rounded-full font-black text-xl text-white shadow-lg flex items-center justify-center transition-all duration-200 ${
            b.popped
              ? 'opacity-0 scale-150 pointer-events-none'
              : `${b.color} active:scale-90 hover:scale-110 ${b.num === next ? 'ring-4 ring-white ring-offset-2 ring-offset-transparent scale-110 animate-pulse' : ''}`
          }`}
        >
          {b.num}
        </button>
      ))}
    </div>
  );
}
