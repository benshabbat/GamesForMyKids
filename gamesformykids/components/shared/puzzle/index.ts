// Shared puzzle components exports
export { PuzzleGrid } from './PuzzleGrid';
export { PiecesPool } from './PiecesPool';
export { PuzzleStats } from './PuzzleStats';
export { FeedbackMessage } from './FeedbackMessage';
export { default as ImageUploadSection } from './ImageUploadSection';
export { default as ReferenceImage } from './ReferenceImage';
export { default as FloatingDragPiece } from './FloatingDragPiece';

// Unified components (modern approach)
export { default as UnifiedControls } from './UnifiedControls';
export { default as UnifiedHeader } from './UnifiedHeader';
export { default as UnifiedHelpModal } from './UnifiedHelpModal';

// Specific components
export { default as PuzzleSelector } from './PuzzleSelector';

// Touch handling utilities
export { useTouchHandlers, initialTouchState } from './TouchHandlers';
export type { TouchState, TouchHandlersResult } from './TouchHandlers';
