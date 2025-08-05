/**
 * ===============================================
 * SimpleGameNavigation - ניווט פשוט ואחיד
 * ===============================================
 * 
 * ניווט אחד שעובד בכל מקום:
 * - במסכי התחלה
 * - במהלך המשחק  
 * - פשוט ונקי
 */

import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { GamesRegistry, GameRegistration } from "@/lib/registry/gamesRegistry";
import { useEffect, useCallback, useState } from "react";

interface SimpleGameNavigationProps {
  currentGameId: string;
}

export default function SimpleGameNavigation({ currentGameId }: SimpleGameNavigationProps) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  
  const navigateToGame = useCallback((gameHref: string) => {
    router.push(gameHref);
  }, [router]);
  
  // מוצא את המשחק הנוכחי ברשימה
  const availableGames = GamesRegistry.getAllGameRegistrations()
    .filter((game: GameRegistration) => game.available)
    .sort((a: GameRegistration, b: GameRegistration) => a.order - b.order);
  
  const currentIndex = availableGames.findIndex((game: GameRegistration) => game.id === currentGameId);
  
  const previousGame = currentIndex > 0 ? availableGames[currentIndex - 1] : availableGames[availableGames.length - 1];
  const nextGame = currentIndex < availableGames.length - 1 ? availableGames[currentIndex + 1] : availableGames[0];

  // תמיכה במקשי חצים + ESC
  useEffect(() => {
    if (currentIndex === -1) return;
    
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        if (previousGame) navigateToGame(previousGame.href);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        if (nextGame) navigateToGame(nextGame.href);
      } else if (event.key === "Escape") {
        event.preventDefault();
        router.push('/');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, navigateToGame, previousGame, nextGame, router]);

  // במהלך המשחק - הסתר אוטומטית ולהופיע רק כשמעליזים למעלה
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleMouseMove = (event: MouseEvent) => {
      const isNearTop = event.clientY < 80;
      
      if (isNearTop) {
        setIsVisible(true);
        clearTimeout(timeoutId);
      } else {
        timeoutId = setTimeout(() => {
          setIsVisible(false);
        }, 2000); // נעלם אחרי 2 שניות
      }
    };

    // התחל עם ניווט גלוי
    setIsVisible(true);
    
    // הסתר אחרי 3 שניות
    timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);

  if (currentIndex === -1) return null;

  return (
    <div className={`
      fixed top-4 left-1/2 transform -translate-x-1/2 z-50
      transition-all duration-300 ease-in-out
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
    `}>
      <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-white/20 px-4 py-2">
        {/* כפתור חזרה לעמוד הראשי */}
        <button
          onClick={() => router.push('/')}
          className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors shadow-md"
          title="חזרה לעמוד הראשי (ESC)"
        >
          <Home size={18} />
        </button>

        {/* חץ ימין - משחק קודם */}
        {previousGame && (
          <button
            onClick={() => navigateToGame(previousGame.href)}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            title={`משחק קודם: ${previousGame.title}`}
          >
            <ChevronRight size={18} />
          </button>
        )}

        {/* אינדיקטור מיקום */}
        <div className="flex items-center gap-1 px-3">
          <span className="text-sm font-medium text-gray-700">
            {currentIndex + 1}
          </span>
          <span className="text-xs text-gray-500">
            / {availableGames.length}
          </span>
        </div>

        {/* חץ שמאל - משחק הבא */}
        {nextGame && (
          <button
            onClick={() => navigateToGame(nextGame.href)}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            title={`משחק הבא: ${nextGame.title}`}
          >
            <ChevronLeft size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
