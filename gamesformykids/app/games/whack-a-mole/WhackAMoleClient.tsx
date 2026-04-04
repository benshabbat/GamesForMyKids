'use client';
import dynamic from 'next/dynamic';
const WhackAMoleGame = dynamic(() => import('./WhackAMoleGame'), { ssr: false });
export default function WhackAMoleClient() {
  return <WhackAMoleGame />;
}
