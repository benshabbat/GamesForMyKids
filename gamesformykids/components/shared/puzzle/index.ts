// Shared puzzle components exports
export { PuzzleGrid } from './PuzzleGrid';
export { PiecesPool } from './PiecesPool';
export { PuzzleStats } from './PuzzleStats';
export { FeedbackMessage } from './FeedbackMessage';
export { default as PuzzleHeader } from './PuzzleHeader';
export { default as ImageUploadSection } from './ImageUploadSection';
export { default as GameControls } from './GameControls';
export { default as ReferenceImage } from './ReferenceImage';
export { default as HelpModal } from './HelpModal';
export { default as FloatingDragPiece } from './FloatingDragPiece';

// Simple puzzle specific components
export { default as PuzzleSelector } from './PuzzleSelector';
export { default as SimplePuzzleControls } from './SimplePuzzleControls';
export { default as SimplePuzzleHeader } from './SimplePuzzleHeader';
export { default as SimplePuzzleHelpModal } from './SimplePuzzleHelpModal';

// Touch handling utilities
export { useTouchHandlers, initialTouchState } from './TouchHandlers';
export type { TouchState, TouchHandlersResult } from './TouchHandlers';
