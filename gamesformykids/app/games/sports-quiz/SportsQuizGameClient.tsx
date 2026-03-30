'use client';
import dynamic from 'next/dynamic';
const SportsQuizGame = dynamic(() => import('./SportsQuizGame'), { ssr: false });
export default function SportsQuizGameClient() { return <SportsQuizGame />; }
