/**
 * ===============================================
 * Design Tokens - מערכת עיצוב מרכזית
 * ===============================================
 * 
 * מטרה: לצמצם כפילויות בסגנונות ולשמור על עקביות עיצובית
 */

export const DESIGN_TOKENS = {
  // צבעי יסוד
  colors: {
    primary: {
      blue: {
        base: "bg-blue-500",
        hover: "hover:bg-blue-600",
        text: "text-blue-500",
        border: "border-blue-400",
        borderHover: "border-blue-300",
        light: "bg-blue-500/90",
        textWhite: "text-white"
      },
      green: {
        base: "bg-green-500",
        hover: "hover:bg-green-600", 
        text: "text-green-500",
        border: "border-green-400",
        borderHover: "border-green-300",
        light: "bg-green-500/90",
        textWhite: "text-white"
      },
      red: {
        base: "bg-red-500",
        hover: "hover:bg-red-600",
        text: "text-red-500",
        border: "border-red-400",
        borderHover: "border-red-300",
        light: "bg-red-500/90",
        textWhite: "text-white"
      },
      yellow: {
        base: "bg-yellow-500",
        hover: "hover:bg-yellow-600",
        text: "text-yellow-500",
        border: "border-yellow-400",
        borderHover: "border-yellow-300",
        light: "bg-yellow-500/90",
        textWhite: "text-white"
      }
    },
    gradients: {
      blueToBlue: "bg-gradient-to-r from-blue-500 to-blue-600",
      blueToBlueHover: "hover:from-blue-600 hover:to-blue-700"
    }
  },

  // רווחים
  spacing: {
    button: {
      padding: "px-4 py-2",
      paddingLarge: "px-8 py-4",
      paddingSmall: "px-3 py-1",
      paddingMedium: "px-3 py-1 md:py-3 md:px-4"
    }
  },

  // טקסט
  typography: {
    button: {
      base: "font-bold text-sm",
      large: "font-bold text-xl",
      medium: "font-bold text-sm md:text-base"
    }
  },

  // צללים ואפקטים
  effects: {
    shadow: "shadow-lg",
    rounded: "rounded-lg",
    roundedFull: "rounded-full",
    roundedXl: "rounded-xl",
    backdrop: "backdrop-blur-sm",
    transition: "transition-all duration-200",
    transitionLong: "transition-all duration-300",
    hover: {
      scale: "hover:scale-105",
      scaleActive: "active:scale-95"
    }
  },

  // קומפוזיציות נפוצות
  compositions: {
    primaryButton: "bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-bold transition-all duration-200 shadow-lg",
    secondaryButton: "bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-bold transition-all duration-200 shadow-lg",
    gameButton: "backdrop-blur-sm font-bold rounded-xl shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2 border-2",
    card: "rounded-lg shadow-lg transition-all duration-200 hover:scale-105"
  }
} as const;

/**
 * פונקציות עזר לבניית מחלקות CSS
 */
export const buildButtonClasses = (variant: 'primary' | 'secondary' | 'success' | 'danger' = 'primary', size: 'sm' | 'md' | 'lg' = 'md') => {
  const baseClasses = "font-bold rounded-lg transition-all duration-200 shadow-lg";
  
  const variants = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    secondary: "bg-gray-500 hover:bg-gray-600 text-white", 
    success: "bg-green-500 hover:bg-green-600 text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white"
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base", 
    lg: "px-8 py-4 text-xl"
  };

  return `${baseClasses} ${variants[variant]} ${sizes[size]}`;
};

export const buildGameButtonClasses = (color: 'blue' | 'green' | 'red' | 'yellow' = 'blue') => {
  const base = DESIGN_TOKENS.compositions.gameButton;
  const colorClasses = {
    blue: "bg-blue-500/90 hover:bg-blue-600 border-blue-400 hover:border-blue-300",
    green: "bg-green-500/90 hover:bg-green-600 border-green-400 hover:border-green-300", 
    red: "bg-red-500/90 hover:bg-red-600 border-red-400 hover:border-red-300",
    yellow: "bg-yellow-500/90 hover:bg-yellow-600 border-yellow-400 hover:border-yellow-300"
  };
  
  return `${base} ${colorClasses[color]} text-white`;
};
