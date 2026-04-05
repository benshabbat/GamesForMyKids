'use client';
import { useRef } from 'react';

export function useCustomPuzzleGame() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  return { fileInputRef };
}
