'use client';

import React, { createContext, useContext } from 'react';
import { useWritingCanvas } from './useWritingCanvas';

type WritingCanvasContextValue = ReturnType<typeof useWritingCanvas>;

const WritingCanvasContext = createContext<WritingCanvasContextValue | null>(null);

export function useWritingCanvasContext(): WritingCanvasContextValue {
  const ctx = useContext(WritingCanvasContext);
  if (!ctx) throw new Error('useWritingCanvasContext must be used inside WritingCanvasProvider');
  return ctx;
}

interface WritingCanvasProviderProps {
  value: WritingCanvasContextValue;
  children: React.ReactNode;
}

export function WritingCanvasProvider({ value, children }: WritingCanvasProviderProps) {
  return (
    <WritingCanvasContext.Provider value={value}>
      {children}
    </WritingCanvasContext.Provider>
  );
}
