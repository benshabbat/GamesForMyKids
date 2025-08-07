// Tetris Types
export interface Position {
  x: number;
  y: number;
}

export interface Piece {
  type: string;
  blocks: number[][];
  color: string;
}

export type Board = (string | number)[][];

export interface TetrisGameState {
  board: Board;
  currentPiece: Piece | null;
  position: Position;
  score: number;
  level: number;
  isGameRunning: boolean;
  gameOver: boolean;
  nextPiece: Piece | null;
  linesCleared: number;
  showStartScreen: boolean;
  isLoading: boolean;
}

export interface TetrisGameProps {
  onBack?: () => void;
}

export interface GameBoardProps {
  displayBoard: Board;
}

export interface InfoPanelProps {
  score: number;
  level: number;
  linesCleared: number;
  nextPiece: Piece | null;
}

export interface TouchControlsProps {
  isGameRunning: boolean;
  gameOver: boolean;
  score: number;
  onMove: (dx: number, dy: number) => void;
  onRotate: () => void;
  onStartGame: () => void;
  isDesktop?: boolean;
}

export interface NextPieceDisplayProps {
  nextPiece: Piece | null;
  isMobile?: boolean;
}
