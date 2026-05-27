import { BUILD_INFO } from '@/lib/build-info';

export default function HeadLinks() {
  return (
    <>
      {/* Preload critical resources */}
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://www.google-analytics.com" />

      {/* Cache busting */}
      <meta name="build-version" content={BUILD_INFO.version} />
      <meta name="build-timestamp" content={BUILD_INFO.timestamp.toString()} />

      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#8b5cf6" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="משחקים לילדים" />
      <link rel="canonical" href="https://games-for-my-kids.vercel.app" />
    </>
  );
}
