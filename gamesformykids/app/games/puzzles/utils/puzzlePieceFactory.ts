import { type PuzzlePiece, type SimplePuzzlePiece } from './puzzleTypes';

/**
 * Creates puzzle pieces from an image
 */
export const createPuzzlePieces = (
  img: HTMLImageElement,
  gridSize: number,
  type: 'simple' | 'custom' = 'simple'
): PuzzlePiece[] => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    console.error('Canvas context not found');
    return [];
  }

  const size = 400;
  canvas.width = size;
  canvas.height = size;

  const gridSide = Math.sqrt(gridSize);
  const pieceSize = size / gridSide;
  const pieces: PuzzlePiece[] = [];

  try {
    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, size, size);

    const imgAspectRatio = img.width / img.height;
    let drawWidth = size;
    let drawHeight = size;
    let offsetX = 0;
    let offsetY = 0;

    if (imgAspectRatio > 1) {
      drawHeight = size / imgAspectRatio;
      offsetY = (size - drawHeight) / 2;
    } else if (imgAspectRatio < 1) {
      drawWidth = size * imgAspectRatio;
      offsetX = (size - drawWidth) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

    for (let row = 0; row < gridSide; row++) {
      for (let col = 0; col < gridSide; col++) {
        const piece = createSinglePiece(canvas, row, col, pieceSize, gridSide, type);
        if (piece) {
          pieces.push(piece);
        }
      }
    }

    return type === 'simple' ? pieces.sort(() => Math.random() - 0.5) : pieces;
  } catch (error) {
    console.error('Error in createPuzzlePieces:', error);
    return [];
  }
};

/**
 * Creates a single puzzle piece canvas
 */
const createSinglePiece = (
  sourceCanvas: HTMLCanvasElement,
  row: number,
  col: number,
  pieceSize: number,
  gridSide: number,
  type: 'simple' | 'custom'
): PuzzlePiece | null => {
  const pieceCanvas = document.createElement('canvas');
  const finalPieceSize = Math.floor(pieceSize) + 4;
  pieceCanvas.width = finalPieceSize;
  pieceCanvas.height = finalPieceSize;
  const pieceCtx = pieceCanvas.getContext('2d');

  if (!pieceCtx) {
    console.error('Piece context not found for row:', row, 'col:', col);
    return null;
  }

  pieceCtx.imageSmoothingEnabled = true;
  pieceCtx.imageSmoothingQuality = 'high';
  pieceCtx.fillStyle = '#ffffff';
  pieceCtx.fillRect(0, 0, finalPieceSize, finalPieceSize);

  pieceCtx.drawImage(
    sourceCanvas,
    col * pieceSize, row * pieceSize, pieceSize, pieceSize,
    2, 2, finalPieceSize - 4, finalPieceSize - 4
  );

  addPieceBorder(pieceCtx, finalPieceSize);

  const pieceId = row * gridSide + col;
  const basePiece = {
    id: pieceId,
    canvas: pieceCanvas,
    correctRow: row,
    correctCol: col,
    currentRow: null,
    currentCol: null,
    isPlaced: false,
    isCorrect: false,
    expectedPosition: { row, col },
  };

  if (type === 'simple') {
    return {
      ...basePiece,
      position: pieceId,
      row,
      col,
      correctPosition: pieceId,
    } as SimplePuzzlePiece;
  }

  return basePiece;
};

/**
 * Adds a decorative border to a puzzle piece canvas
 */
const addPieceBorder = (ctx: CanvasRenderingContext2D, size: number): void => {
  ctx.strokeStyle = '#ddd';
  ctx.lineWidth = 2;
  ctx.strokeRect(1, 1, size - 2, size - 2);

  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 1;
  ctx.strokeRect(2, 2, size - 4, size - 4);
};
