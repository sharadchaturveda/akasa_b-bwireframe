/**
 * Animation Utilities Module
 *
 * Utilities for animations and transitions.
 * This module provides a centralized place for all animation-related utilities.
 */

import { ANIMATIONS } from '@/constants';

/**
 * Animation types
 */
export type AnimationType =
  | 'fade'
  | 'fadeUp'
  | 'fadeDown'
  | 'fadeLeft'
  | 'fadeRight'
  | 'scale'
  | 'scaleUp'
  | 'scaleDown'
  | 'rotate'
  | 'slideUp'
  | 'slideDown'
  | 'slideLeft'
  | 'slideRight'
  | 'none';

/**
 * Options for animations
 */
export interface AnimationOptions {
  /**
   * The animation type
   * @default "fade"
   */
  type?: AnimationType;

  /**
   * The animation duration in milliseconds
   * @default 500
   */
  duration?: number;

  /**
   * The animation delay in milliseconds
   * @default 0
   */
  delay?: number;

  /**
   * The animation easing function
   * @default "ease"
   */
  easing?: string;

  /**
   * Whether to use hardware acceleration
   * @default true
   */
  useHardwareAcceleration?: boolean;

  /**
   * Whether to animate on scroll
   * @default false
   */
  animateOnScroll?: boolean;

  /**
   * The scroll threshold for animation (0-1)
   * @default 0.1
   */
  scrollThreshold?: number;
}

/**
 * Gets CSS styles for an animation
 *
 * @param {AnimationOptions} options - Animation options
 * @returns {React.CSSProperties} CSS styles for the animation
 */
export const getAnimationStyles = (options: AnimationOptions = {}): React.CSSProperties => {
  const {
    type = 'fade',
    duration = 500, // Default duration in milliseconds
    delay = 0,
    easing = 'ease',
    useHardwareAcceleration = true
  } = options;

  // Base styles
  const styles: React.CSSProperties = {
    transition: `all ${duration}ms ${easing} ${delay}ms`,
    opacity: 1
  };

  // Add hardware acceleration if enabled
  if (useHardwareAcceleration) {
    styles.transform = 'translateZ(0)';
    styles.willChange = 'opacity, transform';
  }

  return styles;
};

/**
 * Gets CSS styles for an animation's initial state
 *
 * @param {AnimationOptions} options - Animation options
 * @returns {React.CSSProperties} CSS styles for the animation's initial state
 */
export const getAnimationInitialStyles = (options: AnimationOptions = {}): React.CSSProperties => {
  const { type = 'fade' } = options;

  // Base styles
  const styles: React.CSSProperties = {
    opacity: 0
  };

  // Add transform based on animation type
  switch (type) {
    case 'fadeUp':
    case 'slideUp':
      styles.transform = 'translateY(20px)';
      break;
    case 'fadeDown':
    case 'slideDown':
      styles.transform = 'translateY(-20px)';
      break;
    case 'fadeLeft':
    case 'slideLeft':
      styles.transform = 'translateX(20px)';
      break;
    case 'fadeRight':
    case 'slideRight':
      styles.transform = 'translateX(-20px)';
      break;
    case 'scale':
    case 'scaleUp':
      styles.transform = 'scale(0.95)';
      break;
    case 'scaleDown':
      styles.transform = 'scale(1.05)';
      break;
    case 'rotate':
      styles.transform = 'rotate(-5deg)';
      break;
    case 'none':
      styles.opacity = 1;
      break;
  }

  return styles;
};

/**
 * Applies staggered animation delays to elements
 *
 * @param {HTMLElement[]} elements - Elements to animate
 * @param {number} baseDelay - Base delay in milliseconds
 * @param {number} staggerDelay - Delay between each element in milliseconds
 * @returns {void}
 */
export const applyStaggeredAnimations = (
  elements: HTMLElement[],
  baseDelay = 0,
  staggerDelay = 100 // Default stagger delay in milliseconds
): void => {
  elements.forEach((element, index) => {
    const delay = baseDelay + (index * staggerDelay);
    element.style.transitionDelay = `${delay}ms`;
  });
};

/**
 * Sets up scroll-triggered animations
 *
 * @param {string} selector - CSS selector for elements to animate
 * @param {AnimationOptions} options - Animation options
 * @returns {void}
 */
export const setupScrollAnimations = (
  selector: string,
  options: AnimationOptions = {}
): void => {
  // Return early if running on the server or if IntersectionObserver is not supported
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

  const {
    scrollThreshold = 0.1,
    type = 'fade'
  } = options;

  // Get all elements matching the selector
  const elements = document.querySelectorAll<HTMLElement>(selector);

  // Apply initial styles
  elements.forEach((element) => {
    const initialStyles = getAnimationInitialStyles({ type });
    Object.assign(element.style, initialStyles);
  });

  // Create an observer for scroll-triggered animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          const animationStyles = getAnimationStyles(options);
          Object.assign(element.style, animationStyles);
          observer.unobserve(element);
        }
      });
    },
    { threshold: scrollThreshold }
  );

  // Observe all elements
  elements.forEach((element) => {
    observer.observe(element);
  });
};

export default {
  getAnimationStyles,
  getAnimationInitialStyles,
  applyStaggeredAnimations,
  setupScrollAnimations
};
