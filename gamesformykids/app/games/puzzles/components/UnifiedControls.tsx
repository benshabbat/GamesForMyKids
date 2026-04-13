'use client';

import SimpleControls from './SimpleControls';
import CustomControls from './CustomControls';

interface UnifiedControlsProps {
  type: 'simple' | 'custom';
}

export default function UnifiedControls({ type }: UnifiedControlsProps) {
  if (type === 'simple') return <SimpleControls />;
  return <CustomControls />;
}
