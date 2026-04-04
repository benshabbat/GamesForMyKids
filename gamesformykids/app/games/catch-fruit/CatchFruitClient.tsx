'use client';

import dynamic from 'next/dynamic';

const CatchFruitGame = dynamic(() => import('./CatchFruitGame'), { ssr: false });

export default function CatchFruitClient() {
  return <CatchFruitGame />;
}
