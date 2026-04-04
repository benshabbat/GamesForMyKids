'use client';

import dynamic from 'next/dynamic';

const SpaceDefenderGame = dynamic(() => import('./SpaceDefenderGame'), { ssr: false });

export default function SpaceDefenderClient() {
  return <SpaceDefenderGame />;
}
