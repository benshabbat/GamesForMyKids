'use client';
import dynamic from 'next/dynamic';

const FroggerGame = dynamic(() => import('./FroggerGame'), { ssr: false });

export default function FroggerClient() {
  return <FroggerGame />;
}
