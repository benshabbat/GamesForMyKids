'use client';
import dynamic from 'next/dynamic';
const SequencesGame = dynamic(() => import('./SequencesGame'), { ssr: false });
export default function SequencesGameClient() { return <SequencesGame />; }
