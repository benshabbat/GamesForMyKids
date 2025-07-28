/**
 * ===============================================
 * GameNavigation - ניווט בין משחקים
 * ===============================================
 * 
 * מוסיף חצים לניווט למשחק הקודם/הבא
 * במסכי ההתחלה של כל המשחקים
 * תומך גם במקשי חצים במקלדת
 */

import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { GamesRegistry, GameRegistration } from "@/lib/registry/gamesRegistry";
import { useEffect, useCallback } from "react";

interface GameNavigationProps {
  currentGameId: string;
}

export default function GameNavigation({ currentGameId }: GameNavigationProps) {
  const router = useRouter();
  
  const navigateToGame = useCallback((gameHref: string) => {
    router.push(gameHref);
  }, [router]);
  
  // מוצא את המשחק הנוכחי ברשימה
  const availableGames = GamesRegistry.getAllGameRegistrations().filter((game: GameRegistration) => game.available).sort((a: GameRegistration, b: GameRegistration) => a.order - b.order);
  const currentIndex = availableGames.findIndex((game: GameRegistration) => game.id === currentGameId);
  
  const previousGame = currentIndex > 0 ? availableGames[currentIndex - 1] : availableGames[availableGames.length - 1];
  const nextGame = currentIndex < availableGames.length - 1 ? availableGames[currentIndex + 1] : availableGames[0];

  // תמיכה במקשי חצים במקלדת (מותאם לעברית) + ESC
  useEffect(() => {
    if (currentIndex === -1) return; // אם אין משחק נוכחי, לא להוסיף event listeners
    
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        // חץ ימין = משחק קודם (בעברית ימין = אחורה)
        event.preventDefault();
        navigateToGame(previousGame.href);
      } else if (event.key === "ArrowLeft") {
        // חץ שמאל = משחק הבא (בעברית שמאל = קדימה)
        event.preventDefault();
        navigateToGame(nextGame.href);
      } else if (event.key === "Escape") {
        // ESC = חזרה לעמוד הראשי
        event.preventDefault();
        router.push('/');
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentIndex, previousGame?.href, nextGame?.href, navigateToGame, router]);

  if (currentIndex === -1) {
    // אם המשחק הנוכחי לא נמצא ברשימה, לא מציגים ניווט
    return null;
  }

  return (
    <>
      {/* חצי ניווט מינימליים */}
      <div className="fixed top-4 left-4 right-4 flex justify-between items-start z-50 pointer-events-none">
        {/* חץ ימין - משחק קודם */}
        <button
          onClick={() => navigateToGame(previousGame.href)}
          className="pointer-events-auto bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-lg p-2 transition-all duration-200 border border-white/20"
          title={`משחק קודם: ${previousGame.title}`}
          aria-label={`עבור למשחק הקודם: ${previousGame.title}`}
        >
          <ChevronRight className="w-5 h-5 text-white drop-shadow-lg" />
        </button>

        {/* חץ שמאל - משחק הבא */}
        <button
          onClick={() => navigateToGame(nextGame.href)}
          className="pointer-events-auto bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-lg p-2 transition-all duration-200 border border-white/20"
          title={`משחק הבא: ${nextGame.title}`}
          aria-label={`עבור למשחק הבא: ${nextGame.title}`}
        >
          <ChevronLeft className="w-5 h-5 text-white drop-shadow-lg" />
        </button>
      </div>

      {/* כפתור חזרה لعמוד הראשי - מיקום נפרד */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
        <button
          onClick={() => router.push('/')}
          className="pointer-events-auto bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-lg p-2 transition-all duration-200 border border-white/20"
          title="חזרה לעמוד הראשי"
          aria-label="חזרה לרשימת המשחקים"
        >
          <Home className="w-5 h-5 text-white drop-shadow-lg" />
        </button>
      </div>

      {/* אינדיקטור נקודות בתחתית */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
        <div className="bg-black/30 backdrop-blur-sm rounded-full px-3 py-2">
          <div className="flex items-center gap-1">
            {availableGames.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-white scale-125'
                    : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
