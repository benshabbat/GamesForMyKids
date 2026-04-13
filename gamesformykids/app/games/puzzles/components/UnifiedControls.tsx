'use client';

import { RefObject } from 'react';
import SimpleControls from './SimpleControls';
import CustomControls from './CustomControls';

interface UnifiedControlsProps {
  type: 'simple' | 'custom';
  fileInputRef?: RefObject<HTMLInputElement | null>;
}

export default function UnifiedControls({ type, fileInputRef }: UnifiedControlsProps) {
  if (type === 'simple') return <SimpleControls />;
  return <CustomControls fileInputRef={fileInputRef} />;
}
