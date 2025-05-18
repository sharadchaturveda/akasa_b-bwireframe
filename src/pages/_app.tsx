import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';

// Import global styles
import '@/app/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Google Analytics tracking
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // Track page view with Google Analytics
      window.gtag('config', 'G-7H8MPGV2RB', {
        page_path: url,
      });

      // Report Web Vitals
      if (window.performance) {
        // Create a performance mark for the route change
        performance.mark('route-change-complete');

        // Measure the time since navigation start
        const navigationStart = performance.timeOrigin;
        const now = performance.now();
        const pageLoadTime = now - navigationStart;

        // Log the page load time (could be sent to analytics)
        console.log(`Page load time for ${url}: ${pageLoadTime.toFixed(2)}ms`);

        // Get LCP if available
        const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
        if (lcpEntries.length > 0) {
          interface LCPEntry extends PerformanceEntry {
            startTime: number;
          }
          const lcp = lcpEntries[0] as LCPEntry;
          console.log(`LCP: ${lcp.startTime.toFixed(2)}ms`);
        }

        // Get CLS if available
        if ('layoutShift' in performance) {
          interface PerformanceWithLayoutShift extends Performance {
            layoutShift: { value: number };
          }
          const perfWithLayoutShift = performance as PerformanceWithLayoutShift;
          console.log(`CLS: ${perfWithLayoutShift.layoutShift.value.toFixed(3)}`);
        }
      }

      // Prefetch visible links
      setTimeout(() => {
        const links = document.querySelectorAll('a[href^="/"]');
        links.forEach((link) => {
          const href = link.getAttribute('href');
          if (href && !href.includes('#') && href !== router.asPath) {
            router.prefetch(href);
          }
        });
      }, 200);
    };

    // Add event listeners
    router.events.on('routeChangeComplete', handleRouteChange);

    // Clean up
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  return (
    <>
      {/* Google Analytics */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-7H8MPGV2RB"
      />
      <Script
        id="ga-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7H8MPGV2RB');
          `,
        }}
      />
      <Component {...pageProps} />
    </>
  );
}
