import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display, Lora, Montserrat } from "next/font/google";
import "./globals.css";
import "./performance-styles.css";
import '@/styles/mobile-navigation-fix.css';
import '@/styles/mobile-section-fix.css';
import '@/styles/mobile-hero-fix.css';

// Import the ClientPerformanceWrapper component
import ClientPerformanceWrapper from '@/components/performance/ClientPerformanceWrapper';
import MobileNavigation from '@/components/navigation/MobileNavigation';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap', // Add display swap for better font loading
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: 'swap',
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: 'swap',
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Akasa | Finest Indian Cuisine in Singapore",
  description: "Experience the finest Indian cuisine at Akasa. Located at 79 Robinson Road, Singapore. Open Monday to Saturday, 11:30am to 10:00pm.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 5.0,
  minimumScale: 1.0,
  userScalable: true,
  viewportFit: "cover",
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Critical CSS for immediate loading - prevents flash of content on mobile */}
        <style dangerouslySetInnerHTML={{ __html: `
          @media (max-width: 767px) {
            /* Hide desktop content */
            .hero-section > div.hidden {
              display: none !important;
            }

            /* Hide logo on mobile */
            .hero-section .logo,
            .hero-section [alt="Akasa Logo"] {
              display: none !important;
            }

            /* Background image */
            .hero-section {
              background-color: #000 !important;
              background-image: url('/images/home/hero/mobile-poster.jpg') !important;
              background-size: cover !important;
              background-position: center !important;
              background-repeat: no-repeat !important;
            }

            /* Style text in mobile hero */
            .hero-section h1 {
              font-size: 2rem !important;
              line-height: 1.2 !important;
              margin-bottom: 1rem !important;
              text-shadow: 0 2px 4px rgba(0,0,0,0.5) !important;
            }

            /* No video styling */
          }
        ` }} />

        {/* Script to prevent mobile video loading on desktop */}
        <script dangerouslySetInnerHTML={{ __html: `
          // Check if we're on desktop
          if (window.innerWidth >= 768) {
            // Create a style element to hide mobile elements
            var style = document.createElement('style');
            style.innerHTML = '.mobile-only { display: none !important; }';
            document.head.appendChild(style);

            // Block requests for mobile video files
            var originalFetch = window.fetch;
            window.fetch = function(url, options) {
              if (typeof url === 'string' && url.includes('heromobilevid')) {
                console.log('Blocked fetch request for mobile video:', url);
                return Promise.reject(new Error('Mobile video blocked on desktop'));
              }
              return originalFetch(url, options);
            };

            // Block video element loading
            var originalCreateElement = document.createElement;
            document.createElement = function(tagName) {
              var element = originalCreateElement.call(document, tagName);
              if (tagName.toLowerCase() === 'video') {
                // Override the load method
                var originalLoad = element.load;
                element.load = function() {
                  if (window.innerWidth >= 768) {
                    console.log('Blocked video loading on desktop');
                    return;
                  }
                  return originalLoad.apply(this, arguments);
                };
              }
              return element;
            };
          }
        ` }} />

        {/* Direct script to force video playback */}
        <script dangerouslySetInnerHTML={{ __html: `
          // Function to force video playback on mobile
          function forceVideoPlayback() {
            if (window.innerWidth >= 768) return; // Only run on mobile

            // Create a direct video element and append it to the hero section
            setTimeout(function() {
              // Find the hero section
              const heroSection = document.querySelector('.hero-section');
              if (!heroSection) return;

              // Create a new video element
              const video = document.createElement('video');

              // Set all attributes for maximum compatibility
              video.autoplay = true;
              video.muted = true;
              video.loop = true;
              video.playsInline = true;
              video.setAttribute('playsinline', '');
              video.setAttribute('webkit-playsinline', '');
              video.poster = '/images/home/hero/mobile-poster.jpg';

              // Style the video
              video.style.position = 'absolute';
              video.style.top = '0';
              video.style.left = '0';
              video.style.width = '100%';
              video.style.height = '100%';
              video.style.objectFit = 'cover';
              video.style.zIndex = '100';

              // Add the source
              const source = document.createElement('source');
              source.src = '/images/home/hero/mobile-video/heromobilevid.mp4';
              source.type = 'video/mp4';
              video.appendChild(source);

              // Try to play immediately
              video.load();

              // Add to the hero section
              heroSection.appendChild(video);

              // Force play after a short delay
              setTimeout(function() {
                video.play().catch(function(e) {
                  console.log('Video play failed:', e);
                });
              }, 100);
            }, 500);
          }

          // Run on page load
          if (document.readyState === 'complete') {
            forceVideoPlayback();
          } else {
            window.addEventListener('load', forceVideoPlayback);
          }
        ` }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${lora.variable} ${montserrat.variable} antialiased bg-black`}
        style={{
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          textRendering: 'optimizeLegibility',
          overscrollBehavior: 'none',
          overflowX: 'hidden'
        }}
      >
        {/* Mobile Navigation - Fixed at the top of every page */}
        <MobileNavigation />

        {children}
      </body>
    </html>
  );
}
