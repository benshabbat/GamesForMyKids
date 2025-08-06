"use client";

interface GamesLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout פשוט למשחקים - האוטומציה מתבצעת ב-[gameType] route
 */
export default function GamesLayout({ children }: GamesLayoutProps) {
  return <div>{children}</div>;
}
