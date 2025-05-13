"use client";

import { useEffect } from 'react';
import Script from 'next/script';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';

/**
 * MobileImageOptimizer Component
 * 
 * This component loads mobile-specific optimizations for image loading
 * only on mobile devices. It helps prevent the blank spaces and reloading
 * issues during scrolling.
 * 
 * @returns {JSX.Element} The component
 */
export default function MobileImageOptimizer() {
  const { isMobile } = useDeviceDetection();
  
  useEffect(() => {
    // Only run on mobile devices
    if (!isMobile) {
      return;
    }
    
    // Add mobile device class to html element
    document.documentElement.classList.add('mobile-device');
    
    // Add mobile-specific CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/mobile-image-optimization.css';
    document.head.appendChild(link);
    
    // Clean up on unmount
    return () => {
      document.head.removeChild(link);
    };
  }, [isMobile]);
  
  return (
    <>
      {/* Load mobile image optimization script */}
      <Script
        id="mobile-image-optimization"
        src="/scripts/mobile-image-optimization.js"
        strategy="afterInteractive"
      />
    </>
  );
}
