'use client';
import dynamic from 'next/dynamic';
const ClockGame = dynamic(() => import('./ClockGame'), { ssr: false });
export default function ClockGameClient() { return <ClockGame />; }
