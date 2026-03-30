'use client';

import dynamic from 'next/dynamic';

const FamilyGame = dynamic(() => import('./FamilyGame'), { ssr: false });

export default function FamilyGameClient() {
  return <FamilyGame />;
}
