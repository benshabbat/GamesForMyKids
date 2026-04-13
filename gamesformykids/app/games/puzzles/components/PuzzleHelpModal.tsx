'use client';

import { usePuzzleContext } from '@/contexts';

interface PuzzleHelpModalProps {
  size?: 'sm' | 'lg';
  children: React.ReactNode;
}

export default function PuzzleHelpModal({ size = 'sm', children }: PuzzleHelpModalProps) {
  const { showHelp, toggleHelp } = usePuzzleContext();
  if (!showHelp) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={toggleHelp}
    >
      <div
        className={
          size === 'lg'
            ? 'bg-white rounded-2xl p-8 max-w-2xl mx-4 max-h-[80vh] overflow-y-auto'
            : 'bg-white rounded-lg p-6 max-w-md w-full mx-4'
        }
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
