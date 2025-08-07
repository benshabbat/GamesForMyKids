import { Piece } from './types';

// Game Constants
export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;
export const EMPTY_ROW = new Array(BOARD_WIDTH).fill(0);
export const EMPTY_BOARD = new Array(BOARD_HEIGHT).fill(null).map(() => [...EMPTY_ROW]);

// Tetromino Definitions
export const TETROMINOES: Record<string, { blocks: number[][]; color: string }> = {
  I: { 
    blocks: [[1, 1, 1, 1]], 
    color: 'linear-gradient(135deg, #00f5ff 0%, #0088cc 100%)' 
  },
  O: { 
    blocks: [[1, 1], [1, 1]], 
    color: 'linear-gradient(135deg, #ffff00 0%, #ffcc00 100%)' 
  },
  T: { 
    blocks: [[0, 1, 0], [1, 1, 1]], 
    color: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)' 
  },
  S: { 
    blocks: [[0, 1, 1], [1, 1, 0]], 
    color: 'linear-gradient(135deg, #00ff88 0%, #00cc66 100%)' 
  },
  Z: { 
    blocks: [[1, 1, 0], [0, 1, 1]], 
    color: 'linear-gradient(135deg, #ff4757 0%, #ff3838 100%)' 
  },
  J: { 
    blocks: [[1, 0, 0], [1, 1, 1]], 
    color: 'linear-gradient(135deg, #5352ed 0%, #3742fa 100%)' 
  },
  L: { 
    blocks: [[0, 0, 1], [1, 1, 1]], 
    color: 'linear-gradient(135deg, #ffa502 0%, #ff6348 100%)' 
  }
};

// Game utility functions
export const getRandomPiece = (): Piece => {
  const pieces = Object.keys(TETROMINOES);
  const randomPiece = pieces[Math.floor(Math.random() * pieces.length)];
  return {
    type: randomPiece,
    blocks: TETROMINOES[randomPiece].blocks,
    color: TETROMINOES[randomPiece].color
  };
};

export const rotatePiece = (piece: Piece): Piece => {
  const rotated = [];
  for (let x = 0; x < piece.blocks[0].length; x++) {
    const row = [];
    for (let y = piece.blocks.length - 1; y >= 0; y--) {
      row.push(piece.blocks[y][x]);
    }
    rotated.push(row);
  }
  return { ...piece, blocks: rotated };
};
