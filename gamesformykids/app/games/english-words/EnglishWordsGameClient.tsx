'use client';
import dynamic from 'next/dynamic';
const EnglishWordsGame = dynamic(() => import('./EnglishWordsGame'), { ssr: false });
export default function EnglishWordsGameClient() { return <EnglishWordsGame />; }
