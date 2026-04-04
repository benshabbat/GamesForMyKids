'use client';

import dynamic from 'next/dynamic';

const SoccerGame = dynamic(() => import('./SoccerGame'), { ssr: false });

export default function SoccerGameClient() {
  return <SoccerGame />;
}
