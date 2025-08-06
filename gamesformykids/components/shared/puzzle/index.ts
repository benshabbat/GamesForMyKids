// Shared puzzle components exports
export { PuzzleGrid } from './PuzzleGrid';
export { PiecesPool } from './PiecesPool';
export { PuzzleStats } from './PuzzleStats';
export { FeedbackMessage } from './FeedbackMessage';
export { default as ImageUploadSection } from './ImageUploadSection';
export { default as ReferenceImage } from './ReferenceImage';
export { default as FloatingDragPiece } from './FloatingDragPiece';

// Unified components (replaces old ones)
export { default as UnifiedControls } from './UnifiedControls';
export { default as UnifiedHeader } from './UnifiedHeader';
export { default as UnifiedHelpModal } from './UnifiedHelpModal';

// Legacy components - deprecated but kept for backward compatibility
export { default as PuzzleHeader } from './PuzzleHeader';
export { default as GameControls } from './GameControls';
export { default as HelpModal } from './HelpModal';

// Simple puzzle specific components
export { default as PuzzleSelector } from './PuzzleSelector';
export { default as SimplePuzzleControls } from './SimplePuzzleControls';
export { default as SimplePuzzleHeader } from './SimplePuzzleHeader';
export { default as SimplePuzzleHelpModal } from './SimplePuzzleHelpModal';

// Touch handling utilities
export { useTouchHandlers, initialTouchState } from './TouchHandlers';
export type { TouchState, TouchHandlersResult } from './TouchHandlers';
