'use client';
import dynamic from 'next/dynamic';
const MathRaceGame = dynamic(() => import('./MathRaceGame'), { ssr: false });
export default function MathRaceClient() { return <MathRaceGame />; }
