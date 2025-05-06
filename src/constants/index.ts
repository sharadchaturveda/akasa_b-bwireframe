/**
 * Application Constants
 *
 * This file contains constants used throughout the application.
 * Centralizing these values makes the codebase more maintainable.
 */

/**
 * Breakpoints for responsive design
 */
export const BREAKPOINTS = {
  MOBILE: 767,
  TABLET: 1024,
  DESKTOP: 1280,
  LARGE_DESKTOP: 1536,
};

/**
 * Colors used throughout the application
 */
export const COLORS = {
  // Primary colors
  BLACK: '#000000',
  WHITE: '#FFFFFF',
  GOLD: '#E6C78B',
  DEEP_BLUE: '#1A2A3A',
  LIGHT_BLUE: '#0A1A2A',

  // Transparent variants
  GOLD_TRANSPARENT_10: 'rgba(230,199,139,0.1)',
  GOLD_TRANSPARENT_20: 'rgba(230,199,139,0.2)',
  GOLD_TRANSPARENT_30: 'rgba(230,199,139,0.3)',
  BLACK_TRANSPARENT_30: 'rgba(0,0,0,0.3)',
  BLACK_TRANSPARENT_40: 'rgba(0,0,0,0.4)',
  BLACK_TRANSPARENT_60: 'rgba(0,0,0,0.6)',
  BLACK_TRANSPARENT_90: 'rgba(0,0,0,0.9)',
  WHITE_TRANSPARENT_60: 'rgba(255,255,255,0.6)',
  WHITE_TRANSPARENT_80: 'rgba(255,255,255,0.8)',
  WHITE_TRANSPARENT_90: 'rgba(255,255,255,0.9)',
};

/**
 * Animation durations and timings
 */
export const ANIMATIONS = {
  FADE_DURATION: '0.5s',
  SLIDE_DURATION: '0.8s',
  CARD_DELAY_MS: 200,
  PARALLAX_FACTOR: 0.05,
  DEBOUNCE_MS: 250,
};

/**
 * Layout constants
 */
export const LAYOUT = {
  CONTAINER_PADDING: {
    MOBILE: '1rem',
    DESKTOP: '2rem',
  },
  SECTION_SPACING: {
    MOBILE: '2rem',
    DESKTOP: '4rem',
  },
  BACKGROUND_HEIGHT_PERCENT: 150,
  BACKGROUND_TOP_OFFSET_PERCENT: -25,
  HERO_HEIGHT: '100vh',
};

/**
 * Image quality and sizes
 */
export const IMAGES = {
  DEFAULT_QUALITY: 75,
  HIGH_QUALITY: 90,
  LOW_QUALITY: 60,
  SIZES: {
    SMALL: 16,
    MEDIUM: 32,
    LARGE: 64,
    XLARGE: 128,
  },
};

/**
 * Logo dimensions
 */
export const LOGO = {
  SIZES: {
    SMALL: { width: 250, height: 100 },
    MEDIUM: { width: 350, height: 140 },
    LARGE: { width: 450, height: 180 },
    DESKTOP: { width: 500, height: 200 },
    MOBILE: { width: 300, height: 120 },
  },
};

/**
 * Performance constants
 */
export const PERFORMANCE = {
  LONG_TASK_THRESHOLD_MS: 50,
  IDLE_CALLBACK_TIMEOUT_MS: 2000,
  FALLBACK_TIMEOUT_MS: 1000,
  LAZY_LOAD_THRESHOLD: 2,
};

/**
 * Navigation items
 */
export const NAVIGATION = {
  HOME_NAV_ITEMS: [
    { name: 'MENUS', path: '/menu' },
    { name: 'EVENTS', path: '/events' },
    { name: 'OFFERS', path: '/offers' },
    { name: 'RESERVATIONS', path: '/reservations' }
  ],
  OTHER_NAV_ITEMS: [
    { name: 'HOME', path: '/' },
    { name: 'MENUS', path: '/menu' },
    { name: 'EVENTS', path: '/events' },
    { name: 'OFFERS', path: '/offers' },
    { name: 'RESERVATIONS', path: '/reservations' }
  ]
};

/**
 * CSS class names
 */
export const CSS_CLASSES = {
  MOBILE_DEVICE: 'mobile-device',
  LOADED: 'loaded',
  ANIMATE_SCROLL: 'animate-scroll',
  ANIMATE_FADE_IN: 'animate-fadeIn',
  ANIMATE_FADE_SLIDE_UP: 'animate-fadeSlideUp',
};

/**
 * Media query strings
 */
export const MEDIA_QUERIES = {
  MOBILE: `(max-width: ${BREAKPOINTS.MOBILE}px)`,
  TABLET: `(min-width: ${BREAKPOINTS.MOBILE + 1}px) and (max-width: ${BREAKPOINTS.TABLET}px)`,
  DESKTOP: `(min-width: ${BREAKPOINTS.TABLET + 1}px)`,
  PREFERS_REDUCED_MOTION: '(prefers-reduced-motion: reduce)',
};
