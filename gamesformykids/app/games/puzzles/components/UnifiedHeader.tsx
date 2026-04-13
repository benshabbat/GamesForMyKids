'use client';

import SimpleHeader from './SimpleHeader';
import CustomHeader from './CustomHeader';

interface UnifiedHeaderProps {
  type?: 'simple' | 'custom';
}

export default function UnifiedHeader({ type = 'simple' }: UnifiedHeaderProps) {
  return type === 'simple' ? <SimpleHeader /> : <CustomHeader />;
}
