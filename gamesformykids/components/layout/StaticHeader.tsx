import UserProfile from '../user/UserProfile';
import { HeaderBackground } from './header/HeaderBackground';
import { HeaderHero } from './header/HeaderHero';
import { FeatureHighlights } from './header/FeatureHighlights';
import { ThemeToggle } from '../ui/ThemeToggle';

// Server Component - renders statically for better LCP
export function StaticHeader() {
  return (
    <header className="text-center py-6 md:py-8 lg:py-12 relative">
      <div className="absolute inset-0 overflow-hidden">
        <HeaderBackground />
      </div>

      <div className="relative z-10">
        <div className="flex justify-end items-center gap-2 px-4 mb-2">
          <ThemeToggle />
          <UserProfile />
        </div>
        <HeaderHero />
        <FeatureHighlights />
      </div>
    </header>
  );
}
