'use client';

import React, { createContext, use } from 'react';
import { useWritingCanvas } from './useWritingCanvas';

type WritingCanvasContextValue = ReturnType<typeof useWritingCanvas> & {
  guideLetter?: string | undefined;
};

const WritingCanvasContext = createContext<WritingCanvasContextValue | null>(null);

export function useWritingCanvasContext(): WritingCanvasContextValue {
  const ctx = use(WritingCanvasContext);
  if (!ctx) throw new Error('useWritingCanvasContext must be used inside WritingCanvasProvider');
  return ctx;
}

interface WritingCanvasProviderProps {
  value: ReturnType<typeof useWritingCanvas>;
  guideLetter?: string | undefined;
  children: React.ReactNode;
}

export function WritingCanvasProvider({ value, guideLetter, children }: WritingCanvasProviderProps) {
  const contextValue: WritingCanvasContextValue = { ...value, guideLetter };
  return (
    <WritingCanvasContext value={contextValue}>
      {children}
    </WritingCanvasContext>
  );
}
