'use client';

import { Sparkles, RotateCw } from 'lucide-react';
import { useBuildingStore } from '@/lib/stores/buildingStore';
import BlockShape from './BlockShape';

interface BlockRendererProps {
  blockId: string;
}

export default function BlockRenderer({ blockId }: BlockRendererProps) {
  const block = useBuildingStore((s) => s.blocks.find((b) => b.id === blockId));
  const selectedBlock = useBuildingStore((s) => s.selectedBlock);
  const handleMouseDown = useBuildingStore((s) => s.handleMouseDown);
  const handleTouchStart = useBuildingStore((s) => s.handleTouchStart);
  const handleDoubleClick = useBuildingStore((s) => s.handleDoubleClick);
  const handleRotate = useBuildingStore((s) => s.handleRotate);
  const handleBlockClick = useBuildingStore((s) => s.handleBlockClick);

  if (!block) return null;

  const isDragged = selectedBlock?.id === block.id;
  const isSelected = selectedBlock?.id === block.id;

  return (
    <div
      style={{
        position: 'absolute',
        left: block.x,
        top: block.y,
        cursor: 'grab',
        userSelect: 'none',
        zIndex: isDragged ? 1000 : 1,
        transition: isDragged ? 'none' : 'all 0.3s ease',
        border: isSelected ? '3px solid orange' : '3px solid transparent',
        borderRadius: '15px',
        padding: '2px'
      }}
      className={`${block.sparkles ? 'animate-pulse' : ''} hover:scale-110 transition-transform group`}
    >
      <BlockShape blockId={blockId} />
      
      {/* Rotation button - appears on hover or touch */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleRotate(block);
        }}
        className="absolute -top-2 -right-2 w-8 h-8 md:w-6 md:h-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-10 touch-manipulation"
        title="סובב צורה"
      >
        <RotateCw className="w-4 h-4 md:w-3 md:h-3" />
      </button>
      
      {/* Main block interaction */}
      <div
        className="absolute inset-0 touch-manipulation"
        onMouseDown={(e) => handleMouseDown(e, block)}
        onTouchStart={(e) => handleTouchStart?.(e, block)}
        onDoubleClick={() => handleDoubleClick(block)}
        onClick={(e) => {
          e.stopPropagation();
          handleBlockClick?.(block);
        }}
      />
      
      {block.sparkles && (
        <div className="absolute inset-0 pointer-events-none">
          <Sparkles className="w-4 h-4 text-yellow-300 animate-ping absolute top-0 left-0" />
          <Sparkles className="w-3 h-3 text-pink-300 animate-ping absolute bottom-0 right-0" style={{ animationDelay: '0.5s' }} />
        </div>
      )}
      
      {isSelected && (
        <div className="absolute inset-0 pointer-events-none animate-pulse">
          <div className="absolute -top-1 -left-1 w-3 h-3 bg-orange-400 rounded-full"></div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full"></div>
          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-orange-400 rounded-full"></div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-orange-400 rounded-full"></div>
        </div>
      )}
    </div>
  );
}
