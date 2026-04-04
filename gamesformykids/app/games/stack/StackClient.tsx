'use client';
import dynamic from 'next/dynamic';

const StackGame = dynamic(() => import('./StackGame'), { ssr: false });

export default function StackClient() {
  return <StackGame />;
}
