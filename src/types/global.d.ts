// Type definitions for requestIdleCallback and cancelIdleCallback
interface Window {
  requestIdleCallback: (
    callback: IdleRequestCallback,
    options?: IdleRequestOptions
  ) => number;
  cancelIdleCallback: (handle: number) => void;
}

interface IdleRequestCallback {
  (deadline: IdleDeadline): void;
}

interface IdleDeadline {
  readonly didTimeout: boolean;
  timeRemaining: () => number;
}

interface IdleRequestOptions {
  timeout?: number;
}

// Type definitions for LayoutShift entries
interface LayoutShiftEntry extends PerformanceEntry {
  hadRecentInput: boolean;
  value: number;
}

// Type definitions for FirstInput entries
interface FirstInputEntry extends PerformanceEntry {
  name: string;
  duration: number;
  processingStart?: number;
  processingEnd?: number;
  startTime: number;
}
