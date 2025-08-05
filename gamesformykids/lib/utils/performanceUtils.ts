/**
 * Performance optimization utilities
 */

/**
 * Preload critical images
 */
export const preloadImages = (imageUrls: string[]) => {
  if (typeof window === 'undefined') return;
  
  const promises = imageUrls.map(url => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = reject;
      img.src = url;
    });
  });
  
  return Promise.allSettled(promises);
};

/**
 * Lazy load images with intersection observer
 */
export const lazyLoadImage = (img: HTMLImageElement, src: string) => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    img.src = src;
    return;
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        img.src = src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });
  
  observer.observe(img);
};

/**
 * Optimize font loading
 */
export const preloadFonts = (fontUrls: string[]) => {
  if (typeof window === 'undefined') return;
  
  fontUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.href = url;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

/**
 * Prefetch critical resources
 */
export const prefetchResource = (url: string, as?: string) => {
  if (typeof window === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = url;
  if (as) link.as = as;
  document.head.appendChild(link);
};

/**
 * Critical resource hints
 */
export const addResourceHints = () => {
  if (typeof window === 'undefined') return;
  
  // DNS prefetch for external resources
  const dnsPrefetch = (domain: string) => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    document.head.appendChild(link);
  };
  
  // Add common external domains
  dnsPrefetch('//fonts.googleapis.com');
  dnsPrefetch('//fonts.gstatic.com');
};

/**
 * Service Worker registration
 */
export const registerServiceWorker = async () => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }
  
  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    console.warn('SW registered:', registration);
    return registration;
  } catch (error) {
    console.error('SW registration failed:', error);
  }
};

/**
 * Memory optimization - clean up unused objects
 */
export const cleanupMemory = () => {
  if (typeof window !== 'undefined' && 'gc' in window) {
    // @ts-expect-error - gc is not in standard API but available in some browsers
    window.gc();
  }
};

/**
 * Critical CSS injection
 */
export const injectCriticalCSS = (css: string) => {
  if (typeof window === 'undefined') return;
  
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
};

/**
 * Reduce layout shifts by setting dimensions
 */
export const preventLayoutShift = (element: HTMLElement, width: number, height: number) => {
  element.style.width = `${width}px`;
  element.style.height = `${height}px`;
  element.style.aspectRatio = `${width}/${height}`;
};
