'use client';
import dynamic from 'next/dynamic';
const SpellingGame = dynamic(() => import('./SpellingGame'), { ssr: false });
export default function SpellingGameClient() { return <SpellingGame />; }
