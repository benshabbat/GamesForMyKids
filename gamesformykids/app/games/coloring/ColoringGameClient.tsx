'use client';

import dynamic from 'next/dynamic';

const ColoringGame = dynamic(() => import('./components/ColoringGame'), { ssr: false });

export default function ColoringGameClient() {
  return <ColoringGame />;
}
