"use client";

import { useState, useCallback } from "react";

export type PuzzleGameMode = "menu" | "simple" | "custom";

export interface UsePuzzlePageReturn {
  gameMode: PuzzleGameMode;
  setSimpleMode: () => void;
  setCustomMode: () => void;
  setMenuMode: () => void;
}

export function usePuzzlePage(): UsePuzzlePageReturn {
  const [gameMode, setGameMode] = useState<PuzzleGameMode>("menu");

  const setSimpleMode = useCallback(() => setGameMode("simple"), []);
  const setCustomMode = useCallback(() => setGameMode("custom"), []);
  const setMenuMode = useCallback(() => setGameMode("menu"), []);

  return { gameMode, setSimpleMode, setCustomMode, setMenuMode };
}
