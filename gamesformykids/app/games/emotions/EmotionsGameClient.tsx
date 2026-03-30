'use client';
import dynamic from 'next/dynamic';
const EmotionsGame = dynamic(() => import('./EmotionsGame'), { ssr: false });
export default function EmotionsGameClient() { return <EmotionsGame />; }
