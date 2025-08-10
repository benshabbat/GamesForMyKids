'use client';

import { Sparkles, RotateCw } from 'lucide-react';

interface Block {
  id: string;
  x: number;
  y: number;
  color: string;
  shape: 'square' | 'rectangle' | 'triangle' | 'circle' | 'star' | 'heart' | 'diamond';
  rotation: number;
  scale: number;
  size: number; // Base size multiplier
  shadow: boolean;
  sparkles: boolean;
}

interface BlockRendererProps {
  block: Block;
  isDragged: boolean;
  isSelected?: boolean;
  onMouseDown: (e: React.MouseEvent, block: Block) => void;
  onTouchStart?: (e: React.TouchEvent, block: Block) => void;
  onDoubleClick: (block: Block) => void;
  onRotate: (block: Block) => void;
  onSelect?: (block: Block) => void;
}

export default function BlockRenderer({ 
  block, 
  isDragged, 
  isSelected = false,
  onMouseDown, 
  onTouchStart,
  onDoubleClick,
  onRotate,
  onSelect
}: BlockRendererProps) {  const renderShape = (block: Block) => {
    const size = 60 * block.scale * block.size;
    const baseStyle = {
      backgroundColor: block.color,
      transform: `rotate(${block.rotation}deg)`,
      filter: block.shadow ? 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))' : 'none',
      border: '2px solid rgba(255,255,255,0.3)'
    };

    switch (block.shape) {
      case 'square':
        return (
          <div 
            style={{ 
              ...baseStyle, 
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: '12px'
            }} 
          />
        );
      case 'rectangle':
        return (
          <div 
            style={{ 
              ...baseStyle, 
              width: `${size * 1.3}px`, 
              height: `${size * 0.7}px`, 
              borderRadius: '12px' 
            }} 
          />
        );
      case 'circle':
        return (
          <div 
            style={{ 
              ...baseStyle, 
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: '50%' 
            }} 
          />
        );
      case 'triangle':
        return (
          <div style={{
            width: '0',
            height: '0',
            borderLeft: `${size/2}px solid transparent`,
            borderRight: `${size/2}px solid transparent`,
            borderBottom: `${size}px solid ${block.color}`,
            transform: `rotate(${block.rotation}deg)`,
            filter: block.shadow ? 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))' : 'none'
          }} />
        );
      case 'star':
        return (
          <div style={{
            ...baseStyle,
            width: `${size}px`,
            height: `${size}px`,
            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
            borderRadius: '0'
          }} />
        );
      case 'heart':
        return (
          <div style={{
            position: 'relative',
            width: `${size}px`,
            height: `${size}px`,
            transform: `rotate(${block.rotation}deg)`,
            filter: block.shadow ? 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))' : 'none'
          }}>
            {/* Improved heart shape with better proportions */}
            <div 
              style={{
                position: 'absolute',
                width: `${size * 0.9}px`,
                height: `${size * 0.8}px`,
                left: `${size * 0.05}px`,
                top: `${size * 0.1}px`
              }}
            >
              {/* Left heart lobe */}
              <div style={{
                position: 'absolute',
                width: `${size * 0.4}px`,
                height: `${size * 0.5}px`,
                backgroundColor: block.color,
                borderRadius: `${size * 0.2}px ${size * 0.2}px 0 ${size * 0.2}px`,
                top: 0,
                left: `${size * 0.05}px`,
                transform: 'rotate(-45deg)',
                transformOrigin: 'center bottom',
                border: '2px solid rgba(255,255,255,0.3)'
              }} />
              
              {/* Right heart lobe */}
              <div style={{
                position: 'absolute',
                width: `${size * 0.4}px`,
                height: `${size * 0.5}px`,
                backgroundColor: block.color,
                borderRadius: `${size * 0.2}px ${size * 0.2}px ${size * 0.2}px 0`,
                top: 0,
                right: `${size * 0.05}px`,
                transform: 'rotate(45deg)',
                transformOrigin: 'center bottom',
                border: '2px solid rgba(255,255,255,0.3)'
              }} />
              
              {/* Heart point (bottom triangle) */}
              <div style={{
                position: 'absolute',
                width: 0,
                height: 0,
                borderLeft: `${size * 0.25}px solid transparent`,
                borderRight: `${size * 0.25}px solid transparent`,
                borderTop: `${size * 0.35}px solid ${block.color}`,
                bottom: 0,
                left: `${size * 0.2}px`,
                filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.3))'
              }} />
              
              {/* Heart center fill */}
              <div style={{
                position: 'absolute',
                width: `${size * 0.6}px`,
                height: `${size * 0.3}px`,
                backgroundColor: block.color,
                top: `${size * 0.15}px`,
                left: `${size * 0.15}px`,
                border: '2px solid rgba(255,255,255,0.3)',
                borderRadius: `${size * 0.1}px`
              }} />
            </div>
          </div>
        );
      case 'diamond':
        return (
          <div style={{
            ...baseStyle,
            width: `${size}px`,
            height: `${size}px`,
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            borderRadius: '0'
          }} />
        );
    }
  };

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
      {renderShape(block)}
      
      {/* Rotation button - appears on hover or touch */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRotate(block);
        }}
        className="absolute -top-2 -right-2 w-8 h-8 md:w-6 md:h-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-10 touch-manipulation"
        title="סובב צורה"
      >
        <RotateCw className="w-4 h-4 md:w-3 md:h-3" />
      </button>
      
      {/* Main block interaction */}
      <div
        className="absolute inset-0 touch-manipulation"
        onMouseDown={(e) => onMouseDown(e, block)}
        onTouchStart={(e) => onTouchStart?.(e, block)}
        onDoubleClick={() => onDoubleClick(block)}
        onClick={(e) => {
          e.stopPropagation();
          onSelect?.(block);
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
