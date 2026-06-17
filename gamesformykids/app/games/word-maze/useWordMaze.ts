'use client';
import { useState, useCallback, useRef, useEffect } from 'react';
import { MAZE_WORDS, type DifficultyLevel } from '@/lib/constants/wordMazeWords';
import { speakHebrew } from '@/lib/utils/speech/enhancedSpeechUtils';

export const GRID_SIZE = 13;
export const CELL_SIZE = 34;

export type Grid = boolean[][];

export interface LetterCell {
  row: number;
  col: number;
  letter: string;
  index: number;
  collected: boolean;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = a[i] as T;
    a[i] = a[j] as T;
    a[j] = tmp;
  }
  return a;
}

function generateMaze(): Grid {
  const grid: Grid = Array.from({ length: GRID_SIZE }, () => new Array(GRID_SIZE).fill(false));
  for (let r = 1; r < GRID_SIZE; r += 2)
    for (let c = 1; c < GRID_SIZE; c += 2)
      (grid[r] as boolean[])[c] = true;

  const visited = new Set<number>();

  function dfs(r: number, c: number) {
    visited.add(r * GRID_SIZE + c);
    for (const [dr, dc] of shuffle([[0, 2], [0, -2], [2, 0], [-2, 0]]) as [number, number][]) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 1 && nr < GRID_SIZE - 1 && nc >= 1 && nc < GRID_SIZE - 1 && !visited.has(nr * GRID_SIZE + nc)) {
        (grid[r + Math.floor(dr / 2)] as boolean[])[c + Math.floor(dc / 2)] = true;
        dfs(nr, nc);
      }
    }
  }
  dfs(1, 1);
  return grid;
}

function bfsOrder(grid: Grid): [number, number][] {
  const visited = new Set<number>();
  const queue: [number, number][] = [[1, 1]];
  const order: [number, number][] = [];
  visited.add(1 * GRID_SIZE + 1);
  while (queue.length > 0) {
    const cell = queue.shift();
    if (!cell) break;
    const [r, c] = cell;
    order.push([r, c]);
    for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]] as [number, number][]) {
      const nr = r + dr, nc = c + dc;
      const key = nr * GRID_SIZE + nc;
      if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE && grid[nr]?.[nc] && !visited.has(key)) {
        visited.add(key);
        queue.push([nr, nc]);
      }
    }
  }
  return order;
}

export type Phase = 'menu' | 'playing' | 'win';

export function useWordMaze() {
  const [phase, setPhase] = useState<Phase>('menu');
  const [targetWord, setTargetWord] = useState('');
  const [nextLetterIndex, setNextLetterIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState<DifficultyLevel>('easy');
  const [wordsCompleted, setWordsCompleted] = useState(0);
  const [bouncing, setBouncing] = useState(false);

  const gridRef = useRef<Grid>([]);
  const playerRef = useRef({ row: 1, col: 1 });
  const lettersRef = useRef<LetterCell[]>([]);
  const nextIdxRef = useRef(0);
  const targetWordRef = useRef('');
  const phaseRef = useRef<Phase>('menu');

  const startGame = useCallback((lvl?: DifficultyLevel) => {
    const actualLevel = lvl ?? level;
    const wordList = MAZE_WORDS[actualLevel];
    const word = wordList[Math.floor(Math.random() * wordList.length)] ?? wordList[0] ?? '';
    const chars = Array.from(word);

    const grid = generateMaze();
    const order = bfsOrder(grid);

    const letters: LetterCell[] = chars.map((char, i) => {
      const idx = Math.min(Math.floor((i + 1) * (order.length / (chars.length + 1))), order.length - 1);
      const cellEntry = order[Math.max(1, idx)];
      const [row, col] = cellEntry ?? [1, 1];
      return { row, col, letter: char, index: i, collected: false };
    });

    gridRef.current = grid;
    playerRef.current = { row: 1, col: 1 };
    lettersRef.current = letters;
    nextIdxRef.current = 0;
    targetWordRef.current = word;
    phaseRef.current = 'playing';

    setTargetWord(word);
    setNextLetterIndex(0);
    setPhase('playing');
    speakHebrew(`מצא את האותיות של המילה: ${chars.join(' ')}`);
  }, [level]);

  const movePlayer = useCallback((dr: number, dc: number) => {
    if (phaseRef.current !== 'playing') return;
    const { row, col } = playerRef.current;
    const nr = row + dr, nc = col + dc;
    const grid = gridRef.current;
    if (nr < 0 || nr >= GRID_SIZE || nc < 0 || nc >= GRID_SIZE || !grid[nr]?.[nc]) return;

    playerRef.current = { row: nr, col: nc };

    const hit = lettersRef.current.find(l => l.row === nr && l.col === nc && !l.collected);
    if (hit) {
      if (hit.index === nextIdxRef.current) {
        hit.collected = true;
        speakHebrew(hit.letter);
        const newNext = nextIdxRef.current + 1;
        nextIdxRef.current = newNext;
        setNextLetterIndex(newNext);

        if (newNext === lettersRef.current.length) {
          phaseRef.current = 'win';
          speakHebrew(targetWordRef.current + '! כל הכבוד!');
          setScore(s => s + 1);
          setWordsCompleted(w => w + 1);
          setTimeout(() => setPhase('win'), 800);
        }
      } else {
        // Wrong order — bounce back
        playerRef.current = { row, col };
        setBouncing(true);
        setTimeout(() => setBouncing(false), 400);
      }
    }
  }, []);

  // Keyboard input
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return;
      e.preventDefault();
      if (e.key === 'ArrowUp')    movePlayer(-1, 0);
      if (e.key === 'ArrowDown')  movePlayer(1, 0);
      if (e.key === 'ArrowLeft')  movePlayer(0, -1);
      if (e.key === 'ArrowRight') movePlayer(0, 1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [movePlayer]);

  const nextLevel = useCallback(() => {
    const nextLvl: DifficultyLevel = level === 'easy' ? 'medium' : level === 'medium' ? 'hard' : 'easy';
    setLevel(nextLvl);
    startGame(nextLvl);
  }, [level, startGame]);

  const restart = useCallback(() => startGame(), [startGame]);
  const backToMenu = useCallback(() => { phaseRef.current = 'menu'; setPhase('menu'); }, []);

  return {
    phase, targetWord, nextLetterIndex, score, level, wordsCompleted, bouncing,
    gridRef, playerRef, lettersRef,
    startGame, movePlayer, nextLevel, restart, backToMenu,
  };
}
