'use client';

import { ReactNode } from 'react';
import { X } from 'lucide-react';
import { useEscapeKey } from '@/hooks/shared/useEscapeKey';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  /** Card sizing/scroll classes, e.g. "max-w-2xl max-h-[80vh] overflow-y-auto". Default fits a small modal. */
  cardClassName?: string;
  children: ReactNode;
}

/**
 * Shared "how to play" modal shell — backdrop-click-to-close, Escape-to-close,
 * and the dialog card with a title + close button. Pass the body as children.
 */
export default function HelpModalShell({ isOpen, onClose, title, cardClassName = 'rounded-lg p-6 max-w-md w-full', children }: Props) {
  useEscapeKey(onClose, isOpen);
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className={`bg-white mx-4 ${cardClassName}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
