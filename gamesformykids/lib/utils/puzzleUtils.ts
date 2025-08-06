// Puzzle utility functions - shared between simple and custom puzzles

export interface PuzzlePiece {
  id: number;
  canvas: HTMLCanvasElement;
  correctRow: number;
  correctCol: number;
  currentRow: number | null;
  currentCol: number | null;
  isPlaced: boolean;
  isCorrect: boolean;
  // Unified position interface
  expectedPosition: { row: number; col: number };
  currentPosition?: { row: number; col: number };
}

export interface SimplePuzzlePiece extends PuzzlePiece {
  position: number;
  row: number;
  col: number;
  correctPosition: number;
}

/**
 * Creates puzzle pieces from an image
 */
export const createPuzzlePieces = (
  img: HTMLImageElement, 
  gridSize: number,
  type: 'simple' | 'custom' = 'simple'
): PuzzlePiece[] => {
  console.log('=== CREATE PUZZLE PIECES ===');
  console.log('Image:', img.width, 'x', img.height);
  console.log('GridSize:', gridSize, 'Type:', type);
  
  // Create temporary canvas
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

  console.log('Grid side:', gridSide, 'Piece size:', pieceSize);

  try {
    // Clear and prepare canvas
    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, size, size);

    // Calculate image dimensions and positioning
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

    console.log('Drawing image:', drawWidth, 'x', drawHeight, 'at offset:', offsetX, offsetY);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

    // Create individual pieces
    for (let row = 0; row < gridSide; row++) {
      for (let col = 0; col < gridSide; col++) {
        const piece = createSinglePiece(canvas, row, col, pieceSize, gridSide, type);
        if (piece) {
          pieces.push(piece);
          console.log(`Created piece ${piece.id} for position (${row}, ${col})`);
        }
      }
    }

    console.log('=== FINAL RESULT ===');
    console.log(`Successfully created ${pieces.length} puzzle pieces`);
    console.log('Expected pieces:', gridSize);
    
    if (pieces.length > 0) {
      console.log('First piece canvas dimensions:', pieces[0]?.canvas?.width, 'x', pieces[0]?.canvas?.height);
      console.log('All pieces:', pieces.map(p => `Piece ${p.id}: (${p.correctRow},${p.correctCol})`));
    }
    
    // Shuffle pieces for simple puzzles
    const shuffledPieces = type === 'simple' ? pieces.sort(() => Math.random() - 0.5) : pieces;
    console.log('Returning pieces:', shuffledPieces.length);
    return shuffledPieces;
    
  } catch (error) {
    console.error('Error in createPuzzlePieces:', error);
    return [];
  }
};

/**
 * Creates a single puzzle piece
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

  // Background
  pieceCtx.fillStyle = '#ffffff';
  pieceCtx.fillRect(0, 0, finalPieceSize, finalPieceSize);

  // Draw piece from main canvas
  const srcX = col * pieceSize;
  const srcY = row * pieceSize;
  const srcWidth = pieceSize;
  const srcHeight = pieceSize;

  pieceCtx.drawImage(
    sourceCanvas,
    srcX, srcY, srcWidth, srcHeight,
    2, 2, finalPieceSize - 4, finalPieceSize - 4
  );

  // Add border
  addPieceBorder(pieceCtx, finalPieceSize);

  const pieceId = row * gridSide + col;
  
  // Create piece object based on type
  const basePiece = {
    id: pieceId,
    canvas: pieceCanvas,
    correctRow: row,
    correctCol: col,
    currentRow: null,
    currentCol: null,
    isPlaced: false,
    isCorrect: false,
    expectedPosition: { row, col }
  };

  if (type === 'simple') {
    return {
      ...basePiece,
      position: pieceId,
      row,
      col,
      correctPosition: pieceId
    } as SimplePuzzlePiece;
  }

  return basePiece;
};

/**
 * Adds a border to a puzzle piece
 */
const addPieceBorder = (ctx: CanvasRenderingContext2D, size: number): void => {
  // Outer border
  ctx.strokeStyle = '#ddd';
  ctx.lineWidth = 2;
  ctx.strokeRect(1, 1, size - 2, size - 2);
  
  // Inner highlight
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 1;
  ctx.strokeRect(2, 2, size - 4, size - 4);
};

/**
 * Validates if a piece is in the correct position
 */
export const isPieceInCorrectPosition = (
  piece: PuzzlePiece,
  targetRow: number,
  targetCol: number
): boolean => {
  return piece.correctRow === targetRow && piece.correctCol === targetCol;
};

/**
 * Calculates completion percentage
 */
export const calculateCompletionPercentage = (
  completedPieces: number,
  totalPieces: number
): number => {
  return Math.round((completedPieces / totalPieces) * 100);
};

/**
 * Formats time in MM:SS format
 */
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Calculates final score with bonus
 */
export const calculateFinalScore = (
  baseScore: number,
  timer: number,
  completionBonus: number = 50,
  timeBonus: number = 300
): number => {
  const bonusScore = Math.max(0, timeBonus - timer);
  return baseScore + completionBonus + bonusScore;
};
