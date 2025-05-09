import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* All optimization scripts and emergency fixes have been removed */}

          {/* Preload critical fonts */}
          <link
            rel="preload"
            href="/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />

          {/* Preconnect to origins */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

          {/* Inline critical CSS to reduce CLS */}
          <style dangerouslySetInnerHTML={{ __html: `
            /* Critical CSS for layout stability */
            body {
              margin: 0;
              padding: 0;
              background-color: black;
              color: white;
              overflow-x: hidden;
            }

            /* Prevent layout shifts during image loading */
            img {
              max-width: 100%;
              height: auto;
            }

            /* Ensure sections have proper dimensions */
            section {
              position: relative;
              min-height: 100px;
            }

            /* Ensure proper font rendering */
            html {
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
          `}} />

          {/* Preload LCP images for different pages */}
          <link
            rel="preload"
            href="/images/home/hero/hero-home.jpg?quality=60&width=1200"
            as="image"
            fetchPriority="high"
          />
          <link
            rel="preload"
            href="/images/menu/chef/background.jpg?quality=60&width=800"
            as="image"
            fetchPriority="high"
          />


          {/* Add critical CSS for menu page */}
          <style id="critical-css-menu" dangerouslySetInnerHTML={{ __html: `
            /* Only load this CSS when on the menu page */
            .menu-page .chef-image {
              position: relative;
              height: 400px;
              overflow: hidden;
              border-radius: 0.5rem;
            }

            .menu-page .chef-image img {
              object-fit: cover;
              object-position: center;
            }

            .menu-page .dish-card {
              background-color: rgba(0, 0, 0, 0.8);
              backdrop-filter: blur(4px);
              border-radius: 0.5rem;
              overflow: hidden;
              transition: transform 0.3s ease;
            }

            .menu-page .dish-card:hover {
              transform: translateY(-0.25rem);
            }

            /* Optimize image loading */
            .menu-page img {
              opacity: 0;
              transition: opacity 0.3s ease;
            }

            .menu-page img.loaded {
              opacity: 1;
            }
          `}} />
        </Head>
        <body>
          <Main />
          <NextScript />

          {/* Performance optimization script removed to fix ReservationInfo component */}

          {/* Modified preload script that respects ReservationInfo component */}
          <script dangerouslySetInnerHTML={{ __html: `
            // Immediately start loading critical resources
            (function() {
              // Mark the start time for performance measurement
              if (window.performance) {
                window.performance.mark('app_start');
              }

              // Create a safe version that doesn't interfere with ReservationInfo
              window.safePerformanceOptimizations = {
                // Store original methods
                originalSetTimeout: window.setTimeout,

                // Check if an element should be excluded from optimizations
                shouldExcludeFromOptimization: function(element) {
                  if (!element) return false;

                  // Check if the element has the data-exclude-optimization attribute
                  if (element.hasAttribute && element.hasAttribute('data-exclude-optimization')) {
                    return true;
                  }

                  // Check if the element has the backdrop-blur-sm class
                  if (element.classList && element.classList.contains('backdrop-blur-sm')) {
                    return true;
                  }

                  // Check parent elements
                  if (element.parentElement) {
                    return this.shouldExcludeFromOptimization(element.parentElement);
                  }

                  return false;
                }
              };

              // We won't override setTimeout anymore as it was causing issues
              // with the ReservationInfo component
              console.log('Performance optimizations initialized with ReservationInfo protection');
            })();
          `}} />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

