'use client';
import dynamic from 'next/dynamic';
const EmojiMathGame = dynamic(() => import('./EmojiMathGame'), { ssr: false });
export default function EmojiMathClient() { return <EmojiMathGame />; }
