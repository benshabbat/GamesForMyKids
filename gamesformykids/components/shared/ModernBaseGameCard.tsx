'use client';

import { ReactNode, forwardRef } from "react";
import { motion, type Variants } from 'framer-motion';
import { cn } from "@/lib/utils";
import { BaseGameItem } from "@/lib/types/base";

// Modern TypeScript interfaces with better organization
interface BaseGameCardProps {
  item: BaseGameItem;
  onClick: (item: BaseGameItem) => void;
  
  // Visual Design
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'custom';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  aspectRatio?: 'square' | 'wide' | 'tall';
  
  // Content Configuration
  showEmoji?: boolean;
  showHebrew?: boolean;
  showEnglish?: boolean;
  customContent?: ReactNode;
  description?: string;
  digit?: string;
  
  // Animation & Interaction
  animationType?: 'bounce' | 'scale' | 'float' | 'glow' | 'none';
  hoverEffect?: 'lift' | 'scale' | 'glow' | 'rotate' | 'none';
  
  // Styling
  className?: string;
  backgroundPattern?: 'dots' | 'grid' | 'waves' | 'none';
  customDecoration?: ReactNode;
  
  // Accessibility
  'aria-label'?: string;
  disabled?: boolean;
}

// Animation variants for Framer Motion
const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    y: 20
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.05,
    y: -4,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1
    }
  }
};

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      delay: 0.2,
      duration: 0.3
    }
  }
};

/**
 * Modern BaseGameCard Component
 * 
 * A highly customizable, accessible, and performant game card component
 * optimized for Next.js 15 with modern React patterns.
 * 
 * Features:
 * - Smooth Framer Motion animations
 * - Full accessibility support
 * - Responsive design
 * - Clean TypeScript interfaces
 * - Modern CSS-in-JS styling
 */
const BaseGameCard = forwardRef<HTMLButtonElement, BaseGameCardProps>(({
  item,
  onClick,
  variant = 'primary',
  size = 'md',
  aspectRatio = 'square',
  showEmoji = true,
  showHebrew = true,
  showEnglish = false,
  customContent,
  description,
  digit,
  animationType = 'bounce',
  hoverEffect = 'lift',
  className = '',
  backgroundPattern = 'none',
  customDecoration,
  'aria-label': ariaLabel,
  disabled = false,
}, ref) => {
  
  // Generate classes based on props
  const variantClasses = {
    primary: 'bg-gradient-to-br from-primary-400 to-primary-600 hover:from-primary-500 hover:to-primary-700',
    secondary: 'bg-gradient-to-br from-secondary-400 to-secondary-600 hover:from-secondary-500 hover:to-secondary-700',
    success: 'bg-gradient-to-br from-success-400 to-success-600 hover:from-success-500 hover:to-success-700',
    warning: 'bg-gradient-to-br from-warning-400 to-warning-600 hover:from-warning-500 hover:to-warning-700',
    custom: 'bg-gradient-to-br from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700'
  };
  
  const sizeClasses = {
    sm: 'p-4 text-4xl min-h-[120px]',
    md: 'p-6 text-6xl min-h-[160px]',
    lg: 'p-8 text-7xl min-h-[200px]',
    xl: 'p-10 text-8xl min-h-[240px]'
  };
  
  const aspectClasses = {
    square: 'aspect-square',
    wide: 'aspect-[4/3]',
    tall: 'aspect-[3/4]'
  };
  
  const animationClasses = {
    bounce: 'animate-bounce-gentle',
    scale: 'animate-scale-in',
    float: 'animate-float',
    glow: 'animate-glow',
    none: ''
  };
  
  const backgroundPatterns = {
    dots: 'bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[size:20px_20px]',
    grid: 'bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]',
    waves: 'bg-[url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")]',
    none: ''
  };
  
  // Handle click with proper event handling
  const handleClick = () => {
    if (!disabled) {
      onClick(item);
    }
  };
  
  // Handle keyboard interaction
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };
  
  return (
    <motion.button
      ref={ref}
      className={cn(
        // Base styles
        'game-card relative overflow-hidden rounded-2xl border-4 border-white/20',
        'focus:outline-none focus:ring-4 focus:ring-primary-500/50 focus:ring-offset-2',
        'transition-all duration-200 ease-out',
        'cursor-pointer select-none',
        
        // Responsive and layout
        'w-full flex flex-col items-center justify-center',
        'text-white font-bold text-center',
        
        // Variant styles
        variantClasses[variant],
        
        // Size styles
        sizeClasses[size],
        
        // Aspect ratio
        aspectClasses[aspectRatio],
        
        // Animation classes
        animationClasses[animationType],
        
        // Background pattern
        backgroundPatterns[backgroundPattern],
        
        // Disabled state
        disabled && 'opacity-50 cursor-not-allowed',
        
        // Custom classes
        className
      )}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={!disabled ? "hover" : undefined}
      whileTap={!disabled ? "tap" : undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      aria-label={ariaLabel || `משחק ${item.hebrew || item.english}`}
      role="button"
      tabIndex={disabled ? -1 : 0}
    >
      {/* Background decoration */}
      {customDecoration && (
        <div className="absolute inset-0 pointer-events-none">
          {customDecoration}
        </div>
      )}
      
      {/* Main content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full"
        variants={contentVariants}
      >
        {/* Custom content takes precedence */}
        {customContent ? (
          customContent
        ) : (
          <>
            {/* Emoji display */}
            {showEmoji && item.emoji && (
              <motion.div
                className="mb-2 filter drop-shadow-lg"
                whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-6xl md:text-7xl" role="img" aria-label={item.english}>
                  {item.emoji}
                </span>
              </motion.div>
            )}
            
            {/* Digit display for number games */}
            {digit && (
              <motion.div 
                className="text-8xl md:text-9xl font-black mb-2 text-white/90 drop-shadow-lg"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                {digit}
              </motion.div>
            )}
            
            {/* Hebrew text */}
            {showHebrew && item.hebrew && (
              <motion.div
                className="text-lg md:text-xl font-bold text-white/95 text-center leading-tight game-text-hebrew"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {item.hebrew}
              </motion.div>
            )}
            
            {/* English text */}
            {showEnglish && item.english && (
              <motion.div
                className="text-sm md:text-base font-medium text-white/80 mt-1"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {item.english}
              </motion.div>
            )}
            
            {/* Description */}
            {description && (
              <motion.div
                className="text-xs md:text-sm text-white/70 mt-2 text-center px-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {description}
              </motion.div>
            )}
          </>
        )}
      </motion.div>
      
      {/* Hover overlay effect */}
      <motion.div
        className="absolute inset-0 bg-white/10 opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Loading state indicator */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 animate-shimmer pointer-events-none" />
    </motion.button>
  );
});

BaseGameCard.displayName = 'BaseGameCard';

export default BaseGameCard;
