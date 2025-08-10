'use client';

import { Sparkles, RotateCw } from 'lucide-react';
import { useBuildingContext } from '@/contexts/BuildingContext';
import { Block } from '@/app/games/building/types';

interface BlockRendererProps {
  block: Block;
}

export default function BlockRenderer({ block }: BlockRendererProps) {
  const { 
    selectedBlock,
    handleMouseDown,
    handleTouchStart,
    handleDoubleClick,
    handleRotate,
    handleBlockClick
  } = useBuildingContext();

  const isDragged = selectedBlock?.id === block.id;
  const isSelected = selectedBlock?.id === block.id;  const renderShape = (block: Block) => {
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
            {/* Enhanced heart shape with modern design */}
            <svg 
              width={size} 
              height={size} 
              viewBox="0 0 100 100" 
              style={{ overflow: 'visible' }}
            >
              <defs>
                <linearGradient id={`heartGradient-${block.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={block.color} stopOpacity="1" />
                  <stop offset="50%" stopColor={block.color} stopOpacity="0.9" />
                  <stop offset="100%" stopColor={block.color} stopOpacity="0.8" />
                </linearGradient>
                <filter id={`heartShadow-${block.id}`}>
                  <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.3"/>
                </filter>
              </defs>
              
              {/* Heart path with smooth curves */}
              <path
                d="M50,85 C50,85 20,60 20,40 C20,25 30,15 40,15 C45,15 50,20 50,25 C50,20 55,15 60,15 C70,15 80,25 80,40 C80,60 50,85 50,85 Z"
                fill={`url(#heartGradient-${block.id})`}
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.5"
                filter={`url(#heartShadow-${block.id})`}
              />
              
              {/* Heart highlight for depth */}
              <ellipse
                cx="35"
                cy="30"
                rx="8"
                ry="6"
                fill="rgba(255,255,255,0.3)"
                opacity="0.7"
              />
              <ellipse
                cx="65"
                cy="30"
                rx="8"
                ry="6"
                fill="rgba(255,255,255,0.3)"
                opacity="0.7"
              />
            </svg>
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
