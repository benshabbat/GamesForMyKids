const DIE_FACES = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

interface DieChipProps {
  face: number;
  used: boolean;
}

export function DieChip({ face, used }: DieChipProps) {
  return (
    <div className={[
      'w-9 h-9 rounded-lg flex items-center justify-center text-2xl',
      'border-2 shadow-lg transition-all duration-300',
      used
        ? 'bg-gray-700/60 border-gray-600 opacity-40 scale-90'
        : 'bg-white border-gray-300 scale-100',
    ].join(' ')}>
      {DIE_FACES[face]}
    </div>
  );
}
