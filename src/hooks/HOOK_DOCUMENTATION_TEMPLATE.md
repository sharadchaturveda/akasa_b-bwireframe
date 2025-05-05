# Hook Documentation Template

This file provides a template for documenting custom React hooks in the Akasa website project. Use this template when creating new hooks or updating existing ones.

## File Header Template

```typescript
/**
 * Hook Name
 *
 * This file contains the [hookName] hook and its related types.
 * This hook is used for [specific purpose] throughout the application.
 */
```

## Type Documentation Template

```typescript
/**
 * Parameters for the useHookName hook
 */
export interface HookNameParams {
  /**
   * Description of this parameter
   * @required
   */
  requiredParam: string;
  
  /**
   * Description of this optional parameter
   * @default defaultValue
   */
  optionalParam?: number;
}

/**
 * Return value from the useHookName hook
 */
export interface HookNameResult {
  /**
   * Description of this return value property
   */
  value: string;
  
  /**
   * Description of this function in the return value
   */
  updateValue: (newValue: string) => void;
  
  /**
   * Description of this state value
   */
  isLoading: boolean;
  
  /**
   * Description of this error state
   */
  error: Error | null;
}
```

## Hook Documentation Template

```typescript
/**
 * useHookName Hook
 *
 * Detailed description of what this hook does and when to use it.
 * Include information about:
 * - The purpose of this hook
 * - When to use this hook
 * - Any important implementation details
 * - Any performance considerations
 * - Any dependencies or side effects
 *
 * @param {HookNameParams} params - The hook parameters
 * @returns {HookNameResult} The hook result
 *
 * @example
 * // Basic usage
 * const { value, updateValue, isLoading, error } = useHookName({
 *   requiredParam: 'value',
 *   optionalParam: 42
 * });
 *
 * @example
 * // Handling loading and error states
 * const { value, isLoading, error } = useHookName({ requiredParam: 'value' });
 * 
 * if (isLoading) {
 *   return <Loading />;
 * }
 * 
 * if (error) {
 *   return <Error message={error.message} />;
 * }
 * 
 * return <div>{value}</div>;
 */
export function useHookName({
  requiredParam,
  optionalParam = defaultValue
}: HookNameParams): HookNameResult {
  // Hook implementation
}
```

## Cleanup Documentation Template

When a hook performs cleanup, document it clearly:

```typescript
/**
 * useEventListener Hook
 *
 * A hook for adding event listeners with automatic cleanup.
 * This hook handles adding the event listener and removing it
 * when the component unmounts to prevent memory leaks.
 *
 * @param {string} eventName - The name of the event to listen for
 * @param {EventListener} handler - The event handler function
 * @param {Element | Window | Document | null} element - The element to attach the listener to
 *
 * @example
 * // Listen for window resize events
 * useEventListener('resize', handleResize, window);
 */
export function useEventListener(
  eventName: string,
  handler: EventListener,
  element: Element | Window | Document | null = window
): void {
  // Store the handler in a ref to prevent unnecessary re-renders
  const savedHandler = useRef<EventListener>();
  
  // Update the ref when the handler changes
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);
  
  useEffect(() => {
    // Make sure element supports addEventListener
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;
    
    // Create event listener that calls handler function stored in ref
    const eventListener: EventListener = (event) => {
      savedHandler.current?.(event);
    };
    
    // Add event listener
    element.addEventListener(eventName, eventListener);
    
    // Remove event listener on cleanup
    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}
```

## Dependencies Documentation Template

When a hook has dependencies, document them clearly:

```typescript
/**
 * useLocalStorage Hook
 *
 * A hook for using localStorage with React state.
 * This hook synchronizes state with localStorage and handles
 * serialization/deserialization of values.
 *
 * Dependencies:
 * - localStorage API
 * - JSON.stringify/parse for serialization
 *
 * @param {string} key - The localStorage key to use
 * @param {T} initialValue - The initial value if no value exists in localStorage
 * @returns {[T, (value: T | ((val: T) => T)) => void]} A stateful value and a function to update it
 *
 * @example
 * // Store user preferences in localStorage
 * const [preferences, setPreferences] = useLocalStorage('userPreferences', { theme: 'dark' });
 * 
 * // Update a specific preference
 * setPreferences(prev => ({ ...prev, theme: 'light' }));
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // Hook implementation
}
```

## Example Hook with Documentation

```typescript
/**
 * Device Detection Hook
 *
 * This file contains the useDeviceDetection hook and its related types.
 * This hook is used for detecting mobile devices throughout the application.
 */

import { useState, useEffect, useCallback } from 'react';
import { isMobileDevice, debounce } from '@/utils/mobileUtils';

/**
 * Return value from the useDeviceDetection hook
 */
export interface DeviceDetectionResult {
  /**
   * Whether the current device is a mobile device
   */
  isMobile: boolean;
  
  /**
   * Whether the device detection is complete
   * This is useful for showing loading states while detection is in progress
   */
  isDetectionComplete: boolean;
}

/**
 * useDeviceDetection Hook
 *
 * A hook for detecting mobile devices. This hook centralizes the mobile
 * detection logic that was previously duplicated across many components.
 * It handles the initial detection and updates the state when the window
 * is resized or orientation changes.
 *
 * This hook is used throughout the application to render mobile-specific
 * components and apply mobile optimizations.
 *
 * @returns {DeviceDetectionResult} An object containing the device detection state
 *
 * @example
 * // Basic usage
 * const { isMobile, isDetectionComplete } = useDeviceDetection();
 *
 * if (!isDetectionComplete) {
 *   return <Loading />;
 * }
 *
 * return isMobile ? <MobileComponent /> : <DesktopComponent />;
 */
export function useDeviceDetection(): DeviceDetectionResult {
  const [isMobile, setIsMobile] = useState(false);
  const [isDetectionComplete, setIsDetectionComplete] = useState(false);

  // Create a memoized handler for device detection
  const detectDevice = useCallback(() => {
    try {
      const detected = isMobileDevice();
      setIsMobile(detected);
      setIsDetectionComplete(true);
    } catch (error) {
      // Silent error in production
      if (process.env.NODE_ENV !== 'production') {
        console.error("Error detecting device:", error);
      }
      // Default to desktop view if detection fails
      setIsMobile(false);
      setIsDetectionComplete(true);
    }
  }, []);

  // Create a debounced version of the handler
  const debouncedDetectDevice = useCallback(
    debounce(detectDevice, 250),
    [detectDevice]
  );

  // Handle orientation change
  const handleOrientationChange = useCallback(() => {
    detectDevice();
  }, [detectDevice]);

  useEffect(() => {
    // Initial detection
    detectDevice();

    // Add event listeners for window resize and orientation change
    window.addEventListener('resize', debouncedDetectDevice);
    window.addEventListener('orientationchange', handleOrientationChange);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener('resize', debouncedDetectDevice);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, [debouncedDetectDevice, handleOrientationChange, detectDevice]);

  return { isMobile, isDetectionComplete };
}
```

## Conclusion

Following these documentation standards ensures that all hooks are well-documented and easy to understand for new developers joining the project. Consistent documentation also makes maintenance easier and helps prevent bugs caused by misunderstanding hook behavior.
