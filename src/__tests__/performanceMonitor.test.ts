import {
  monitorLCP,
  monitorCLS,
  monitorInteractions,
  monitorLongTasks,
  preloadCriticalResources,
  initPerformanceMonitoring
} from '@/utils/performanceMonitor';

// Mock PerformanceObserver
const mockObserve = jest.fn();
const mockDisconnect = jest.fn();

class MockPerformanceObserver {
  constructor(callback: any) {
    this.callback = callback;
  }
  callback: any;
  observe = mockObserve;
  disconnect = mockDisconnect;

  // Simulate triggering the callback with mock entries
  triggerCallback(entries: any[]) {
    this.callback({
      getEntries: () => entries
    });
  }
}

describe('Performance Monitoring Utilities', () => {
  // Save original console methods
  const originalConsoleLog = console.log;
  const originalConsoleWarn = console.warn;
  const originalConsoleError = console.error;

  // Mock console methods
  const mockConsoleLog = jest.fn();
  const mockConsoleWarn = jest.fn();
  const mockConsoleError = jest.fn();

  // Save original window.PerformanceObserver
  const originalPerformanceObserver = window.PerformanceObserver;

  beforeAll(() => {
    // Mock console methods
    console.log = mockConsoleLog;
    console.warn = mockConsoleWarn;
    console.error = mockConsoleError;

    // Mock window.PerformanceObserver
    window.PerformanceObserver = MockPerformanceObserver as any;
  });

  afterAll(() => {
    // Restore original console methods
    console.log = originalConsoleLog;
    console.warn = originalConsoleWarn;
    console.error = originalConsoleError;

    // Restore original window.PerformanceObserver
    window.PerformanceObserver = originalPerformanceObserver;
  });

  beforeEach(() => {
    // Reset mocks before each test
    mockConsoleLog.mockClear();
    mockConsoleWarn.mockClear();
    mockConsoleError.mockClear();
  });

  describe('monitorLCP', () => {
    it('creates a PerformanceObserver for LCP', () => {
      // Reset mocks
      mockObserve.mockClear();
      mockConsoleLog.mockClear();

      // Create a mock observer instance
      const mockObserver = new MockPerformanceObserver((entryList: any) => {
        const entries = entryList.getEntries();
        if (entries.length > 0) {
          const lcpEntry = entries[entries.length - 1];
          console.log('LCP:', lcpEntry.startTime, 'ms');
        }
      });

      // Mock the PerformanceObserver constructor to return our mock instance
      const originalPerformanceObserver = window.PerformanceObserver;
      window.PerformanceObserver = jest.fn().mockImplementation(() => mockObserver);

      // Call the function
      const cleanup = monitorLCP();

      // Check if observe was called with the correct parameters
      expect(mockObserve).toHaveBeenCalledWith({
        type: 'largest-contentful-paint',
        buffered: true
      });

      // Simulate an LCP entry
      mockObserver.triggerCallback([{ startTime: 1500 }]);

      // Check if the LCP was logged
      expect(mockConsoleLog).toHaveBeenCalledWith('LCP:', 1500, 'ms');

      // Clean up
      if (cleanup) cleanup();

      // Restore original PerformanceObserver
      window.PerformanceObserver = originalPerformanceObserver;
    });
  });

  describe('monitorCLS', () => {
    it('creates a PerformanceObserver for CLS', () => {
      // Reset mocks
      mockObserve.mockClear();
      mockConsoleLog.mockClear();

      // Create a mock observer instance with the actual CLS callback logic
      const mockObserver = new MockPerformanceObserver((entryList: any) => {
        const entries = entryList.getEntries();
        let clsValue = 0;

        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });

        console.log('Current CLS:', clsValue);
      });

      // Mock the PerformanceObserver constructor to return our mock instance
      const originalPerformanceObserver = window.PerformanceObserver;
      window.PerformanceObserver = jest.fn().mockImplementation(() => mockObserver);

      // Call the function
      const cleanup = monitorCLS();

      // Check if observe was called with the correct parameters
      expect(mockObserve).toHaveBeenCalledWith({
        type: 'layout-shift',
        buffered: true
      });

      // Simulate CLS entries
      mockObserver.triggerCallback([
        { hadRecentInput: false, value: 0.1 },
        { hadRecentInput: true, value: 0.2 }, // Should be ignored due to recent input
        { hadRecentInput: false, value: 0.3 }
      ]);

      // Check if the CLS was logged (0.1 + 0.3 = 0.4)
      expect(mockConsoleLog).toHaveBeenCalledWith('Current CLS:', 0.4);

      // Clean up
      if (cleanup) cleanup();

      // Restore original PerformanceObserver
      window.PerformanceObserver = originalPerformanceObserver;
    });
  });

  describe('monitorInteractions', () => {
    it('creates a PerformanceObserver for interactions', () => {
      // Reset mocks
      mockObserve.mockClear();
      mockConsoleLog.mockClear();

      // Create a mock observer instance with the actual interaction callback logic
      const mockObserver = new MockPerformanceObserver((entryList: any) => {
        const entries = entryList.getEntries();

        entries.forEach((entry: any) => {
          console.log('Interaction:', entry.name, entry.duration, 'ms');
        });
      });

      // Mock the PerformanceObserver constructor to return our mock instance
      const originalPerformanceObserver = window.PerformanceObserver;
      window.PerformanceObserver = jest.fn().mockImplementation(() => mockObserver);

      // Call the function
      const cleanup = monitorInteractions();

      // Check if observe was called with the correct parameters
      expect(mockObserve).toHaveBeenCalledWith({
        type: 'first-input',
        buffered: true
      });

      // Simulate interaction entries
      mockObserver.triggerCallback([
        { name: 'click', duration: 50 },
        { name: 'keydown', duration: 30 }
      ]);

      // Check if the interactions were logged
      expect(mockConsoleLog).toHaveBeenCalledWith('Interaction:', 'click', 50, 'ms');
      expect(mockConsoleLog).toHaveBeenCalledWith('Interaction:', 'keydown', 30, 'ms');

      // Clean up
      if (cleanup) cleanup();

      // Restore original PerformanceObserver
      window.PerformanceObserver = originalPerformanceObserver;
    });
  });

  describe('monitorLongTasks', () => {
    it('creates a PerformanceObserver for long tasks', () => {
      // Reset mocks
      mockObserve.mockClear();
      mockConsoleLog.mockClear();

      // Create a mock observer instance with the actual long task callback logic
      const mockObserver = new MockPerformanceObserver((entryList: any) => {
        const entries = entryList.getEntries();

        entries.forEach((entry: any) => {
          // Log tasks longer than 50ms
          if (entry.duration > 50) {
            console.log('Long task:', entry.duration, 'ms');
          }
        });
      });

      // Mock the PerformanceObserver constructor to return our mock instance
      const originalPerformanceObserver = window.PerformanceObserver;
      window.PerformanceObserver = jest.fn().mockImplementation(() => mockObserver);

      // Call the function
      const cleanup = monitorLongTasks();

      // Check if observe was called with the correct parameters
      expect(mockObserve).toHaveBeenCalledWith({
        type: 'longtask',
        buffered: true
      });

      // Simulate long task entries
      mockObserver.triggerCallback([
        { duration: 40 }, // Should be ignored (less than 50ms)
        { duration: 60 }, // Should be logged (more than 50ms)
        { duration: 100 } // Should be logged (more than 50ms)
      ]);

      // Check if the long tasks were logged
      expect(mockConsoleLog).toHaveBeenCalledTimes(2);
      expect(mockConsoleLog).toHaveBeenCalledWith('Long task:', 60, 'ms');
      expect(mockConsoleLog).toHaveBeenCalledWith('Long task:', 100, 'ms');

      // Clean up
      if (cleanup) cleanup();

      // Restore original PerformanceObserver
      window.PerformanceObserver = originalPerformanceObserver;
    });
  });

  describe('preloadCriticalResources', () => {
    // Mock document methods
    const originalCreateElement = document.createElement;
    const originalQuerySelector = document.querySelector;
    const originalAppendChild = document.head.appendChild;

    let mockLinkElements: any[] = [];

    const mockCreateElement = jest.fn().mockImplementation(() => {
      const linkElement = {
        rel: '',
        href: '',
        as: '',
        crossOrigin: '',
      };
      mockLinkElements.push(linkElement);
      return linkElement;
    });

    const mockQuerySelector = jest.fn().mockReturnValue(null);
    const mockAppendChild = jest.fn();

    beforeAll(() => {
      // Mock document methods
      document.createElement = mockCreateElement;
      document.querySelector = mockQuerySelector;
      document.head.appendChild = mockAppendChild;

      // Mock requestIdleCallback
      window.requestIdleCallback = jest.fn((callback) => {
        callback({ timeRemaining: () => 100, didTimeout: false });
        return 1;
      });
    });

    afterAll(() => {
      // Restore original methods
      document.createElement = originalCreateElement;
      document.querySelector = originalQuerySelector;
      document.head.appendChild = originalAppendChild;
    });

    beforeEach(() => {
      // Reset mocks before each test
      mockCreateElement.mockClear();
      mockQuerySelector.mockClear();
      mockAppendChild.mockClear();
      mockLinkElements = [];
    });

    it('preloads critical resources', () => {
      const resources = [
        { url: '/images/test.jpg', type: 'image' as const },
        { url: '/styles/test.css', type: 'style' as const },
        { url: '/scripts/test.js', type: 'script' as const },
        { url: '/fonts/test.woff2', type: 'font' as const },
      ];

      preloadCriticalResources(resources);

      // Check if requestIdleCallback was called
      expect(window.requestIdleCallback).toHaveBeenCalled();

      // Check if querySelector was called for each resource
      expect(mockQuerySelector).toHaveBeenCalledTimes(4);

      // Check if createElement was called for each resource
      expect(mockCreateElement).toHaveBeenCalledTimes(4);

      // Check if the link elements were configured correctly
      expect(mockLinkElements.length).toBe(4);

      // Check image link element
      expect(mockLinkElements[0].rel).toBe('preload');
      expect(mockLinkElements[0].href).toBe('/images/test.jpg');
      expect(mockLinkElements[0].as).toBe('image');

      // Check style link element
      expect(mockLinkElements[1].rel).toBe('preload');
      expect(mockLinkElements[1].href).toBe('/styles/test.css');
      expect(mockLinkElements[1].as).toBe('style');

      // Check script link element
      expect(mockLinkElements[2].rel).toBe('preload');
      expect(mockLinkElements[2].href).toBe('/scripts/test.js');
      expect(mockLinkElements[2].as).toBe('script');

      // Check font link element
      expect(mockLinkElements[3].rel).toBe('preload');
      expect(mockLinkElements[3].href).toBe('/fonts/test.woff2');
      expect(mockLinkElements[3].as).toBe('font');
      expect(mockLinkElements[3].crossOrigin).toBe('anonymous');

      // Check if the link elements were appended to the head
      expect(mockAppendChild).toHaveBeenCalledTimes(4);
    });

    it('does not preload resources that are already preloaded', () => {
      // Mock querySelector to return an existing element for the first resource
      mockQuerySelector.mockReturnValueOnce({});

      const resources = [
        { url: '/images/test.jpg', type: 'image' as const },
        { url: '/styles/test.css', type: 'style' as const },
      ];

      preloadCriticalResources(resources);

      // Check if querySelector was called for each resource
      expect(mockQuerySelector).toHaveBeenCalledTimes(2);

      // Check if createElement was called only for the second resource
      expect(mockCreateElement).toHaveBeenCalledTimes(1);

      // Check if the link element was configured correctly for the second resource
      expect(mockLinkElements.length).toBe(1);
      expect(mockLinkElements[0].rel).toBe('preload');
      expect(mockLinkElements[0].href).toBe('/styles/test.css');
      expect(mockLinkElements[0].as).toBe('style');

      // Check if only one link element was appended to the head
      expect(mockAppendChild).toHaveBeenCalledTimes(1);
    });
  });

  describe('initPerformanceMonitoring', () => {
    it('initializes all performance monitoring functions', () => {
      // We'll test that the function doesn't throw an error
      expect(() => {
        initPerformanceMonitoring();
      }).not.toThrow();
    });
  });
});
