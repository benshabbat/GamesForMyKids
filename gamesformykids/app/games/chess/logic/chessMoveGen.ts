import { type Color, type Piece, type PieceType, type Board, type Pos, type CastleRights, type ChessMove } from './chessTypes';
import { inB, pieceColor, isOpp, isFriend, isAttackedBy, isInCheck, applyMove } from './chessBoardUtils';

// ─────────────────────── Raw move generation ─────────────────
function getRawMoves(b: Board, pos: Pos, castling: CastleRights, enPassant: Pos | null): ChessMove[] {
  const piece = b[pos.row][pos.col];
  if (!piece) return [];
  const color = pieceColor(piece)!;
  const pType = piece[1] as PieceType;
  const { row: r, col: c } = pos;
  const moves: ChessMove[] = [];

  if (pType === 'P') {
    const dir = color === 'w' ? -1 : 1;
    const startRow = color === 'w' ? 6 : 1;
    const promRow = color === 'w' ? 0 : 7;
    const addPawn = (to: Pos, extra?: Omit<ChessMove, 'from' | 'to'>) => {
      if (to.row === promRow) {
        for (const pt of ['Q', 'R', 'B', 'N'] as PieceType[])
          moves.push({ from: pos, to, promotion: `${color}${pt}` as Piece, ...extra });
      } else moves.push({ from: pos, to, ...extra });
    };
    if (inB(r + dir, c) && !b[r + dir][c]) {
      addPawn({ row: r + dir, col: c });
      if (r === startRow && !b[r + 2 * dir][c])
        moves.push({ from: pos, to: { row: r + 2 * dir, col: c } });
    }
    for (const dc of [-1, 1]) {
      const tr = r + dir, tc = c + dc;
      if (!inB(tr, tc)) continue;
      if (isOpp(b[tr][tc], color)) addPawn({ row: tr, col: tc });
      else if (enPassant && tr === enPassant.row && tc === enPassant.col)
        moves.push({ from: pos, to: { row: tr, col: tc }, enPassant: true });
    }
  }

  else if (pType === 'N') {
    for (const [dr, dc] of [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]]) {
      const tr = r+dr, tc = c+dc;
      if (inB(tr, tc) && !isFriend(b[tr][tc], color)) moves.push({ from: pos, to: { row: tr, col: tc } });
    }
  }

  else if (pType === 'B' || pType === 'R' || pType === 'Q') {
    const dirs = pType === 'B' ? [[-1,-1],[-1,1],[1,-1],[1,1]]
      : pType === 'R' ? [[-1,0],[1,0],[0,-1],[0,1]]
      : [[-1,-1],[-1,1],[1,-1],[1,1],[-1,0],[1,0],[0,-1],[0,1]];
    for (const [dr, dc] of dirs) {
      let tr = r+dr, tc = c+dc;
      while (inB(tr, tc) && !isFriend(b[tr][tc], color)) {
        moves.push({ from: pos, to: { row: tr, col: tc } });
        if (b[tr][tc]) break;
        tr += dr; tc += dc;
      }
    }
  }

  else if (pType === 'K') {
    for (const [dr, dc] of [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]) {
      const tr = r+dr, tc = c+dc;
      if (inB(tr, tc) && !isFriend(b[tr][tc], color)) moves.push({ from: pos, to: { row: tr, col: tc } });
    }
    const crow = color === 'w' ? 7 : 0;
    const opp: Color = color === 'w' ? 'b' : 'w';
    if (r === crow && c === 4 && !isAttackedBy(b, pos, opp)) {
      const kingside = color === 'w' ? castling.wK : castling.bK;
      const queenside = color === 'w' ? castling.wQ : castling.bQ;
      if (kingside && !b[crow][5] && !b[crow][6]
        && !isAttackedBy(b, { row: crow, col: 5 }, opp)
        && !isAttackedBy(b, { row: crow, col: 6 }, opp))
        moves.push({ from: pos, to: { row: crow, col: 6 }, castle: 'K' });
      if (queenside && !b[crow][3] && !b[crow][2] && !b[crow][1]
        && !isAttackedBy(b, { row: crow, col: 3 }, opp)
        && !isAttackedBy(b, { row: crow, col: 2 }, opp))
        moves.push({ from: pos, to: { row: crow, col: 2 }, castle: 'Q' });
    }
  }

  return moves;
}

// ─────────────────────── Legal moves ─────────────────────────
export function getValidMoves(b: Board, pos: Pos, castling: CastleRights, enPassant: Pos | null): ChessMove[] {
  const piece = b[pos.row][pos.col];
  if (!piece) return [];
  const color = pieceColor(piece)!;
  return getRawMoves(b, pos, castling, enPassant).filter(m => {
    const { board: nb } = applyMove(b, m, castling, enPassant);
    return !isInCheck(nb, color);
  });
}

export function getAllValidMoves(b: Board, color: Color, castling: CastleRights, enPassant: Pos | null): ChessMove[] {
  const moves: ChessMove[] = [];
  for (let r = 0; r < 8; r++)
    for (let c = 0; c < 8; c++)
      if (pieceColor(b[r][c]) === color)
        moves.push(...getValidMoves(b, { row: r, col: c }, castling, enPassant));
  return moves;
}
