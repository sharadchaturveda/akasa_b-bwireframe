import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display, Lora, Montserrat } from "next/font/google";
import "./globals.css";
import "./performance-styles.css";
import '@/styles/mobile-navigation-fix.css';
import '@/styles/mobile-section-fix.css';
import '@/styles/mobile-hero-fix.css';

// Import components
import MobileNavigation from '@/components/navigation/MobileNavigation';
import FloatingActionButtons from '@/components/ui/FloatingActionButtons';

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
              background-image: url('/images/home/hero/hero-home.jpg') !important;
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

        {/* Inline script to ensure video plays */}
        <script dangerouslySetInnerHTML={{ __html: `
          // Function to ensure video plays on mobile
          function ensureMobileVideoPlays() {
            if (window.innerWidth >= 768) return; // Only run on mobile

            // Create a video element
            const video = document.createElement('video');
            video.muted = true;
            video.playsInline = true;
            video.autoplay = true;
            video.loop = true;
            video.preload = 'auto';

            // Use WebM format first
            const source = document.createElement('source');
            source.src = '/images/home/hero/mobile-video/heromobilevid.webm?nocache=' + Date.now();
            source.type = 'video/webm';
            video.appendChild(source);

            video.style.position = 'absolute';
            video.style.top = '0';
            video.style.left = '0';
            video.style.width = '100%';
            video.style.height = '100%';
            video.style.objectFit = 'cover';
            video.style.zIndex = '10';
            video.style.opacity = '0'; // Hide it

            // Add to body temporarily to trigger autoplay
            document.body.appendChild(video);

            // Function to play video with retry
            function playVideo() {
              const playPromise = video.play();
              if (playPromise !== undefined) {
                playPromise.catch(function() {
                  // If autoplay fails, try again after a short delay
                  setTimeout(playVideo, 100);
                });
              }
            }

            // Try to play
            playVideo();

            // Remove after 1 second
            setTimeout(function() {
              if (document.body.contains(video)) {
                document.body.removeChild(video);
              }
            }, 1000);
          }

          // Run on page load
          if (document.readyState === 'complete') {
            ensureMobileVideoPlays();
          } else {
            window.addEventListener('load', ensureMobileVideoPlays);
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

        {/* Floating Action Buttons - Fixed on all pages */}
        <FloatingActionButtons />

        {children}
      </body>
    </html>
  );
}
