'use client';
import dynamic from 'next/dynamic';
const DamkaGame = dynamic(() => import('./DamkaGame'), { ssr: false });
export default function DamkaClient() { return <DamkaGame />; }
