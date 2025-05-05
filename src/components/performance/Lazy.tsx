"use client";

import { memo, Suspense, lazy, ComponentType } from 'react';
import Loading from '@/components/ui/Loading';
import { PERFORMANCE } from '@/constants';

/**
 * Props for the Lazy component
 */
export interface LazyProps<T = any> {
  /**
   * The component to lazy load
   */
  component: () => Promise<{ default: ComponentType<T> }>;
  
  /**
   * Props to pass to the lazy-loaded component
   */
  props?: T;
  
  /**
   * Component to render while the lazy component is loading
   */
  fallback?: React.ReactNode;
  
  /**
   * Whether to use SSR
   * @default false
   */
  ssr?: boolean;
}

/**
 * Lazy Component
 *
 * A component that lazy loads another component.
 * This component uses React.lazy and Suspense for code splitting.
 *
 * @param {LazyProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
const Lazy = memo(function Lazy<T>({
  component,
  props,
  fallback,
  ssr = false
}: LazyProps<T>) {
  // Create the lazy component
  const LazyComponent = lazy(component);
  
  // Default fallback
  const defaultFallback = (
    <div className="min-h-[200px] flex items-center justify-center">
      <Loading />
    </div>
  );
  
  // Use requestIdleCallback to load the component
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    window.requestIdleCallback(
      () => {
        // Preload the component
        component();
      },
      { timeout: PERFORMANCE.IDLE_CALLBACK_TIMEOUT_MS }
    );
  }
  
  return (
    <Suspense fallback={fallback || defaultFallback}>
      <LazyComponent {...(props as any)} />
    </Suspense>
  );
});

export { Lazy };
export default Lazy;
