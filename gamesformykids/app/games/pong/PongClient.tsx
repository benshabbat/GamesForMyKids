'use client';
import dynamic from 'next/dynamic';
const PongGame = dynamic(() => import('./PongGame'), { ssr: false });
export default function PongClient() {
  return <PongGame />;
}
