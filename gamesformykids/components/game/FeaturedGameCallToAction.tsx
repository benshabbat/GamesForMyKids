"use client";

import Link from 'next/link';

interface GameRegistration {
  id: string;
  title: string;
  description: string;
  href: string;
  available: boolean;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface FeaturedGameCallToActionProps {
  featuredGame: GameRegistration;
}

export default function FeaturedGameCallToAction({ featuredGame }: FeaturedGameCallToActionProps) {
  return (
    <Link href={featuredGame.href} className="mt-8 block text-center cursor-pointer">
      <div className="inline-block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-bold hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-white/20 shadow-lg backdrop-blur-sm">
        💡 לא בטוחים איזה משחק לבחור? התחילו עם המשחק המומלץ!
      </div>
    </Link>
  );
}
