'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { hebrewLetters } from '@/app/games/hebrew-letters/constants/hebrewLetters';
import { Card, CardContent } from '@/components/ui/card';
import HebrewLetterProgress from './HebrewLetterProgress';

export default function LettersGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
      {hebrewLetters.map((letter, index) => (
        <motion.div
          key={letter.name}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
        >
          <Link href={`/games/hebrew-letters/${letter.name}`}>
            <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 hover:border-green-400">
              <CardContent className="p-6">
                <HebrewLetterProgress
                  letter={letter}
                  showName={true}
                  size="lg"
                />
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
