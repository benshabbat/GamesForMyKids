'use client';

import { useBuildingStore } from '@/lib/stores/buildingStore';

interface BlockShapeProps {
  blockId: string;
}

export default function BlockShape({ blockId }: BlockShapeProps) {
  const block = useBuildingStore((s) => s.blocks.find((b) => b.id === blockId));
  if (!block) return null;

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
          borderLeft: `${size / 2}px solid transparent`,
          borderRight: `${size / 2}px solid transparent`,
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
                <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.3" />
              </filter>
            </defs>
            <path
              d="M50,85 C50,85 20,60 20,40 C20,25 30,15 40,15 C45,15 50,20 50,25 C50,20 55,15 60,15 C70,15 80,25 80,40 C80,60 50,85 50,85 Z"
              fill={`url(#heartGradient-${block.id})`}
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1.5"
              filter={`url(#heartShadow-${block.id})`}
            />
            <ellipse cx="35" cy="30" rx="8" ry="6" fill="rgba(255,255,255,0.3)" opacity="0.7" />
            <ellipse cx="65" cy="30" rx="8" ry="6" fill="rgba(255,255,255,0.3)" opacity="0.7" />
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
    default:
      return null;
  }
}
