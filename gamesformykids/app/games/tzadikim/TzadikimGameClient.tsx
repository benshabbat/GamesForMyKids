'use client';

import dynamic from 'next/dynamic';

const TzadikimGame = dynamic(() => import('./TzadikimGame'), { ssr: false });

export default function TzadikimGameClient() {
  return <TzadikimGame />;
}
