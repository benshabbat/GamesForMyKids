import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Performance-optimized middleware for Next.js 15
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Add performance headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  
  // Cache control for static assets
  if (request.nextUrl.pathname.startsWith('/_next/static/')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  
  // Cache control for images
  if (request.nextUrl.pathname.startsWith('/images/') || 
      request.nextUrl.pathname.startsWith('/icons/')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000');
  }

  // Preload critical resources
  if (request.nextUrl.pathname === '/') {
    response.headers.set(
      'Link',
      '</images/home-hero.webp>; rel=preload; as=image, ' +
      '</sounds/click.mp3>; rel=prefetch; as=audio'
    );
  }

  // Performance timing header
  response.headers.set('X-Response-Time', Date.now().toString());

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
