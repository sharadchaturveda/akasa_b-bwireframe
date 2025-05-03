/**
 * Common Types
 * 
 * This file contains common TypeScript types used throughout the application.
 */

/**
 * Base component props that most components will extend
 */
export interface BaseComponentProps {
  /** Additional CSS class names */
  className?: string;
  /** ID attribute for the component */
  id?: string;
}

/**
 * Props for components that can have children
 */
export interface WithChildrenProps extends BaseComponentProps {
  /** Child elements */
  children: React.ReactNode;
}

/**
 * Props for components that can be conditionally rendered
 */
export interface ConditionalRenderProps extends BaseComponentProps {
  /** Whether the component should be rendered */
  visible?: boolean;
}

/**
 * Props for components that can have a title
 */
export interface WithTitleProps extends BaseComponentProps {
  /** Title text */
  title?: string;
}

/**
 * Props for components that can have a description
 */
export interface WithDescriptionProps extends WithTitleProps {
  /** Description text */
  description?: string;
}

/**
 * Props for image components
 */
export interface ImageProps extends BaseComponentProps {
  /** Image source URL */
  src: string;
  /** Alternative text for the image */
  alt: string;
  /** Whether the image should be loaded with priority */
  priority?: boolean;
  /** Image width */
  width?: number;
  /** Image height */
  height?: number;
  /** Image quality (1-100) */
  quality?: number;
}

/**
 * Props for button components
 */
export interface ButtonProps extends BaseComponentProps {
  /** Button variant */
  variant?: 'default' | 'outline' | 'ghost';
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Button type */
  type?: 'button' | 'submit' | 'reset';
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Props for link components
 */
export interface LinkProps extends BaseComponentProps {
  /** Link destination */
  href: string;
  /** Whether the link should open in a new tab */
  external?: boolean;
  /** Link variant */
  variant?: 'default' | 'button' | 'text';
}

/**
 * Props for section components
 */
export interface SectionProps extends WithChildrenProps, WithTitleProps, WithDescriptionProps {
  /** Background color or image */
  background?: string;
  /** Whether the section has a container */
  hasContainer?: boolean;
  /** Section padding */
  padding?: 'none' | 'small' | 'medium' | 'large';
}

/**
 * Props for layout components
 */
export interface LayoutProps extends WithChildrenProps {
  /** Whether to include mobile optimizations */
  withMobileOptimizer?: boolean;
}

/**
 * Window with requestIdleCallback
 */
export interface WindowWithIdleCallback extends Window {
  requestIdleCallback: (
    callback: IdleRequestCallback,
    options?: { timeout: number }
  ) => number;
}

/**
 * RequestIdleCallback options
 */
export interface RequestIdleCallbackOptions {
  timeout: number;
}

/**
 * RequestIdleCallback deadline
 */
export interface RequestIdleCallbackDeadline {
  didTimeout: boolean;
  timeRemaining: () => number;
}
