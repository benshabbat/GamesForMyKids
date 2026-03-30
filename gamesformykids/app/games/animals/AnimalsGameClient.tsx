'use client';

import dynamic from 'next/dynamic';

const AnimalsGame = dynamic(() => import('./AnimalsGame'), { ssr: false });

export default function AnimalsGameClient() {
  return <AnimalsGame />;
}
