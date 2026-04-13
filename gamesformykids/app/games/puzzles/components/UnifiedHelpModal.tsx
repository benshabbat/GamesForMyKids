'use client';

import SimpleHelpModal from './SimpleHelpModal';
import CustomHelpModal from './CustomHelpModal';

interface UnifiedHelpModalProps {
  type?: 'simple' | 'custom';
}

export default function UnifiedHelpModal({ type = 'simple' }: UnifiedHelpModalProps) {
  return type === 'simple' ? <SimpleHelpModal /> : <CustomHelpModal />;
}
