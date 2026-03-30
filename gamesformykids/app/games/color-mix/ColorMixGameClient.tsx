'use client';
import dynamic from 'next/dynamic';

const ColorMixGame = dynamic(() => import('./ColorMixGame'), { ssr: false });

export default function ColorMixGameClient() {
  return <ColorMixGame />;
}
