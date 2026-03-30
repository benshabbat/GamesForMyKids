'use client';
import dynamic from 'next/dynamic';
const Shapes3DGame = dynamic(() => import('./Shapes3DGame'), { ssr: false });
export default function Shapes3DGameClient() { return <Shapes3DGame />; }
