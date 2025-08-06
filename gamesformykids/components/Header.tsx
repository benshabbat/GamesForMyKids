'use client';

import { motion } from 'framer-motion';
import { Gamepad2, Sparkles } from 'lucide-react';

/**
 * Modern Header Component with Next.js 15 optimizations
 * Features:
 * - Smooth animations with Framer Motion
 * - Accessible design
 * - Modern styling with CSS variables
 * - Responsive design
 */
function Header() {
  return (
    <motion.header 
      className="text-center py-8 px-4"
      role="banner"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Main Title with Icon */}
      <motion.div 
        className="flex items-center justify-center gap-4 mb-6"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      >
        <motion.div
          className="text-6xl md:text-8xl"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Gamepad2 className="w-16 h-16 md:w-20 md:h-20 text-primary-600" />
        </motion.div>
        
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-700 bg-clip-text text-transparent game-text-shadow"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        >
          משחקים לילדים
        </motion.h1>
        
        <motion.div
          className="text-6xl md:text-8xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
        >
          <Sparkles className="w-16 h-16 md:w-20 md:h-20 text-secondary-500" />
        </motion.div>
      </motion.div>

      {/* Subtitle */}
      <motion.p 
        className="text-lg md:text-xl lg:text-2xl text-secondary-700 font-semibold mb-4 game-text-hebrew"
        role="doc-subtitle"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
      >
        משחקים מהנים וחינוכיים לגיל 2-5!
      </motion.p>

      {/* Decorative Elements */}
      <motion.div 
        className="flex justify-center gap-2 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        {['dot-1', 'dot-2', 'dot-3', 'dot-4', 'dot-5'].map((id, i) => (
          <motion.div
            key={id}
            className="w-3 h-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>

      {/* Accessibility Enhancement */}
      <div className="sr-only">
        <h2>ברוכים הבאים לאתר המשחקים החינוכיים לילדים</h2>
        <p>כאן תמצאו מגוון רחב של משחקים מהנים וחינוכיים המותאמים לילדים בגילאי 2-5 שנים</p>
      </div>
    </motion.header>
  );
}

export default Header;
