"use client";

import { ComponentType, createElement, isValidElement, ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { Home, ArrowLeft, ArrowRight } from "lucide-react";
import { useUniversalGameNavigation } from "./useUniversalGameNavigation";
import { ROUTES } from "@/lib/constants/routes";

interface UniversalGameNavigationProps {
  showHomeButton?: boolean;
}

function renderIcon(
  icon: ComponentType<{ className?: string }> | ReactNode,
  className: string = "w-4 h-4 md:w-5 md:h-5"
) {
  try {
    if (typeof icon === "function") return createElement(icon, { className });
    if (isValidElement(icon)) return icon;
    return null;
  } catch (error) {
    console.warn("Error rendering icon:", error);
    return null;
  }
}

export default function UniversalGameNavigation({
  showHomeButton = true,
}: UniversalGameNavigationProps) {
  const [mounted, setMounted] = useState(false);
  const { currentGame, navigation, shouldRender } =
    useUniversalGameNavigation({ showHomeButton });

  useEffect(() => { setMounted(true); }, []);

  if (!mounted || !shouldRender) return null;

  return (
    <nav
      aria-label="ניווט בין משחקים"
      className="fixed top-4 left-4 right-4 z-50 flex justify-between items-center pointer-events-none"
    >
      {/* שמאל — קודם */}
      <div className="flex gap-2 pointer-events-auto">
        {navigation.previous && (
          <Link
            href={navigation.previous.href}
            className="bg-blue-500/90 backdrop-blur-sm hover:bg-blue-600 text-white font-bold py-2 px-3 md:py-3 md:px-4 rounded-xl shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2 text-sm md:text-base border-2 border-blue-400 hover:border-blue-300"
            title={`${navigation.previous.title} (←)`}
            aria-label={`משחק קודם: ${navigation.previous.title}`}
          >
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
            {navigation.previous.icon && renderIcon(navigation.previous.icon)}
            <span className="hidden lg:inline">
              {navigation.previous.title}
            </span>
          </Link>
        )}
      </div>

      {/* מרכז — בית + שם משחק נוכחי */}
      <div className="flex gap-2 pointer-events-auto items-center">
        {showHomeButton && (
          <Link
            href={ROUTES.HOME}
            className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 font-bold py-2 px-3 md:py-3 md:px-4 rounded-xl shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2 text-sm md:text-base border-2 border-gray-200 hover:border-purple-300"
            title="חזרה לעמוד הראשי (ESC)"
            aria-label="חזרה לעמוד הראשי"
          >
            <Home className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
            <span className="hidden md:inline">בית</span>
          </Link>
        )}

        {currentGame && (
          <div
            className="bg-black/20 backdrop-blur-sm text-white px-3 py-1 md:px-4 md:py-2 rounded-xl text-sm md:text-base font-medium"
            aria-current="page"
          >
            {currentGame.title}
          </div>
        )}
      </div>

      {/* ימין — הבא */}
      <div className="flex gap-2 pointer-events-auto">
        {navigation.next && (
          <Link
            href={navigation.next.href}
            className="bg-green-500/90 backdrop-blur-sm hover:bg-green-600 text-white font-bold py-2 px-3 md:py-3 md:px-4 rounded-xl shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2 text-sm md:text-base border-2 border-green-400 hover:border-green-300"
            title={`${navigation.next.title} (→)`}
            aria-label={`משחק הבא: ${navigation.next.title}`}
          >
            <span className="hidden lg:inline">{navigation.next.title}</span>
            {navigation.next.icon && renderIcon(navigation.next.icon)}
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
          </Link>
        )}
      </div>
    </nav>
  );
}

