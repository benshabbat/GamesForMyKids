/**
 * ===============================================
 * GameNavigation - ניווט בין משחקים במסכי התחלה
 * ===============================================
 * 
 * ניווט אלגנטי למסכי התחלה של המשחקים
 * כולל חצים, כפתור בית ואינדיקטור מיקום
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
      {/* פס ניווט עליון משופר */}
      <div className="fixed top-3 left-3 right-3 z-[60] game-navigation">
        <div className="navigation-backdrop bg-black/15 rounded-xl border border-white/30 shadow-lg">
          <div className="flex items-center justify-between p-2">
            {/* חץ ימין - משחק קודם */}
            <button
              onClick={() => navigateToGame(previousGame.href)}
              className="bg-white/20 hover:bg-white/30 active:bg-white/40 rounded-lg p-2 transition-all duration-200 border border-white/20 hover:border-white/40 group"
              title={`משחק קודם: ${previousGame.title}`}
              aria-label={`עבור למשחק הקודם: ${previousGame.title}`}
            >
              <ChevronRight className="w-5 h-5 text-white drop-shadow-md group-hover:scale-110 transition-transform" />
            </button>

            {/* כפתור חזרה לעמוד הראשי - במרכז */}
            <button
              onClick={() => router.push('/')}
              className="bg-white/20 hover:bg-white/30 active:bg-white/40 rounded-lg p-2 transition-all duration-200 border border-white/20 hover:border-white/40 group"
              title="חזרה לעמוד הראשי"
              aria-label="חזרה לרשימת המשחקים"
            >
              <Home className="w-5 h-5 text-white drop-shadow-md group-hover:scale-110 transition-transform" />
            </button>

            {/* חץ שמאל - משחק הבא */}
            <button
              onClick={() => navigateToGame(nextGame.href)}
              className="bg-white/20 hover:bg-white/30 active:bg-white/40 rounded-lg p-2 transition-all duration-200 border border-white/20 hover:border-white/40 group"
              title={`משחק הבא: ${nextGame.title}`}
              aria-label={`עבור למשחק הבא: ${nextGame.title}`}
            >
              <ChevronLeft className="w-5 h-5 text-white drop-shadow-md group-hover:scale-110 transition-transform" />
            </button>
          </div>
          
          {/* אינדיקטור נקודות משולב */}
          <div className="pb-2 px-2">
            <div className="flex items-center justify-center gap-1">
              {availableGames.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-white scale-150 shadow-md'
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
