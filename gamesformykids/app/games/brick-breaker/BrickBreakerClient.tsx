'use client';
import dynamic from 'next/dynamic';
const BrickBreakerGame = dynamic(() => import('./BrickBreakerGame'), { ssr: false });
export default function BrickBreakerClient() {
  return <BrickBreakerGame />;
}
