'use client';
import dynamic from 'next/dynamic';

const ArithmeticGame = dynamic(() => import('./ArithmeticGame'), { ssr: false });

export default function ArithmeticGameClient() {
  return <ArithmeticGame />;
}
