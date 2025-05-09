/**
 * CSS Utilities Module
 *
 * Utilities for CSS manipulation and optimization.
 */

import { ANIMATIONS } from '@/constants';

/**
 * Options for loading page styles
 */
export interface LoadStylesOptions {
  /**
   * Whether to add the stylesheet to the head immediately
   * @default true
   */
  immediate?: boolean;
  
  /**
   * ID to assign to the stylesheet element
   */
  id?: string;
  
  /**
   * Media query for the stylesheet
   */
  media?: string;
  
  /**
   * Callback to call when the stylesheet is loaded
   */
  onLoad?: () => void;
}

/**
 * Loads a stylesheet
 *
 * @param {string} href - The URL of the stylesheet
 * @param {LoadStylesOptions} options - Options for loading the stylesheet
 * @returns {HTMLLinkElement} The link element
 */
export const loadStylesheet = (
  href: string,
  options: LoadStylesOptions = {}
): HTMLLinkElement => {
  // Return if running on the server
  if (typeof document === 'undefined') {
    return {} as HTMLLinkElement;
  }
  
  // Set default options
  const {
    immediate = true,
    id,
    media,
    onLoad
  } = options;
  
  // Check if the stylesheet is already loaded
  if (id && document.getElementById(id)) {
    return document.getElementById(id) as HTMLLinkElement;
  }
  
  // Create link element
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  
  // Set optional attributes
  if (id) link.id = id;
  if (media) link.media = media;
  
  // Set onload handler
  if (onLoad) {
    link.onload = onLoad;
  }
  
  // Add to document head if immediate
  if (immediate) {
    document.head.appendChild(link);
  }
  
  return link;
};

/**
 * Loads page-specific styles
 *
 * @param {string} pageName - The name of the page
 * @returns {HTMLLinkElement} The link element
 */
export const loadPageStyles = (pageName: string): HTMLLinkElement => {
  return loadStylesheet(`/styles/${pageName}.css`, {
    id: `${pageName}-styles`,
    onLoad: () => {
      // Add a class to the body when styles are loaded
      document.body.classList.add(`${pageName}-styles-loaded`);
    }
  });
};

/**
 * Preloads page-specific styles
 *
 * @param {string[]} pageNames - The names of the pages
 * @returns {void}
 */
export const preloadPageStyles = (pageNames: string[]): void => {
  // Return if running on the server
  if (typeof document === 'undefined') return;
  
  pageNames.forEach(pageName => {
    // Create preload link
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = `/styles/${pageName}.css`;
    link.as = 'style';
    
    // Add to document head
    document.head.appendChild(link);
  });
};

/**
 * Combines class names
 *
 * @param {...string} classes - Class names to combine
 * @returns {string} Combined class names
 */
export const cn = (...classes: (string | boolean | undefined)[]): string => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Adds a CSS animation to an element
 *
 * @param {HTMLElement} element - The element to animate
 * @param {string} animationName - The name of the animation
 * @param {string} duration - The duration of the animation
 * @returns {void}
 */
export const addAnimation = (
  element: HTMLElement,
  animationName: string,
  duration: string = ANIMATIONS.FADE_DURATION
): void => {
  element.style.animation = `${animationName} ${duration} forwards`;
};

/**
 * Removes a CSS animation from an element
 *
 * @param {HTMLElement} element - The element to remove the animation from
 * @returns {void}
 */
export const removeAnimation = (element: HTMLElement): void => {
  element.style.animation = '';
};

/**
 * Adds a CSS transition to an element
 *
 * @param {HTMLElement} element - The element to add the transition to
 * @param {string} property - The property to transition
 * @param {string} duration - The duration of the transition
 * @param {string} timingFunction - The timing function of the transition
 * @returns {void}
 */
export const addTransition = (
  element: HTMLElement,
  property: string,
  duration: string = ANIMATIONS.FADE_DURATION,
  timingFunction: string = 'ease'
): void => {
  element.style.transition = `${property} ${duration} ${timingFunction}`;
};

/**
 * Removes a CSS transition from an element
 *
 * @param {HTMLElement} element - The element to remove the transition from
 * @returns {void}
 */
export const removeTransition = (element: HTMLElement): void => {
  element.style.transition = '';
};
