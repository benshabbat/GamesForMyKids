'use client';

type Dir = 'U' | 'D' | 'L' | 'R';

interface Props {
  onControl: (dir: Dir) => void;
}

export default function SnakeTouchControls({ onControl }: Props) {
  return (
    <div className="mt-4 grid grid-cols-3 gap-2 w-36">
      <div />
      <button
        onPointerDown={() => onControl('U')}
        className="bg-green-700/80 text-white rounded-xl py-3 text-xl font-bold active:bg-green-500 touch-none"
      >▲</button>
      <div />
      <button
        onPointerDown={() => onControl('L')}
        className="bg-green-700/80 text-white rounded-xl py-3 text-xl font-bold active:bg-green-500 touch-none"
      >◀</button>
      <button
        onPointerDown={() => onControl('D')}
        className="bg-green-700/80 text-white rounded-xl py-3 text-xl font-bold active:bg-green-500 touch-none"
      >▼</button>
      <button
        onPointerDown={() => onControl('R')}
        className="bg-green-700/80 text-white rounded-xl py-3 text-xl font-bold active:bg-green-500 touch-none"
      >▶</button>
    </div>
  );
}
