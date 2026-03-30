'use client';

import dynamic from 'next/dynamic';

const HumanBodyGame = dynamic(() => import('./HumanBodyGame'), { ssr: false });

export default function HumanBodyGameClient() {
  return <HumanBodyGame />;
}
