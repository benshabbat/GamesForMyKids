'use client';

import { motion } from 'framer-motion';
import HubHeader from './HubHeader';
import HebrewLettersStats from '../stats/HebrewLettersStats';
import LettersGrid from './LettersGrid';
import HubInstructions from './HubInstructions';
import HubFunFacts from './HubFunFacts';

export default function HebrewLettersHub() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-6xl mx-auto">
        <HubHeader />
        <HebrewLettersStats />
        <LettersGrid />
        <HubInstructions />
        <HubFunFacts />
      </div>
    </div>
  );
}
