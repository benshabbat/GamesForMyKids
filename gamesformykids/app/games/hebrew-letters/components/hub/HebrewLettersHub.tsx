'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
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

        {/* Back to Games Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <Link href="/games">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
               חזרה למשחקים
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
