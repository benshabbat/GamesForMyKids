'use client';

interface Props {
  onDrop: () => void;
}

export default function StackDropButton({ onDrop }: Props) {
  return (
    <button
      onClick={onDrop}
      className="mt-4 bg-blue-600/80 text-white rounded-2xl px-14 py-4 font-black text-2xl active:bg-blue-400 transition-all touch-none"
    >
      ⬇ הפל!
    </button>
  );
}
