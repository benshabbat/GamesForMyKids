'use client';

import { useBuildingContext } from '@/contexts/BuildingContext';
import { BlockRenderer } from '@/components/game/building';
import EmptyCanvasWelcome from './EmptyCanvasWelcome';

export default function BuildingCanvas() {
  const { 
    blocks, 
    showGrid, 
    canvasRef,
    handleMouseMove,
    handleMouseUp,
    handleTouchMove,
    handleTouchEnd,
    deselectBlock
  } = useBuildingContext();

  return (
    <div
      ref={canvasRef}
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
