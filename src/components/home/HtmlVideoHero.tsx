"use client";

import { useEffect } from 'react';

/**
 * HtmlVideoHero Component
 * 
 * Uses direct DOM manipulation to create and control the video element
 */
export default function HtmlVideoHero() {
  // Use useEffect to create and append the video element directly to the DOM
  useEffect(() => {
    // Create container div
    const container = document.createElement('div');
    container.className = 'absolute inset-0 w-full h-full overflow-hidden bg-black';
    container.style.zIndex = '10';
    
    // Create video element
    const video = document.createElement('video');
    video.className = 'absolute inset-0 w-full h-full object-cover';
    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.autoplay = true;
    video.preload = 'auto';
    
    // Set attributes for iOS
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('muted', '');
    
    // Set video source with timestamp to prevent caching
    const timestamp = new Date().getTime();
    video.src = `/images/home/hero/mobile-video/heromobilevid.mp4?v=${timestamp}`;
    
    // Set styles
    video.style.objectFit = 'cover';
    video.style.objectPosition = 'center';
    
    // Create debug indicator
    const debugIndicator = document.createElement('div');
    debugIndicator.className = 'absolute top-4 left-4 z-50 bg-blue-500 text-white p-2 text-xs font-bold';
    debugIndicator.textContent = 'HTML VIDEO ACTIVE';
    debugIndicator.style.zIndex = '50';
    
    // Append elements
    container.appendChild(video);
    container.appendChild(debugIndicator);
    
    // Find the hero section and append the container
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
      heroSection.appendChild(container);
    }
    
    // Try to play the video after a delay
    setTimeout(() => {
      try {
        video.play()
          .then(() => {
            console.log('HTML Video playing successfully');
          })
          .catch(err => {
            console.error('HTML Video play error:', err);
          });
      } catch (err) {
        console.error('HTML Video exception:', err);
      }
    }, 1000);
    
    // Clean up
    return () => {
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
    };
  }, []);
  
  // Return an empty div as a placeholder
  return <div className="html-video-hero-placeholder"></div>;
}
