/**
 * Utility to forcefully stop optimization interference
 * This is a nuclear option to identify and stop whatever is modifying our component
 */

// Store original methods that we'll monkey patch
const originalMethods = {
  querySelector: Document.prototype.querySelector,
  querySelectorAll: Document.prototype.querySelectorAll,
  getElementById: Document.prototype.getElementById,
  getElementsByClassName: Document.prototype.getElementsByClassName,
  getElementsByTagName: Document.prototype.getElementsByTagName,
  setAttribute: Element.prototype.setAttribute,
  removeAttribute: Element.prototype.removeAttribute,
  setProperty: CSSStyleDeclaration.prototype.setProperty
};

// Store stack traces of modifications
const modifications: {
  type: string;
  selector?: string;
  element?: string;
  property?: string;
  value?: string;
  stack: string;
  timestamp: number;
}[] = [];

/**
 * Monkey patch DOM methods to trace what's modifying our component
 */
export function monkeyPatchDOM(): void {
  if (typeof window === 'undefined') return;

  console.log('[Interference Tracer] Starting DOM monkey patching');

  // Patch querySelector to log when our component is selected
  Document.prototype.querySelector = function(this: Document, selector: string) {
    const result = originalMethods.querySelector.call(this, selector);

    // Check if this is selecting our component or something inside it
    if (selector.includes('backdrop-blur') ||
        (result && result.closest('[data-exclude-optimization="true"]'))) {
      const stack = new Error().stack || '';
      console.log(`[Interference Tracer] querySelector("${selector}") called from:`, stack);

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
    const result = originalMethods.querySelectorAll.call(this, selector);

    // Check if this might be selecting our component
    if (selector.includes('flex') ||
        selector.includes('backdrop') ||
        selector.includes('bg-black')) {
      const stack = new Error().stack || '';
      console.log(`[Interference Tracer] querySelectorAll("${selector}") called from:`, stack);

      modifications.push({
        type: 'querySelectorAll',
        selector,
        stack,
        timestamp: Date.now()
      });
    }

    return result;
  };

  // Patch setAttribute to catch style modifications
  Element.prototype.setAttribute = function(this: Element, name: string, value: string) {
    // Check if this is our component or inside it
    if (this.closest('[data-exclude-optimization="true"]') &&
        (name === 'style' || name === 'class')) {
      const stack = new Error().stack || '';
      console.log(`[Interference Tracer] Element.setAttribute("${name}", "${value}") called on:`, this);
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
        console.warn('[Interference Tracer] Blocked style modification on excluded element');
        return;
      }
    }

    return originalMethods.setAttribute.call(this, name, value);
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

    if (element && element.closest('[data-exclude-optimization="true"]')) {
      const stack = new Error().stack || '';
      console.log(`[Interference Tracer] style.setProperty("${property}", "${value}") called on:`, element);
      console.log('Stack:', stack);

      modifications.push({
        type: 'setProperty',
        element: element.tagName,
        property,
        value,
        stack,
        timestamp: Date.now()
      });

      // Block style modifications on display, flex-direction, etc.
      if (['display', 'flex-direction', 'flex', 'position'].includes(property)) {
        console.warn('[Interference Tracer] Blocked style.setProperty on excluded element');
        return;
      }
    }

    return originalMethods.setProperty.call(this, property, value, priority);
  };

  // Set up a MutationObserver to catch all DOM changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if ((mutation.target as Element).closest?.('[data-exclude-optimization="true"]')) {
        console.log('[Interference Tracer] Mutation detected on excluded element:', mutation);

        // If attributes were modified
        if (mutation.type === 'attributes') {
          console.log('Attribute modified:', mutation.attributeName);
          console.log('Old value:', mutation.oldValue);
          console.log('New value:', (mutation.target as Element).getAttribute(mutation.attributeName || ''));

          // Force our data-exclude-optimization attribute back
          if (mutation.attributeName === 'data-exclude-optimization') {
            (mutation.target as Element).setAttribute('data-exclude-optimization', 'true');
          }
        }
      }
    });
  });

  // Start observing the document
  observer.observe(document.documentElement, {
    attributes: true,
    childList: true,
    subtree: true,
    attributeOldValue: true
  });

  // Set up a timer to log all modifications
  setInterval(() => {
    if (modifications.length > 0) {
      console.log('[Interference Tracer] Recent modifications:', modifications);

      // Group by stack trace to find common sources
      const sources = modifications.reduce((acc, mod) => {
        const stackLines = mod.stack.split('\n');
        const relevantLine = stackLines.find(line =>
          !line.includes('stopOptimizationInterference') &&
          !line.includes('native code')
        ) || 'unknown';

        acc[relevantLine] = (acc[relevantLine] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      console.log('[Interference Tracer] Modification sources:',
        Object.entries(sources).sort((a, b) => b[1] - a[1]));

      // Clear the modifications array
      modifications.length = 0;
    }
  }, 5000);
}

/**
 * Restore original DOM methods
 */
export function restoreDOM(): void {
  if (typeof window === 'undefined') return;

  Document.prototype.querySelector = originalMethods.querySelector;
  Document.prototype.querySelectorAll = originalMethods.querySelectorAll;
  Document.prototype.getElementById = originalMethods.getElementById;
  Document.prototype.getElementsByClassName = originalMethods.getElementsByClassName;
  Document.prototype.getElementsByTagName = originalMethods.getElementsByTagName;
  Element.prototype.setAttribute = originalMethods.setAttribute;
  Element.prototype.removeAttribute = originalMethods.removeAttribute;
  CSSStyleDeclaration.prototype.setProperty = originalMethods.setProperty;

  console.log('[Interference Tracer] DOM methods restored');
}

/**
 * Force our styles on the ReservationInfo component
 * This will be called repeatedly to ensure our styles stay applied
 */
export function forceReservationInfoStyles(): void {
  if (typeof window === 'undefined') return;

  const reservationInfo = document.querySelector('[data-exclude-optimization="true"]');
  if (!reservationInfo) return;

  // Force our styles with inline styles (highest specificity)
  const style = reservationInfo.getAttribute('style') || '';
  reservationInfo.setAttribute('style', `
    ${style};
    display: block !important;
    position: relative !important;
    overflow: hidden !important;
    border-radius: 0.5rem !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    background-color: rgba(0, 0, 0, 0.4) !important;
    backdrop-filter: blur(4px) !important;
  `);

  // Force flex containers
  reservationInfo.querySelectorAll('.flex.flex-col.md\\:flex-row').forEach(el => {
    const style = el.getAttribute('style') || '';
    el.setAttribute('style', `
      ${style};
      display: flex !important;
      flex-direction: column !important;
      ${window.innerWidth >= 768 ? 'flex-direction: row !important;' : ''}
    `);
  });

  // Force icon containers
  reservationInfo.querySelectorAll('.icon-container').forEach(el => {
    const style = el.getAttribute('style') || '';
    el.setAttribute('style', `
      ${style};
      flex-shrink: 0 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    `);
  });

  // Force content containers
  reservationInfo.querySelectorAll('.content-container').forEach(el => {
    const style = el.getAttribute('style') || '';
    el.setAttribute('style', `
      ${style};
      flex-grow: 1 !important;
      min-width: 0 !important;
    `);
  });
}