// ─────────────────────── Types ───────────────────────────────
export type Color = 'w' | 'b';
export type PieceType = 'K' | 'Q' | 'R' | 'B' | 'N' | 'P';
export type Piece = `${Color}${PieceType}` | null;
// Override default array index signature to avoid `| undefined` with noUncheckedIndexedAccess.
// Board is always 8×8; all accesses are guarded by inB() checks.
interface PieceRow extends Array<Piece> { [n: number]: Piece }
interface BoardArray extends Array<PieceRow> { [n: number]: PieceRow }
export type Board = BoardArray;

export interface Pos { row: number; col: number; }

export interface CastleRights { wK: boolean; wQ: boolean; bK: boolean; bQ: boolean; }

export interface ChessMove {
  from: Pos; to: Pos;
  promotion?: Piece;
  castle?: 'K' | 'Q';
  enPassant?: true;
}

export type GamePhase = 'menu' | 'playing' | 'check' | 'checkmate' | 'stalemate';

export type MoveRating = 'excellent' | 'great' | 'good' | 'castle' | 'normal';

export interface MoveRecord {
  by: Color;
  piece: string;
  captured: Piece;
  gaveCheck: boolean;
  castle: 'K' | 'Q' | null;
  rating: MoveRating;
  notation: string;
  moveNumber: number;
}

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
  capturedByPlayer: Piece[];
  capturedByComputer: Piece[];
  moveHistory: MoveRecord[];
}

export const PIECE_SYMBOLS: Record<string, string> = {
  wK: '♔', wQ: '♕', wR: '♖', wB: '♗', wN: '♘', wP: '♙',
  bK: '♚', bQ: '♛', bR: '♜', bB: '♝', bN: '♞', bP: '♟',
};
