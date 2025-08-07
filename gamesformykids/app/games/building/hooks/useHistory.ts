import { useState, useCallback } from 'react';
import { Block } from '../types';

export const useHistory = (
  blocks: Block[],
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>
) => {
  const [history, setHistory] = useState<Block[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const addToHistory = useCallback((newBlocks: Block[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push([...newBlocks]);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setBlocks([...history[newIndex]]);
    }
  }, [history, historyIndex, setBlocks]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setBlocks([...history[newIndex]]);
    }
  }, [history, historyIndex, setBlocks]);

  return {
    history,
    historyIndex,
    addToHistory,
    undo,
    redo
  };
};
