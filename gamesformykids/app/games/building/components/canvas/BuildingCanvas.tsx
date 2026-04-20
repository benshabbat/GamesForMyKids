'use client';

import { useBuildingStore } from '@/lib/stores/buildingStore';
import BlockRenderer from './BlockRenderer';
import EmptyCanvasWelcome from './EmptyCanvasWelcome';

export default function BuildingCanvas() {
  const blocks = useBuildingStore((s) => s.blocks);
  const showGrid = useBuildingStore((s) => s.showGrid);
  const handleMouseMove = useBuildingStore((s) => s.handleMouseMove);
  const handleMouseUp = useBuildingStore((s) => s.handleMouseUp);
  const handleTouchMove = useBuildingStore((s) => s.handleTouchMove);
  const handleTouchEnd = useBuildingStore((s) => s.handleTouchEnd);
  const deselectBlock = useBuildingStore((s) => s.deselectBlock);
  const setCanvasElement = useBuildingStore((s) => s.setCanvasElement);

  return (
    <div
      ref={setCanvasElement}
      className="relative bg-white/10 backdrop-blur-sm rounded-3xl border-4 border-white/30 overflow-hidden shadow-2xl touch-manipulation h-96 md:h-[600px]"
      style={{ 
        width: '100%',
        backgroundImage: showGrid ? 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)' : 'none',
        backgroundSize: showGrid ? '20px 20px' : 'auto'
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={deselectBlock}
    >
      {blocks.length === 0 && <EmptyCanvasWelcome />}
      
      {blocks.map(block => (
        <BlockRenderer 
          key={block.id}
          block={block}
        />
      ))}
    </div>
  );
}
