'use client';

import dynamic from 'next/dynamic';

const FlappyBirdGame = dynamic(() => import('./FlappyBirdGame'), { ssr: false });

export default function FlappyBirdClient() {
  return <FlappyBirdGame />;
}
