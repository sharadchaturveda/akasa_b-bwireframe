'use client';

import { useEffect } from 'react';

export default function PreloadLinks() {
  useEffect(() => {
    // Create and append preload links dynamically on the client side
    const createPreloadLink = (href: string, as: string, type?: string, fetchPriority?: 'high' | 'low' | 'auto') => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = as;
      if (type) link.type = type;
      if (fetchPriority) {
        // Use setAttribute to avoid TypeScript errors with non-standard attributes
        link.setAttribute('fetchpriority', fetchPriority);
      }
      document.head.appendChild(link);
    };

    // Preload critical assets
    createPreloadLink('/images/home/hero/hero-home.jpg?quality=60&width=1200', 'image', undefined, 'high');
    createPreloadLink('/images/home/philosophy/background.jpg?quality=60&width=800', 'image', undefined, 'high');
    createPreloadLink('/images/home/philosophy/drink.jpg?quality=60&width=800', 'image', undefined, 'high');

    // Preload critical fonts
    createPreloadLink('/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2', 'font', 'font/woff2');

    // Add preconnect for faster resource loading
    const createPreconnect = (href: string, crossOrigin?: string) => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = href;
      if (crossOrigin) link.crossOrigin = crossOrigin;
      document.head.appendChild(link);
    };

    createPreconnect('https://fonts.googleapis.com');
    createPreconnect('https://fonts.gstatic.com', 'anonymous');

    // Add preconnect for analytics and other third-party resources
    createPreconnect('https://www.google-analytics.com');

    // Add DNS prefetch
    const createDnsPrefetch = (href: string) => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = href;
      document.head.appendChild(link);
    };

    createDnsPrefetch('https://www.google-analytics.com');
  }, []);

  return null;
}

