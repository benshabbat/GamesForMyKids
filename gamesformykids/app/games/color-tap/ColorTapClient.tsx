'use client';
import dynamic from 'next/dynamic';

const ColorTapGame = dynamic(() => import('./ColorTapGame'), { ssr: false });

export default function ColorTapClient() {
  return <ColorTapGame />;
}
