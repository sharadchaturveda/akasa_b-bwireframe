# Mobile Optimization Guide

This document explains the mobile optimization strategy used in the Akasa website project.

## Overview

The website follows a mobile-first approach with specific optimizations for mobile devices. The key components of this strategy are:

1. **Device Detection**: Detecting mobile devices using screen size and user agent
2. **Mobile-Specific CSS**: Loading mobile-specific CSS dynamically
3. **Mobile-Specific Components**: Using separate components for mobile and desktop
4. **Touch Optimization**: Optimizing for touch interactions
5. **Performance Optimization**: Optimizing performance for mobile devices

## Implementation

### Device Detection

The `src/utils/deviceUtils.ts` file provides utilities for detecting mobile devices:

```typescript
// Check if the current device is a mobile device
export const isMobileDevice = (options: DeviceDetectionOptions = {}): boolean => {
  // Return false if running on the server
  if (typeof window === 'undefined') return false;

  // Set default options
  const {
    mobileMaxWidth = BREAKPOINTS.MOBILE,
  } = options;

  // Check screen size
  const isSmallScreen = window.innerWidth <= mobileMaxWidth;

  // Check user agent for mobile devices
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobileUserAgent = /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent);

  // Consider it a mobile device if it has a small screen or a mobile user agent
  return isSmallScreen || isMobileUserAgent;
};
```

### Mobile CSS Loading

The `applyMobileOptimizations` function in `deviceUtils.ts` loads mobile-specific CSS dynamically:

```typescript
export const applyMobileOptimizations = (): void => {
  // Return if running on the server
  if (typeof window === 'undefined' || !document) return;

  // Add mobile class to html element
  document.documentElement.classList.add('mobile-device');

  // Fix any content that might be bleeding outside the viewport
  document.documentElement.style.overflowX = 'hidden';
  document.body.style.overflowX = 'hidden';

  // Ensure proper touch behavior
  document.documentElement.style.touchAction = 'manipulation';

  // Add smooth scrolling for better mobile experience
  document.documentElement.style.scrollBehavior = 'smooth';

  // Optimize scrolling performance
  (document.documentElement.style as any)['-webkit-overflow-scrolling'] = 'touch';

  // Load mobile CSS dynamically
  if (!document.getElementById('mobile-css')) {
    const link = document.createElement('link');
    link.id = 'mobile-css';
    link.rel = 'stylesheet';
    link.href = '/mobile.css';
    document.head.appendChild(link);
  }
};
```

### Mobile CSS File

The `public/mobile.css` file contains mobile-specific styles that are loaded dynamically:

```css
/* Mobile-specific optimizations */
html.mobile-device {
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Improve touch targets */
html.mobile-device button,
html.mobile-device a,
html.mobile-device input,
html.mobile-device select,
html.mobile-device textarea {
  touch-action: manipulation;
}

/* Optimize scrolling */
html.mobile-device {
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
}

/* Prevent content from overflowing viewport */
html.mobile-device body {
  overflow-x: hidden;
  max-width: 100vw;
}

/* Additional mobile-specific styles... */
```

### Mobile-Specific Components

The application uses separate components for mobile and desktop:

```tsx
import { useDeviceDetection } from '@/hooks/useDeviceDetection';
import DesktopHero from '@/components/home/DesktopHero';
import MobileHero from '@/components/home/MobileHero';

const HeroSection = () => {
  const { isMobile, isDetectionComplete } = useDeviceDetection();

  if (!isDetectionComplete) {
    return <div>Loading...</div>;
  }

  return isMobile ? <MobileHero /> : <DesktopHero />;
};
```

## Mobile Hero Video Implementation

The mobile hero video is implemented using a direct video element with a fallback image:

```tsx
const MobileHero = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('loadeddata', () => setVideoLoaded(true));
      video.addEventListener('error', () => setVideoLoaded(false));
      
      // Attempt to play the video
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Auto-play was prevented, show fallback image
          setVideoLoaded(false);
        });
      }
    }
    
    return () => {
      if (video) {
        video.removeEventListener('loadeddata', () => setVideoLoaded(true));
        video.removeEventListener('error', () => setVideoLoaded(false));
      }
    };
  }, []);

  return (
    <div className="relative h-screen w-full">
      {!videoLoaded && (
        <Image
          src="/images/home/hero/mobile-video/placeholder.jpg"
          alt="Hero background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className={`absolute inset-0 h-full w-full object-cover ${
          videoLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        poster="/images/home/hero/mobile-video/placeholder.jpg"
      >
        <source src="/videos/heromobilevid.webm" type="video/webm" />
        <source src="/videos/heromobilevid.mp4" type="video/mp4" />
      </video>
    </div>
  );
};
```

## Best Practices

### Mobile-First Design

1. **Start with Mobile Design**: Design for mobile first, then enhance for larger screens.
2. **Use Responsive Units**: Use relative units (rem, em, %) instead of fixed units (px).
3. **Test on Real Devices**: Test on actual mobile devices, not just browser emulators.
4. **Optimize Touch Targets**: Make touch targets at least 44x44 pixels.
5. **Simplify Navigation**: Use a hamburger menu for mobile navigation.

### Performance Optimization

1. **Optimize Images**: Use responsive images and WebP/AVIF formats.
2. **Minimize JavaScript**: Reduce JavaScript bundle size for faster loading.
3. **Use Code Splitting**: Load only the code needed for the current view.
4. **Optimize CSS**: Use mobile-specific CSS loaded conditionally.
5. **Lazy Load Non-Critical Resources**: Defer loading of non-critical resources.

### Mobile Video Optimization

1. **Use WebM Format**: WebM provides better compression than MP4.
2. **Provide Fallback**: Always provide a fallback image for when video can't play.
3. **Use Appropriate Attributes**: Use `autoplay`, `muted`, `loop`, `playsInline` attributes.
4. **Optimize Video Size**: Keep video dimensions appropriate for mobile screens.
5. **Monitor Performance**: Monitor video playback performance and adjust as needed.

## Troubleshooting

### Common Mobile Issues

1. **Video Not Playing**: Check if the video format is supported and the video is properly encoded.
2. **Layout Issues**: Check for fixed widths or horizontal scrolling issues.
3. **Touch Issues**: Ensure touch targets are large enough and properly spaced.
4. **Performance Issues**: Check for large images, heavy JavaScript, or other performance bottlenecks.
5. **Device Detection Issues**: Verify that device detection is working correctly.

### Debugging Mobile Issues

1. **Use Chrome DevTools**: Use the device emulation mode in Chrome DevTools.
2. **Check Console Logs**: Look for errors in the browser console.
3. **Test on Real Devices**: Test on actual mobile devices for accurate results.
4. **Use Performance Monitoring**: Monitor performance metrics like LCP, CLS, and FID.
5. **Check Network Requests**: Monitor network requests to identify slow-loading resources.
