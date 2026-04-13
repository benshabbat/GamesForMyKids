'use client';

import PuzzleHeader from './PuzzleHeader';

interface UnifiedHeaderProps {
  type?: 'simple' | 'custom';
}

const HEADER_CONTENT = {
  simple: { title: '🧩 פאזלים פשוטים', subtitle: 'בחר פאזל ותתחיל לשחק!' },
  custom: { title: '🧩 פאזל מותאם אישית', subtitle: 'העלה תמונה וצור פאזל משלך!' },
};

export default function UnifiedHeader({ type = 'simple' }: UnifiedHeaderProps) {
  const { title, subtitle } = HEADER_CONTENT[type];
  return <PuzzleHeader title={title} subtitle={subtitle} />;
}
