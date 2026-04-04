'use client';

import dynamic from 'next/dynamic';

const SnakeGame = dynamic(() => import('./SnakeGame'), { ssr: false });

export default function SnakeClient() {
  return <SnakeGame />;
}
