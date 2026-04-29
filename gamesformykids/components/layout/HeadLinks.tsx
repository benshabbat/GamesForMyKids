import { BUILD_INFO } from '@/lib/build-info';

export default function HeadLinks() {
  return (
    <>
      {/* Critical font preloading */}
      <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

      {/* Preload critical resources */}
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />

      {/* Cache busting */}
      <meta name="build-version" content={BUILD_INFO.version} />
      <meta name="build-timestamp" content={BUILD_INFO.timestamp.toString()} />
      <meta name="cache-control" content="no-cache, no-store, must-revalidate" />
      <meta name="pragma" content="no-cache" />
      <meta name="expires" content="0" />

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
