"use client";

import { ComponentType, createElement, isValidElement, ReactNode, useEffect } from "react";
import Link from "next/link";
import { Home, ArrowLeft, ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { getGameNavigation } from "@/lib/utils/game/gameNavigation";
import { GamesRegistry } from "@/lib/registry/gamesRegistry";

interface UniversalGameNavigationProps {
  showHomeButton?: boolean;
}

function renderIcon(
  icon: ComponentType<{ className?: string }> | ReactNode,
  className: string = "w-4 h-4 md:w-5 md:h-5"
) {
  try {
    if (typeof icon === "function") {
      return createElement(icon, { className });
    }
    if (isValidElement(icon)) {
      return icon;
    }
    return null;
  } catch (error) {
    console.warn("Error rendering icon:", error);
    return null;
  }
}

export default function UniversalGameNavigation({
  showHomeButton = true,
}: UniversalGameNavigationProps) {
  const pathname = usePathname();

  // Extract game ID from pathname (e.g., "/games/building" -> "building")
  const gameId = pathname.split("/").pop() || "";

  // Get current game info
  const currentGame = GamesRegistry.getGameById(gameId);
  const navigation = getGameNavigation(gameId);

  // Keyboard shortcuts - רק ESC לחזרה לבית, בלי חצים כדי לא להפריע למשחקים
  useEffect(() => {
    if (!currentGame) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      // Escape key - go home
      if (event.key === "Escape" && showHomeButton) {
        window.location.href = "/";
        return;
      }

      // הוסרו חצי המקלדת כדי לא להפריע למשחקים שמשתמשים בהם
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [showHomeButton, currentGame]);

  // Don't render navigation on non-game pages or if currentGame is not found
  if (!gameId || !currentGame || gameId === "games") {
    return null;
  }

  // Don't render navigation on non-game pages
  if (!gameId || !currentGame) {
    return null;
  }

  return (
    <div className="fixed top-4 left-4 right-4 z-50 flex justify-between items-center pointer-events-none">
      {/* Right side - Next */}
      <div className="flex gap-2 pointer-events-auto">
        {navigation.previous && (
          <Link
            href={navigation.previous.href}
            className="bg-blue-500/90 backdrop-blur-sm hover:bg-blue-600 text-white font-bold py-2 px-3 md:py-3 md:px-4 rounded-xl shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2 text-sm md:text-base border-2 border-blue-400 hover:border-blue-300"
            title={`${navigation.previous.title} (←)`}
          >
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            {navigation.previous.icon && renderIcon(navigation.previous.icon)}
            <span className="hidden lg:inline">
              {navigation.previous.title}
            </span>
          </Link>
        )}
      </div>
      {/* Left side - Home and Previous */}
      <div className="flex gap-2 pointer-events-auto">
        {showHomeButton && (
          <Link
            href="/"
            className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 font-bold py-2 px-3 md:py-3 md:px-4 rounded-xl shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2 text-sm md:text-base border-2 border-gray-200 hover:border-purple-300"
            title="חזרה לעמוד הראשי (ESC)"
          >
            <Home className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden md:inline">בית</span>
          </Link>
        )}

        {/* Center - Current game indicator */}
        {currentGame && (
          <div className="bg-black/20 backdrop-blur-sm text-white px-3 py-1 md:px-4 md:py-2 rounded-xl text-sm md:text-base font-medium pointer-events-auto">
            {currentGame.title}
          </div>
        )}

        {navigation.next && (
          <Link
            href={navigation.next.href}
            className="bg-green-500/90 backdrop-blur-sm hover:bg-green-600 text-white font-bold py-2 px-3 md:py-3 md:px-4 rounded-xl shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2 text-sm md:text-base border-2 border-green-400 hover:border-green-300"
            title={`${navigation.next.title} (→)`}
          >
            <span className="hidden lg:inline">{navigation.next.title}</span>
            {navigation.next.icon && renderIcon(navigation.next.icon)}
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
          </Link>
        )}
      </div>
    </div>
  );
}
