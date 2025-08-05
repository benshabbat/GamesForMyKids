/**
 * ===============================================
 * InGameNavigation - ניווט מינימלי במהלך המשחק
 * ===============================================
 * 
 * ניווט דיסקרטי שלא מפריע למשחק
 * מופיע רק כאשר העכבר קרוב לפינה העליונה
 */

import { Home, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { GamesRegistry, GameRegistration } from "@/lib/registry/gamesRegistry";
import { useEffect, useCallback, useState } from "react";

interface InGameNavigationProps {
  currentGameId: string;
}

export default function InGameNavigation({ currentGameId }: InGameNavigationProps) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  
  const navigateToGame = useCallback((gameHref: string) => {
    router.push(gameHref);
  }, [router]);
  
  // מוצא את המשחק הנוכחי ברשימה
  const availableGames = GamesRegistry.getAllGameRegistrations().filter((game: GameRegistration) => game.available).sort((a: GameRegistration, b: GameRegistration) => a.order - b.order);
  const currentIndex = availableGames.findIndex((game: GameRegistration) => game.id === currentGameId);
  
  const previousGame = currentIndex > 0 ? availableGames[currentIndex - 1] : availableGames[availableGames.length - 1];
  const nextGame = currentIndex < availableGames.length - 1 ? availableGames[currentIndex + 1] : availableGames[0];

  // מציג/מסתיר את הניווט בהתאם למיקום העכבר
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const isNearTop = event.clientY < 80;
      const isNearLeft = event.clientX < 200;
      const isNearRight = event.clientX > window.innerWidth - 200;
      
      setIsVisible(isNearTop && (isNearLeft || isNearRight));
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // תמיכה במקשי חצים במקלדת + ESC
  useEffect(() => {
    if (currentIndex === -1) return;
    
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        navigateToGame(previousGame.href);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        navigateToGame(nextGame.href);
      } else if (event.key === "Escape") {
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
    return null;
  }

  return (
    <>
      {/* ניווט שמופיע בהובר - פינה שמאלית */}
      <div className={`fixed top-3 left-3 z-[70] navigation-fade game-navigation ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full pointer-events-none'
      }`}>
        <div className="navigation-backdrop bg-black/25 rounded-lg border border-white/20 shadow-lg">
          <div className="flex items-center gap-1 p-2">
            <button
              onClick={() => navigateToGame(previousGame.href)}
              className="bg-white/20 hover:bg-white/30 rounded-md p-1.5 transition-all duration-200 group"
              title={`משחק קודם: ${previousGame.title}`}
            >
              <ChevronRight className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
            </button>
            
            <button
              onClick={() => router.push('/')}
              className="bg-white/20 hover:bg-white/30 rounded-md p-1.5 transition-all duration-200 group"
              title="חזרה לעמוד הראשי"
            >
              <Home className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* ניווט שמופיע בהובר - פינה ימנית */}
      <div className={`fixed top-3 right-3 z-[70] navigation-fade game-navigation ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
      }`}>
        <div className="navigation-backdrop bg-black/25 rounded-lg border border-white/20 shadow-lg">
          <div className="flex items-center gap-1 p-2">
            <button
              onClick={() => navigateToGame(nextGame.href)}
              className="bg-white/20 hover:bg-white/30 rounded-md p-1.5 transition-all duration-200 group"
              title={`משחק הבא: ${nextGame.title}`}
            >
              <ChevronLeft className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* אינדיקטור עדין בתחתית שמציג רק במצב הובר */}
      <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[65] navigation-fade game-navigation ${
        isVisible ? 'opacity-60' : 'opacity-0'
      }`}>
        <div className="navigation-backdrop bg-black/20 rounded-full px-2 py-1">
          <div className="flex items-center gap-1">
            {availableGames.map((_, index) => (
              <div
                key={index}
                className={`w-1 h-1 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-white'
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
