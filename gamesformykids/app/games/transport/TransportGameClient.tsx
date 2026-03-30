'use client';

import dynamic from 'next/dynamic';

const TransportGame = dynamic(() => import('./TransportGame'), { ssr: false });

export default function TransportGameClient() {
  return <TransportGame />;
}
