'use client';
import dynamic from 'next/dynamic';
const WordScrambleGame = dynamic(() => import('./WordScrambleGame'), { ssr: false });
export default function WordScrambleClient() { return <WordScrambleGame />; }
