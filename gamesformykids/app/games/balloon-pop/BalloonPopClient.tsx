'use client';
import dynamic from 'next/dynamic';
const BalloonPopGame = dynamic(() => import('./BalloonPopGame'), { ssr: false });
export default function BalloonPopClient() {
  return <BalloonPopGame />;
}
