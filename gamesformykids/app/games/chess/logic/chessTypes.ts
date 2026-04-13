// ─────────────────────── Types ───────────────────────────────
export type Color = 'w' | 'b';
export type PieceType = 'K' | 'Q' | 'R' | 'B' | 'N' | 'P';
export type Piece = `${Color}${PieceType}` | null;
export type Board = Piece[][];

export interface Pos { row: number; col: number; }

export interface CastleRights { wK: boolean; wQ: boolean; bK: boolean; bQ: boolean; }

export interface ChessMove {
  from: Pos; to: Pos;
  promotion?: Piece;
  castle?: 'K' | 'Q';
  enPassant?: true;
}

export type GamePhase = 'menu' | 'playing' | 'check' | 'checkmate' | 'stalemate';

export interface ChessState {
  phase: GamePhase;
  board: Board;
  selected: Pos | null;
  validMoves: ChessMove[];
  turn: Color;
  castling: CastleRights;
  enPassant: Pos | null;
  lastMove: ChessMove | null;
  playerScore: number;
  computerScore: number;
  message: string;
}

export const PIECE_SYMBOLS: Record<string, string> = {
  wK: '♔', wQ: '♕', wR: '♖', wB: '♗', wN: '♘', wP: '♙',
  bK: '♚', bQ: '♛', bR: '♜', bB: '♝', bN: '♞', bP: '♟',
};
