'use client';

import dynamic from 'next/dynamic';

const MultiplicationGame = dynamic(() => import('./MultiplicationGame'), { ssr: false });

export default function MultiplicationGameClient() {
  return <MultiplicationGame />;
}
