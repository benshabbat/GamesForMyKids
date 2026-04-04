'use client';
import dynamic from 'next/dynamic';

const SimonGame = dynamic(() => import('./SimonGame'), { ssr: false });

export default function SimonClient() {
  return <SimonGame />;
}
