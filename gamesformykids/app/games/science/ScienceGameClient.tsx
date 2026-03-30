'use client';
import dynamic from 'next/dynamic';

const ScienceGame = dynamic(() => import('./ScienceGame'), { ssr: false });

export default function ScienceGameClient() {
  return <ScienceGame />;
}
