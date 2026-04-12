'use client';

import dynamic from 'next/dynamic';

const TakiGame = dynamic(() => import('./TakiGame'), { ssr: false });

export default function TakiClient() {
  return <TakiGame />;
}
