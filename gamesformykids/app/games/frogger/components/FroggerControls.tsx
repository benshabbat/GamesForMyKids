'use client';

interface Props {
  onMove: (dx: number, dy: number) => void;
}

export default function FroggerControls({ onMove }: Props) {
  return (
    <div className="mt-3 grid grid-cols-3 gap-2" style={{ width: 164 }}>
      <div />
      <button
        onPointerDown={() => onMove(0, -1)}
        className="bg-green-700/80 text-white rounded-xl py-3 text-xl font-bold active:bg-green-500 touch-none"
      >▲</button>
      <div />
      <button
        onPointerDown={() => onMove(-1, 0)}
        className="bg-green-700/80 text-white rounded-xl py-3 text-xl font-bold active:bg-green-500 touch-none"
      >◀</button>
      <button
        onPointerDown={() => onMove(0, 1)}
        className="bg-green-700/80 text-white rounded-xl py-3 text-xl font-bold active:bg-green-500 touch-none"
      >▼</button>
      <button
        onPointerDown={() => onMove(1, 0)}
        className="bg-green-700/80 text-white rounded-xl py-3 text-xl font-bold active:bg-green-500 touch-none"
      >▶</button>
    </div>
  );
}
