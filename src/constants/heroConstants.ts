/**
 * Hero Constants
 * 
 * This file contains constants for the hero sections of the website.
 */

/**
 * Hero image interface
 */
export interface HeroImage {
  /**
   * The source URL of the image
   */
  src: string;
  
  /**
   * The alt text for the image
   */
  alt: string;
}

/**
 * Desktop hero carousel images
 */
export const DESKTOP_HERO_IMAGES: HeroImage[] = [
  {
    src: "/images/home/hero/carousel/hero1.jpg",
    alt: "Akasa restaurant ambiance"
  },
  {
    src: "/images/home/hero/carousel/hero2.jpg",
    alt: "Exquisite Indian cuisine"
  },
  {
    src: "/images/home/hero/carousel/hero3.jpg",
    alt: "Fine dining experience"
  },
  {
    src: "/images/home/hero/carousel/hero4.jpg",
    alt: "Elegant restaurant setting"
  }
];

/**
 * Mobile hero video sources
 */
export const MOBILE_HERO_VIDEO_SOURCES = {
  webm: "/images/home/hero/mobile-video/heromobilevid.webm",
  mp4: "/images/home/hero/mobile-video/heromobilevid.mp4"
};

/**
 * Hero carousel settings
 */
export const HERO_CAROUSEL_SETTINGS = {
  /**
   * Interval between image transitions in milliseconds
   */
  interval: 2000,
  
  /**
   * Duration of the transition animation in milliseconds
   */
  transitionDuration: 1000,
  
  /**
   * Whether to autoplay the carousel
   */
  autoplay: true,
  
  /**
   * Whether to loop the carousel
   */
  loop: true
};

/**
 * Hero logo settings
 */
export const HERO_LOGO_SETTINGS = {
  /**
   * Width of the logo container
   */
  width: 360,
  
  /**
   * Height of the logo container
   */
  height: 180,
  
  /**
   * Source URL of the logo image
   */
  src: "/images/brand/logo-white.png",
  
  /**
   * Alt text for the logo image
   */
  alt: "Akasa Logo"
};

/**
 * Hero text shadow style
 */
export const HERO_TEXT_SHADOW = {
  textShadow: '0 2px 4px rgba(0,0,0,0.5)'
};
