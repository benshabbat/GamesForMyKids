'use client';
import dynamic from 'next/dynamic';

const TriviaGame = dynamic(() => import('./TriviaGame'), { ssr: false });

export default function TriviaGameClient() {
  return <TriviaGame />;
}
