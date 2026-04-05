'use client';

interface Props {
  pressLeft: () => void;
  releaseLeft: () => void;
  pressRight: () => void;
  releaseRight: () => void;
}

export default function JumperControls({ pressLeft, releaseLeft, pressRight, releaseRight }: Props) {
  return (
    <div className="mt-3 flex gap-4">
      <button
        onPointerDown={pressLeft}
        onPointerUp={releaseLeft}
        onPointerLeave={releaseLeft}
        className="bg-indigo-700/80 text-white rounded-xl px-10 py-3 text-xl font-bold active:bg-indigo-500 touch-none"
      >
        ◄
      </button>
      <button
        onPointerDown={pressRight}
        onPointerUp={releaseRight}
        onPointerLeave={releaseRight}
        className="bg-indigo-700/80 text-white rounded-xl px-10 py-3 text-xl font-bold active:bg-indigo-500 touch-none"
      >
        ▶
      </button>
    </div>
  );
}
