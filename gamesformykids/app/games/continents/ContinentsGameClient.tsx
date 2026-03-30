'use client';

import dynamic from 'next/dynamic';

const ContinentsGame = dynamic(() => import('./ContinentsGame'), { ssr: false });

export default function ContinentsGameClient() {
  return <ContinentsGame />;
}
