'use client';

import dynamic from 'next/dynamic';

const WordBuilderGame = dynamic(() => import('./WordBuilderGame'), { ssr: false });

export default function WordBuilderGameClient() {
  return <WordBuilderGame />;
}
