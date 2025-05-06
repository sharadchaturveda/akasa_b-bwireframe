/**
 * ReservationInfo Tracer Utility
 *
 * This utility provides real-time tracing of any code attempting to modify
 * the ReservationInfo component. It logs stack traces and provides detailed
 * information about what's happening.
 */

// Store all modifications for analysis
interface Modification {
  type: string;
  element?: string;
  property?: string;
  value?: string;
  selector?: string;
  stack: string;
  timestamp: number;
}

const modifications: Modification[] = [];

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

// Store original DOM methods - only initialize in browser
const originalMethods = isBrowser ? {
  querySelector: Document.prototype.querySelector,
  querySelectorAll: Document.prototype.querySelectorAll,
  setAttribute: Element.prototype.setAttribute,
  removeAttribute: Element.prototype.removeAttribute,
  setProperty: CSSStyleDeclaration.prototype.setProperty
} : {};

/**
 * Start tracing modifications to the ReservationInfo component
 *
 * NOTE: This function is now deprecated and will be removed in a future update.
 * The new clean dining info component doesn't need tracing.
 */
export function startTracing(): void {
  // This function is now deprecated
  console.log('[ReservationInfo Tracer] Tracing is deprecated - using clean component instead');
  return;

  console.log('[ReservationInfo Tracer] Starting tracing');

  // Patch querySelector to log when our component is selected
  Document.prototype.querySelector = function(this: Document, selector: string) {
    const result = (originalMethods as any).querySelector.call(this, selector);

    // Check if this is selecting our component or something inside it
    if (selector.includes('backdrop-blur') ||
        selector.includes('content-container') ||
        selector.includes('icon-container') ||
        selector.includes('label-span') ||
        (result && result.closest && result.closest('[data-exclude-optimization="true"]'))) {
      const stack = new Error().stack || '';
      console.log(`[ReservationInfo Tracer] querySelector("${selector}") called from:`, stack);

      modifications.push({
        type: 'querySelector',
        selector,
        stack,
        timestamp: Date.now()
      });
    }

    return result;
  };

  // Patch querySelectorAll similarly
  Document.prototype.querySelectorAll = function(this: Document, selector: string) {
    const result = (originalMethods as any).querySelectorAll.call(this, selector);

    // Check if this might be selecting our component
    if (selector.includes('flex') ||
        selector.includes('backdrop') ||
        selector.includes('content-container') ||
        selector.includes('icon-container') ||
        selector.includes('label-span') ||
        selector.includes('bg-black')) {
      const stack = new Error().stack || '';
      console.log(`[ReservationInfo Tracer] querySelectorAll("${selector}") called from:`, stack);

      modifications.push({
        type: 'querySelectorAll',
        selector,
        stack,
        timestamp: Date.now()
      });
    }

    return result;
  };

  // Patch setAttribute to catch attribute changes
  Element.prototype.setAttribute = function(
    this: Element,
    name: string,
    value: string
  ) {
    // Check if this element is part of our component
    if (this.closest &&
        (this.closest('.backdrop-blur-sm') ||
         this.closest('[data-exclude-optimization="true"]'))) {
      const stack = new Error().stack || '';
      console.log(`[ReservationInfo Tracer] setAttribute("${name}", "${value}") called on:`, this);
      console.log('Stack:', stack);

      modifications.push({
        type: 'setAttribute',
        element: this.tagName,
        property: name,
        value,
        stack,
        timestamp: Date.now()
      });

      // If trying to modify our component's style, block it
      if (name === 'style' && this.hasAttribute('data-exclude-optimization')) {
        console.warn('[ReservationInfo Tracer] Blocked style modification on excluded element');
        return;
      }
    }

    return (originalMethods as any).setAttribute.call(this, name, value);
  };

  // Patch style.setProperty to catch direct style modifications
  CSSStyleDeclaration.prototype.setProperty = function(
    this: CSSStyleDeclaration,
    property: string,
    value: string,
    priority?: string
  ) {
    // Get the element this style belongs to
    // @ts-ignore - _parentElement is not in the type definitions but exists in the DOM
    const element = this._parentElement || (this as any).parentElement;

    if (element && element.closest &&
        (element.closest('.backdrop-blur-sm') ||
         element.closest('[data-exclude-optimization="true"]'))) {
      const stack = new Error().stack || '';
      console.log(`[ReservationInfo Tracer] style.setProperty("${property}", "${value}") called on:`, element);
      console.log('Stack:', stack);

      modifications.push({
        type: 'setProperty',
        element: element.tagName,
        property,
        value,
        stack,
        timestamp: Date.now()
      });

      // Block style modifications on display, flex-direction, etc. unless they have !important
      if (['display', 'flex-direction', 'flex', 'position', 'flex-grow', 'flex-shrink'].includes(property) &&
          priority !== 'important' &&
          !stack.includes('ReservationInfo.tsx') &&
          !stack.includes('reservation-info-protector.js')) {
        console.warn('[ReservationInfo Tracer] Blocked style.setProperty on excluded element');
        return;
      }
    }

    return (originalMethods as any).setProperty.call(this, property, value, priority);
  };

  // Set up a timer to log all modifications
  setInterval(() => {
    if (modifications.length > 0) {
      console.log('[ReservationInfo Tracer] Recent modifications:', modifications);

      // Group by stack trace to find common sources
      const sources: Record<string, number> = {};
      modifications.forEach(mod => {
        const stackLines = mod.stack.split('\n');
        const relevantLine = stackLines.find(line =>
          !line.includes('reservationInfoTracer') &&
          !line.includes('native code')
        ) || 'unknown';

        sources[relevantLine] = (sources[relevantLine] || 0) + 1;
      });

      console.log('[ReservationInfo Tracer] Modification sources:',
        Object.entries(sources).sort((a, b) => b[1] - a[1]));

      // Clear the modifications array
      modifications.length = 0;
    }
  }, 5000);
}

/**
 * Stop tracing and restore original DOM methods
 */
export function stopTracing(): void {
  // Only run in browser environment
  if (!isBrowser) return;

  // Only restore methods if they exist
  if (originalMethods && (originalMethods as any).querySelector) {
    Document.prototype.querySelector = (originalMethods as any).querySelector;
    Document.prototype.querySelectorAll = (originalMethods as any).querySelectorAll;
    Element.prototype.setAttribute = (originalMethods as any).setAttribute;
    Element.prototype.removeAttribute = (originalMethods as any).removeAttribute;
    CSSStyleDeclaration.prototype.setProperty = (originalMethods as any).setProperty;

    console.log('[ReservationInfo Tracer] Tracing stopped');
  }
}

/**
 * Get a summary of all modifications
 */
export function getTracingSummary(): Modification[] {
  return [...modifications];
}
