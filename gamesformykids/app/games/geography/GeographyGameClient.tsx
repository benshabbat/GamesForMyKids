'use client';
import dynamic from 'next/dynamic';

const GeographyGame = dynamic(() => import('./GeographyGame'), { ssr: false });

export default function GeographyGameClient() {
  return <GeographyGame />;
}
