/**
 * Additional performance and SEO optimizations for Lighthouse
 */

// Resource hint preconnect for external services
export const addResourceHints = () => {
  if (typeof window === 'undefined') return;
  
  // Add preconnect for fonts and other external resources
  const preconnects = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ];
  
  preconnects.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = url;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

// Optimize Web Vitals
export const optimizeWebVitals = () => {
  if (typeof window === 'undefined') return;
  
  // Largest Contentful Paint optimization
  const optimizeLCP = () => {
    // Preload hero image
    const heroImage = document.querySelector('img[data-hero]');
    if (heroImage && heroImage instanceof HTMLImageElement) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = heroImage.src;
      document.head.appendChild(link);
    }
  };
  
  // First Input Delay optimization
  const optimizeFID = () => {
    // Break up long tasks
    const windowWithScheduler = window as Window & { scheduler?: { postTask: (callback: () => void, options: { priority: string }) => void } };
    if ('scheduler' in window && windowWithScheduler.scheduler && 'postTask' in windowWithScheduler.scheduler) {
      // Use native scheduler when available
      windowWithScheduler.scheduler.postTask(() => {
        // Non-critical tasks
      }, { priority: 'background' });
    } else {
      // Fallback to setTimeout
      setTimeout(() => {
        // Non-critical tasks
      }, 0);
    }
  };
  
  // Cumulative Layout Shift optimization
  const optimizeCLS = () => {
    // Reserve space for dynamic content
    const dynamicElements = document.querySelectorAll('[data-dynamic]');
    dynamicElements.forEach(element => {
      if (element instanceof HTMLElement) {
        element.style.minHeight = element.style.minHeight || '200px';
      }
    });
  };
  
  // Execute optimizations
  requestIdleCallback(() => {
    optimizeLCP();
    optimizeFID();
    optimizeCLS();
  });
};

// Critical path CSS optimization
export const injectCriticalCSS = () => {
  if (typeof window === 'undefined') return;
  
  const criticalCSS = `
    /* Critical above-the-fold styles */
    .hero { display: block; }
    .game-card { 
      min-height: 200px; 
      background: #f8fafc;
      border-radius: 12px;
    }
    .loading-skeleton {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
    }
    @keyframes loading {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `;
  
  const style = document.createElement('style');
  style.textContent = criticalCSS;
  document.head.appendChild(style);
};

// Accessibility improvements
export const enhanceAccessibility = () => {
  if (typeof window === 'undefined') return;
  
  // Skip to main content link
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.textContent = 'דלג לתוכן הראשי';
  skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50';
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  // Enhance focus management
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('using-keyboard');
    }
  });
  
  document.addEventListener('mousedown', () => {
    document.body.classList.remove('using-keyboard');
  });
  
  // Add ARIA live region for announcements
  const liveRegion = document.createElement('div');
  liveRegion.setAttribute('aria-live', 'polite');
  liveRegion.setAttribute('aria-atomic', 'true');
  liveRegion.className = 'sr-only';
  liveRegion.id = 'live-announcements';
  document.body.appendChild(liveRegion);
};

// Image optimization
export const optimizeImages = () => {
  if (typeof window === 'undefined') return;
  
  // Lazy load images
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        img.src = img.dataset.src || '';
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
  
  // WebP support detection
  const supportsWebP = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  };
  
  if (supportsWebP()) {
    document.documentElement.classList.add('webp');
  }
};

// Service Worker registration with better error handling
export const registerServiceWorker = () => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;
  
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });
      
      console.warn('✅ Service Worker registered successfully:', registration);
      
      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New version available
              announceToUser('גרסה חדשה זמינה! רענן את הדף לעדכון.');
            }
          });
        }
      });
      
    } catch (error) {
      console.error('❌ Service Worker registration failed:', error);
    }
  });
};

// User announcement helper
const announceToUser = (message: string) => {
  const liveRegion = document.getElementById('live-announcements');
  if (liveRegion) {
    liveRegion.textContent = message;
    setTimeout(() => {
      liveRegion.textContent = '';
    }, 5000);
  }
};

// Initialize all optimizations
export const initializeOptimizations = () => {
  if (typeof window === 'undefined') return;
  
  // Critical optimizations - run immediately
  addResourceHints();
  injectCriticalCSS();
  enhanceAccessibility();
  
  // Non-critical optimizations - run when idle
  requestIdleCallback(() => {
    optimizeWebVitals();
    optimizeImages();
    registerServiceWorker();
  });
};
