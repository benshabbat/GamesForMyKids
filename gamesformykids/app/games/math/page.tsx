'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Volume2 } from 'lucide-react';
import { useMathGame } from './useMathGame';
import CelebrationBox from '@/components/shared/CelebrationBox';
import TipsBox from '@/components/shared/TipsBox';
import GameHeader from '@/components/shared/GameHeader';

// קומפוננטה לכרטיס מספר מתמטי
interface MathNumberCardProps {
  number: number;
  onClick: (num: number) => void;
}

const MathNumberCard = ({ number, onClick }: MathNumberCardProps) => (
  <motion.button
    onClick={() => onClick(number)}
    className="bg-white p-8 text-6xl font-bold text-blue-600 
               rounded-3xl shadow-lg border-4 border-blue-200 
               hover:scale-110 hover:bg-blue-50 hover:border-blue-400
               transition-all duration-300 transform
               focus:outline-none focus:ring-4 focus:ring-blue-300"
    role="button"
    aria-label={`מספר ${number}`}
    whileHover={{ scale: 1.1, rotate: [0, 2, -2, 0] }}
    whileTap={{ scale: 0.95 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
  >
    {number}
  </motion.button>
);

// Loading component for Suspense
function MathGameSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-20 bg-gray-200 rounded-xl" />
      <div className="h-64 bg-gray-200 rounded-3xl" />
      <div className="grid grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((id) => (
          <div key={`skeleton-card-${id}`} className="h-24 bg-gray-200 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

/**
 * Modern Math Game Component with Next.js 15 Optimizations
 * 
 * This is a special mathematical game with unique features:
 * - Mathematical expression display with visual representation
 * - Dynamic number generation and answer options
 * - Audio support for accessibility
 * - Animated visual aids (emojis) for counting
 * - Real-time feedback and celebration
 * 
 * While it shares common game patterns, it has specialized logic
 * for math operations, answer validation, and educational content.
 */
export default function MathGame() {
  const {
    gameState,
    speakQuestion,
    startGame,
    handleNumberClick,
    resetGame,
  } = useMathGame();

  // Early return for start screen - משחק מתמטיקה מיוחד עם מסך פתיחה
  if (!gameState.isPlaying) {
    return (
      <Suspense fallback={<MathGameSkeleton />}>
        <motion.div
          className="flex flex-col items-center justify-center min-h-[60vh] space-y-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.div
            className="text-8xl mb-4"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            🧮
          </motion.div>
          
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-center text-blue-800 game-text-hebrew"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
          >
            משחק מתמטיקה
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-center text-gray-600 max-w-2xl mx-auto game-text-hebrew"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            פתרו תרגילי חיבור וחיסור במספרים קטנים
          </motion.p>
          
          <motion.button
            onClick={startGame}
            className="game-button game-button-primary text-3xl px-12 py-6 mt-8"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            🚀 בואו נתחיל!
          </motion.button>
        </motion.div>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<MathGameSkeleton />}>
      {/* Enhanced Header with Modern Design */}
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex items-center justify-center gap-4 mb-6">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Calculator className="w-12 h-12 text-orange-600" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            משחק המתמטיקה
          </h1>
        </div>
        
        <GameHeader
          score={gameState.score}
          level={gameState.level}
          onHome={() => (window.location.href = "/")}
          onReset={resetGame}
          scoreColor="text-orange-800"
          levelColor="text-orange-600"
        />
      </motion.div>

        {/* Mathematical Challenge Display */}
        {gameState.currentChallenge && !gameState.showCelebration && (
          <motion.div 
            className="game-card bg-white rounded-3xl p-8 mb-8 shadow-xl border-2 border-orange-100"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center game-text-hebrew"
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2 }}
            >
              פתור את התרגיל
            </motion.h2>
            
            {/* Mathematical Expression Display */}
            <motion.div 
              className="mb-6 p-8 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border-4 border-orange-200"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-6xl md:text-8xl text-center font-bold text-orange-800 mb-4">
                {gameState.currentChallenge.firstNumber} {gameState.currentChallenge.operation === 'addition' ? '+' : '-'} {gameState.currentChallenge.secondNumber} = ?
              </div>
              
              {/* Visual Representation */}
              <div className="flex justify-center items-center gap-8 text-5xl flex-wrap">
                {/* First Number Visual */}
                <motion.div 
                  className="flex flex-wrap justify-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {Array.from({ length: gameState.currentChallenge.firstNumber }, (_, index) => (
                    <motion.span 
                      key={`num1-${index}`}
                      className="text-blue-500"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        delay: 0.5 + (index * 0.1),
                        duration: 0.3,
                        ease: "backOut"
                      }}
                      whileHover={{ scale: 1.2, rotate: 10 }}
                    >
                      {gameState.currentChallenge?.emoji || '🔵'}
                    </motion.span>
                  ))}
                </motion.div>
                
                {/* Operator */}
                <motion.span 
                  className="text-6xl font-bold text-orange-600"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.4, ease: "backOut" }}
                  whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
                >
                  {gameState.currentChallenge.operation === 'addition' ? '➕' : '➖'}
                </motion.span>
                
                {/* Second Number Visual */}
                <motion.div 
                  className="flex flex-wrap justify-center gap-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 }}
                >
                  {gameState.currentChallenge.operation === 'addition' ? (
                    // Addition: Add more emojis
                    Array.from({ length: gameState.currentChallenge.secondNumber }, (_, index) => (
                      <motion.span 
                        key={`add-${index}`}
                        className="text-green-500"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          delay: 1.2 + (index * 0.1),
                          duration: 0.3,
                          ease: "backOut"
                        }}
                        whileHover={{ scale: 1.2, rotate: -10 }}
                      >
                        {gameState.currentChallenge?.emoji || '🟢'}
                      </motion.span>
                    ))
                  ) : (
                    // Subtraction: Show red X marks
                    Array.from({ length: gameState.currentChallenge.secondNumber }, (_, index) => (
                      <motion.span 
                        key={`sub-${index}`}
                        className="text-red-500"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          delay: 1.2 + (index * 0.1),
                          duration: 0.3,
                          ease: "backOut"
                        }}
                        whileHover={{ scale: 1.2, rotate: 180 }}
                      >
                        ❌
                      </motion.span>
                    ))
                  )}
                </motion.div>
              </div>
            </motion.div>

            {/* Audio Button */}
            <motion.button
              className="game-button game-button-secondary flex items-center gap-3 mx-auto mb-4"
              onClick={speakQuestion}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="השמע שאלה"
            >
              <Volume2 className="w-6 h-6" />
              <span>שמע שוב</span>
            </motion.button>
            
            <motion.p 
              className="text-xl text-gray-600 text-center game-text-hebrew"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              בחר את התשובה הנכונה!
            </motion.p>
          </motion.div>
        )}

        {/* Success Celebration */}
        {gameState.showCelebration && gameState.currentChallenge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "backOut" }}
          >
            <CelebrationBox 
              label="תשובה נכונה!" 
              value={`${gameState.currentChallenge.firstNumber} ${gameState.currentChallenge.operation === 'addition' ? '+' : '-'} ${gameState.currentChallenge.secondNumber} = ${gameState.currentChallenge.correctAnswer}`} 
            />
          </motion.div>
        )}

        {/* Answer Options Grid - תשובות למשחק המתמטיקה */}
        <motion.div 
          className="grid grid-cols-2 gap-6 max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 0.5 }}
        >
          {gameState.options && gameState.options.length > 0 ? (
            gameState.options.map((answer: number, index: number) => (
              <motion.div
                key={`answer-${answer}-${gameState.currentChallenge?.firstNumber || 'none'}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 2.2 + (index * 0.1),
                  duration: 0.4,
                  ease: "backOut"
                }}
              >
                <MathNumberCard
                  number={answer}
                  onClick={handleNumberClick}
                />
              </motion.div>
            ))
          ) : (
            <motion.div 
              className="col-span-2 text-center text-gray-500 py-8"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full" />
                טוען אפשרויות...
              </div>
            </motion.div>
          )}
        </motion.div>
        
        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.5 }}
        >
          <TipsBox
            tip="💡 טיפ: השתמש בסמלים כדי לעזור לך לחשב!"
            description="ספור את הסמלים שרואה על המסך כדי לפתור את התרגיל"
          />
        </motion.div>
    </Suspense>
  );
}
