/**
 * Utility to disable debug scripts that might be interfering with normal component behavior
 */

/**
 * Disables the dining info debug script
 *
 * This function removes the dining-info-debug.js script and the dining-info-fix.css stylesheet
 * that might be interfering with the ReservationInfo component.
 */
/**
 * This function is now deprecated and will be removed in a future update.
 * The new clean dining info component doesn't need debug scripts.
 */
export function disableDiningInfoDebug(): void {
  // This function is now deprecated
  // REVIEW: disableDiningInfoDebug is deprecated - using clean component instead
  return;

  // Only manipulate intervals if window is defined
  if (typeof window !== 'undefined' && window.setInterval && window.clearInterval) {
    // Clear any intervals that might be reloading the CSS
    // This is a bit aggressive, but necessary to stop the debug script
    const originalSetInterval = window.setInterval;
    const originalClearInterval = window.clearInterval;

    // Store all interval IDs
    const intervals: number[] = [];

    // Override setInterval to track all intervals
    // Use type assertion to avoid TypeScript errors with the Node.js vs browser types
    (window.setInterval as any) = function(handler: TimerHandler, timeout?: number, ...args: any[]): number {
      const id = originalSetInterval(handler, timeout, ...args);
      intervals.push(id);
      return id;
    };

    // Clear all intervals
    intervals.forEach(id => {
      try {
        originalClearInterval(id);
      } catch (e) {
        // Ignore errors
      }
    });

    // Restore original setInterval
    window.setInterval = originalSetInterval;
  }
}
