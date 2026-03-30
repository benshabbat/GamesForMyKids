'use client';
import dynamic from 'next/dynamic';
const RiddlesGame = dynamic(() => import('./RiddlesGame'), { ssr: false });
export default function RiddlesGameClient() { return <RiddlesGame />; }
